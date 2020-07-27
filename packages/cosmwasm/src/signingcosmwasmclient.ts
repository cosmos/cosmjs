/* eslint-disable @typescript-eslint/naming-convention */
import { Sha256 } from "@cosmjs/crypto";
import { toBase64, toHex } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import {
  BroadcastMode,
  Coin,
  coins,
  makeSignBytes,
  Msg,
  MsgSend,
  OfflineSigner,
  StdFee,
  StdSignature,
  StdTx,
} from "@cosmjs/sdk38";
import pako from "pako";

import { isValidBuilder } from "./builder";
import {
  Account,
  CosmWasmClient,
  GetSequenceResult,
  isPostTxFailure,
  PostTxFailure,
  PostTxResult,
} from "./cosmwasmclient";
import { findAttribute, Log } from "./logs";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "./msgs";

export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}

export interface FeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly migrate: StdFee;
  readonly send: StdFee;
  /** Paid when setting the contract admin to a new address or unsetting it */
  readonly changeAdmin: StdFee;
}

function prepareBuilder(buider: string | undefined): string {
  if (buider === undefined) {
    return ""; // normalization needed by backend
  } else {
    if (!isValidBuilder(buider)) throw new Error("The builder (Docker Hub image with tag) is not valid");
    return buider;
  }
}

const defaultFees: FeeTable = {
  upload: {
    amount: coins(25000, "ucosm"),
    gas: "1000000", // one million
  },
  init: {
    amount: coins(12500, "ucosm"),
    gas: "500000", // 500k
  },
  migrate: {
    amount: coins(5000, "ucosm"),
    gas: "200000", // 200k
  },
  exec: {
    amount: coins(5000, "ucosm"),
    gas: "200000", // 200k
  },
  send: {
    amount: coins(2000, "ucosm"),
    gas: "80000", // 80k
  },
  changeAdmin: {
    amount: coins(2000, "ucosm"),
    gas: "80000", // 80k
  },
};

export interface UploadMeta {
  /**
   * An URL to a .tar.gz archive of the source code of the contract, which can be used to reproducibly build the Wasm bytecode.
   *
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
  readonly source?: string;
  /**
   * A docker image (including version) to reproducibly build the Wasm bytecode from the source code.
   *
   * @example ```cosmwasm/rust-optimizer:0.8.0```
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
  readonly builder?: string;
}

export interface UploadResult {
  /** Size of the original wasm code in bytes */
  readonly originalSize: number;
  /** A hex encoded sha256 checksum of the original wasm code (that is stored on chain) */
  readonly originalChecksum: string;
  /** Size of the compressed wasm code in bytes */
  readonly compressedSize: number;
  /** A hex encoded sha256 checksum of the compressed wasm code (that stored in the transaction) */
  readonly compressedChecksum: string;
  /** The ID of the code asigned by the chain */
  readonly codeId: number;
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

/**
 * The options of an .instantiate() call.
 * All properties are optional.
 */
export interface InstantiateOptions {
  readonly memo?: string;
  readonly transferAmount?: readonly Coin[];
  /**
   * A bech32 encoded address of an admin account.
   * Caution: an admin has the privilege to upgrade a contract. If this is not desired, do not set this value.
   */
  readonly admin?: string;
}

export interface InstantiateResult {
  /** The address of the newly instantiated contract */
  readonly contractAddress: string;
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

/**
 * Result type of updateAdmin and clearAdmin
 */
export interface ChangeAdminResult {
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

export interface MigrateResult {
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

export interface ExecuteResult {
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

function createPostTxErrorMessage(result: PostTxFailure): string {
  return `Error when posting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

export class SigningCosmWasmClient extends CosmWasmClient {
  public readonly senderAddress: string;

  private readonly signer: OfflineSigner;
  private readonly fees: FeeTable;

  /**
   * Creates a new client with signing capability to interact with a CosmWasm blockchain. This is the bigger brother of CosmWasmClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param senderAddress The address that will sign and send transactions using this instance
   * @param signer An implementation of OfflineSigner which can provide signatures for transactions, potentially requiring user input.
   * @param customFees The fees that are paid for transactions
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  public constructor(
    apiUrl: string,
    senderAddress: string,
    signer: OfflineSigner,
    customFees?: Partial<FeeTable>,
    broadcastMode = BroadcastMode.Block,
  ) {
    super(apiUrl, broadcastMode);
    this.anyValidAddress = senderAddress;

    this.senderAddress = senderAddress;
    this.signer = signer;
    this.fees = { ...defaultFees, ...(customFees || {}) };
  }

  public async getSequence(address?: string): Promise<GetSequenceResult> {
    return super.getSequence(address || this.senderAddress);
  }

  public async getAccount(address?: string): Promise<Account | undefined> {
    return super.getAccount(address || this.senderAddress);
  }

  /** Uploads code and returns a receipt, including the code ID */
  public async upload(wasmCode: Uint8Array, meta: UploadMeta = {}, memo = ""): Promise<UploadResult> {
    const source = meta.source || "";
    const builder = prepareBuilder(meta.builder);

    const compressed = pako.gzip(wasmCode, { level: 9 });
    const storeCodeMsg: MsgStoreCode = {
      type: "wasm/store-code",
      value: {
        sender: this.senderAddress,
        wasm_byte_code: toBase64(compressed),
        source: source,
        builder: builder,
      },
    };
    const result = await this.signAndPost([storeCodeMsg], this.fees.upload, memo);
    if (isPostTxFailure(result)) {
      throw new Error(createPostTxErrorMessage(result));
    }
    const codeIdAttr = findAttribute(result.logs, "message", "code_id");
    return {
      originalSize: wasmCode.length,
      originalChecksum: toHex(new Sha256(wasmCode).digest()),
      compressedSize: compressed.length,
      compressedChecksum: toHex(new Sha256(compressed).digest()),
      codeId: Number.parseInt(codeIdAttr.value, 10),
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async instantiate(
    codeId: number,
    initMsg: object,
    label: string,
    options: InstantiateOptions = {},
  ): Promise<InstantiateResult> {
    const instantiateMsg: MsgInstantiateContract = {
      type: "wasm/instantiate",
      value: {
        sender: this.senderAddress,
        code_id: new Uint53(codeId).toString(),
        label: label,
        init_msg: initMsg,
        init_funds: options.transferAmount || [],
        admin: options.admin,
      },
    };
    const result = await this.signAndPost([instantiateMsg], this.fees.init, options.memo);
    if (isPostTxFailure(result)) {
      throw new Error(createPostTxErrorMessage(result));
    }
    const contractAddressAttr = findAttribute(result.logs, "message", "contract_address");
    return {
      contractAddress: contractAddressAttr.value,
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async updateAdmin(contractAddress: string, newAdmin: string, memo = ""): Promise<ChangeAdminResult> {
    const updateAdminMsg: MsgUpdateAdmin = {
      type: "wasm/update-contract-admin",
      value: {
        sender: this.senderAddress,
        contract: contractAddress,
        new_admin: newAdmin,
      },
    };
    const result = await this.signAndPost([updateAdminMsg], this.fees.changeAdmin, memo);
    if (isPostTxFailure(result)) {
      throw new Error(createPostTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async clearAdmin(contractAddress: string, memo = ""): Promise<ChangeAdminResult> {
    const clearAdminMsg: MsgClearAdmin = {
      type: "wasm/clear-contract-admin",
      value: {
        sender: this.senderAddress,
        contract: contractAddress,
      },
    };
    const result = await this.signAndPost([clearAdminMsg], this.fees.changeAdmin, memo);
    if (isPostTxFailure(result)) {
      throw new Error(createPostTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async migrate(
    contractAddress: string,
    codeId: number,
    migrateMsg: object,
    memo = "",
  ): Promise<MigrateResult> {
    const msg: MsgMigrateContract = {
      type: "wasm/migrate",
      value: {
        sender: this.senderAddress,
        contract: contractAddress,
        code_id: new Uint53(codeId).toString(),
        msg: migrateMsg,
      },
    };
    const result = await this.signAndPost([msg], this.fees.migrate, memo);
    if (isPostTxFailure(result)) {
      throw new Error(createPostTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async execute(
    contractAddress: string,
    handleMsg: object,
    memo = "",
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult> {
    const executeMsg: MsgExecuteContract = {
      type: "wasm/execute",
      value: {
        sender: this.senderAddress,
        contract: contractAddress,
        msg: handleMsg,
        sent_funds: transferAmount || [],
      },
    };
    const result = await this.signAndPost([executeMsg], this.fees.exec, memo);
    if (isPostTxFailure(result)) {
      throw new Error(createPostTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async sendTokens(
    recipientAddress: string,
    transferAmount: readonly Coin[],
    memo = "",
  ): Promise<PostTxResult> {
    const sendMsg: MsgSend = {
      type: "cosmos-sdk/MsgSend",
      value: {
        from_address: this.senderAddress,
        to_address: recipientAddress,
        amount: transferAmount,
      },
    };
    return this.signAndPost([sendMsg], this.fees.send, memo);
  }

  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature, assembles the signed transaction and broadcasts it.
   */
  public async signAndPost(msgs: readonly Msg[], fee: StdFee, memo = ""): Promise<PostTxResult> {
    const { accountNumber, sequence } = await this.getSequence();
    const chainId = await this.getChainId();
    const signBytes = makeSignBytes(msgs, fee, chainId, memo, accountNumber, sequence);
    const signature = await this.signer.sign(this.senderAddress, signBytes);
    const signedTx: StdTx = {
      msg: msgs,
      fee: fee,
      memo: memo,
      signatures: [signature],
    };
    return this.postTx(signedTx);
  }
}

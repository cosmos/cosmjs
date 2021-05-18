/* eslint-disable @typescript-eslint/naming-convention */
import { sha256 } from "@cosmjs/crypto";
import { toBase64, toHex } from "@cosmjs/encoding";
import {
  BroadcastMode,
  BroadcastTxFailure,
  BroadcastTxResult,
  buildFeeTable,
  Coin,
  CosmosFeeTable,
  GasLimits,
  GasPrice,
  isBroadcastTxFailure,
  logs,
  makeSignDoc,
  makeStdTx,
  Msg,
  MsgSend,
  OfflineSigner,
  StdFee,
} from "@cosmjs/launchpad";
import { Uint53 } from "@cosmjs/math";
import pako from "pako";

import { isValidBuilder } from "./builder";
import { Account, CosmWasmClient, GetSequenceResult } from "./cosmwasmclient";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "./msgs";

/**
 * These fees are used by the higher level methods of SigningCosmWasmClient
 */
export interface CosmWasmFeeTable extends CosmosFeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly migrate: StdFee;
  /** Paid when setting the contract admin to a new address or unsetting it */
  readonly changeAdmin: StdFee;
}

function prepareBuilder(builder: string | undefined): string {
  if (builder === undefined) {
    return ""; // normalization needed by backend
  } else {
    if (!isValidBuilder(builder)) throw new Error("The builder (Docker Hub image with tag) is not valid");
    return builder;
  }
}

const defaultGasPrice = GasPrice.fromString("0.025ucosm");
const defaultGasLimits: GasLimits<CosmWasmFeeTable> = {
  upload: 1_500_000,
  init: 500_000,
  migrate: 200_000,
  exec: 200_000,
  send: 80_000,
  changeAdmin: 80_000,
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
  readonly logs: readonly logs.Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

/**
 * The options of an .instantiate() call.
 * All properties are optional.
 */
export interface InstantiateOptions {
  readonly memo?: string;
  /**
   * The funds that are transferred from the sender to the newly created contract.
   * The funds are transferred as part of the message execution after the contract address is
   * created and before the instantiation message is executed by the contract.
   *
   * Only native tokens are supported.
   *
   * TODO: Rename to `funds` for consistency (https://github.com/cosmos/cosmjs/issues/806)
   */
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
  readonly logs: readonly logs.Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

/**
 * Result type of updateAdmin and clearAdmin
 */
export interface ChangeAdminResult {
  readonly logs: readonly logs.Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

export interface MigrateResult {
  readonly logs: readonly logs.Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

export interface ExecuteResult {
  readonly logs: readonly logs.Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}

function createBroadcastTxErrorMessage(result: BroadcastTxFailure): string {
  return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

export class SigningCosmWasmClient extends CosmWasmClient {
  public readonly fees: CosmWasmFeeTable;
  public readonly signerAddress: string;

  private readonly signer: OfflineSigner;

  /**
   * Creates a new client with signing capability to interact with a CosmWasm blockchain. This is the bigger brother of CosmWasmClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param signerAddress The address that will sign transactions using this instance. The `signer` must be able to sign with this address.
   * @param signer An implementation of OfflineSigner which can provide signatures for transactions, potentially requiring user input.
   * @param gasPrice The price paid per unit of gas
   * @param gasLimits Custom overrides for gas limits related to specific transaction types
   * @param broadcastMode Defines at which point of the transaction processing the broadcastTx method returns
   */
  public constructor(
    apiUrl: string,
    signerAddress: string,
    signer: OfflineSigner,
    gasPrice: GasPrice = defaultGasPrice,
    gasLimits: Partial<GasLimits<CosmWasmFeeTable>> = {},
    broadcastMode = BroadcastMode.Block,
  ) {
    super(apiUrl, broadcastMode);
    this.anyValidAddress = signerAddress;
    this.signerAddress = signerAddress;
    this.signer = signer;
    this.fees = buildFeeTable<CosmWasmFeeTable>(gasPrice, defaultGasLimits, gasLimits);
  }

  public async getSequence(address?: string): Promise<GetSequenceResult> {
    return super.getSequence(address || this.signerAddress);
  }

  public async getAccount(address?: string): Promise<Account | undefined> {
    return super.getAccount(address || this.signerAddress);
  }

  /** Uploads code and returns a receipt, including the code ID */
  public async upload(wasmCode: Uint8Array, meta: UploadMeta = {}, memo = ""): Promise<UploadResult> {
    const source = meta.source || "";
    const builder = prepareBuilder(meta.builder);

    const compressed = pako.gzip(wasmCode, { level: 9 });
    const storeCodeMsg: MsgStoreCode = {
      type: "wasm/MsgStoreCode",
      value: {
        sender: this.signerAddress,
        wasm_byte_code: toBase64(compressed),
        source: source,
        builder: builder,
      },
    };
    const result = await this.signAndBroadcast([storeCodeMsg], this.fees.upload, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    const codeIdAttr = logs.findAttribute(result.logs, "message", "code_id");
    return {
      originalSize: wasmCode.length,
      originalChecksum: toHex(sha256(wasmCode)),
      compressedSize: compressed.length,
      compressedChecksum: toHex(sha256(compressed)),
      codeId: Number.parseInt(codeIdAttr.value, 10),
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async instantiate(
    codeId: number,
    msg: Record<string, unknown>,
    label: string,
    options: InstantiateOptions = {},
  ): Promise<InstantiateResult> {
    const instantiateMsg: MsgInstantiateContract = {
      type: "wasm/MsgInstantiateContract",
      value: {
        sender: this.signerAddress,
        code_id: new Uint53(codeId).toString(),
        label: label,
        init_msg: msg,
        init_funds: options.transferAmount || [],
        admin: options.admin,
      },
    };
    const result = await this.signAndBroadcast([instantiateMsg], this.fees.init, options.memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    const contractAddressAttr = logs.findAttribute(result.logs, "message", "contract_address");
    return {
      contractAddress: contractAddressAttr.value,
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async updateAdmin(contractAddress: string, newAdmin: string, memo = ""): Promise<ChangeAdminResult> {
    const updateAdminMsg: MsgUpdateAdmin = {
      type: "wasm/MsgUpdateAdmin",
      value: {
        sender: this.signerAddress,
        contract: contractAddress,
        new_admin: newAdmin,
      },
    };
    const result = await this.signAndBroadcast([updateAdminMsg], this.fees.changeAdmin, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async clearAdmin(contractAddress: string, memo = ""): Promise<ChangeAdminResult> {
    const clearAdminMsg: MsgClearAdmin = {
      type: "wasm/MsgClearAdmin",
      value: {
        sender: this.signerAddress,
        contract: contractAddress,
      },
    };
    const result = await this.signAndBroadcast([clearAdminMsg], this.fees.changeAdmin, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async migrate(
    contractAddress: string,
    codeId: number,
    migrateMsg: Record<string, unknown>,
    memo = "",
  ): Promise<MigrateResult> {
    const msg: MsgMigrateContract = {
      type: "wasm/MsgMigrateContract",
      value: {
        sender: this.signerAddress,
        contract: contractAddress,
        code_id: new Uint53(codeId).toString(),
        msg: migrateMsg,
      },
    };
    const result = await this.signAndBroadcast([msg], this.fees.migrate, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async execute(
    contractAddress: string,
    msg: Record<string, unknown>,
    memo = "",
    funds?: readonly Coin[],
  ): Promise<ExecuteResult> {
    const executeMsg: MsgExecuteContract = {
      type: "wasm/MsgExecuteContract",
      value: {
        sender: this.signerAddress,
        contract: contractAddress,
        msg: msg,
        sent_funds: funds || [],
      },
    };
    const result = await this.signAndBroadcast([executeMsg], this.fees.exec, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: result.logs,
      transactionHash: result.transactionHash,
    };
  }

  public async sendTokens(
    recipientAddress: string,
    amount: readonly Coin[],
    memo = "",
  ): Promise<BroadcastTxResult> {
    const sendMsg: MsgSend = {
      type: "cosmos-sdk/MsgSend",
      value: {
        from_address: this.signerAddress,
        to_address: recipientAddress,
        amount: amount,
      },
    };
    return this.signAndBroadcast([sendMsg], this.fees.send, memo);
  }

  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature, assembles the signed transaction and broadcasts it.
   */
  public async signAndBroadcast(msgs: readonly Msg[], fee: StdFee, memo = ""): Promise<BroadcastTxResult> {
    const { accountNumber, sequence } = await this.getSequence();
    const chainId = await this.getChainId();
    const signDoc = makeSignDoc(msgs, fee, chainId, memo, accountNumber, sequence);
    const { signed, signature } = await this.signer.signAmino(this.signerAddress, signDoc);
    const signedTx = makeStdTx(signed, signature);
    return this.broadcastTx(signedTx);
  }
}

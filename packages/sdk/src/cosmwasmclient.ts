import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { makeSignBytes, marshalTx } from "./encoding";
import { findAttribute, Log, parseLogs } from "./logs";
import { RestClient } from "./restclient";
import {
  Coin,
  CosmosSdkTx,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
  StdFee,
  StdSignature,
} from "./types";

const defaultUploadFee: StdFee = {
  amount: [
    {
      amount: "5000",
      denom: "ucosm",
    },
  ],
  gas: "1000000", // one million
};

const defaultInitFee: StdFee = {
  amount: [
    {
      amount: "5000",
      denom: "ucosm",
    },
  ],
  gas: "500000", // 500k
};

const defaultExecFee: StdFee = {
  amount: [
    {
      amount: "5000",
      denom: "ucosm",
    },
  ],
  gas: "200000", // 200k
};

export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}

interface SigningData {
  readonly senderAddress: string;
  readonly signCallback: SigningCallback;
}

export interface GetNonceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}

export interface PostTxResult {
  readonly logs: readonly Log[];
  readonly rawLog: string;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-exmpty upper-case hex */
  readonly transactionHash: string;
}

export interface ExecuteResult {
  readonly logs: readonly Log[];
}

export class CosmWasmClient {
  public static makeReadOnly(url: string): CosmWasmClient {
    return new CosmWasmClient(url);
  }

  public static makeWritable(
    url: string,
    senderAddress: string,
    signCallback: SigningCallback,
  ): CosmWasmClient {
    return new CosmWasmClient(url, {
      senderAddress: senderAddress,
      signCallback: signCallback,
    });
  }

  private readonly restClient: RestClient;
  private readonly signingData: SigningData | undefined;

  private get senderAddress(): string {
    if (!this.signingData) throw new Error("Signing data not set in this client");
    return this.signingData.senderAddress;
  }

  private get signCallback(): SigningCallback {
    if (!this.signingData) throw new Error("Signing data not set in this client");
    return this.signingData.signCallback;
  }

  private constructor(url: string, signingData?: SigningData) {
    this.restClient = new RestClient(url);
    this.signingData = signingData;
  }

  public async chainId(): Promise<string> {
    const response = await this.restClient.nodeInfo();
    return response.node_info.network;
  }

  /**
   * Returns a 32 byte upper-case hex transaction hash (typically used as the transaction ID)
   */
  public async getIdentifier(tx: CosmosSdkTx): Promise<string> {
    // We consult the REST API because we don't have a local amino encoder
    const bytes = await this.restClient.encodeTx(tx);
    const hash = new Sha256(bytes).digest();
    return Encoding.toHex(hash).toUpperCase();
  }

  /**
   * Returns account number and sequence.
   *
   * @param address returns data for this address. When unset, the client's sender adddress is used.
   */
  public async getNonce(address?: string): Promise<GetNonceResult> {
    const account = (await this.restClient.authAccounts(address || this.senderAddress)).result.value;
    return {
      accountNumber: account.account_number,
      sequence: account.sequence,
    };
  }

  public async postTx(tx: Uint8Array): Promise<PostTxResult> {
    const result = await this.restClient.postTx(tx);
    if (result.code) {
      throw new Error(`Error when posting tx. Code: ${result.code}; Raw log: ${result.raw_log}`);
    }

    if (!result.txhash.match(/^([0-9A-F][0-9A-F])+$/)) {
      throw new Error("Received ill-formatted txhash. Must be non-empty upper-case hex");
    }

    return {
      logs: parseLogs(result.logs) || [],
      rawLog: result.raw_log || "",
      transactionHash: result.txhash,
    };
  }

  /** Uploads code and returns a code ID */
  public async upload(wasmCode: Uint8Array, memo = ""): Promise<number> {
    const storeCodeMsg: MsgStoreCode = {
      type: "wasm/store-code",
      value: {
        sender: this.senderAddress,
        // eslint-disable-next-line @typescript-eslint/camelcase
        wasm_byte_code: Encoding.toBase64(wasmCode),
        source: "",
        builder: "",
      },
    };
    const fee = defaultUploadFee;
    const { accountNumber, sequence } = await this.getNonce();
    const chainId = await this.chainId();
    const signBytes = makeSignBytes([storeCodeMsg], fee, chainId, memo, accountNumber, sequence);
    const signature = await this.signCallback(signBytes);
    const signedTx = {
      msg: [storeCodeMsg],
      fee: fee,
      memo: memo,
      signatures: [signature],
    };

    const result = await this.postTx(marshalTx(signedTx));
    const codeIdAttr = findAttribute(result.logs, "message", "code_id");
    const codeId = Number.parseInt(codeIdAttr.value, 10);
    return codeId;
  }

  public async instantiate(
    codeId: number,
    initMsg: object,
    memo = "",
    transferAmount?: readonly Coin[],
  ): Promise<string> {
    const instantiateMsg: MsgInstantiateContract = {
      type: "wasm/instantiate",
      value: {
        sender: this.senderAddress,
        // eslint-disable-next-line @typescript-eslint/camelcase
        code_id: codeId.toString(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        init_msg: initMsg,
        // eslint-disable-next-line @typescript-eslint/camelcase
        init_funds: transferAmount || [],
      },
    };
    const fee = defaultInitFee;
    const { accountNumber, sequence } = await this.getNonce();
    const chainId = await this.chainId();
    const signBytes = makeSignBytes([instantiateMsg], fee, chainId, memo, accountNumber, sequence);

    const signature = await this.signCallback(signBytes);
    const signedTx = {
      msg: [instantiateMsg],
      fee: fee,
      memo: memo,
      signatures: [signature],
    };

    const result = await this.postTx(marshalTx(signedTx));
    const contractAddressAttr = findAttribute(result.logs, "message", "contract_address");
    return contractAddressAttr.value;
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
        // eslint-disable-next-line @typescript-eslint/camelcase
        sent_funds: transferAmount || [],
      },
    };
    const fee = defaultExecFee;
    const { accountNumber, sequence } = await this.getNonce();
    const chainId = await this.chainId();
    const signBytes = makeSignBytes([executeMsg], fee, chainId, memo, accountNumber, sequence);
    const signature = await this.signCallback(signBytes);
    const signedTx = {
      msg: [executeMsg],
      fee: fee,
      memo: memo,
      signatures: [signature],
    };

    const result = await this.postTx(marshalTx(signedTx));
    return {
      logs: result.logs,
    };
  }
}

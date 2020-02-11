import { Encoding } from "@iov/encoding";

import { makeSignBytes, marshalTx } from "./encoding";
import { findAttribute, Log, parseLogs } from "./logs";
import { RestClient } from "./restclient";
import {
  Coin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
  StdFee,
  StdSignature,
} from "./types";

export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}

interface SigningData {
  readonly senderAddress: string;
  readonly signCallback: SigningCallback;
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

  /** Uploads code and returns a code ID */
  public async upload(wasmCode: Uint8Array, memo?: string): Promise<number> {
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
    const fee: StdFee = {
      amount: [
        {
          amount: "5000000",
          denom: "ucosm",
        },
      ],
      gas: "89000000",
    };

    const account = (await this.restClient.authAccounts(this.senderAddress)).result.value;
    const chainId = await this.chainId();
    const signBytes = makeSignBytes([storeCodeMsg], fee, chainId, memo || "", account);
    const signature = await this.signCallback(signBytes);
    const signedTx = {
      msg: [storeCodeMsg],
      fee: fee,
      memo: memo || "",
      signatures: [signature],
    };

    const result = await this.restClient.postTx(marshalTx(signedTx));
    if (result.code) {
      throw new Error(`Error uploading contract. Code: ${result.code}; Raw log: ${result.raw_log}`);
    }
    const logs = parseLogs(result.logs);
    const codeIdAttr = findAttribute(logs, "message", "code_id");
    const codeId = Number.parseInt(codeIdAttr.value, 10);
    return codeId;
  }

  public async instantiate(
    codeId: number,
    initMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<string> {
    const normalizedMemo = memo || "";
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
    const fee: StdFee = {
      amount: [
        {
          amount: "5000000",
          denom: "ucosm",
        },
      ],
      gas: "89000000",
    };

    const account = (await this.restClient.authAccounts(this.senderAddress)).result.value;
    const chainId = await this.chainId();
    const signBytes = makeSignBytes([instantiateMsg], fee, chainId, normalizedMemo, account);

    const signature = await this.signCallback(signBytes);
    const signedTx = {
      msg: [instantiateMsg],
      fee: fee,
      memo: normalizedMemo,
      signatures: [signature],
    };
    const result = await this.restClient.postTx(marshalTx(signedTx));
    if (result.code) {
      throw new Error(`Error instantiating contract. Code: ${result.code}; Raw log: ${result.raw_log}`);
    }
    const logs = parseLogs(result.logs);
    const contractAddressAttr = findAttribute(logs, "message", "contract_address");
    return contractAddressAttr.value;
  }

  public async execute(
    contractAddress: string,
    handleMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<{ readonly logs: readonly Log[] }> {
    const normalizedMemo = memo || "";
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
    const fee: StdFee = {
      amount: [
        {
          amount: "5000000",
          denom: "ucosm",
        },
      ],
      gas: "89000000",
    };

    const account = (await this.restClient.authAccounts(this.senderAddress)).result.value;
    const chainId = await this.chainId();
    const signBytes = makeSignBytes([executeMsg], fee, chainId, normalizedMemo, account);
    const signature = await this.signCallback(signBytes);
    const signedTx = {
      msg: [executeMsg],
      fee: fee,
      memo: normalizedMemo,
      signatures: [signature],
    };
    const result = await this.restClient.postTx(marshalTx(signedTx));
    if (result.code) {
      throw new Error(`Error when posting tx. Code: ${result.code}; Raw log: ${result.raw_log}`);
    }
    return {
      logs: parseLogs(result.logs),
    };
  }
}

import { Encoding } from "@iov/encoding";

import { CosmWasmClient, GetNonceResult, PostTxResult } from "./cosmwasmclient";
import { makeSignBytes, marshalTx } from "./encoding";
import { findAttribute, Log } from "./logs";
import { BroadcastMode } from "./restclient";
import {
  Coin,
  CosmosSdkAccount,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgSend,
  MsgStoreCode,
  StdFee,
  StdSignature,
} from "./types";

export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}

export interface FeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly send: StdFee;
}

function singleAmount(amount: number, denom: string): readonly Coin[] {
  return [{ amount: amount.toString(), denom: denom }];
}

const defaultFees: FeeTable = {
  upload: {
    amount: singleAmount(25000, "ucosm"),
    gas: "1000000", // one million
  },
  init: {
    amount: singleAmount(12500, "ucosm"),
    gas: "500000", // 500k
  },
  exec: {
    amount: singleAmount(5000, "ucosm"),
    gas: "200000", // 200k
  },
  send: {
    amount: singleAmount(2000, "ucosm"),
    gas: "80000", // 80k
  },
};

export interface ExecuteResult {
  readonly logs: readonly Log[];
}

export class SigningCosmWasmClient extends CosmWasmClient {
  public readonly senderAddress: string;

  private readonly signCallback: SigningCallback;
  private readonly fees: FeeTable;

  public constructor(
    url: string,
    senderAddress: string,
    signCallback: SigningCallback,
    customFees?: Partial<FeeTable>,
    broadcastMode = BroadcastMode.Block,
  ) {
    super(url, broadcastMode);
    this.senderAddress = senderAddress;
    this.signCallback = signCallback;
    this.fees = { ...defaultFees, ...(customFees || {}) };
  }

  public async getNonce(address?: string): Promise<GetNonceResult> {
    return super.getNonce(address || this.senderAddress);
  }

  public async getAccount(address?: string): Promise<CosmosSdkAccount | undefined> {
    return super.getAccount(address || this.senderAddress);
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
    const fee = this.fees.upload;
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
    const fee = this.fees.init;
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
    const fee = this.fees.exec;
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

  public async sendTokens(
    recipientAddress: string,
    transferAmount: readonly Coin[],
    memo = "",
  ): Promise<PostTxResult> {
    const sendMsg: MsgSend = {
      type: "cosmos-sdk/MsgSend",
      value: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        from_address: this.senderAddress,
        // eslint-disable-next-line @typescript-eslint/camelcase
        to_address: recipientAddress,
        amount: transferAmount,
      },
    };
    const fee = this.fees.send;
    const { accountNumber, sequence } = await this.getNonce();
    const chainId = await this.chainId();
    const signBytes = makeSignBytes([sendMsg], fee, chainId, memo, accountNumber, sequence);
    const signature = await this.signCallback(signBytes);
    const signedTx = {
      msg: [sendMsg],
      fee: fee,
      memo: memo,
      signatures: [signature],
    };

    return this.postTx(marshalTx(signedTx));
  }
}

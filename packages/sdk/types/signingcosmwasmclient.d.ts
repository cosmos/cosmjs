import { CosmWasmClient, GetNonceResult, PostTxResult } from "./cosmwasmclient";
import { Log } from "./logs";
import { Coin, CosmosSdkAccount, StdFee, StdSignature } from "./types";
export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}
export interface FeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly send: StdFee;
}
export interface ExecuteResult {
  readonly logs: readonly Log[];
}
export declare class SigningCosmWasmClient extends CosmWasmClient {
  readonly senderAddress: string;
  private readonly signCallback;
  private readonly fees;
  constructor(
    url: string,
    senderAddress: string,
    signCallback: SigningCallback,
    customFees?: Partial<FeeTable>,
  );
  getNonce(address?: string): Promise<GetNonceResult>;
  getAccount(address?: string): Promise<CosmosSdkAccount | undefined>;
  /** Uploads code and returns a code ID */
  upload(wasmCode: Uint8Array, memo?: string): Promise<number>;
  instantiate(
    codeId: number,
    initMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<string>;
  execute(
    contractAddress: string,
    handleMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult>;
  sendTokens(recipientAddress: string, transferAmount: readonly Coin[], memo?: string): Promise<PostTxResult>;
}

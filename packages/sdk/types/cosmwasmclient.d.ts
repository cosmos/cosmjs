import { Log } from "./logs";
import { Coin, StdSignature } from "./types";
export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}
export declare class CosmWasmClient {
  static makeReadOnly(url: string): CosmWasmClient;
  static makeWritable(url: string, senderAddress: string, signCallback: SigningCallback): CosmWasmClient;
  private readonly restClient;
  private readonly signingData;
  private get senderAddress();
  private get signCallback();
  private constructor();
  chainId(): Promise<string>;
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
  ): Promise<{
    readonly logs: readonly Log[];
  }>;
}

import { Log } from "./logs";
import { Coin, StdSignature } from "./types";
export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}
export interface GetNonceResult {
  readonly accountNumber: number;
  readonly sequence: number;
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
  /**
   * Returns account number and sequence.
   *
   * @param address returns data for this address. When unset, the client's sender adddress is used.
   */
  getNonce(address?: string): Promise<GetNonceResult>;
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

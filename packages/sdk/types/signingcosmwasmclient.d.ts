import { CosmWasmClient, GetNonceResult, PostTxResult } from "./cosmwasmclient";
import { Log } from "./logs";
import { BroadcastMode } from "./restclient";
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
export interface UploadReceipt {
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
    broadcastMode?: BroadcastMode,
  );
  getNonce(address?: string): Promise<GetNonceResult>;
  getAccount(address?: string): Promise<CosmosSdkAccount | undefined>;
  /** Uploads code and returns a receipt, including the code ID */
  upload(wasmCode: Uint8Array, memo?: string): Promise<UploadReceipt>;
  instantiate(
    codeId: number,
    initMsg: object,
    label: string,
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

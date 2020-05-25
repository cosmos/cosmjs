import { Coin } from "./coins";
import { Account, CosmWasmClient, GetNonceResult, PostTxResult } from "./cosmwasmclient";
import { Log } from "./logs";
import { BroadcastMode } from "./restclient";
import { StdFee, StdSignature } from "./types";
export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}
export interface FeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly send: StdFee;
}
export interface UploadMeta {
  /** The source URL */
  readonly source?: string;
  /** The builder tag */
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
export interface InstantiateResult {
  /** The address of the newly instantiated contract */
  readonly contractAddress: string;
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}
export interface ExecuteResult {
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}
export declare class SigningCosmWasmClient extends CosmWasmClient {
  readonly senderAddress: string;
  private readonly signCallback;
  private readonly fees;
  /**
   * Creates a new client with signing capability to interact with a CosmWasm blockchain. This is the bigger brother of CosmWasmClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param senderAddress The address that will sign and send transactions using this instance
   * @param signCallback An asynchonous callback to create a signature for a given transaction. This can be implemented using secure key stores that require user interaction.
   * @param customFees The fees that are paid for transactions
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  constructor(
    apiUrl: string,
    senderAddress: string,
    signCallback: SigningCallback,
    customFees?: Partial<FeeTable>,
    broadcastMode?: BroadcastMode,
  );
  getNonce(address?: string): Promise<GetNonceResult>;
  getAccount(address?: string): Promise<Account | undefined>;
  /** Uploads code and returns a receipt, including the code ID */
  upload(wasmCode: Uint8Array, meta?: UploadMeta, memo?: string): Promise<UploadResult>;
  instantiate(
    codeId: number,
    initMsg: object,
    label: string,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<InstantiateResult>;
  execute(
    contractAddress: string,
    handleMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult>;
  sendTokens(recipientAddress: string, transferAmount: readonly Coin[], memo?: string): Promise<PostTxResult>;
}

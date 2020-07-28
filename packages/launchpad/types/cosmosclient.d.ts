import { Coin } from "./coins";
import { AuthExtension, BroadcastMode, LcdClient } from "./lcdapi";
import { Log } from "./logs";
import { CosmosSdkTx, PubKey, StdTx } from "./types";
export interface GetSequenceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}
export interface Account {
  /** Bech32 account address */
  readonly address: string;
  readonly balance: readonly Coin[];
  readonly pubkey: PubKey | undefined;
  readonly accountNumber: number;
  readonly sequence: number;
}
export interface PostTxFailure {
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
  readonly height: number;
  readonly code: number;
  readonly rawLog: string;
}
export interface PostTxSuccess {
  readonly logs: readonly Log[];
  readonly rawLog: string;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
  readonly data?: Uint8Array;
}
export declare type PostTxResult = PostTxSuccess | PostTxFailure;
export declare function isPostTxFailure(result: PostTxResult): result is PostTxFailure;
export declare function isPostTxSuccess(result: PostTxResult): result is PostTxSuccess;
/**
 * Ensures the given result is a success. Throws a detailed error message otherwise.
 */
export declare function assertIsPostTxSuccess(result: PostTxResult): asserts result is PostTxSuccess;
export interface SearchByIdQuery {
  readonly id: string;
}
export interface SearchByHeightQuery {
  readonly height: number;
}
export interface SearchBySentFromOrToQuery {
  readonly sentFromOrTo: string;
}
/**
 * This query type allows you to pass arbitrary key/value pairs to the backend. It is
 * more powerful and slightly lower level than the other search options.
 */
export interface SearchByTagsQuery {
  readonly tags: ReadonlyArray<{
    readonly key: string;
    readonly value: string;
  }>;
}
export declare type SearchTxQuery =
  | SearchByIdQuery
  | SearchByHeightQuery
  | SearchBySentFromOrToQuery
  | SearchByTagsQuery;
export interface SearchTxFilter {
  readonly minHeight?: number;
  readonly maxHeight?: number;
}
/** A transaction that is indexed as part of the transaction history */
export interface IndexedTx {
  readonly height: number;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly hash: string;
  /** Transaction execution error code. 0 on success. */
  readonly code: number;
  readonly rawLog: string;
  readonly logs: readonly Log[];
  readonly tx: CosmosSdkTx;
  /** The gas limit as set by the user */
  readonly gasWanted?: number;
  /** The gas used by the execution */
  readonly gasUsed?: number;
  /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
  readonly timestamp: string;
}
export interface BlockHeader {
  readonly version: {
    readonly block: string;
    readonly app: string;
  };
  readonly height: number;
  readonly chainId: string;
  /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
  readonly time: string;
}
export interface Block {
  /** The ID is a hash of the block header (uppercase hex) */
  readonly id: string;
  readonly header: BlockHeader;
  /** Array of raw transactions */
  readonly txs: readonly Uint8Array[];
}
/** Use for testing only */
export interface PrivateCosmWasmClient {
  readonly lcdClient: LcdClient & AuthExtension;
}
export declare class CosmosClient {
  protected readonly lcdClient: LcdClient & AuthExtension;
  /** Any address the chain considers valid (valid bech32 with proper prefix) */
  protected anyValidAddress: string | undefined;
  private chainId;
  /**
   * Creates a new client to interact with a CosmWasm blockchain.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  constructor(apiUrl: string, broadcastMode?: BroadcastMode);
  getChainId(): Promise<string>;
  getHeight(): Promise<number>;
  /**
   * Returns a 32 byte upper-case hex transaction hash (typically used as the transaction ID)
   */
  getIdentifier(tx: CosmosSdkTx): Promise<string>;
  /**
   * Returns account number and sequence.
   *
   * Throws if the account does not exist on chain.
   *
   * @param address returns data for this address. When unset, the client's sender adddress is used.
   */
  getSequence(address: string): Promise<GetSequenceResult>;
  getAccount(address: string): Promise<Account | undefined>;
  /**
   * Gets block header and meta
   *
   * @param height The height of the block. If undefined, the latest height is used.
   */
  getBlock(height?: number): Promise<Block>;
  searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
  postTx(tx: StdTx): Promise<PostTxResult>;
  private txsQuery;
}

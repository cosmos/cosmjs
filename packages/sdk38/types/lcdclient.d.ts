import {
  AuthAccountsResponse,
  BlockResponse,
  BroadcastMode,
  EncodeTxResponse,
  NodeInfoResponse,
  PostTxsResponse,
  SearchTxsResponse,
  TxsResponse,
} from "./restclient";
import { CosmosSdkTx, StdTx } from "./types";
/** Unfortunately, Cosmos SDK encodes empty arrays as null */
export declare type LcdApiArray<T> = ReadonlyArray<T> | null;
export declare function normalizeArray<T>(backend: LcdApiArray<T>): ReadonlyArray<T>;
declare type LcdClientModule = Record<string, () => any>;
declare type LcdClientModuleRegisterer<M> = (base: LcdClient) => M;
export declare class LcdClient {
  /** Constructs an LCD client with 0 modules */
  static withModules(apiUrl: string, broadcastMode: BroadcastMode): LcdClient;
  /** Constructs an LCD client with 1 modules */
  static withModules<A extends LcdClientModule>(
    apiUrl: string,
    broadcastMode: BroadcastMode,
    moduleA: LcdClientModuleRegisterer<A>,
  ): LcdClient & A;
  /** Constructs an LCD client with 2 modules */
  static withModules<A extends LcdClientModule, B extends LcdClientModule>(
    apiUrl: string,
    broadcastMode: BroadcastMode,
    moduleA: LcdClientModuleRegisterer<A>,
    moduleB: LcdClientModuleRegisterer<B>,
  ): LcdClient & A & B;
  private readonly client;
  private readonly broadcastMode;
  /**
   * Creates a new client to interact with a Cosmos SDK light client daemon.
   * This class tries to be a direct mapping onto the API. Some basic decoding and normalizatin is done
   * but things like caching are done at a higher level.
   *
   * When building apps, you should not need to use this class directly. If you do, this indicates a missing feature
   * in higher level components. Feel free to raise an issue in this case.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  constructor(apiUrl: string, broadcastMode?: BroadcastMode);
  get(path: string): Promise<any>;
  post(path: string, params: any): Promise<any>;
  authAccounts(address: string): Promise<AuthAccountsResponse>;
  blocksLatest(): Promise<BlockResponse>;
  blocks(height: number): Promise<BlockResponse>;
  nodeInfo(): Promise<NodeInfoResponse>;
  txById(id: string): Promise<TxsResponse>;
  txsQuery(query: string): Promise<SearchTxsResponse>;
  /** returns the amino-encoding of the transaction performed by the server */
  encodeTx(tx: CosmosSdkTx): Promise<EncodeTxResponse>;
  /**
   * Broadcasts a signed transaction to into the transaction pool.
   * Depending on the RestClient's broadcast mode, this might or might
   * wait for checkTx or deliverTx to be executed before returning.
   *
   * @param tx a signed transaction as StdTx (i.e. not wrapped in type/value container)
   */
  postTx(tx: StdTx): Promise<PostTxsResponse>;
}
export {};

import { CosmosSdkTx, StdTx } from "../types";
import {
  BlockResponse,
  BroadcastMode,
  EncodeTxResponse,
  NodeInfoResponse,
  PostTxsResponse,
  SearchTxsResponse,
  TxsResponse,
} from "./base";
/** Unfortunately, Cosmos SDK encodes empty arrays as null */
export declare type LcdApiArray<T> = readonly T[] | null;
export declare function normalizeLcdApiArray<T>(backend: LcdApiArray<T>): readonly T[];
export declare type LcdExtension = Record<string, Record<string, (...args: any[]) => any>>;
declare type LcdExtensionSetup<P extends LcdExtension> = (base: LcdClient) => P;
export interface LcdClientBaseOptions {
  readonly apiUrl: string;
  readonly broadcastMode?: BroadcastMode;
}
/**
 * A client to the LCD's (light client daemon) API.
 * This light client connects to Tendermint (i.e. the chain), encodes/decodes Amino data for us and provides a convenient JSON interface.
 *
 * This _JSON over HTTP_ API is sometimes referred to as "REST" or "RPC", which are both misleading terms
 * for the same thing.
 *
 * Please note that the client to the LCD can not verify light client proofs. When using this,
 * you need to trust the API provider as well as the network connection between client and API.
 *
 * @see https://cosmos.network/rpc
 */
export declare class LcdClient {
  /** Constructs an LCD client with 0 modules */
  static withExtensions(options: LcdClientBaseOptions): LcdClient;
  /** Constructs an LCD client with 1 module */
  static withExtensions<A extends LcdExtension>(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
  ): LcdClient & A;
  /** Constructs an LCD client with 2 modules */
  static withExtensions<A extends LcdExtension, B extends LcdExtension>(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
    setupModuleB: LcdExtensionSetup<B>,
  ): LcdClient & A & B;
  /** Constructs an LCD client with 3 modules */
  static withExtensions<A extends LcdExtension, B extends LcdExtension, C extends LcdExtension>(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
    setupModuleB: LcdExtensionSetup<B>,
    setupModuleC: LcdExtensionSetup<C>,
  ): LcdClient & A & B & C;
  /** Constructs an LCD client with 4 modules */
  static withExtensions<
    A extends LcdExtension,
    B extends LcdExtension,
    C extends LcdExtension,
    D extends LcdExtension
  >(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
    setupModuleB: LcdExtensionSetup<B>,
    setupModuleC: LcdExtensionSetup<C>,
    setupModuleD: LcdExtensionSetup<D>,
  ): LcdClient & A & B & C & D;
  /** Constructs an LCD client with 5 modules */
  static withExtensions<
    A extends LcdExtension,
    B extends LcdExtension,
    C extends LcdExtension,
    D extends LcdExtension,
    E extends LcdExtension
  >(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
    setupModuleB: LcdExtensionSetup<B>,
    setupModuleC: LcdExtensionSetup<C>,
    setupModuleD: LcdExtensionSetup<D>,
    setupModuleE: LcdExtensionSetup<E>,
  ): LcdClient & A & B & C & D & E;
  /** Constructs an LCD client with 6 modules */
  static withExtensions<
    A extends LcdExtension,
    B extends LcdExtension,
    C extends LcdExtension,
    D extends LcdExtension,
    E extends LcdExtension,
    F extends LcdExtension
  >(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
    setupModuleB: LcdExtensionSetup<B>,
    setupModuleC: LcdExtensionSetup<C>,
    setupModuleD: LcdExtensionSetup<D>,
    setupModuleE: LcdExtensionSetup<E>,
    setupModuleF: LcdExtensionSetup<F>,
  ): LcdClient & A & B & C & D & E & F;
  /** Constructs an LCD client with 7 modules */
  static withExtensions<
    A extends LcdExtension,
    B extends LcdExtension,
    C extends LcdExtension,
    D extends LcdExtension,
    E extends LcdExtension,
    F extends LcdExtension,
    G extends LcdExtension
  >(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
    setupModuleB: LcdExtensionSetup<B>,
    setupModuleC: LcdExtensionSetup<C>,
    setupModuleD: LcdExtensionSetup<D>,
    setupModuleE: LcdExtensionSetup<E>,
    setupModuleF: LcdExtensionSetup<F>,
    setupModuleG: LcdExtensionSetup<G>,
  ): LcdClient & A & B & C & D & E & F & G;
  /** Constructs an LCD client with 8 modules */
  static withExtensions<
    A extends LcdExtension,
    B extends LcdExtension,
    C extends LcdExtension,
    D extends LcdExtension,
    E extends LcdExtension,
    F extends LcdExtension,
    G extends LcdExtension,
    H extends LcdExtension
  >(
    options: LcdClientBaseOptions,
    setupModuleA: LcdExtensionSetup<A>,
    setupModuleB: LcdExtensionSetup<B>,
    setupModuleC: LcdExtensionSetup<C>,
    setupModuleD: LcdExtensionSetup<D>,
    setupModuleE: LcdExtensionSetup<E>,
    setupModuleF: LcdExtensionSetup<F>,
    setupModuleG: LcdExtensionSetup<G>,
    setupModuleH: LcdExtensionSetup<H>,
  ): LcdClient & A & B & C & D & E & F & G & H;
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
  blocksLatest(): Promise<BlockResponse>;
  blocks(height: number): Promise<BlockResponse>;
  nodeInfo(): Promise<NodeInfoResponse>;
  txById(id: string): Promise<TxsResponse>;
  txsQuery(query: string): Promise<SearchTxsResponse>;
  /** returns the amino-encoding of the transaction performed by the server */
  encodeTx(tx: CosmosSdkTx): Promise<EncodeTxResponse>;
  /**
   * Broadcasts a signed transaction to into the transaction pool.
   * Depending on the client's broadcast mode, this might or might
   * wait for checkTx or deliverTx to be executed before returning.
   *
   * @param tx a signed transaction as StdTx (i.e. not wrapped in type/value container)
   */
  postTx(tx: StdTx): Promise<PostTxsResponse>;
}
export {};

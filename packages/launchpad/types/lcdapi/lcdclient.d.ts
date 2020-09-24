import { StdTx, WrappedStdTx } from "../tx";
import {
  BlockResponse,
  BroadcastMode,
  BroadcastTxsResponse,
  EncodeTxResponse,
  NodeInfoResponse,
  SearchTxsResponse,
  TxsResponse,
} from "./base";
/** Unfortunately, Cosmos SDK encodes empty arrays as null */
export declare type LcdApiArray<T> = readonly T[] | null;
export declare function normalizeLcdApiArray<T>(backend: LcdApiArray<T>): readonly T[];
declare type LcdExtensionSetup<P> = (base: LcdClient) => P;
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
  /** Constructs an LCD client with 0 extensions */
  static withExtensions(options: LcdClientBaseOptions): LcdClient;
  /** Constructs an LCD client with 1 extension */
  static withExtensions<A extends object>(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
  ): LcdClient & A;
  /** Constructs an LCD client with 2 extensions */
  static withExtensions<A extends object, B extends object>(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
    setupExtensionB: LcdExtensionSetup<B>,
  ): LcdClient & A & B;
  /** Constructs an LCD client with 3 extensions */
  static withExtensions<A extends object, B extends object, C extends object>(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
    setupExtensionB: LcdExtensionSetup<B>,
    setupExtensionC: LcdExtensionSetup<C>,
  ): LcdClient & A & B & C;
  /** Constructs an LCD client with 4 extensions */
  static withExtensions<A extends object, B extends object, C extends object, D extends object>(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
    setupExtensionB: LcdExtensionSetup<B>,
    setupExtensionC: LcdExtensionSetup<C>,
    setupExtensionD: LcdExtensionSetup<D>,
  ): LcdClient & A & B & C & D;
  /** Constructs an LCD client with 5 extensions */
  static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object
  >(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
    setupExtensionB: LcdExtensionSetup<B>,
    setupExtensionC: LcdExtensionSetup<C>,
    setupExtensionD: LcdExtensionSetup<D>,
    setupExtensionE: LcdExtensionSetup<E>,
  ): LcdClient & A & B & C & D & E;
  /** Constructs an LCD client with 6 extensions */
  static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object
  >(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
    setupExtensionB: LcdExtensionSetup<B>,
    setupExtensionC: LcdExtensionSetup<C>,
    setupExtensionD: LcdExtensionSetup<D>,
    setupExtensionE: LcdExtensionSetup<E>,
    setupExtensionF: LcdExtensionSetup<F>,
  ): LcdClient & A & B & C & D & E & F;
  /** Constructs an LCD client with 7 extensions */
  static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object
  >(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
    setupExtensionB: LcdExtensionSetup<B>,
    setupExtensionC: LcdExtensionSetup<C>,
    setupExtensionD: LcdExtensionSetup<D>,
    setupExtensionE: LcdExtensionSetup<E>,
    setupExtensionF: LcdExtensionSetup<F>,
    setupExtensionG: LcdExtensionSetup<G>,
  ): LcdClient & A & B & C & D & E & F & G;
  /** Constructs an LCD client with 8 extensions */
  static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object
  >(
    options: LcdClientBaseOptions,
    setupExtensionA: LcdExtensionSetup<A>,
    setupExtensionB: LcdExtensionSetup<B>,
    setupExtensionC: LcdExtensionSetup<C>,
    setupExtensionD: LcdExtensionSetup<D>,
    setupExtensionE: LcdExtensionSetup<E>,
    setupExtensionF: LcdExtensionSetup<F>,
    setupExtensionG: LcdExtensionSetup<G>,
    setupExtensionH: LcdExtensionSetup<H>,
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
   * @param broadcastMode Defines at which point of the transaction processing the broadcastTx method returns
   */
  constructor(apiUrl: string, broadcastMode?: BroadcastMode);
  get(path: string, params?: Record<string, any>): Promise<any>;
  post(path: string, params: any): Promise<any>;
  blocksLatest(): Promise<BlockResponse>;
  blocks(height: number): Promise<BlockResponse>;
  nodeInfo(): Promise<NodeInfoResponse>;
  txById(id: string): Promise<TxsResponse>;
  txsQuery(query: string): Promise<SearchTxsResponse>;
  /** returns the amino-encoding of the transaction performed by the server */
  encodeTx(tx: WrappedStdTx): Promise<EncodeTxResponse>;
  /**
   * Broadcasts a signed transaction to the transaction pool.
   * Depending on the client's broadcast mode, this might or might
   * wait for checkTx or deliverTx to be executed before returning.
   *
   * @param tx a signed transaction as StdTx (i.e. not wrapped in type/value container)
   */
  broadcastTx(tx: StdTx): Promise<BroadcastTxsResponse>;
}
export {};

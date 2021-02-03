import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
declare type QueryExtensionSetup<P> = (base: QueryClient) => P;
export declare class QueryClient {
  /** Constructs a QueryClient with 0 extensions */
  static withExtensions(tmClient: TendermintClient): QueryClient;
  /** Constructs a QueryClient with 1 extension */
  static withExtensions<A extends object>(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
  ): QueryClient & A;
  /** Constructs a QueryClient with 2 extensions */
  static withExtensions<A extends object, B extends object>(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
  ): QueryClient & A & B;
  /** Constructs a QueryClient with 3 extensions */
  static withExtensions<A extends object, B extends object, C extends object>(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
  ): QueryClient & A & B & C;
  /** Constructs a QueryClient with 4 extensions */
  static withExtensions<A extends object, B extends object, C extends object, D extends object>(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
  ): QueryClient & A & B & C & D;
  /** Constructs a QueryClient with 5 extensions */
  static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object
  >(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
  ): QueryClient & A & B & C & D & E;
  /** Constructs a QueryClient with 6 extensions */
  static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object
  >(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
  ): QueryClient & A & B & C & D & E & F;
  /** Constructs a QueryClient with 7 extensions */
  static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object
  >(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
  ): QueryClient & A & B & C & D & E & F & G;
  /** Constructs a QueryClient with 8 extensions */
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
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
  ): QueryClient & A & B & C & D & E & F & G & H;
  private readonly tmClient;
  constructor(tmClient: TendermintClient);
  queryVerified(store: string, key: Uint8Array): Promise<Uint8Array>;
  queryUnverified(path: string, request: Uint8Array): Promise<Uint8Array>;
  private getNextHeader;
}
export {};

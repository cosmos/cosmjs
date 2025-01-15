/* eslint-disable no-dupe-class-members, @typescript-eslint/ban-types, @typescript-eslint/naming-convention */
import { CometClient } from "@cosmjs/tendermint-rpc";
import { assert, isNonNullObject } from "@cosmjs/utils";
import { ProofOps } from "cosmjs-types/tendermint/crypto/proof";

type QueryExtensionSetup<P> = (base: QueryClient) => P;

export interface ProvenQuery {
  readonly key: Uint8Array;
  readonly value: Uint8Array;
  readonly proof: ProofOps;
  readonly height: number;
}

export interface QueryStoreResponse {
  /** The response key from Tendermint. This is the same as the query key in the request. */
  readonly key: Uint8Array;
  readonly value: Uint8Array;
  readonly height: number;
}

/**
 * The response of an ABCI query to Tendermint.
 * This is a subset of `tendermint34.AbciQueryResponse` in order
 * to abstract away Tendermint versions.
 */
export interface QueryAbciResponse {
  readonly value: Uint8Array;
  readonly height: number;
}

export class QueryClient {
  /** Constructs a QueryClient with 0 extensions */
  public static withExtensions(cometClient: CometClient): QueryClient;

  /** Constructs a QueryClient with 1 extension */
  public static withExtensions<A extends object>(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
  ): QueryClient & A;

  /** Constructs a QueryClient with 2 extensions */
  public static withExtensions<A extends object, B extends object>(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
  ): QueryClient & A & B;

  /** Constructs a QueryClient with 3 extensions */
  public static withExtensions<A extends object, B extends object, C extends object>(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
  ): QueryClient & A & B & C;

  /** Constructs a QueryClient with 4 extensions */
  public static withExtensions<A extends object, B extends object, C extends object, D extends object>(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
  ): QueryClient & A & B & C & D;

  /** Constructs a QueryClient with 5 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
  ): QueryClient & A & B & C & D & E;

  /** Constructs a QueryClient with 6 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
  ): QueryClient & A & B & C & D & E & F;

  /** Constructs a QueryClient with 7 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
  ): QueryClient & A & B & C & D & E & F & G;

  /** Constructs a QueryClient with 8 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
  ): QueryClient & A & B & C & D & E & F & G & H;

  /** Constructs a QueryClient with 9 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
  ): QueryClient & A & B & C & D & E & F & G & H & I;

  /** Constructs a QueryClient with 10 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J;

  /** Constructs a QueryClient with 11 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K;

  /** Constructs a QueryClient with 12 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
    L extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
    setupExtensionL: QueryExtensionSetup<L>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L;

  /** Constructs a QueryClient with 13 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
    L extends object,
    M extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
    setupExtensionL: QueryExtensionSetup<L>,
    setupExtensionM: QueryExtensionSetup<M>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M;

  /** Constructs a QueryClient with 14 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
    L extends object,
    M extends object,
    N extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
    setupExtensionL: QueryExtensionSetup<L>,
    setupExtensionM: QueryExtensionSetup<M>,
    setupExtensionN: QueryExtensionSetup<N>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N;

  /** Constructs a QueryClient with 15 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
    L extends object,
    M extends object,
    N extends object,
    O extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
    setupExtensionL: QueryExtensionSetup<L>,
    setupExtensionM: QueryExtensionSetup<M>,
    setupExtensionN: QueryExtensionSetup<N>,
    setupExtensionO: QueryExtensionSetup<O>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O;

  /** Constructs a QueryClient with 16 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
    L extends object,
    M extends object,
    N extends object,
    O extends object,
    P extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
    setupExtensionL: QueryExtensionSetup<L>,
    setupExtensionM: QueryExtensionSetup<M>,
    setupExtensionN: QueryExtensionSetup<N>,
    setupExtensionO: QueryExtensionSetup<O>,
    setupExtensionP: QueryExtensionSetup<P>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P;

  /** Constructs a QueryClient with 17 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
    L extends object,
    M extends object,
    N extends object,
    O extends object,
    P extends object,
    Q extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
    setupExtensionL: QueryExtensionSetup<L>,
    setupExtensionM: QueryExtensionSetup<M>,
    setupExtensionN: QueryExtensionSetup<N>,
    setupExtensionO: QueryExtensionSetup<O>,
    setupExtensionP: QueryExtensionSetup<P>,
    setupExtensionQ: QueryExtensionSetup<Q>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q;

  /** Constructs a QueryClient with 18 extensions */
  public static withExtensions<
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object,
    J extends object,
    K extends object,
    L extends object,
    M extends object,
    N extends object,
    O extends object,
    P extends object,
    Q extends object,
    R extends object,
  >(
    cometClient: CometClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
    setupExtensionD: QueryExtensionSetup<D>,
    setupExtensionE: QueryExtensionSetup<E>,
    setupExtensionF: QueryExtensionSetup<F>,
    setupExtensionG: QueryExtensionSetup<G>,
    setupExtensionH: QueryExtensionSetup<H>,
    setupExtensionI: QueryExtensionSetup<I>,
    setupExtensionJ: QueryExtensionSetup<J>,
    setupExtensionK: QueryExtensionSetup<K>,
    setupExtensionL: QueryExtensionSetup<L>,
    setupExtensionM: QueryExtensionSetup<M>,
    setupExtensionN: QueryExtensionSetup<N>,
    setupExtensionO: QueryExtensionSetup<O>,
    setupExtensionP: QueryExtensionSetup<P>,
    setupExtensionQ: QueryExtensionSetup<Q>,
    setupExtensionR: QueryExtensionSetup<R>,
  ): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R;

  public static withExtensions(
    cometClient: CometClient,
    ...extensionSetups: Array<QueryExtensionSetup<object>>
  ): any {
    const client = new QueryClient(cometClient);
    const extensions = extensionSetups.map((setupExtension) => setupExtension(client));
    for (const extension of extensions) {
      assert(isNonNullObject(extension), `Extension must be a non-null object`);
      for (const [moduleKey, moduleValue] of Object.entries(extension)) {
        assert(
          isNonNullObject(moduleValue),
          `Module must be a non-null object. Found type ${typeof moduleValue} for module "${moduleKey}".`,
        );
        const current = (client as any)[moduleKey] || {};
        (client as any)[moduleKey] = {
          ...current,
          ...moduleValue,
        };
      }
    }
    return client;
  }

  private readonly cometClient: CometClient;

  public constructor(cometClient: CometClient) {
    this.cometClient = cometClient;
  }

  /**
   * Performs an ABCI query to Tendermint without requesting a proof.
   *
   * If the `desiredHeight` is set, a particular height is requested. Otherwise
   * the latest height is requested. The response contains the actual height of
   * the query.
   */
  public async queryAbci(
    path: string,
    request: Uint8Array,
    desiredHeight?: number,
  ): Promise<QueryAbciResponse> {
    const response = await this.cometClient.abciQuery({
      path: path,
      data: request,
      prove: false,
      height: desiredHeight,
    });

    if (response.code) {
      throw new Error(`Query failed with (${response.code}): ${response.log}`);
    }

    if (!response.height) {
      throw new Error("No query height returned");
    }

    return {
      value: response.value,
      height: response.height,
    };
  }
}

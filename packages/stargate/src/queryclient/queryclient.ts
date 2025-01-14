/* eslint-disable no-dupe-class-members, @typescript-eslint/ban-types, @typescript-eslint/naming-convention */
import { firstEvent } from "@cosmjs/stream";
import { CometClient, tendermint34 } from "@cosmjs/tendermint-rpc";
import { assert, assertDefined, isNonNullObject, sleep } from "@cosmjs/utils";
import { ProofOps } from "cosmjs-types/tendermint/crypto/proof";
import { Stream } from "xstream";

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

  // this must return the header for height+1
  // throws an error if height is 0 or undefined
  private async getNextHeader(height?: number): Promise<tendermint34.Header> {
    assertDefined(height);
    if (height === 0) {
      throw new Error("Query returned height 0, cannot prove it");
    }

    const searchHeight = height + 1;
    let nextHeader: tendermint34.Header | undefined;
    let headersSubscription: Stream<tendermint34.NewBlockHeaderEvent> | undefined;
    try {
      headersSubscription = this.cometClient.subscribeNewBlockHeader();
    } catch {
      // Ignore exception caused by non-WebSocket Tendermint clients
    }

    if (headersSubscription) {
      const firstHeader = await firstEvent(headersSubscription);
      // The first header we get might not be n+1 but n+2 or even higher. In such cases we fall back on a query.
      if (firstHeader.height === searchHeight) {
        nextHeader = firstHeader;
      }
    }

    while (!nextHeader) {
      // start from current height to avoid backend error for minHeight in the future
      const correctHeader = (await this.cometClient.blockchain(height, searchHeight)).blockMetas
        .map((meta) => meta.header)
        .find((h) => h.height === searchHeight);
      if (correctHeader) {
        nextHeader = correctHeader;
      } else {
        await sleep(1000);
      }
    }

    assert(nextHeader.height === searchHeight, "Got wrong header. This is a bug in the logic above.");
    return nextHeader;
  }
}

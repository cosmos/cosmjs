/* eslint-disable no-dupe-class-members, @typescript-eslint/ban-types, @typescript-eslint/naming-convention */
import { iavlSpec, ics23, tendermintSpec, verifyExistence, verifyNonExistence } from "@confio/ics23";
import { toAscii, toHex } from "@cosmjs/encoding";
import { firstEvent } from "@cosmjs/stream";
import { Client as TendermintClient, Header, NewBlockHeaderEvent, ProofOp } from "@cosmjs/tendermint-rpc";
import { arrayContentEquals, assert, assertDefinedAndNotNull, isNonNullObject, sleep } from "@cosmjs/utils";
import { Stream } from "xstream";

type QueryExtensionSetup<P> = (base: QueryClient) => P;

function checkAndParseOp(op: ProofOp, kind: string, key: Uint8Array): ics23.CommitmentProof {
  if (op.type !== kind) {
    throw new Error(`Op expected to be ${kind}, got "${op.type}`);
  }
  if (!arrayContentEquals(key, op.key)) {
    throw new Error(`Proven key different than queried key.\nQuery: ${toHex(key)}\nProven: ${toHex(op.key)}`);
  }
  return ics23.CommitmentProof.decode(op.data);
}

export class QueryClient {
  /** Constructs a QueryClient with 0 extensions */
  public static withExtensions(tmClient: TendermintClient): QueryClient;

  /** Constructs a QueryClient with 1 extension */
  public static withExtensions<A extends object>(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
  ): QueryClient & A;

  /** Constructs a QueryClient with 2 extensions */
  public static withExtensions<A extends object, B extends object>(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
  ): QueryClient & A & B;

  /** Constructs a QueryClient with 3 extensions */
  public static withExtensions<A extends object, B extends object, C extends object>(
    tmClient: TendermintClient,
    setupExtensionA: QueryExtensionSetup<A>,
    setupExtensionB: QueryExtensionSetup<B>,
    setupExtensionC: QueryExtensionSetup<C>,
  ): QueryClient & A & B & C;

  /** Constructs a QueryClient with 4 extensions */
  public static withExtensions<A extends object, B extends object, C extends object, D extends object>(
    tmClient: TendermintClient,
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
  public static withExtensions<
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
  public static withExtensions<
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
  public static withExtensions<
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

  public static withExtensions(
    tmClient: TendermintClient,
    ...extensionSetups: Array<QueryExtensionSetup<object>>
  ): any {
    const client = new QueryClient(tmClient);
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

  private readonly tmClient: TendermintClient;

  public constructor(tmClient: TendermintClient) {
    this.tmClient = tmClient;
  }

  public async queryVerified(store: string, key: Uint8Array): Promise<Uint8Array> {
    const response = await this.tmClient.abciQuery({
      // we need the StoreKey for the module, not the module name
      // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L12
      path: `/store/${store}/key`,
      data: key,
      prove: true,
    });

    if (response.code) {
      throw new Error(`Query failed with (${response.code}): ${response.log}`);
    }

    if (!arrayContentEquals(response.key, key)) {
      throw new Error(`Response key ${toHex(response.key)} doesn't match query key ${toHex(key)}`);
    }

    if (response.proof) {
      if (response.proof.ops.length !== 2) {
        throw new Error(
          `Expected 2 proof ops, got ${response.proof?.ops.length ?? 0}. Are you using stargate?`,
        );
      }

      const subProof = checkAndParseOp(response.proof.ops[0], "ics23:iavl", key);
      const storeProof = checkAndParseOp(response.proof.ops[1], "ics23:simple", toAscii(store));

      // this must always be existence, if the store is not a typo
      assert(storeProof.exist);
      assert(storeProof.exist.value);

      // this may be exist or non-exist, depends on response
      if (!response.value || response.value.length === 0) {
        // non-existence check
        assert(subProof.nonexist);
        // the subproof must map the desired key to the "value" of the storeProof
        verifyNonExistence(subProof.nonexist, iavlSpec, storeProof.exist.value, key);
      } else {
        // existence check
        assert(subProof.exist);
        assert(subProof.exist.value);
        // the subproof must map the desired key to the "value" of the storeProof
        verifyExistence(subProof.exist, iavlSpec, storeProof.exist.value, key, response.value);
      }

      // the storeproof must map it's declared value (root of subProof) to the appHash of the next block
      const header = await this.getNextHeader(response.height);
      verifyExistence(
        storeProof.exist,
        tendermintSpec,
        header.appHash,
        toAscii(store),
        storeProof.exist.value,
      );
    }

    return response.value;
  }

  public async queryUnverified(path: string, request: Uint8Array): Promise<Uint8Array> {
    const response = await this.tmClient.abciQuery({
      path: path,
      data: request,
      prove: false,
    });

    if (response.code) {
      throw new Error(`Query failed with (${response.code}): ${response.log}`);
    }

    return response.value;
  }

  // this must return the header for height+1
  // throws an error if height is 0 or undefined
  private async getNextHeader(height?: number): Promise<Header> {
    assertDefinedAndNotNull(height);
    if (height === 0) {
      throw new Error("Query returned height 0, cannot prove it");
    }

    const searchHeight = height + 1;
    let nextHeader: Header | undefined;
    let headersSubscription: Stream<NewBlockHeaderEvent> | undefined;
    try {
      headersSubscription = this.tmClient.subscribeNewBlockHeader();
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
      const correctHeader = (await this.tmClient.blockchain(height, searchHeight)).blockMetas
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

/* eslint-disable no-dupe-class-members, @typescript-eslint/ban-types, @typescript-eslint/naming-convention */
import { ics23, verifyExistence } from "@confio/ics23";
import { fromAscii, toHex } from "@cosmjs/encoding";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import { arrayContentEquals, assert, isNonNullObject } from "@cosmjs/utils";

// TODO: import these from @confio/ics23 when exported
export const IavlSpec: ics23.IProofSpec = {
  leafSpec: {
    prefix: Uint8Array.from([0]),
    hash: ics23.HashOp.SHA256,
    prehashValue: ics23.HashOp.SHA256,
    prehashKey: ics23.HashOp.NO_HASH,
    length: ics23.LengthOp.VAR_PROTO,
  },
  innerSpec: {
    childOrder: [0, 1],
    minPrefixLength: 4,
    maxPrefixLength: 12,
    childSize: 33,
    hash: ics23.HashOp.SHA256,
  },
};

export const TendermintSpec: ics23.IProofSpec = {
  leafSpec: {
    prefix: Uint8Array.from([0]),
    hash: ics23.HashOp.SHA256,
    prehashValue: ics23.HashOp.SHA256,
    prehashKey: ics23.HashOp.NO_HASH,
    length: ics23.LengthOp.VAR_PROTO,
  },
  innerSpec: {
    childOrder: [0, 1],
    minPrefixLength: 1,
    maxPrefixLength: 1,
    childSize: 32,
    hash: ics23.HashOp.SHA256,
  },
};

type QueryExtensionSetup<P> = (base: QueryClient) => P;

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

    assert(response.proof);
    if (response.proof.ops.length !== 2) {
      throw new Error(`Expected 2 proof ops, got ${response.proof.ops.length}. Are you using stargate?`);
    }

    const subOp = response.proof.ops[0];
    if (subOp.type !== "ics23:iavl") {
      throw new Error(`Sub-proof expected to be ics23:iavl, got "${subOp.type}`);
    }
    if (!arrayContentEquals(key, subOp.key)) {
      throw new Error(
        `Proven key different than queried key.\nQuery: ${toHex(key)}\nProven: ${toHex(subOp.key)}`,
      );
    }

    const storeOp = response.proof.ops[1];
    if (storeOp.type !== "ics23:simple") {
      throw new Error(`Store-proof expected to be ics23:simple, got "${storeOp.type}`);
    }
    if (store !== fromAscii(storeOp.key)) {
      throw new Error(`Proven store "${store}" different than queried store ${fromAscii(storeOp.key)}`);
    }

    assert(response.height);
    assert(response.height > 0);

    // parse proofs
    const subProof = ics23.CommitmentProof.decode(subOp.data);
    assert(subProof.exist);
    assert(subProof.exist.value);

    const storeProof = ics23.CommitmentProof.decode(storeOp.data);
    assert(storeProof.exist);
    assert(storeProof.exist.value);

    // the subproof must map the desired key to the "value" of the storeProof
    verifyExistence(subProof.exist, IavlSpec, storeProof.exist.value, key, response.value);

    // the storeproof must may it's declared value (root of subProof) to the appHash
    // TODO
    // // get the header for height + 1
    // await sleep(5000); // TODO: we can do better
    // // TODO: why don't we expose the header query, just height?
    // const header = await this.tmClient.block(response.height+1);
    // verifyExistence(storeProof.exist, TendermintSpec, header.block.header.appHash, toAscii(store), storeProof.exist.value!);

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
}

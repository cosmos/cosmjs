import Long from "long";
/**
 * Takes a bech32 encoded address and returns the data part. The prefix is ignored and discarded.
 * This is called AccAddress in Cosmos SDK, which is basically an alias for raw binary data.
 * The result is typically 20 bytes long but not restricted to that.
 */
export declare function toAccAddress(address: string): Uint8Array;
/**
 * Use this to convert a protobuf.js class to the interface (e.g. Coin to ICoin)
 * in a ways that makes Jasmine's toEqual happy.
 */
export declare function toObject<I extends object>(thing: I): Omit<I, never>;
export declare function createPagination(
  paginationKey?: Uint8Array,
): {
  readonly key: Uint8Array;
  readonly offset: Long;
  readonly limit: Long;
  readonly countTotal: boolean;
};

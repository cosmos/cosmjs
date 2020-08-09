/**
 * Converts default values to null in order to tell protobuf.js
 * to not serialize them.
 *
 * @see https://github.com/cosmos/cosmos-sdk/pull/6979
 */
export declare function omitDefault<T>(input: T): T | null;

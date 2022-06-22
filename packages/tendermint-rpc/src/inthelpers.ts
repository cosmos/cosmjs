import { Int53 } from "@cosmjs/math";

import { assertString } from "./tendermint34/encodings";

/**
 * Takes an integer value from the Tendermint RPC API and
 * returns it as number.
 *
 * Only works within the safe integer range.
 */
export function apiToSmallInt(input: string | number): number {
  const asInt = typeof input === "number" ? new Int53(input) : Int53.fromString(input);
  return asInt.toNumber();
}

/**
 * Takes an integer value from the Tendermint RPC API and
 * returns it as BigInt.
 *
 * This supports the full uint64 and int64 ranges.
 */
export function apiToBigInt(input: string): bigint {
  assertString(input); // Runtime check on top of TypeScript just to be safe for semi-trusted API types
  if (!input.match(/^-?[0-9]+$/)) {
    throw new Error("Invalid string format");
  }
  return BigInt(input);
}

/**
 * Takes an integer in the safe integer range and returns
 * a string representation to be used in the Tendermint RPC API.
 */
export function smallIntToApi(num: number): string {
  return new Int53(num).toString();
}

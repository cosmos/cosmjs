import { isNonNullObject, isUint8Array } from "@cosmjs/utils";
import Long from "long";

/**
 * Converts default values to null in order to tell protobuf.js
 * to not serialize them.
 *
 * @see https://github.com/cosmos/cosmos-sdk/pull/6979
 */
export function omitDefault<T>(input: T): T | null {
  if (input === undefined || input === null) return null;

  if (typeof input === "number" || typeof input === "boolean" || typeof input === "string") {
    return input || null;
  }

  if (Long.isLong(input)) {
    return !input.isZero() ? input : null;
  }

  if (Array.isArray(input) || isUint8Array(input)) {
    return input.length ? input : null;
  }

  throw new Error("Input type not supported");
}

/**
 * Walks through a potentially nested object and calls omitDefault on each element.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function omitDefaults(input: any): any {
  // Unset
  if (input === undefined || input === null) return null;

  // Protobuf element
  if (
    typeof input === "number" ||
    typeof input === "boolean" ||
    typeof input === "string" ||
    Long.isLong(input) ||
    Array.isArray(input) ||
    isUint8Array(input)
  ) {
    return omitDefault(input);
  }

  // Object
  if (isNonNullObject(input)) {
    return Object.entries(input).reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key]: omitDefaults(value),
      }),
      {},
    );
  }

  throw new Error(`Input type not supported: ${typeof input}`);
}

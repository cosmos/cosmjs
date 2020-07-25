import { Uint64 } from "@cosmjs/math";

/**
 * Converts an integer expressed as number or string to a number.
 * Throws if input is not a valid uint64 or if the value exceeds MAX_SAFE_INTEGER.
 *
 * This is needed for supporting Comsos SDK 0.37/0.38/0.39 with one client.
 */
export function uint64ToNumber(input: number | string): number {
  const value = typeof input === "number" ? Uint64.fromNumber(input) : Uint64.fromString(input);
  return value.toNumber();
}

/**
 * Converts an integer expressed as number or string to a string.
 * Throws if input is not a valid uint64.
 *
 * This is needed for supporting Comsos SDK 0.37/0.38/0.39 with one client.
 */
export function uint64ToString(input: number | string): string {
  const value = typeof input === "number" ? Uint64.fromNumber(input) : Uint64.fromString(input);
  return value.toString();
}

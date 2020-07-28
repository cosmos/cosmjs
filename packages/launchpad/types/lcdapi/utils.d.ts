import { PubKey } from "../types";
/**
 * Converts an integer expressed as number or string to a number.
 * Throws if input is not a valid uint64 or if the value exceeds MAX_SAFE_INTEGER.
 *
 * This is needed for supporting Comsos SDK 0.37/0.38/0.39 with one client.
 */
export declare function uint64ToNumber(input: number | string): number;
/**
 * Converts an integer expressed as number or string to a string.
 * Throws if input is not a valid uint64.
 *
 * This is needed for supporting Comsos SDK 0.37/0.38/0.39 with one client.
 */
export declare function uint64ToString(input: number | string): string;
/**
 * Normalizes a pubkey as in `BaseAccount.public_key` to allow supporting
 * Comsos SDK 0.37–0.39.
 *
 * Returns null when unset.
 */
export declare function normalizePubkey(input: string | PubKey | null): PubKey | null;

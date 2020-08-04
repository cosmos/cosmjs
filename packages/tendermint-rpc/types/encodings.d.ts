import { As } from "type-tagger";
import { BlockId, ReadonlyDateWithNanoseconds, Version } from "./responses";
export declare type Base64String = string & As<"base64">;
export declare type HexString = string & As<"hex">;
export declare type IntegerString = string & As<"integer">;
export declare type DateTimeString = string & As<"datetime">;
/**
 * A runtime checker that ensures a given value is set (i.e. not undefined or null)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 */
export declare function assertSet<T>(value: T): T;
/**
 * A runtime checker that ensures a given value is a boolean
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export declare function assertBoolean(value: boolean): boolean;
/**
 * A runtime checker that ensures a given value is a number
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export declare function assertNumber(value: number): number;
/**
 * A runtime checker that ensures a given value is an array
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export declare function assertArray<T>(value: readonly T[]): readonly T[];
/**
 * A runtime checker that ensures a given value is an object in the sense of JSON
 * (an unordered collection of key–value pairs where the keys are strings)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export declare function assertObject<T>(value: T): T;
/**
 * Throws an error if value matches the empty value for the
 * given type (array/string of length 0, number of value 0, ...)
 *
 * Otherwise returns the value.
 *
 * This implies assertSet
 */
export declare function assertNotEmpty<T>(value: T): T;
export declare function optional<T>(value: T | null | undefined, fallback: T): T;
export declare function may<T, U>(transform: (val: T) => U, value: T | null | undefined): U | undefined;
export declare function dictionaryToStringMap(obj: Record<string, unknown>): Map<string, string>;
export declare class Integer {
  static parse(input: IntegerString | number): number;
  static encode(num: number): IntegerString;
}
export declare class Base64 {
  static encode(data: Uint8Array): Base64String;
  static decode(base64String: Base64String): Uint8Array;
}
export declare class DateTime {
  static decode(dateTimeString: DateTimeString): ReadonlyDateWithNanoseconds;
}
export declare class Hex {
  static encode(data: Uint8Array): HexString;
  static decode(hexString: HexString): Uint8Array;
}
export declare function encodeString(s: string): Uint8Array;
export declare function encodeInt(n: number): Uint8Array;
export declare function encodeTime(time: ReadonlyDateWithNanoseconds): Uint8Array;
export declare function encodeBytes(bytes: Uint8Array): Uint8Array;
export declare function encodeVersion(version: Version): Uint8Array;
export declare function encodeBlockId(blockId: BlockId): Uint8Array;

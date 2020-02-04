import { Encoding, Int53 } from "@iov/encoding";
import { As } from "type-tagger";

export type Base64String = string & As<"base64">;
export type HexString = string & As<"hex">;
export type IntegerString = string & As<"integer">;
export type DateTimeString = string & As<"datetime">;

/**
 * A runtime checker that ensures a given value is set (i.e. not undefined or null)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 */
export function assertSet<T>(value: T): T {
  if ((value as unknown) === undefined) {
    throw new Error("Value must not be undefined");
  }

  if ((value as unknown) === null) {
    throw new Error("Value must not be null");
  }

  return value;
}

/**
 * A runtime checker that ensures a given value is a boolean
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertBoolean(value: boolean): boolean {
  assertSet(value);
  if (typeof (value as unknown) !== "boolean") {
    throw new Error("Value must be a boolean");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is a boolean
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertString(value: string): string {
  assertSet(value);
  if (typeof (value as unknown) !== "string") {
    throw new Error("Value must be a string");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is a number
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertNumber(value: number): number {
  assertSet(value);
  if (typeof (value as unknown) !== "number") {
    throw new Error("Value must be a number");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is an array
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertArray<T>(value: readonly T[]): readonly T[] {
  assertSet(value);
  if (!Array.isArray(value as unknown)) {
    throw new Error("Value must be a an array");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is an object in the sense of JSON
 * (an unordered collection of key–value pairs where the keys are strings)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertObject<T>(value: T): T {
  assertSet(value);
  if (typeof (value as unknown) !== "object") {
    throw new Error("Value must be an object");
  }

  // Exclude special kind of objects like Array, Date or Uint8Array
  // Object.prototype.toString() returns a specified value:
  // http://www.ecma-international.org/ecma-262/7.0/index.html#sec-object.prototype.tostring
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    throw new Error("Value must be a simple object");
  }

  return value;
}

interface Lengther {
  readonly length: number;
}

/**
 * Throws an error if value matches the empty value for the
 * given type (array/string of length 0, number of value 0, ...)
 *
 * Otherwise returns the value.
 *
 * This implies assertSet
 */
export function assertNotEmpty<T>(value: T): T {
  assertSet(value);

  if (typeof value === "number" && value === 0) {
    throw new Error("must provide a non-zero value");
  } else if (((value as any) as Lengther).length === 0) {
    throw new Error("must provide a non-empty value");
  }
  return value;
}

// optional uses the value or provides a default
export function optional<T>(value: T | null | undefined, fallback: T): T {
  return value === undefined || value === null ? fallback : value;
}

// may will run the transform if value is defined, otherwise returns undefined
export function may<T, U>(transform: (val: T) => U, value: T | null | undefined): U | undefined {
  return value === undefined || value === null ? undefined : transform(value);
}

export function dictionaryToStringMap(obj: any): Map<string, string> {
  const out = new Map<string, string>();
  for (const key of Object.keys(obj)) {
    const value: unknown = obj[key];
    if (typeof value !== "string") {
      throw new Error("Found dictionary value of type other than string");
    }
    out.set(key, value);
  }
  return out;
}

export class Integer {
  public static parse(input: IntegerString | number): number {
    const asInt = typeof input === "number" ? new Int53(input) : Int53.fromString(input);
    return asInt.toNumber();
  }

  public static encode(num: number): IntegerString {
    return new Int53(num).toString() as IntegerString;
  }
}

export class Base64 {
  public static encode(data: Uint8Array): Base64String {
    return Encoding.toBase64(data) as Base64String;
  }

  public static decode(base64String: Base64String): Uint8Array {
    return Encoding.fromBase64(base64String);
  }
}

export class Hex {
  public static encode(data: Uint8Array): HexString {
    return Encoding.toHex(data) as HexString;
  }

  public static decode(hexString: HexString): Uint8Array {
    return Encoding.fromHex(hexString);
  }
}

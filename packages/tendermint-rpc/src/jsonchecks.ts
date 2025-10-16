// This file contains runtime check for return values
// of a JSON API. They have a few things in common:
// 1. JSON inputs are expected. I.e. non-JSON values like Infinity or Uint8Array are not handled.
// 2. They have in input type we THINK the API returns but we don't trust that type.
// 3. The input value is returned unchanged if the check passes and an exception is thrown otherwise.

/**
 * A runtime checker that ensures a given value is set (i.e. not undefined or null)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 */
export function jCheckSet<T>(value: T): T {
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
 * This implies jCheckSet.
 */
export function jCheckBoolean(value: boolean): boolean {
  jCheckSet(value);
  if (typeof (value as unknown) !== "boolean") {
    throw new Error("Value must be a boolean");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is a string.
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies jCheckSet.
 */
export function jCheckString(value: string): string {
  jCheckSet(value);
  if (typeof (value as unknown) !== "string") {
    throw new Error("Value must be a string");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is a number
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies jCheckSet.
 */
export function jCheckNumber(value: number): number {
  jCheckSet(value);
  if (typeof (value as unknown) !== "number") {
    throw new Error("Value must be a number");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is an array
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies jCheckSet.
 */
export function jCheckArray<T>(value: readonly T[]): readonly T[] {
  jCheckSet(value);
  if (!Array.isArray(value as unknown)) {
    throw new Error("Value must be an array");
  }
  return value;
}

/**
 * A runtime checker that ensures a given value is an object in the sense of JSON
 * (an unordered collection of key–value pairs where the keys are strings)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies jCheckSet.
 */
export function jCheckObject<T>(value: T): T {
  jCheckSet(value);
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
 * This implies jCheckSet.
 */
export function jCheckNotEmpty<T>(value: T): T {
  jCheckSet(value);

  if (typeof value === "number" && value === 0) {
    throw new Error("must provide a non-zero value");
  } else if ((value as any as Lengther).length === 0) {
    throw new Error("must provide a non-empty value");
  }
  return value;
}

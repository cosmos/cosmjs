/**
 * A single JSON value. This is the missing return type of JSON.parse().
 */
export type JsonCompatibleValue =
  | JsonCompatibleDictionary
  | JsonCompatibleArray
  | string
  | number
  | boolean
  | null;

/**
 * An array of JsonCompatibleValue
 */
// Use interface extension instead of type alias to make circular declaration possible.
export interface JsonCompatibleArray extends ReadonlyArray<JsonCompatibleValue> {}

/**
 * A string to json value dictionary.
 */
export interface JsonCompatibleDictionary {
  readonly [key: string]: JsonCompatibleValue | readonly JsonCompatibleValue[];
}

export function isJsonCompatibleValue(value: unknown): value is JsonCompatibleValue {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isJsonCompatibleArray(value) ||
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isJsonCompatibleDictionary(value)
  ) {
    return true;
  } else {
    return false;
  }
}

export function isJsonCompatibleArray(value: unknown): value is JsonCompatibleArray {
  if (!Array.isArray(value)) {
    return false;
  }

  for (const item of value) {
    if (!isJsonCompatibleValue(item)) {
      return false;
    }
  }

  // all items okay
  return true;
}

export function isJsonCompatibleDictionary(value: unknown): value is JsonCompatibleDictionary {
  if (typeof value !== "object" || value === null) {
    // value must be a non-null object
    return false;
  }

  // Exclude special kind of objects like Array, Date or Uint8Array
  // Object.prototype.toString() returns a specified value:
  // http://www.ecma-international.org/ecma-262/7.0/index.html#sec-object.prototype.tostring
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  return Object.values(value).every(isJsonCompatibleValue);
}

/**
 * A single JSON value. This is the missing return type of JSON.parse().
 */
export type JsonValue = JsonObject | JsonArray | string | number | boolean | null;

/**
 * An array of JsonValue
 */
// Use interface extension instead of type alias to make circular declaration possible.
export interface JsonArray extends ReadonlyArray<JsonValue> {}

/**
 * A string to json value dictionary.
 */
export interface JsonObject {
  readonly [key: string]: JsonValue;
}

export function isJsonValue(value: unknown): value is JsonValue {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isJsonArray(value) ||
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isJsonObject(value)
  ) {
    return true;
  } else {
    return false;
  }
}

export function isJsonArray(value: unknown): value is JsonArray {
  if (!Array.isArray(value)) {
    return false;
  }

  for (const item of value) {
    if (!isJsonValue(item)) {
      return false;
    }
  }

  // all items okay
  return true;
}

export function isJsonObject(value: unknown): value is JsonObject {
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

  return Object.values(value).every(isJsonValue);
}

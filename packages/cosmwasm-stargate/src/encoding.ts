import { fromBase64, fromUtf8, toBase64, toUtf8 } from "@cosmjs/encoding";

/**
 * Takes a value, serializes it to JSON and encodes it as base64.
 *
 * This can be used for creating values of fields that have the CosmWasm Binary type.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function toBinary(obj: any): string {
  return toBase64(toUtf8(JSON.stringify(obj)));
}

/**
 * Takes a base64 string, decodes it and parses the content from JSON to an object.
 *
 * This can be used for parsing the values of a CosmWasm Binary field.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fromBinary(base64: string): any {
  return JSON.parse(fromUtf8(fromBase64(base64)));
}

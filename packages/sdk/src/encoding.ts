import { Encoding } from "@iov/encoding";

import { StdTx } from "./types";

export function sortJson(json: any): any {
  if (typeof json !== "object" || json === null) {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(sortJson);
  }
  const sortedKeys = Object.keys(json).sort();
  const result = sortedKeys.reduce(
    (accumulator, key) => ({
      ...accumulator,
      [key]: sortJson(json[key]),
    }),
    {},
  );
  return result;
}

export function marshalTx(tx: StdTx): Uint8Array {
  const json = JSON.stringify(tx);
  return Encoding.toUtf8(json);
}

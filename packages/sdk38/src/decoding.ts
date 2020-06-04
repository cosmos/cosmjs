import { fromUtf8 } from "@iov/encoding";

import { isStdTx, StdTx } from "./types";

export function unmarshalTx(data: Uint8Array): StdTx {
  const decoded = JSON.parse(fromUtf8(data));
  if (!isStdTx(decoded)) {
    throw new Error("Must be json encoded StdTx");
  }
  return decoded;
}

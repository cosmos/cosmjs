import { Encoding } from "@iov/encoding";

import { isStdTx, StdTx } from "./types";

export function unmarshalTx(data: Uint8Array): StdTx {
  const decoded = JSON.parse(Encoding.fromUtf8(data));
  if (!isStdTx(decoded)) {
    throw new Error("Must be json encoded StdTx");
  }
  return decoded;
}

import { Encoding } from "@iov/encoding";

import { isAminoStdTx, StdTx } from "./types";

export function unmarshalTx(data: Uint8Array): StdTx {
  const decoded = JSON.parse(Encoding.fromUtf8(data));
  if (!isAminoStdTx(decoded)) {
    throw new Error("Must be json encoded StdTx");
  }
  return decoded;
}

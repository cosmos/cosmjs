import { Encoding } from "@iov/encoding";

import { StdTx } from "./types";

export function marshalTx(tx: StdTx): Uint8Array {
  const json = JSON.stringify(tx);
  return Encoding.toUtf8(json);
}

/* eslint-disable @typescript-eslint/naming-convention */
import { cosmos } from "./generated/codecimpl";

const { SignDoc } = cosmos.tx;

export function makeSignBytes(signDoc: cosmos.tx.ISignDoc): Uint8Array {
  return Uint8Array.from(SignDoc.encode(signDoc).finish());
}

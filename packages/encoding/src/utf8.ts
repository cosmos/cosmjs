import { fixUint8Array } from "./uint8array.js";

export function toUtf8(str: string): Uint8Array<ArrayBuffer> {
  return fixUint8Array(new TextEncoder().encode(str));
}

/**
 * Takes UTF-8 data and decodes it to a string.
 *
 * In lossy mode, the [REPLACEMENT CHARACTER](https://en.wikipedia.org/wiki/Specials_(Unicode_block))
 * is used to substitute invalid encodings.
 * By default lossy mode is off and invalid data will lead to exceptions.
 */
export function fromUtf8(data: Uint8Array, lossy = false): string {
  const fatal = !lossy;
  return new TextDecoder("utf-8", { fatal }).decode(data);
}

import { toUtf8 } from "@cosmjs/encoding";

import { ReadonlyDateWithNanoseconds } from "../dates";
import { BlockId, Version } from "./responses";

// may will run the transform if value is defined, otherwise returns undefined
export function may<T, U>(transform: (val: T) => U, value: T | null | undefined): U | undefined {
  return value === undefined || value === null ? undefined : transform(value);
}

export function dictionaryToStringMap(obj: Record<string, unknown>): Map<string, string> {
  const out = new Map<string, string>();
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value !== "string") {
      throw new Error("Found dictionary value of type other than string");
    }
    out.set(key, value);
  }
  return out;
}

// Encodings needed for hashing block headers
// Several of these functions are inspired by https://github.com/nomic-io/js-tendermint/blob/tendermint-0.30/src/

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L193-L195
export function encodeString(s: string): Uint8Array {
  const utf8 = toUtf8(s);
  return Uint8Array.from([utf8.length, ...utf8]);
}

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L79-L87
export function encodeUvarint(n: number): Uint8Array {
  return n >= 0x80
    ? // eslint-disable-next-line no-bitwise
      Uint8Array.from([(n & 0xff) | 0x80, ...encodeUvarint(n >> 7)])
    : // eslint-disable-next-line no-bitwise
      Uint8Array.from([n & 0xff]);
}

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L134-L178
export function encodeTime(time: ReadonlyDateWithNanoseconds): Uint8Array {
  const milliseconds = time.getTime();
  const seconds = Math.floor(milliseconds / 1000);
  const secondsArray = seconds ? [0x08, ...encodeUvarint(seconds)] : new Uint8Array();
  const nanoseconds = (time.nanoseconds || 0) + (milliseconds % 1000) * 1e6;
  const nanosecondsArray = nanoseconds ? [0x10, ...encodeUvarint(nanoseconds)] : new Uint8Array();
  return Uint8Array.from([...secondsArray, ...nanosecondsArray]);
}

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L180-L187
export function encodeBytes(bytes: Uint8Array): Uint8Array {
  // Since we're only dealing with short byte arrays we don't need a full VarBuffer implementation yet
  if (bytes.length >= 0x80) throw new Error("Not implemented for byte arrays of length 128 or more");
  return bytes.length ? Uint8Array.from([bytes.length, ...bytes]) : new Uint8Array();
}

export function encodeVersion(version: Version): Uint8Array {
  const blockArray = version.block
    ? Uint8Array.from([0x08, ...encodeUvarint(version.block)])
    : new Uint8Array();
  const appArray = version.app ? Uint8Array.from([0x10, ...encodeUvarint(version.app)]) : new Uint8Array();
  return Uint8Array.from([...blockArray, ...appArray]);
}

export function encodeBlockId(blockId: BlockId): Uint8Array {
  return Uint8Array.from([
    0x0a,
    blockId.hash.length,
    ...blockId.hash,
    0x12,
    blockId.parts.hash.length + 4,
    0x08,
    blockId.parts.total,
    0x12,
    blockId.parts.hash.length,
    ...blockId.parts.hash,
  ]);
}

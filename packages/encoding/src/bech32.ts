import { bech32, bech32m } from "@scure/base";

import { fixUint8Array } from "./uint8array";

/** The two Bech32 checksum variants: BIP173 (bech32) and BIP350 (bech32m). */
export type Bech32Encoding = "bech32" | "bech32m";

export function toBech32(
  prefix: string,
  data: Uint8Array,
  limit?: number,
  encoding: Bech32Encoding = "bech32",
): string {
  const impl = encoding === "bech32m" ? bech32m : bech32;
  const address = impl.encode(prefix, impl.toWords(data), limit);
  return address;
}

function hasBech32Separator(input: string): input is `${string}1${string}` {
  return input.indexOf("1") !== -1;
}

export function fromBech32(
  address: string,
  limit = Infinity,
): { readonly prefix: string; readonly data: Uint8Array<ArrayBuffer>; readonly encoding: Bech32Encoding } {
  // This extra check can be removed once
  // https://github.com/paulmillr/scure-base/pull/45 is merged and published.
  if (!hasBech32Separator(address)) throw new Error(`No bech32 separator found`);

  // The bech32 and bech32m checksums use different constants, so at most one of
  // the two decodes a given address. Try bech32 (the common case for Cosmos
  // accounts) first, then bech32m. `fromWords` is identical for both variants.
  let decoded: { readonly prefix: string; readonly words: number[] };
  let encoding: Bech32Encoding;
  try {
    decoded = bech32.decode(address, limit);
    encoding = "bech32";
  } catch {
    decoded = bech32m.decode(address, limit);
    encoding = "bech32m";
  }
  return {
    prefix: decoded.prefix,
    data: fixUint8Array(bech32.fromWords(decoded.words)),
    encoding,
  };
}

/**
 * Takes a bech32 or bech32m address and returns a normalized (i.e. lower case)
 * representation of it, preserving the original checksum variant.
 *
 * The input is validated along the way, which makes this significantly safer than
 * using `address.toLowerCase()`.
 */
export function normalizeBech32(address: string): string {
  const { prefix, data, encoding } = fromBech32(address);
  return toBech32(prefix, data, undefined, encoding);
}

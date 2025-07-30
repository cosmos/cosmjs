import { assert } from "@cosmjs/utils";
import { pbkdf2Async as noblePbkdf2Async } from "@noble/hashes/pbkdf2";
import { sha512 as nobleSha512 } from "@noble/hashes/sha512";

export async function getSubtle(): Promise<any | undefined> {
  // From Node.js 15 onwards, webcrypto is available in globalThis.
  // In version 15 and 16 this was stored under the webcrypto key.
  // With Node.js 17 it was moved to the same locations where browsers
  // make it available.
  // Loading `require("crypto")` here seems unnecessary since it only
  // causes issues with bundlers and does not increase compatibility.

  // Browsers and Node.js 17+
  let subtle: any | undefined = (globalThis as any)?.crypto?.subtle;
  // Node.js 15+
  if (!subtle) subtle = (globalThis as any)?.crypto?.webcrypto?.subtle;

  return subtle;
}

export async function pbkdf2Sha512Subtle(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  subtle: any,
  secret: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
): Promise<Uint8Array> {
  assert(subtle, "Argument subtle is falsy");
  assert(typeof subtle === "object", "Argument subtle is not of type object");
  assert(typeof subtle.importKey === "function", "subtle.importKey is not a function");
  assert(typeof subtle.deriveBits === "function", "subtle.deriveBits is not a function");

  return subtle.importKey("raw", secret, { name: "PBKDF2" }, false, ["deriveBits"]).then((key: Uint8Array) =>
    subtle
      .deriveBits(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: iterations,
          hash: { name: "SHA-512" },
        },
        key,
        keylen * 8,
      )
      .then((buffer: ArrayBuffer) => new Uint8Array(buffer)),
  );
}

export async function pbkdf2Sha512Noble(
  secret: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
): Promise<Uint8Array> {
  return noblePbkdf2Async(nobleSha512, secret, salt, { c: iterations, dkLen: keylen });
}

/**
 * A pbkdf2 implementation for BIP39. This is not exported at package level and thus a private API.
 */
export async function pbkdf2Sha512(
  secret: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
): Promise<Uint8Array> {
  const subtle = await getSubtle();
  if (subtle) {
    return pbkdf2Sha512Subtle(subtle, secret, salt, iterations, keylen);
  } else {
    return pbkdf2Sha512Noble(secret, salt, iterations, keylen);
  }
}

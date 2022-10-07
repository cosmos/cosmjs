import { assert } from "@cosmjs/utils";
import { pbkdf2Async as noblePbkdf2Async } from "@noble/hashes/pbkdf2";
import { sha512 as nobleSha512 } from "@noble/hashes/sha512";

/**
 * Returns the Node.js crypto module when available, the Expo crypto module after that,
 * and `undefined` otherwise.
 *
 * Detects an unimplemented fallback module from Webpack 5 and returns
 * `undefined` in that case.
 */
export async function getCryptoModule(): Promise<any | undefined> {
  try {
    const crypto = await import("crypto");
    // We get `Object{default: Object{}}` as a fallback when using
    // `crypto: false` in Webpack 5, which we interpret as unavailable.
    if (!(typeof crypto === "object" && Object.keys(crypto).length <= 1)) {
      return crypto;
    }
  } catch {}

  try {
    const crypto = await import("expo-crypto");
    // We get `Object{default: Object{}}` as a fallback when using
    // `crypto: false` in Webpack 5, which we interpret as unavailable.
    if (!(typeof crypto === "object" && Object.keys(crypto).length <= 1)) {
      return crypto;
    }
  } catch {}

  return undefined;
}

export async function getSubtle(): Promise<any | undefined> {
  const g: any = globalThis;
  let subtle = g.crypto && g.crypto.subtle;
  if (!subtle) {
    const crypto = await getCryptoModule();
    if (crypto && crypto.webcrypto && crypto.webcrypto.subtle) {
      subtle = crypto.webcrypto.subtle;
    }
  }
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

export async function pbkdf2Sha512Crypto(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  crypto: any,
  secret: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
): Promise<Uint8Array> {
  assert(crypto, "Argument crypto is falsy");
  assert(typeof crypto === "object", "Argument crypto is not of type object");
  assert(typeof crypto.pbkdf2 === "function", "crypto.pbkdf2 is not a function");

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(secret, salt, iterations, keylen, "sha512", (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(Uint8Array.from(result));
      }
    });
  });
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
    const crypto = await getCryptoModule();
    if (crypto) {
      return pbkdf2Sha512Crypto(crypto, secret, salt, iterations, keylen);
    } else {
      return pbkdf2Sha512Noble(secret, salt, iterations, keylen);
    }
  }
}

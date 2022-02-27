import { assert } from "@cosmjs/utils";

export async function getSubtle(): Promise<any | undefined> {
  const g: any = globalThis;
  let subtle = g.crypto && g.crypto.subtle;
  if (!subtle) {
    const crypto: any = await import("crypto");
    if (crypto.webcrypto && crypto.webcrypto.subtle) {
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
    const module = await import("crypto");
    return new Promise((resolve, reject) => {
      module.pbkdf2(secret, salt, iterations, keylen, "sha512", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(Uint8Array.from(result));
        }
      });
    });
  }
}

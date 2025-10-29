import { assert, isNonNullObject } from "@cosmjs/utils";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import { ed25519 } from "@noble/curves/ed25519.js";
import { type IArgon2Options, argon2id } from "hash-wasm";

export interface Argon2idOptions {
  /** Output length in bytes */
  readonly outputLength: number;
  /**
   * An integer between 1 and 4294967295 representing the computational difficulty.
   *
   * @see https://libsodium.gitbook.io/doc/password_hashing/default_phf#key-derivation
   */
  readonly opsLimit: number;
  /**
   * Memory limit measured in KiB (like argon2 command line tool)
   *
   * Note: only approximately 16 MiB of memory are available using the non-sumo version of libsodium.js
   *
   * @see https://libsodium.gitbook.io/doc/password_hashing/default_phf#key-derivation
   */
  readonly memLimitKib: number;
}

export function isArgon2idOptions(thing: unknown): thing is Argon2idOptions {
  if (!isNonNullObject(thing)) return false;
  if (typeof (thing as Argon2idOptions).outputLength !== "number") return false;
  if (typeof (thing as Argon2idOptions).opsLimit !== "number") return false;
  if (typeof (thing as Argon2idOptions).memLimitKib !== "number") return false;
  return true;
}

export class Argon2id {
  public static async execute(
    password: string,
    salt: Uint8Array,
    options: Argon2idOptions,
  ): Promise<Uint8Array> {
    const opts: IArgon2Options = {
      password,
      salt,
      outputType: "binary",
      iterations: options.opsLimit,
      memorySize: options.memLimitKib,
      parallelism: 1, // no parallelism allowed, just like libsodium
      hashLength: options.outputLength,
    };

    if (salt.length !== 16) {
      throw new Error(`Got invalid salt length ${salt.length}. Must be 16.`);
    }

    const hash = await argon2id(opts);
    // guaranteed by outputType: 'binary'
    assert(typeof hash !== "string");
    return hash;
  }
}

export class Ed25519Keypair {
  // a libsodium privkey has the format `<ed25519 privkey> + <ed25519 pubkey>`
  public static fromLibsodiumPrivkey(libsodiumPrivkey: Uint8Array): Ed25519Keypair {
    if (libsodiumPrivkey.length !== 64) {
      throw new Error(`Unexpected key length ${libsodiumPrivkey.length}. Must be 64.`);
    }
    return new Ed25519Keypair(libsodiumPrivkey.slice(0, 32), libsodiumPrivkey.slice(32, 64));
  }

  public readonly privkey: Uint8Array;
  public readonly pubkey: Uint8Array;

  public constructor(privkey: Uint8Array, pubkey: Uint8Array) {
    this.privkey = privkey;
    this.pubkey = pubkey;
  }

  public toLibsodiumPrivkey(): Uint8Array<ArrayBuffer> {
    return new Uint8Array([...this.privkey, ...this.pubkey]);
  }
}

export class Ed25519 {
  /**
   * Generates a keypair deterministically from a given 32 bytes seed.
   *
   * This seed equals the Ed25519 private key.
   * For implementation details see crypto_sign_seed_keypair in
   * https://download.libsodium.org/doc/public-key_cryptography/public-key_signatures.html
   * and diagram on https://blog.mozilla.org/warner/2011/11/29/ed25519-keys/
   */
  public static async makeKeypair(privKey: Uint8Array): Promise<Ed25519Keypair> {
    const pubKey = ed25519.getPublicKey(privKey);
    return new Ed25519Keypair(privKey, pubKey);
  }

  public static async createSignature(message: Uint8Array, keyPair: Ed25519Keypair): Promise<Uint8Array> {
    return ed25519.sign(message, keyPair.privkey);
  }

  public static async verifySignature(
    signature: Uint8Array,
    message: Uint8Array,
    pubkey: Uint8Array,
  ): Promise<boolean> {
    return ed25519.verify(signature, message, pubkey);
  }
}

/**
 * Nonce length in bytes for all flavours of XChaCha20.
 *
 * @see https://libsodium.gitbook.io/doc/advanced/stream_ciphers/xchacha20#notes
 */
export const xchacha20NonceLength = 24;

export class Xchacha20poly1305Ietf {
  public static async encrypt(message: Uint8Array, key: Uint8Array, nonce: Uint8Array): Promise<Uint8Array> {
    const additionalAuthenticatedData = undefined;

    const cipher = xchacha20poly1305(key, nonce, additionalAuthenticatedData);

    return cipher.encrypt(message);
  }

  public static async decrypt(
    ciphertext: Uint8Array,
    key: Uint8Array,
    nonce: Uint8Array,
  ): Promise<Uint8Array> {
    const additionalAuthenticatedData = undefined;

    const cipher = xchacha20poly1305(key, nonce, additionalAuthenticatedData);

    return cipher.decrypt(ciphertext);
  }
}

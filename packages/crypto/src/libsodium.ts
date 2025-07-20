// Keep all classes requiring libsodium-js in one file as having multiple
// requiring of the libsodium-wrappers module currently crashes browsers
//
// libsodium.js API: https://gist.github.com/webmaster128/b2dbe6d54d36dd168c9fabf441b9b09c

import { isNonNullObject } from "@cosmjs/utils";
import { XChaCha20Poly1305 } from "@stablelib/xchacha20poly1305";
// Using crypto_pwhash requires sumo. Once we migrate to a standalone
// Argon2 implementation, we can use the normal libsodium-wrappers
// again: https://github.com/cosmos/cosmjs/issues/1031
import sodium from "libsodium-wrappers-sumo";
import nacl from "tweetnacl";

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
    await sodium.ready;
    return sodium.crypto_pwhash(
      options.outputLength,
      password,
      salt, // libsodium only supports 16 byte salts and will throw when you don't respect that
      options.opsLimit,
      options.memLimitKib * 1024,
      sodium.crypto_pwhash_ALG_ARGON2ID13,
    );
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

  public toLibsodiumPrivkey(): Uint8Array {
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
  public static async makeKeypair(seed: Uint8Array): Promise<Ed25519Keypair> {
    const keypair = nacl.sign.keyPair.fromSeed(seed);
    return Ed25519Keypair.fromLibsodiumPrivkey(keypair.secretKey);
  }

  public static async createSignature(message: Uint8Array, keyPair: Ed25519Keypair): Promise<Uint8Array> {
    return nacl.sign.detached(message, keyPair.toLibsodiumPrivkey());
  }

  public static async verifySignature(
    signature: Uint8Array,
    message: Uint8Array,
    pubkey: Uint8Array,
  ): Promise<boolean> {
    return nacl.sign.detached.verify(message, signature, pubkey);
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
    const associatedData = undefined;

    const k = new XChaCha20Poly1305(key);

    let ciphertext: Uint8Array = new Uint8Array(message.length + k.tagLength);
    ciphertext = k.seal(nonce, message, associatedData, ciphertext);

    return ciphertext;
  }

  public static async decrypt(
    ciphertext: Uint8Array,
    key: Uint8Array,
    nonce: Uint8Array,
  ): Promise<Uint8Array> {
    const associatedData = undefined;

    const k = new XChaCha20Poly1305(key);

    const plaintextBuffer = new Uint8Array(ciphertext.length - k.tagLength);
    const plaintext = k.open(nonce, ciphertext, associatedData, plaintextBuffer);

    if (plaintext == null) {
      throw new Error("ciphertext cannot be decrypted using that key");
    }

    return plaintext;
  }
}

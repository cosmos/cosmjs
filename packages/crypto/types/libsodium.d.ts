import { As } from "type-tagger";
export declare type Xchacha20poly1305IetfKey = Uint8Array & As<"xchacha20poly1305ietf-key">;
export declare type Xchacha20poly1305IetfMessage = Uint8Array & As<"xchacha20poly1305ietf-message">;
export declare type Xchacha20poly1305IetfNonce = Uint8Array & As<"xchacha20poly1305ietf-nonce">;
export declare type Xchacha20poly1305IetfCiphertext = Uint8Array & As<"xchacha20poly1305ietf-ciphertext">;
export interface Argon2idOptions {
  readonly outputLength: number;
  readonly opsLimit: number;
  readonly memLimitKib: number;
}
export declare class Argon2id {
  static execute(password: string, salt: Uint8Array, options: Argon2idOptions): Promise<Uint8Array>;
}
export declare class Ed25519Keypair {
  static fromLibsodiumPrivkey(libsodiumPrivkey: Uint8Array): Ed25519Keypair;
  readonly privkey: Uint8Array;
  readonly pubkey: Uint8Array;
  constructor(privkey: Uint8Array, pubkey: Uint8Array);
  toLibsodiumPrivkey(): Uint8Array;
}
export declare class Ed25519 {
  /**
   * Generates a keypair deterministically from a given 32 bytes seed.
   *
   * This seed equals the Ed25519 private key.
   * For implementation details see crypto_sign_seed_keypair in
   * https://download.libsodium.org/doc/public-key_cryptography/public-key_signatures.html
   * and diagram on https://blog.mozilla.org/warner/2011/11/29/ed25519-keys/
   */
  static makeKeypair(seed: Uint8Array): Promise<Ed25519Keypair>;
  static createSignature(message: Uint8Array, keyPair: Ed25519Keypair): Promise<Uint8Array>;
  static verifySignature(signature: Uint8Array, message: Uint8Array, pubkey: Uint8Array): Promise<boolean>;
}
export declare class Xchacha20poly1305Ietf {
  static encrypt(
    message: Xchacha20poly1305IetfMessage,
    key: Xchacha20poly1305IetfKey,
    nonce: Xchacha20poly1305IetfNonce,
  ): Promise<Xchacha20poly1305IetfCiphertext>;
  static decrypt(
    ciphertext: Xchacha20poly1305IetfCiphertext,
    key: Xchacha20poly1305IetfKey,
    nonce: Xchacha20poly1305IetfNonce,
  ): Promise<Xchacha20poly1305IetfMessage>;
}

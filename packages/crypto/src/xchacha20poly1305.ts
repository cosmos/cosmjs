import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";

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

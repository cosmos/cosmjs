import {
  Argon2id,
  HdPath,
  isArgon2idOptions,
  Random,
  Sha256,
  Sha512,
  Slip10RawIndex,
  xchacha20NonceLength,
  Xchacha20poly1305Ietf,
} from "@cosmjs/crypto";
import { toAscii } from "@cosmjs/encoding";

import { StdSignature } from "./types";

export type PrehashType = "sha256" | "sha512" | null;

export type Algo = "secp256k1" | "ed25519" | "sr25519";

export interface AccountData {
  // bech32-encoded
  readonly address: string;
  readonly algo: Algo;
  readonly pubkey: Uint8Array;
}

export interface OfflineSigner {
  /**
   * Get AccountData array from wallet. Rejects if not enabled.
   */
  readonly getAccounts: () => Promise<readonly AccountData[]>;

  /**
   * Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
   */
  readonly sign: (address: string, message: Uint8Array, prehashType?: PrehashType) => Promise<StdSignature>;
}

export function prehash(bytes: Uint8Array, type: PrehashType): Uint8Array {
  switch (type) {
    case null:
      return new Uint8Array([...bytes]);
    case "sha256":
      return new Sha256(bytes).digest();
    case "sha512":
      return new Sha512(bytes).digest();
    default:
      throw new Error("Unknown prehash type");
  }
}

/**
 * The Cosmoshub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 */
export function makeCosmoshubPath(a: number): HdPath {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(118),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(a),
  ];
}

/**
 * A fixed salt is chosen to archive a deterministic password to key derivation.
 * This reduces the scope of a potential rainbow attack to all CosmJS users.
 * Must be 16 bytes due to implementation limitations.
 */
export const cosmjsSalt = toAscii("The CosmJS salt.");

export interface KdfConfiguration {
  /**
   * An algorithm identifier, such as "argon2id" or "scrypt".
   */
  readonly algorithm: string;
  /** A map of algorithm-specific parameters */
  readonly params: Record<string, unknown>;
}

export async function executeKdf(password: string, configuration: KdfConfiguration): Promise<Uint8Array> {
  switch (configuration.algorithm) {
    case "argon2id": {
      const options = configuration.params;
      if (!isArgon2idOptions(options)) throw new Error("Invalid format of argon2id params");
      return Argon2id.execute(password, cosmjsSalt, options);
    }
    default:
      throw new Error("Unsupported KDF algorithm");
  }
}

/**
 * Configuration how to encrypt data or how data was encrypted.
 * This is stored as part of the wallet serialization and must only contain JSON types.
 */
export interface EncryptionConfiguration {
  /**
   * An algorithm identifier, such as "xchacha20poly1305-ietf".
   */
  readonly algorithm: string;
  /** A map of algorithm-specific parameters */
  readonly params?: Record<string, unknown>;
}

export const supportedAlgorithms = {
  xchacha20poly1305Ietf: "xchacha20poly1305-ietf",
};

export async function encrypt(
  plaintext: Uint8Array,
  encryptionKey: Uint8Array,
  config: EncryptionConfiguration,
): Promise<Uint8Array> {
  switch (config.algorithm) {
    case supportedAlgorithms.xchacha20poly1305Ietf: {
      const nonce = Random.getBytes(xchacha20NonceLength);
      // Prepend fixed-length nonce to ciphertext as suggested in the example from https://github.com/jedisct1/libsodium.js#api
      return new Uint8Array([
        ...nonce,
        ...(await Xchacha20poly1305Ietf.encrypt(plaintext, encryptionKey, nonce)),
      ]);
    }
    default:
      throw new Error(`Unsupported encryption algorithm: '${config.algorithm}'`);
  }
}

export async function decrypt(
  ciphertext: Uint8Array,
  encryptionKey: Uint8Array,
  config: EncryptionConfiguration,
): Promise<Uint8Array> {
  switch (config.algorithm) {
    case supportedAlgorithms.xchacha20poly1305Ietf: {
      const nonce = ciphertext.slice(0, xchacha20NonceLength);
      return Xchacha20poly1305Ietf.decrypt(ciphertext.slice(xchacha20NonceLength), encryptionKey, nonce);
    }
    default:
      throw new Error(`Unsupported encryption algorithm: '${config.algorithm}'`);
  }
}

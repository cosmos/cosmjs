import { Argon2idOptions, Slip10RawIndex } from "@cosmjs/crypto";
import { StdSignature } from "./types";
export declare type PrehashType = "sha256" | "sha512" | null;
export declare type Algo = "secp256k1" | "ed25519" | "sr25519";
export interface AccountData {
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
/**
 * The Cosmoshub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 */
export declare function makeCosmoshubPath(a: number): readonly Slip10RawIndex[];
/**
 * A fixed salt is chosen to archive a deterministic password to key derivation.
 * This reduces the scope of a potential rainbow attack to all Secp256k1Wallet v1 users.
 * Must be 16 bytes due to implementation limitations.
 */
export declare const secp256k1WalletSalt: Uint8Array;
/**
 * This interface describes a JSON object holding the encrypted wallet and the meta data.
 * All fields in here must be JSON types.
 */
export interface Secp256k1WalletSerialization {
  /** A format+version identifier for this serialization format */
  readonly type: string;
  /** Information about the key derivation function (i.e. password to encrytion key) */
  readonly kdf: {
    /**
     * An algorithm identifier, such as "argon2id" or "scrypt".
     */
    readonly algorithm: string;
    /** A map of algorithm-specific parameters */
    readonly params: Record<string, unknown>;
  };
  /** Information about the symmetric encryption */
  readonly encryption: {
    /**
     * An algorithm identifier, such as "xchacha20poly1305-ietf".
     */
    readonly algorithm: string;
    /** A map of algorithm-specific parameters */
    readonly params: Record<string, unknown>;
  };
  /** An instance of Secp256k1WalletData, which is stringified, encrypted and base64 encoded. */
  readonly data: string;
}
/**
 * The data of a wallet serialization that is encrypted.
 * All fields in here must be JSON types.
 */
export interface Secp256k1WalletData {
  readonly mnemonic: string;
  readonly accounts: ReadonlyArray<{
    readonly algo: string;
    readonly hdPath: string;
    readonly prefix: string;
  }>;
}
export declare function extractKdfParams(serialization: string): Record<string, any>;
export declare class Secp256k1Wallet implements OfflineSigner {
  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static fromMnemonic(
    mnemonic: string,
    hdPath?: readonly Slip10RawIndex[],
    prefix?: string,
  ): Promise<Secp256k1Wallet>;
  /**
   * Generates a new wallet with a BIP39 mnemonic of the given length.
   *
   * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static generate(
    length?: 12 | 15 | 18 | 21 | 24,
    hdPath?: readonly Slip10RawIndex[],
    prefix?: string,
  ): Promise<Secp256k1Wallet>;
  static deserialize(serialization: string, password: string): Promise<Secp256k1Wallet>;
  static deserializeWithEncryptionKey(
    serialization: string,
    encryptionKey: Uint8Array,
  ): Promise<Secp256k1Wallet>;
  private static deserializeType1;
  /** Base secret */
  private readonly secret;
  /** Derivation instrations */
  private readonly accounts;
  /** Derived data */
  private readonly pubkey;
  private readonly privkey;
  private constructor();
  get mnemonic(): string;
  private get address();
  getAccounts(): Promise<readonly AccountData[]>;
  sign(address: string, message: Uint8Array, prehashType?: PrehashType): Promise<StdSignature>;
  /**
   * Generates an encrypted serialization of this wallet.
   *
   * @param password The user provided password used to generate an encryption key via a KDF.
   *                 This is not normalized internally (see "Unicode normalization" to learn more).
   */
  serialize(password: string): Promise<string>;
  /**
   * Generates an encrypted serialization of this wallet.
   *
   * This is an advanced alternative of calling `serialize(password)` directly, which allows you to
   * offload the KDF execution to an non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given kdf options. If this
   * is not the case, the wallet cannot be restored with the original password.
   */
  serializeWithEncryptionKey(encryptionKey: Uint8Array, kdfOptions: Argon2idOptions): Promise<string>;
}

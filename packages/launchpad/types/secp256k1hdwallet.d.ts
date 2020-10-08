import { HdPath } from "@cosmjs/crypto";
import { StdSignDoc } from "./encoding";
import { AccountData, OfflineSigner, SignResponse } from "./signer";
import { EncryptionConfiguration, KdfConfiguration } from "./wallet";
/**
 * This interface describes a JSON object holding the encrypted wallet and the meta data.
 * All fields in here must be JSON types.
 */
export interface Secp256k1HdWalletSerialization {
  /** A format+version identifier for this serialization format */
  readonly type: string;
  /** Information about the key derivation function (i.e. password to encryption key) */
  readonly kdf: KdfConfiguration;
  /** Information about the symmetric encryption */
  readonly encryption: EncryptionConfiguration;
  /** An instance of Secp256k1HdWalletData, which is stringified, encrypted and base64 encoded. */
  readonly data: string;
}
export declare function extractKdfConfiguration(serialization: string): KdfConfiguration;
export declare class Secp256k1HdWallet implements OfflineSigner {
  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static fromMnemonic(mnemonic: string, hdPath?: HdPath, prefix?: string): Promise<Secp256k1HdWallet>;
  /**
   * Generates a new wallet with a BIP39 mnemonic of the given length.
   *
   * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static generate(
    length?: 12 | 15 | 18 | 21 | 24,
    hdPath?: HdPath,
    prefix?: string,
  ): Promise<Secp256k1HdWallet>;
  /**
   * Restores a wallet from an encrypted serialization.
   *
   * @param password The user provided password used to generate an encryption key via a KDF.
   *                 This is not normalized internally (see "Unicode normalization" to learn more).
   */
  static deserialize(serialization: string, password: string): Promise<Secp256k1HdWallet>;
  /**
   * Restores a wallet from an encrypted serialization.
   *
   * This is an advanced alternative to calling `deserialize(serialization, password)` directly, which allows
   * you to offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given KDF configuration. This can be
   * done using `extractKdfConfiguration(serialization)` and `executeKdf(password, kdfConfiguration)` from this package.
   */
  static deserializeWithEncryptionKey(
    serialization: string,
    encryptionKey: Uint8Array,
  ): Promise<Secp256k1HdWallet>;
  private static deserializeTypeV1;
  /** Base secret */
  private readonly secret;
  /** Derivation instruction */
  private readonly accounts;
  /** Derived data */
  private readonly pubkey;
  private readonly privkey;
  private constructor();
  get mnemonic(): string;
  private get address();
  getAccounts(): Promise<readonly AccountData[]>;
  sign(signerAddress: string, signDoc: StdSignDoc): Promise<SignResponse>;
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
   * This is an advanced alternative to calling `serialize(password)` directly, which allows you to
   * offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given KDF options. If this
   * is not the case, the wallet cannot be restored with the original password.
   */
  serializeWithEncryptionKey(encryptionKey: Uint8Array, kdfConfiguration: KdfConfiguration): Promise<string>;
}

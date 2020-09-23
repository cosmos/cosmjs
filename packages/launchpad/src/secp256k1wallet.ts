import {
  Bip39,
  EnglishMnemonic,
  HdPath,
  pathToString,
  Random,
  Secp256k1,
  Sha256,
  Slip10,
  Slip10Curve,
  stringToPath,
} from "@cosmjs/crypto";
import { fromBase64, fromUtf8, toBase64, toUtf8 } from "@cosmjs/encoding";
import { assert, isNonNullObject } from "@cosmjs/utils";

import { rawSecp256k1PubkeyToAddress } from "./address";
import { serializeSignDoc, StdSignDoc } from "./encoding";
import { encodeSecp256k1Signature } from "./signature";
import { AccountData, OfflineSigner, SignResponse } from "./signer";
import {
  decrypt,
  encrypt,
  EncryptionConfiguration,
  executeKdf,
  KdfConfiguration,
  makeCosmoshubPath,
  supportedAlgorithms,
} from "./wallet";

const serializationTypeV1 = "secp256k1wallet-v1";

/**
 * A KDF configuration that is not very strong but can be used on the main thread.
 * It takes about 1 second in Node.js 12.15 and should have similar runtimes in other modern Wasm hosts.
 */
const basicPasswordHashingOptions: KdfConfiguration = {
  algorithm: "argon2id",
  params: {
    outputLength: 32,
    opsLimit: 20,
    memLimitKib: 12 * 1024,
  },
};

/**
 * This interface describes a JSON object holding the encrypted wallet and the meta data.
 * All fields in here must be JSON types.
 */
export interface Secp256k1WalletSerialization {
  /** A format+version identifier for this serialization format */
  readonly type: string;
  /** Information about the key derivation function (i.e. password to encryption key) */
  readonly kdf: KdfConfiguration;
  /** Information about the symmetric encryption */
  readonly encryption: EncryptionConfiguration;
  /** An instance of Secp256k1WalletData, which is stringified, encrypted and base64 encoded. */
  readonly data: string;
}

/**
 * Derivation information required to derive a keypair and an address from a mnemonic.
 * All fields in here must be JSON types.
 */
interface Secp256k1DerivationJson {
  readonly hdPath: string;
  readonly prefix: string;
}

function isSecp256k1DerivationJson(thing: unknown): thing is Secp256k1DerivationJson {
  if (!isNonNullObject(thing)) return false;
  if (typeof (thing as Secp256k1DerivationJson).hdPath !== "string") return false;
  if (typeof (thing as Secp256k1DerivationJson).prefix !== "string") return false;
  return true;
}

/**
 * The data of a wallet serialization that is encrypted.
 * All fields in here must be JSON types.
 */
export interface Secp256k1WalletData {
  readonly mnemonic: string;
  readonly accounts: readonly Secp256k1DerivationJson[];
}

function extractKdfConfigurationV1(doc: any): KdfConfiguration {
  return doc.kdf;
}

export function extractKdfConfiguration(serialization: string): KdfConfiguration {
  const root = JSON.parse(serialization);
  if (!isNonNullObject(root)) throw new Error("Root document is not an object.");

  switch ((root as any).type) {
    case serializationTypeV1:
      return extractKdfConfigurationV1(root);
    default:
      throw new Error("Unsupported serialization type");
  }
}

/**
 * Derivation information required to derive a keypair and an address from a mnemonic.
 */
interface Secp256k1Derivation {
  readonly hdPath: HdPath;
  readonly prefix: string;
}

export class Secp256k1Wallet implements OfflineSigner {
  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  public static async fromMnemonic(
    mnemonic: string,
    hdPath: HdPath = makeCosmoshubPath(0),
    prefix = "cosmos",
  ): Promise<Secp256k1Wallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked);
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath);
    const uncompressed = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return new Secp256k1Wallet(
      mnemonicChecked,
      hdPath,
      privkey,
      Secp256k1.compressPubkey(uncompressed),
      prefix,
    );
  }

  /**
   * Generates a new wallet with a BIP39 mnemonic of the given length.
   *
   * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  public static async generate(
    length: 12 | 15 | 18 | 21 | 24 = 12,
    hdPath: HdPath = makeCosmoshubPath(0),
    prefix = "cosmos",
  ): Promise<Secp256k1Wallet> {
    const entropyLength = 4 * Math.floor((11 * length) / 33);
    const entropy = Random.getBytes(entropyLength);
    const mnemonic = Bip39.encode(entropy);
    return Secp256k1Wallet.fromMnemonic(mnemonic.toString(), hdPath, prefix);
  }

  /**
   * Restores a wallet from an encrypted serialization.
   *
   * @param password The user provided password used to generate an encryption key via a KDF.
   *                 This is not normalized internally (see "Unicode normalization" to learn more).
   */
  public static async deserialize(serialization: string, password: string): Promise<Secp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    switch ((root as any).type) {
      case serializationTypeV1:
        return Secp256k1Wallet.deserializeTypeV1(serialization, password);
      default:
        throw new Error("Unsupported serialization type");
    }
  }

  /**
   * Restores a wallet from an encrypted serialization.
   *
   * This is an advanced alternative to calling `deserialize(serialization, password)` directly, which allows
   * you to offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given KDF configuration. This can be
   * done using `extractKdfConfiguration(serialization)` and `executeKdf(password, kdfConfiguration)` from this package.
   */
  public static async deserializeWithEncryptionKey(
    serialization: string,
    encryptionKey: Uint8Array,
  ): Promise<Secp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    const untypedRoot: any = root;
    switch (untypedRoot.type) {
      case serializationTypeV1: {
        const decryptedBytes = await decrypt(
          fromBase64(untypedRoot.data),
          encryptionKey,
          untypedRoot.encryption,
        );
        const decryptedDocument = JSON.parse(fromUtf8(decryptedBytes));
        const { mnemonic, accounts } = decryptedDocument;
        assert(typeof mnemonic === "string");
        if (!Array.isArray(accounts)) throw new Error("Property 'accounts' is not an array");
        if (accounts.length !== 1) throw new Error("Property 'accounts' only supports one entry");
        const account = accounts[0];
        if (!isSecp256k1DerivationJson(account)) throw new Error("Account is not in the correct format.");
        return Secp256k1Wallet.fromMnemonic(mnemonic, stringToPath(account.hdPath), account.prefix);
      }
      default:
        throw new Error("Unsupported serialization type");
    }
  }

  private static async deserializeTypeV1(serialization: string, password: string): Promise<Secp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    const encryptionKey = await executeKdf(password, (root as any).kdf);
    return Secp256k1Wallet.deserializeWithEncryptionKey(serialization, encryptionKey);
  }

  /** Base secret */
  private readonly secret: EnglishMnemonic;
  /** Derivation instruction */
  private readonly accounts: readonly Secp256k1Derivation[];
  /** Derived data */
  private readonly pubkey: Uint8Array;
  private readonly privkey: Uint8Array;

  private constructor(
    mnemonic: EnglishMnemonic,
    hdPath: HdPath,
    privkey: Uint8Array,
    pubkey: Uint8Array,
    prefix: string,
  ) {
    this.secret = mnemonic;
    this.accounts = [
      {
        hdPath: hdPath,
        prefix: prefix,
      },
    ];
    this.privkey = privkey;
    this.pubkey = pubkey;
  }

  public get mnemonic(): string {
    return this.secret.toString();
  }

  private get address(): string {
    return rawSecp256k1PubkeyToAddress(this.pubkey, this.accounts[0].prefix);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return [
      {
        algo: "secp256k1",
        address: this.address,
        pubkey: this.pubkey,
      },
    ];
  }

  public async sign(signerAddress: string, signDoc: StdSignDoc): Promise<SignResponse> {
    if (signerAddress !== this.address) {
      throw new Error(`Address ${signerAddress} not found in wallet`);
    }
    const message = new Sha256(serializeSignDoc(signDoc)).digest();
    const signature = await Secp256k1.createSignature(message, this.privkey);
    const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(this.pubkey, signatureBytes),
    };
  }

  /**
   * Generates an encrypted serialization of this wallet.
   *
   * @param password The user provided password used to generate an encryption key via a KDF.
   *                 This is not normalized internally (see "Unicode normalization" to learn more).
   */
  public async serialize(password: string): Promise<string> {
    const kdfConfiguration = basicPasswordHashingOptions;
    const encryptionKey = await executeKdf(password, kdfConfiguration);
    return this.serializeWithEncryptionKey(encryptionKey, kdfConfiguration);
  }

  /**
   * Generates an encrypted serialization of this wallet.
   *
   * This is an advanced alternative to calling `serialize(password)` directly, which allows you to
   * offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given KDF options. If this
   * is not the case, the wallet cannot be restored with the original password.
   */
  public async serializeWithEncryptionKey(
    encryptionKey: Uint8Array,
    kdfConfiguration: KdfConfiguration,
  ): Promise<string> {
    const dataToEncrypt: Secp256k1WalletData = {
      mnemonic: this.mnemonic,
      accounts: this.accounts.map(
        (account): Secp256k1DerivationJson => ({
          hdPath: pathToString(account.hdPath),
          prefix: account.prefix,
        }),
      ),
    };
    const dataToEncryptRaw = toUtf8(JSON.stringify(dataToEncrypt));

    const encryptionConfiguration: EncryptionConfiguration = {
      algorithm: supportedAlgorithms.xchacha20poly1305Ietf,
    };
    const encryptedData = await encrypt(dataToEncryptRaw, encryptionKey, encryptionConfiguration);

    const out: Secp256k1WalletSerialization = {
      type: serializationTypeV1,
      kdf: kdfConfiguration,
      encryption: encryptionConfiguration,
      data: toBase64(encryptedData),
    };
    return JSON.stringify(out);
  }
}

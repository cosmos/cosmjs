import {
  Argon2id,
  Bip39,
  EnglishMnemonic,
  pathToString,
  Random,
  Secp256k1,
  Slip10,
  Slip10Curve,
  Slip10RawIndex,
  stringToPath,
  xchacha20NonceLength,
  Xchacha20poly1305Ietf,
} from "@cosmjs/crypto";
import { fromBase64, fromHex, fromUtf8, toBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import { assert, isNonNullObject } from "@cosmjs/utils";

import { rawSecp256k1PubkeyToAddress } from "./address";
import { encodeSecp256k1Signature } from "./signature";
import { StdSignature } from "./types";
import {
  AccountData,
  Algo,
  cosmjsSalt,
  executeKdf,
  KdfConfiguration,
  makeCosmoshubPath,
  OfflineSigner,
  prehash,
  PrehashType,
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

const algorithmIdXchacha20poly1305Ietf = "xchacha20poly1305-ietf";

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

function extractKdfConfigurationV1(document: any): KdfConfiguration {
  return document.kdf;
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
    hdPath: readonly Slip10RawIndex[] = makeCosmoshubPath(0),
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
    hdPath: readonly Slip10RawIndex[] = makeCosmoshubPath(0),
    prefix = "cosmos",
  ): Promise<Secp256k1Wallet> {
    const entropyLength = 4 * Math.floor((11 * length) / 33);
    const entropy = Random.getBytes(entropyLength);
    const mnemonic = Bip39.encode(entropy);
    return Secp256k1Wallet.fromMnemonic(mnemonic.toString(), hdPath, prefix);
  }

  public static async deserialize(serialization: string, password: string): Promise<Secp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    switch ((root as any).type) {
      case serializationTypeV1:
        return Secp256k1Wallet.deserializeType1(serialization, password);
      default:
        throw new Error("Unsupported serialization type");
    }
  }

  public static async deserializeWithEncryptionKey(
    serialization: string,
    encryptionKey: Uint8Array,
  ): Promise<Secp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    const untypedRoot: any = root;
    switch (untypedRoot.type) {
      case serializationTypeV1: {
        const nonce = fromHex(untypedRoot.encryption.params.nonce);
        const decryptedBytes = await Xchacha20poly1305Ietf.decrypt(
          fromBase64(untypedRoot.data),
          encryptionKey,
          nonce,
        );
        const decryptedDocument = JSON.parse(fromUtf8(decryptedBytes));
        const { mnemonic, accounts } = decryptedDocument;
        assert(typeof mnemonic === "string");
        if (!Array.isArray(accounts)) throw new Error("Property 'accounts' is not an array");
        if (accounts.length !== 1) throw new Error("Property 'accounts' only supports one entry");
        const account = accounts[0];
        if (!isNonNullObject(account)) throw new Error("Account is not an object.");
        const { algo, hdPath, prefix } = account as any;
        assert(algo === "secp256k1");
        assert(typeof hdPath === "string");
        assert(typeof prefix === "string");

        return Secp256k1Wallet.fromMnemonic(mnemonic, stringToPath(hdPath), prefix);
      }
      default:
        throw new Error("Unsupported serialization type");
    }
  }

  private static async deserializeType1(serialization: string, password: string): Promise<Secp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    const untypedRoot: any = root;
    switch (untypedRoot.type) {
      case serializationTypeV1: {
        let encryptionKey: Uint8Array;
        switch (untypedRoot.kdf.algorithm) {
          case "argon2id": {
            const kdfOptions = untypedRoot.kdf.params;
            encryptionKey = await Argon2id.execute(password, cosmjsSalt, kdfOptions);
            break;
          }
          default:
            throw new Error("Unsupported KDF algorithm");
        }
        return Secp256k1Wallet.deserializeWithEncryptionKey(serialization, encryptionKey);
      }
      default:
        throw new Error("Unsupported serialization type");
    }
  }

  /** Base secret */
  private readonly secret: EnglishMnemonic;
  /** Derivation instruction */
  private readonly accounts: ReadonlyArray<{
    readonly algo: Algo;
    readonly hdPath: readonly Slip10RawIndex[];
    readonly prefix: string;
  }>;
  /** Derived data */
  private readonly pubkey: Uint8Array;
  private readonly privkey: Uint8Array;

  private constructor(
    mnemonic: EnglishMnemonic,
    hdPath: readonly Slip10RawIndex[],
    privkey: Uint8Array,
    pubkey: Uint8Array,
    prefix: string,
  ) {
    this.secret = mnemonic;
    this.accounts = [
      {
        algo: "secp256k1",
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
        address: this.address,
        algo: this.accounts[0].algo,
        pubkey: this.pubkey,
      },
    ];
  }

  public async sign(
    address: string,
    message: Uint8Array,
    prehashType: PrehashType = "sha256",
  ): Promise<StdSignature> {
    if (address !== this.address) {
      throw new Error(`Address ${address} not found in wallet`);
    }
    const hashedMessage = prehash(message, prehashType);
    const signature = await Secp256k1.createSignature(hashedMessage, this.privkey);
    const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
    return encodeSecp256k1Signature(this.pubkey, signatureBytes);
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
    const encrytedData: Secp256k1WalletData = {
      mnemonic: this.mnemonic,
      accounts: this.accounts.map((account) => ({
        algo: account.algo,
        hdPath: pathToString(account.hdPath),
        prefix: account.prefix,
      })),
    };
    const message = toUtf8(JSON.stringify(encrytedData));
    const nonce = Random.getBytes(xchacha20NonceLength);
    const encrypted = await Xchacha20poly1305Ietf.encrypt(message, encryptionKey, nonce);

    const out: Secp256k1WalletSerialization = {
      type: serializationTypeV1,
      kdf: kdfConfiguration,
      encryption: {
        algorithm: algorithmIdXchacha20poly1305Ietf,
        params: {
          nonce: toHex(nonce),
        },
      },
      data: toBase64(encrypted),
    };
    return JSON.stringify(out);
  }
}

import {
  Argon2id,
  Argon2idOptions,
  Bip39,
  EnglishMnemonic,
  pathToString,
  Random,
  Secp256k1,
  Sha256,
  Sha512,
  Slip10,
  Slip10Curve,
  Slip10RawIndex,
  stringToPath,
  xchacha20NonceLength,
  Xchacha20poly1305Ietf,
} from "@cosmjs/crypto";
import { fromBase64, fromHex, fromUtf8, toAscii, toBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import { assert, isNonNullObject } from "@cosmjs/utils";

import { rawSecp256k1PubkeyToAddress } from "./address";
import { encodeSecp256k1Signature } from "./signature";
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

function prehash(bytes: Uint8Array, type: PrehashType): Uint8Array {
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
export function makeCosmoshubPath(a: number): readonly Slip10RawIndex[] {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(118),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(a),
  ];
}

const serializationType1 = "v1";

/**
 * A fixed salt is chosen to archive a deterministic password to key derivation.
 * This reduces the scope of a potential rainbow attack to all Secp256k1Wallet v1 users.
 * Must be 16 bytes due to implementation limitations.
 */
export const secp256k1WalletSalt = toAscii("Secp256k1Wallet1");

/**
 * A KDF configuration that is not very strong but can be used on the main thread.
 * It takes about 1 second in Node.js 12.15 and should have similar runtimes in other modern Wasm hosts.
 */
const basicPasswordHashingOptions: Argon2idOptions = {
  outputLength: 32,
  opsLimit: 20,
  memLimitKib: 12 * 1024,
};

const algorithmIdXchacha20poly1305Ietf = "xchacha20poly1305-ietf";

/**
 * This interface describes a JSON object holding the encrypted wallet and the meta data
 */
export interface EncryptedSecp256k1Wallet {
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
  /** base64 encoded enccrypted value */
  readonly value: string;
}

export interface EncryptedSecp256k1WalletData {
  readonly mnemonic: string;
  readonly accounts: ReadonlyArray<{
    readonly algo: string;
    readonly hdPath: string;
    readonly prefix: string;
  }>;
}

function extractKdfParamsV1(document: any): Record<string, any> {
  return document.kdf.params;
}

export function extractKdfParams(serialization: string): Record<string, any> {
  const root = JSON.parse(serialization);
  if (!isNonNullObject(root)) throw new Error("Root document is not an onject.");

  switch ((root as any).type) {
    case serializationType1:
      return extractKdfParamsV1(root);
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
    if (!isNonNullObject(root)) throw new Error("Root document is not an onject.");
    const untypedRoot: any = root;
    switch (untypedRoot.type) {
      case serializationType1: {
        let encryptionKey: Uint8Array;
        switch (untypedRoot.kdf.algorithm) {
          case "argon2id": {
            const kdfOptions = untypedRoot.kdf.params;
            encryptionKey = await Argon2id.execute(password, secp256k1WalletSalt, kdfOptions);
            break;
          }
          default:
            throw new Error("Unsupported KDF algorithm");
        }

        const nonce = fromHex(untypedRoot.encryption.params.nonce);
        const decryptedBytes = await Xchacha20poly1305Ietf.decrypt(
          fromBase64(untypedRoot.value),
          encryptionKey,
          nonce,
        );
        const decryptedDocument = JSON.parse(fromUtf8(decryptedBytes));
        const { mnemonic, accounts } = decryptedDocument;
        assert(typeof mnemonic === "string");
        if (!Array.isArray(accounts)) throw new Error("Property 'accounts' is not an array");
        if (accounts.length !== 1) throw new Error("Property 'accounts' only supports one entry");
        const account = accounts[0];
        if (!isNonNullObject(account)) throw new Error("Account is not an onject.");
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

  public static async deserializeWithEncryptionKey(
    serialization: string,
    encryptionKey: Uint8Array,
  ): Promise<Secp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an onject.");
    const untypedRoot: any = root;
    switch (untypedRoot.type) {
      case serializationType1: {
        const nonce = fromHex(untypedRoot.encryption.params.nonce);
        const decryptedBytes = await Xchacha20poly1305Ietf.decrypt(
          fromBase64(untypedRoot.value),
          encryptionKey,
          nonce,
        );
        const decryptedDocument = JSON.parse(fromUtf8(decryptedBytes));
        const { mnemonic, accounts } = decryptedDocument;
        assert(typeof mnemonic === "string");
        if (!Array.isArray(accounts)) throw new Error("Property 'accounts' is not an array");
        if (accounts.length !== 1) throw new Error("Property 'accounts' only supports one entry");
        const account = accounts[0];
        if (!isNonNullObject(account)) throw new Error("Account is not an onject.");
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

  /** Base secret */
  private readonly secret: EnglishMnemonic;
  /** Derivation instrations */
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
    const kdfOption = basicPasswordHashingOptions;
    const encryptionKey = await Argon2id.execute(password, secp256k1WalletSalt, kdfOption);
    return this.serializeWithEncryptionKey(encryptionKey, kdfOption);
  }

  /**
   * Generates an encrypted serialization of this wallet.
   *
   * This is an advanced alternative of calling `serialize(password)` directly, which allows you to
   * offload the KDF execution to an non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given kdf options. If this
   * is not the case, the wallet cannot be restored with the original password.
   */
  public async serializeWithEncryptionKey(
    encryptionKey: Uint8Array,
    kdfOptions: Argon2idOptions,
  ): Promise<string> {
    const encrytedData: EncryptedSecp256k1WalletData = {
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

    const out: EncryptedSecp256k1Wallet = {
      type: serializationType1,
      kdf: { algorithm: "argon2id", params: { ...kdfOptions } },
      encryption: {
        algorithm: algorithmIdXchacha20poly1305Ietf,
        params: {
          nonce: toHex(nonce),
        },
      },
      value: toBase64(encrypted),
    };
    return JSON.stringify(out);
  }
}

import {
  Bip39,
  EnglishMnemonic,
  HdPath,
  Keccak256,
  pathToString,
  Random,
  Secp256k1,
  Secp256k1Keypair,
  sha256,
  Slip10,
  Slip10Curve,
  stringToPath,
} from "@cosmjs/crypto";
import { fromBase64, fromHex, fromUtf8, toAscii, toBase64, toBech32, toHex, toUtf8 } from "@cosmjs/encoding";
import { assert, isNonNullObject } from "@cosmjs/utils";

import { rawSecp256k1PubkeyToRawAddress } from "./addresses";
import { makeCosmoshubPath } from "./paths";
import { encodeEthSecp256k1Signature, encodeSecp256k1Signature } from "./signature";
import { serializeSignDoc, StdSignDoc } from "./signdoc";
import { AccountData, AminoSignResponse, OfflineAminoSigner } from "./signer";
import {
  decrypt,
  encrypt,
  EncryptionConfiguration,
  executeKdf,
  KdfConfiguration,
  supportedAlgorithms,
} from "./wallet";

interface AccountDataWithPrivkey extends AccountData {
  readonly privkey: Uint8Array;
}

const serializationTypeV1 = "secp256k1wallet-v1";

const ethermintCoinType = "60";
const hardenedEthermintCoinType = "60'";

/**
 * A KDF configuration that is not very strong but can be used on the main thread.
 * It takes about 1 second in Node.js 16.0.0 and should have similar runtimes in other modern Wasm hosts.
 */
const basicPasswordHashingOptions: KdfConfiguration = {
  algorithm: "argon2id",
  params: {
    outputLength: 32,
    opsLimit: 24,
    memLimitKib: 12 * 1024,
  },
};

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

/**
 * Derivation information required to derive a keypair and an address from a mnemonic.
 * All fields in here must be JSON types.
 */
interface DerivationInfoJson {
  readonly hdPath: string;
  readonly prefix: string;
}

function isDerivationJson(thing: unknown): thing is DerivationInfoJson {
  if (!isNonNullObject(thing)) return false;
  if (typeof (thing as DerivationInfoJson).hdPath !== "string") return false;
  if (typeof (thing as DerivationInfoJson).prefix !== "string") return false;
  return true;
}

/**
 * The data of a wallet serialization that is encrypted.
 * All fields in here must be JSON types.
 */
interface Secp256k1HdWalletData {
  readonly mnemonic: string;
  readonly accounts: readonly DerivationInfoJson[];
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
interface DerivationInfo {
  readonly hdPath: HdPath;
  /** The bech32 address prefix (human readable part). */
  readonly prefix: string;
}

export interface Secp256k1HdWalletOptions {
  /** The password to use when deriving a BIP39 seed from a mnemonic. */
  readonly bip39Password: string;
  /** The BIP-32/SLIP-10 derivation paths. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`. */
  readonly hdPaths: readonly HdPath[];
  /** The bech32 address prefix (human readable part). Defaults to "cosmos". */
  readonly prefix: string;
}

interface Secp256k1HdWalletConstructorOptions extends Partial<Secp256k1HdWalletOptions> {
  readonly seed: Uint8Array;
}

const defaultOptions: Secp256k1HdWalletOptions = {
  bip39Password: "",
  hdPaths: [makeCosmoshubPath(0)],
  prefix: "cosmos",
};

export class Secp256k1HdWallet implements OfflineAminoSigner {
  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
   */
  public static async fromMnemonic(
    mnemonic: string,
    options: Partial<Secp256k1HdWalletOptions> = {},
  ): Promise<Secp256k1HdWallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
    return new Secp256k1HdWallet(mnemonicChecked, {
      ...options,
      seed: seed,
    });
  }

  /**
   * Generates a new wallet with a BIP39 mnemonic of the given length.
   *
   * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
   * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
   */
  public static async generate(
    length: 12 | 15 | 18 | 21 | 24 = 12,
    options: Partial<Secp256k1HdWalletOptions> = {},
  ): Promise<Secp256k1HdWallet> {
    const entropyLength = 4 * Math.floor((11 * length) / 33);
    const entropy = Random.getBytes(entropyLength);
    const mnemonic = Bip39.encode(entropy);
    return Secp256k1HdWallet.fromMnemonic(mnemonic.toString(), options);
  }

  /**
   * Restores a wallet from an encrypted serialization.
   *
   * @param password The user provided password used to generate an encryption key via a KDF.
   *                 This is not normalized internally (see "Unicode normalization" to learn more).
   */
  public static async deserialize(serialization: string, password: string): Promise<Secp256k1HdWallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    switch ((root as any).type) {
      case serializationTypeV1:
        return Secp256k1HdWallet.deserializeTypeV1(serialization, password);
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
  ): Promise<Secp256k1HdWallet> {
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
        if (!accounts.every((account) => isDerivationJson(account))) {
          throw new Error("Account is not in the correct format.");
        }
        const firstPrefix = accounts[0].prefix;
        if (!accounts.every(({ prefix }) => prefix === firstPrefix)) {
          throw new Error("Accounts do not all have the same prefix");
        }
        const hdPaths = accounts.map(({ hdPath }) => stringToPath(hdPath));
        return Secp256k1HdWallet.fromMnemonic(mnemonic, {
          hdPaths: hdPaths,
          prefix: firstPrefix,
        });
      }
      default:
        throw new Error("Unsupported serialization type");
    }
  }

  private static async deserializeTypeV1(
    serialization: string,
    password: string,
  ): Promise<Secp256k1HdWallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    const encryptionKey = await executeKdf(password, (root as any).kdf);
    return Secp256k1HdWallet.deserializeWithEncryptionKey(serialization, encryptionKey);
  }

  /** Base secret */
  private readonly secret: EnglishMnemonic;
  /** BIP39 seed */
  private readonly seed: Uint8Array;
  /** Derivation instruction */
  private readonly accounts: readonly DerivationInfo[];

  protected constructor(mnemonic: EnglishMnemonic, options: Secp256k1HdWalletConstructorOptions) {
    const hdPaths = options.hdPaths ?? defaultOptions.hdPaths;
    const prefix = options.prefix ?? defaultOptions.prefix;
    this.secret = mnemonic;
    this.seed = options.seed;
    this.accounts = hdPaths.map((hdPath) => ({
      hdPath: hdPath,
      prefix,
    }));
  }

  public get mnemonic(): string {
    return this.secret.toString();
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    const accountsWithPrivkeys = await this.getAccountsWithPrivkeys();
    return accountsWithPrivkeys.map(({ algo, coinType, pubkey, address }) => ({
      algo: algo,
      coinType: coinType,
      pubkey: pubkey,
      address: address,
    }));
  }

  public async signAmino(
    signerAddress: string,
    signDoc: StdSignDoc,
    coinType = "",
  ): Promise<AminoSignResponse> {
    const accounts = await this.getAccountsWithPrivkeys();
    const account = accounts.find(({ address }) => address === signerAddress);
    if (account === undefined) {
      throw new Error(`Address ${signerAddress} not found in wallet`);
    }
    const { privkey, pubkey } = account;

    switch (true) {
      case coinType === hardenedEthermintCoinType || coinType === ethermintCoinType: {
        // eth signing
        const hashedMessage = new Keccak256(serializeSignDoc(signDoc)).digest();
        const signature = await Secp256k1.createSignature(hashedMessage, privkey);
        const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
        const stdSignature = encodeEthSecp256k1Signature(pubkey, signatureBytes);

        return {
          signed: signDoc,
          signature: stdSignature,
        };
      }
      default: {
        const message = sha256(serializeSignDoc(signDoc));
        const signature = await Secp256k1.createSignature(message, privkey);
        const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
        return {
          signed: signDoc,
          signature: encodeSecp256k1Signature(pubkey, signatureBytes),
        };
      }
    }
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
    const dataToEncrypt: Secp256k1HdWalletData = {
      mnemonic: this.mnemonic,
      accounts: this.accounts.map(({ hdPath, prefix }) => ({
        hdPath: pathToString(hdPath),
        prefix: prefix,
      })),
    };
    const dataToEncryptRaw = toUtf8(JSON.stringify(dataToEncrypt));

    const encryptionConfiguration: EncryptionConfiguration = {
      algorithm: supportedAlgorithms.xchacha20poly1305Ietf,
    };
    const encryptedData = await encrypt(dataToEncryptRaw, encryptionKey, encryptionConfiguration);

    const out: Secp256k1HdWalletSerialization = {
      type: serializationTypeV1,
      kdf: kdfConfiguration,
      encryption: encryptionConfiguration,
      data: toBase64(encryptedData),
    };
    return JSON.stringify(out);
  }

  private async getKeyPair(hdPath: HdPath): Promise<Secp256k1Keypair> {
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, this.seed, hdPath);
    const { pubkey } = await Secp256k1.makeKeypair(privkey);
    const components = pathToString(hdPath).split("/");
    if (components.length < 3) {
      throw new Error("Invalid hdPath. Coin type is missing");
    }

    const coinType = components[2];
    switch (true) {
      case coinType === hardenedEthermintCoinType || coinType === ethermintCoinType: {
        return {
          privkey: privkey,
          pubkey: pubkey,
        };
      }
      default: {
        return {
          privkey: privkey,
          pubkey: Secp256k1.compressPubkey(pubkey),
        };
      }
    }
  }

  private async getAccountsWithPrivkeys(): Promise<readonly AccountDataWithPrivkey[]> {
    return Promise.all(
      this.accounts.map(async ({ hdPath, prefix }) => {
        const { privkey, pubkey } = await this.getKeyPair(hdPath);
        const components = pathToString(hdPath).split("/");
        if (components.length < 3) {
          throw new Error("Invalid hdPath. Coin type is missing");
        }

        const coinType = components[2];
        switch (true) {
          case coinType === hardenedEthermintCoinType || coinType === ethermintCoinType: {
            const hash = new Keccak256(pubkey.slice(1)).digest();
            const lastTwentyBytes = toHex(hash.slice(-20));
            // EVM address
            const address = this.toChecksummedAddress("0x" + lastTwentyBytes);

            return {
              algo: "secp256k1" as const,
              coinType: coinType,
              privkey: privkey,
              pubkey: Secp256k1.compressPubkey(pubkey),
              address: await this.getBech32AddressFromEVMAddress(address, prefix),
            };
          }
          default: {
            return {
              algo: "secp256k1" as const,
              coinType: coinType,
              privkey: privkey,
              pubkey: pubkey,
              address: toBech32(prefix, rawSecp256k1PubkeyToRawAddress(pubkey)),
            };
          }
        }
      }),
    );
  }

  private async getBech32AddressFromEVMAddress(evmAddress: string, bech32Prefix: string): Promise<string> {
    if (!this.isAddress(evmAddress.toLowerCase())) {
      throw new TypeError("Please provide a valid EVM compatible address.");
    }

    const evmAddrWithoutHexPrefix = evmAddress.replace(/^(-)?0x/i, "$1");
    const evmAddressBytes = fromHex(evmAddrWithoutHexPrefix);
    const evmToBech32Address = toBech32(bech32Prefix, evmAddressBytes);
    return evmToBech32Address;
  }

  private isValidAddress(address: string): boolean {
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      return false;
    }
    return true;
  }

  private toChecksummedAddress(address: string): string {
    // 40 low hex characters
    let addressLower;
    if (typeof address === "string") {
      if (!this.isValidAddress(address)) {
        throw new Error("Input is not a valid Ethereum address");
      }
      addressLower = address.toLowerCase().replace("0x", "");
    } else {
      addressLower = toHex(address);
    }

    const addressHash = toHex(new Keccak256(toAscii(addressLower)).digest());
    let checksumAddress = "0x";
    for (let i = 0; i < 40; i++) {
      checksumAddress += parseInt(addressHash[i], 16) > 7 ? addressLower[i].toUpperCase() : addressLower[i];
    }
    return checksumAddress;
  }
  private isAddress(address: string): boolean {
    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
      // If it's ALL lowercase or ALL upppercase
    } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
      return true;
      // Otherwise check each case
    }
    return false;
  }
}

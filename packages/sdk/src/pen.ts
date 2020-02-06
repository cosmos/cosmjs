import {
  Bip39,
  EnglishMnemonic,
  Secp256k1,
  Sha256,
  Sha512,
  Slip10,
  Slip10Curve,
  Slip10RawIndex,
} from "@iov/crypto";

export type PrehashType = "sha256" | "sha512" | null;

/**
 * A pen is the most basic tool you can think of for signing. It works
 * everywhere and can be used intuitively by everyone. However, it does not
 * come with a great amount of features. End of semi suitable metaphor.
 *
 * This wraps a single keypair and allows for signing.
 *
 * Non-goals of this types are: multi account support, persistency, data migrations,
 * obfuscation of sensitive data.
 */
export interface Pen {
  readonly getPubkey: () => Promise<Uint8Array>;
  readonly createSignature: (signBytes: Uint8Array, prehashType?: PrehashType) => Promise<Uint8Array>;
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

export class Secp256k1Pen implements Pen {
  private readonly mnemonic: EnglishMnemonic;
  private readonly hdPath: readonly Slip10RawIndex[];

  public constructor(mnemonic: string, hdPath: readonly Slip10RawIndex[] = makeCosmoshubPath(0)) {
    this.mnemonic = new EnglishMnemonic(mnemonic);
    this.hdPath = hdPath;
  }

  public async getPubkey(): Promise<Uint8Array> {
    const privkey = await this.getPrivkey();
    const uncompressed = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return Secp256k1.compressPubkey(uncompressed);
  }

  /**
   * Creates a fixed length encoding of the signature parameters r (32 bytes) and s (32 bytes).
   */
  public async createSignature(
    signBytes: Uint8Array,
    prehashType: PrehashType = "sha256",
  ): Promise<Uint8Array> {
    const message = prehash(signBytes, prehashType);
    const signature = await Secp256k1.createSignature(message, await this.getPrivkey());
    return new Uint8Array([...signature.r(32), ...signature.s(32)]);
  }

  private async getPrivkey(): Promise<Uint8Array> {
    const seed = await Bip39.mnemonicToSeed(this.mnemonic);
    return Slip10.derivePath(Slip10Curve.Secp256k1, seed, this.hdPath).privkey;
  }
}

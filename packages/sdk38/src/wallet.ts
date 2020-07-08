import {
  Bip39,
  EnglishMnemonic,
  Secp256k1,
  Sha256,
  Sha512,
  Slip10,
  Slip10Curve,
  Slip10RawIndex,
} from "@cosmjs/crypto";

import { rawSecp256k1PubkeyToAddress } from "./address";
import { encodeSecp256k1Signature } from "./signature";
import { StdSignature } from "./types";

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
  readonly pubkey: Uint8Array;
  readonly sign: (signBytes: Uint8Array, prehashType?: PrehashType) => Promise<StdSignature>;
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
  public static async fromMnemonic(
    mnemonic: string,
    hdPath: readonly Slip10RawIndex[] = makeCosmoshubPath(0),
  ): Promise<Secp256k1Pen> {
    const seed = await Bip39.mnemonicToSeed(new EnglishMnemonic(mnemonic));
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath);
    const uncompressed = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return new Secp256k1Pen(privkey, Secp256k1.compressPubkey(uncompressed));
  }

  public readonly pubkey: Uint8Array;
  private readonly privkey: Uint8Array;

  private constructor(privkey: Uint8Array, pubkey: Uint8Array) {
    this.privkey = privkey;
    this.pubkey = pubkey;
  }

  /**
   * Creates and returns a signature
   */
  public async sign(signBytes: Uint8Array, prehashType: PrehashType = "sha256"): Promise<StdSignature> {
    const message = prehash(signBytes, prehashType);
    const signature = await Secp256k1.createSignature(message, this.privkey);
    const fixedLengthSignature = new Uint8Array([...signature.r(32), ...signature.s(32)]);
    return encodeSecp256k1Signature(this.pubkey, fixedLengthSignature);
  }

  public address(prefix: string): string {
    return rawSecp256k1PubkeyToAddress(this.pubkey, prefix);
  }
}

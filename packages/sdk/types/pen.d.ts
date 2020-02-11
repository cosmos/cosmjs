import { Slip10RawIndex } from "@iov/crypto";
import { StdSignature } from "./types";
export declare type PrehashType = "sha256" | "sha512" | null;
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
/**
 * The Cosmoshub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 */
export declare function makeCosmoshubPath(a: number): readonly Slip10RawIndex[];
export declare class Secp256k1Pen implements Pen {
  static fromMnemonic(mnemonic: string, hdPath?: readonly Slip10RawIndex[]): Promise<Secp256k1Pen>;
  readonly pubkey: Uint8Array;
  private readonly privkey;
  private constructor();
  /**
   * Creates and returns a signature
   */
  sign(signBytes: Uint8Array, prehashType?: PrehashType): Promise<StdSignature>;
}

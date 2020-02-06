import { Slip10RawIndex } from "@iov/crypto";
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
  readonly getPubkey: () => Promise<Uint8Array>;
  readonly createSignature: (signBytes: Uint8Array, prehashType?: PrehashType) => Promise<Uint8Array>;
}
/**
 * The Cosmoshub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 */
export declare function makeCosmoshubPath(a: number): readonly Slip10RawIndex[];
export declare class Secp256k1Pen implements Pen {
  private readonly mnemonic;
  private readonly hdPath;
  constructor(mnemonic: string, hdPath?: readonly Slip10RawIndex[]);
  getPubkey(): Promise<Uint8Array>;
  /**
   * Creates a fixed length encoding of the signature parameters r (32 bytes) and s (32 bytes).
   */
  createSignature(signBytes: Uint8Array, prehashType?: PrehashType): Promise<Uint8Array>;
  private getPrivkey;
}

import { Slip10RawIndex } from "@cosmjs/crypto";
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
export declare class Secp256k1OfflineWallet implements OfflineSigner {
  static fromMnemonic(
    mnemonic: string,
    hdPath?: readonly Slip10RawIndex[],
    prefix?: string,
  ): Promise<Secp256k1OfflineWallet>;
  private readonly pubkey;
  private readonly privkey;
  private readonly prefix;
  private readonly algo;
  private enabled;
  private constructor();
  private get address();
  /**
   * Request access to the user's accounts. Some wallets will ask the user to approve or deny access. Returns true if granted access or false if denied.
   */
  private enable;
  getAccounts(): Promise<readonly AccountData[]>;
  sign(address: string, message: Uint8Array, prehashType?: PrehashType): Promise<StdSignature>;
}

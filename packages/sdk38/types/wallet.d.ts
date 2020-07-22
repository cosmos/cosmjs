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
export declare class Secp256k1Wallet implements OfflineSigner {
  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static fromMnemonic(
    mnemonic: string,
    hdPath?: readonly Slip10RawIndex[],
    prefix?: string,
  ): Promise<Secp256k1Wallet>;
  /**
   * Generates a new wallet with a BIP39 mnemonic of the given length.
   *
   * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static generate(
    length?: 12 | 15 | 18 | 21 | 24,
    hdPath?: readonly Slip10RawIndex[],
    prefix?: string,
  ): Promise<Secp256k1Wallet>;
  private readonly mnemonicData;
  private readonly pubkey;
  private readonly privkey;
  private readonly prefix;
  private readonly algo;
  private constructor();
  get mnemonic(): string;
  private get address();
  getAccounts(): Promise<readonly AccountData[]>;
  sign(address: string, message: Uint8Array, prehashType?: PrehashType): Promise<StdSignature>;
}

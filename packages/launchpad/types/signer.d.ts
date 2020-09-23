import { StdSignature } from "./types";
export declare type PrehashType = "sha256" | "sha512" | null;
export declare type Algo = "secp256k1" | "ed25519" | "sr25519";
export interface AccountData {
  /** A printable address (typically bech32 encoded) */
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

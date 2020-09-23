import { StdSignDoc } from "./encoding";
import { StdSignature } from "./types";

export type Algo = "secp256k1" | "ed25519" | "sr25519";

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
   *
   * @param signerAddress The address of the account that should sign the transaction
   * @param signDoc The content that should be signed
   */
  readonly sign: (signerAddress: string, signDoc: StdSignDoc) => Promise<StdSignature>;
}

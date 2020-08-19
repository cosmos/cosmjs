import { Msg } from "./msgs";
import { StdFee } from "./types";
import { AccountData } from "./wallet";

export interface SignRequest {
  // required fields
  readonly msgs: readonly Msg[];
  readonly chainId: string;
  // optionally set by client, if unset auto-generated by the OnlineSigner before signing
  readonly accountNumber?: string;
  readonly fee?: StdFee;
  readonly sequence?: string;
  // fully optional (never set by signer)
  readonly memo?: string;
}

/**
 * OnlineSigner sends a set of messages to be signed to a network-connected signer.
 * This signer holds the private key needed to sign, and is able to set proper parameters,
 * like account number and sequence. Possibly gas and fees.
 */
export interface OnlineSigner {
  /*
   * must call once and succeed before using the signer (login / authorization step)
   */
  readonly enable: () => Promise<boolean>;

  /*
   * Get AccountData array from wallet. Rejects if not enabled.
   */
  readonly getAccounts: () => Promise<readonly AccountData[]>;

  /**
   * Signs with whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
   * Will query chain for account_number and sequence number if not set by caller.
   * Will auto-set fee if not set by caller
   * Will submit to the blockchain and return the TxHash (hex encoded) if it passes `CheckTx` (else error)
   *
   * TODO: Use BroadcastTxResult as return value?
   */
  readonly signAndSubmit: (address: string, request: SignRequest) => Promise<string>;
}

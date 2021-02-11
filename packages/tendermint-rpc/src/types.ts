// Types in this file are exported outside of the @cosmjs/tendermint-rpc package,
// e.g. as part of a request or response
import { ReadonlyDate } from "readonly-date";

export interface ReadonlyDateWithNanoseconds extends ReadonlyDate {
  /* Nanoseconds after the time stored in a vanilla ReadonlyDate (millisecond granularity) */
  readonly nanoseconds?: number;
}

export interface ValidatorEd25519Pubkey {
  readonly algorithm: "ed25519";
  readonly data: Uint8Array;
}

/**
 * Union type for different possible pubkeys.
 * Currently only Ed25519 supported.
 */
export type ValidatorPubkey = ValidatorEd25519Pubkey;

export enum BlockIdFlag {
  Unknown = 0,
  Absent = 1,
  Commit = 2,
  Nil = 3,
  Unrecognized = -1,
}

export interface CommitSignature {
  blockIdFlag: BlockIdFlag;
  validatorAddress: Uint8Array;
  timestamp?: ReadonlyDateWithNanoseconds;
  signature: Uint8Array;
}

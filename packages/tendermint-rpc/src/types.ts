// Types in this file are exported outside of the @cosmjs/tendermint-rpc package,
// e.g. as part of a request or response

import { ReadonlyDateWithNanoseconds } from "./dates";

export interface ValidatorEd25519Pubkey {
  readonly algorithm: "ed25519";
  readonly data: Uint8Array;
}

export interface ValidatorSecp256k1Pubkey {
  readonly algorithm: "secp256k1";
  readonly data: Uint8Array;
}

/**
 * Union type for different possible pubkeys.
 */
export type ValidatorPubkey = ValidatorEd25519Pubkey | ValidatorSecp256k1Pubkey;

export enum BlockIdFlag {
  Unknown = 0,
  Absent = 1,
  Commit = 2,
  Nil = 3,
  Unrecognized = -1,
}

export interface CommitSignature {
  /** If this is BlockIdFlag.Absent, all other fields are expected to be unset */
  blockIdFlag: BlockIdFlag;
  validatorAddress: Uint8Array<ArrayBuffer> | undefined;
  timestamp: ReadonlyDateWithNanoseconds | undefined;
  signature: Uint8Array<ArrayBuffer> | undefined;
}

// Types in this file are exported outside of the @cosmjs/tendermint-rpc package,
// e.g. as part of a request or response

export interface ValidatorEd25519Pubkey {
  readonly algorithm: "ed25519";
  readonly data: Uint8Array;
}

/**
 * Union type for different possible pubkeys.
 * Currently only Ed25519 supported.
 */
export type ValidatorPubkey = ValidatorEd25519Pubkey;

export interface ValidatorEd25519Signature {
  readonly algorithm: "ed25519";
  readonly data: Uint8Array;
}

/**
 * Union type for different possible voting signatures.
 * Currently only Ed25519 supported.
 */
export type ValidatorSignature = ValidatorEd25519Signature;

// Types in this file are exported outside of the @iov/tendermint-rpc package,
// e.g. as part of a request or response

import { As } from "type-tagger";

/**
 * Merkle root
 */
export type BlockHash = Uint8Array & As<"block-hash">;

/** Raw transaction bytes */
export type TxBytes = Uint8Array & As<"tx-bytes">;

/**
 * A raw tendermint transaction hash, currently 20 bytes
 */
export type TxHash = Uint8Array & As<"tx-hash">;

export type IpPortString = string & As<"ipport">;

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

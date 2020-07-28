/* eslint-disable @typescript-eslint/naming-convention */
import { Coin } from "./coins";
import { Msg } from "./msgs";

/**
 * A Cosmos SDK StdTx
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdtx
 */
export interface StdTx {
  readonly msg: readonly Msg[];
  readonly fee: StdFee;
  readonly signatures: readonly StdSignature[];
  readonly memo: string | undefined;
}

export function isStdTx(txValue: unknown): txValue is StdTx {
  const { memo, msg, fee, signatures } = txValue as StdTx;
  return (
    typeof memo === "string" && Array.isArray(msg) && typeof fee === "object" && Array.isArray(signatures)
  );
}

export interface CosmosSdkTx {
  readonly type: string;
  readonly value: StdTx;
}

export interface StdFee {
  readonly amount: readonly Coin[];
  readonly gas: string;
}

export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: string;
}

export interface PubKey {
  // type is one of the strings defined in pubkeyTypes
  // I don't use a string literal union here as that makes trouble with json test data:
  // https://github.com/CosmWasm/cosmjs/pull/44#pullrequestreview-353280504
  readonly type: string;
  // Value field is base64-encoded in all cases
  // Note: if type is Secp256k1, this must contain a COMPRESSED pubkey - to encode from bcp/keycontrol land, you must compress it first
  readonly value: string;
}

export const pubkeyType = {
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/ed25519/ed25519.go#L22 */
  secp256k1: "tendermint/PubKeySecp256k1" as const,
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/secp256k1/secp256k1.go#L23 */
  ed25519: "tendermint/PubKeyEd25519" as const,
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/sr25519/codec.go#L12 */
  sr25519: "tendermint/PubKeySr25519" as const,
};

export const pubkeyTypes: readonly string[] = [pubkeyType.secp256k1, pubkeyType.ed25519, pubkeyType.sr25519];

export interface Pubkey {
  // type is one of the strings defined in pubkeyType
  // I don't use a string literal union here as that makes trouble with json test data:
  // https://github.com/cosmos/cosmjs/pull/44#pullrequestreview-353280504
  readonly type: string;
  readonly value: any;
}

export interface Ed25519Pubkey extends SinglePubkey {
  readonly type: "tendermint/PubKeyEd25519";
  readonly value: string;
}

export function isEd25519Pubkey(pubkey: Pubkey): pubkey is Ed25519Pubkey {
  return (pubkey as Ed25519Pubkey).type === "tendermint/PubKeyEd25519";
}

export interface Secp256k1Pubkey extends SinglePubkey {
  readonly type: "tendermint/PubKeySecp256k1";
  readonly value: string;
}

export function isSecp256k1Pubkey(pubkey: Pubkey): pubkey is Secp256k1Pubkey {
  return (pubkey as Secp256k1Pubkey).type === "tendermint/PubKeySecp256k1";
}

export interface EthSecp256k1Pubkey extends SinglePubkey {
  readonly type: "os/PubKeyEthSecp256k1";
  readonly value: string;
}

export function isEthSecp256k1Pubkey(pubkey: Pubkey): pubkey is EthSecp256k1Pubkey {
  return (pubkey as EthSecp256k1Pubkey).type === "os/PubKeyEthSecp256k1";
}

export const pubkeyType = {
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/secp256k1/secp256k1.go#L23 */
  secp256k1: "tendermint/PubKeySecp256k1" as const,
  /** @see https://github.com/cosmos/evm/blob/main/crypto/ethsecp256k1/ethsecp256k1.go#L36 */
  ethsecp256k1: "os/PubKeyEthSecp256k1" as const,
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/ed25519/ed25519.go#L22 */
  ed25519: "tendermint/PubKeyEd25519" as const,
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/sr25519/codec.go#L12 */
  sr25519: "tendermint/PubKeySr25519" as const,
  multisigThreshold: "tendermint/PubKeyMultisigThreshold" as const,
};

/**
 * A pubkey which contains the data directly without further nesting.
 *
 * You can think of this as a non-multisig pubkey.
 */
export interface SinglePubkey extends Pubkey {
  // type is one of the strings defined in pubkeyType
  // I don't use a string literal union here as that makes trouble with json test data:
  // https://github.com/cosmos/cosmjs/pull/44#pullrequestreview-353280504
  readonly type: string;
  /**
   * The base64 encoding of the Amino binary encoded pubkey.
   *
   * Note: if type is Secp256k1, this must contain a 33 bytes compressed pubkey.
   */
  readonly value: string;
}

export function isSinglePubkey(pubkey: Pubkey): pubkey is SinglePubkey {
  const singPubkeyTypes: string[] = [pubkeyType.ed25519, pubkeyType.secp256k1, pubkeyType.ethsecp256k1, pubkeyType.sr25519];
  return singPubkeyTypes.includes(pubkey.type);
}

export interface MultisigThresholdPubkey extends Pubkey {
  readonly type: "tendermint/PubKeyMultisigThreshold";
  readonly value: {
    /** A string-encoded integer */
    readonly threshold: string;
    readonly pubkeys: readonly SinglePubkey[];
  };
}

export function isMultisigThresholdPubkey(pubkey: Pubkey): pubkey is MultisigThresholdPubkey {
  return (pubkey as MultisigThresholdPubkey).type === "tendermint/PubKeyMultisigThreshold";
}

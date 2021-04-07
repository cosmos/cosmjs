// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography

import { ripemd160, sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64 } from "@cosmjs/encoding";

import { encodeAminoPubkey } from "./encoding";
import { isEd25519Pubkey, isMultisigThresholdPubkey, isSecp256k1Pubkey, Pubkey } from "./pubkeys";

export function rawEd25519PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array {
  if (pubkeyData.length !== 32) {
    throw new Error(`Invalid Ed25519 pubkey length: ${pubkeyData.length}`);
  }
  return sha256(pubkeyData).slice(0, 20);
}

export function rawSecp256k1PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array {
  if (pubkeyData.length !== 33) {
    throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${pubkeyData.length}`);
  }
  return ripemd160(sha256(pubkeyData));
}

// For secp256k1 this assumes we already have a compressed pubkey.
export function pubkeyToRawAddress(pubkey: Pubkey): Uint8Array {
  if (isSecp256k1Pubkey(pubkey)) {
    const pubkeyData = fromBase64(pubkey.value);
    return rawSecp256k1PubkeyToRawAddress(pubkeyData);
  } else if (isEd25519Pubkey(pubkey)) {
    const pubkeyData = fromBase64(pubkey.value);
    return rawEd25519PubkeyToRawAddress(pubkeyData);
  } else if (isMultisigThresholdPubkey(pubkey)) {
    // https://github.com/tendermint/tendermint/blob/38b401657e4ad7a7eeb3c30a3cbf512037df3740/crypto/multisig/threshold_pubkey.go#L71-L74
    const pubkeyData = encodeAminoPubkey(pubkey);
    return sha256(pubkeyData).slice(0, 20);
  } else {
    throw new Error("Unsupported public key type");
  }
}

export function pubkeyToAddress(pubkey: Pubkey, prefix: string): string {
  return Bech32.encode(prefix, pubkeyToRawAddress(pubkey));
}

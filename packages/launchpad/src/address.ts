import { SinglePubkey } from "@cosmjs/amino";
import { pubkeyToRawAddress, rawSecp256k1PubkeyToRawAddress } from "@cosmjs/amino/build/encoding";
import { Bech32 } from "@cosmjs/encoding";

export function rawSecp256k1PubkeyToAddress(pubkeyRaw: Uint8Array, prefix: string): string {
  return Bech32.encode(prefix, rawSecp256k1PubkeyToRawAddress(pubkeyRaw));
}

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
// This assumes we already have a cosmos-compressed pubkey
export function pubkeyToAddress(pubkey: SinglePubkey, prefix: string): string {
  return Bech32.encode(prefix, pubkeyToRawAddress(pubkey));
}

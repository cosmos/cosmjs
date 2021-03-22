import { SinglePubkey } from "@cosmjs/amino";
import { pubkeyToRawAddress } from "@cosmjs/amino/build/encoding";
import { ripemd160, sha256 } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";

export function rawSecp256k1PubkeyToAddress(pubkeyRaw: Uint8Array, prefix: string): string {
  if (pubkeyRaw.length !== 33) {
    throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${pubkeyRaw.length}`);
  }
  const hash1 = sha256(pubkeyRaw);
  const hash2 = ripemd160(hash1);
  return Bech32.encode(prefix, hash2);
}

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
// This assumes we already have a cosmos-compressed pubkey
export function pubkeyToAddress(pubkey: SinglePubkey, prefix: string): string {
  return Bech32.encode(prefix, pubkeyToRawAddress(pubkey));
}

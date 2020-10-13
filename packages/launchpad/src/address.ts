import { ripemd160, sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64 } from "@cosmjs/encoding";

import { PubKey, pubkeyType } from "./types";

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
export function pubkeyToAddress(pubkey: PubKey, prefix: string): string {
  const pubkeyBytes = fromBase64(pubkey.value);
  switch (pubkey.type) {
    case pubkeyType.secp256k1: {
      return rawSecp256k1PubkeyToAddress(pubkeyBytes, prefix);
    }
    case pubkeyType.ed25519: {
      if (pubkeyBytes.length !== 32) {
        throw new Error(`Invalid Ed25519 pubkey length: ${pubkeyBytes.length}`);
      }
      const hash = sha256(pubkeyBytes);
      return Bech32.encode(prefix, hash.slice(0, 20));
    }
    case pubkeyType.sr25519: {
      if (pubkeyBytes.length !== 32) {
        throw new Error(`Invalid Sr25519 pubkey length: ${pubkeyBytes.length}`);
      }
      const hash = sha256(pubkeyBytes);
      return Bech32.encode(prefix, hash.slice(0, 20));
    }
    default:
      throw new Error("Unrecognized public key algorithm");
  }
}

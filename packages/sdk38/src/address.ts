import { Ripemd160, Sha256 } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";

import { PubKey, pubkeyType } from "./types";

const { fromBase64 } = Encoding;

export function rawSecp256k1PubkeyToAddress(pubkeyRaw: Uint8Array, prefix: string): string {
  if (pubkeyRaw.length !== 33) {
    throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${pubkeyRaw.length}`);
  }
  const hash1 = new Sha256(pubkeyRaw).digest();
  const hash2 = new Ripemd160(hash1).digest();
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
      const hash = new Sha256(pubkeyBytes).digest();
      return Bech32.encode(prefix, hash.slice(0, 20));
    }
    case pubkeyType.sr25519: {
      if (pubkeyBytes.length !== 32) {
        throw new Error(`Invalid Sr25519 pubkey length: ${pubkeyBytes.length}`);
      }
      const hash = new Sha256(pubkeyBytes).digest();
      return Bech32.encode(prefix, hash.slice(0, 20));
    }
    default:
      throw new Error("Unrecognized public key algorithm");
  }
}

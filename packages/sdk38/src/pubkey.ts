import { Bech32, Encoding } from "@iov/encoding";
import equal from "fast-deep-equal";

import { PubKey, pubkeyType } from "./types";

export function encodeSecp256k1Pubkey(pubkey: Uint8Array): PubKey {
  if (pubkey.length !== 33 || (pubkey[0] !== 0x02 && pubkey[0] !== 0x03)) {
    throw new Error("Public key must be compressed secp256k1, i.e. 33 bytes starting with 0x02 or 0x03");
  }
  return {
    type: pubkeyType.secp256k1,
    value: Encoding.toBase64(pubkey),
  };
}

// As discussed in https://github.com/binance-chain/javascript-sdk/issues/163
// Prefixes listed here: https://github.com/tendermint/tendermint/blob/d419fffe18531317c28c29a292ad7d253f6cafdf/docs/spec/blockchain/encoding.md#public-key-cryptography
// Last bytes is varint-encoded length prefix
const pubkeyAminoPrefixSecp256k1 = Encoding.fromHex("eb5ae98721");
const pubkeyAminoPrefixEd25519 = Encoding.fromHex("1624de6420");
const pubkeyAminoPrefixSr25519 = Encoding.fromHex("0dfb1005");
const pubkeyAminoPrefixLength = pubkeyAminoPrefixSecp256k1.length;

export function decodeBech32Pubkey(bechEncoded: string): PubKey {
  const { data } = Bech32.decode(bechEncoded);

  const aminoPrefix = data.slice(0, pubkeyAminoPrefixLength);
  const rest = data.slice(pubkeyAminoPrefixLength);
  if (equal(aminoPrefix, pubkeyAminoPrefixSecp256k1)) {
    if (rest.length !== 33) {
      throw new Error("Invalid rest data length. Expected 33 bytes (compressed secp256k1 pubkey).");
    }
    return {
      type: pubkeyType.secp256k1,
      value: Encoding.toBase64(rest),
    };
  } else if (equal(aminoPrefix, pubkeyAminoPrefixEd25519)) {
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Ed25519 pubkey).");
    }
    return {
      type: pubkeyType.ed25519,
      value: Encoding.toBase64(rest),
    };
  } else if (equal(aminoPrefix, pubkeyAminoPrefixSr25519)) {
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Sr25519 pubkey).");
    }
    return {
      type: pubkeyType.sr25519,
      value: Encoding.toBase64(rest),
    };
  } else {
    throw new Error("Unsupported Pubkey type. Amino prefix: " + Encoding.toHex(aminoPrefix));
  }
}

export function encodeBech32Pubkey(pubkey: PubKey, prefix: string): string {
  let aminoPrefix: Uint8Array;
  switch (pubkey.type) {
    // Note: please don't add cases here without writing additional unit tests
    case pubkeyType.secp256k1:
      aminoPrefix = pubkeyAminoPrefixSecp256k1;
      break;
    default:
      throw new Error("Unsupported pubkey type");
  }

  const data = new Uint8Array([...aminoPrefix, ...Encoding.fromBase64(pubkey.value)]);
  return Bech32.encode(prefix, data);
}

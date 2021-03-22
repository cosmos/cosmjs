import { Bech32, fromBase64, fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { arrayContentEquals } from "@cosmjs/utils";

import { Pubkey, pubkeyType, Secp256k1Pubkey } from "./pubkeys";

export function encodeSecp256k1Pubkey(pubkey: Uint8Array): Secp256k1Pubkey {
  if (pubkey.length !== 33 || (pubkey[0] !== 0x02 && pubkey[0] !== 0x03)) {
    throw new Error("Public key must be compressed secp256k1, i.e. 33 bytes starting with 0x02 or 0x03");
  }
  return {
    type: pubkeyType.secp256k1,
    value: toBase64(pubkey),
  };
}

// As discussed in https://github.com/binance-chain/javascript-sdk/issues/163
// Prefixes listed here: https://github.com/tendermint/tendermint/blob/d419fffe18531317c28c29a292ad7d253f6cafdf/docs/spec/blockchain/encoding.md#public-key-cryptography
// Last bytes is varint-encoded length prefix
const pubkeyAminoPrefixSecp256k1 = fromHex("eb5ae98721");
const pubkeyAminoPrefixEd25519 = fromHex("1624de6420");
const pubkeyAminoPrefixSr25519 = fromHex("0dfb1005");
const pubkeyAminoPrefixLength = pubkeyAminoPrefixSecp256k1.length;

/**
 * Decodes a pubkey in the Amino binary format to a type/value object.
 */
export function decodeAminoPubkey(data: Uint8Array): Pubkey {
  const aminoPrefix = data.slice(0, pubkeyAminoPrefixLength);
  const rest = data.slice(pubkeyAminoPrefixLength);
  if (arrayContentEquals(aminoPrefix, pubkeyAminoPrefixSecp256k1)) {
    if (rest.length !== 33) {
      throw new Error("Invalid rest data length. Expected 33 bytes (compressed secp256k1 pubkey).");
    }
    return {
      type: pubkeyType.secp256k1,
      value: toBase64(rest),
    };
  } else if (arrayContentEquals(aminoPrefix, pubkeyAminoPrefixEd25519)) {
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Ed25519 pubkey).");
    }
    return {
      type: pubkeyType.ed25519,
      value: toBase64(rest),
    };
  } else if (arrayContentEquals(aminoPrefix, pubkeyAminoPrefixSr25519)) {
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Sr25519 pubkey).");
    }
    return {
      type: pubkeyType.sr25519,
      value: toBase64(rest),
    };
  } else {
    throw new Error("Unsupported Pubkey type. Amino prefix: " + toHex(aminoPrefix));
  }
}

/**
 * Decodes a bech32 pubkey to Amino binary, which is then decoded to a type/value object.
 * The bech32 prefix is ignored and discareded.
 *
 * @param bechEncoded the bech32 encoded pubkey
 */
export function decodeBech32Pubkey(bechEncoded: string): Pubkey {
  const { data } = Bech32.decode(bechEncoded);
  return decodeAminoPubkey(data);
}

/**
 * Encodes a public key to binary Amino.
 */
export function encodeAminoPubkey(pubkey: Pubkey): Uint8Array {
  let aminoPrefix: Uint8Array;
  switch (pubkey.type) {
    // Note: please don't add cases here without writing additional unit tests
    case pubkeyType.secp256k1:
      aminoPrefix = pubkeyAminoPrefixSecp256k1;
      break;
    case pubkeyType.ed25519:
      aminoPrefix = pubkeyAminoPrefixEd25519;
      break;
    default:
      throw new Error("Unsupported pubkey type");
  }
  return new Uint8Array([...aminoPrefix, ...fromBase64(pubkey.value)]);
}

/**
 * Encodes a public key to binary Amino and then to bech32.
 *
 * @param pubkey the public key to encode
 * @param prefix the bech32 prefix (human readable part)
 */
export function encodeBech32Pubkey(pubkey: Pubkey, prefix: string): string {
  return Bech32.encode(prefix, encodeAminoPubkey(pubkey));
}

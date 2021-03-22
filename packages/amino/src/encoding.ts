import { ripemd160, sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import { arrayContentStartsWith } from "@cosmjs/utils";

import {
  isEd25519Pubkey,
  isMultisigThresholdPubkey,
  isSecp256k1Pubkey,
  Pubkey,
  pubkeyType,
  Secp256k1Pubkey,
} from "./pubkeys";

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
const pubkeyAminoPrefixSecp256k1 = fromHex("eb5ae987" + "21" /* fixed length */);
const pubkeyAminoPrefixEd25519 = fromHex("1624de64" + "20" /* fixed length */);
const pubkeyAminoPrefixSr25519 = fromHex("0dfb1005" + "20" /* fixed length */);
/** See https://github.com/tendermint/tendermint/commit/38b401657e4ad7a7eeb3c30a3cbf512037df3740 */
const pubkeyAminoPrefixMultisigThreshold = fromHex("22c1f7e2" /* variable length not included */);

/**
 * Decodes a pubkey in the Amino binary format to a type/value object.
 */
export function decodeAminoPubkey(data: Uint8Array): Pubkey {
  if (arrayContentStartsWith(data, pubkeyAminoPrefixSecp256k1)) {
    const rest = data.slice(pubkeyAminoPrefixSecp256k1.length);
    if (rest.length !== 33) {
      throw new Error("Invalid rest data length. Expected 33 bytes (compressed secp256k1 pubkey).");
    }
    return {
      type: pubkeyType.secp256k1,
      value: toBase64(rest),
    };
  } else if (arrayContentStartsWith(data, pubkeyAminoPrefixEd25519)) {
    const rest = data.slice(pubkeyAminoPrefixEd25519.length);
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Ed25519 pubkey).");
    }
    return {
      type: pubkeyType.ed25519,
      value: toBase64(rest),
    };
  } else if (arrayContentStartsWith(data, pubkeyAminoPrefixSr25519)) {
    const rest = data.slice(pubkeyAminoPrefixSr25519.length);
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Sr25519 pubkey).");
    }
    return {
      type: pubkeyType.sr25519,
      value: toBase64(rest),
    };
  } else {
    throw new Error("Unsupported public key type. Amino data starts with: " + toHex(data.slice(0, 5)));
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
 * Uvarint encoder for Amino. This is the same encoding as `binary.PutUvarint` from the Go
 * standard library.
 *
 * @see https://github.com/tendermint/go-amino/blob/8e779b71f40d175/encoder.go#L77-L85
 */
function encodeUvarint(value: number | string): number[] {
  const checked = Uint53.fromString(value.toString()).toNumber();
  if (checked > 127) {
    throw new Error(
      "Encoding numbers > 127 is not supported here. Please tell those lazy CosmJS maintainers to port the binary.PutUvarint implementation from the Go standard library and write some tests.",
    );
  }
  return [checked];
}

/**
 * Encodes a public key to binary Amino.
 */
export function encodeAminoPubkey(pubkey: Pubkey): Uint8Array {
  if (isMultisigThresholdPubkey(pubkey)) {
    const out = Array.from(pubkeyAminoPrefixMultisigThreshold);
    out.push(8); // TODO: What is this?
    out.push(...encodeUvarint(pubkey.value.threshold));
    for (const pubkeyData of pubkey.value.pubkeys.map((p) => encodeAminoPubkey(p))) {
      out.push(18); // TODO: What is this?
      out.push(...encodeUvarint(pubkeyData.length));
      out.push(...pubkeyData);
    }
    return new Uint8Array(out);
  } else if (isEd25519Pubkey(pubkey)) {
    return new Uint8Array([...pubkeyAminoPrefixEd25519, ...fromBase64(pubkey.value)]);
  } else if (isSecp256k1Pubkey(pubkey)) {
    return new Uint8Array([...pubkeyAminoPrefixSecp256k1, ...fromBase64(pubkey.value)]);
  } else {
    throw new Error("Unsupported pubkey type");
  }
}

export function rawSecp256k1PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array {
  if (pubkeyData.length !== 33) {
    throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${pubkeyData.length}`);
  }
  return ripemd160(sha256(pubkeyData));
}

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
// For secp256k1 this assumes we already have a compressed pubkey.
export function pubkeyToRawAddress(pubkey: Pubkey): Uint8Array {
  if (isSecp256k1Pubkey(pubkey)) {
    const pubkeyData = fromBase64(pubkey.value);
    return rawSecp256k1PubkeyToRawAddress(pubkeyData);
  } else if (isEd25519Pubkey(pubkey)) {
    const pubkeyData = fromBase64(pubkey.value);
    if (pubkeyData.length !== 32) {
      throw new Error(`Invalid Ed25519 pubkey length: ${pubkeyData.length}`);
    }
    return sha256(pubkeyData).slice(0, 20);
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

/**
 * Encodes a public key to binary Amino and then to bech32.
 *
 * @param pubkey the public key to encode
 * @param prefix the bech32 prefix (human readable part)
 */
export function encodeBech32Pubkey(pubkey: Pubkey, prefix: string): string {
  return Bech32.encode(prefix, encodeAminoPubkey(pubkey));
}

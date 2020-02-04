import { Ripemd160, Sha256 } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import equal from "fast-deep-equal";

import { Bech32PubKey, PubKey } from "./types";

const { fromBase64, toBase64 } = Encoding;

// TODO: make this much more configurable
export type CosmosAddressBech32Prefix = "cosmos" | "cosmosvalcons" | "cosmosvaloper";
export type CosmosPubkeyBech32Prefix = "cosmospub" | "cosmosvalconspub" | "cosmosvaloperpub";
export type CosmosBech32Prefix = CosmosAddressBech32Prefix | CosmosPubkeyBech32Prefix;

function isCosmosAddressBech32Prefix(prefix: string): prefix is CosmosAddressBech32Prefix {
  return ["cosmos", "cosmosvalcons", "cosmosvaloper"].includes(prefix);
}

function isCosmosPubkeyBech32Prefix(prefix: string): prefix is CosmosPubkeyBech32Prefix {
  return ["cosmospub", "cosmosvalconspub", "cosmosvaloperpub"].includes(prefix);
}

// As discussed in https://github.com/binance-chain/javascript-sdk/issues/163
// Prefixes listed here: https://github.com/tendermint/tendermint/blob/d419fffe18531317c28c29a292ad7d253f6cafdf/docs/spec/blockchain/encoding.md#public-key-cryptography
// Last bytes is varint-encoded length prefix
const pubkeyAminoPrefixSecp256k1 = Encoding.fromHex("eb5ae98721");
const pubkeyAminoPrefixEd25519 = Encoding.fromHex("1624de6420");
const pubkeyAminoPrefixSr25519 = Encoding.fromHex("0dfb1005");
const pubkeyAminoPrefixLength = pubkeyAminoPrefixSecp256k1.length;

export function decodeBech32Pubkey(bech: Bech32PubKey): PubKey {
  const { prefix, data } = Bech32.decode(bech);
  if (!isCosmosPubkeyBech32Prefix(prefix)) {
    throw new Error(`Invalid bech32 prefix. Must be one of cosmos, cosmosvalcons, or cosmosvaloper.`);
  }

  const aminoPrefix = data.slice(0, pubkeyAminoPrefixLength);
  const rest = data.slice(pubkeyAminoPrefixLength);
  if (equal(aminoPrefix, pubkeyAminoPrefixSecp256k1)) {
    if (rest.length !== 33) {
      throw new Error("Invalid rest data length. Expected 33 bytes (compressed secp256k1 pubkey).");
    }
    return {
      type: "tendermint/PubKeySecp256k1",
      value: toBase64(rest),
    };
  } else if (equal(aminoPrefix, pubkeyAminoPrefixEd25519)) {
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Ed25519 pubkey).");
    }
    return {
      type: "tendermint/PubKeyEd25519",
      value: toBase64(rest),
    };
  } else if (equal(aminoPrefix, pubkeyAminoPrefixSr25519)) {
    if (rest.length !== 32) {
      throw new Error("Invalid rest data length. Expected 32 bytes (Sr25519 pubkey).");
    }
    return {
      type: "tendermint/PubKeySr25519",
      value: toBase64(rest),
    };
  } else {
    throw new Error("Unsupported Pubkey type. Amino prefix: " + Encoding.toHex(aminoPrefix));
  }
}

export function isValidAddress(address: string): boolean {
  try {
    const { prefix, data } = Bech32.decode(address);
    if (!isCosmosAddressBech32Prefix(prefix)) {
      return false;
    }
    return data.length === 20;
  } catch {
    return false;
  }
}

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
// This assumes we already have a cosmos-compressed pubkey
export function pubkeyToAddress(pubkey: PubKey, prefix: string): string {
  const pubkeyBytes = fromBase64(pubkey.value);
  switch (pubkey.type) {
    case "tendermint/PubKeySecp256k1": {
      if (pubkeyBytes.length !== 33) {
        throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${pubkeyBytes.length}`);
      }
      const hash1 = new Sha256(pubkeyBytes).digest();
      const hash2 = new Ripemd160(hash1).digest();
      return Bech32.encode(prefix, hash2);
    }
    case "tendermint/PubKeyEd25519": {
      if (pubkeyBytes.length !== 32) {
        throw new Error(`Invalid Ed25519 pubkey length: ${pubkeyBytes.length}`);
      }
      const hash = new Sha256(pubkeyBytes).digest();
      return Bech32.encode(prefix, hash.slice(0, 20));
    }
    case "tendermint/PubKeySr25519": {
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

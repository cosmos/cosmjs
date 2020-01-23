import { Address, Algorithm, PubkeyBundle } from "@iov/bcp";
import { Ripemd160, Secp256k1, Sha256 } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import equal from "fast-deep-equal";

export type CosmosAddressBech32Prefix = "cosmos" | "cosmosvalcons" | "cosmosvaloper";
export type CosmosPubkeyBech32Prefix = "cosmospub" | "cosmosvalconspub" | "cosmosvaloperpub";
export type CosmosBech32Prefix = CosmosAddressBech32Prefix | CosmosPubkeyBech32Prefix;

// As discussed in https://github.com/binance-chain/javascript-sdk/issues/163
const pubkeyAminoPrefix = Encoding.fromHex("eb5ae98721");

function isCosmosAddressBech32Prefix(prefix: string): prefix is CosmosAddressBech32Prefix {
  return ["cosmos", "cosmosvalcons", "cosmosvaloper"].includes(prefix);
}

function isCosmosPubkeyBech32Prefix(prefix: string): prefix is CosmosPubkeyBech32Prefix {
  return ["cosmospub", "cosmosvalconspub", "cosmosvaloperpub"].includes(prefix);
}

export function decodeCosmosAddress(
  address: Address,
): { readonly prefix: CosmosAddressBech32Prefix; readonly data: Uint8Array } {
  const { prefix, data } = Bech32.decode(address);
  if (!isCosmosAddressBech32Prefix(prefix)) {
    throw new Error(`Invalid bech32 prefix. Must be one of cosmos, cosmosvalcons, or cosmosvaloper.`);
  }
  if (data.length !== 20) {
    throw new Error("Invalid data length. Expected 20 bytes.");
  }
  return { prefix: prefix, data: data };
}

export function decodeCosmosPubkey(
  encodedPubkey: string,
): { readonly prefix: CosmosPubkeyBech32Prefix; readonly data: Uint8Array } {
  const { prefix, data } = Bech32.decode(encodedPubkey);
  if (!isCosmosPubkeyBech32Prefix(prefix)) {
    throw new Error(`Invalid bech32 prefix. Must be one of cosmos, cosmosvalcons, or cosmosvaloper.`);
  }

  if (!equal(data.slice(0, pubkeyAminoPrefix.length), pubkeyAminoPrefix)) {
    throw new Error("Pubkey does not have the expected amino prefix " + Encoding.toHex(pubkeyAminoPrefix));
  }

  const rest = data.slice(pubkeyAminoPrefix.length);
  if (rest.length !== 33) {
    throw new Error("Invalid rest data length. Expected 33 bytes (compressed secp256k1 pubkey).");
  }

  return { prefix: prefix, data: rest };
}

export function isValidAddress(address: string): boolean {
  try {
    decodeCosmosAddress(address as Address);
    return true;
  } catch {
    return false;
  }
}

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
export function pubkeyToAddress(pubkey: PubkeyBundle, prefix: CosmosBech32Prefix): Address {
  const pubkeyData =
    pubkey.algo === Algorithm.Secp256k1 ? Secp256k1.compressPubkey(pubkey.data) : pubkey.data;
  switch (pubkey.algo) {
    case Algorithm.Secp256k1: {
      const hash1 = new Sha256(pubkeyData).digest();
      const hash2 = new Ripemd160(hash1).digest();
      return Bech32.encode(prefix, hash2) as Address;
    }
    case Algorithm.Ed25519: {
      const hash = new Sha256(pubkeyData).digest();
      return Bech32.encode(prefix, hash.slice(0, 20)) as Address;
    }
    default:
      throw new Error("Unrecognized public key algorithm");
  }
}

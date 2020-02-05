import { CosmosBech32Prefix, decodeBech32Pubkey, encodeAddress, isValidAddress } from "@cosmwasm/sdk";
import { Address, Algorithm, PubkeyBundle, PubkeyBytes } from "@iov/bcp";
import { Secp256k1 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

export { CosmosBech32Prefix, isValidAddress };

const { fromBase64, toBase64 } = Encoding;

export function decodeCosmosPubkey(
  encodedPubkey: string,
): { readonly algo: Algorithm; readonly data: PubkeyBytes } {
  const sdkPubKey = decodeBech32Pubkey(encodedPubkey);
  switch (sdkPubKey.type) {
    case "tendermint/PubKeySecp256k1":
      return { algo: Algorithm.Secp256k1, data: fromBase64(sdkPubKey.value) as PubkeyBytes };
    case "tendermint/PubKeyEd25519":
      return { algo: Algorithm.Ed25519, data: fromBase64(sdkPubKey.value) as PubkeyBytes };
    default:
      throw new Error("Unsupported Pubkey type: " + sdkPubKey.type);
  }
}

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
export function pubkeyToAddress(pubkey: PubkeyBundle, prefix: CosmosBech32Prefix): Address {
  let pubkeyType: "tendermint/PubKeySecp256k1" | "tendermint/PubKeyEd25519";
  let pubkeyData: Uint8Array = pubkey.data;

  if (pubkey.algo === Algorithm.Secp256k1) {
    pubkeyType = "tendermint/PubKeySecp256k1";
    if (pubkeyData.length > 33) {
      pubkeyData = Secp256k1.compressPubkey(pubkey.data);
    }
  } else if (pubkey.algo === Algorithm.Ed25519) {
    pubkeyType = "tendermint/PubKeyEd25519";
  } else {
    throw new Error(`Unsupported algorithm: ${pubkey.algo}`);
  }
  const sdkKey = {
    type: pubkeyType,
    value: toBase64(pubkeyData),
  };
  return encodeAddress(sdkKey, prefix) as Address;
}

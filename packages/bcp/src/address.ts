import { CosmosBech32Prefix, decodeBech32Pubkey, encodeAddress, isValidAddress, types } from "@cosmwasm/sdk";
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
    case types.pubkeyType.secp256k1:
      return { algo: Algorithm.Secp256k1, data: fromBase64(sdkPubKey.value) as PubkeyBytes };
    case types.pubkeyType.ed25519:
      return { algo: Algorithm.Ed25519, data: fromBase64(sdkPubKey.value) as PubkeyBytes };
    default:
      throw new Error("Unsupported Pubkey type: " + sdkPubKey.type);
  }
}

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
export function pubkeyToAddress(pubkey: PubkeyBundle, prefix: CosmosBech32Prefix): Address {
  let sdkKey: types.PubKey;
  if (pubkey.algo === Algorithm.Secp256k1) {
    sdkKey = {
      type: types.pubkeyType.secp256k1,
      value: toBase64(pubkey.data.length > 33 ? Secp256k1.compressPubkey(pubkey.data) : pubkey.data),
    };
  } else if (pubkey.algo === Algorithm.Ed25519) {
    sdkKey = {
      type: types.pubkeyType.ed25519,
      value: toBase64(pubkey.data),
    };
  } else {
    throw new Error(`Unsupported algorithm: ${pubkey.algo}`);
  }

  return encodeAddress(sdkKey, prefix) as Address;
}

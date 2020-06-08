import { PubKey, pubkeyToAddress as sdkPubkeyToAddress, pubkeyType } from "@cosmjs/sdk38";
import { Address, Algorithm, PubkeyBundle } from "@iov/bcp";
import { Secp256k1 } from "@iov/crypto";
import { toBase64 } from "@iov/encoding";

// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
export function pubkeyToAddress(pubkey: PubkeyBundle, prefix: string): Address {
  let sdkKey: PubKey;
  if (pubkey.algo === Algorithm.Secp256k1) {
    sdkKey = {
      type: pubkeyType.secp256k1,
      value: toBase64(pubkey.data.length > 33 ? Secp256k1.compressPubkey(pubkey.data) : pubkey.data),
    };
  } else if (pubkey.algo === Algorithm.Ed25519) {
    sdkKey = {
      type: pubkeyType.ed25519,
      value: toBase64(pubkey.data),
    };
  } else {
    throw new Error(`Unsupported algorithm: ${pubkey.algo}`);
  }

  return sdkPubkeyToAddress(sdkKey, prefix) as Address;
}

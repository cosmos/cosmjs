import { Secp256k1 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { encodeSecp256k1Pubkey } from "./pubkey";
import { pubkeyType, StdSignature } from "./types";

export function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature {
  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    pub_key: encodeSecp256k1Pubkey(pubkey),
    // Recovery seems to be unused
    signature: Encoding.toBase64(Secp256k1.trimRecoveryByte(signature)),
  };
}

export function decodeSignature(
  signature: StdSignature,
): { readonly pubkey: Uint8Array; readonly signature: Uint8Array } {
  switch (signature.pub_key.type) {
    // Note: please don't add cases here without writing additional unit tests
    case pubkeyType.secp256k1:
      return {
        pubkey: Encoding.fromBase64(signature.pub_key.value),
        signature: Encoding.fromBase64(signature.signature),
      };
    default:
      throw new Error("Unsupported pubkey type");
  }
}

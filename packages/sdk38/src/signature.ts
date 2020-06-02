import { Encoding } from "@iov/encoding";

import { encodeSecp256k1Pubkey } from "./pubkey";
import { pubkeyType, StdSignature } from "./types";

/**
 * Takes a binary pubkey and signature to create a signature object
 *
 * @param pubkey a compressed secp256k1 public key
 * @param signature a 64 byte fixed length representation of secp256k1 signature components r and s
 */
export function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature {
  if (signature.length !== 64) {
    throw new Error(
      "Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the secp256k1 signature integers r and s.",
    );
  }

  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    pub_key: encodeSecp256k1Pubkey(pubkey),
    signature: Encoding.toBase64(signature),
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

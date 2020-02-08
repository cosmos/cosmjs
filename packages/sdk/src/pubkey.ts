import { Secp256k1 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { PubKey, pubkeyType } from "./types";

export function encodeSecp256k1Pubkey(pubkey: Uint8Array): PubKey {
  return {
    type: pubkeyType.secp256k1,
    value: Encoding.toBase64(Secp256k1.compressPubkey(pubkey)),
  };
}

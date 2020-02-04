import { Secp256k1 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { StdSignature, StdTx } from "./types";

const { toBase64 } = Encoding;

export function sortJson(json: any): any {
  if (typeof json !== "object" || json === null) {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(sortJson);
  }
  const sortedKeys = Object.keys(json).sort();
  const result = sortedKeys.reduce(
    (accumulator, key) => ({
      ...accumulator,
      [key]: sortJson(json[key]),
    }),
    {},
  );
  return result;
}

export function marshalTx(tx: StdTx): Uint8Array {
  const json = JSON.stringify(tx);
  return Encoding.toUtf8(json);
}

export function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature {
  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    pub_key: {
      type: "tendermint/PubKeySecp256k1",
      value: toBase64(Secp256k1.compressPubkey(pubkey)),
    },
    // Recovery seems to be unused
    signature: toBase64(Secp256k1.trimRecoveryByte(signature)),
  };
}

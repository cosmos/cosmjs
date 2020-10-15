/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64 } from "@cosmjs/encoding";
import { encodeSecp256k1Pubkey, PubKey } from "@cosmjs/launchpad";

import { cosmos, google } from "./codec";

const { Any } = google.protobuf;

export function encodePubkey(pubkey: PubKey): google.protobuf.IAny {
  switch (pubkey.type) {
    case "tendermint/PubKeySecp256k1": {
      const pubkeyProto = cosmos.crypto.secp256k1.PubKey.create({
        key: fromBase64(pubkey.value),
      });
      return Any.create({
        type_url: "/cosmos.crypto.secp256k1.PubKey",
        value: Uint8Array.from(cosmos.crypto.secp256k1.PubKey.encode(pubkeyProto).finish()),
      });
    }
    default:
      throw new Error(`Pubkey type ${pubkey.type} not recognized`);
  }
}

export function decodePubkey(pubkey?: google.protobuf.IAny | null): PubKey | null {
  if (!pubkey || !pubkey.value) {
    return null;
  }

  switch (pubkey.type_url) {
    case "/cosmos.crypto.secp256k1.PubKey": {
      const { key } = cosmos.crypto.secp256k1.PubKey.decode(pubkey.value);
      return encodeSecp256k1Pubkey(key);
    }
    default:
      throw new Error(`Pubkey type_url ${pubkey.type_url} not recognized`);
  }
}

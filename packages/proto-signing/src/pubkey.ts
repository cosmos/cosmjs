/* eslint-disable @typescript-eslint/naming-convention */
import { encodeSecp256k1Pubkey, SinglePubkey as AminoPubKey } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";

import { PubKey } from "./codec/cosmos/crypto/secp256k1/keys";
import { Any } from "./codec/google/protobuf/any";

export function encodePubkey(pubkey: AminoPubKey): Any {
  switch (pubkey.type) {
    case "tendermint/PubKeySecp256k1": {
      const pubkeyProto = PubKey.fromPartial({
        key: fromBase64(pubkey.value),
      });
      return Any.fromPartial({
        typeUrl: "/cosmos.crypto.secp256k1.PubKey",
        value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
      });
    }
    default:
      throw new Error(`Pubkey type ${pubkey.type} not recognized`);
  }
}

export function decodePubkey(pubkey?: Any | null): AminoPubKey | null {
  if (!pubkey || !pubkey.value) {
    return null;
  }

  switch (pubkey.typeUrl) {
    case "/cosmos.crypto.secp256k1.PubKey": {
      const { key } = PubKey.decode(pubkey.value);
      return encodeSecp256k1Pubkey(key);
    }
    default:
      throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized`);
  }
}

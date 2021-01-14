/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64 } from "@cosmjs/encoding";
import { encodeSecp256k1Pubkey, PubKey as LaunchpadPubKey } from "@cosmjs/launchpad";

import { PubKey } from "./codec/cosmos/crypto/secp256k1/keys";
import { Any } from "./codec/google/protobuf/any";

export function encodePubkey(pubkey: LaunchpadPubKey): Any {
  switch (pubkey.type) {
    case "tendermint/PubKeySecp256k1": {
      const pubkeyProto = PubKey.fromJSON({
        key: fromBase64(pubkey.value),
      });
      return Any.fromJSON({
        typeUrl: "/cosmos.crypto.secp256k1.PubKey",
        value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
      });
    }
    default:
      throw new Error(`Pubkey type ${pubkey.type} not recognized`);
  }
}

export function decodePubkey(pubkey?: Any | null): LaunchpadPubKey | null {
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

/* eslint-disable @typescript-eslint/naming-convention */
import {
  encodeSecp256k1Pubkey,
  isMultisigThresholdPubkey,
  isSecp256k1Pubkey,
  Pubkey,
  SinglePubkey,
} from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";

import { LegacyAminoPubKey } from "./codec/cosmos/crypto/multisig/keys";
import { PubKey } from "./codec/cosmos/crypto/secp256k1/keys";
import { Any } from "./codec/google/protobuf/any";

export function encodePubkey(pubkey: Pubkey): Any {
  if (isSecp256k1Pubkey(pubkey)) {
    const pubkeyProto = PubKey.fromPartial({
      key: fromBase64(pubkey.value),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.secp256k1.PubKey",
      value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
    });
  } else if (isMultisigThresholdPubkey(pubkey)) {
    const pubkeyProto = LegacyAminoPubKey.fromPartial({
      threshold: Uint53.fromString(pubkey.value.threshold).toNumber(),
      publicKeys: pubkey.value.pubkeys.map(encodePubkey),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
      value: Uint8Array.from(LegacyAminoPubKey.encode(pubkeyProto).finish()),
    });
  } else {
    throw new Error(`Pubkey type ${pubkey.type} not recognized`);
  }
}

export function decodePubkey(pubkey?: Any | null): SinglePubkey | null {
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

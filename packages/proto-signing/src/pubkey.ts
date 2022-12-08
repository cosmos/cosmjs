/* eslint-disable @typescript-eslint/naming-convention */
import {
  encodeEd25519Pubkey,
  encodeSecp256k1Pubkey,
  isEd25519Pubkey,
  isMultisigThresholdPubkey,
  isSecp256k1Pubkey,
  MultisigThresholdPubkey,
  Pubkey,
  SinglePubkey,
} from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import { PubKey as CosmosCryptoEd25519Pubkey } from "cosmjs-types/cosmos/crypto/ed25519/keys";
import { LegacyAminoPubKey } from "cosmjs-types/cosmos/crypto/multisig/keys";
import { PubKey as CosmosCryptoSecp256k1Pubkey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { Any } from "cosmjs-types/google/protobuf/any";

/**
 * Takes a pubkey in the Amino JSON object style (type/value wrapper)
 * and convertes it into a protobuf `Any`.
 *
 * This is the reverse operation to `decodePubkey`.
 */
export function encodePubkey(pubkey: Pubkey): Any {
  if (isSecp256k1Pubkey(pubkey)) {
    const pubkeyProto = CosmosCryptoSecp256k1Pubkey.fromPartial({
      key: fromBase64(pubkey.value),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.secp256k1.PubKey",
      value: Uint8Array.from(CosmosCryptoSecp256k1Pubkey.encode(pubkeyProto).finish()),
    });
  } else if (isEd25519Pubkey(pubkey)) {
    const pubkeyProto = CosmosCryptoEd25519Pubkey.fromPartial({
      key: fromBase64(pubkey.value),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.ed25519.PubKey",
      value: Uint8Array.from(CosmosCryptoEd25519Pubkey.encode(pubkeyProto).finish()),
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

/**
 * Decodes a single pubkey (i.e. not a multisig pubkey) from `Any` into
 * `SinglePubkey`.
 *
 * In most cases you probably want to use `decodePubkey`.
 */
export function anyToSinglePubkey(pubkey: Any): SinglePubkey {
  switch (pubkey.typeUrl) {
    case "/cosmos.crypto.secp256k1.PubKey": {
      const { key } = CosmosCryptoSecp256k1Pubkey.decode(pubkey.value);
      return encodeSecp256k1Pubkey(key);
    }
    case "/cosmos.crypto.ed25519.PubKey": {
      const { key } = CosmosCryptoEd25519Pubkey.decode(pubkey.value);
      return encodeEd25519Pubkey(key);
    }
    default:
      throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized as single public key type`);
  }
}

/**
 * Decodes a pubkey from a protobuf `Any` into `Pubkey`.
 * This supports single pubkeys such as Cosmos ed25519 and secp256k1 keys
 * as well as multisig threshold pubkeys.
 */
export function decodePubkey(pubkey: Any): Pubkey {
  switch (pubkey.typeUrl) {
    case "/cosmos.crypto.secp256k1.PubKey":
    case "/cosmos.crypto.ed25519.PubKey": {
      return anyToSinglePubkey(pubkey);
    }
    case "/cosmos.crypto.multisig.LegacyAminoPubKey": {
      const { threshold, publicKeys } = LegacyAminoPubKey.decode(pubkey.value);
      const out: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: threshold.toString(),
          pubkeys: publicKeys.map(anyToSinglePubkey),
        },
      };
      return out;
    }
    default:
      throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized`);
  }
}

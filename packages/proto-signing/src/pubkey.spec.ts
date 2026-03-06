import { fromBase64 } from "@cosmjs/encoding";
import { LegacyAminoPubKey } from "cosmjs-types/cosmos/crypto/multisig/keys";
import { PubKey as CosmosCryptoSecp256k1Pubkey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { Any } from "cosmjs-types/google/protobuf/any";

import { decodePubkey, encodePubkey } from "./pubkey";

describe("pubkey", () => {
  const defaultPubkeyBase64 = "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP";
  const defaultPubkeyBytes = fromBase64(defaultPubkeyBase64);
  const defaultPubkeyProtoBytes = Uint8Array.from([0x0a, defaultPubkeyBytes.length, ...defaultPubkeyBytes]);
  const ed25519PubkeyBase64 = "kEX3edqZB+HdCV92TPS7ePX0DtP62GWIjmrveZ5pnaQ=";
  const ed25519PubkeyBytes = fromBase64(ed25519PubkeyBase64);
  const ed25519PubkeyProtoBytes = Uint8Array.from([0x0a, ed25519PubkeyBytes.length, ...ed25519PubkeyBytes]);

  describe("encodePubkey", () => {
    it("works for secp256k1", () => {
      const pubkey = { type: "tendermint/PubKeySecp256k1", value: defaultPubkeyBase64 };
      expect(encodePubkey(pubkey)).toEqual(
        Any.fromPartial({
          typeUrl: "/cosmos.crypto.secp256k1.PubKey",
          value: defaultPubkeyProtoBytes,
        }),
      );
    });

    it("works for ed25519", () => {
      const pubkey = { type: "tendermint/PubKeyEd25519", value: ed25519PubkeyBase64 };
      expect(encodePubkey(pubkey)).toEqual(
        Any.fromPartial({
          typeUrl: "/cosmos.crypto.ed25519.PubKey",
          value: ed25519PubkeyProtoBytes,
        }),
      );
    });

    it("throws for unsupported pubkey types", () => {
      const pubkey = {
        type: "tendermint/PubKeyUnknown",
        value: defaultPubkeyBase64,
      };
      expect(() => encodePubkey(pubkey)).toThrowError(/not recognized/i);
    });
  });

  describe("decodePubkey", () => {
    it("works for secp256k1", () => {
      const pubkey = {
        typeUrl: "/cosmos.crypto.secp256k1.PubKey",
        value: defaultPubkeyProtoBytes,
      };
      expect(decodePubkey(pubkey)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: defaultPubkeyBase64,
      });
    });

    it("works for ed25519", () => {
      const pubkey = {
        typeUrl: "/cosmos.crypto.ed25519.PubKey",
        value: ed25519PubkeyProtoBytes,
      };
      expect(decodePubkey(pubkey)).toEqual({
        type: "tendermint/PubKeyEd25519",
        value: ed25519PubkeyBase64,
      });
    });

    it("works for multisig (LegacyAminoPubKey)", () => {
      const pubkey1Proto = CosmosCryptoSecp256k1Pubkey.fromPartial({
        key: defaultPubkeyBytes,
      });
      const pubkey2Proto = CosmosCryptoSecp256k1Pubkey.fromPartial({
        key: ed25519PubkeyBytes,
      });
      const multisigProto = LegacyAminoPubKey.fromPartial({
        threshold: 2,
        publicKeys: [
          Any.fromPartial({
            typeUrl: "/cosmos.crypto.secp256k1.PubKey",
            value: Uint8Array.from(CosmosCryptoSecp256k1Pubkey.encode(pubkey1Proto).finish()),
          }),
          Any.fromPartial({
            typeUrl: "/cosmos.crypto.secp256k1.PubKey",
            value: Uint8Array.from(CosmosCryptoSecp256k1Pubkey.encode(pubkey2Proto).finish()),
          }),
        ],
      });
      const pubkey = Any.fromPartial({
        typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
        value: Uint8Array.from(LegacyAminoPubKey.encode(multisigProto).finish()),
      });
      expect(decodePubkey(pubkey)).toEqual({
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "2",
          pubkeys: [
            { type: "tendermint/PubKeySecp256k1", value: defaultPubkeyBase64 },
            { type: "tendermint/PubKeySecp256k1", value: ed25519PubkeyBase64 },
          ],
        },
      });
    });

    it("throws for unsupported pubkey types", () => {
      const pubkey = {
        typeUrl: "/cosmos.crypto.unknown.PubKey",
        value: defaultPubkeyProtoBytes,
      };
      expect(() => decodePubkey(pubkey)).toThrowError(/not recognized/i);
    });
  });
});

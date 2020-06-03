import { Encoding } from "@iov/encoding";

import { decodeSignature, encodeSecp256k1Signature } from "./signature";
import { StdSignature } from "./types";

const { fromBase64 } = Encoding;

describe("signature", () => {
  describe("encodeSecp256k1Signature", () => {
    it("encodes a full signature", () => {
      const pubkey = fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
      const signature = fromBase64(
        "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      );
      expect(encodeSecp256k1Signature(pubkey, signature)).toEqual({
        // eslint-disable-next-line @typescript-eslint/camelcase
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
        },
        signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      });
    });

    it("throws when getting uncompressed public keys", () => {
      const pubkey = fromBase64(
        "BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=",
      );
      const signature = fromBase64(
        "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      );
      expect(() => encodeSecp256k1Signature(pubkey, signature)).toThrowError(
        /public key must be compressed secp256k1/i,
      );
    });

    it("throws if signature contains recovery byte", () => {
      const pubkey = fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
      const signature = Uint8Array.from([
        ...fromBase64(
          "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
        ),
        99,
      ]);
      expect(() => encodeSecp256k1Signature(pubkey, signature)).toThrowError(
        /signature must be 64 bytes long/i,
      );
    });
  });

  describe("decodeSignature", () => {
    it("works for secp256k1", () => {
      const signature: StdSignature = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
        },
        signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      };
      expect(decodeSignature(signature)).toEqual({
        pubkey: fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP"),
        signature: fromBase64(
          "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
        ),
      });
    });
  });
});

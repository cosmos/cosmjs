import { fromBase64 } from "@cosmjs/encoding";

import {
  decodeSignature,
  encodeEthSecp256k1Signature,
  encodeSecp256k1Signature,
  StdSignature,
} from "./signature";

describe("signature", () => {
  describe("encodeSecp256k1Signature", () => {
    it("encodes a full signature", () => {
      const pubkey = fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
      const signature = fromBase64(
        "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      );
      expect(encodeSecp256k1Signature(pubkey, signature)).toEqual({
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

  describe("decodeSecp256k1Signature", () => {
    it("works for secp256k1", () => {
      const signature: StdSignature = {
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

  describe("encodeEthSecp256k1Signature", () => {
    it("encodes a full signature", () => {
      const pubkey = fromBase64("AywEwHmedyGF0jQ11+SY/dLGn/QwoN+cf09VWFAfUxUs");
      const signature = fromBase64(
        "sGcYUlDfO1PDA/Z9NqUBtgSTdRTJ+AJ8tvgw+5qtXalPgh5XqZj4R2eY1b7RXMU1m5and6aOl7YGpk9cZnESmQ==",
      );
      expect(encodeEthSecp256k1Signature(pubkey, signature)).toEqual({
        pub_key: {
          type: "os/PubKeyEthSecp256k1",
          value: "AywEwHmedyGF0jQ11+SY/dLGn/QwoN+cf09VWFAfUxUs",
        },
        signature: "sGcYUlDfO1PDA/Z9NqUBtgSTdRTJ+AJ8tvgw+5qtXalPgh5XqZj4R2eY1b7RXMU1m5and6aOl7YGpk9cZnESmQ==",
      });
    });

    it("throws when getting uncompressed public keys", () => {
      const pubkey = fromBase64(
        "BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=",
      );
      const signature = fromBase64(
        "sGcYUlDfO1PDA/Z9NqUBtgSTdRTJ+AJ8tvgw+5qtXalPgh5XqZj4R2eY1b7RXMU1m5and6aOl7YGpk9cZnESmQ==",
      );
      expect(() => encodeEthSecp256k1Signature(pubkey, signature)).toThrowError(
        /public key must be compressed secp256k1/i,
      );
    });

    it("throws if signature contains recovery byte", () => {
      const pubkey = fromBase64("AywEwHmedyGF0jQ11+SY/dLGn/QwoN+cf09VWFAfUxUs");
      const signature = Uint8Array.from([
        ...fromBase64(
          "sGcYUlDfO1PDA/Z9NqUBtgSTdRTJ+AJ8tvgw+5qtXalPgh5XqZj4R2eY1b7RXMU1m5and6aOl7YGpk9cZnESmQ==",
        ),
        99,
      ]);
      expect(() => encodeEthSecp256k1Signature(pubkey, signature)).toThrowError(
        /signature must be 64 bytes long/i,
      );
    });
  });

  describe("decodeEthSecp256k1Signature", () => {
    it("works for ethsecp256k1", () => {
      const signature: StdSignature = {
        pub_key: {
          type: "os/PubKeyEthSecp256k1",
          value: "AywEwHmedyGF0jQ11+SY/dLGn/QwoN+cf09VWFAfUxUs",
        },
        signature: "sGcYUlDfO1PDA/Z9NqUBtgSTdRTJ+AJ8tvgw+5qtXalPgh5XqZj4R2eY1b7RXMU1m5and6aOl7YGpk9cZnESmQ==",
      };
      expect(decodeSignature(signature)).toEqual({
        pubkey: fromBase64("AywEwHmedyGF0jQ11+SY/dLGn/QwoN+cf09VWFAfUxUs"),
        signature: fromBase64(
          "sGcYUlDfO1PDA/Z9NqUBtgSTdRTJ+AJ8tvgw+5qtXalPgh5XqZj4R2eY1b7RXMU1m5and6aOl7YGpk9cZnESmQ==",
        ),
      });
    });
  });
});

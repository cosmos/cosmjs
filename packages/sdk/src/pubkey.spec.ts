import { Encoding } from "@iov/encoding";

import { decodeBech32Pubkey, encodeBech32Pubkey, encodeSecp256k1Pubkey } from "./pubkey";
import { PubKey } from "./types";

const { fromBase64 } = Encoding;

describe("pubkey", () => {
  describe("encodeSecp256k1Pubkey", () => {
    it("encodes a compresed pubkey", () => {
      const pubkey = fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
      expect(encodeSecp256k1Pubkey(pubkey)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      });
    });

    it("throws for uncompressed public keys", () => {
      const pubkey = fromBase64(
        "BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=",
      );
      expect(() => encodeSecp256k1Pubkey(pubkey)).toThrowError(/public key must be compressed secp256k1/i);
    });
  });

  describe("decodeBech32Pubkey", () => {
    it("works", () => {
      expect(
        decodeBech32Pubkey("cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5"),
      ).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      });
    });

    it("works for enigma pubkey", () => {
      expect(
        decodeBech32Pubkey("enigmapub1addwnpepqw5k9p439nw0zpg2aundx4umwx4nw233z5prpjqjv5anl5grmnchzp2xwvv"),
      ).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A6lihrEs3PEFCu8m01ebcas3KjEVAjDIEmU7P9ED3PFx",
      });
    });
  });

  describe("encodeBech32Pubkey", () => {
    it("works for secp256k1", () => {
      const pubkey: PubKey = {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      };
      expect(encodeBech32Pubkey(pubkey, "cosmospub")).toEqual(
        "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5",
      );
    });
  });
});

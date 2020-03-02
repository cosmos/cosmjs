import { Algorithm, PubkeyBytes } from "@iov/bcp";
import { Encoding } from "@iov/encoding";

import { pubkeyToAddress } from "./address";

const { fromBase64, fromHex } = Encoding;

describe("address", () => {
  describe("pubkeyToAddress", () => {
    it("works for Secp256k1 compressed", () => {
      const prefix = "cosmos";
      const pubkey = {
        algo: Algorithm.Secp256k1,
        data: fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP") as PubkeyBytes,
      };
      expect(pubkeyToAddress(pubkey, prefix)).toEqual("cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r");
    });

    it("works for Secp256k1 uncompressed", () => {
      const prefix = "cosmos";
      const pubkey = {
        algo: Algorithm.Secp256k1,
        data: fromBase64(
          "BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=",
        ) as PubkeyBytes,
      };
      expect(pubkeyToAddress(pubkey, prefix)).toEqual("cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6");
    });

    it("works for Ed25519", () => {
      const prefix = "cosmos";
      const pubkey = {
        algo: Algorithm.Ed25519,
        data: fromHex("12ee6f581fe55673a1e9e1382a0829e32075a0aa4763c968bc526e1852e78c95") as PubkeyBytes,
      };
      expect(pubkeyToAddress(pubkey, prefix)).toEqual("cosmos1pfq05em6sfkls66ut4m2257p7qwlk448h8mysz");
    });
  });
});

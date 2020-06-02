import { Encoding } from "@iov/encoding";

import { pubkeyToAddress } from "./address";

const { toBase64, fromHex } = Encoding;

describe("address", () => {
  describe("pubkeyToAddress", () => {
    it("works for Secp256k1 compressed", () => {
      const prefix = "cosmos";
      const pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      };
      expect(pubkeyToAddress(pubkey, prefix)).toEqual("cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r");
    });

    it("works for Ed25519", () => {
      const prefix = "cosmos";
      const pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: toBase64(fromHex("12ee6f581fe55673a1e9e1382a0829e32075a0aa4763c968bc526e1852e78c95")),
      };
      expect(pubkeyToAddress(pubkey, prefix)).toEqual("cosmos1pfq05em6sfkls66ut4m2257p7qwlk448h8mysz");
    });
  });
});

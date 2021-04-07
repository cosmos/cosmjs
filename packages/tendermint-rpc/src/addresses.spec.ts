import { fromHex } from "@cosmjs/encoding";

import { pubkeyToAddress, pubkeyToRawAddress } from "./addresses";

// Test values from https://github.com/informalsystems/tendermint-rs/blob/v0.18.1/tendermint/src/account.rs#L153-L192

describe("addresses", () => {
  describe("pubkeyToRawAddress", () => {
    it("works for Secp256k1", () => {
      const pubkey = fromHex("02950E1CDFCB133D6024109FD489F734EEB4502418E538C28481F22BCE276F248C");
      expect(pubkeyToRawAddress("secp256k1", pubkey)).toEqual(
        fromHex("7C2BB42A8BE69791EC763E51F5A49BCD41E82237"),
      );
    });

    it("works for Ed25519", () => {
      const pubkey = fromHex("14253D61EF42D166D02E68D540D07FDF8D65A9AF0ACAA46302688E788A8521E2");
      expect(pubkeyToRawAddress("ed25519", pubkey)).toEqual(
        fromHex("0CDA3F47EF3C4906693B170EF650EB968C5F4B2C"),
      );
    });
  });

  describe("pubkeyToAddress", () => {
    it("works for Secp256k1", () => {
      const pubkey = fromHex("02950E1CDFCB133D6024109FD489F734EEB4502418E538C28481F22BCE276F248C");
      expect(pubkeyToAddress("secp256k1", pubkey)).toEqual("7C2BB42A8BE69791EC763E51F5A49BCD41E82237");
    });

    it("works for Ed25519", () => {
      const pubkey = fromHex("14253D61EF42D166D02E68D540D07FDF8D65A9AF0ACAA46302688E788A8521E2");
      expect(pubkeyToAddress("ed25519", pubkey)).toEqual("0CDA3F47EF3C4906693B170EF650EB968C5F4B2C");
    });
  });
});

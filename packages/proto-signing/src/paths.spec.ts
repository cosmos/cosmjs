import { Slip10RawIndex } from "@cosmjs/crypto";

import { makeCosmoshubPath } from "./paths";

describe("paths", () => {
  describe("makeCosmoshubPath", () => {
    it("works", () => {
      // m/44'/118'/0'/0/0
      expect(makeCosmoshubPath(0)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(118),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(0),
      ]);
      // m/44'/118'/0'/0/123
      expect(makeCosmoshubPath(123)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(118),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(123),
      ]);
    });
  });
});

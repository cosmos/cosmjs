import { Slip10RawIndex } from "@cosmjs/crypto";

import { makeCosmoshubPath, makeEthermintPath } from "./paths";

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

  describe("makeEthermintPath", () => {
    it("works", () => {
      // m/44'/60'/0'/0/0
      expect(makeEthermintPath(0)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(60),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(0),
      ]);
      // m/44'/60'/0'/0/123
      expect(makeEthermintPath(123)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(60),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(123),
      ]);
    });
  });
});

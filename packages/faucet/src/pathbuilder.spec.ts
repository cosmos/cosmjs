import { Slip10RawIndex } from "@cosmjs/crypto";
import { makeCosmoshubPath } from "@cosmjs/proto-signing";

import { makePathBuilder, PathBuilder } from "./pathbuilder";

describe("pathbuilder", () => {
  describe("PathBuilder", () => {
    it("is compatible to makeCosmoshubPath", () => {
      const _builder: PathBuilder = makeCosmoshubPath;
    });
  });

  describe("makePathBuilder", () => {
    it("works", () => {
      const hub = makePathBuilder("m/44'/118'/0'/0/a");
      expect(hub(0)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(118),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(0),
      ]);
      expect(hub(25)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(118),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(25),
      ]);

      const stellar = makePathBuilder("m/44'/148'/a'");
      expect(stellar(0)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(148),
        Slip10RawIndex.hardened(0),
      ]);
      expect(stellar(42)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(148),
        Slip10RawIndex.hardened(42),
      ]);
    });

    it("throws for invalid patterns", () => {
      // No `a`
      expect(() => makePathBuilder("m/44'/118'/0'/0/30")).toThrowError(
        /Missing account index variable `a` in pattern./i,
      );

      // Two `a`
      expect(() => makePathBuilder("m/44'/118'/a'/0/a")).toThrowError(
        /More than one account index variable `a` in pattern/i,
      );

      // Stray character
      expect(() => makePathBuilder("m/44'?/118'/0'/0/a")).toThrowError(
        /Syntax error while reading path component/i,
      );

      // Missing m/
      expect(() => makePathBuilder("44'/118'/0'/0/a")).toThrowError(/Path string must start with 'm'/i);
    });
  });
});

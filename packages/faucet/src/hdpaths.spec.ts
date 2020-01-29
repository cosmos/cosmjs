import { Slip10RawIndex } from "@iov/crypto";

import { debugPath } from "./hdpaths";

describe("hdpaths", () => {
  describe("debugPath", () => {
    it("works for no component", () => {
      // See https://github.com/bitcoin/bips/blob/master/bip-0032/derivation.png from BIP32
      expect(debugPath([])).toEqual("m");
    });

    it("works for normal components", () => {
      const one = Slip10RawIndex.normal(1);
      expect(debugPath([one])).toEqual("m/1");
      expect(debugPath([one, one])).toEqual("m/1/1");
      expect(debugPath([one, one, one])).toEqual("m/1/1/1");

      const min = Slip10RawIndex.normal(0);
      expect(debugPath([min])).toEqual("m/0");

      const max = Slip10RawIndex.normal(2 ** 31 - 1);
      expect(debugPath([max])).toEqual("m/2147483647");
    });

    it("works for hardened components", () => {
      const one = Slip10RawIndex.hardened(1);
      expect(debugPath([one])).toEqual("m/1'");
      expect(debugPath([one, one])).toEqual("m/1'/1'");
      expect(debugPath([one, one, one])).toEqual("m/1'/1'/1'");

      const min = Slip10RawIndex.hardened(0);
      expect(debugPath([min])).toEqual("m/0'");

      const max = Slip10RawIndex.hardened(2 ** 31 - 1);
      expect(debugPath([max])).toEqual("m/2147483647'");
    });

    it("works for mixed components", () => {
      const one = Slip10RawIndex.normal(1);
      const two = Slip10RawIndex.hardened(2);
      expect(debugPath([one, two, two, one])).toEqual("m/1/2'/2'/1");
    });
  });
});

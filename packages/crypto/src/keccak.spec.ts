import { fromHex, toHex } from "@cosmjs/encoding";

import { Keccak256, keccak256 } from "./keccak";
import keccakVectors from "./testdata/keccak.json";

describe("Keccak256", () => {
  it("exists", () => {
    expect(Keccak256).toBeTruthy();
  });

  it("works for empty input", () => {
    {
      const hash = new Keccak256(new Uint8Array([])).digest();
      expect(toHex(hash)).toEqual("c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470");
    }
    {
      const hash = new Keccak256().digest();
      expect(toHex(hash)).toEqual("c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470");
    }
  });

  it("works for all the Botan test vectors", () => {
    // https://github.com/randombit/botan/blob/2.8.0/src/tests/data/hash/keccak.vec#L806
    for (const { in: input, out: output } of keccakVectors.keccak256) {
      expect(new Keccak256(fromHex(input)).digest()).toEqual(fromHex(output));
    }
  });

  it("exposes a convenience function", () => {
    const { in: input, out: output } = keccakVectors.keccak256[0];
    expect(keccak256(fromHex(input))).toEqual(fromHex(output));
  });
});

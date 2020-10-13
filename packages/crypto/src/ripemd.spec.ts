import { fromHex } from "@cosmjs/encoding";

import { Ripemd160, ripemd160 } from "./ripemd";
import ripemdVectors from "./testdata/ripemd.json";

describe("Ripemd160", () => {
  it("exists", () => {
    expect(Ripemd160).toBeTruthy();
  });

  it("works for empty input", () => {
    {
      const hash = new Ripemd160(new Uint8Array([])).digest();
      expect(hash).toEqual(fromHex("9c1185a5c5e9fc54612808977ee8f548b2258d31"));
    }
    {
      const hash = new Ripemd160().digest();
      expect(hash).toEqual(fromHex("9c1185a5c5e9fc54612808977ee8f548b2258d31"));
    }
  });

  it("works for all the Botan test vectors", () => {
    // https://github.com/randombit/botan/blob/2.12.1/src/tests/data/hash/ripemd160.vec
    for (const { in: input, out: output } of ripemdVectors.ripemd160) {
      expect(new Ripemd160(fromHex(input)).digest()).toEqual(fromHex(output));
    }
  });

  it("exposes a convenience function", () => {
    const { in: input, out: output } = ripemdVectors.ripemd160[0];
    expect(ripemd160(fromHex(input))).toEqual(fromHex(output));
  });
});

import { fromHex, toHex } from "@cosmjs/encoding";

import { Sha256, sha256 } from "./sha";
import shaVectors from "./testdata/sha.json";

describe("Sha256", () => {
  it("exists", () => {
    expect(Sha256).toBeTruthy();
  });

  it("works for empty input", () => {
    {
      const hash = new Sha256(new Uint8Array([])).digest();
      expect(toHex(hash)).toEqual("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    }
    {
      const hash = new Sha256().digest();
      expect(toHex(hash)).toEqual("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    }
  });

  it("works for all the Botan test vectors", () => {
    // https://github.com/randombit/botan/blob/2.6.0/src/tests/data/hash/sha2_32.vec#L13
    for (const { in: input, out: output } of shaVectors.sha256) {
      expect(new Sha256(fromHex(input)).digest()).toEqual(fromHex(output));
    }
  });

  it("exposes a convenience function", () => {
    const { in: input, out: output } = shaVectors.sha256[0];
    expect(sha256(fromHex(input))).toEqual(fromHex(output));
  });
});

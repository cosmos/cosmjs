import { expect } from "chai";

import { Codec, codecFromString } from "./codec";

describe("Codec", () => {
  it("can convert string to codec", () => {
    expect(codecFromString("bns")).to.equal(Codec.Bns);
    expect(codecFromString("lisk")).to.equal(Codec.Lisk);
    expect(codecFromString("ethereum")).to.equal(Codec.Ethereum);

    expect(() => codecFromString("")).to.throw(/not supported/i);
    expect(() => codecFromString("abc")).to.throw(/not supported/i);
    expect(() => codecFromString("LISK")).to.throw(/not supported/i);
    expect(() => codecFromString("ETHEREUM")).to.throw(/not supported/i);
  });
});

import { Codec, codecFromString } from "./codec";

describe("Codec", () => {
  it("can convert string to codec", () => {
    expect(codecFromString("bns")).toEqual(Codec.Bns);
    expect(codecFromString("lisk")).toEqual(Codec.Lisk);
    expect(codecFromString("ethereum")).toEqual(Codec.Ethereum);

    expect(() => codecFromString("")).toThrowError(/not supported/i);
    expect(() => codecFromString("abc")).toThrowError(/not supported/i);
    expect(() => codecFromString("LISK")).toThrowError(/not supported/i);
    expect(() => codecFromString("ETHEREUM")).toThrowError(/not supported/i);
  });
});

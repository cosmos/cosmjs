import { Codec, codecFromString } from "./codec";

describe("Codec", () => {
  it("can convert string to codec", () => {
    expect(codecFromString("cosmwasm")).toEqual(Codec.CosmWasm);

    expect(() => codecFromString("")).toThrowError(/not supported/i);
    expect(() => codecFromString("lisk")).toThrowError(/not supported/i);
    expect(() => codecFromString("bns")).toThrowError(/not supported/i);
    expect(() => codecFromString("abc")).toThrowError(/not supported/i);
    expect(() => codecFromString("LISK")).toThrowError(/not supported/i);
    expect(() => codecFromString("CosmWasm")).toThrowError(/not supported/i);
  });
});

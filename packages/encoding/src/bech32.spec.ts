import { Bech32 } from "./bech32";
import { fromHex } from "./hex";

describe("Bech32", () => {
  // test data generate using https://github.com/nym-zone/bech32
  // bech32 -e -h eth 9d4e856e572e442f0a4b2763e72d08a0e99d8ded
  const ethAddressRaw = fromHex("9d4e856e572e442f0a4b2763e72d08a0e99d8ded");

  it("encodes", () => {
    expect(Bech32.encode("eth", ethAddressRaw)).toEqual("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw");
  });

  it("decodes", () => {
    expect(Bech32.decode("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toEqual({
      prefix: "eth",
      data: ethAddressRaw,
    });
  });
});

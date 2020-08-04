import { Bech32 } from "./bech32";
import { fromHex } from "./hex";

describe("Bech32", () => {
  // test data generate using https://github.com/nym-zone/bech32
  // bech32 -e -h eth 9d4e856e572e442f0a4b2763e72d08a0e99d8ded
  const ethAddressRaw = fromHex("9d4e856e572e442f0a4b2763e72d08a0e99d8ded");

  describe("encode", () => {
    it("works", () => {
      expect(Bech32.encode("eth", ethAddressRaw)).toEqual("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw");
    });

    it("works for very short data", () => {
      expect(() => Bech32.encode("eth", new Uint8Array(1))).not.toThrow();
    });

    it("works for very long prefixes", () => {
      expect(() => Bech32.encode("p".repeat(70), new Uint8Array(20))).toThrowError(/exceeds length limit/i);
    });

    // See https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#Bech32
    it("works if result is 90 characters", () => {
      const result = Bech32.encode("eth", new Uint8Array(50));
      expect(result.length).toEqual(90);
    });

    it("throws if result exceeds 90 characters", () => {
      expect(() => Bech32.encode("eth", new Uint8Array(51))).toThrowError(/exceeds length limit/i);
    });

    it("works if a limit parameter is provided", () => {
      const limit = 1024;
      const result = Bech32.encode("eth", new Uint8Array(51), limit);
      expect(result).toEqual(
        "eth1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqug55er",
      );
      expect(result.length).toBeGreaterThan(90);
    });

    it("throws if result exceeds the provided limit parameter", () => {
      const limit = 10;
      expect(() => Bech32.encode("eth", ethAddressRaw, limit)).toThrowError(/exceeds length limit/i);
    });
  });

  describe("decode", () => {
    it("works", () => {
      expect(Bech32.decode("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toEqual({
        prefix: "eth",
        data: ethAddressRaw,
      });
    });

    it("works for addresses which exceed the specification limit of 90 characters", () => {
      // Example from https://github.com/cosmos/cosmos-sdk/pull/6237#issuecomment-658116534
      expect(() =>
        Bech32.decode(
          "cosmospub1ytql0csgqvfzd666axrjzqmn5q2ucztcyxw8hvlzen94ay05tegaerkug5pn3xn8wqdymt598ufzd666axrjzqsxllmwacap3f6xyc4x30jl8ecrcs2tze3zzgxkmthcsqxnqxhwwgfzd666axrjzqs2rlu3wz5gnslgpprszjr8r65n0d6y39q657th77eyvengtk3z0y6h2pnk",
        ),
      ).not.toThrow();
    });

    it("throws for addresses which exceed the specification limit of 90 characters if a limit is specified", () => {
      // Example from https://github.com/cosmos/cosmos-sdk/pull/6237#issuecomment-658116534
      expect(() =>
        Bech32.decode(
          "cosmospub1ytql0csgqvfzd666axrjzqmn5q2ucztcyxw8hvlzen94ay05tegaerkug5pn3xn8wqdymt598ufzd666axrjzqsxllmwacap3f6xyc4x30jl8ecrcs2tze3zzgxkmthcsqxnqxhwwgfzd666axrjzqs2rlu3wz5gnslgpprszjr8r65n0d6y39q657th77eyvengtk3z0y6h2pnk",
          90,
        ),
      ).toThrowError(/exceeds length limit/i);
    });
  });
});

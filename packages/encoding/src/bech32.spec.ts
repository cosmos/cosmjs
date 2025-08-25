import { fromBech32, normalizeBech32, toBech32 } from "./bech32";
import { fromHex } from "./hex";

describe("bech32", () => {
  // test data generate using https://github.com/nym-zone/bech32
  // bech32 -e -h eth 9d4e856e572e442f0a4b2763e72d08a0e99d8ded
  const ethAddressRaw = fromHex("9d4e856e572e442f0a4b2763e72d08a0e99d8ded");

  describe("toBech32", () => {
    it("works", () => {
      expect(toBech32("eth", ethAddressRaw)).toEqual("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw");
    });

    it("works for very short data", () => {
      expect(() => toBech32("eth", new Uint8Array(1))).not.toThrow();
    });

    it("works for very long prefixes", () => {
      expect(() => toBech32("p".repeat(70), new Uint8Array(20))).toThrowError(/exceeds limit 90/i);
    });

    // See https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#Bech32
    it("works if result is 90 characters", () => {
      const result = toBech32("eth", new Uint8Array(50));
      expect(result.length).toEqual(90);
    });

    it("throws if result exceeds 90 characters", () => {
      expect(() => toBech32("eth", new Uint8Array(51))).toThrowError(/Length 92 exceeds limit 90/i);
    });

    it("works if a limit parameter is provided", () => {
      const limit = 1024;
      const result = toBech32("eth", new Uint8Array(51), limit);
      expect(result).toEqual(
        "eth1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqug55er",
      );
      expect(result.length).toBeGreaterThan(90);
    });

    it("throws if result exceeds the provided limit parameter", () => {
      const limit = 10;
      expect(() => toBech32("eth", ethAddressRaw, limit)).toThrowError(/exceeds limit 10/i);
    });
  });

  describe("fromBech32", () => {
    it("works", () => {
      expect(fromBech32("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toEqual({
        prefix: "eth",
        data: ethAddressRaw,
      });
    });

    it("works for upper case address", () => {
      // "For presentation, lowercase is usually preferable, but inside QR codes uppercase SHOULD be used, as those permit the use of alphanumeric mode, which is 45% more compact than the normal byte mode."
      // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
      expect(fromBech32("ETH1N48G2MJH9EZZ7ZJTYA37WTGG5R5EMR0DRKWLGW")).toEqual({
        prefix: "eth",
        data: ethAddressRaw,
      });
    });

    it("works for addresses which exceed the specification limit of 90 characters", () => {
      // Example from https://github.com/cosmos/cosmos-sdk/pull/6237#issuecomment-658116534
      expect(() =>
        fromBech32(
          "cosmospub1ytql0csgqvfzd666axrjzqmn5q2ucztcyxw8hvlzen94ay05tegaerkug5pn3xn8wqdymt598ufzd666axrjzqsxllmwacap3f6xyc4x30jl8ecrcs2tze3zzgxkmthcsqxnqxhwwgfzd666axrjzqs2rlu3wz5gnslgpprszjr8r65n0d6y39q657th77eyvengtk3z0y6h2pnk",
        ),
      ).not.toThrow();
    });

    it("throws for addresses which exceed the specification limit of 90 characters if a limit is specified", () => {
      // Example from https://github.com/cosmos/cosmos-sdk/pull/6237#issuecomment-658116534
      expect(() =>
        fromBech32(
          "cosmospub1ytql0csgqvfzd666axrjzqmn5q2ucztcyxw8hvlzen94ay05tegaerkug5pn3xn8wqdymt598ufzd666axrjzqsxllmwacap3f6xyc4x30jl8ecrcs2tze3zzgxkmthcsqxnqxhwwgfzd666axrjzqs2rlu3wz5gnslgpprszjr8r65n0d6y39q657th77eyvengtk3z0y6h2pnk",
          90,
        ),
      ).toThrowError(/invalid string length/i);
    });

    it("throws for mixed case addresses", () => {
      // "Decoders MUST NOT accept strings where some characters are uppercase and some are lowercase (such strings are referred to as mixed case strings)."
      // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
      expect(() => fromBech32("Eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/or uppercase/i);
      expect(() => fromBech32("eTh1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/or uppercase/i);
      expect(() => fromBech32("ETH1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/or uppercase/i);
      expect(() => fromBech32("eth1n48g2mjh9Ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/or uppercase/i);
    });
  });

  describe("normalizeBech32", () => {
    it("works", () => {
      expect(normalizeBech32("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toEqual(
        "eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw",
      );
      expect(normalizeBech32("ETH1N48G2MJH9EZZ7ZJTYA37WTGG5R5EMR0DRKWLGW")).toEqual(
        "eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw",
      );
    });

    it("throws for mixed case addresses", () => {
      // "Decoders MUST NOT accept strings where some characters are uppercase and some are lowercase (such strings are referred to as mixed case strings)."
      // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
      expect(() => normalizeBech32("Eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/uppercase/i);
      expect(() => normalizeBech32("eTh1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/uppercase/i);
      expect(() => normalizeBech32("ETH1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/uppercase/i);
      expect(() => normalizeBech32("eth1n48g2mjh9Ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(/uppercase/i);
    });
  });
});

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
      expect(() => toBech32("p".repeat(70), new Uint8Array(20))).toThrowError(/length 109 exceeds limit 90/i);
    });

    // See https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#Bech32
    it("works if result is 90 characters", () => {
      const result = toBech32("eth", new Uint8Array(50));
      expect(result.length).toEqual(90);
    });

    it("throws if result exceeds 90 characters", () => {
      expect(() => toBech32("eth", new Uint8Array(51))).toThrowError(/length 92 exceeds limit 90/i);
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
      expect(() => toBech32("eth", ethAddressRaw, limit)).toThrowError(/length 42 exceeds limit 10/i);
    });
  });

  describe("fromBech32", () => {
    it("works", () => {
      expect(fromBech32("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toEqual({
        prefix: "eth",
        data: ethAddressRaw,
        encoding: "bech32",
      });
    });

    it("works for upper case address", () => {
      // "For presentation, lowercase is usually preferable, but inside QR codes uppercase SHOULD be used, as those permit the use of alphanumeric mode, which is 45% more compact than the normal byte mode."
      // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
      expect(fromBech32("ETH1N48G2MJH9EZZ7ZJTYA37WTGG5R5EMR0DRKWLGW")).toEqual({
        prefix: "eth",
        data: ethAddressRaw,
        encoding: "bech32",
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

    it("throws for missing separator", () => {
      expect(() => fromBech32("nooneinhere")).toThrowError(/No bech32 separator found/i);
    });

    it("throws for invalid checksum", () => {
      const corrupted = "eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0dxxxxxx";
      expect(() => fromBech32(corrupted)).toThrowError(/invalid checksum/i);
    });

    it("throws for mixed case addresses", () => {
      // "Decoders MUST NOT accept strings where some characters are uppercase and some are lowercase (such strings are referred to as mixed case strings)."
      // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
      expect(() => fromBech32("Eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
      expect(() => fromBech32("eTh1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
      expect(() => fromBech32("ETH1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
      expect(() => fromBech32("eth1n48g2mjh9Ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
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
      expect(() => normalizeBech32("Eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
      expect(() => normalizeBech32("eTh1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
      expect(() => normalizeBech32("ETH1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
      expect(() => normalizeBech32("eth1n48g2mjh9Ezz7zjtya37wtgg5r5emr0drkwlgw")).toThrowError(
        /must be lowercase or uppercase/i,
      );
    });
  });

  describe("bech32m variant", () => {
    // Same data as the bech32 case above; only the checksum constant differs.
    const ethBech32m = "eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0dk27ndv";

    it("toBech32 encodes bech32m when requested", () => {
      expect(toBech32("eth", ethAddressRaw, undefined, "bech32m")).toEqual(ethBech32m);
      // ... and differs from the default bech32 encoding of the same data
      expect(toBech32("eth", ethAddressRaw)).not.toEqual(ethBech32m);
    });

    it("fromBech32 auto-detects the bech32m variant", () => {
      expect(fromBech32(ethBech32m)).toEqual({
        prefix: "eth",
        data: ethAddressRaw,
        encoding: "bech32m",
      });
    });

    it("reports the bech32 variant for a bech32 address", () => {
      expect(fromBech32("eth1n48g2mjh9ezz7zjtya37wtgg5r5emr0drkwlgw").encoding).toEqual("bech32");
    });

    it("round-trips bech32m data", () => {
      const encoded = toBech32("juno", ethAddressRaw, undefined, "bech32m");
      const { data, encoding } = fromBech32(encoded);
      expect(encoding).toEqual("bech32m");
      expect(data).toEqual(ethAddressRaw);
    });

    it("normalizeBech32 preserves the bech32m variant", () => {
      // Must not silently re-encode a bech32m address as bech32, which would
      // change the checksum and therefore the address.
      expect(normalizeBech32(ethBech32m.toUpperCase())).toEqual(ethBech32m);
    });

    it("decodes a BIP350 test vector", () => {
      // From https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki
      expect(fromBech32("abcdef1l7aum6echk45nj3s0wdvt2fg8x9yrzpqzd3ryx").encoding).toEqual("bech32m");
    });
  });
});

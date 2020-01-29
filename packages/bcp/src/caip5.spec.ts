import { ChainId } from "@iov/bcp";

import { Caip5 } from "./caip5";

describe("Caip5", () => {
  describe("encode", () => {
    it("works for direct format", () => {
      expect(Caip5.encode("foo")).toEqual("cosmos:foo");
      expect(Caip5.encode("aA1-")).toEqual("cosmos:aA1-");
      expect(Caip5.encode("12345678901234567890123456789012345678901234567")).toEqual(
        "cosmos:12345678901234567890123456789012345678901234567",
      );

      // Test vectors from CAIP-5
      expect(Caip5.encode("cosmoshub-3")).toEqual("cosmos:cosmoshub-3");
      expect(Caip5.encode("Binance-Chain-Tigris")).toEqual("cosmos:Binance-Chain-Tigris");
      expect(Caip5.encode("x")).toEqual("cosmos:x");
      expect(Caip5.encode("hash-")).toEqual("cosmos:hash-");
      expect(Caip5.encode("hashed")).toEqual("cosmos:hashed");
    });

    it("works for hashed format", () => {
      // Test vectors from CAIP-5
      expect(Caip5.encode("hashed-")).toEqual("cosmos:hashed-c904589232422def");
      expect(Caip5.encode("hashed-123")).toEqual("cosmos:hashed-99df5cd68192b33e");
      expect(Caip5.encode("123456789012345678901234567890123456789012345678")).toEqual(
        "cosmos:hashed-0204c92a0388779d",
      );
      expect(Caip5.encode(" ")).toEqual("cosmos:hashed-36a9e7f1c95b82ff");
      expect(Caip5.encode("wonderland🧝‍♂️")).toEqual("cosmos:hashed-843d2fc87f40eeb9");
    });

    it("throws for empty input", () => {
      expect(() => Caip5.encode("")).toThrowError(/must not be empty/i);
    });
  });

  describe("decode", () => {
    it("works for valid format", () => {
      expect(Caip5.decode("cosmos:x" as ChainId)).toEqual("x");
      expect(Caip5.decode("cosmos:foo" as ChainId)).toEqual("foo");
      expect(Caip5.decode("cosmos:aA1-" as ChainId)).toEqual("aA1-");
      expect(Caip5.decode("cosmos:12345678901234567890123456789012345678901234567" as ChainId)).toEqual(
        "12345678901234567890123456789012345678901234567",
      );
    });

    it("throws for invalid format", () => {
      // wrong namespace
      expect(() => Caip5.decode(":foobar" as ChainId)).toThrowError(/not compatible with CAIP-5/i);
      expect(() => Caip5.decode("xyz:foobar" as ChainId)).toThrowError(/not compatible with CAIP-5/i);
      expect(() => Caip5.decode("cosmos-hash:foobar" as ChainId)).toThrowError(/not compatible with CAIP-5/i);

      // reference too short
      expect(() => Caip5.decode("cosmos:" as ChainId)).toThrowError(/not compatible with CAIP-5/i);

      // reference too long
      expect(() =>
        Caip5.decode("cosmos:123456789012345678901234567890123456789012345678" as ChainId),
      ).toThrowError(/not compatible with CAIP-5/i);

      // invalid chars
      expect(() => Caip5.decode("cosmos:foo bar" as ChainId)).toThrowError(/not compatible with CAIP-5/i);
      expect(() => Caip5.decode("cosmos:wonder🧝‍♂️" as ChainId)).toThrowError(/not compatible with CAIP-5/i);
    });

    it("throws for hashed chain IDs", () => {
      expect(() => Caip5.decode("cosmos:hashed-" as ChainId)).toThrowError(
        /hashed chain IDs cannot be decoded/i,
      );
      expect(() => Caip5.decode("cosmos:hashed-abab" as ChainId)).toThrowError(
        /hashed chain IDs cannot be decoded/i,
      );
      expect(() => Caip5.decode("cosmos:hashed-6abb36860ec76c5a" as ChainId)).toThrowError(
        /hashed chain IDs cannot be decoded/i,
      );
    });
  });
});

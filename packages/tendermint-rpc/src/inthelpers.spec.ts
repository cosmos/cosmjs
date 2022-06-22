import { apiToBigInt } from "./inthelpers";

describe("inthelpers", () => {
  describe("apiToBigInt", () => {
    it("works for positive an negative ints", () => {
      expect(apiToBigInt("0")).toEqual(BigInt(0));
      expect(apiToBigInt("1")).toEqual(BigInt(1));
      expect(apiToBigInt("100")).toEqual(BigInt(100));
      expect(apiToBigInt("-1")).toEqual(BigInt(-1));
      expect(apiToBigInt("-100")).toEqual(BigInt(-100));
      expect(apiToBigInt("9007199254740991")).toEqual(BigInt(9007199254740991));
      expect(apiToBigInt("-9007199254740991")).toEqual(BigInt(-9007199254740991));
      // uint64 max
      expect(apiToBigInt("18446744073709551615")).toEqual(BigInt("18446744073709551615"));
      // int64 min/max
      expect(apiToBigInt("-9223372036854775808")).toEqual(BigInt("-9223372036854775808"));
      expect(apiToBigInt("9223372036854775807")).toEqual(BigInt("9223372036854775807"));
    });

    it("throws for ill-formatted inputs", () => {
      // empty
      expect(() => apiToBigInt("")).toThrowError(/invalid string format/i);
      expect(() => apiToBigInt("-")).toThrowError(/invalid string format/i);

      // non decimal representation
      expect(() => apiToBigInt("0x0")).toThrowError(/invalid string format/i);
      expect(() => apiToBigInt("0x01")).toThrowError(/invalid string format/i);
      expect(() => apiToBigInt("0x")).toThrowError(/invalid string format/i);

      // decimal points
      expect(() => apiToBigInt("1.0")).toThrowError(/invalid string format/i);

      // Invalid dashes
      expect(() => apiToBigInt("1-")).toThrowError(/invalid string format/i);
      expect(() => apiToBigInt("--1")).toThrowError(/invalid string format/i);
      expect(() => apiToBigInt("1-1")).toThrowError(/invalid string format/i);
      expect(() => apiToBigInt("-1-1")).toThrowError(/invalid string format/i);
    });
  });
});

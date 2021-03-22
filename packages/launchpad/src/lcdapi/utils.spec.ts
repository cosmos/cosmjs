import { Pubkey } from "@cosmjs/amino";

import { normalizePubkey, uint64ToNumber, uint64ToString } from "./utils";

describe("utils", () => {
  describe("uint64ToNumber", () => {
    it("works for numeric inputs", () => {
      expect(uint64ToNumber(0)).toEqual(0);
      expect(uint64ToNumber(1)).toEqual(1);
      expect(uint64ToNumber(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER);
    });

    it("works for string inputs", () => {
      expect(uint64ToNumber("0")).toEqual(0);
      expect(uint64ToNumber("1")).toEqual(1);
      expect(uint64ToNumber("9007199254740991")).toEqual(Number.MAX_SAFE_INTEGER);
    });

    it("throws for invalid numbers", () => {
      expect(() => uint64ToNumber(NaN)).toThrow();
      expect(() => uint64ToNumber(1.1)).toThrow();
      expect(() => uint64ToNumber(-1)).toThrow();
      expect(() => uint64ToNumber(Number.MAX_SAFE_INTEGER + 1)).toThrow();
    });

    it("throws for invalid strings", () => {
      expect(() => uint64ToNumber("")).toThrow();
      expect(() => uint64ToNumber("0x22")).toThrow();
      expect(() => uint64ToNumber("-1")).toThrow();
      expect(() => uint64ToNumber("1.1")).toThrow();
      expect(() => uint64ToNumber("9007199254740992")).toThrow();
    });
  });

  describe("uint64ToString", () => {
    it("works for numeric inputs", () => {
      expect(uint64ToString(0)).toEqual("0");
      expect(uint64ToString(1)).toEqual("1");
      expect(uint64ToString(Number.MAX_SAFE_INTEGER)).toEqual("9007199254740991");
    });

    it("works for string inputs", () => {
      expect(uint64ToString("0")).toEqual("0");
      expect(uint64ToString("1")).toEqual("1");
      expect(uint64ToString("9007199254740991")).toEqual("9007199254740991");
    });

    it("works for large string values", () => {
      // for the string -> string version, the full uint64 range is supported
      expect(uint64ToString("9007199254740992")).toEqual("9007199254740992");
      expect(uint64ToString("18446744073709551615")).toEqual("18446744073709551615");
    });

    it("throws for invalid numbers", () => {
      expect(() => uint64ToString(NaN)).toThrow();
      expect(() => uint64ToString(1.1)).toThrow();
      expect(() => uint64ToString(-1)).toThrow();
      expect(() => uint64ToString(Number.MAX_SAFE_INTEGER + 1)).toThrow();
    });

    it("throws for invalid strings", () => {
      expect(() => uint64ToString("")).toThrow();
      expect(() => uint64ToString("0x22")).toThrow();
      expect(() => uint64ToString("-1")).toThrow();
      expect(() => uint64ToString("1.1")).toThrow();
      expect(() => uint64ToString("18446744073709551616")).toThrow();
    });
  });

  describe("normalizePubkey", () => {
    it("interprets empty bech32 string as unset", () => {
      expect(normalizePubkey("")).toBeNull();
    });

    it("decodes bech32 pubkey", () => {
      const input = "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5";
      expect(normalizePubkey(input)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      });
    });

    it("interprets null as unset", () => {
      expect(normalizePubkey(null)).toBeNull();
    });

    it("passes PubKey unchanged", () => {
      const original: Pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      };
      expect(normalizePubkey(original)).toEqual(original);
    });
  });
});

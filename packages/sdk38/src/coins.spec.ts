import { coin, coins } from "./coins";

describe("coins", () => {
  describe("coin", () => {
    it("works for basic values", () => {
      expect(coin(123, "utoken")).toEqual({ amount: "123", denom: "utoken" });
      expect(coin(123.0, "utoken")).toEqual({ amount: "123", denom: "utoken" });
      expect(coin(Number.MAX_SAFE_INTEGER, "utoken")).toEqual({
        amount: "9007199254740991",
        denom: "utoken",
      });
      expect(coin(+0, "utoken")).toEqual({ amount: "0", denom: "utoken" });
      expect(coin(-0, "utoken")).toEqual({ amount: "0", denom: "utoken" });
    });

    it("throws for non-safe-integer values", () => {
      expect(() => coin(1.23, "utoken")).toThrow();
      expect(() => coin(NaN, "utoken")).toThrow();
      expect(() => coin(Number.POSITIVE_INFINITY, "utoken")).toThrow();
      expect(() => coin(Number.MAX_SAFE_INTEGER + 1, "utoken")).toThrow();
    });

    it("throws for negative values", () => {
      expect(() => coin(-1, "utoken")).toThrow();
      expect(() => coin(Number.MIN_SAFE_INTEGER, "utoken")).toThrow();
      expect(() => coin(Number.NEGATIVE_INFINITY, "utoken")).toThrow();
    });
  });

  describe("coins", () => {
    it("returns one element array of coin", () => {
      expect(coins(123, "utoken")).toEqual([{ amount: "123", denom: "utoken" }]);
    });
  });
});

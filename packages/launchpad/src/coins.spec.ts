import { coin, coins, parseCoins } from "./coins";

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

  describe("parseCoins", () => {
    it("works for empty", () => {
      expect(parseCoins("")).toEqual([]);
    });

    it("works for one element", () => {
      expect(parseCoins("7643ureef")).toEqual([
        {
          amount: "7643",
          denom: "ureef",
        },
      ]);
    });

    it("works for two", () => {
      expect(parseCoins("819966000ucosm,700000000ustake")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
    });

    it("ignores empty elements", () => {
      // start
      expect(parseCoins(",819966000ucosm,700000000ustake")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
      // middle
      expect(parseCoins("819966000ucosm,,700000000ustake")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
      // end
      expect(parseCoins("819966000ucosm,700000000ustake,")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
    });

    it("throws for invalid inputs", () => {
      // denom missing
      expect(() => parseCoins("3456")).toThrowError(/invalid coin string/i);

      // amount missing
      expect(() => parseCoins("ucosm")).toThrowError(/invalid coin string/i);
    });
  });
});

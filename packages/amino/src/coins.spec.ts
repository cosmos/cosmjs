import { addCoins, coin, coins, parseCoins } from "./coins";

describe("coins", () => {
  describe("coin", () => {
    it("works for number amounts", () => {
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
      expect(() => coin(1.23, "utoken")).toThrowError(/Given amount is not a safe integer/i);
      expect(() => coin(NaN, "utoken")).toThrowError(/Given amount is not a safe integer/i);
      expect(() => coin(Number.POSITIVE_INFINITY, "utoken")).toThrowError(
        /Given amount is not a safe integer/i,
      );
      expect(() => coin(Number.MAX_SAFE_INTEGER + 1, "utoken")).toThrowError(
        /Given amount is not a safe integer/i,
      );
    });

    it("throws for negative values", () => {
      expect(() => coin(-1, "utoken")).toThrowError(/Given amount is not a safe integer/i);
      expect(() => coin(Number.MIN_SAFE_INTEGER, "utoken")).toThrowError(
        /Given amount is not a safe integer/i,
      );
      expect(() => coin(Number.NEGATIVE_INFINITY, "utoken")).toThrowError(
        /Given amount is not a safe integer/i,
      );
    });

    it("works for string amounts", () => {
      expect(coin("0", "utoken")).toEqual({ amount: "0", denom: "utoken" });
      expect(coin("1", "utoken")).toEqual({ amount: "1", denom: "utoken" });
      expect(coin("00123", "utoken")).toEqual({ amount: "123", denom: "utoken" });
      expect(coin("12300", "utoken")).toEqual({ amount: "12300", denom: "utoken" });
      expect(coin("9007199254740992", "utoken")).toEqual({ amount: "9007199254740992", denom: "utoken" });
      // ETH supply (~118 mio ETH)
      expect(coin("118273505060000000000000000", "wei")).toEqual({
        amount: "118273505060000000000000000",
        denom: "wei",
      });
    });

    it("throws for invalid amount strings", () => {
      expect(() => coin("-1", "utoken")).toThrowError(/Invalid unsigned integer string format/i);
      expect(() => coin("0x01", "utoken")).toThrowError(/Invalid unsigned integer string format/i);
      expect(() => coin("NaN", "utoken")).toThrowError(/Invalid unsigned integer string format/i);
      expect(() => coin("1.0", "utoken")).toThrowError(/Invalid unsigned integer string format/i);
      expect(() => coin("1 ", "utoken")).toThrowError(/Invalid unsigned integer string format/i);
      expect(() => coin(" 1", "utoken")).toThrowError(/Invalid unsigned integer string format/i);
      expect(() => coin("1.1827350506e+26", "utoken")).toThrowError(
        /Invalid unsigned integer string format/i,
      );
    });
  });

  describe("coins", () => {
    it("returns one element array of coin", () => {
      expect(coins(123, "utoken")).toEqual([{ amount: "123", denom: "utoken" }]);
      expect(coins("123", "utoken")).toEqual([{ amount: "123", denom: "utoken" }]);
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

    it("works for various denoms", () => {
      // very short (3)
      expect(parseCoins("7643bar")).toEqual([
        {
          amount: "7643",
          denom: "bar",
        },
      ]);

      // very long (128)
      expect(
        parseCoins(
          "7643abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh",
        ),
      ).toEqual([
        {
          amount: "7643",
          denom:
            "abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh",
        },
      ]);

      // IBC denom (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/types/coin_test.go#L512-L519)
      expect(parseCoins("7643ibc/7F1D3FCF4AE79E1554D670D1AD949A9BA4E4A3C76C63093E17E446A46061A7A2")).toEqual([
        {
          amount: "7643",
          denom: "ibc/7F1D3FCF4AE79E1554D670D1AD949A9BA4E4A3C76C63093E17E446A46061A7A2",
        },
      ]);

      // Token factory denom (https://docs.osmosis.zone/osmosis-core/modules/tokenfactory/)
      expect(parseCoins("100000000000factory/osmo1c584m4lq25h83yp6ag8hh4htjr92d954vklzja/ufoo")).toEqual([
        {
          amount: "100000000000",
          denom: "factory/osmo1c584m4lq25h83yp6ag8hh4htjr92d954vklzja/ufoo",
        },
      ]);
    });

    it("trims leading zeros", () => {
      expect(parseCoins("07643ureef")).toEqual([
        {
          amount: "7643",
          denom: "ureef",
        },
      ]);
      expect(parseCoins("007643ureef")).toEqual([
        {
          amount: "7643",
          denom: "ureef",
        },
      ]);
      expect(parseCoins("0ureef")).toEqual([
        {
          amount: "0",
          denom: "ureef",
        },
      ]);
      expect(parseCoins("0000ureef")).toEqual([
        {
          amount: "0",
          denom: "ureef",
        },
      ]);
    });

    it("works for large numbers", () => {
      expect(parseCoins(`${Number.MAX_SAFE_INTEGER}ureef`)).toEqual([
        {
          amount: "9007199254740991",
          denom: "ureef",
        },
      ]);
      // 2**64-1
      expect(parseCoins("18446744073709551615ureef")).toEqual([
        {
          amount: "18446744073709551615",
          denom: "ureef",
        },
      ]);
      // 2**128-1
      expect(parseCoins("340282366920938463463374607431768211455ureef")).toEqual([
        {
          amount: "340282366920938463463374607431768211455",
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

      // denom starting with slash
      expect(() => parseCoins("3456/ibc")).toThrowError(/invalid coin string/i);

      // denom too short
      expect(() => parseCoins("3456a")).toThrowError(/invalid coin string/i);
      expect(() => parseCoins("3456aa")).toThrowError(/invalid coin string/i);

      // denom too long
      expect(() =>
        parseCoins(
          "3456abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgha",
        ),
      ).toThrowError(/invalid coin string/i);
    });
  });

  describe("addCoins", () => {
    it("works with same denom", () => {
      const balance1 = {
        amount: "10000",
        denom: "utest",
      };

      const balance2 = {
        amount: "20000",
        denom: "utest",
      };

      const expectedBalance = {
        amount: "30000",
        denom: "utest",
      };
      expect(addCoins(balance1, balance2)).toEqual(expectedBalance);
    });

    it("works with different denoms", () => {
      const balance1 = {
        amount: "10000",
        denom: "utest",
      };

      const balance2 = {
        amount: "20000",
        denom: "ucosm",
      };
      expect(() => addCoins(balance1, balance2)).toThrowError(
        /Trying to add two coins with different denoms/i,
      );
    });
  });
});

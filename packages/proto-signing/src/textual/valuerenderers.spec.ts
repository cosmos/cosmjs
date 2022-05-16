import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import coinData from "../testdata/coin.json";
import decimals from "../testdata/decimals.json";
import integers from "../testdata/integers.json";
import { DisplayUnit, formatCoin, formatCoins, formatDecimal, formatInteger } from "./valuerenderers";

type TestDataCoin = Array<[Coin, DisplayUnit, string]>;

describe("valuerenderers", () => {
  describe("formatInteger", () => {
    it("works", () => {
      expect(formatInteger("1")).toEqual("1");
      expect(formatInteger("12")).toEqual("12");
      expect(formatInteger("123")).toEqual("123");
      expect(formatInteger("1234")).toEqual("1'234");
      expect(formatInteger("12345")).toEqual("12'345");
      expect(formatInteger("123456")).toEqual("123'456");
      expect(formatInteger("1234567")).toEqual("1'234'567");

      for (const [input, expected] of integers) {
        expect(formatInteger(input)).withContext(`Input '${input}'`).toEqual(expected);
      }
    });
  });

  describe("formatDecimal", () => {
    it("works", () => {
      expect(formatDecimal("1234.5678")).toEqual("1'234.5678");

      for (const [input, expected] of decimals) {
        expect(formatDecimal(input)).withContext(`Input '${input}'`).toEqual(expected);
      }
    });
  });

  describe("formatCoin", () => {
    it("works", () => {
      expect(formatCoin({ amount: "1", denom: "ucosm" }, { denom: "COSM", exponent: 6 })).toEqual(
        "0.000001 COSM",
      );

      for (const [coin, unit, expected] of coinData as TestDataCoin) {
        expect(formatCoin(coin, unit))
          .withContext(`Input '${JSON.stringify(coin)}'`)
          .toEqual(expected);
      }
    });
  });

  describe("formatCoins", () => {
    it("works", () => {
      const coin1 = { amount: "1", denom: "ucosm" };
      const coin2 = { amount: "3", denom: "ustake" };
      const displayMap: Record<string, DisplayUnit> = {
        ucosm: { denom: "COSM", exponent: 6 },
        ustake: { denom: "STAKE", exponent: 6 },
      };
      expect(formatCoins([coin1, coin2], displayMap)).toEqual("0.000001 COSM, 0.000003 STAKE");
    });
  });
});

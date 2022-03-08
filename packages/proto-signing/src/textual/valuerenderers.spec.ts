import { DenomUnit } from "cosmjs-types/cosmos/bank/v1beta1/bank";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import coins from "../testdata/coins.json";
import decimals from "../testdata/decimals.json";
import integers from "../testdata/integers.json";
import { formatCoin, formatDecimal, formatInteger } from "./valuerenderers";

type TestDataCoins = Array<[Coin, Pick<DenomUnit, "denom" | "exponent">, string]>;

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

      for (const [coin, unit, expected] of coins as TestDataCoins) {
        expect(formatCoin(coin, unit))
          .withContext(`Input '${JSON.stringify(coin)}'`)
          .toEqual(expected);
      }
    });
  });
});

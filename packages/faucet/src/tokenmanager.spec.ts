import { TokenConfiguration } from "@cosmwasm/bcp";
import { TokenTicker } from "@iov/bcp";

import { TokenManager } from "./tokenmanager";

const dummyConfig: TokenConfiguration = {
  bankTokens: [
    {
      ticker: "TOKENZ",
      name: "The tokenz",
      fractionalDigits: 6,
      denom: "utokenz",
    },
    {
      ticker: "TRASH",
      name: "Trash token",
      fractionalDigits: 3,
      denom: "mtrash",
    },
  ],
};

describe("TokenManager", () => {
  describe("constructor", () => {
    it("can be constructed", () => {
      const tm = new TokenManager(dummyConfig);
      expect(tm).toBeTruthy();
    });
  });

  describe("creditAmount", () => {
    const tm = new TokenManager(dummyConfig);

    it("returns 10 tokens by default", () => {
      expect(tm.creditAmount("TOKENZ" as TokenTicker)).toEqual({
        quantity: "10000000",
        fractionalDigits: 6,
        tokenTicker: "TOKENZ",
      });
      expect(tm.creditAmount("TRASH" as TokenTicker)).toEqual({
        quantity: "10000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns value from env variable when set", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.creditAmount("TRASH" as TokenTicker)).toEqual({
        quantity: "22000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "";
    });

    it("returns default when env variable is set to empty", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "";
      expect(tm.creditAmount("TRASH" as TokenTicker)).toEqual({
        quantity: "10000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "";
    });
  });

  describe("refillAmount", () => {
    const tm = new TokenManager(dummyConfig);

    beforeEach(() => {
      process.env.FAUCET_REFILL_FACTOR = "";
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "";
    });

    it("returns 20*10 + '000' by default", () => {
      expect(tm.refillAmount("TRASH" as TokenTicker)).toEqual({
        quantity: "200000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns 20*22 + '000' when credit amount is 22", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillAmount("TRASH" as TokenTicker)).toEqual({
        quantity: "440000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns 30*10 + '000' when refill factor is 30", () => {
      process.env.FAUCET_REFILL_FACTOR = "30";
      expect(tm.refillAmount("TRASH" as TokenTicker)).toEqual({
        quantity: "300000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns 30*22 + '000' when refill factor is 30 and credit amount is 22", () => {
      process.env.FAUCET_REFILL_FACTOR = "30";
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillAmount("TRASH" as TokenTicker)).toEqual({
        quantity: "660000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });
  });

  describe("refillThreshold", () => {
    const tm = new TokenManager(dummyConfig);

    beforeEach(() => {
      process.env.FAUCET_REFILL_THRESHOLD = "";
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "";
    });

    it("returns 8*10 + '000' by default", () => {
      expect(tm.refillThreshold("TRASH" as TokenTicker)).toEqual({
        quantity: "80000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns 8*22 + '000' when credit amount is 22", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillThreshold("TRASH" as TokenTicker)).toEqual({
        quantity: "176000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns 5*10 + '000' when refill threshold is 5", () => {
      process.env.FAUCET_REFILL_THRESHOLD = "5";
      expect(tm.refillThreshold("TRASH" as TokenTicker)).toEqual({
        quantity: "50000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns 5*22 + '000' when refill threshold is 5 and credit amount is 22", () => {
      process.env.FAUCET_REFILL_THRESHOLD = "5";
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillThreshold("TRASH" as TokenTicker)).toEqual({
        quantity: "110000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });
  });
});

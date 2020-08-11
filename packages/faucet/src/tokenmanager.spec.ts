import { TokenConfiguration, TokenManager } from "./tokenmanager";
import { MinimalAccount } from "./types";

const dummyConfig: TokenConfiguration = {
  bankTokens: [
    {
      tickerSymbol: "TOKENZ",
      fractionalDigits: 6,
      denom: "utokenz",
    },
    {
      tickerSymbol: "TRASH",
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
      expect(tm.creditAmount("TOKENZ")).toEqual({
        amount: "10000000",
        denom: "utokenz",
      });
      expect(tm.creditAmount("TRASH")).toEqual({
        amount: "10000",
        denom: "mtrash",
      });
    });

    it("returns value from env variable when set", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.creditAmount("TRASH")).toEqual({
        amount: "22000",
        denom: "mtrash",
      });
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "";
    });

    it("returns default when env variable is set to empty", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "";
      expect(tm.creditAmount("TRASH")).toEqual({
        amount: "10000",
        denom: "mtrash",
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
      expect(tm.refillAmount("TRASH")).toEqual({
        amount: "200000",
        denom: "mtrash",
      });
    });

    it("returns 20*22 + '000' when credit amount is 22", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillAmount("TRASH")).toEqual({
        amount: "440000",
        denom: "mtrash",
      });
    });

    it("returns 30*10 + '000' when refill factor is 30", () => {
      process.env.FAUCET_REFILL_FACTOR = "30";
      expect(tm.refillAmount("TRASH")).toEqual({
        amount: "300000",
        denom: "mtrash",
      });
    });

    it("returns 30*22 + '000' when refill factor is 30 and credit amount is 22", () => {
      process.env.FAUCET_REFILL_FACTOR = "30";
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillAmount("TRASH")).toEqual({
        amount: "660000",
        denom: "mtrash",
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
      expect(tm.refillThreshold("TRASH")).toEqual({
        amount: "80000",
        denom: "mtrash",
      });
    });

    it("returns 8*22 + '000' when credit amount is 22", () => {
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillThreshold("TRASH")).toEqual({
        amount: "176000",
        denom: "mtrash",
      });
    });

    it("returns 5*10 + '000' when refill threshold is 5", () => {
      process.env.FAUCET_REFILL_THRESHOLD = "5";
      expect(tm.refillThreshold("TRASH")).toEqual({
        amount: "50000",
        denom: "mtrash",
      });
    });

    it("returns 5*22 + '000' when refill threshold is 5 and credit amount is 22", () => {
      process.env.FAUCET_REFILL_THRESHOLD = "5";
      process.env.FAUCET_CREDIT_AMOUNT_TRASH = "22";
      expect(tm.refillThreshold("TRASH")).toEqual({
        amount: "110000",
        denom: "mtrash",
      });
    });
  });

  describe("needsRefill", () => {
    const tm = new TokenManager(dummyConfig);

    it("works for sufficient/insufficient balance", () => {
      const brokeAccount: MinimalAccount = {
        address: "cosmos1rtfrpqt3yd7c8g73m9rsaen7fft0h52m3v9v5a",
        balance: [
          {
            denom: "utokenz",
            amount: "3",
          },
        ],
      };
      const richAccount: MinimalAccount = {
        address: "cosmos1rtfrpqt3yd7c8g73m9rsaen7fft0h52m3v9v5a",
        balance: [
          {
            denom: "utokenz",
            amount: "3456789000000", // 3456789 TOKENZ
          },
        ],
      };
      expect(tm.needsRefill(brokeAccount, "TOKENZ")).toEqual(true);
      expect(tm.needsRefill(richAccount, "TOKENZ")).toEqual(false);
    });

    it("works for missing balance", () => {
      const emptyAccount: MinimalAccount = {
        address: "cosmos1rtfrpqt3yd7c8g73m9rsaen7fft0h52m3v9v5a",
        balance: [],
      };
      expect(tm.needsRefill(emptyAccount, "TOKENZ")).toEqual(true);
    });
  });
});

import { TokenTicker } from "@iov/bcp";
import { expect } from "chai";

import {
  creditAmount,
  gasLimit,
  gasPrice,
  refillAmount,
  refillThreshold,
  setFractionalDigits,
} from "./cashflow";
import { Codec } from "./codec";

describe("Cashflow", () => {
  before(() => {
    setFractionalDigits(3);
  });

  describe("creditAmount", () => {
    it("returns '10' + '000' by default", () => {
      expect(creditAmount("TOKENZ" as TokenTicker)).to.eql({
        quantity: "10000",
        fractionalDigits: 3,
        tokenTicker: "TOKENZ",
      });
      expect(creditAmount("TRASH" as TokenTicker)).to.eql({
        quantity: "10000",
        fractionalDigits: 3,
        tokenTicker: "TRASH",
      });
    });

    it("returns value from env variable + '000' when set", () => {
      process.env.FAUCET_CREDIT_AMOUNT_WTF = "22";
      expect(creditAmount("WTF" as TokenTicker)).to.eql({
        quantity: "22000",
        fractionalDigits: 3,
        tokenTicker: "WTF",
      });
    });

    it("returns default from env variable + '000' when set to empty", () => {
      process.env.FAUCET_CREDIT_AMOUNT_WTF = "";
      expect(creditAmount("WTF" as TokenTicker)).to.eql({
        quantity: "10000",
        fractionalDigits: 3,
        tokenTicker: "WTF",
      });
    });
  });

  describe("refillAmount", () => {
    beforeEach(() => {
      process.env.FAUCET_REFILL_FACTOR = "";
    });
    it("returns 20*10 + '000' by default", () => {
      expect(refillAmount("TOKENZ" as TokenTicker)).to.eql({
        quantity: "200000",
        fractionalDigits: 3,
        tokenTicker: "TOKENZ",
      });
    });

    it("returns 20*22 + '000' when credit amount is 22", () => {
      process.env.FAUCET_CREDIT_AMOUNT_WTF = "22";
      expect(refillAmount("WTF" as TokenTicker)).to.eql({
        quantity: "440000",
        fractionalDigits: 3,
        tokenTicker: "WTF",
      });
    });

    it("returns 30*10 + '000' when refill factor is 30", () => {
      process.env.FAUCET_REFILL_FACTOR = "30";
      expect(refillAmount("TOKENZ" as TokenTicker)).to.eql({
        quantity: "300000",
        fractionalDigits: 3,
        tokenTicker: "TOKENZ",
      });
    });

    it("returns 30*22 + '000' when refill factor is 30 and credit amount is 22", () => {
      process.env.FAUCET_REFILL_FACTOR = "30";
      process.env.FAUCET_CREDIT_AMOUNT_WTF = "22";
      expect(refillAmount("WTF" as TokenTicker)).to.eql({
        quantity: "660000",
        fractionalDigits: 3,
        tokenTicker: "WTF",
      });
    });
  });

  describe("refillThreshold", () => {
    beforeEach(() => {
      process.env.FAUCET_REFILL_THRESHOLD = "";
    });
    it("returns 8*10 + '000' by default", () => {
      expect(refillThreshold("TOKENZ" as TokenTicker)).to.eql({
        quantity: "80000",
        fractionalDigits: 3,
        tokenTicker: "TOKENZ",
      });
    });

    it("returns 8*22 + '000' when credit amount is 22", () => {
      process.env.FAUCET_CREDIT_AMOUNT_WTF = "22";
      expect(refillThreshold("WTF" as TokenTicker)).to.eql({
        quantity: "176000",
        fractionalDigits: 3,
        tokenTicker: "WTF",
      });
    });

    it("returns 5*10 + '000' when refill threshold is 5", () => {
      process.env.FAUCET_REFILL_THRESHOLD = "5";
      expect(refillThreshold("TOKENZ" as TokenTicker)).to.eql({
        quantity: "50000",
        fractionalDigits: 3,
        tokenTicker: "TOKENZ",
      });
    });

    it("returns 5*22 + '000' when refill threshold is 5 and credit amount is 22", () => {
      process.env.FAUCET_REFILL_THRESHOLD = "5";
      process.env.FAUCET_CREDIT_AMOUNT_WTF = "22";
      expect(refillThreshold("WTF" as TokenTicker)).to.eql({
        quantity: "110000",
        fractionalDigits: 3,
        tokenTicker: "WTF",
      });
    });
  });

  describe("gasPrice", () => {
    it("returns undefined for non-Ethereum codecs", () => {
      expect(gasPrice(Codec.Lisk)).to.be.undefined;
      expect(gasPrice(Codec.Bns)).to.be.undefined;
    });

    it("returns amount for Ethereum codec", () => {
      expect(gasPrice(Codec.Ethereum)).to.be.eql({
        quantity: "20000000000",
        fractionalDigits: 18,
        tokenTicker: "ETH",
      });
    });
  });

  describe("gasLimit", () => {
    it("returns undefined for non-Ethereum codecs", () => {
      expect(gasLimit(Codec.Lisk)).to.be.undefined;
      expect(gasLimit(Codec.Bns)).to.be.undefined;
    });

    it("returns amount for Ethereum codec", () => {
      expect(gasLimit(Codec.Ethereum)).to.be.eql({
        quantity: "2100000",
        fractionalDigits: 18,
        tokenTicker: "ETH",
      });
    });
  });
});

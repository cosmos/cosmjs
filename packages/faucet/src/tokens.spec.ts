import { parseBankToken, parseBankTokens } from "./tokens";

describe("tokens", () => {
  describe("parseBankToken", () => {
    it("works", () => {
      expect(parseBankToken("COSM=10^6ucosm")).toEqual({
        tickerSymbol: "COSM",
        fractionalDigits: 6,
        denom: "ucosm",
      });
    });

    it("allows using whitespace", () => {
      expect(parseBankToken("COSM = 10^6 ucosm")).toEqual({
        tickerSymbol: "COSM",
        fractionalDigits: 6,
        denom: "ucosm",
      });
    });
  });

  describe("parseBankTokens", () => {
    it("works for one", () => {
      expect(parseBankTokens("COSM=10^6ucosm")).toEqual([
        {
          tickerSymbol: "COSM",
          fractionalDigits: 6,
          denom: "ucosm",
        },
      ]);
    });

    it("works for two", () => {
      expect(parseBankTokens("COSM=10^6ucosm,STAKE=10^3mstake")).toEqual([
        {
          tickerSymbol: "COSM",
          fractionalDigits: 6,
          denom: "ucosm",
        },
        {
          tickerSymbol: "STAKE",
          fractionalDigits: 3,
          denom: "mstake",
        },
      ]);
    });

    it("ignores whitespace", () => {
      expect(parseBankTokens("COSM=10^6ucosm, STAKE=10^3mstake\n")).toEqual([
        {
          tickerSymbol: "COSM",
          fractionalDigits: 6,
          denom: "ucosm",
        },
        {
          tickerSymbol: "STAKE",
          fractionalDigits: 3,
          denom: "mstake",
        },
      ]);
    });

    it("ignores empty elements", () => {
      expect(parseBankTokens("COSM=10^6ucosm,STAKE=10^3mstake,")).toEqual([
        {
          tickerSymbol: "COSM",
          fractionalDigits: 6,
          denom: "ucosm",
        },
        {
          tickerSymbol: "STAKE",
          fractionalDigits: 3,
          denom: "mstake",
        },
      ]);
    });
  });
});

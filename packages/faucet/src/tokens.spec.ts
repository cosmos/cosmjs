import { parseBankToken, parseBankTokens } from "./tokens";

describe("tokens", () => {
  describe("parseBankToken", () => {
    it("works", () => {
      expect(parseBankToken("ucosm")).toEqual({
        denom: "ucosm",
      });
    });

    it("allows using whitespace", () => {
      expect(parseBankToken(" ucosm\n")).toEqual({
        denom: "ucosm",
      });
    });
  });

  describe("parseBankTokens", () => {
    it("works for one", () => {
      expect(parseBankTokens("ucosm")).toEqual([{ denom: "ucosm" }]);
    });

    it("works for two", () => {
      expect(parseBankTokens("ucosm,mstake")).toEqual([{ denom: "ucosm" }, { denom: "mstake" }]);
    });

    it("ignores whitespace", () => {
      expect(parseBankTokens("ucosm, mstake\n")).toEqual([{ denom: "ucosm" }, { denom: "mstake" }]);
    });

    it("ignores empty elements", () => {
      expect(parseBankTokens("ucosm,mstake,")).toEqual([{ denom: "ucosm" }, { denom: "mstake" }]);
    });
  });
});

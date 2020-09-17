import { parseBankToken, parseBankTokens } from "./tokens";

describe("tokens", () => {
  describe("parseBankToken", () => {
    it("works", () => {
      expect(parseBankToken("ucosm")).toEqual("ucosm");
    });

    it("allows using whitespace", () => {
      expect(parseBankToken(" ucosm\n")).toEqual("ucosm");
    });
  });

  describe("parseBankTokens", () => {
    it("works for one", () => {
      expect(parseBankTokens("ucosm")).toEqual(["ucosm"]);
    });

    it("works for two", () => {
      expect(parseBankTokens("ucosm,mstake")).toEqual(["ucosm", "mstake"]);
    });

    it("ignores whitespace", () => {
      expect(parseBankTokens("ucosm, mstake\n")).toEqual(["ucosm", "mstake"]);
    });

    it("ignores empty elements", () => {
      expect(parseBankTokens("ucosm,mstake,")).toEqual(["ucosm", "mstake"]);
    });
  });
});

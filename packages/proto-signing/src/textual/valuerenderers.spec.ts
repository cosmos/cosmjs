import { formatInteger } from "./valuerenderers";

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
    });
  });
});

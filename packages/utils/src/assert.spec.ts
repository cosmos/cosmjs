import { assertDefined } from "./assert";

describe("assert", () => {
  describe("assertDefined", () => {
    it("passes for simple values", () => {
      {
        const value: number | undefined = 123;
        assertDefined(value);
        expect(value).toEqual(123);
      }
      {
        const value: string | undefined = "abc";
        assertDefined(value);
        expect(value).toEqual("abc");
      }
    });

    it("passes for falsy values", () => {
      {
        const value: number | undefined = 0;
        assertDefined(value);
        expect(value).toEqual(0);
      }
      {
        const value: string | undefined = "";
        assertDefined(value);
        expect(value).toEqual("");
      }
      {
        const value: null | undefined = null;
        assertDefined(value);
        expect(value).toEqual(null);
      }
    });

    it("throws for undefined values", () => {
      {
        const value: number | undefined = undefined;
        expect(() => assertDefined(value)).toThrowError("value is undefined");
      }
      {
        let value: string | undefined;
        expect(() => assertDefined(value)).toThrowError("value is undefined");
      }
    });

    it("throws with custom message", () => {
      const value: number | undefined = undefined;
      expect(() => assertDefined(value, "Bug in the data source")).toThrowError("Bug in the data source");
    });
  });
});

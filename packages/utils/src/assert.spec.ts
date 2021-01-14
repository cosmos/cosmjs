import { assertDefined, assertDefinedAndNotNull } from "./assert";

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
        expect(value).toBeNull();
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

  describe("assertDefinedAndNotNull", () => {
    it("passes for simple values", () => {
      {
        const value: number | undefined | null = 123;
        assertDefinedAndNotNull(value);
        expect(value).toEqual(123);
      }
      {
        const value: string | undefined | null = "abc";
        assertDefinedAndNotNull(value);
        expect(value).toEqual("abc");
      }
    });

    it("passes for falsy values", () => {
      {
        const value: number | undefined | null = 0;
        assertDefinedAndNotNull(value);
        expect(value).toEqual(0);
      }
      {
        const value: string | undefined | null = "";
        assertDefinedAndNotNull(value);
        expect(value).toEqual("");
      }
    });

    it("throws for undefined values", () => {
      {
        const value: number | undefined | null = undefined;
        expect(() => assertDefinedAndNotNull(value)).toThrowError("value is undefined or null");
      }
      {
        let value: string | undefined | null;
        expect(() => assertDefinedAndNotNull(value)).toThrowError("value is undefined or null");
      }
    });

    it("throws for null values", () => {
      const value: number | undefined | null = null;
      expect(() => assertDefinedAndNotNull(value)).toThrowError("value is undefined or null");
    });

    it("throws with custom message", () => {
      const value: number | undefined = undefined;
      expect(() => assertDefinedAndNotNull(value, "Bug in the data source")).toThrowError(
        "Bug in the data source",
      );
    });
  });
});

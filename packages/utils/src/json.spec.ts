import { isJsonArray, isJsonObject, isJsonValue } from "./json";

describe("json", () => {
  function sum(a: number, b: number): number {
    return a + b;
  }

  describe("isJsonValue", () => {
    it("returns true for primitive types", () => {
      expect(isJsonValue(null)).toEqual(true);
      expect(isJsonValue(0)).toEqual(true);
      expect(isJsonValue(1)).toEqual(true);
      expect(isJsonValue("abc")).toEqual(true);
      expect(isJsonValue(true)).toEqual(true);
      expect(isJsonValue(false)).toEqual(true);
    });

    it("returns true for arrays", () => {
      expect(isJsonValue([1, 2, 3])).toEqual(true);
      expect(isJsonValue([1, "2", true, null])).toEqual(true);
      expect(isJsonValue([1, "2", true, null, [1, "2", true, null]])).toEqual(true);
      expect(isJsonValue([{ a: 123 }])).toEqual(true);
    });

    it("returns true for simple dicts", () => {
      expect(isJsonValue({ a: 123 })).toEqual(true);
      expect(isJsonValue({ a: "abc" })).toEqual(true);
      expect(isJsonValue({ a: true })).toEqual(true);
      expect(isJsonValue({ a: null })).toEqual(true);
    });

    it("returns true for dict with array", () => {
      expect(isJsonValue({ a: [1, 2, 3] })).toEqual(true);
      expect(isJsonValue({ a: [1, "2", true, null] })).toEqual(true);
    });

    it("returns true for nested dicts", () => {
      expect(isJsonValue({ a: { b: 123 } })).toEqual(true);
    });

    it("returns false for functions", () => {
      expect(isJsonValue(sum)).toEqual(false);
    });

    it("returns true for empty dicts", () => {
      expect(isJsonValue({})).toEqual(true);
    });
  });

  describe("isJsonArray", () => {
    it("returns false for primitive types", () => {
      expect(isJsonArray(null)).toEqual(false);
      expect(isJsonArray(undefined)).toEqual(false);
      expect(isJsonArray(0)).toEqual(false);
      expect(isJsonArray(1)).toEqual(false);
      expect(isJsonArray("abc")).toEqual(false);
      expect(isJsonArray(true)).toEqual(false);
      expect(isJsonArray(false)).toEqual(false);
    });

    it("returns true for arrays", () => {
      expect(isJsonArray([1, 2, 3])).toEqual(true);
      expect(isJsonArray([1, "2", true, null])).toEqual(true);
      expect(isJsonArray([1, "2", true, null, [1, "2", true, null]])).toEqual(true);
      expect(isJsonArray([{ a: 123 }])).toEqual(true);
    });

    it("returns false for dicts", () => {
      expect(isJsonArray({ a: 123 })).toEqual(false);
      expect(isJsonArray({ a: "abc" })).toEqual(false);
      expect(isJsonArray({ a: true })).toEqual(false);
      expect(isJsonArray({ a: null })).toEqual(false);
    });

    it("returns false for functions", () => {
      expect(isJsonArray(sum)).toEqual(false);
    });
  });

  describe("isJsonObject", () => {
    it("returns false for primitive types", () => {
      expect(isJsonObject(null)).toEqual(false);
      expect(isJsonObject(undefined)).toEqual(false);
      expect(isJsonObject(0)).toEqual(false);
      expect(isJsonObject(1)).toEqual(false);
      expect(isJsonObject("abc")).toEqual(false);
      expect(isJsonObject(true)).toEqual(false);
      expect(isJsonObject(false)).toEqual(false);
    });

    it("returns false for other objects", () => {
      expect(isJsonObject(new Uint8Array([0x00]))).toEqual(false);
      expect(isJsonObject(/123/)).toEqual(false);
      expect(isJsonObject(new Date())).toEqual(false);
    });

    it("returns false for arrays", () => {
      expect(isJsonObject([1, 2, 3])).toEqual(false);
    });

    it("returns false for functions", () => {
      expect(isJsonObject(sum)).toEqual(false);
    });

    it("returns true for empty dicts", () => {
      expect(isJsonObject({})).toEqual(true);
    });

    it("returns true for simple dicts", () => {
      expect(isJsonObject({ a: 123 })).toEqual(true);
      expect(isJsonObject({ a: "abc" })).toEqual(true);
      expect(isJsonObject({ a: true })).toEqual(true);
      expect(isJsonObject({ a: null })).toEqual(true);
    });

    it("returns true for dict with array", () => {
      expect(isJsonObject({ a: [1, 2, 3] })).toEqual(true);
      expect(isJsonObject({ a: [1, "2", true, null] })).toEqual(true);
    });

    it("returns true for nested dicts", () => {
      expect(isJsonObject({ a: { b: 123 } })).toEqual(true);
    });
  });
});

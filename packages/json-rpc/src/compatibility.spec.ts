import { isJsonCompatibleArray, isJsonCompatibleDictionary, isJsonCompatibleValue } from "./compatibility";

describe("json", () => {
  function sum(a: number, b: number): number {
    return a + b;
  }

  describe("isJsonCompatibleValue", () => {
    it("returns true for primitive types", () => {
      expect(isJsonCompatibleValue(null)).toEqual(true);
      expect(isJsonCompatibleValue(0)).toEqual(true);
      expect(isJsonCompatibleValue(1)).toEqual(true);
      expect(isJsonCompatibleValue("abc")).toEqual(true);
      expect(isJsonCompatibleValue(true)).toEqual(true);
      expect(isJsonCompatibleValue(false)).toEqual(true);
    });

    it("returns true for arrays", () => {
      expect(isJsonCompatibleValue([1, 2, 3])).toEqual(true);
      expect(isJsonCompatibleValue([1, "2", true, null])).toEqual(true);
      expect(isJsonCompatibleValue([1, "2", true, null, [1, "2", true, null]])).toEqual(true);
      expect(isJsonCompatibleValue([{ a: 123 }])).toEqual(true);
    });

    it("returns true for simple dicts", () => {
      expect(isJsonCompatibleValue({ a: 123 })).toEqual(true);
      expect(isJsonCompatibleValue({ a: "abc" })).toEqual(true);
      expect(isJsonCompatibleValue({ a: true })).toEqual(true);
      expect(isJsonCompatibleValue({ a: null })).toEqual(true);
    });

    it("returns true for dict with array", () => {
      expect(isJsonCompatibleValue({ a: [1, 2, 3] })).toEqual(true);
      expect(isJsonCompatibleValue({ a: [1, "2", true, null] })).toEqual(true);
    });

    it("returns true for nested dicts", () => {
      expect(isJsonCompatibleValue({ a: { b: 123 } })).toEqual(true);
    });

    it("returns false for functions", () => {
      expect(isJsonCompatibleValue(sum)).toEqual(false);
    });

    it("returns true for empty dicts", () => {
      expect(isJsonCompatibleValue({})).toEqual(true);
    });
  });

  describe("isJsonCompatibleArray", () => {
    it("returns false for primitive types", () => {
      expect(isJsonCompatibleArray(null)).toEqual(false);
      expect(isJsonCompatibleArray(undefined)).toEqual(false);
      expect(isJsonCompatibleArray(0)).toEqual(false);
      expect(isJsonCompatibleArray(1)).toEqual(false);
      expect(isJsonCompatibleArray("abc")).toEqual(false);
      expect(isJsonCompatibleArray(true)).toEqual(false);
      expect(isJsonCompatibleArray(false)).toEqual(false);
    });

    it("returns true for arrays", () => {
      expect(isJsonCompatibleArray([1, 2, 3])).toEqual(true);
      expect(isJsonCompatibleArray([1, "2", true, null])).toEqual(true);
      expect(isJsonCompatibleArray([1, "2", true, null, [1, "2", true, null]])).toEqual(true);
      expect(isJsonCompatibleArray([{ a: 123 }])).toEqual(true);
    });

    it("returns false for dicts", () => {
      expect(isJsonCompatibleArray({ a: 123 })).toEqual(false);
      expect(isJsonCompatibleArray({ a: "abc" })).toEqual(false);
      expect(isJsonCompatibleArray({ a: true })).toEqual(false);
      expect(isJsonCompatibleArray({ a: null })).toEqual(false);
    });

    it("returns false for functions", () => {
      expect(isJsonCompatibleArray(sum)).toEqual(false);
    });
  });

  describe("isJsonCompatibleDictionary", () => {
    it("returns false for primitive types", () => {
      expect(isJsonCompatibleDictionary(null)).toEqual(false);
      expect(isJsonCompatibleDictionary(undefined)).toEqual(false);
      expect(isJsonCompatibleDictionary(0)).toEqual(false);
      expect(isJsonCompatibleDictionary(1)).toEqual(false);
      expect(isJsonCompatibleDictionary("abc")).toEqual(false);
      expect(isJsonCompatibleDictionary(true)).toEqual(false);
      expect(isJsonCompatibleDictionary(false)).toEqual(false);
    });

    it("returns false for other objects", () => {
      expect(isJsonCompatibleDictionary(new Uint8Array([0x00]))).toEqual(false);
      expect(isJsonCompatibleDictionary(/123/)).toEqual(false);
      expect(isJsonCompatibleDictionary(new Date())).toEqual(false);
    });

    it("returns false for arrays", () => {
      expect(isJsonCompatibleDictionary([1, 2, 3])).toEqual(false);
    });

    it("returns false for functions", () => {
      expect(isJsonCompatibleDictionary(sum)).toEqual(false);
    });

    it("returns true for empty dicts", () => {
      expect(isJsonCompatibleDictionary({})).toEqual(true);
    });

    it("returns true for simple dicts", () => {
      expect(isJsonCompatibleDictionary({ a: 123 })).toEqual(true);
      expect(isJsonCompatibleDictionary({ a: "abc" })).toEqual(true);
      expect(isJsonCompatibleDictionary({ a: true })).toEqual(true);
      expect(isJsonCompatibleDictionary({ a: null })).toEqual(true);
    });

    it("returns true for dict with array", () => {
      expect(isJsonCompatibleDictionary({ a: [1, 2, 3] })).toEqual(true);
      expect(isJsonCompatibleDictionary({ a: [1, "2", true, null] })).toEqual(true);
    });

    it("returns true for nested dicts", () => {
      expect(isJsonCompatibleDictionary({ a: { b: 123 } })).toEqual(true);
    });
  });
});

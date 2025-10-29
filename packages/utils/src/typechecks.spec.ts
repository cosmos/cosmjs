import { isDefined, isNonNullObject, isUint8Array } from "./typechecks";

describe("typechecks", () => {
  describe("isNonNullObject", () => {
    it("returns true for objects", () => {
      expect(isNonNullObject({})).toEqual(true);
      expect(isNonNullObject({ foo: 123 })).toEqual(true);
      expect(isNonNullObject(new Uint8Array([]))).toEqual(true);
    });

    it("returns true for arrays", () => {
      // > object is a type that represents the non-primitive type, i.e.
      // > anything that is not number, string, boolean, symbol, null, or undefined.
      // https://www.typescriptlang.org/docs/handbook/basic-types.html#object
      expect(isNonNullObject([])).toEqual(true);
    });

    it("returns false for null", () => {
      expect(isNonNullObject(null)).toEqual(false);
    });

    it("returns false for other kind of data", () => {
      expect(isNonNullObject(undefined)).toEqual(false);
      expect(isNonNullObject("abc")).toEqual(false);
      expect(isNonNullObject(123)).toEqual(false);
      expect(isNonNullObject(true)).toEqual(false);
    });
  });

  describe("isUint8Array", () => {
    it("returns true for Uint8Arrays", () => {
      expect(isUint8Array(new Uint8Array())).toEqual(true);
      expect(isUint8Array(new Uint8Array([1, 2, 3]))).toEqual(true);
    });

    (typeof Buffer !== "undefined" ? it : it.skip)("returns false for Buffer", () => {
      // One could start a big debate about whether or not a Buffer is a Uint8Array, which
      // required a definition of "is a" in a languages that has no proper object oriented
      // programming support.
      //
      // In all our software we use Uint8Array for storing binary data and copy Buffers into
      // new Uint8Array to make deep equality checks work and to ensure our code works the same
      // way in browsers and Node.js. So our expectation is: _a Buffer is not an Uint8Array_.
      expect(isUint8Array(Buffer.from(""))).toEqual(false);
    });

    it("returns false for other kind of data", () => {
      expect(isUint8Array(undefined)).toEqual(false);
      expect(isUint8Array("abc")).toEqual(false);
      expect(isUint8Array(123)).toEqual(false);
      expect(isUint8Array(true)).toEqual(false);

      expect(isUint8Array([])).toEqual(false);
      expect(isUint8Array(new Int8Array())).toEqual(false);
      expect(isUint8Array(new Uint16Array())).toEqual(false);
    });
  });

  describe("isDefined", () => {
    it("works", () => {
      expect(isDefined("a")).toEqual(true);
      expect(isDefined(1234)).toEqual(true);
      expect(isDefined(null)).toEqual(true);
      expect(isDefined(undefined)).toEqual(false);
    });

    it("narrows type of list", () => {
      const a = ["one", undefined, "two", "three", undefined];
      const b: string[] = a.filter(isDefined);
      expect(b).toEqual(["one", "two", "three"]);
    });
  });
});

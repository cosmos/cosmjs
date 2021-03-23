import { arrayContentEquals, arrayContentStartsWith } from "./arrays";

describe("array", () => {
  describe("arrayContentEquals", () => {
    it("can compare number arrays", () => {
      expect(arrayContentEquals([1, 2, 3], [1, 2, 3])).toEqual(true);
      expect(arrayContentEquals([1, 2, 3], [1, 2, 3, 4])).toEqual(false);
      expect(arrayContentEquals([1, 2, 3], [3, 2, 1])).toEqual(false);
    });

    it("can compare string arrays", () => {
      expect(arrayContentEquals(["a", "b"], ["a", "b"])).toEqual(true);
      expect(arrayContentEquals(["a", "b"], ["a", "b", "c"])).toEqual(false);
      expect(arrayContentEquals(["a", "b"], ["b", "a"])).toEqual(false);
    });

    it("can compare bool arrays", () => {
      expect(arrayContentEquals([true, false], [true, false])).toEqual(true);
      expect(arrayContentEquals([true, false], [true, false, true])).toEqual(false);
      expect(arrayContentEquals([true, false], [false, true])).toEqual(false);
    });

    it("can compare different array types", () => {
      expect(arrayContentEquals([1, 2, 3], new Uint8Array([1, 2, 3]))).toEqual(true);
      expect(arrayContentEquals([1, 2, 3], new Uint8Array([3, 2, 1]))).toEqual(false);
    });

    it("works for empty arrays", () => {
      expect(arrayContentEquals([], [])).toEqual(true);
      expect(arrayContentEquals([], new Uint8Array([]))).toEqual(true);
    });
  });

  describe("arrayContentStartsWith", () => {
    it("can compare number arrays", () => {
      // same length
      expect(arrayContentStartsWith([], [])).toEqual(true); // Same behaviour as "".startsWith("")
      expect(arrayContentStartsWith([1, 2, 3], [1, 2, 3])).toEqual(true);
      expect(arrayContentStartsWith([1, 2, 3], [1, 2, 8])).toEqual(false);
      expect(arrayContentStartsWith([1, 2, 3], [0, 0, 0])).toEqual(false);

      // a shorter than b
      expect(arrayContentStartsWith([], [1, 2, 3])).toEqual(false);
      expect(arrayContentStartsWith([1], [1, 2, 3])).toEqual(false);
      expect(arrayContentStartsWith([1, 2], [1, 2, 3])).toEqual(false);

      // a longer than b
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toEqual(true);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 2, 3, 4])).toEqual(true);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 2, 3])).toEqual(true);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 2])).toEqual(true);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1])).toEqual(true);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [])).toEqual(true);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 2, 3, 4, 0])).toEqual(false);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 2, 3, 0])).toEqual(false);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 2, 0])).toEqual(false);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [1, 0])).toEqual(false);
      expect(arrayContentStartsWith([1, 2, 3, 4, 5], [0])).toEqual(false);
    });
  });
});

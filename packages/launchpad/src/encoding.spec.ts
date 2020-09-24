import { sortJson } from "./encoding";

describe("encoding", () => {
  describe("sortJson", () => {
    it("leaves non-objects unchanged", () => {
      expect(sortJson(true)).toEqual(true);
      expect(sortJson(false)).toEqual(false);
      expect(sortJson("aabbccdd")).toEqual("aabbccdd");
      expect(sortJson(75)).toEqual(75);
      expect(sortJson(null)).toEqual(null);
      expect(sortJson([5, 6, 7, 1])).toEqual([5, 6, 7, 1]);
      expect(sortJson([5, ["a", "b"], true, null, 1])).toEqual([5, ["a", "b"], true, null, 1]);
    });

    it("sorts objects by key", () => {
      // already sorted
      expect(sortJson({})).toEqual({});
      expect(sortJson({ a: 3 })).toEqual({ a: 3 });
      expect(sortJson({ a: 3, b: 2, c: 1 })).toEqual({ a: 3, b: 2, c: 1 });

      // not yet sorted
      expect(sortJson({ b: 2, a: 3, c: 1 })).toEqual({ a: 3, b: 2, c: 1 });
      expect(sortJson({ aaa: true, aa: true, a: true })).toEqual({ a: true, aa: true, aaa: true });
    });

    it("sorts nested objects", () => {
      // already sorted
      expect(sortJson({ x: { y: { z: null } } })).toEqual({ x: { y: { z: null } } });

      // not yet sorted
      expect(sortJson({ b: { z: true, x: true, y: true }, a: true, c: true })).toEqual({
        a: true,
        b: { x: true, y: true, z: true },
        c: true,
      });
    });

    it("sorts objects in arrays", () => {
      // already sorted
      expect(sortJson([1, 2, { x: { y: { z: null } } }, 4])).toEqual([1, 2, { x: { y: { z: null } } }, 4]);

      // not yet sorted
      expect(sortJson([1, 2, { b: { z: true, x: true, y: true }, a: true, c: true }, 4])).toEqual([
        1,
        2,
        {
          a: true,
          b: { x: true, y: true, z: true },
          c: true,
        },
        4,
      ]);
    });
  });
});

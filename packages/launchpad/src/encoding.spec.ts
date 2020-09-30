import { sortedJsonStringify } from "./encoding";

describe("encoding", () => {
  describe("sortedJsonStringify", () => {
    it("leaves non-objects unchanged", () => {
      expect(sortedJsonStringify(true)).toEqual(`true`);
      expect(sortedJsonStringify(false)).toEqual(`false`);
      expect(sortedJsonStringify("aabbccdd")).toEqual(`"aabbccdd"`);
      expect(sortedJsonStringify(75)).toEqual(`75`);
      expect(sortedJsonStringify(null)).toEqual(`null`);
      expect(sortedJsonStringify([5, 6, 7, 1])).toEqual(`[5,6,7,1]`);
      expect(sortedJsonStringify([5, ["a", "b"], true, null, 1])).toEqual(`[5,["a","b"],true,null,1]`);
    });

    it("sorts objects by key", () => {
      // already sorted
      expect(sortedJsonStringify({})).toEqual(`{}`);
      expect(sortedJsonStringify({ a: 3 })).toEqual(`{"a":3}`);
      expect(sortedJsonStringify({ a: 3, b: 2, c: 1 })).toEqual(`{"a":3,"b":2,"c":1}`);

      // not yet sorted
      expect(sortedJsonStringify({ b: 2, a: 3, c: 1 })).toEqual(`{"a":3,"b":2,"c":1}`);
      expect(sortedJsonStringify({ aaa: true, aa: true, a: true })).toEqual(
        `{"a":true,"aa":true,"aaa":true}`,
      );
    });

    it("sorts nested objects", () => {
      // already sorted
      expect(sortedJsonStringify({ x: { y: { z: null } } })).toEqual(`{"x":{"y":{"z":null}}}`);

      // not yet sorted
      expect(sortedJsonStringify({ b: { z: true, x: true, y: true }, a: true, c: true })).toEqual(
        `{"a":true,"b":{"x":true,"y":true,"z":true},"c":true}`,
      );
    });

    it("sorts objects in arrays", () => {
      // already sorted
      expect(sortedJsonStringify([1, 2, { x: { y: { z: null } } }, 4])).toEqual(
        `[1,2,{"x":{"y":{"z":null}}},4]`,
      );

      // not yet sorted
      expect(sortedJsonStringify([1, 2, { b: { z: true, x: true, y: true }, a: true, c: true }, 4])).toEqual(
        `[1,2,{"a":true,"b":{"x":true,"y":true,"z":true},"c":true},4]`,
      );
    });
  });
});

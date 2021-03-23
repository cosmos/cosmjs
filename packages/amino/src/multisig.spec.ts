import { compareArrays, createMultisigThresholdPubkey } from "./multisig";
import { test1, test2, test3, testgroup1, testgroup2, testgroup3, testgroup4 } from "./testutils.spec";

describe("multisig", () => {
  describe("compareArrays", () => {
    it("return 0 for equal arrays", () => {
      expect(compareArrays(new Uint8Array([]), new Uint8Array([]))).toEqual(0);
      expect(compareArrays(new Uint8Array([1]), new Uint8Array([1]))).toEqual(0);
      expect(compareArrays(new Uint8Array([3, 2, 1]), new Uint8Array([3, 2, 1]))).toEqual(0);
    });

    it("return > 0 for left > right", () => {
      expect(compareArrays(new Uint8Array([5, 5, 5]), new Uint8Array([5, 5, 4]))).toBeGreaterThan(0);
      expect(compareArrays(new Uint8Array([5, 5, 5]), new Uint8Array([5, 4, 5]))).toBeGreaterThan(0);
      expect(compareArrays(new Uint8Array([5, 5, 5]), new Uint8Array([4, 5, 5]))).toBeGreaterThan(0);
      expect(compareArrays(new Uint8Array([5, 5, 5]), new Uint8Array([5, 5]))).toBeGreaterThan(0);
      expect(compareArrays(new Uint8Array([5, 5, 5]), new Uint8Array([5]))).toBeGreaterThan(0);
      expect(compareArrays(new Uint8Array([5, 5, 5]), new Uint8Array([]))).toBeGreaterThan(0);

      // left or right precedence
      expect(compareArrays(new Uint8Array([5, 5, 4]), new Uint8Array([4, 5, 5]))).toBeGreaterThan(0);

      // magnitude is more important than length
      expect(compareArrays(new Uint8Array([6]), new Uint8Array([5, 5]))).toBeGreaterThan(0);
    });

    it("return < 0 for left < right", () => {
      expect(compareArrays(new Uint8Array([5, 5, 4]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
      expect(compareArrays(new Uint8Array([5, 4, 5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
      expect(compareArrays(new Uint8Array([4, 5, 5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
      expect(compareArrays(new Uint8Array([5, 5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
      expect(compareArrays(new Uint8Array([5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
      expect(compareArrays(new Uint8Array([]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);

      // left or right precedence
      expect(compareArrays(new Uint8Array([4, 5, 5]), new Uint8Array([5, 5, 4]))).toBeLessThan(0);

      // magnitude is more important than length
      expect(compareArrays(new Uint8Array([5, 5]), new Uint8Array([6]))).toBeLessThan(0);
    });

    it("can be used with sort", () => {
      const values = [
        new Uint8Array([2]),
        new Uint8Array([1]),
        new Uint8Array([2, 5]),
        new Uint8Array([3]),
        new Uint8Array([]),
      ].sort(compareArrays);
      expect(values).toEqual([
        new Uint8Array([]),
        new Uint8Array([1]),
        new Uint8Array([2]),
        new Uint8Array([2, 5]),
        new Uint8Array([3]),
      ]);
    });
  });

  describe("MultisigThresholdPubkey", () => {
    it("works with sorting", () => {
      expect(createMultisigThresholdPubkey([test1, test2, test3], 2)).toEqual(testgroup1);
      expect(createMultisigThresholdPubkey([test1, test2, test3], 1)).toEqual(testgroup2);
      expect(createMultisigThresholdPubkey([test3, test1], 2)).toEqual(testgroup3);

      expect(createMultisigThresholdPubkey([test1, test2, test3], 2, false)).toEqual(testgroup1);
      expect(createMultisigThresholdPubkey([test1, test2, test3], 1, false)).toEqual(testgroup2);
      expect(createMultisigThresholdPubkey([test3, test1], 2, false)).toEqual(testgroup3);
    });

    it("works with nosort", () => {
      expect(createMultisigThresholdPubkey([test3, test1], 2, true)).toEqual(testgroup4);
    });

    it("throws for threshold larger than number of keys", () => {
      expect(() => createMultisigThresholdPubkey([test1, test2, test3], 4)).toThrowError(
        /threshold k = 4 exceeds number of keys n = 3/i,
      );
      expect(() => createMultisigThresholdPubkey([test1, test2, test3], 75)).toThrowError(
        /threshold k = 75 exceeds number of keys n = 3/i,
      );
    });
  });
});

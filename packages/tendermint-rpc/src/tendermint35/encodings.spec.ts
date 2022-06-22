import { ReadonlyDate } from "readonly-date";

import {
  encodeBlockId,
  encodeBytes,
  encodeString,
  encodeTime,
  encodeUvarint,
  encodeVersion,
} from "./encodings";

describe("encodings", () => {
  describe("encodeString", () => {
    it("works", () => {
      expect(encodeString("")).toEqual(Uint8Array.from([0]));
      const str = "hello iov";
      expect(encodeString(str)).toEqual(
        Uint8Array.from([str.length, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x69, 0x6f, 0x76]),
      );
    });
  });

  describe("encodeUvarint", () => {
    it("works", () => {
      expect(encodeUvarint(0)).toEqual(Uint8Array.from([0]));
      expect(encodeUvarint(1)).toEqual(Uint8Array.from([1]));
      expect(encodeUvarint(127)).toEqual(Uint8Array.from([127]));
      expect(encodeUvarint(128)).toEqual(Uint8Array.from([128, 1]));
      expect(encodeUvarint(255)).toEqual(Uint8Array.from([255, 1]));
      expect(encodeUvarint(256)).toEqual(Uint8Array.from([128, 2]));
    });
  });

  describe("encodeTime", () => {
    it("works", () => {
      const readonlyDateWithNanoseconds = new ReadonlyDate(1464109200);
      (readonlyDateWithNanoseconds as any).nanoseconds = 666666;
      expect(encodeTime(readonlyDateWithNanoseconds)).toEqual(
        Uint8Array.from([0x08, 173, 174, 89, 0x10, 170, 220, 215, 95]),
      );
    });
  });

  describe("encodeBytes", () => {
    it("works", () => {
      expect(encodeBytes(Uint8Array.from([]))).toEqual(Uint8Array.from([]));
      const uint8Array = Uint8Array.from([1, 2, 3, 4, 5, 6, 7]);
      expect(encodeBytes(uint8Array)).toEqual(Uint8Array.from([uint8Array.length, 1, 2, 3, 4, 5, 6, 7]));
    });
  });

  describe("encodeVersion", () => {
    it("works", () => {
      const version = {
        block: 666666,
        app: 200,
      };
      expect(encodeVersion(version)).toEqual(Uint8Array.from([0x08, 170, 216, 40, 0x10, 200, 1]));
    });
  });

  describe("encodeBlockId", () => {
    it("works", () => {
      const blockId = {
        hash: Uint8Array.from([1, 2, 3, 4, 5, 6, 7]),
        parts: {
          total: 88,
          hash: Uint8Array.from([8, 9, 10, 11, 12]),
        },
      };
      expect(encodeBlockId(blockId)).toEqual(
        Uint8Array.from([
          0x0a,
          blockId.hash.length,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          0x12,
          9,
          0x08,
          88,
          0x12,
          5,
          8,
          9,
          10,
          11,
          12,
        ]),
      );
    });
  });
});

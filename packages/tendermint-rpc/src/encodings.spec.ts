import { ReadonlyDate } from "readonly-date";

import {
  DateTime,
  encodeBlockId,
  encodeBytes,
  encodeInt,
  encodeString,
  encodeTime,
  encodeVersion,
} from "./encodings";
import { ReadonlyDateWithNanoseconds } from "./types";

describe("encodings", () => {
  describe("DateTime", () => {
    it("decodes a string", () => {
      expect(DateTime.decode("2020-12-15T10:57:26.778Z").nanoseconds).toEqual(0);
      expect(DateTime.decode("2020-12-15T10:57:26.7789Z").nanoseconds).toEqual(900000);
      expect(DateTime.decode("2020-12-15T10:57:26.77809Z").nanoseconds).toEqual(90000);
      expect(DateTime.decode("2020-12-15T10:57:26.778009Z").nanoseconds).toEqual(9000);
      expect(DateTime.decode("2020-12-15T10:57:26.7780009Z").nanoseconds).toEqual(900);
      expect(DateTime.decode("2020-12-15T10:57:26.77800009Z").nanoseconds).toEqual(90);
      expect(DateTime.decode("2020-12-15T10:57:26.778000009Z").nanoseconds).toEqual(9);
    });

    it("encodes a string", () => {
      const date1 = new ReadonlyDate("2020-12-15T10:57:26.778Z") as ReadonlyDateWithNanoseconds;
      (date1 as any).nanoseconds = 0;
      expect(DateTime.encode(date1)).toEqual("2020-12-15T10:57:26.778000000Z");
      const date2 = new ReadonlyDate("2020-12-15T10:57:26.778Z") as ReadonlyDateWithNanoseconds;
      (date2 as any).nanoseconds = 900000;
      expect(DateTime.encode(date2)).toEqual("2020-12-15T10:57:26.778900000Z");
      const date3 = new ReadonlyDate("2020-12-15T10:57:26.778Z") as ReadonlyDateWithNanoseconds;
      (date3 as any).nanoseconds = 90000;
      expect(DateTime.encode(date3)).toEqual("2020-12-15T10:57:26.778090000Z");
      const date4 = new ReadonlyDate("2020-12-15T10:57:26.778Z") as ReadonlyDateWithNanoseconds;
      (date4 as any).nanoseconds = 9000;
      expect(DateTime.encode(date4)).toEqual("2020-12-15T10:57:26.778009000Z");
      const date5 = new ReadonlyDate("2020-12-15T10:57:26.778Z") as ReadonlyDateWithNanoseconds;
      (date5 as any).nanoseconds = 900;
      expect(DateTime.encode(date5)).toEqual("2020-12-15T10:57:26.778000900Z");
      const date6 = new ReadonlyDate("2020-12-15T10:57:26.778Z") as ReadonlyDateWithNanoseconds;
      (date6 as any).nanoseconds = 90;
      expect(DateTime.encode(date6)).toEqual("2020-12-15T10:57:26.778000090Z");
      const date7 = new ReadonlyDate("2020-12-15T10:57:26.778Z") as ReadonlyDateWithNanoseconds;
      (date7 as any).nanoseconds = 9;
      expect(DateTime.encode(date7)).toEqual("2020-12-15T10:57:26.778000009Z");
    });
  });

  describe("encodeString", () => {
    it("works", () => {
      expect(encodeString("")).toEqual(Uint8Array.from([0]));
      const str = "hello iov";
      expect(encodeString(str)).toEqual(
        Uint8Array.from([str.length, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x69, 0x6f, 0x76]),
      );
    });
  });

  describe("encodeInt", () => {
    it("works", () => {
      expect(encodeInt(0)).toEqual(Uint8Array.from([0]));
      expect(encodeInt(1)).toEqual(Uint8Array.from([1]));
      expect(encodeInt(127)).toEqual(Uint8Array.from([127]));
      expect(encodeInt(128)).toEqual(Uint8Array.from([128, 1]));
      expect(encodeInt(255)).toEqual(Uint8Array.from([255, 1]));
      expect(encodeInt(256)).toEqual(Uint8Array.from([128, 2]));
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

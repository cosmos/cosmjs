import { ReadonlyDate } from "readonly-date";

import {
  DateTime,
  DateWithNanoseconds,
  fromRfc3339WithNanoseconds,
  fromSeconds,
  toRfc3339WithNanoseconds,
  toSeconds,
} from "./dates";

describe("dates", () => {
  describe("fromRfc3339WithNanoseconds", () => {
    it("works", () => {
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26Z").nanoseconds).toEqual(0);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.7Z").nanoseconds).toEqual(0);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.77Z").nanoseconds).toEqual(0);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.778Z").nanoseconds).toEqual(0);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.7789Z").nanoseconds).toEqual(900000);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.77809Z").nanoseconds).toEqual(90000);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.778009Z").nanoseconds).toEqual(9000);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.7780009Z").nanoseconds).toEqual(900);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.77800009Z").nanoseconds).toEqual(90);
      expect(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.778000009Z").nanoseconds).toEqual(9);
    });
  });

  describe("toRfc3339WithNanoseconds", () => {
    it("works", () => {
      const date1 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date1 as any).nanoseconds = 0;
      expect(toRfc3339WithNanoseconds(date1)).toEqual("2020-12-15T10:57:26.778000000Z");
      const date2 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date2 as any).nanoseconds = 900000;
      expect(toRfc3339WithNanoseconds(date2)).toEqual("2020-12-15T10:57:26.778900000Z");
      const date3 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date3 as any).nanoseconds = 90000;
      expect(toRfc3339WithNanoseconds(date3)).toEqual("2020-12-15T10:57:26.778090000Z");
      const date4 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date4 as any).nanoseconds = 9000;
      expect(toRfc3339WithNanoseconds(date4)).toEqual("2020-12-15T10:57:26.778009000Z");
      const date5 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date5 as any).nanoseconds = 900;
      expect(toRfc3339WithNanoseconds(date5)).toEqual("2020-12-15T10:57:26.778000900Z");
      const date6 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date6 as any).nanoseconds = 90;
      expect(toRfc3339WithNanoseconds(date6)).toEqual("2020-12-15T10:57:26.778000090Z");
      const date7 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date7 as any).nanoseconds = 9;
      expect(toRfc3339WithNanoseconds(date7)).toEqual("2020-12-15T10:57:26.778000009Z");
    });

    it("works for DateWithNanoseconds", () => {
      const date1: DateWithNanoseconds = new Date("2020-12-15T10:57:26.778Z");
      date1.nanoseconds = 1;
      expect(toRfc3339WithNanoseconds(date1)).toEqual("2020-12-15T10:57:26.778000001Z");
    });

    it("works for Date", () => {
      const date1 = new Date("2020-12-15T10:57:26.778Z");
      expect(toRfc3339WithNanoseconds(date1)).toEqual("2020-12-15T10:57:26.778000000Z");
    });
  });

  describe("fromSeconds", () => {
    it("works", () => {
      {
        const date = fromSeconds(1608029846);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26Z"));
      }
      {
        const date = fromSeconds(1608029846, 0);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26Z"));
      }
      {
        const date = fromSeconds(1608029846, 1);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.000000001Z"));
      }
      {
        const date = fromSeconds(1608029846, 10);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.000000010Z"));
      }
      {
        const date = fromSeconds(1608029846, 100);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.000000100Z"));
      }
      {
        const date = fromSeconds(1608029846, 1000);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.000001000Z"));
      }
      {
        const date = fromSeconds(1608029846, 10000);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.000010000Z"));
      }
      {
        const date = fromSeconds(1608029846, 100000);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.000100000Z"));
      }
      {
        const date = fromSeconds(1608029846, 1000000);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.001000000Z"));
      }
      {
        const date = fromSeconds(1608029846, 10000000);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.010000000Z"));
      }
      {
        const date = fromSeconds(1608029846, 100000000);
        expect(date).toEqual(fromRfc3339WithNanoseconds("2020-12-15T10:57:26.100000000Z"));
      }
    });

    it("throws for nanos out of range", () => {
      expect(() => fromSeconds(1608029846, 1000000000)).toThrow();
      expect(() => fromSeconds(1608029846, -1)).toThrow();
      expect(() => fromSeconds(1608029846, 1.2)).toThrow();
      expect(() => fromSeconds(1608029846, NaN)).toThrow();
    });
  });

  describe("toSeconds", () => {
    it("works", () => {
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 0 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.7Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 700000000 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.77Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 770000000 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.778Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 778000000 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.7789Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 778900000 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.77809Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 778090000 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.778009Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 778009000 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.7780009Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 778000900 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.77800009Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 778000090 });
      }
      {
        const date = fromRfc3339WithNanoseconds("2020-12-15T10:57:26.778000009Z");
        expect(toSeconds(date)).toEqual({ seconds: 1608029846, nanos: 778000009 });
      }
    });
  });

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
      const date1 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date1 as any).nanoseconds = 0;
      expect(DateTime.encode(date1)).toEqual("2020-12-15T10:57:26.778000000Z");
      const date2 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date2 as any).nanoseconds = 900000;
      expect(DateTime.encode(date2)).toEqual("2020-12-15T10:57:26.778900000Z");
      const date3 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date3 as any).nanoseconds = 90000;
      expect(DateTime.encode(date3)).toEqual("2020-12-15T10:57:26.778090000Z");
      const date4 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date4 as any).nanoseconds = 9000;
      expect(DateTime.encode(date4)).toEqual("2020-12-15T10:57:26.778009000Z");
      const date5 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date5 as any).nanoseconds = 900;
      expect(DateTime.encode(date5)).toEqual("2020-12-15T10:57:26.778000900Z");
      const date6 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date6 as any).nanoseconds = 90;
      expect(DateTime.encode(date6)).toEqual("2020-12-15T10:57:26.778000090Z");
      const date7 = new ReadonlyDate("2020-12-15T10:57:26.778Z");
      (date7 as any).nanoseconds = 9;
      expect(DateTime.encode(date7)).toEqual("2020-12-15T10:57:26.778000009Z");
    });
  });
});

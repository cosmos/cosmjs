import { ReadonlyDate } from "readonly-date";

import { DateTime } from "./dates";

describe("dates", () => {
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

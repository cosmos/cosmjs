import { fromRfc3339, toRfc3339 } from "./rfc3339";

describe("RFC3339", () => {
  it("parses dates with different time zones", () => {
    // time zone +/- 0
    expect(fromRfc3339("2002-10-02T11:12:13+00:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13-00:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13)));

    // time zone positive (full hours)
    expect(fromRfc3339("2002-10-02T11:12:13+01:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 - 1, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13+02:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 - 2, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13+03:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 - 3, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13+11:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 - 11, 12, 13)));

    // time zone negative (full hours)
    expect(fromRfc3339("2002-10-02T11:12:13-01:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 + 1, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13-02:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 + 2, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13-03:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 + 3, 12, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13-11:00")).toEqual(new Date(Date.UTC(2002, 9, 2, 11 + 11, 12, 13)));

    // time zone positive (minutes only)
    expect(fromRfc3339("2002-10-02T11:12:13+00:01")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12 - 1, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13+00:30")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12 - 30, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13+00:45")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12 - 45, 13)));

    // time zone negative (minutes only)
    expect(fromRfc3339("2002-10-02T11:12:13-00:01")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12 + 1, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13-00:30")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12 + 30, 13)));
    expect(fromRfc3339("2002-10-02T11:12:13-00:45")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12 + 45, 13)));

    // time zone positive (hours and minutes)
    expect(fromRfc3339("2002-10-02T11:12:13+01:01")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11 - 1, 12 - 1, 13)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13+04:30")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11 - 4, 12 - 30, 13)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13+10:20")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11 - 10, 12 - 20, 13)),
    );

    // time zone negative (hours and minutes)
    expect(fromRfc3339("2002-10-02T11:12:13-01:01")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11 + 1, 12 + 1, 13)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13-04:30")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11 + 4, 12 + 30, 13)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13-10:20")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11 + 10, 12 + 20, 13)),
    );
  });

  it("parses dates with milliseconds", () => {
    expect(fromRfc3339("2002-10-02T11:12:13.000Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)));
    expect(fromRfc3339("2002-10-02T11:12:13.123Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 123)));
    expect(fromRfc3339("2002-10-02T11:12:13.999Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 999)));
  });

  it("parses dates between years 0 and 99 with and without timezones", () => {
    expect(fromRfc3339("0001-01-01T00:00:00.000Z")).toEqual(
      new Date(new Date(Date.UTC(1, 0, 1, 0, 0, 0, 0)).setUTCFullYear(1)),
    );
    expect(fromRfc3339("0000-01-01T00:00:00.000Z")).toEqual(
      new Date(new Date(Date.UTC(0, 0, 1, 0, 0, 0, 0)).setUTCFullYear(0)),
    );
    expect(fromRfc3339("1999-01-01T00:00:00.000Z")).toEqual(
      new Date(new Date(Date.UTC(1999, 0, 1, 0, 0, 0, 0)).setUTCFullYear(1999)),
    );
    expect(fromRfc3339("0099-01-01T00:00:00.000Z")).toEqual(
      new Date(new Date(Date.UTC(99, 0, 1, 0, 0, 0, 0)).setUTCFullYear(99)),
    );
    expect(fromRfc3339("0010-01-01T00:00:00+01:00")).toEqual(
      new Date(new Date(Date.UTC(9, 11, 31, 23, 0, 0, 0)).setUTCFullYear(9)),
    );
    expect(fromRfc3339("0100-01-01T00:00:00+01:00")).toEqual(
      new Date(new Date(Date.UTC(99, 11, 31, 23, 0, 0, 0)).setUTCFullYear(99)),
    );
  });

  it("parses dates with low precision fractional seconds", () => {
    // 1 digit
    expect(fromRfc3339("2002-10-02T11:12:13.0Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)));
    expect(fromRfc3339("2002-10-02T11:12:13.1Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 100)));
    expect(fromRfc3339("2002-10-02T11:12:13.9Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 900)));

    // 2 digits
    expect(fromRfc3339("2002-10-02T11:12:13.00Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)));
    expect(fromRfc3339("2002-10-02T11:12:13.12Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 120)));
    expect(fromRfc3339("2002-10-02T11:12:13.99Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 990)));
  });

  it("parses dates with high precision fractional seconds", () => {
    // everything after the 3rd digit is truncated

    // 4 digits
    expect(fromRfc3339("2002-10-02T11:12:13.0000Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)));
    expect(fromRfc3339("2002-10-02T11:12:13.1234Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 123)));
    expect(fromRfc3339("2002-10-02T11:12:13.9999Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 999)));

    // 5 digits
    expect(fromRfc3339("2002-10-02T11:12:13.00000Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)));
    expect(fromRfc3339("2002-10-02T11:12:13.12345Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 123)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.99999Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 999)),
    );

    // 6 digits
    expect(fromRfc3339("2002-10-02T11:12:13.000000Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)));
    expect(fromRfc3339("2002-10-02T11:12:13.123456Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 123)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.999999Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 999)),
    );

    // 7 digits
    expect(fromRfc3339("2002-10-02T11:12:13.0000000Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.1234567Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 123)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.9999999Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 999)),
    );

    // 8 digits
    expect(fromRfc3339("2002-10-02T11:12:13.00000000Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.12345678Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 123)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.99999999Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 999)),
    );

    // 9 digits
    expect(fromRfc3339("2002-10-02T11:12:13.000000000Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 0)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.123456789Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 123)),
    );
    expect(fromRfc3339("2002-10-02T11:12:13.999999999Z")).toEqual(
      new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 999)),
    );
  });

  it("accepts space separators", () => {
    // https://tools.ietf.org/html/rfc3339#section-5.6
    // Applications using this syntax may choose, for the sake of readability,
    // to specify a full-date and full-time separated by (say) a space character.
    expect(fromRfc3339("2002-10-02 11:12:13Z")).toEqual(new Date(Date.UTC(2002, 9, 2, 11, 12, 13)));
  });

  it("throws for invalid format", () => {
    // extra whitespace
    expect(() => fromRfc3339(" 2002-10-02T11:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02T11:12:13Z ")).toThrow();
    expect(() => fromRfc3339("2002-10-02T11:12:13 Z")).toThrow();

    // wrong date separators
    expect(() => fromRfc3339("2002:10-02T11:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10:02T11:12:13Z")).toThrow();

    // wrong time separators
    expect(() => fromRfc3339("2002-10-02T11-12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02T11:12-13Z")).toThrow();

    // wrong separator
    expect(() => fromRfc3339("2002-10-02TT11:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02 T11:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02T 11:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02t11:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02x11:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02311:12:13Z")).toThrow();
    expect(() => fromRfc3339("2002-10-02.11:12:13Z")).toThrow();

    // wrong time zone
    expect(() => fromRfc3339("2002-10-02T11:12:13")).toThrow();
    expect(() => fromRfc3339("2002-10-02T11:12:13z")).toThrow();
    expect(() => fromRfc3339("2002-10-02T11:12:13 00:00")).toThrow();
    expect(() => fromRfc3339("2002-10-02T11:12:13+0000")).toThrow();

    // wrong fractional seconds
    expect(() => fromRfc3339("2018-07-30T19:21:12345Z")).toThrow();
    expect(() => fromRfc3339("2018-07-30T19:21:12.Z")).toThrow();
  });

  it("encodes dates", () => {
    expect(toRfc3339(new Date(Date.UTC(0, 0, 1, 0, 0, 0)))).toEqual("1900-01-01T00:00:00.000Z");
    expect(toRfc3339(new Date(Date.UTC(2002, 9, 2, 11, 12, 13, 456)))).toEqual("2002-10-02T11:12:13.456Z");
  });
});

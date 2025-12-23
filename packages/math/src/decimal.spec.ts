import { Decimal } from "./decimal";
import { Uint32, Uint53, Uint64 } from "./integers";

describe("Decimal", () => {
  describe("fromAtomics", () => {
    it("leads to correct atomics value (string)", () => {
      expect(Decimal.fromAtomics("1", 0).atomics).toEqual("1");
      expect(Decimal.fromAtomics("1", 1).atomics).toEqual("1");
      expect(Decimal.fromAtomics("1", 2).atomics).toEqual("1");

      expect(Decimal.fromAtomics("0", 5).atomics).toEqual("0");
      expect(Decimal.fromAtomics("1", 5).atomics).toEqual("1");
      expect(Decimal.fromAtomics("2", 5).atomics).toEqual("2");
      expect(Decimal.fromAtomics("3", 5).atomics).toEqual("3");
      expect(Decimal.fromAtomics("10", 5).atomics).toEqual("10");
      expect(Decimal.fromAtomics("20", 5).atomics).toEqual("20");
      expect(Decimal.fromAtomics("30", 5).atomics).toEqual("30");
      expect(Decimal.fromAtomics("100000000000000000000000", 5).atomics).toEqual("100000000000000000000000");
      expect(Decimal.fromAtomics("200000000000000000000000", 5).atomics).toEqual("200000000000000000000000");
      expect(Decimal.fromAtomics("300000000000000000000000", 5).atomics).toEqual("300000000000000000000000");

      expect(Decimal.fromAtomics("44", 5).atomics).toEqual("44");
      expect(Decimal.fromAtomics("044", 5).atomics).toEqual("44");
      expect(Decimal.fromAtomics("0044", 5).atomics).toEqual("44");
      expect(Decimal.fromAtomics("00044", 5).atomics).toEqual("44");

      expect(Decimal.fromAtomics("-1", 5).atomics).toEqual("-1");
      expect(Decimal.fromAtomics("-20", 5).atomics).toEqual("-20");
      expect(Decimal.fromAtomics("-335465464384483", 5).atomics).toEqual("-335465464384483");
    });

    it("leads to correct atomics value (bigint)", () => {
      expect(Decimal.fromAtomics(1n, 0).atomics).toEqual("1");
      expect(Decimal.fromAtomics(1n, 1).atomics).toEqual("1");
      expect(Decimal.fromAtomics(1n, 2).atomics).toEqual("1");

      expect(Decimal.fromAtomics(0n, 5).atomics).toEqual("0");
      expect(Decimal.fromAtomics(1n, 5).atomics).toEqual("1");
      expect(Decimal.fromAtomics(2n, 5).atomics).toEqual("2");
      expect(Decimal.fromAtomics(3n, 5).atomics).toEqual("3");
      expect(Decimal.fromAtomics(10n, 5).atomics).toEqual("10");
      expect(Decimal.fromAtomics(20n, 5).atomics).toEqual("20");
      expect(Decimal.fromAtomics(30n, 5).atomics).toEqual("30");
      expect(Decimal.fromAtomics(100000000000000000000000n, 5).atomics).toEqual("100000000000000000000000");
      expect(Decimal.fromAtomics(200000000000000000000000n, 5).atomics).toEqual("200000000000000000000000");
      expect(Decimal.fromAtomics(300000000000000000000000n, 5).atomics).toEqual("300000000000000000000000");

      expect(Decimal.fromAtomics(-1n, 5).atomics).toEqual("-1");
      expect(Decimal.fromAtomics(-20n, 5).atomics).toEqual("-20");
      expect(Decimal.fromAtomics(-335465464384483n, 5).atomics).toEqual("-335465464384483");
    });

    it("reads fractional digits correctly", () => {
      expect(Decimal.fromAtomics("44", 0).toString()).toEqual("44");
      expect(Decimal.fromAtomics("44", 1).toString()).toEqual("4.4");
      expect(Decimal.fromAtomics("44", 2).toString()).toEqual("0.44");
      expect(Decimal.fromAtomics("44", 3).toString()).toEqual("0.044");
      expect(Decimal.fromAtomics("44", 4).toString()).toEqual("0.0044");
      expect(Decimal.fromAtomics(44n, 0).toString()).toEqual("44");
      expect(Decimal.fromAtomics(44n, 1).toString()).toEqual("4.4");
      expect(Decimal.fromAtomics(44n, 2).toString()).toEqual("0.44");
      expect(Decimal.fromAtomics(44n, 3).toString()).toEqual("0.044");
      expect(Decimal.fromAtomics(44n, 4).toString()).toEqual("0.0044");
    });

    it("throws for atomics that are not integers", () => {
      expect(() => Decimal.fromAtomics("0xAA", 0)).toThrowError(
        "Invalid string format. Only integers in decimal representation supported.",
      );
      expect(() => Decimal.fromAtomics("", 0)).toThrowError(
        "Invalid string format. Only integers in decimal representation supported.",
      );
      expect(() => Decimal.fromAtomics("--2", 0)).toThrowError(
        "Invalid string format. Only integers in decimal representation supported.",
      );
      expect(() => Decimal.fromAtomics("0.7", 0)).toThrowError(
        "Invalid string format. Only integers in decimal representation supported.",
      );
    });
  });

  describe("fromUserInput", () => {
    it("throws helpful error message for invalid characters", () => {
      expect(() => Decimal.fromUserInput(" 13", 5)).toThrowError(/invalid character at position 1/i);
      expect(() => Decimal.fromUserInput("1,3", 5)).toThrowError(/invalid character at position 2/i);
      expect(() => Decimal.fromUserInput("13-", 5)).toThrowError(/invalid character at position 3/i);
      expect(() => Decimal.fromUserInput("13/", 5)).toThrowError(/invalid character at position 3/i);
      expect(() => Decimal.fromUserInput("13\\", 5)).toThrowError(/invalid character at position 3/i);
      expect(() => Decimal.fromUserInput("--13", 5)).toThrowError(/invalid character at position 2/i);
      expect(() => Decimal.fromUserInput("-1-3", 5)).toThrowError(/invalid character at position 3/i);
    });

    it("throws for more than one separator", () => {
      expect(() => Decimal.fromUserInput("1.3.5", 5)).toThrowError(/more than one separator found/i);
      expect(() => Decimal.fromUserInput("1..3", 5)).toThrowError(/more than one separator found/i);
      expect(() => Decimal.fromUserInput("..", 5)).toThrowError(/more than one separator found/i);
    });

    it("throws for separator only", () => {
      expect(() => Decimal.fromUserInput(".", 5)).toThrowError(/fractional part missing/i);
    });

    it("throws for more fractional digits than supported", () => {
      expect(() => Decimal.fromUserInput("44.123456", 5)).toThrowError(
        /got more fractional digits than supported/i,
      );
      expect(() => Decimal.fromUserInput("44.000001", 5)).toThrowError(
        /got more fractional digits than supported/i,
      );
      expect(() => Decimal.fromUserInput("44.1", 0)).toThrowError(
        /got more fractional digits than supported/i,
      );
    });

    it("throws for fractional digits that are not non-negative integers", () => {
      // no integer
      expect(() => Decimal.fromUserInput("1", Number.NaN)).toThrowError(
        /fractional digits is not an integer/i,
      );
      expect(() => Decimal.fromUserInput("1", Number.POSITIVE_INFINITY)).toThrowError(
        /fractional digits is not an integer/i,
      );
      expect(() => Decimal.fromUserInput("1", Number.NEGATIVE_INFINITY)).toThrowError(
        /fractional digits is not an integer/i,
      );
      expect(() => Decimal.fromUserInput("1", 1.78945544484)).toThrowError(
        /fractional digits is not an integer/i,
      );

      // negative
      expect(() => Decimal.fromUserInput("1", -1)).toThrowError(/fractional digits must not be negative/i);
      expect(() => Decimal.fromUserInput("1", Number.MIN_SAFE_INTEGER)).toThrowError(
        /fractional digits must not be negative/i,
      );

      // exceeds supported range
      expect(() => Decimal.fromUserInput("1", 101)).toThrowError(/fractional digits must not exceed 100/i);
    });

    it("returns correct value", () => {
      expect(Decimal.fromUserInput("44", 0).atomics).toEqual("44");
      expect(Decimal.fromUserInput("44", 1).atomics).toEqual("440");
      expect(Decimal.fromUserInput("44", 2).atomics).toEqual("4400");
      expect(Decimal.fromUserInput("44", 3).atomics).toEqual("44000");

      expect(Decimal.fromUserInput("44.2", 1).atomics).toEqual("442");
      expect(Decimal.fromUserInput("44.2", 2).atomics).toEqual("4420");
      expect(Decimal.fromUserInput("44.2", 3).atomics).toEqual("44200");

      expect(Decimal.fromUserInput("44.1", 6).atomics).toEqual("44100000");
      expect(Decimal.fromUserInput("44.12", 6).atomics).toEqual("44120000");
      expect(Decimal.fromUserInput("44.123", 6).atomics).toEqual("44123000");
      expect(Decimal.fromUserInput("44.1234", 6).atomics).toEqual("44123400");
      expect(Decimal.fromUserInput("44.12345", 6).atomics).toEqual("44123450");
      expect(Decimal.fromUserInput("44.123456", 6).atomics).toEqual("44123456");
    });

    it("cuts leading zeros", () => {
      expect(Decimal.fromUserInput("4", 2).atomics).toEqual("400");
      expect(Decimal.fromUserInput("04", 2).atomics).toEqual("400");
      expect(Decimal.fromUserInput("004", 2).atomics).toEqual("400");
    });

    it("cuts tailing zeros", () => {
      expect(Decimal.fromUserInput("4.12", 5).atomics).toEqual("412000");
      expect(Decimal.fromUserInput("4.120", 5).atomics).toEqual("412000");
      expect(Decimal.fromUserInput("4.1200", 5).atomics).toEqual("412000");
      expect(Decimal.fromUserInput("4.12000", 5).atomics).toEqual("412000");
      // The following cases may be controversial and you could argue they should throw. But
      // this has been the behaviour for a long time.
      expect(Decimal.fromUserInput("4.120000", 5).atomics).toEqual("412000");
      expect(Decimal.fromUserInput("4.1200000", 5).atomics).toEqual("412000");
    });

    it("interprets the empty string as zero", () => {
      expect(Decimal.fromUserInput("", 0).atomics).toEqual("0");
      expect(Decimal.fromUserInput("", 1).atomics).toEqual("0");
      expect(Decimal.fromUserInput("", 2).atomics).toEqual("0");
      expect(Decimal.fromUserInput("", 3).atomics).toEqual("0");
    });

    it("works for negative", () => {
      expect(Decimal.fromUserInput("-5", 0).atomics).toEqual("-5");
      expect(Decimal.fromUserInput("-5.1", 1).atomics).toEqual("-51");
      expect(Decimal.fromUserInput("-5.35", 2).atomics).toEqual("-535");
      expect(Decimal.fromUserInput("-5.765", 3).atomics).toEqual("-5765");
      expect(Decimal.fromUserInput("-545", 0).atomics).toEqual("-545");
      expect(Decimal.fromUserInput("-545.1", 1).atomics).toEqual("-5451");
      expect(Decimal.fromUserInput("-545.35", 2).atomics).toEqual("-54535");
      expect(Decimal.fromUserInput("-545.765", 3).atomics).toEqual("-545765");
    });

    it("accepts american notation with skipped leading zero", () => {
      expect(Decimal.fromUserInput(".1", 3).atomics).toEqual("100");
      expect(Decimal.fromUserInput(".12", 3).atomics).toEqual("120");
      expect(Decimal.fromUserInput(".123", 3).atomics).toEqual("123");

      // ⬇️ strange style but JavaScript supports it too 🤷‍♂️
      expect(Decimal.fromUserInput("-.1", 3).atomics).toEqual("-100");
      expect(Decimal.fromUserInput("-.12", 3).atomics).toEqual("-120");
      expect(Decimal.fromUserInput("-.123", 3).atomics).toEqual("-123");
    });
  });

  describe("zero", () => {
    it("works", () => {
      expect(Decimal.zero(0).toString()).toEqual("0");
      expect(Decimal.zero(1).toString()).toEqual("0");
      expect(Decimal.zero(2).toString()).toEqual("0");
      expect(Decimal.zero(30).toString()).toEqual("0");

      expect(Decimal.zero(0).fractionalDigits).toEqual(0);
      expect(Decimal.zero(1).fractionalDigits).toEqual(1);
      expect(Decimal.zero(2).fractionalDigits).toEqual(2);
      expect(Decimal.zero(30).fractionalDigits).toEqual(30);

      expect(Decimal.zero(0).atomics).toEqual("0");
      expect(Decimal.zero(1).atomics).toEqual("0");
      expect(Decimal.zero(2).atomics).toEqual("0");
      expect(Decimal.zero(30).atomics).toEqual("0");

      expect(() => Decimal.zero(NaN)).toThrowError(/Fractional digits is not an integer/i);
      expect(() => Decimal.zero(1.2)).toThrowError(/Fractional digits is not an integer/i);
    });
  });

  describe("one", () => {
    it("works", () => {
      expect(Decimal.one(0).toString()).toEqual("1");
      expect(Decimal.one(1).toString()).toEqual("1");
      expect(Decimal.one(2).toString()).toEqual("1");
      expect(Decimal.one(30).toString()).toEqual("1");

      expect(Decimal.one(0).fractionalDigits).toEqual(0);
      expect(Decimal.one(1).fractionalDigits).toEqual(1);
      expect(Decimal.one(2).fractionalDigits).toEqual(2);
      expect(Decimal.one(30).fractionalDigits).toEqual(30);

      expect(Decimal.one(0).atomics).toEqual("1");
      expect(Decimal.one(1).atomics).toEqual("10");
      expect(Decimal.one(2).atomics).toEqual("100");
      expect(Decimal.one(30).atomics).toEqual("1000000000000000000000000000000");

      expect(() => Decimal.one(NaN)).toThrowError(/Fractional digits is not an integer/i);
      expect(() => Decimal.one(1.2)).toThrowError(/Fractional digits is not an integer/i);
    });
  });

  describe("floor", () => {
    it("works", () => {
      // whole numbers
      expect(Decimal.fromUserInput("0", 0).floor().toString()).toEqual("0");
      expect(Decimal.fromUserInput("1", 0).floor().toString()).toEqual("1");
      expect(Decimal.fromUserInput("44", 0).floor().toString()).toEqual("44");
      expect(Decimal.fromUserInput("-2", 0).floor().toString()).toEqual("-2");
      expect(Decimal.fromUserInput("0", 3).floor().toString()).toEqual("0");
      expect(Decimal.fromUserInput("1", 3).floor().toString()).toEqual("1");
      expect(Decimal.fromUserInput("44", 3).floor().toString()).toEqual("44");
      expect(Decimal.fromUserInput("-2", 3).floor().toString()).toEqual("-2");

      // with fractional part
      expect(Decimal.fromUserInput("0.001", 3).floor().toString()).toEqual("0");
      expect(Decimal.fromUserInput("1.999", 3).floor().toString()).toEqual("1");
      expect(Decimal.fromUserInput("0.000000000000000001", 18).floor().toString()).toEqual("0");
      expect(Decimal.fromUserInput("1.999999999999999999", 18).floor().toString()).toEqual("1");
      expect(Decimal.fromUserInput("-0.001", 3).floor().toString()).toEqual("-1");
      expect(Decimal.fromUserInput("-1.999", 3).floor().toString()).toEqual("-2");
      expect(Decimal.fromUserInput("-0.000000000000000001", 18).floor().toString()).toEqual("-1");
      expect(Decimal.fromUserInput("-1.999999999999999999", 18).floor().toString()).toEqual("-2");
    });
  });

  describe("ceil", () => {
    it("works", () => {
      // whole numbers
      expect(Decimal.fromUserInput("0", 0).ceil().toString()).toEqual("0");
      expect(Decimal.fromUserInput("1", 0).ceil().toString()).toEqual("1");
      expect(Decimal.fromUserInput("44", 0).ceil().toString()).toEqual("44");
      expect(Decimal.fromUserInput("-2", 0).ceil().toString()).toEqual("-2");
      expect(Decimal.fromUserInput("0", 3).ceil().toString()).toEqual("0");
      expect(Decimal.fromUserInput("1", 3).ceil().toString()).toEqual("1");
      expect(Decimal.fromUserInput("44", 3).ceil().toString()).toEqual("44");
      expect(Decimal.fromUserInput("-2", 3).ceil().toString()).toEqual("-2");

      // with fractional part
      expect(Decimal.fromUserInput("0.001", 3).ceil().toString()).toEqual("1");
      expect(Decimal.fromUserInput("1.999", 3).ceil().toString()).toEqual("2");
      expect(Decimal.fromUserInput("0.000000000000000001", 18).ceil().toString()).toEqual("1");
      expect(Decimal.fromUserInput("1.999999999999999999", 18).ceil().toString()).toEqual("2");
      expect(Decimal.fromUserInput("-0.001", 3).ceil().toString()).toEqual("0");
      expect(Decimal.fromUserInput("-1.5", 3).ceil().toString()).toEqual("-1");
    });
  });

  describe("adjustFractionalDigits", () => {
    it("can expand", () => {
      const a = Decimal.fromUserInput("1.23", 2);
      const aa = a.adjustFractionalDigits(2);
      const aaa = a.adjustFractionalDigits(3);
      const aaaa = a.adjustFractionalDigits(4);
      expect(aa.toString()).toEqual("1.23");
      expect(aa.fractionalDigits).toEqual(2);
      expect(aaa.toString()).toEqual("1.23");
      expect(aaa.fractionalDigits).toEqual(3);
      expect(aaaa.toString()).toEqual("1.23");
      expect(aaaa.fractionalDigits).toEqual(4);

      const n = Decimal.fromUserInput("-1.23", 2);
      const nn = n.adjustFractionalDigits(2);
      const nnn = n.adjustFractionalDigits(3);
      const nnnn = n.adjustFractionalDigits(4);
      expect(nn.toString()).toEqual("-1.23");
      expect(nn.fractionalDigits).toEqual(2);
      expect(nnn.toString()).toEqual("-1.23");
      expect(nnn.fractionalDigits).toEqual(3);
      expect(nnnn.toString()).toEqual("-1.23");
      expect(nnnn.fractionalDigits).toEqual(4);
    });

    it("can shrink", () => {
      const a = Decimal.fromUserInput("1.23456789", 8);
      const a8 = a.adjustFractionalDigits(8);
      const a7 = a.adjustFractionalDigits(7);
      const a6 = a.adjustFractionalDigits(6);
      const a5 = a.adjustFractionalDigits(5);
      const a4 = a.adjustFractionalDigits(4);
      const a3 = a.adjustFractionalDigits(3);
      const a2 = a.adjustFractionalDigits(2);
      const a1 = a.adjustFractionalDigits(1);
      const a0 = a.adjustFractionalDigits(0);
      expect(a8.toString()).toEqual("1.23456789");
      expect(a8.fractionalDigits).toEqual(8);
      expect(a7.toString()).toEqual("1.2345678");
      expect(a7.fractionalDigits).toEqual(7);
      expect(a6.toString()).toEqual("1.234567");
      expect(a6.fractionalDigits).toEqual(6);
      expect(a5.toString()).toEqual("1.23456");
      expect(a5.fractionalDigits).toEqual(5);
      expect(a4.toString()).toEqual("1.2345");
      expect(a4.fractionalDigits).toEqual(4);
      expect(a3.toString()).toEqual("1.234");
      expect(a3.fractionalDigits).toEqual(3);
      expect(a2.toString()).toEqual("1.23");
      expect(a2.fractionalDigits).toEqual(2);
      expect(a1.toString()).toEqual("1.2");
      expect(a1.fractionalDigits).toEqual(1);
      expect(a0.toString()).toEqual("1");
      expect(a0.fractionalDigits).toEqual(0);

      const b = Decimal.fromUserInput("-1.23456789", 8);
      const b8 = b.adjustFractionalDigits(8);
      const b7 = b.adjustFractionalDigits(7);
      const b6 = b.adjustFractionalDigits(6);
      const b5 = b.adjustFractionalDigits(5);
      const b4 = b.adjustFractionalDigits(4);
      const b3 = b.adjustFractionalDigits(3);
      const b2 = b.adjustFractionalDigits(2);
      const b1 = b.adjustFractionalDigits(1);
      const b0 = b.adjustFractionalDigits(0);
      expect(b8.toString()).toEqual("-1.23456789");
      expect(b8.fractionalDigits).toEqual(8);
      expect(b7.toString()).toEqual("-1.2345678");
      expect(b7.fractionalDigits).toEqual(7);
      expect(b6.toString()).toEqual("-1.234567");
      expect(b6.fractionalDigits).toEqual(6);
      expect(b5.toString()).toEqual("-1.23456");
      expect(b5.fractionalDigits).toEqual(5);
      expect(b4.toString()).toEqual("-1.2345");
      expect(b4.fractionalDigits).toEqual(4);
      expect(b3.toString()).toEqual("-1.234");
      expect(b3.fractionalDigits).toEqual(3);
      expect(b2.toString()).toEqual("-1.23");
      expect(b2.fractionalDigits).toEqual(2);
      expect(b1.toString()).toEqual("-1.2");
      expect(b1.fractionalDigits).toEqual(1);
      expect(b0.toString()).toEqual("-1");
      expect(b0.fractionalDigits).toEqual(0);
    });

    it("allows arithmetic between different fractional difits", () => {
      const a = Decimal.fromUserInput("5.33", 2);
      const b = Decimal.fromUserInput("2.1", 1);
      expect(() => a.plus(b)).toThrowError(/Fractional digits do not match/i); // maybe not convenient but this is what we expect

      const bb = b.adjustFractionalDigits(a.fractionalDigits);
      expect(a.plus(bb).toString()).toEqual("7.43");

      const aa = a.adjustFractionalDigits(b.fractionalDigits);
      expect(aa.plus(b).toString()).toEqual("7.4");
    });
  });

  describe("toString", () => {
    it("displays no decimal point for full numbers", () => {
      expect(Decimal.fromUserInput("44", 0).toString()).toEqual("44");
      expect(Decimal.fromUserInput("44", 1).toString()).toEqual("44");
      expect(Decimal.fromUserInput("44", 2).toString()).toEqual("44");

      expect(Decimal.fromUserInput("44", 2).toString()).toEqual("44");
      expect(Decimal.fromUserInput("44.0", 2).toString()).toEqual("44");
      expect(Decimal.fromUserInput("44.00", 2).toString()).toEqual("44");
      expect(Decimal.fromUserInput("44.000", 2).toString()).toEqual("44");
    });

    it("only shows significant digits", () => {
      expect(Decimal.fromUserInput("44.1", 2).toString()).toEqual("44.1");
      expect(Decimal.fromUserInput("44.10", 2).toString()).toEqual("44.1");
      expect(Decimal.fromUserInput("44.100", 2).toString()).toEqual("44.1");
    });

    it("fills up leading zeros", () => {
      expect(Decimal.fromAtomics("3", 0).toString()).toEqual("3");
      expect(Decimal.fromAtomics("3", 1).toString()).toEqual("0.3");
      expect(Decimal.fromAtomics("3", 2).toString()).toEqual("0.03");
      expect(Decimal.fromAtomics("3", 3).toString()).toEqual("0.003");
    });

    it("works for negative", () => {
      expect(Decimal.fromAtomics(-3n, 0).toString()).toEqual("-3");
      expect(Decimal.fromAtomics(-3n, 1).toString()).toEqual("-0.3");
      expect(Decimal.fromAtomics(-3n, 2).toString()).toEqual("-0.03");
      expect(Decimal.fromAtomics(-3n, 3).toString()).toEqual("-0.003");
    });
  });

  describe("toFloatApproximation", () => {
    it("works", () => {
      expect(Decimal.fromUserInput("0", 5).toFloatApproximation()).toEqual(0);
      expect(Decimal.fromUserInput("1", 5).toFloatApproximation()).toEqual(1);
      expect(Decimal.fromUserInput("1.5", 5).toFloatApproximation()).toEqual(1.5);
      expect(Decimal.fromUserInput("0.1", 5).toFloatApproximation()).toEqual(0.1);

      expect(Decimal.fromUserInput("-0", 5).toFloatApproximation()).toEqual(0); // -0 cannot be represented in Decimal
      expect(Decimal.fromUserInput("-1", 5).toFloatApproximation()).toEqual(-1);
      expect(Decimal.fromUserInput("-1.5", 5).toFloatApproximation()).toEqual(-1.5);
      expect(Decimal.fromUserInput("-0.1", 5).toFloatApproximation()).toEqual(-0.1);

      expect(Decimal.fromUserInput("1234500000000000", 5).toFloatApproximation()).toEqual(1.2345e15);
      expect(Decimal.fromUserInput("1234500000000000.002", 5).toFloatApproximation()).toEqual(1.2345e15);
    });
  });

  describe("plus", () => {
    it("returns correct values", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.plus(Decimal.fromUserInput("0", 5)).toString()).toEqual("0");
      expect(zero.plus(Decimal.fromUserInput("1", 5)).toString()).toEqual("1");
      expect(zero.plus(Decimal.fromUserInput("2", 5)).toString()).toEqual("2");
      expect(zero.plus(Decimal.fromUserInput("2.8", 5)).toString()).toEqual("2.8");
      expect(zero.plus(Decimal.fromUserInput("0.12345", 5)).toString()).toEqual("0.12345");

      const one = Decimal.fromUserInput("1", 5);
      expect(one.plus(Decimal.fromUserInput("0", 5)).toString()).toEqual("1");
      expect(one.plus(Decimal.fromUserInput("1", 5)).toString()).toEqual("2");
      expect(one.plus(Decimal.fromUserInput("2", 5)).toString()).toEqual("3");
      expect(one.plus(Decimal.fromUserInput("2.8", 5)).toString()).toEqual("3.8");
      expect(one.plus(Decimal.fromUserInput("0.12345", 5)).toString()).toEqual("1.12345");

      const minusOne = Decimal.fromUserInput("-1", 5);
      expect(minusOne.plus(Decimal.fromUserInput("0", 5)).toString()).toEqual("-1");
      expect(minusOne.plus(Decimal.fromUserInput("1", 5)).toString()).toEqual("0");
      expect(minusOne.plus(Decimal.fromUserInput("2", 5)).toString()).toEqual("1");
      expect(minusOne.plus(Decimal.fromUserInput("2.8", 5)).toString()).toEqual("1.8");
      expect(minusOne.plus(Decimal.fromUserInput("0.12345", 5)).toString()).toEqual("-0.87655");

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.plus(Decimal.fromUserInput("0", 5)).toString()).toEqual("1.5");
      expect(oneDotFive.plus(Decimal.fromUserInput("1", 5)).toString()).toEqual("2.5");
      expect(oneDotFive.plus(Decimal.fromUserInput("2", 5)).toString()).toEqual("3.5");
      expect(oneDotFive.plus(Decimal.fromUserInput("2.8", 5)).toString()).toEqual("4.3");
      expect(oneDotFive.plus(Decimal.fromUserInput("0.12345", 5)).toString()).toEqual("1.62345");

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(minusOne.toString()).toEqual("-1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("throws for different fractional digits", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(() => zero.plus(Decimal.fromUserInput("1", 1))).toThrowError(/do not match/i);
      expect(() => zero.plus(Decimal.fromUserInput("1", 2))).toThrowError(/do not match/i);
      expect(() => zero.plus(Decimal.fromUserInput("1", 3))).toThrowError(/do not match/i);
      expect(() => zero.plus(Decimal.fromUserInput("1", 4))).toThrowError(/do not match/i);

      expect(() => zero.plus(Decimal.fromUserInput("1", 6))).toThrowError(/do not match/i);
      expect(() => zero.plus(Decimal.fromUserInput("1", 7))).toThrowError(/do not match/i);
    });
  });

  describe("minus", () => {
    it("returns correct values", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(Decimal.fromUserInput("0", 5).minus(zero).toString()).toEqual("0");
      expect(Decimal.fromUserInput("1", 5).minus(zero).toString()).toEqual("1");
      expect(Decimal.fromUserInput("2", 5).minus(zero).toString()).toEqual("2");
      expect(Decimal.fromUserInput("2.8", 5).minus(zero).toString()).toEqual("2.8");
      expect(Decimal.fromUserInput("0.12345", 5).minus(zero).toString()).toEqual("0.12345");

      const one = Decimal.fromUserInput("1", 5);
      expect(Decimal.fromUserInput("1", 5).minus(one).toString()).toEqual("0");
      expect(Decimal.fromUserInput("2", 5).minus(one).toString()).toEqual("1");
      expect(Decimal.fromUserInput("3", 5).minus(one).toString()).toEqual("2");
      expect(Decimal.fromUserInput("3.8", 5).minus(one).toString()).toEqual("2.8");
      expect(Decimal.fromUserInput("1.12345", 5).minus(one).toString()).toEqual("0.12345");

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(Decimal.fromUserInput("1.5", 5).minus(oneDotFive).toString()).toEqual("0");
      expect(Decimal.fromUserInput("2.5", 5).minus(oneDotFive).toString()).toEqual("1");
      expect(Decimal.fromUserInput("3.5", 5).minus(oneDotFive).toString()).toEqual("2");
      expect(Decimal.fromUserInput("4.3", 5).minus(oneDotFive).toString()).toEqual("2.8");
      expect(Decimal.fromUserInput("1.62345", 5).minus(oneDotFive).toString()).toEqual("0.12345");

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("throws for different fractional digits", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(() => Decimal.fromUserInput("1", 1).minus(zero)).toThrowError(/do not match/i);
      expect(() => Decimal.fromUserInput("1", 2).minus(zero)).toThrowError(/do not match/i);
      expect(() => Decimal.fromUserInput("1", 3).minus(zero)).toThrowError(/do not match/i);
      expect(() => Decimal.fromUserInput("1", 4).minus(zero)).toThrowError(/do not match/i);

      expect(() => Decimal.fromUserInput("1", 6).minus(zero)).toThrowError(/do not match/i);
      expect(() => Decimal.fromUserInput("1", 7).minus(zero)).toThrowError(/do not match/i);
    });

    it("works for negative results", () => {
      const one = Decimal.fromUserInput("1", 5);
      expect(Decimal.fromUserInput("0", 5).minus(one).toString()).toEqual("-1");
      expect(Decimal.fromUserInput("0.5", 5).minus(one).toString()).toEqual("-0.5");
      expect(Decimal.fromUserInput("0.98765", 5).minus(one).toString()).toEqual("-0.01235");
    });
  });

  describe("multiply", () => {
    it("returns correct values for Uint32", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.multiply(new Uint32(0)).toString()).toEqual("0");
      expect(zero.multiply(new Uint32(1)).toString()).toEqual("0");
      expect(zero.multiply(new Uint32(2)).toString()).toEqual("0");
      expect(zero.multiply(new Uint32(4294967295)).toString()).toEqual("0");

      const one = Decimal.fromUserInput("1", 5);
      expect(one.multiply(new Uint32(0)).toString()).toEqual("0");
      expect(one.multiply(new Uint32(1)).toString()).toEqual("1");
      expect(one.multiply(new Uint32(2)).toString()).toEqual("2");
      expect(one.multiply(new Uint32(4294967295)).toString()).toEqual("4294967295");

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.multiply(new Uint32(0)).toString()).toEqual("0");
      expect(oneDotFive.multiply(new Uint32(1)).toString()).toEqual("1.5");
      expect(oneDotFive.multiply(new Uint32(2)).toString()).toEqual("3");
      expect(oneDotFive.multiply(new Uint32(4294967295)).toString()).toEqual("6442450942.5");

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("returns correct values for Uint53", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.multiply(new Uint53(0)).toString()).toEqual("0");
      expect(zero.multiply(new Uint53(1)).toString()).toEqual("0");
      expect(zero.multiply(new Uint53(2)).toString()).toEqual("0");
      expect(zero.multiply(new Uint53(9007199254740991)).toString()).toEqual("0");

      const one = Decimal.fromUserInput("1", 5);
      expect(one.multiply(new Uint53(0)).toString()).toEqual("0");
      expect(one.multiply(new Uint53(1)).toString()).toEqual("1");
      expect(one.multiply(new Uint53(2)).toString()).toEqual("2");
      expect(one.multiply(new Uint53(9007199254740991)).toString()).toEqual("9007199254740991");

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.multiply(new Uint53(0)).toString()).toEqual("0");
      expect(oneDotFive.multiply(new Uint53(1)).toString()).toEqual("1.5");
      expect(oneDotFive.multiply(new Uint53(2)).toString()).toEqual("3");
      expect(oneDotFive.multiply(new Uint53(9007199254740991)).toString()).toEqual("13510798882111486.5");

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("returns correct values for Uint64", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.multiply(Uint64.fromString("0")).toString()).toEqual("0");
      expect(zero.multiply(Uint64.fromString("1")).toString()).toEqual("0");
      expect(zero.multiply(Uint64.fromString("2")).toString()).toEqual("0");
      expect(zero.multiply(Uint64.fromString("18446744073709551615")).toString()).toEqual("0");

      const one = Decimal.fromUserInput("1", 5);
      expect(one.multiply(Uint64.fromString("0")).toString()).toEqual("0");
      expect(one.multiply(Uint64.fromString("1")).toString()).toEqual("1");
      expect(one.multiply(Uint64.fromString("2")).toString()).toEqual("2");
      expect(one.multiply(Uint64.fromString("18446744073709551615")).toString()).toEqual(
        "18446744073709551615",
      );

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.multiply(Uint64.fromString("0")).toString()).toEqual("0");
      expect(oneDotFive.multiply(Uint64.fromString("1")).toString()).toEqual("1.5");
      expect(oneDotFive.multiply(Uint64.fromString("2")).toString()).toEqual("3");
      expect(oneDotFive.multiply(Uint64.fromString("18446744073709551615")).toString()).toEqual(
        "27670116110564327422.5",
      );

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });
  });

  describe("neg", () => {
    it("works", () => {
      // There is only one zero which negates to itself
      expect(Decimal.zero(2).neg()).toEqual(Decimal.zero(2));
      expect(Decimal.fromUserInput("-0", 4).neg()).toEqual(Decimal.fromUserInput("0", 4));

      // positive to negative
      expect(Decimal.fromAtomics(1n, 4).neg()).toEqual(Decimal.fromAtomics(-1n, 4));
      expect(Decimal.fromAtomics(8743181344348n, 4).neg()).toEqual(Decimal.fromAtomics(-8743181344348n, 4));

      // negative to positive
      expect(Decimal.fromAtomics(-1n, 4).neg()).toEqual(Decimal.fromAtomics(1n, 4));
      expect(Decimal.fromAtomics(-41146784348412n, 4).neg()).toEqual(Decimal.fromAtomics(41146784348412n, 4));
    });
  });

  describe("abs", () => {
    it("works", () => {
      // There is only one zero which negates to itself
      expect(Decimal.zero(2).abs()).toEqual(Decimal.zero(2));
      expect(Decimal.fromUserInput("-0", 4).abs()).toEqual(Decimal.fromUserInput("0", 4));

      // positive input
      expect(Decimal.fromAtomics(1n, 4).abs()).toEqual(Decimal.fromAtomics(1n, 4));
      expect(Decimal.fromAtomics(8743181344348n, 4).abs()).toEqual(Decimal.fromAtomics(8743181344348n, 4));

      // negative input
      expect(Decimal.fromAtomics(-1n, 4).neg()).toEqual(Decimal.fromAtomics(1n, 4));
      expect(Decimal.fromAtomics(-41146784348412n, 4).neg()).toEqual(Decimal.fromAtomics(41146784348412n, 4));
    });
  });

  describe("equals", () => {
    it("returns correct values", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.equals(Decimal.fromUserInput("0", 5))).toEqual(true);
      expect(zero.equals(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(zero.equals(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(zero.equals(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(zero.equals(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      const one = Decimal.fromUserInput("1", 5);
      expect(one.equals(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(one.equals(Decimal.fromUserInput("1", 5))).toEqual(true);
      expect(one.equals(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(one.equals(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(one.equals(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.equals(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(oneDotFive.equals(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(oneDotFive.equals(Decimal.fromUserInput("1.5", 5))).toEqual(true);
      expect(oneDotFive.equals(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(oneDotFive.equals(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(oneDotFive.equals(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      const minusTwoDotEight = Decimal.fromUserInput("-2.8", 5);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("1.5", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("0.12345", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("-0", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("-1", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("-1.5", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("-2", 5))).toEqual(false);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("-2.8", 5))).toEqual(true);
      expect(minusTwoDotEight.equals(Decimal.fromUserInput("-0.12345", 5))).toEqual(false);

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
      expect(minusTwoDotEight.toString()).toEqual("-2.8");
    });

    it("throws for different fractional digits", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(() => zero.equals(Decimal.fromUserInput("1", 1))).toThrowError(/do not match/i);
      expect(() => zero.equals(Decimal.fromUserInput("1", 2))).toThrowError(/do not match/i);
      expect(() => zero.equals(Decimal.fromUserInput("1", 3))).toThrowError(/do not match/i);
      expect(() => zero.equals(Decimal.fromUserInput("1", 4))).toThrowError(/do not match/i);

      expect(() => zero.equals(Decimal.fromUserInput("1", 6))).toThrowError(/do not match/i);
      expect(() => zero.equals(Decimal.fromUserInput("1", 7))).toThrowError(/do not match/i);
    });
  });

  describe("isLessThan", () => {
    it("returns correct values", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.isLessThan(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(zero.isLessThan(Decimal.fromUserInput("1", 5))).toEqual(true);
      expect(zero.isLessThan(Decimal.fromUserInput("2", 5))).toEqual(true);
      expect(zero.isLessThan(Decimal.fromUserInput("2.8", 5))).toEqual(true);
      expect(zero.isLessThan(Decimal.fromUserInput("0.12345", 5))).toEqual(true);

      const one = Decimal.fromUserInput("1", 5);
      expect(one.isLessThan(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(one.isLessThan(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(one.isLessThan(Decimal.fromUserInput("2", 5))).toEqual(true);
      expect(one.isLessThan(Decimal.fromUserInput("2.8", 5))).toEqual(true);
      expect(one.isLessThan(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.isLessThan(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(oneDotFive.isLessThan(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(oneDotFive.isLessThan(Decimal.fromUserInput("1.5", 5))).toEqual(false);
      expect(oneDotFive.isLessThan(Decimal.fromUserInput("2", 5))).toEqual(true);
      expect(oneDotFive.isLessThan(Decimal.fromUserInput("2.8", 5))).toEqual(true);
      expect(oneDotFive.isLessThan(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("throws for different fractional digits", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(() => zero.isLessThan(Decimal.fromUserInput("1", 1))).toThrowError(/do not match/i);
      expect(() => zero.isLessThan(Decimal.fromUserInput("1", 2))).toThrowError(/do not match/i);
      expect(() => zero.isLessThan(Decimal.fromUserInput("1", 3))).toThrowError(/do not match/i);
      expect(() => zero.isLessThan(Decimal.fromUserInput("1", 4))).toThrowError(/do not match/i);

      expect(() => zero.isLessThan(Decimal.fromUserInput("1", 6))).toThrowError(/do not match/i);
      expect(() => zero.isLessThan(Decimal.fromUserInput("1", 7))).toThrowError(/do not match/i);
    });
  });

  describe("isLessThanOrEqual", () => {
    it("returns correct values", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.isLessThanOrEqual(Decimal.fromUserInput("0", 5))).toEqual(true);
      expect(zero.isLessThanOrEqual(Decimal.fromUserInput("1", 5))).toEqual(true);
      expect(zero.isLessThanOrEqual(Decimal.fromUserInput("2", 5))).toEqual(true);
      expect(zero.isLessThanOrEqual(Decimal.fromUserInput("2.8", 5))).toEqual(true);
      expect(zero.isLessThanOrEqual(Decimal.fromUserInput("0.12345", 5))).toEqual(true);

      const one = Decimal.fromUserInput("1", 5);
      expect(one.isLessThanOrEqual(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(one.isLessThanOrEqual(Decimal.fromUserInput("1", 5))).toEqual(true);
      expect(one.isLessThanOrEqual(Decimal.fromUserInput("2", 5))).toEqual(true);
      expect(one.isLessThanOrEqual(Decimal.fromUserInput("2.8", 5))).toEqual(true);
      expect(one.isLessThanOrEqual(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.isLessThanOrEqual(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(oneDotFive.isLessThanOrEqual(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(oneDotFive.isLessThanOrEqual(Decimal.fromUserInput("1.5", 5))).toEqual(true);
      expect(oneDotFive.isLessThanOrEqual(Decimal.fromUserInput("2", 5))).toEqual(true);
      expect(oneDotFive.isLessThanOrEqual(Decimal.fromUserInput("2.8", 5))).toEqual(true);
      expect(oneDotFive.isLessThanOrEqual(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("throws for different fractional digits", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(() => zero.isLessThanOrEqual(Decimal.fromUserInput("1", 1))).toThrowError(/do not match/i);
      expect(() => zero.isLessThanOrEqual(Decimal.fromUserInput("1", 2))).toThrowError(/do not match/i);
      expect(() => zero.isLessThanOrEqual(Decimal.fromUserInput("1", 3))).toThrowError(/do not match/i);
      expect(() => zero.isLessThanOrEqual(Decimal.fromUserInput("1", 4))).toThrowError(/do not match/i);

      expect(() => zero.isLessThanOrEqual(Decimal.fromUserInput("1", 6))).toThrowError(/do not match/i);
      expect(() => zero.isLessThanOrEqual(Decimal.fromUserInput("1", 7))).toThrowError(/do not match/i);
    });
  });

  describe("isGreaterThan", () => {
    it("returns correct values", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.isGreaterThan(Decimal.fromUserInput("0", 5))).toEqual(false);
      expect(zero.isGreaterThan(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(zero.isGreaterThan(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(zero.isGreaterThan(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(zero.isGreaterThan(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      const one = Decimal.fromUserInput("1", 5);
      expect(one.isGreaterThan(Decimal.fromUserInput("0", 5))).toEqual(true);
      expect(one.isGreaterThan(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(one.isGreaterThan(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(one.isGreaterThan(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(one.isGreaterThan(Decimal.fromUserInput("0.12345", 5))).toEqual(true);

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.isGreaterThan(Decimal.fromUserInput("0", 5))).toEqual(true);
      expect(oneDotFive.isGreaterThan(Decimal.fromUserInput("1", 5))).toEqual(true);
      expect(oneDotFive.isGreaterThan(Decimal.fromUserInput("1.5", 5))).toEqual(false);
      expect(oneDotFive.isGreaterThan(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(oneDotFive.isGreaterThan(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(oneDotFive.isGreaterThan(Decimal.fromUserInput("0.12345", 5))).toEqual(true);

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("throws for different fractional digits", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(() => zero.isGreaterThan(Decimal.fromUserInput("1", 1))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThan(Decimal.fromUserInput("1", 2))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThan(Decimal.fromUserInput("1", 3))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThan(Decimal.fromUserInput("1", 4))).toThrowError(/do not match/i);

      expect(() => zero.isGreaterThan(Decimal.fromUserInput("1", 6))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThan(Decimal.fromUserInput("1", 7))).toThrowError(/do not match/i);
    });
  });

  describe("isGreaterThanOrEqual", () => {
    it("returns correct values", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(zero.isGreaterThanOrEqual(Decimal.fromUserInput("0", 5))).toEqual(true);
      expect(zero.isGreaterThanOrEqual(Decimal.fromUserInput("1", 5))).toEqual(false);
      expect(zero.isGreaterThanOrEqual(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(zero.isGreaterThanOrEqual(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(zero.isGreaterThanOrEqual(Decimal.fromUserInput("0.12345", 5))).toEqual(false);

      const one = Decimal.fromUserInput("1", 5);
      expect(one.isGreaterThanOrEqual(Decimal.fromUserInput("0", 5))).toEqual(true);
      expect(one.isGreaterThanOrEqual(Decimal.fromUserInput("1", 5))).toEqual(true);
      expect(one.isGreaterThanOrEqual(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(one.isGreaterThanOrEqual(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(one.isGreaterThanOrEqual(Decimal.fromUserInput("0.12345", 5))).toEqual(true);

      const oneDotFive = Decimal.fromUserInput("1.5", 5);
      expect(oneDotFive.isGreaterThanOrEqual(Decimal.fromUserInput("0", 5))).toEqual(true);
      expect(oneDotFive.isGreaterThanOrEqual(Decimal.fromUserInput("1", 5))).toEqual(true);
      expect(oneDotFive.isGreaterThanOrEqual(Decimal.fromUserInput("1.5", 5))).toEqual(true);
      expect(oneDotFive.isGreaterThanOrEqual(Decimal.fromUserInput("2", 5))).toEqual(false);
      expect(oneDotFive.isGreaterThanOrEqual(Decimal.fromUserInput("2.8", 5))).toEqual(false);
      expect(oneDotFive.isGreaterThanOrEqual(Decimal.fromUserInput("0.12345", 5))).toEqual(true);

      // original value remain unchanged
      expect(zero.toString()).toEqual("0");
      expect(one.toString()).toEqual("1");
      expect(oneDotFive.toString()).toEqual("1.5");
    });

    it("throws for different fractional digits", () => {
      const zero = Decimal.fromUserInput("0", 5);
      expect(() => zero.isGreaterThanOrEqual(Decimal.fromUserInput("1", 1))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThanOrEqual(Decimal.fromUserInput("1", 2))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThanOrEqual(Decimal.fromUserInput("1", 3))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThanOrEqual(Decimal.fromUserInput("1", 4))).toThrowError(/do not match/i);

      expect(() => zero.isGreaterThanOrEqual(Decimal.fromUserInput("1", 6))).toThrowError(/do not match/i);
      expect(() => zero.isGreaterThanOrEqual(Decimal.fromUserInput("1", 7))).toThrowError(/do not match/i);
    });
  });
});

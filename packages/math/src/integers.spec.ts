import { Int53, Uint32, Uint53, Uint64 } from "./integers";

describe("Integers", () => {
  describe("Uint32", () => {
    describe("fromBytes", () => {
      it("can be constructed from to byte array", () => {
        expect(Uint32.fromBytes([0, 0, 0, 0]).toNumber()).toEqual(0);
        expect(Uint32.fromBytes([0, 0, 0, 1]).toNumber()).toEqual(1);
        expect(Uint32.fromBytes([0, 0, 0, 42]).toNumber()).toEqual(42);
        expect(Uint32.fromBytes([0x3b, 0x9a, 0xca, 0x00]).toNumber()).toEqual(1000000000);
        expect(Uint32.fromBytes([0x7f, 0xff, 0xff, 0xff]).toNumber()).toEqual(2147483647);
        expect(Uint32.fromBytes([0x80, 0x00, 0x00, 0x00]).toNumber()).toEqual(2147483648);
        expect(Uint32.fromBytes([0xff, 0xff, 0xff, 0xff]).toNumber()).toEqual(4294967295);
      });

      it("can be constructed from Buffer", () => {
        expect(Uint32.fromBytes(Buffer.from([0, 0, 0, 0])).toNumber()).toEqual(0);
        expect(Uint32.fromBytes(Buffer.from([0, 0, 0, 1])).toNumber()).toEqual(1);
        expect(Uint32.fromBytes(Buffer.from([0, 0, 0, 42])).toNumber()).toEqual(42);
        expect(Uint32.fromBytes(Buffer.from([0x3b, 0x9a, 0xca, 0x00])).toNumber()).toEqual(1000000000);
        expect(Uint32.fromBytes(Buffer.from([0x7f, 0xff, 0xff, 0xff])).toNumber()).toEqual(2147483647);
        expect(Uint32.fromBytes(Buffer.from([0x80, 0x00, 0x00, 0x00])).toNumber()).toEqual(2147483648);
        expect(Uint32.fromBytes(Buffer.from([0xff, 0xff, 0xff, 0xff])).toNumber()).toEqual(4294967295);
      });

      it("throws for invalid input length", () => {
        expect(() => Uint32.fromBytes([])).toThrowError(/Invalid input length/);
        expect(() => Uint32.fromBytes([0, 0, 0])).toThrowError(/Invalid input length/);
        expect(() => Uint32.fromBytes([0, 0, 0, 0, 0])).toThrowError(/Invalid input length/);
      });

      it("throws for invalid values", () => {
        expect(() => Uint32.fromBytes([0, 0, 0, -1])).toThrowError(/Invalid value in byte/);
        expect(() => Uint32.fromBytes([0, 0, 0, 1.5])).toThrowError(/Invalid value in byte/);
        expect(() => Uint32.fromBytes([0, 0, 0, 256])).toThrowError(/Invalid value in byte/);
        expect(() => Uint32.fromBytes([0, 0, 0, NaN])).toThrowError(/Invalid value in byte/);
        expect(() => Uint32.fromBytes([0, 0, 0, Number.NEGATIVE_INFINITY])).toThrowError(
          /Invalid value in byte/,
        );
        expect(() => Uint32.fromBytes([0, 0, 0, Number.POSITIVE_INFINITY])).toThrowError(
          /Invalid value in byte/,
        );
      });

      it("works for big and little endian", () => {
        const b = Uint32.fromBytes([0x00, 0xa6, 0xb7, 0xd8], "be");
        expect(b.toNumber()).toEqual(0xa6b7d8);

        const l = Uint32.fromBytes([0xa6, 0xb7, 0xd8, 0x00], "le");
        expect(l.toNumber()).toEqual(0xd8b7a6);
      });
    });

    describe("fromString", () => {
      it("can be constructed from string", () => {
        {
          const a = Uint32.fromString("0");
          expect(a.toNumber()).toEqual(0);
        }
        {
          const a = Uint32.fromString("1");
          expect(a.toNumber()).toEqual(1);
        }
        {
          const a = Uint32.fromString("01");
          expect(a.toNumber()).toEqual(1);
        }
        {
          const a = Uint32.fromString("4294967295");
          expect(a.toNumber()).toEqual(4294967295);
        }
      });

      it("throws for invalid string values", () => {
        expect(() => Uint32.fromString(" 1")).toThrowError(/invalid string format/i);
        expect(() => Uint32.fromString("-1")).toThrowError(/invalid string format/i);
        expect(() => Uint32.fromString("+1")).toThrowError(/invalid string format/i);
        expect(() => Uint32.fromString("1e6")).toThrowError(/invalid string format/i);
      });

      it("throws for string values exceeding uint32", () => {
        expect(() => Uint32.fromString("4294967296")).toThrowError(/input not in uint32 range/i);
        expect(() => Uint32.fromString("99999999999999999999")).toThrowError(/input not in uint32 range/i);
      });
    });

    it("can be constructed", () => {
      expect(new Uint32(0)).toBeTruthy();
      expect(new Uint32(1)).toBeTruthy();
      expect(new Uint32(1.0)).toBeTruthy();
      expect(new Uint32(42)).toBeTruthy();
      expect(new Uint32(1000000000)).toBeTruthy();
      expect(new Uint32(2147483647)).toBeTruthy();
      expect(new Uint32(2147483648)).toBeTruthy();
      expect(new Uint32(4294967295)).toBeTruthy();
    });

    it("throws for invald numbers", () => {
      expect(() => new Uint32(NaN)).toThrowError(/not a number/);

      expect(() => new Uint32(1.1)).toThrowError(/not an integer/i);
      expect(() => new Uint32(Number.NEGATIVE_INFINITY)).toThrowError(/not an integer/i);
      expect(() => new Uint32(Number.POSITIVE_INFINITY)).toThrowError(/not an integer/i);
    });

    it("throws for values out of range", () => {
      expect(() => new Uint32(-1)).toThrowError(/not in uint32 range/);
      expect(() => new Uint32(4294967296)).toThrowError(/not in uint32 range/);
      expect(() => new Uint32(Number.MIN_SAFE_INTEGER)).toThrowError(/not in uint32 range/);
      expect(() => new Uint32(Number.MAX_SAFE_INTEGER)).toThrowError(/not in uint32 range/);
    });

    it("can convert to number", () => {
      expect(new Uint32(0).toNumber()).toEqual(0);
      expect(new Uint32(1).toNumber()).toEqual(1);
      expect(new Uint32(42).toNumber()).toEqual(42);
      expect(new Uint32(1000000000).toNumber()).toEqual(1000000000);
      expect(new Uint32(2147483647).toNumber()).toEqual(2147483647);
      expect(new Uint32(2147483648).toNumber()).toEqual(2147483648);
      expect(new Uint32(4294967295).toNumber()).toEqual(4294967295);
    });

    it("can convert to BigInt", () => {
      expect(new Uint32(0).toBigInt()).toEqual(BigInt(0));
      expect(new Uint32(1).toBigInt()).toEqual(BigInt(1));
      expect(new Uint32(42).toBigInt()).toEqual(BigInt(42));
      expect(new Uint32(1000000000).toBigInt()).toEqual(BigInt(1000000000));
      expect(new Uint32(2147483647).toBigInt()).toEqual(BigInt(2147483647));
      expect(new Uint32(2147483648).toBigInt()).toEqual(BigInt(2147483648));
      expect(new Uint32(4294967295).toBigInt()).toEqual(BigInt(4294967295));
    });

    it("can convert to string", () => {
      expect(new Uint32(0).toString()).toEqual("0");
      expect(new Uint32(1).toString()).toEqual("1");
      expect(new Uint32(42).toString()).toEqual("42");
      expect(new Uint32(1000000000).toString()).toEqual("1000000000");
      expect(new Uint32(2147483647).toString()).toEqual("2147483647");
      expect(new Uint32(2147483648).toString()).toEqual("2147483648");
      expect(new Uint32(4294967295).toString()).toEqual("4294967295");
    });

    describe("toBytesBigEndian", () => {
      it("works", () => {
        expect(new Uint32(0).toBytesBigEndian()).toEqual(new Uint8Array([0, 0, 0, 0]));
        expect(new Uint32(1).toBytesBigEndian()).toEqual(new Uint8Array([0, 0, 0, 1]));
        expect(new Uint32(42).toBytesBigEndian()).toEqual(new Uint8Array([0, 0, 0, 42]));
        expect(new Uint32(1000000000).toBytesBigEndian()).toEqual(new Uint8Array([0x3b, 0x9a, 0xca, 0x00]));
        expect(new Uint32(2147483647).toBytesBigEndian()).toEqual(new Uint8Array([0x7f, 0xff, 0xff, 0xff]));
        expect(new Uint32(2147483648).toBytesBigEndian()).toEqual(new Uint8Array([0x80, 0x00, 0x00, 0x00]));
        expect(new Uint32(4294967295).toBytesBigEndian()).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff]));
      });
    });

    describe("toBytesLittleEndian", () => {
      it("works", () => {
        expect(new Uint32(0).toBytesLittleEndian()).toEqual(new Uint8Array([0, 0, 0, 0]));
        expect(new Uint32(1).toBytesLittleEndian()).toEqual(new Uint8Array([1, 0, 0, 0]));
        expect(new Uint32(42).toBytesLittleEndian()).toEqual(new Uint8Array([42, 0, 0, 0]));
        expect(new Uint32(1000000000).toBytesLittleEndian()).toEqual(
          new Uint8Array([0x00, 0xca, 0x9a, 0x3b]),
        );
        expect(new Uint32(2147483647).toBytesLittleEndian()).toEqual(
          new Uint8Array([0xff, 0xff, 0xff, 0x7f]),
        );
        expect(new Uint32(2147483648).toBytesLittleEndian()).toEqual(
          new Uint8Array([0x00, 0x00, 0x00, 0x80]),
        );
        expect(new Uint32(4294967295).toBytesLittleEndian()).toEqual(
          new Uint8Array([0xff, 0xff, 0xff, 0xff]),
        );
      });
    });
  });

  describe("Int53", () => {
    it("can be constructed", () => {
      expect(new Int53(0)).toBeTruthy();
      expect(new Int53(1)).toBeTruthy();
      expect(new Int53(1.0)).toBeTruthy();
      expect(new Int53(42)).toBeTruthy();
      expect(new Int53(1000000000)).toBeTruthy();
      expect(new Int53(2147483647)).toBeTruthy();
      expect(new Int53(2147483648)).toBeTruthy();
      expect(new Int53(4294967295)).toBeTruthy();
      expect(new Int53(9007199254740991)).toBeTruthy();

      expect(new Int53(-1)).toBeTruthy();
      expect(new Int53(-42)).toBeTruthy();
      expect(new Int53(-2147483648)).toBeTruthy();
      expect(new Int53(-2147483649)).toBeTruthy();
      expect(new Int53(-9007199254740991)).toBeTruthy();
    });

    it("throws for invald numbers", () => {
      expect(() => new Int53(NaN)).toThrowError(/not a number/);

      expect(() => new Int53(1.1)).toThrowError(/not an integer/i);
      expect(() => new Int53(Number.NEGATIVE_INFINITY)).toThrowError(/not an integer/i);
      expect(() => new Int53(Number.POSITIVE_INFINITY)).toThrowError(/not an integer/i);
    });

    it("throws for values out of range", () => {
      expect(() => new Int53(Number.MIN_SAFE_INTEGER - 1)).toThrowError(/not in int53 range/);
      expect(() => new Int53(Number.MAX_SAFE_INTEGER + 1)).toThrowError(/not in int53 range/);
    });

    it("can convert to number", () => {
      expect(new Int53(0).toNumber()).toEqual(0);
      expect(new Int53(1).toNumber()).toEqual(1);
      expect(new Int53(42).toNumber()).toEqual(42);
      expect(new Int53(1000000000).toNumber()).toEqual(1000000000);
      expect(new Int53(2147483647).toNumber()).toEqual(2147483647);
      expect(new Int53(2147483648).toNumber()).toEqual(2147483648);
      expect(new Int53(4294967295).toNumber()).toEqual(4294967295);
      expect(new Int53(9007199254740991).toNumber()).toEqual(9007199254740991);

      expect(new Int53(-1).toNumber()).toEqual(-1);
      expect(new Int53(-9007199254740991).toNumber()).toEqual(-9007199254740991);
    });

    it("can convert to BigInt", () => {
      expect(new Int53(0).toBigInt()).toEqual(BigInt(0));
      expect(new Int53(1).toBigInt()).toEqual(BigInt(1));
      expect(new Int53(42).toBigInt()).toEqual(BigInt(42));
      expect(new Int53(1000000000).toBigInt()).toEqual(BigInt(1000000000));
      expect(new Int53(2147483647).toBigInt()).toEqual(BigInt(2147483647));
      expect(new Int53(2147483648).toBigInt()).toEqual(BigInt(2147483648));
      expect(new Int53(4294967295).toBigInt()).toEqual(BigInt(4294967295));
      expect(new Int53(9007199254740991).toBigInt()).toEqual(BigInt(9007199254740991));

      expect(new Int53(-1).toBigInt()).toEqual(BigInt(-1));
      expect(new Int53(-9007199254740991).toBigInt()).toEqual(BigInt(-9007199254740991));
    });

    it("can convert to string", () => {
      expect(new Int53(0).toString()).toEqual("0");
      expect(new Int53(1).toString()).toEqual("1");
      expect(new Int53(42).toString()).toEqual("42");
      expect(new Int53(1000000000).toString()).toEqual("1000000000");
      expect(new Int53(2147483647).toString()).toEqual("2147483647");
      expect(new Int53(2147483648).toString()).toEqual("2147483648");
      expect(new Int53(4294967295).toString()).toEqual("4294967295");
      expect(new Int53(9007199254740991).toString()).toEqual("9007199254740991");

      expect(new Int53(-1).toString()).toEqual("-1");
      expect(new Int53(-9007199254740991).toString()).toEqual("-9007199254740991");
    });

    it("can be constructed from string", () => {
      expect(Int53.fromString("0").toString()).toEqual("0");
      expect(Int53.fromString("1").toString()).toEqual("1");
      expect(Int53.fromString("9007199254740991").toString()).toEqual("9007199254740991");

      expect(Int53.fromString("-1").toString()).toEqual("-1");
      expect(Int53.fromString("-9007199254740991").toString()).toEqual("-9007199254740991");
    });

    it("throws for invalid string format", () => {
      expect(() => Int53.fromString(" 0")).toThrowError(/invalid string format/i);
      expect(() => Int53.fromString("+0")).toThrowError(/invalid string format/i);
      expect(() => Int53.fromString("1e6")).toThrowError(/invalid string format/i);

      expect(() => Int53.fromString("9007199254740992")).toThrowError(/input not in int53 range/i);
      expect(() => Int53.fromString("-9007199254740992")).toThrowError(/input not in int53 range/i);
    });
  });

  describe("Uint53", () => {
    it("can be constructed", () => {
      expect(new Uint53(0)).toBeTruthy();
      expect(new Uint53(1)).toBeTruthy();
      expect(new Uint53(1.0)).toBeTruthy();
      expect(new Uint53(42)).toBeTruthy();
      expect(new Uint53(1000000000)).toBeTruthy();
      expect(new Uint53(2147483647)).toBeTruthy();
      expect(new Uint53(2147483648)).toBeTruthy();
      expect(new Uint53(4294967295)).toBeTruthy();
      expect(new Uint53(9007199254740991)).toBeTruthy();
    });

    it("throws for invald numbers", () => {
      expect(() => new Uint53(NaN)).toThrowError(/not a number/);

      expect(() => new Uint53(1.1)).toThrowError(/not an integer/i);
      expect(() => new Uint53(Number.NEGATIVE_INFINITY)).toThrowError(/not an integer/i);
      expect(() => new Uint53(Number.POSITIVE_INFINITY)).toThrowError(/not an integer/i);
    });

    it("throws for values out of range", () => {
      expect(() => new Uint53(Number.MIN_SAFE_INTEGER - 1)).toThrowError(/not in int53 range/);
      expect(() => new Uint53(Number.MAX_SAFE_INTEGER + 1)).toThrowError(/not in int53 range/);
    });

    it("throws for negative inputs", () => {
      expect(() => new Uint53(-1)).toThrowError(/is negative/);
      expect(() => new Uint53(-42)).toThrowError(/is negative/);
      expect(() => new Uint53(-2147483648)).toThrowError(/is negative/);
      expect(() => new Uint53(-2147483649)).toThrowError(/is negative/);
      expect(() => new Uint53(-9007199254740991)).toThrowError(/is negative/);
    });

    it("can convert to number", () => {
      expect(new Uint53(0).toNumber()).toEqual(0);
      expect(new Uint53(1).toNumber()).toEqual(1);
      expect(new Uint53(42).toNumber()).toEqual(42);
      expect(new Uint53(1000000000).toNumber()).toEqual(1000000000);
      expect(new Uint53(2147483647).toNumber()).toEqual(2147483647);
      expect(new Uint53(2147483648).toNumber()).toEqual(2147483648);
      expect(new Uint53(4294967295).toNumber()).toEqual(4294967295);
      expect(new Uint53(9007199254740991).toNumber()).toEqual(9007199254740991);
    });

    it("can convert to BigInt", () => {
      expect(new Uint53(0).toBigInt()).toEqual(BigInt(0));
      expect(new Uint53(1).toBigInt()).toEqual(BigInt(1));
      expect(new Uint53(42).toBigInt()).toEqual(BigInt(42));
      expect(new Uint53(1000000000).toBigInt()).toEqual(BigInt(1000000000));
      expect(new Uint53(2147483647).toBigInt()).toEqual(BigInt(2147483647));
      expect(new Uint53(2147483648).toBigInt()).toEqual(BigInt(2147483648));
      expect(new Uint53(4294967295).toBigInt()).toEqual(BigInt(4294967295));
      expect(new Uint53(9007199254740991).toBigInt()).toEqual(BigInt(9007199254740991));
    });

    it("can convert to string", () => {
      expect(new Uint53(0).toString()).toEqual("0");
      expect(new Uint53(1).toString()).toEqual("1");
      expect(new Uint53(42).toString()).toEqual("42");
      expect(new Uint53(1000000000).toString()).toEqual("1000000000");
      expect(new Uint53(2147483647).toString()).toEqual("2147483647");
      expect(new Uint53(2147483648).toString()).toEqual("2147483648");
      expect(new Uint53(4294967295).toString()).toEqual("4294967295");
      expect(new Uint53(9007199254740991).toString()).toEqual("9007199254740991");
    });

    it("can be constructed from string", () => {
      expect(Uint53.fromString("0").toString()).toEqual("0");
      expect(Uint53.fromString("1").toString()).toEqual("1");
      expect(Uint53.fromString("9007199254740991").toString()).toEqual("9007199254740991");
    });

    it("throws for invalid string format", () => {
      expect(() => Uint53.fromString(" 0")).toThrowError(/invalid string format/i);
      expect(() => Uint53.fromString("+0")).toThrowError(/invalid string format/i);
      expect(() => Uint53.fromString("1e6")).toThrowError(/invalid string format/i);

      expect(() => Uint53.fromString("-9007199254740992")).toThrowError(/input not in int53 range/i);
      expect(() => Uint53.fromString("9007199254740992")).toThrowError(/input not in int53 range/i);

      expect(() => Uint53.fromString("-1")).toThrowError(/input is negative/i);
    });
  });

  describe("Uint64", () => {
    describe("fromBytes", () => {
      it("can be constructed from bytes", () => {
        Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
        Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
      });

      it("can be constructed from Uint8Array", () => {
        Uint64.fromBytes(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
      });

      it("throws for wrong number of bytes", () => {
        expect(() => Uint64.fromBytes([])).toThrowError(/invalid input length/i);
        expect(() => Uint64.fromBytes([0x00])).toThrowError(/invalid input length/i);
        expect(() => Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])).toThrowError(
          /invalid input length/i,
        );
        expect(() => Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])).toThrowError(
          /invalid input length/i,
        );
      });

      it("throws for wrong byte value", () => {
        expect(() => Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, 256])).toThrowError(/invalid value in byte/i);
        expect(() => Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, -1])).toThrowError(/invalid value in byte/i);
        expect(() => Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, 1.5])).toThrowError(/invalid value in byte/i);
        expect(() => Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, Number.NEGATIVE_INFINITY])).toThrowError(
          /invalid value in byte/i,
        );
        expect(() => Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, Number.POSITIVE_INFINITY])).toThrowError(
          /invalid value in byte/i,
        );
        expect(() => Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, Number.NaN])).toThrowError(
          /invalid value in byte/i,
        );
      });

      it("works for big and little endian", () => {
        const b = Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0xa6, 0xb7, 0xd8], "be");
        expect(b.toNumber()).toEqual(0xa6b7d8);

        const l = Uint64.fromBytes([0xa6, 0xb7, 0xd8, 0x00, 0x00, 0x00, 0x00, 0x00], "le");
        expect(l.toNumber()).toEqual(0xd8b7a6);
      });
    });

    describe("fromString", () => {
      it("can be constructed from string", () => {
        {
          const a = Uint64.fromString("0");
          expect(a).toBeTruthy();
        }
        {
          const a = Uint64.fromString("1");
          expect(a).toBeTruthy();
        }
        {
          const a = Uint64.fromString("01");
          expect(a).toBeTruthy();
        }
        {
          const a = Uint64.fromString("9999999999999999999");
          expect(a).toBeTruthy();
        }
        {
          const a = Uint64.fromString("18446744073709551615");
          expect(a).toBeTruthy();
        }
      });

      it("throws for invalid string values", () => {
        expect(() => Uint64.fromString(" 1")).toThrowError(/invalid string format/i);
        expect(() => Uint64.fromString("-1")).toThrowError(/invalid string format/i);
        expect(() => Uint64.fromString("+1")).toThrowError(/invalid string format/i);
        expect(() => Uint64.fromString("1e6")).toThrowError(/invalid string format/i);
      });

      it("throws for string values exceeding uint64", () => {
        expect(() => Uint64.fromString("18446744073709551616")).toThrowError(/input exceeds uint64 range/i);
        expect(() => Uint64.fromString("99999999999999999999")).toThrowError(/input exceeds uint64 range/i);
      });
    });

    describe("fromNumber", () => {
      it("can be constructed from number", () => {
        const a = Uint64.fromNumber(0);
        expect(a.toNumber()).toEqual(0);
        const b = Uint64.fromNumber(1);
        expect(b.toNumber()).toEqual(1);
        const c = Uint64.fromNumber(Number.MAX_SAFE_INTEGER);
        expect(c.toNumber()).toEqual(Number.MAX_SAFE_INTEGER);
      });

      it("throws when constructed from wrong numbers", () => {
        // not a number
        expect(() => Uint64.fromNumber(Number.NaN)).toThrowError(/input is not a number/i);

        // not an integer
        expect(() => Uint64.fromNumber(1.1)).toThrowError(/input is not an integer/i);
        expect(() => Uint64.fromNumber(Number.NEGATIVE_INFINITY)).toThrowError(/input is not an integer/i);
        expect(() => Uint64.fromNumber(Number.POSITIVE_INFINITY)).toThrowError(/input is not an integer/i);

        // not a safe integer
        expect(() => Uint64.fromNumber(Number.MAX_SAFE_INTEGER + 1)).toThrowError(
          /input is not a safe integer/i,
        );

        // negative integer
        expect(() => Uint64.fromNumber(-1)).toThrowError(/input is negative/i);
        expect(() => Uint64.fromNumber(Number.MIN_SAFE_INTEGER)).toThrowError(/input is negative/i);
      });
    });

    it("can export bytes (big endian)", () => {
      expect(Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesBigEndian()).toEqual(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
      );
      expect(Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]).toBytesBigEndian()).toEqual(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]),
      );
      expect(Uint64.fromBytes([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesBigEndian()).toEqual(
        new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
      );
      expect(Uint64.fromBytes([0xab, 0x22, 0xbc, 0x5f, 0xa9, 0x20, 0x4e, 0x0d]).toBytesBigEndian()).toEqual(
        new Uint8Array([0xab, 0x22, 0xbc, 0x5f, 0xa9, 0x20, 0x4e, 0x0d]),
      );
      expect(Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).toBytesBigEndian()).toEqual(
        new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
      );
    });

    it("can export bytes (little endian)", () => {
      expect(
        Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesLittleEndian(),
      ).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
      expect(
        Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]).toBytesLittleEndian(),
      ).toEqual(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
      expect(
        Uint64.fromBytes([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesLittleEndian(),
      ).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]));
      expect(
        Uint64.fromBytes([0xab, 0x22, 0xbc, 0x5f, 0xa9, 0x20, 0x4e, 0x0d]).toBytesLittleEndian(),
      ).toEqual(new Uint8Array([0x0d, 0x4e, 0x20, 0xa9, 0x5f, 0xbc, 0x22, 0xab]));
      expect(
        Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).toBytesLittleEndian(),
      ).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]));
    });

    it("can export strings", () => {
      {
        const a = Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect(a.toString()).toEqual("0");
      }
      {
        const a = Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
        expect(a.toString()).toEqual("1");
      }
      {
        const a = Uint64.fromBytes([0x8a, 0xc7, 0x23, 0x04, 0x89, 0xe7, 0xff, 0xff]);
        expect(a.toString()).toEqual("9999999999999999999");
      }
      {
        const a = Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect(a.toString()).toEqual("18446744073709551615");
      }
    });

    it("can export numbers", () => {
      {
        const a = Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect(a.toNumber()).toEqual(0);
      }
      {
        const a = Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
        expect(a.toNumber()).toEqual(1);
      }
      {
        // value too large for 53 bit integer
        const a = Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect(() => a.toNumber()).toThrowError(/number can only safely store up to 53 bits/i);
      }
      {
        // Number.MAX_SAFE_INTEGER + 1
        const a = Uint64.fromBytes([0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect(() => a.toNumber()).toThrowError(/number can only safely store up to 53 bits/i);
      }
    });

    it("can export to BigInt", () => {
      const a = Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
      expect(a.toBigInt()).toEqual(BigInt(0));

      const b = Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
      expect(b.toBigInt()).toEqual(BigInt(1));

      // value too large for 53 bit integer
      const c = Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
      expect(c.toBigInt()).toEqual(BigInt("0xffffffffffffffff"));

      // Number.MAX_SAFE_INTEGER + 1
      const d = Uint64.fromBytes([0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
      expect(d.toBigInt()).toEqual(BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1));
    });
  });
});

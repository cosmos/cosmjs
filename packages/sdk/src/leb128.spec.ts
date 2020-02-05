import { Encoding } from "@iov/encoding";

const { fromHex } = Encoding;

export function leb128Encode(uint: number): Uint8Array {
  if (uint < 0) throw new Error("Only non-negative values supported");
  if (uint > 0x7fffffff) throw new Error("Only values in signed int32 range allowed");
  const out = new Array<number>();
  let value = uint;
  do {
    // tslint:disable: no-bitwise
    let byte = value & 0b01111111;
    value >>= 7;

    // more bytes to come: set high order bit of byte
    if (value !== 0) byte ^= 0b10000000;

    out.push(byte);
    // tslint:enable: no-bitwise
  } while (value !== 0);
  return new Uint8Array(out);
}

describe("leb128", () => {
  describe("leb128Encode", () => {
    it("works for single byte values", () => {
      // Values in 7 bit range are encoded as one byte
      expect(leb128Encode(0)).toEqual(fromHex("00"));
      expect(leb128Encode(20)).toEqual(fromHex("14"));
      expect(leb128Encode(127)).toEqual(fromHex("7f"));
    });

    it("works for multi byte values", () => {
      // from external souce (wasm-objdump)
      expect(leb128Encode(145)).toEqual(fromHex("9101"));
      expect(leb128Encode(1539)).toEqual(fromHex("830c"));
    });
  });
});

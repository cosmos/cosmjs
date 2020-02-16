import { Random } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";

import hackatom from "./testdata/contract.json";

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

export function getRandomizedHackatom(): Uint8Array {
  const data = Encoding.fromBase64(hackatom.data);
  // The return value of the export function cosmwasm_api_0_6 is unused and
  // can be randomized for testing.
  //
  // Find position of mutable bytes as follows:
  // $ wasm-objdump -d contract.wasm | grep -F "cosmwasm_api_0_6" -A 1
  // 00e67c func[149] <cosmwasm_api_0_6>:
  // 00e67d: 41 83 0c                   | i32.const 1539
  //
  // In the last line, the addresses 00e67d-00e67f hold a one byte instruction
  // (https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#constants-described-here)
  // and a two byte value (leb128 encoded 1539)

  // Any unsigned integer from 128 to 16383 is encoded to two leb128 bytes
  const min = 128;
  const max = 16383;
  const random = Math.floor(Math.random() * (max - min)) + min;
  const bytes = leb128Encode(random);

  data[0x00e67d + 1] = bytes[0];
  data[0x00e67d + 2] = bytes[1];

  return data;
}

export function makeRandomAddress(): string {
  return Bech32.encode("cosmos", Random.getBytes(20));
}

export const tendermintIdMatcher = /^[0-9A-F]{64}$/;

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

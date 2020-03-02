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
    // eslint-disable-next-line no-bitwise
    let byte = value & 0b01111111;
    // eslint-disable-next-line no-bitwise
    value >>= 7;

    // more bytes to come: set high order bit of byte
    // eslint-disable-next-line no-bitwise
    if (value !== 0) byte ^= 0b10000000;

    out.push(byte);
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
  // 0136d2 func[198] <cosmwasm_api_0_6>:
  //  0136d3: 41 83 0c                   | i32.const 1539
  //
  // In the last line, the addresses [0136d3, 0136d3+1, 0136d3+2] hold a one byte instruction
  // and a two byte value (leb128 encoded 1539). See also
  // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#constants-described-here.

  // Any unsigned integer from 128 to 16383 is encoded to two leb128 bytes
  const min = 128;
  const max = 16383;
  const random = Math.floor(Math.random() * (max - min)) + min;
  const bytes = leb128Encode(random);

  data[0x0136d3 + 1] = bytes[0];
  data[0x0136d3 + 2] = bytes[1];

  return data;
}

export function makeRandomAddress(): string {
  return Bech32.encode("cosmos", Random.getBytes(20));
}

export const tendermintIdMatcher = /^[0-9A-F]{64}$/;
export const tendermintOptionalIdMatcher = /^([0-9A-F]{64}|)$/;
export const tendermintAddressMatcher = /^[0-9A-F]{40}$/;

// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
export const bech32AddressMatcher = /^[\x21-\x7e]{1,83}1[02-9ac-hj-np-z]{38}$/;

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedErc20 = {
  codeId: 1,
  source: "https://crates.io/api/v1/crates/cw-erc20/0.2.0/download",
  builder: "confio/cosmwasm-opt:0.7.0",
  checksum: "aff8c8873d79d2153a8b9066a0683fec3c903669267eb806ffa831dcd4b3daae",
  instances: [
    "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5", // HASH
    "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd", // ISA
    "cosmos18r5szma8hm93pvx6lwpjwyxruw27e0k5uw835c", // JADE
  ],
};

export function wasmdEnabled(): boolean {
  return !!process.env.WASMD_ENABLED;
}

export function pendingWithoutWasmd(): void {
  if (!wasmdEnabled()) {
    return pending("Set WASMD_ENABLED to enable Wasmd based tests");
  }
}

/** Returns first element. Throws if array has a different length than 1. */
export function fromOneElementArray<T>(elements: ArrayLike<T>): T {
  if (elements.length !== 1) throw new Error(`Expected exactly one element but got ${elements.length}`);
  return elements[0];
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

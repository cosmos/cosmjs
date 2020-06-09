import { fromHex, toHex } from "./hex";

describe("fromHex", () => {
  it("works", () => {
    // simple
    expect(fromHex("")).toEqual(new Uint8Array([]));
    expect(fromHex("00")).toEqual(new Uint8Array([0x00]));
    expect(fromHex("01")).toEqual(new Uint8Array([0x01]));
    expect(fromHex("10")).toEqual(new Uint8Array([0x10]));
    expect(fromHex("11")).toEqual(new Uint8Array([0x11]));
    expect(fromHex("112233")).toEqual(new Uint8Array([0x11, 0x22, 0x33]));
    expect(fromHex("0123456789abcdef")).toEqual(
      new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]),
    );

    // capital letters
    expect(fromHex("AA")).toEqual(new Uint8Array([0xaa]));
    expect(fromHex("aAbBcCdDeEfF")).toEqual(new Uint8Array([0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff]));

    // error
    expect(() => fromHex("a")).toThrow();
    expect(() => fromHex("aaa")).toThrow();
    expect(() => fromHex("a!")).toThrow();
    expect(() => fromHex("a ")).toThrow();
    expect(() => fromHex("aa ")).toThrow();
    expect(() => fromHex(" aa")).toThrow();
    expect(() => fromHex("a a")).toThrow();
    expect(() => fromHex("gg")).toThrow();
  });
});

describe("toHex", () => {
  it("works", () => {
    expect(toHex(new Uint8Array([]))).toEqual("");
    expect(toHex(new Uint8Array([0x00]))).toEqual("00");
    expect(toHex(new Uint8Array([0x01]))).toEqual("01");
    expect(toHex(new Uint8Array([0x10]))).toEqual("10");
    expect(toHex(new Uint8Array([0x11]))).toEqual("11");
    expect(toHex(new Uint8Array([0x11, 0x22, 0x33]))).toEqual("112233");
    expect(toHex(new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]))).toEqual(
      "0123456789abcdef",
    );
  });
});

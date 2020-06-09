import { fromAscii, toAscii } from "./ascii";

describe("ascii", () => {
  it("encodes to ascii", () => {
    expect(toAscii("")).toEqual(new Uint8Array([]));
    expect(toAscii("abc")).toEqual(new Uint8Array([0x61, 0x62, 0x63]));
    expect(toAscii(" ?=-n|~+-*/\\")).toEqual(
      new Uint8Array([0x20, 0x3f, 0x3d, 0x2d, 0x6e, 0x7c, 0x7e, 0x2b, 0x2d, 0x2a, 0x2f, 0x5c]),
    );

    expect(() => toAscii("ö")).toThrow();
    expect(() => toAscii("ß")).toThrow();
  });

  it("decodes from ascii", () => {
    expect(fromAscii(new Uint8Array([]))).toEqual("");
    expect(fromAscii(new Uint8Array([0x61, 0x62, 0x63]))).toEqual("abc");
    expect(
      fromAscii(new Uint8Array([0x20, 0x3f, 0x3d, 0x2d, 0x6e, 0x7c, 0x7e, 0x2b, 0x2d, 0x2a, 0x2f, 0x5c])),
    ).toEqual(" ?=-n|~+-*/\\");

    expect(() => fromAscii(new Uint8Array([0x00]))).toThrow();
    expect(() => fromAscii(new Uint8Array([0x7f]))).toThrow();
    expect(() => fromAscii(new Uint8Array([0xff]))).toThrow();
  });
});

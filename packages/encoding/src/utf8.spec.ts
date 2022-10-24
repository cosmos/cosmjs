import { toAscii } from "./ascii";
import { fromUtf8, toUtf8 } from "./utf8";

describe("utf8", () => {
  it("encodes ascii strings", () => {
    expect(toUtf8("")).toEqual(new Uint8Array([]));
    expect(toUtf8("abc")).toEqual(new Uint8Array([0x61, 0x62, 0x63]));
    expect(toUtf8(" ?=-n|~+-*/\\")).toEqual(
      new Uint8Array([0x20, 0x3f, 0x3d, 0x2d, 0x6e, 0x7c, 0x7e, 0x2b, 0x2d, 0x2a, 0x2f, 0x5c]),
    );
  });

  it("decodes ascii string", () => {
    expect(fromUtf8(new Uint8Array([]))).toEqual("");
    expect(fromUtf8(new Uint8Array([0x61, 0x62, 0x63]))).toEqual("abc");
    expect(
      fromUtf8(new Uint8Array([0x20, 0x3f, 0x3d, 0x2d, 0x6e, 0x7c, 0x7e, 0x2b, 0x2d, 0x2a, 0x2f, 0x5c])),
    ).toEqual(" ?=-n|~+-*/\\");
  });

  it("encodes null character", () => {
    expect(toUtf8("\u0000")).toEqual(new Uint8Array([0x00]));
  });

  it("decodes null byte", () => {
    expect(fromUtf8(new Uint8Array([0x00]))).toEqual("\u0000");
  });

  it("encodes Basic Multilingual Plane strings", () => {
    expect(toUtf8("ö")).toEqual(new Uint8Array([0xc3, 0xb6]));
    expect(toUtf8("¥")).toEqual(new Uint8Array([0xc2, 0xa5]));
    expect(toUtf8("Ф")).toEqual(new Uint8Array([0xd0, 0xa4]));
    expect(toUtf8("ⱴ")).toEqual(new Uint8Array([0xe2, 0xb1, 0xb4]));
    expect(toUtf8("ⵘ")).toEqual(new Uint8Array([0xe2, 0xb5, 0x98]));
  });

  it("decodes Basic Multilingual Plane strings", () => {
    expect(fromUtf8(new Uint8Array([0xc3, 0xb6]))).toEqual("ö");
    expect(fromUtf8(new Uint8Array([0xc2, 0xa5]))).toEqual("¥");
    expect(fromUtf8(new Uint8Array([0xd0, 0xa4]))).toEqual("Ф");
    expect(fromUtf8(new Uint8Array([0xe2, 0xb1, 0xb4]))).toEqual("ⱴ");
    expect(fromUtf8(new Uint8Array([0xe2, 0xb5, 0x98]))).toEqual("ⵘ");
  });

  it("encodes Supplementary Multilingual Plane strings", () => {
    // U+1F0A1
    expect(toUtf8("🂡")).toEqual(new Uint8Array([0xf0, 0x9f, 0x82, 0xa1]));
    // U+1034A
    expect(toUtf8("𐍊")).toEqual(new Uint8Array([0xf0, 0x90, 0x8d, 0x8a]));
  });

  it("decodes Supplementary Multilingual Plane strings", () => {
    // U+1F0A1
    expect(fromUtf8(new Uint8Array([0xf0, 0x9f, 0x82, 0xa1]))).toEqual("🂡");
    // U+1034A
    expect(fromUtf8(new Uint8Array([0xf0, 0x90, 0x8d, 0x8a]))).toEqual("𐍊");
  });

  it("throws on invalid utf8 bytes", () => {
    // Broken UTF8 example from https://github.com/nodejs/node/issues/16894
    expect(() => fromUtf8(new Uint8Array([0xf0, 0x80, 0x80]))).toThrow();
  });

  describe("fromUtf8", () => {
    it("replaces characters in lossy mode", () => {
      expect(fromUtf8(new Uint8Array([]), true)).toEqual("");
      expect(fromUtf8(new Uint8Array([0x61, 0x62, 0x63]), true)).toEqual("abc");
      // Example from https://doc.rust-lang.org/stable/std/string/struct.String.html#method.from_utf8_lossy
      expect(
        fromUtf8(new Uint8Array([...toAscii("Hello "), 0xf0, 0x90, 0x80, ...toAscii("World")]), true),
      ).toEqual("Hello �World");
    });
  });
});

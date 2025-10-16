import { fromBase64, toBase64 } from "./base64";

describe("base64", () => {
  it("encodes to base64", () => {
    expect(toBase64(new Uint8Array([]))).toEqual("");
    expect(toBase64(new Uint8Array([0x00]))).toEqual("AA==");
    expect(toBase64(new Uint8Array([0x00, 0x00]))).toEqual("AAA=");
    expect(toBase64(new Uint8Array([0x00, 0x00, 0x00]))).toEqual("AAAA");
    expect(toBase64(new Uint8Array([0x00, 0x00, 0x00, 0x00]))).toEqual("AAAAAA==");
    expect(toBase64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00]))).toEqual("AAAAAAA=");
    expect(toBase64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))).toEqual("AAAAAAAA");
    expect(toBase64(new Uint8Array([0x61]))).toEqual("YQ==");
    expect(toBase64(new Uint8Array([0x62]))).toEqual("Yg==");
    expect(toBase64(new Uint8Array([0x63]))).toEqual("Yw==");
    expect(toBase64(new Uint8Array([0x61, 0x62, 0x63]))).toEqual("YWJj");
  });

  it("decodes from base64", () => {
    expect(fromBase64("")).toEqual(new Uint8Array([]));
    expect(fromBase64("AA==")).toEqual(new Uint8Array([0x00]));
    expect(fromBase64("AAA=")).toEqual(new Uint8Array([0x00, 0x00]));
    expect(fromBase64("AAAA")).toEqual(new Uint8Array([0x00, 0x00, 0x00]));
    expect(fromBase64("AAAAAA==")).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    expect(fromBase64("AAAAAAA=")).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00]));
    expect(fromBase64("AAAAAAAA")).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
    expect(fromBase64("YQ==")).toEqual(new Uint8Array([0x61]));
    expect(fromBase64("Yg==")).toEqual(new Uint8Array([0x62]));
    expect(fromBase64("Yw==")).toEqual(new Uint8Array([0x63]));
    expect(fromBase64("YWJj")).toEqual(new Uint8Array([0x61, 0x62, 0x63]));

    // invalid length
    expect(() => fromBase64("a")).toThrow();
    expect(() => fromBase64("aa")).toThrow();
    expect(() => fromBase64("aaa")).toThrow();

    // proper length including invalid character
    expect(() => fromBase64("aaa!")).toThrow();
    expect(() => fromBase64("aaa*")).toThrow();
    expect(() => fromBase64("aaaä")).toThrow();

    // proper length plus invalid character
    expect(() => fromBase64("aaaa!")).toThrow();
    expect(() => fromBase64("aaaa*")).toThrow();
    expect(() => fromBase64("aaaaä")).toThrow();

    // extra spaces
    expect(() => fromBase64("aaaa ")).toThrow();
    expect(() => fromBase64(" aaaa")).toThrow();
    expect(() => fromBase64("aa aa")).toThrow();
    expect(() => fromBase64("aaaa\n")).toThrow();
    expect(() => fromBase64("\naaaa")).toThrow();
    expect(() => fromBase64("aa\naa")).toThrow();

    // position of =
    expect(() => fromBase64("=aaa")).toThrow();
    expect(() => fromBase64("==aa")).toThrow();

    // concatenated base64 strings should not be supported
    // see https://github.com/beatgammit/base64-js/issues/42
    expect(() => fromBase64("AAA=AAA=")).toThrow();

    // wrong number of =
    expect(() => fromBase64("a===")).toThrow();
  });

  it("passes ChALkeR tests", () => {
    // From https://github.com/paulmillr/scure-base/issues/42, potentially containing duplicates
    // with above but just copy/pasted for the sake of checking the documented issue.
    // The non-strict case is disabled (see test below)
    const invalid = [
      "====", // excessive padding
      "aQ=", // incomplete padding
      "aQ===", // excessive padding
      "aaaa====", // excessive padding
      "a", // invalid group of length 1
      "a===", // invalid group of length 1, padded
      "a==", // invalid group of length 1 + incomplete padding
      "aaaaa", // invalid group of length 1 after group of length 4
      // "aa==", // non-strict, should be aQ==
    ];
    for (const input of invalid) {
      expect(() => fromBase64(input), `invalid input: '${input}'`).toThrow();
    }
  });

  it("decodes non-strict base64", () => {
    // There is currently no good reason to allow or forbid non-canonical base64 encodings. But since the library
    // always behaved like this, we better do not silently change behaviour.
    const data = fromBase64("aa==");
    expect(toBase64(data)).toEqual("aQ==");
  });
});

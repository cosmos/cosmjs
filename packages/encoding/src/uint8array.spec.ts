import { fixUint8Array } from "./uint8array.ts";

// Turned off in Chrome without secure context
const hasSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined";

describe("fixUint8Array", () => {
  it("works for Uint8Array<ArrayBuffer>", () => {
    const input: Uint8Array<ArrayBuffer> = Uint8Array.of(1, 2, 255);
    const fixed = fixUint8Array(input);
    expect(fixed).toEqual(input);
    expect(fixed.buffer).toBeInstanceOf(ArrayBuffer);
    expect(fixed.buffer).toBe(input.buffer); // no copy must be performed in this case
  });

  it("works for Uint8Array<ArrayBuffer> where data is not using all of the buffer", () => {
    const buffer = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a]).buffer;
    expect(buffer.byteLength).toEqual(11);
    const original = new Uint8Array(buffer, 1, 5);

    const fixed = fixUint8Array(original);
    expect(fixed.length).toEqual(5);
    expect(fixed).toEqual(new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]));
    expect(fixed.buffer).toBe(buffer); // no copy must be performed in this case
  });

  (hasSharedArrayBuffer ? it : xit)("works for Uint8Array<SharedArrayBuffer>", () => {
    const sharedBuffer = new SharedArrayBuffer(8);
    const input: Uint8Array<SharedArrayBuffer> = new Uint8Array(sharedBuffer);
    const fixed = fixUint8Array(input);
    expect(fixed).toEqual(input);
    expect(fixed.buffer).toBeInstanceOf(ArrayBuffer);
  });

  (hasSharedArrayBuffer ? it : xit)(
    "works for Uint8Array<SharedArrayBuffer> where data is not using all of the buffer",
    () => {
      const sharedBuffer = new SharedArrayBuffer(8);
      const input: Uint8Array<SharedArrayBuffer> = new Uint8Array(sharedBuffer, 0, 3);
      input[0] = 0xaa;
      input[1] = 0xbb;
      input[2] = 0xcc;
      const fixed = fixUint8Array(input);
      expect(fixed.buffer).toBeInstanceOf(ArrayBuffer);
      expect(fixed.length).toEqual(3);
      expect(fixed).toEqual(new Uint8Array([0xaa, 0xbb, 0xcc]));
    },
  );
});

import { fixUint8Array } from "./uint8array";

describe("fixUint8Array", () => {
  it("works for Uint8Array<ArrayBuffer>", () => {
    const input: Uint8Array<ArrayBuffer> = Uint8Array.of(1, 2, 255);
    const fixed = fixUint8Array(input);
    expect(fixed).toEqual(input);
    expect(fixed.buffer).toBeInstanceOf(ArrayBuffer);
    expect(fixed.buffer).toBe(input.buffer); // no copy must be performed in this case
  });

  it("works for Uint8Array<SharedArrayBuffer>", () => {
    const sharedBuffer = new SharedArrayBuffer(8);
    const input: Uint8Array<SharedArrayBuffer> = new Uint8Array(sharedBuffer);
    const fixed = fixUint8Array(input);
    expect(fixed).toEqual(input);
    expect(fixed.buffer).toBeInstanceOf(ArrayBuffer);
  });
});

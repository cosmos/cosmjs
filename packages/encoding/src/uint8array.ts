/**
 * Safely converts a Uint8Array<T> or Uint8Array into a
 * Uint8Array<ArrayBuffer>, often without a copy at runtime.
 *
 * @see https://github.com/paulmillr/scure-base/issues/53
 */
export function fixUint8Array<T extends ArrayBufferLike>(source: Uint8Array<T>): Uint8Array<ArrayBuffer> {
  const buffer = source.buffer;
  if (buffer instanceof ArrayBuffer) {
    return new Uint8Array(buffer, source.byteOffset, source.length); // new instance just to make TS happy without unsafe cast
  }

  const copy = new ArrayBuffer(source.byteLength); // allocate memory
  const out = new Uint8Array(copy);
  out.set(source); // copy data
  return out;
}

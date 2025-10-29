// See https://stackoverflow.com/q/79803845/2013738 for why this is needed
function isUint8ArrayOfArrayBuffer(source: Uint8Array): source is Uint8Array<ArrayBuffer> {
  return source.buffer instanceof ArrayBuffer;
}

/**
 * Safely converts a Uint8Array<T> or Uint8Array into a
 * Uint8Array<ArrayBuffer>, often without a copy at runtime.
 *
 * @see https://github.com/paulmillr/scure-base/issues/53
 */
export function fixUint8Array(source: Uint8Array<ArrayBuffer> | Uint8Array): Uint8Array<ArrayBuffer> {
  if (isUint8ArrayOfArrayBuffer(source)) return source;
  const copy = new ArrayBuffer(source.byteLength); // allocate memory
  const out = new Uint8Array(copy);
  out.set(source); // copy data
  return out;
}

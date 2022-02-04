// See https://github.com/paulmillr/noble-hashes/issues/25 for why this is needed
export function toRealUint8Array(data: ArrayLike<number>): Uint8Array {
  if (data instanceof Uint8Array) return data;
  else return Uint8Array.from(data);
}

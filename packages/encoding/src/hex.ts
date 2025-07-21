function* map<T, U>(iterable: Iterable<T>, fn: (value: T) => U): IterableIterator<U> {
  for (const value of iterable) {
    yield fn(value);
  }
}

export function toHex(data: Uint8Array): string {
  return Array.from(map(data.values(), (byte) => byte.toString(16).padStart(2, "0"))).join("");
}

export function fromHex(hexstring: string): Uint8Array {
  if (hexstring.length % 2 !== 0) {
    throw new Error("hex string length must be a multiple of 2");
  }

  const out = new Uint8Array(hexstring.length / 2);
  for (let i = 0; i < out.length; i++) {
    const j = 2 * i;
    const hexByteAsString = hexstring.slice(j, j + 2);
    if (!hexByteAsString.match(/[0-9a-f]{2}/i)) {
      throw new Error("hex string contains invalid characters");
    }
    out[i] = parseInt(hexByteAsString, 16);
  }
  return out;
}

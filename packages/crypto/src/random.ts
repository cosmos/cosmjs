export class Random {
  /**
   * Returns `count` cryptographically secure random bytes
   */
  public static getBytes(count: number): Uint8Array<ArrayBuffer> {
    const out = new Uint8Array(count);
    globalThis.crypto.getRandomValues(out);
    return out;
  }
}

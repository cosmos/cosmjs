declare const window: any;
declare const self: any;

export class Random {
  /**
   * Returns `count` cryptographically secure random bytes
   */
  public static getBytes(count: number): Uint8Array {
    try {
      const globalObject = typeof window === "object" ? window : self;
      const cryptoApi =
        typeof globalObject.crypto !== "undefined" ? globalObject.crypto : globalObject.msCrypto;

      const out = new Uint8Array(count);
      cryptoApi.getRandomValues(out);
      return out;
    } catch {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const crypto = require("crypto");
        return new Uint8Array([...crypto.randomBytes(count)]);
      } catch {
        throw new Error("No secure random number generator found");
      }
    }
  }
}

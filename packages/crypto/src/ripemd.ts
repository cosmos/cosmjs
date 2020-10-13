import RIPEMD160 from "ripemd160";

import { HashFunction } from "./hash";

export class Ripemd160 implements HashFunction {
  public readonly blockSize = 512 / 8;

  private readonly impl = new RIPEMD160();

  public constructor(firstData?: Uint8Array) {
    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): Ripemd160 {
    this.impl.update(Buffer.from(data));
    return this;
  }

  public digest(): Uint8Array {
    return Uint8Array.from(this.impl.digest());
  }
}

/** Convenience function equivalent to `new Ripemd160(data).digest()` */
export function ripemd160(data: Uint8Array): Uint8Array {
  return new Ripemd160(data).digest();
}

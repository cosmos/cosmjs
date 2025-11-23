import { fixUint8Array } from "@cosmjs/encoding";
import { ripemd160 as nobleRipemd160 } from "@noble/hashes/legacy.js";

import { HashFunction } from "./hash";
import { toRealUint8Array } from "./utils";

export class Ripemd160 implements HashFunction {
  public readonly blockSize = 512 / 8;

  private readonly impl = nobleRipemd160.create();

  public constructor(firstData?: Uint8Array) {
    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): this {
    this.impl.update(toRealUint8Array(data));
    return this;
  }

  public digest(): Uint8Array<ArrayBuffer> {
    return fixUint8Array(this.impl.digest());
  }
}

/** Convenience function equivalent to `new Ripemd160(data).digest()` */
export function ripemd160(data: Uint8Array): Uint8Array<ArrayBuffer> {
  return new Ripemd160(data).digest();
}

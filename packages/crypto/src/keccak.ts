import { fixUint8Array } from "@cosmjs/encoding";
import { keccak_256 } from "@noble/hashes/sha3.js";

import { HashFunction } from "./hash";
import { toRealUint8Array } from "./utils";

export class Keccak256 implements HashFunction {
  public readonly blockSize = 512 / 8;

  private readonly impl = keccak_256.create();

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

/** Convenience function equivalent to `new Keccak256(data).digest()` */
export function keccak256(data: Uint8Array): Uint8Array<ArrayBuffer> {
  return new Keccak256(data).digest();
}

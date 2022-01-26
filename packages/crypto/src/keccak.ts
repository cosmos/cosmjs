import { keccak_256 } from "@noble/hashes/sha3";

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

  public update(data: Uint8Array): Keccak256 {
    this.impl.update(toRealUint8Array(data));
    return this;
  }

  public digest(): Uint8Array {
    return this.impl.digest();
  }
}

/** Convenience function equivalent to `new Keccak256(data).digest()` */
export function keccak256(data: Uint8Array): Uint8Array {
  return new Keccak256(data).digest();
}

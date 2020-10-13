import jssha3 from "js-sha3";

import { HashFunction } from "./hash";

export class Keccak256 implements HashFunction {
  public readonly blockSize = 512 / 8;

  private readonly impl: jssha3.Hasher;

  public constructor(firstData?: Uint8Array) {
    this.impl = jssha3.keccak256.create();

    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): Keccak256 {
    this.impl.update(data);
    return this;
  }

  public digest(): Uint8Array {
    return new Uint8Array(this.impl.digest());
  }
}

/** Convenience function equivalent to `new Keccak256(data).digest()` */
export function keccak256(data: Uint8Array): Uint8Array {
  return new Keccak256(data).digest();
}

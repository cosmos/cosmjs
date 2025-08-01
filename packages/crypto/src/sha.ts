import { sha256 as nobleSha256, sha512 as nobleSha512 } from "@noble/hashes/sha2.js";

import { HashFunction } from "./hash";
import { toRealUint8Array } from "./utils";

export class Sha256 implements HashFunction {
  public readonly blockSize = 512 / 8;

  private readonly impl = nobleSha256.create();

  public constructor(firstData?: Uint8Array) {
    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): this {
    this.impl.update(toRealUint8Array(data));
    return this;
  }

  public digest(): Uint8Array {
    return this.impl.digest();
  }
}

/** Convenience function equivalent to `new Sha256(data).digest()` */
export function sha256(data: Uint8Array): Uint8Array {
  return new Sha256(data).digest();
}

export class Sha512 implements HashFunction {
  public readonly blockSize = 1024 / 8;

  private readonly impl = nobleSha512.create();

  public constructor(firstData?: Uint8Array) {
    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): this {
    this.impl.update(toRealUint8Array(data));
    return this;
  }

  public digest(): Uint8Array {
    return this.impl.digest();
  }
}

/** Convenience function equivalent to `new Sha512(data).digest()` */
export function sha512(data: Uint8Array): Uint8Array {
  return new Sha512(data).digest();
}

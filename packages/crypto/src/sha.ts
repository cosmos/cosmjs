import { Hash } from "crypto";
import shajs from "sha.js";

import { HashFunction } from "./hash";

export class Sha1 implements HashFunction {
  public readonly blockSize = 512 / 8;

  private readonly impl: Hash;

  public constructor(firstData?: Uint8Array) {
    this.impl = shajs("sha1");

    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): Sha1 {
    this.impl.update(data);
    return this;
  }

  public digest(): Uint8Array {
    return new Uint8Array(this.impl.digest());
  }
}

/** Convenience function equivalent to `new Sha1(data).digest()` */
export function sha1(data: Uint8Array): Uint8Array {
  return new Sha1(data).digest();
}

export class Sha256 implements HashFunction {
  public readonly blockSize = 512 / 8;

  private readonly impl: Hash;

  public constructor(firstData?: Uint8Array) {
    this.impl = shajs("sha256");

    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): Sha256 {
    this.impl.update(data);
    return this;
  }

  public digest(): Uint8Array {
    return new Uint8Array(this.impl.digest());
  }
}

/** Convenience function equivalent to `new Sha256(data).digest()` */
export function sha256(data: Uint8Array): Uint8Array {
  return new Sha256(data).digest();
}

export class Sha512 implements HashFunction {
  public readonly blockSize = 1024 / 8;

  private readonly impl: Hash;

  public constructor(firstData?: Uint8Array) {
    this.impl = shajs("sha512");

    if (firstData) {
      this.update(firstData);
    }
  }

  public update(data: Uint8Array): Sha512 {
    this.impl.update(data);
    return this;
  }

  public digest(): Uint8Array {
    return new Uint8Array(this.impl.digest());
  }
}

/** Convenience function equivalent to `new Sha512(data).digest()` */
export function sha512(data: Uint8Array): Uint8Array {
  return new Sha512(data).digest();
}

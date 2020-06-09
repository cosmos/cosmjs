import { HashFunction } from "./hash";

export class Hmac<H extends HashFunction> implements HashFunction {
  public readonly blockSize: number;

  private readonly messageHasher: H;
  private readonly oKeyPad: Uint8Array;
  private readonly iKeyPad: Uint8Array;
  private readonly hash: (data: Uint8Array) => Uint8Array;

  public constructor(hashFunctionConstructor: new () => H, originalKey: Uint8Array) {
    // This implementation is based on https://en.wikipedia.org/wiki/HMAC#Implementation
    // with the addition of incremental hashing support. Thus part of the algorithm
    // is in the constructor and the rest in digest().

    const blockSize = new hashFunctionConstructor().blockSize;

    this.hash = (data) => new hashFunctionConstructor().update(data).digest();

    let key = originalKey;
    if (key.length > blockSize) {
      key = this.hash(key);
    }

    if (key.length < blockSize) {
      const zeroPadding = new Uint8Array(blockSize - key.length);
      key = new Uint8Array([...key, ...zeroPadding]);
    }

    // eslint-disable-next-line no-bitwise
    this.oKeyPad = key.map((keyByte) => keyByte ^ 0x5c);
    // eslint-disable-next-line no-bitwise
    this.iKeyPad = key.map((keyByte) => keyByte ^ 0x36);
    this.messageHasher = new hashFunctionConstructor();
    this.blockSize = blockSize;

    this.update(this.iKeyPad);
  }

  public update(data: Uint8Array): Hmac<H> {
    this.messageHasher.update(data);
    return this;
  }

  public digest(): Uint8Array {
    const innerHash = this.messageHasher.digest();
    return this.hash(new Uint8Array([...this.oKeyPad, ...innerHash]));
  }
}

import { HashFunction } from "./hash";
export declare class Keccak256 implements HashFunction {
  readonly blockSize: number;
  private readonly impl;
  constructor(firstData?: Uint8Array);
  update(data: Uint8Array): Keccak256;
  digest(): Uint8Array;
}

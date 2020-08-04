export declare class Bech32 {
  static encode(prefix: string, data: Uint8Array, limit?: number): string;
  static decode(
    address: string,
    limit?: number,
  ): {
    readonly prefix: string;
    readonly data: Uint8Array;
  };
}

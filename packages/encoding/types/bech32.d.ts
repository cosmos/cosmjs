export declare class Bech32 {
  static encode(prefix: string, data: Uint8Array): string;
  static decode(
    address: string,
  ): {
    readonly prefix: string;
    readonly data: Uint8Array;
  };
}

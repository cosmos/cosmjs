import * as bech32 from "bech32";

export class Bech32 {
  public static encode(prefix: string, data: Uint8Array): string {
    const address = bech32.encode(prefix, bech32.toWords(data));
    return address;
  }

  public static decode(address: string): { readonly prefix: string; readonly data: Uint8Array } {
    const decodedAddress = bech32.decode(address);
    return {
      prefix: decodedAddress.prefix,
      data: new Uint8Array(bech32.fromWords(decodedAddress.words)),
    };
  }
}

import * as bech32 from "bech32";

export function toBech32(prefix: string, data: Uint8Array, limit?: number): string {
  const address = bech32.encode(prefix, bech32.toWords(data), limit);
  return address;
}

export function fromBech32(
  address: string,
  limit = Infinity,
): { readonly prefix: string; readonly data: Uint8Array } {
  const decodedAddress = bech32.decode(address, limit);
  return {
    prefix: decodedAddress.prefix,
    data: new Uint8Array(bech32.fromWords(decodedAddress.words)),
  };
}

/**
 * @deprecated This class is deprecated and will be removed soon. Please use fromBech32() and toBech32() instead. For more details please refer to https://github.com/cosmos/cosmjs/issues/1053.
 */
export class Bech32 {
  /**
   * @deprecated This class is deprecated and will be removed soon. Please use fromBech32() and toBech32() instead. For more details please refer to https://github.com/cosmos/cosmjs/issues/1053.
   */
  public static encode(prefix: string, data: Uint8Array, limit?: number): string {
    return toBech32(prefix, data, limit);
  }

  /**
   * @deprecated This class is deprecated and will be removed soon. Please use fromBech32() and toBech32() instead. For more details please refer to https://github.com/cosmos/cosmjs/issues/1053.
   */
  public static decode(
    address: string,
    limit = Infinity,
  ): { readonly prefix: string; readonly data: Uint8Array } {
    return fromBech32(address, limit);
  }
}

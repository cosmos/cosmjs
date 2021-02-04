import { Bech32 } from "@cosmjs/encoding";
import Long from "long";

import { QueryClient } from "./queryclient";

/**
 * Takes a bech32 encoded address and returns the data part. The prefix is ignored and discarded.
 * This is called AccAddress in Cosmos SDK, which is basically an alias for raw binary data.
 * The result is typically 20 bytes long but not restricted to that.
 */
export function toAccAddress(address: string): Uint8Array {
  return Bech32.decode(address).data;
}

export function createPagination(
  paginationKey?: Uint8Array,
): {
  readonly key: Uint8Array;
  readonly offset: Long;
  readonly limit: Long;
  readonly countTotal: boolean;
} {
  return {
    key: paginationKey ?? new Uint8Array(),
    offset: Long.fromNumber(0, true),
    limit: Long.fromNumber(0, true),
    countTotal: false,
  };
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export function createRpc(base: QueryClient): Rpc {
  return {
    request: (service: string, method: string, data: Uint8Array): Promise<Uint8Array> => {
      const path = `/${service}/${method}`;
      return base.queryUnverified(path, data);
    },
  };
}

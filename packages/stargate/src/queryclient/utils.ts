import { fromAscii, fromBech32 } from "@cosmjs/encoding";
import { Decimal, Uint64 } from "@cosmjs/math";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import Long from "long";

import { QueryClient } from "./queryclient";

/**
 * Takes a bech32 encoded address and returns the data part. The prefix is ignored and discarded.
 * This is called AccAddress in Cosmos SDK, which is basically an alias for raw binary data.
 * The result is typically 20 bytes long but not restricted to that.
 */
export function toAccAddress(address: string): Uint8Array {
  return fromBech32(address).data;
}

/**
 * If paginationKey is set, return a `PageRequest` with the given key.
 * If paginationKey is unset, return `undefined`.
 *
 * Use this with a query response's pagination next key to
 * request the next page.
 */
export function createPagination(paginationKey?: Uint8Array): PageRequest | undefined {
  return paginationKey ? PageRequest.fromPartial({ key: paginationKey }) : undefined;
}

export interface ProtobufRpcClient {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export function createProtobufRpcClient(base: QueryClient): ProtobufRpcClient {
  return {
    request: async (service: string, method: string, data: Uint8Array): Promise<Uint8Array> => {
      const path = `/${service}/${method}`;
      const response = await base.queryAbci(path, data, undefined);
      return response.value;
    },
  };
}

/**
 * Takes a uint64 value as string, number, Long or Uint64 and returns an unsigned Long instance
 * of it.
 */
export function longify(value: string | number | Long | Uint64): Long {
  const checkedValue = Uint64.fromString(value.toString());
  return Long.fromBytesBE([...checkedValue.toBytesBigEndian()], true);
}

/**
 * Takes a string or binary encoded `github.com/cosmos/cosmos-sdk/types.Dec` from the
 * protobuf API and converts it into a `Decimal` with 18 fractional digits.
 *
 * See https://github.com/cosmos/cosmos-sdk/issues/10863 for more context why this is needed.
 */
export function decodeCosmosSdkDecFromProto(input: string | Uint8Array): Decimal {
  const asString = typeof input === "string" ? input : fromAscii(input);
  return Decimal.fromAtomics(asString, 18);
}

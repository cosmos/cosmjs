import { PageRequest } from "../codec/cosmos/base/query/v1beta1/pagination";
import { QueryClient } from "./queryclient";
/**
 * Takes a bech32 encoded address and returns the data part. The prefix is ignored and discarded.
 * This is called AccAddress in Cosmos SDK, which is basically an alias for raw binary data.
 * The result is typically 20 bytes long but not restricted to that.
 */
export declare function toAccAddress(address: string): Uint8Array;
export declare function createPagination(paginationKey?: Uint8Array): PageRequest | undefined;
export interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
export declare function createRpc(base: QueryClient): Rpc;

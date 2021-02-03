import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params } from "../../../cosmos/bank/v1beta1/bank";
import _m0 from "protobufjs/minimal";
import Long from "long";
export declare const protobufPackage = "cosmos.bank.v1beta1";
/** QueryBalanceRequest is the request type for the Query/Balance RPC method. */
export interface QueryBalanceRequest {
  /** address is the address to query balances for. */
  address: string;
  /** denom is the coin denom to query balances for. */
  denom: string;
}
/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface QueryBalanceResponse {
  /** balance is the balance of the coin. */
  balance?: Coin;
}
/** QueryBalanceRequest is the request type for the Query/AllBalances RPC method. */
export interface QueryAllBalancesRequest {
  /** address is the address to query balances for. */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryAllBalancesResponse is the response type for the Query/AllBalances RPC
 * method.
 */
export interface QueryAllBalancesResponse {
  /** balances is the balances of all the coins. */
  balances: Coin[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/**
 * QueryTotalSupplyRequest is the request type for the Query/TotalSupply RPC
 * method.
 */
export interface QueryTotalSupplyRequest {}
/**
 * QueryTotalSupplyResponse is the response type for the Query/TotalSupply RPC
 * method
 */
export interface QueryTotalSupplyResponse {
  /** supply is the supply of the coins */
  supply: Coin[];
}
/** QuerySupplyOfRequest is the request type for the Query/SupplyOf RPC method. */
export interface QuerySupplyOfRequest {
  /** denom is the coin denom to query balances for. */
  denom: string;
}
/** QuerySupplyOfResponse is the response type for the Query/SupplyOf RPC method. */
export interface QuerySupplyOfResponse {
  /** amount is the supply of the coin. */
  amount?: Coin;
}
/** QueryParamsRequest defines the request type for querying x/bank parameters. */
export interface QueryParamsRequest {}
/** QueryParamsResponse defines the response type for querying x/bank parameters. */
export interface QueryParamsResponse {
  params?: Params;
}
export declare const QueryBalanceRequest: {
  encode(message: QueryBalanceRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryBalanceRequest;
  fromJSON(object: any): QueryBalanceRequest;
  fromPartial(object: DeepPartial<QueryBalanceRequest>): QueryBalanceRequest;
  toJSON(message: QueryBalanceRequest): unknown;
};
export declare const QueryBalanceResponse: {
  encode(message: QueryBalanceResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryBalanceResponse;
  fromJSON(object: any): QueryBalanceResponse;
  fromPartial(object: DeepPartial<QueryBalanceResponse>): QueryBalanceResponse;
  toJSON(message: QueryBalanceResponse): unknown;
};
export declare const QueryAllBalancesRequest: {
  encode(message: QueryAllBalancesRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAllBalancesRequest;
  fromJSON(object: any): QueryAllBalancesRequest;
  fromPartial(object: DeepPartial<QueryAllBalancesRequest>): QueryAllBalancesRequest;
  toJSON(message: QueryAllBalancesRequest): unknown;
};
export declare const QueryAllBalancesResponse: {
  encode(message: QueryAllBalancesResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAllBalancesResponse;
  fromJSON(object: any): QueryAllBalancesResponse;
  fromPartial(object: DeepPartial<QueryAllBalancesResponse>): QueryAllBalancesResponse;
  toJSON(message: QueryAllBalancesResponse): unknown;
};
export declare const QueryTotalSupplyRequest: {
  encode(_: QueryTotalSupplyRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryTotalSupplyRequest;
  fromJSON(_: any): QueryTotalSupplyRequest;
  fromPartial(_: DeepPartial<QueryTotalSupplyRequest>): QueryTotalSupplyRequest;
  toJSON(_: QueryTotalSupplyRequest): unknown;
};
export declare const QueryTotalSupplyResponse: {
  encode(message: QueryTotalSupplyResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryTotalSupplyResponse;
  fromJSON(object: any): QueryTotalSupplyResponse;
  fromPartial(object: DeepPartial<QueryTotalSupplyResponse>): QueryTotalSupplyResponse;
  toJSON(message: QueryTotalSupplyResponse): unknown;
};
export declare const QuerySupplyOfRequest: {
  encode(message: QuerySupplyOfRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QuerySupplyOfRequest;
  fromJSON(object: any): QuerySupplyOfRequest;
  fromPartial(object: DeepPartial<QuerySupplyOfRequest>): QuerySupplyOfRequest;
  toJSON(message: QuerySupplyOfRequest): unknown;
};
export declare const QuerySupplyOfResponse: {
  encode(message: QuerySupplyOfResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QuerySupplyOfResponse;
  fromJSON(object: any): QuerySupplyOfResponse;
  fromPartial(object: DeepPartial<QuerySupplyOfResponse>): QuerySupplyOfResponse;
  toJSON(message: QuerySupplyOfResponse): unknown;
};
export declare const QueryParamsRequest: {
  encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryParamsRequest;
  fromJSON(_: any): QueryParamsRequest;
  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
  toJSON(_: QueryParamsRequest): unknown;
};
export declare const QueryParamsResponse: {
  encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryParamsResponse;
  fromJSON(object: any): QueryParamsResponse;
  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
  toJSON(message: QueryParamsResponse): unknown;
};
/** Query defines the gRPC querier service. */
export interface Query {
  /** Balance queries the balance of a single coin for a single account. */
  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  /** AllBalances queries the balance of all coins for a single account. */
  AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse>;
  /** TotalSupply queries the total supply of all coins. */
  TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse>;
  /** SupplyOf queries the supply of a single coin. */
  SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse>;
  /** Params queries the parameters of x/bank module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export declare class QueryClientImpl implements Query {
  private readonly rpc;
  constructor(rpc: Rpc);
  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse>;
  TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse>;
  SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse>;
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : Partial<T>;
export {};

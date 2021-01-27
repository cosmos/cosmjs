import { Any } from "../../../google/protobuf/any";
import { Params } from "../../../cosmos/auth/v1beta1/auth";
import _m0 from "protobufjs/minimal";
import Long from "long";
export declare const protobufPackage = "cosmos.auth.v1beta1";
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
  /** address defines the address to query for. */
  address: string;
}
/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface QueryAccountResponse {
  /** account defines the account of the corresponding address. */
  account?: Any;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}
export declare const QueryAccountRequest: {
  encode(message: QueryAccountRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAccountRequest;
  fromJSON(object: any): QueryAccountRequest;
  fromPartial(object: DeepPartial<QueryAccountRequest>): QueryAccountRequest;
  toJSON(message: QueryAccountRequest): unknown;
};
export declare const QueryAccountResponse: {
  encode(message: QueryAccountResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAccountResponse;
  fromJSON(object: any): QueryAccountResponse;
  fromPartial(object: DeepPartial<QueryAccountResponse>): QueryAccountResponse;
  toJSON(message: QueryAccountResponse): unknown;
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
  /** Account returns account details based on address. */
  Account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
  /** Params queries all parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export declare class QueryClientImpl implements Query {
  private readonly rpc;
  constructor(rpc: Rpc);
  Account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
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

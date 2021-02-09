import { ContractInfo, ContractCodeHistoryEntry, Model } from "../../../../x/wasm/internal/types/types";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmwasm.wasm.v1beta1";
/** QueryContractInfoRequest is the request type for the Query/ContractInfo RPC method */
export interface QueryContractInfoRequest {
  /** address is the address of the contract to query */
  address: string;
}
/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export interface QueryContractInfoResponse {
  /** address is the address of the contract */
  address: string;
  contractInfo?: ContractInfo;
}
/** QueryContractHistoryRequest is the request type for the Query/ContractHistory RPC method */
export interface QueryContractHistoryRequest {
  /** address is the address of the contract to query */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryContractHistoryResponse is the response type for the Query/ContractHistory RPC method */
export interface QueryContractHistoryResponse {
  entries: ContractCodeHistoryEntry[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** QueryContractsByCodeRequest is the request type for the Query/ContractsByCode RPC method */
export interface QueryContractsByCodeRequest {
  /** grpc-gateway_out does not support Go style CodID */
  codeId: Long;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** ContractInfoWithAddress adds the address (key) to the ContractInfo representation */
export interface ContractInfoWithAddress {
  address: string;
  contractInfo?: ContractInfo;
}
/** QueryContractsByCodeResponse is the response type for the Query/ContractsByCode RPC method */
export interface QueryContractsByCodeResponse {
  contractInfos: ContractInfoWithAddress[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** QueryAllContractStateRequest is the request type for the Query/AllContractState RPC method */
export interface QueryAllContractStateRequest {
  /** address is the address of the contract */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryAllContractStateResponse is the response type for the Query/AllContractState RPC method */
export interface QueryAllContractStateResponse {
  models: Model[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** QueryRawContractStateRequest is the request type for the Query/RawContractState RPC method */
export interface QueryRawContractStateRequest {
  /** address is the address of the contract */
  address: string;
  queryData: Uint8Array;
}
/** QueryRawContractStateResponse is the response type for the Query/RawContractState RPC method */
export interface QueryRawContractStateResponse {
  /** Data contains the raw store data */
  data: Uint8Array;
}
/** QuerySmartContractStateRequest is the request type for the Query/SmartContractState RPC method */
export interface QuerySmartContractStateRequest {
  /** address is the address of the contract */
  address: string;
  /** QueryData contains the query data passed to the contract */
  queryData: Uint8Array;
}
/** QuerySmartContractStateResponse is the response type for the Query/SmartContractState RPC method */
export interface QuerySmartContractStateResponse {
  /** Data contains the json data returned from the smart contract */
  data: Uint8Array;
}
/** QueryCodeRequest is the request type for the Query/Code RPC method */
export interface QueryCodeRequest {
  /** grpc-gateway_out does not support Go style CodID */
  codeId: Long;
}
/** CodeInfoResponse contains code meta data from CodeInfo */
export interface CodeInfoResponse {
  /** id for legacy support */
  codeId: Long;
  creator: string;
  dataHash: Uint8Array;
  source: string;
  builder: string;
}
/** QueryCodeResponse is the response type for the Query/Code RPC method */
export interface QueryCodeResponse {
  codeInfo?: CodeInfoResponse;
  data: Uint8Array;
}
/** QueryCodesRequest is the request type for the Query/Codes RPC method */
export interface QueryCodesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryCodesResponse is the response type for the Query/Codes RPC method */
export interface QueryCodesResponse {
  codeInfos: CodeInfoResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export declare const QueryContractInfoRequest: {
  encode(message: QueryContractInfoRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryContractInfoRequest;
  fromJSON(object: any): QueryContractInfoRequest;
  fromPartial(object: DeepPartial<QueryContractInfoRequest>): QueryContractInfoRequest;
  toJSON(message: QueryContractInfoRequest): unknown;
};
export declare const QueryContractInfoResponse: {
  encode(message: QueryContractInfoResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryContractInfoResponse;
  fromJSON(object: any): QueryContractInfoResponse;
  fromPartial(object: DeepPartial<QueryContractInfoResponse>): QueryContractInfoResponse;
  toJSON(message: QueryContractInfoResponse): unknown;
};
export declare const QueryContractHistoryRequest: {
  encode(message: QueryContractHistoryRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryContractHistoryRequest;
  fromJSON(object: any): QueryContractHistoryRequest;
  fromPartial(object: DeepPartial<QueryContractHistoryRequest>): QueryContractHistoryRequest;
  toJSON(message: QueryContractHistoryRequest): unknown;
};
export declare const QueryContractHistoryResponse: {
  encode(message: QueryContractHistoryResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryContractHistoryResponse;
  fromJSON(object: any): QueryContractHistoryResponse;
  fromPartial(object: DeepPartial<QueryContractHistoryResponse>): QueryContractHistoryResponse;
  toJSON(message: QueryContractHistoryResponse): unknown;
};
export declare const QueryContractsByCodeRequest: {
  encode(message: QueryContractsByCodeRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryContractsByCodeRequest;
  fromJSON(object: any): QueryContractsByCodeRequest;
  fromPartial(object: DeepPartial<QueryContractsByCodeRequest>): QueryContractsByCodeRequest;
  toJSON(message: QueryContractsByCodeRequest): unknown;
};
export declare const ContractInfoWithAddress: {
  encode(message: ContractInfoWithAddress, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContractInfoWithAddress;
  fromJSON(object: any): ContractInfoWithAddress;
  fromPartial(object: DeepPartial<ContractInfoWithAddress>): ContractInfoWithAddress;
  toJSON(message: ContractInfoWithAddress): unknown;
};
export declare const QueryContractsByCodeResponse: {
  encode(message: QueryContractsByCodeResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryContractsByCodeResponse;
  fromJSON(object: any): QueryContractsByCodeResponse;
  fromPartial(object: DeepPartial<QueryContractsByCodeResponse>): QueryContractsByCodeResponse;
  toJSON(message: QueryContractsByCodeResponse): unknown;
};
export declare const QueryAllContractStateRequest: {
  encode(message: QueryAllContractStateRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAllContractStateRequest;
  fromJSON(object: any): QueryAllContractStateRequest;
  fromPartial(object: DeepPartial<QueryAllContractStateRequest>): QueryAllContractStateRequest;
  toJSON(message: QueryAllContractStateRequest): unknown;
};
export declare const QueryAllContractStateResponse: {
  encode(message: QueryAllContractStateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAllContractStateResponse;
  fromJSON(object: any): QueryAllContractStateResponse;
  fromPartial(object: DeepPartial<QueryAllContractStateResponse>): QueryAllContractStateResponse;
  toJSON(message: QueryAllContractStateResponse): unknown;
};
export declare const QueryRawContractStateRequest: {
  encode(message: QueryRawContractStateRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryRawContractStateRequest;
  fromJSON(object: any): QueryRawContractStateRequest;
  fromPartial(object: DeepPartial<QueryRawContractStateRequest>): QueryRawContractStateRequest;
  toJSON(message: QueryRawContractStateRequest): unknown;
};
export declare const QueryRawContractStateResponse: {
  encode(message: QueryRawContractStateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryRawContractStateResponse;
  fromJSON(object: any): QueryRawContractStateResponse;
  fromPartial(object: DeepPartial<QueryRawContractStateResponse>): QueryRawContractStateResponse;
  toJSON(message: QueryRawContractStateResponse): unknown;
};
export declare const QuerySmartContractStateRequest: {
  encode(message: QuerySmartContractStateRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QuerySmartContractStateRequest;
  fromJSON(object: any): QuerySmartContractStateRequest;
  fromPartial(object: DeepPartial<QuerySmartContractStateRequest>): QuerySmartContractStateRequest;
  toJSON(message: QuerySmartContractStateRequest): unknown;
};
export declare const QuerySmartContractStateResponse: {
  encode(message: QuerySmartContractStateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QuerySmartContractStateResponse;
  fromJSON(object: any): QuerySmartContractStateResponse;
  fromPartial(object: DeepPartial<QuerySmartContractStateResponse>): QuerySmartContractStateResponse;
  toJSON(message: QuerySmartContractStateResponse): unknown;
};
export declare const QueryCodeRequest: {
  encode(message: QueryCodeRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCodeRequest;
  fromJSON(object: any): QueryCodeRequest;
  fromPartial(object: DeepPartial<QueryCodeRequest>): QueryCodeRequest;
  toJSON(message: QueryCodeRequest): unknown;
};
export declare const CodeInfoResponse: {
  encode(message: CodeInfoResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CodeInfoResponse;
  fromJSON(object: any): CodeInfoResponse;
  fromPartial(object: DeepPartial<CodeInfoResponse>): CodeInfoResponse;
  toJSON(message: CodeInfoResponse): unknown;
};
export declare const QueryCodeResponse: {
  encode(message: QueryCodeResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCodeResponse;
  fromJSON(object: any): QueryCodeResponse;
  fromPartial(object: DeepPartial<QueryCodeResponse>): QueryCodeResponse;
  toJSON(message: QueryCodeResponse): unknown;
};
export declare const QueryCodesRequest: {
  encode(message: QueryCodesRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCodesRequest;
  fromJSON(object: any): QueryCodesRequest;
  fromPartial(object: DeepPartial<QueryCodesRequest>): QueryCodesRequest;
  toJSON(message: QueryCodesRequest): unknown;
};
export declare const QueryCodesResponse: {
  encode(message: QueryCodesResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCodesResponse;
  fromJSON(object: any): QueryCodesResponse;
  fromPartial(object: DeepPartial<QueryCodesResponse>): QueryCodesResponse;
  toJSON(message: QueryCodesResponse): unknown;
};
/** Query provides defines the gRPC querier service */
export interface Query {
  /** ContractInfo gets the contract meta data */
  ContractInfo(request: QueryContractInfoRequest): Promise<QueryContractInfoResponse>;
  /** ContractHistory gets the contract code history */
  ContractHistory(request: QueryContractHistoryRequest): Promise<QueryContractHistoryResponse>;
  /** ContractsByCode lists all smart contracts for a code id */
  ContractsByCode(request: QueryContractsByCodeRequest): Promise<QueryContractsByCodeResponse>;
  /** AllContractState gets all raw store data for a single contract */
  AllContractState(request: QueryAllContractStateRequest): Promise<QueryAllContractStateResponse>;
  /** RawContractState gets single key from the raw store data of a contract */
  RawContractState(request: QueryRawContractStateRequest): Promise<QueryRawContractStateResponse>;
  /** SmartContractState get smart query result from the contract */
  SmartContractState(request: QuerySmartContractStateRequest): Promise<QuerySmartContractStateResponse>;
  /** Code gets the binary code and metadata for a singe wasm code */
  Code(request: QueryCodeRequest): Promise<QueryCodeResponse>;
  /** Codes gets the metadata for all stored wasm codes */
  Codes(request: QueryCodesRequest): Promise<QueryCodesResponse>;
}
export declare class QueryClientImpl implements Query {
  private readonly rpc;
  constructor(rpc: Rpc);
  ContractInfo(request: QueryContractInfoRequest): Promise<QueryContractInfoResponse>;
  ContractHistory(request: QueryContractHistoryRequest): Promise<QueryContractHistoryResponse>;
  ContractsByCode(request: QueryContractsByCodeRequest): Promise<QueryContractsByCodeResponse>;
  AllContractState(request: QueryAllContractStateRequest): Promise<QueryAllContractStateResponse>;
  RawContractState(request: QueryRawContractStateRequest): Promise<QueryRawContractStateResponse>;
  SmartContractState(request: QuerySmartContractStateRequest): Promise<QuerySmartContractStateResponse>;
  Code(request: QueryCodeRequest): Promise<QueryCodeResponse>;
  Codes(request: QueryCodesRequest): Promise<QueryCodesResponse>;
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

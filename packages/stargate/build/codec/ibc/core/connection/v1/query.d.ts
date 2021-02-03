import { ConnectionEnd, IdentifiedConnection } from "../../../../ibc/core/connection/v1/connection";
import { Height, IdentifiedClientState } from "../../../../ibc/core/client/v1/client";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import { Any } from "../../../../google/protobuf/any";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.core.connection.v1";
/**
 * QueryConnectionRequest is the request type for the Query/Connection RPC
 * method
 */
export interface QueryConnectionRequest {
  /** connection unique identifier */
  connectionId: string;
}
/**
 * QueryConnectionResponse is the response type for the Query/Connection RPC
 * method. Besides the connection end, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryConnectionResponse {
  /** connection associated with the request identifier */
  connection?: ConnectionEnd;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/**
 * QueryConnectionsRequest is the request type for the Query/Connections RPC
 * method
 */
export interface QueryConnectionsRequest {
  pagination?: PageRequest;
}
/**
 * QueryConnectionsResponse is the response type for the Query/Connections RPC
 * method.
 */
export interface QueryConnectionsResponse {
  /** list of stored connections of the chain. */
  connections: IdentifiedConnection[];
  /** pagination response */
  pagination?: PageResponse;
  /** query block height */
  height?: Height;
}
/**
 * QueryClientConnectionsRequest is the request type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsRequest {
  /** client identifier associated with a connection */
  clientId: string;
}
/**
 * QueryClientConnectionsResponse is the response type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsResponse {
  /** slice of all the connection paths associated with a client. */
  connectionPaths: string[];
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was generated */
  proofHeight?: Height;
}
/**
 * QueryConnectionClientStateRequest is the request type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateRequest {
  /** connection identifier */
  connectionId: string;
}
/**
 * QueryConnectionClientStateResponse is the response type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateResponse {
  /** client state associated with the channel */
  identifiedClientState?: IdentifiedClientState;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/**
 * QueryConnectionConsensusStateRequest is the request type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateRequest {
  /** connection identifier */
  connectionId: string;
  revisionNumber: Long;
  revisionHeight: Long;
}
/**
 * QueryConnectionConsensusStateResponse is the response type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateResponse {
  /** consensus state associated with the channel */
  consensusState?: Any;
  /** client ID associated with the consensus state */
  clientId: string;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
export declare const QueryConnectionRequest: {
  encode(message: QueryConnectionRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionRequest;
  fromJSON(object: any): QueryConnectionRequest;
  fromPartial(object: DeepPartial<QueryConnectionRequest>): QueryConnectionRequest;
  toJSON(message: QueryConnectionRequest): unknown;
};
export declare const QueryConnectionResponse: {
  encode(message: QueryConnectionResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionResponse;
  fromJSON(object: any): QueryConnectionResponse;
  fromPartial(object: DeepPartial<QueryConnectionResponse>): QueryConnectionResponse;
  toJSON(message: QueryConnectionResponse): unknown;
};
export declare const QueryConnectionsRequest: {
  encode(message: QueryConnectionsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionsRequest;
  fromJSON(object: any): QueryConnectionsRequest;
  fromPartial(object: DeepPartial<QueryConnectionsRequest>): QueryConnectionsRequest;
  toJSON(message: QueryConnectionsRequest): unknown;
};
export declare const QueryConnectionsResponse: {
  encode(message: QueryConnectionsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionsResponse;
  fromJSON(object: any): QueryConnectionsResponse;
  fromPartial(object: DeepPartial<QueryConnectionsResponse>): QueryConnectionsResponse;
  toJSON(message: QueryConnectionsResponse): unknown;
};
export declare const QueryClientConnectionsRequest: {
  encode(message: QueryClientConnectionsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryClientConnectionsRequest;
  fromJSON(object: any): QueryClientConnectionsRequest;
  fromPartial(object: DeepPartial<QueryClientConnectionsRequest>): QueryClientConnectionsRequest;
  toJSON(message: QueryClientConnectionsRequest): unknown;
};
export declare const QueryClientConnectionsResponse: {
  encode(message: QueryClientConnectionsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryClientConnectionsResponse;
  fromJSON(object: any): QueryClientConnectionsResponse;
  fromPartial(object: DeepPartial<QueryClientConnectionsResponse>): QueryClientConnectionsResponse;
  toJSON(message: QueryClientConnectionsResponse): unknown;
};
export declare const QueryConnectionClientStateRequest: {
  encode(message: QueryConnectionClientStateRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionClientStateRequest;
  fromJSON(object: any): QueryConnectionClientStateRequest;
  fromPartial(object: DeepPartial<QueryConnectionClientStateRequest>): QueryConnectionClientStateRequest;
  toJSON(message: QueryConnectionClientStateRequest): unknown;
};
export declare const QueryConnectionClientStateResponse: {
  encode(message: QueryConnectionClientStateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionClientStateResponse;
  fromJSON(object: any): QueryConnectionClientStateResponse;
  fromPartial(object: DeepPartial<QueryConnectionClientStateResponse>): QueryConnectionClientStateResponse;
  toJSON(message: QueryConnectionClientStateResponse): unknown;
};
export declare const QueryConnectionConsensusStateRequest: {
  encode(message: QueryConnectionConsensusStateRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionConsensusStateRequest;
  fromJSON(object: any): QueryConnectionConsensusStateRequest;
  fromPartial(
    object: DeepPartial<QueryConnectionConsensusStateRequest>,
  ): QueryConnectionConsensusStateRequest;
  toJSON(message: QueryConnectionConsensusStateRequest): unknown;
};
export declare const QueryConnectionConsensusStateResponse: {
  encode(message: QueryConnectionConsensusStateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionConsensusStateResponse;
  fromJSON(object: any): QueryConnectionConsensusStateResponse;
  fromPartial(
    object: DeepPartial<QueryConnectionConsensusStateResponse>,
  ): QueryConnectionConsensusStateResponse;
  toJSON(message: QueryConnectionConsensusStateResponse): unknown;
};
/** Query provides defines the gRPC querier service */
export interface Query {
  /** Connection queries an IBC connection end. */
  Connection(request: QueryConnectionRequest): Promise<QueryConnectionResponse>;
  /** Connections queries all the IBC connections of a chain. */
  Connections(request: QueryConnectionsRequest): Promise<QueryConnectionsResponse>;
  /**
   * ClientConnections queries the connection paths associated with a client
   * state.
   */
  ClientConnections(request: QueryClientConnectionsRequest): Promise<QueryClientConnectionsResponse>;
  /**
   * ConnectionClientState queries the client state associated with the
   * connection.
   */
  ConnectionClientState(
    request: QueryConnectionClientStateRequest,
  ): Promise<QueryConnectionClientStateResponse>;
  /**
   * ConnectionConsensusState queries the consensus state associated with the
   * connection.
   */
  ConnectionConsensusState(
    request: QueryConnectionConsensusStateRequest,
  ): Promise<QueryConnectionConsensusStateResponse>;
}
export declare class QueryClientImpl implements Query {
  private readonly rpc;
  constructor(rpc: Rpc);
  Connection(request: QueryConnectionRequest): Promise<QueryConnectionResponse>;
  Connections(request: QueryConnectionsRequest): Promise<QueryConnectionsResponse>;
  ClientConnections(request: QueryClientConnectionsRequest): Promise<QueryClientConnectionsResponse>;
  ConnectionClientState(
    request: QueryConnectionClientStateRequest,
  ): Promise<QueryConnectionClientStateResponse>;
  ConnectionConsensusState(
    request: QueryConnectionConsensusStateRequest,
  ): Promise<QueryConnectionConsensusStateResponse>;
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

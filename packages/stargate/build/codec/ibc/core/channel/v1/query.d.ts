import { Channel, IdentifiedChannel, PacketState } from "../../../../ibc/core/channel/v1/channel";
import { Height, IdentifiedClientState } from "../../../../ibc/core/client/v1/client";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import { Any } from "../../../../google/protobuf/any";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.core.channel.v1";
/** QueryChannelRequest is the request type for the Query/Channel RPC method */
export interface QueryChannelRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
}
/**
 * QueryChannelResponse is the response type for the Query/Channel RPC method.
 * Besides the Channel end, it includes a proof and the height from which the
 * proof was retrieved.
 */
export interface QueryChannelResponse {
  /** channel associated with the request identifiers */
  channel?: Channel;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/** QueryChannelsRequest is the request type for the Query/Channels RPC method */
export interface QueryChannelsRequest {
  /** pagination request */
  pagination?: PageRequest;
}
/** QueryChannelsResponse is the response type for the Query/Channels RPC method. */
export interface QueryChannelsResponse {
  /** list of stored channels of the chain. */
  channels: IdentifiedChannel[];
  /** pagination response */
  pagination?: PageResponse;
  /** query block height */
  height?: Height;
}
/**
 * QueryConnectionChannelsRequest is the request type for the
 * Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsRequest {
  /** connection unique identifier */
  connection: string;
  /** pagination request */
  pagination?: PageRequest;
}
/**
 * QueryConnectionChannelsResponse is the Response type for the
 * Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsResponse {
  /** list of channels associated with a connection. */
  channels: IdentifiedChannel[];
  /** pagination response */
  pagination?: PageResponse;
  /** query block height */
  height?: Height;
}
/**
 * QueryChannelClientStateRequest is the request type for the Query/ClientState
 * RPC method
 */
export interface QueryChannelClientStateRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
}
/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface QueryChannelClientStateResponse {
  /** client state associated with the channel */
  identifiedClientState?: IdentifiedClientState;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/**
 * QueryChannelConsensusStateRequest is the request type for the
 * Query/ConsensusState RPC method
 */
export interface QueryChannelConsensusStateRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** revision number of the consensus state */
  revisionNumber: Long;
  /** revision height of the consensus state */
  revisionHeight: Long;
}
/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface QueryChannelConsensusStateResponse {
  /** consensus state associated with the channel */
  consensusState?: Any;
  /** client ID associated with the consensus state */
  clientId: string;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/**
 * QueryPacketCommitmentRequest is the request type for the
 * Query/PacketCommitment RPC method
 */
export interface QueryPacketCommitmentRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** packet sequence */
  sequence: Long;
}
/**
 * QueryPacketCommitmentResponse defines the client query response for a packet
 * which also includes a proof and the height from which the proof was
 * retrieved
 */
export interface QueryPacketCommitmentResponse {
  /** packet associated with the request fields */
  commitment: Uint8Array;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/**
 * QueryPacketCommitmentsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** pagination request */
  pagination?: PageRequest;
}
/**
 * QueryPacketCommitmentsResponse is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsResponse {
  commitments: PacketState[];
  /** pagination response */
  pagination?: PageResponse;
  /** query block height */
  height?: Height;
}
/**
 * QueryPacketReceiptRequest is the request type for the
 * Query/PacketReceipt RPC method
 */
export interface QueryPacketReceiptRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** packet sequence */
  sequence: Long;
}
/**
 * QueryPacketReceiptResponse defines the client query response for a packet receipt
 * which also includes a proof, and the height from which the proof was
 * retrieved
 */
export interface QueryPacketReceiptResponse {
  /** success flag for if receipt exists */
  received: boolean;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/**
 * QueryPacketAcknowledgementRequest is the request type for the
 * Query/PacketAcknowledgement RPC method
 */
export interface QueryPacketAcknowledgementRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** packet sequence */
  sequence: Long;
}
/**
 * QueryPacketAcknowledgementResponse defines the client query response for a
 * packet which also includes a proof and the height from which the
 * proof was retrieved
 */
export interface QueryPacketAcknowledgementResponse {
  /** packet associated with the request fields */
  acknowledgement: Uint8Array;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
/**
 * QueryPacketAcknowledgementsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketAcknowledgementsRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** pagination request */
  pagination?: PageRequest;
}
/**
 * QueryPacketAcknowledgemetsResponse is the request type for the
 * Query/QueryPacketAcknowledgements RPC method
 */
export interface QueryPacketAcknowledgementsResponse {
  acknowledgements: PacketState[];
  /** pagination response */
  pagination?: PageResponse;
  /** query block height */
  height?: Height;
}
/**
 * QueryUnreceivedPacketsRequest is the request type for the
 * Query/UnreceivedPackets RPC method
 */
export interface QueryUnreceivedPacketsRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** list of packet sequences */
  packetCommitmentSequences: Long[];
}
/**
 * QueryUnreceivedPacketsResponse is the response type for the
 * Query/UnreceivedPacketCommitments RPC method
 */
export interface QueryUnreceivedPacketsResponse {
  /** list of unreceived packet sequences */
  sequences: Long[];
  /** query block height */
  height?: Height;
}
/**
 * QueryUnreceivedAcks is the request type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
  /** list of acknowledgement sequences */
  packetAckSequences: Long[];
}
/**
 * QueryUnreceivedAcksResponse is the response type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksResponse {
  /** list of unreceived acknowledgement sequences */
  sequences: Long[];
  /** query block height */
  height?: Height;
}
/**
 * QueryNextSequenceReceiveRequest is the request type for the
 * Query/QueryNextSequenceReceiveRequest RPC method
 */
export interface QueryNextSequenceReceiveRequest {
  /** port unique identifier */
  portId: string;
  /** channel unique identifier */
  channelId: string;
}
/**
 * QuerySequenceResponse is the request type for the
 * Query/QueryNextSequenceReceiveResponse RPC method
 */
export interface QueryNextSequenceReceiveResponse {
  /** next sequence receive number */
  nextSequenceReceive: Long;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight?: Height;
}
export declare const QueryChannelRequest: {
  encode(message: QueryChannelRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelRequest;
  fromJSON(object: any): QueryChannelRequest;
  fromPartial(object: DeepPartial<QueryChannelRequest>): QueryChannelRequest;
  toJSON(message: QueryChannelRequest): unknown;
};
export declare const QueryChannelResponse: {
  encode(message: QueryChannelResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelResponse;
  fromJSON(object: any): QueryChannelResponse;
  fromPartial(object: DeepPartial<QueryChannelResponse>): QueryChannelResponse;
  toJSON(message: QueryChannelResponse): unknown;
};
export declare const QueryChannelsRequest: {
  encode(message: QueryChannelsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelsRequest;
  fromJSON(object: any): QueryChannelsRequest;
  fromPartial(object: DeepPartial<QueryChannelsRequest>): QueryChannelsRequest;
  toJSON(message: QueryChannelsRequest): unknown;
};
export declare const QueryChannelsResponse: {
  encode(message: QueryChannelsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelsResponse;
  fromJSON(object: any): QueryChannelsResponse;
  fromPartial(object: DeepPartial<QueryChannelsResponse>): QueryChannelsResponse;
  toJSON(message: QueryChannelsResponse): unknown;
};
export declare const QueryConnectionChannelsRequest: {
  encode(message: QueryConnectionChannelsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionChannelsRequest;
  fromJSON(object: any): QueryConnectionChannelsRequest;
  fromPartial(object: DeepPartial<QueryConnectionChannelsRequest>): QueryConnectionChannelsRequest;
  toJSON(message: QueryConnectionChannelsRequest): unknown;
};
export declare const QueryConnectionChannelsResponse: {
  encode(message: QueryConnectionChannelsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryConnectionChannelsResponse;
  fromJSON(object: any): QueryConnectionChannelsResponse;
  fromPartial(object: DeepPartial<QueryConnectionChannelsResponse>): QueryConnectionChannelsResponse;
  toJSON(message: QueryConnectionChannelsResponse): unknown;
};
export declare const QueryChannelClientStateRequest: {
  encode(message: QueryChannelClientStateRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelClientStateRequest;
  fromJSON(object: any): QueryChannelClientStateRequest;
  fromPartial(object: DeepPartial<QueryChannelClientStateRequest>): QueryChannelClientStateRequest;
  toJSON(message: QueryChannelClientStateRequest): unknown;
};
export declare const QueryChannelClientStateResponse: {
  encode(message: QueryChannelClientStateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelClientStateResponse;
  fromJSON(object: any): QueryChannelClientStateResponse;
  fromPartial(object: DeepPartial<QueryChannelClientStateResponse>): QueryChannelClientStateResponse;
  toJSON(message: QueryChannelClientStateResponse): unknown;
};
export declare const QueryChannelConsensusStateRequest: {
  encode(message: QueryChannelConsensusStateRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelConsensusStateRequest;
  fromJSON(object: any): QueryChannelConsensusStateRequest;
  fromPartial(object: DeepPartial<QueryChannelConsensusStateRequest>): QueryChannelConsensusStateRequest;
  toJSON(message: QueryChannelConsensusStateRequest): unknown;
};
export declare const QueryChannelConsensusStateResponse: {
  encode(message: QueryChannelConsensusStateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryChannelConsensusStateResponse;
  fromJSON(object: any): QueryChannelConsensusStateResponse;
  fromPartial(object: DeepPartial<QueryChannelConsensusStateResponse>): QueryChannelConsensusStateResponse;
  toJSON(message: QueryChannelConsensusStateResponse): unknown;
};
export declare const QueryPacketCommitmentRequest: {
  encode(message: QueryPacketCommitmentRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketCommitmentRequest;
  fromJSON(object: any): QueryPacketCommitmentRequest;
  fromPartial(object: DeepPartial<QueryPacketCommitmentRequest>): QueryPacketCommitmentRequest;
  toJSON(message: QueryPacketCommitmentRequest): unknown;
};
export declare const QueryPacketCommitmentResponse: {
  encode(message: QueryPacketCommitmentResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketCommitmentResponse;
  fromJSON(object: any): QueryPacketCommitmentResponse;
  fromPartial(object: DeepPartial<QueryPacketCommitmentResponse>): QueryPacketCommitmentResponse;
  toJSON(message: QueryPacketCommitmentResponse): unknown;
};
export declare const QueryPacketCommitmentsRequest: {
  encode(message: QueryPacketCommitmentsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketCommitmentsRequest;
  fromJSON(object: any): QueryPacketCommitmentsRequest;
  fromPartial(object: DeepPartial<QueryPacketCommitmentsRequest>): QueryPacketCommitmentsRequest;
  toJSON(message: QueryPacketCommitmentsRequest): unknown;
};
export declare const QueryPacketCommitmentsResponse: {
  encode(message: QueryPacketCommitmentsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketCommitmentsResponse;
  fromJSON(object: any): QueryPacketCommitmentsResponse;
  fromPartial(object: DeepPartial<QueryPacketCommitmentsResponse>): QueryPacketCommitmentsResponse;
  toJSON(message: QueryPacketCommitmentsResponse): unknown;
};
export declare const QueryPacketReceiptRequest: {
  encode(message: QueryPacketReceiptRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketReceiptRequest;
  fromJSON(object: any): QueryPacketReceiptRequest;
  fromPartial(object: DeepPartial<QueryPacketReceiptRequest>): QueryPacketReceiptRequest;
  toJSON(message: QueryPacketReceiptRequest): unknown;
};
export declare const QueryPacketReceiptResponse: {
  encode(message: QueryPacketReceiptResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketReceiptResponse;
  fromJSON(object: any): QueryPacketReceiptResponse;
  fromPartial(object: DeepPartial<QueryPacketReceiptResponse>): QueryPacketReceiptResponse;
  toJSON(message: QueryPacketReceiptResponse): unknown;
};
export declare const QueryPacketAcknowledgementRequest: {
  encode(message: QueryPacketAcknowledgementRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketAcknowledgementRequest;
  fromJSON(object: any): QueryPacketAcknowledgementRequest;
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementRequest>): QueryPacketAcknowledgementRequest;
  toJSON(message: QueryPacketAcknowledgementRequest): unknown;
};
export declare const QueryPacketAcknowledgementResponse: {
  encode(message: QueryPacketAcknowledgementResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketAcknowledgementResponse;
  fromJSON(object: any): QueryPacketAcknowledgementResponse;
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementResponse>): QueryPacketAcknowledgementResponse;
  toJSON(message: QueryPacketAcknowledgementResponse): unknown;
};
export declare const QueryPacketAcknowledgementsRequest: {
  encode(message: QueryPacketAcknowledgementsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketAcknowledgementsRequest;
  fromJSON(object: any): QueryPacketAcknowledgementsRequest;
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementsRequest>): QueryPacketAcknowledgementsRequest;
  toJSON(message: QueryPacketAcknowledgementsRequest): unknown;
};
export declare const QueryPacketAcknowledgementsResponse: {
  encode(message: QueryPacketAcknowledgementsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPacketAcknowledgementsResponse;
  fromJSON(object: any): QueryPacketAcknowledgementsResponse;
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementsResponse>): QueryPacketAcknowledgementsResponse;
  toJSON(message: QueryPacketAcknowledgementsResponse): unknown;
};
export declare const QueryUnreceivedPacketsRequest: {
  encode(message: QueryUnreceivedPacketsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryUnreceivedPacketsRequest;
  fromJSON(object: any): QueryUnreceivedPacketsRequest;
  fromPartial(object: DeepPartial<QueryUnreceivedPacketsRequest>): QueryUnreceivedPacketsRequest;
  toJSON(message: QueryUnreceivedPacketsRequest): unknown;
};
export declare const QueryUnreceivedPacketsResponse: {
  encode(message: QueryUnreceivedPacketsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryUnreceivedPacketsResponse;
  fromJSON(object: any): QueryUnreceivedPacketsResponse;
  fromPartial(object: DeepPartial<QueryUnreceivedPacketsResponse>): QueryUnreceivedPacketsResponse;
  toJSON(message: QueryUnreceivedPacketsResponse): unknown;
};
export declare const QueryUnreceivedAcksRequest: {
  encode(message: QueryUnreceivedAcksRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryUnreceivedAcksRequest;
  fromJSON(object: any): QueryUnreceivedAcksRequest;
  fromPartial(object: DeepPartial<QueryUnreceivedAcksRequest>): QueryUnreceivedAcksRequest;
  toJSON(message: QueryUnreceivedAcksRequest): unknown;
};
export declare const QueryUnreceivedAcksResponse: {
  encode(message: QueryUnreceivedAcksResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryUnreceivedAcksResponse;
  fromJSON(object: any): QueryUnreceivedAcksResponse;
  fromPartial(object: DeepPartial<QueryUnreceivedAcksResponse>): QueryUnreceivedAcksResponse;
  toJSON(message: QueryUnreceivedAcksResponse): unknown;
};
export declare const QueryNextSequenceReceiveRequest: {
  encode(message: QueryNextSequenceReceiveRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryNextSequenceReceiveRequest;
  fromJSON(object: any): QueryNextSequenceReceiveRequest;
  fromPartial(object: DeepPartial<QueryNextSequenceReceiveRequest>): QueryNextSequenceReceiveRequest;
  toJSON(message: QueryNextSequenceReceiveRequest): unknown;
};
export declare const QueryNextSequenceReceiveResponse: {
  encode(message: QueryNextSequenceReceiveResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryNextSequenceReceiveResponse;
  fromJSON(object: any): QueryNextSequenceReceiveResponse;
  fromPartial(object: DeepPartial<QueryNextSequenceReceiveResponse>): QueryNextSequenceReceiveResponse;
  toJSON(message: QueryNextSequenceReceiveResponse): unknown;
};
/** Query provides defines the gRPC querier service */
export interface Query {
  /** Channel queries an IBC Channel. */
  Channel(request: QueryChannelRequest): Promise<QueryChannelResponse>;
  /** Channels queries all the IBC channels of a chain. */
  Channels(request: QueryChannelsRequest): Promise<QueryChannelsResponse>;
  /**
   * ConnectionChannels queries all the channels associated with a connection
   * end.
   */
  ConnectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse>;
  /**
   * ChannelClientState queries for the client state for the channel associated
   * with the provided channel identifiers.
   */
  ChannelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse>;
  /**
   * ChannelConsensusState queries for the consensus state for the channel
   * associated with the provided channel identifiers.
   */
  ChannelConsensusState(
    request: QueryChannelConsensusStateRequest,
  ): Promise<QueryChannelConsensusStateResponse>;
  /** PacketCommitment queries a stored packet commitment hash. */
  PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;
  /**
   * PacketCommitments returns all the packet commitments hashes associated
   * with a channel.
   */
  PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;
  /** PacketReceipt queries if a given packet sequence has been received on the queried chain */
  PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;
  /** PacketAcknowledgement queries a stored packet acknowledgement hash. */
  PacketAcknowledgement(
    request: QueryPacketAcknowledgementRequest,
  ): Promise<QueryPacketAcknowledgementResponse>;
  /**
   * PacketAcknowledgements returns all the packet acknowledgements associated
   * with a channel.
   */
  PacketAcknowledgements(
    request: QueryPacketAcknowledgementsRequest,
  ): Promise<QueryPacketAcknowledgementsResponse>;
  /**
   * UnreceivedPackets returns all the unreceived IBC packets associated with a
   * channel and sequences.
   */
  UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;
  /**
   * UnreceivedAcks returns all the unreceived IBC acknowledgements associated with a
   * channel and sequences.
   */
  UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;
  /** NextSequenceReceive returns the next receive sequence for a given channel. */
  NextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse>;
}
export declare class QueryClientImpl implements Query {
  private readonly rpc;
  constructor(rpc: Rpc);
  Channel(request: QueryChannelRequest): Promise<QueryChannelResponse>;
  Channels(request: QueryChannelsRequest): Promise<QueryChannelsResponse>;
  ConnectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse>;
  ChannelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse>;
  ChannelConsensusState(
    request: QueryChannelConsensusStateRequest,
  ): Promise<QueryChannelConsensusStateResponse>;
  PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;
  PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;
  PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;
  PacketAcknowledgement(
    request: QueryPacketAcknowledgementRequest,
  ): Promise<QueryPacketAcknowledgementResponse>;
  PacketAcknowledgements(
    request: QueryPacketAcknowledgementsRequest,
  ): Promise<QueryPacketAcknowledgementsResponse>;
  UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;
  UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;
  NextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse>;
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

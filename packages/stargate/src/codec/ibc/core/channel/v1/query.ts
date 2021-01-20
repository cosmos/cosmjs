/* eslint-disable */
import { Channel, IdentifiedChannel, PacketState } from "../../../../ibc/core/channel/v1/channel";
import { Height, IdentifiedClientState } from "../../../../ibc/core/client/v1/client";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import * as Long from "long";
import { Any } from "../../../../google/protobuf/any";
import { Reader, Writer } from "protobufjs/minimal";

/**
 *  QueryChannelRequest is the request type for the Query/Channel RPC method
 */
export interface QueryChannelRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
}

/**
 *  QueryChannelResponse is the response type for the Query/Channel RPC method.
 *  Besides the Channel end, it includes a proof and the height from which the
 *  proof was retrieved.
 */
export interface QueryChannelResponse {
  /**
   *  channel associated with the request identifiers
   */
  channel?: Channel;
  /**
   *  merkle proof of existence
   */
  proof: Uint8Array;
  /**
   *  height at which the proof was retrieved
   */
  proofHeight?: Height;
}

/**
 *  QueryChannelsRequest is the request type for the Query/Channels RPC method
 */
export interface QueryChannelsRequest {
  /**
   *  pagination request
   */
  pagination?: PageRequest;
}

/**
 *  QueryChannelsResponse is the response type for the Query/Channels RPC method.
 */
export interface QueryChannelsResponse {
  /**
   *  list of stored channels of the chain.
   */
  channels: IdentifiedChannel[];
  /**
   *  pagination response
   */
  pagination?: PageResponse;
  /**
   *  query block height
   */
  height?: Height;
}

/**
 *  QueryConnectionChannelsRequest is the request type for the
 *  Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsRequest {
  /**
   *  connection unique identifier
   */
  connection: string;
  /**
   *  pagination request
   */
  pagination?: PageRequest;
}

/**
 *  QueryConnectionChannelsResponse is the Response type for the
 *  Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsResponse {
  /**
   *  list of channels associated with a connection.
   */
  channels: IdentifiedChannel[];
  /**
   *  pagination response
   */
  pagination?: PageResponse;
  /**
   *  query block height
   */
  height?: Height;
}

/**
 *  QueryChannelClientStateRequest is the request type for the Query/ClientState
 *  RPC method
 */
export interface QueryChannelClientStateRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
}

/**
 *  QueryChannelClientStateResponse is the Response type for the
 *  Query/QueryChannelClientState RPC method
 */
export interface QueryChannelClientStateResponse {
  /**
   *  client state associated with the channel
   */
  identifiedClientState?: IdentifiedClientState;
  /**
   *  merkle proof of existence
   */
  proof: Uint8Array;
  /**
   *  height at which the proof was retrieved
   */
  proofHeight?: Height;
}

/**
 *  QueryChannelConsensusStateRequest is the request type for the
 *  Query/ConsensusState RPC method
 */
export interface QueryChannelConsensusStateRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  revision number of the consensus state
   */
  revisionNumber: Long;
  /**
   *  revision height of the consensus state
   */
  revisionHeight: Long;
}

/**
 *  QueryChannelClientStateResponse is the Response type for the
 *  Query/QueryChannelClientState RPC method
 */
export interface QueryChannelConsensusStateResponse {
  /**
   *  consensus state associated with the channel
   */
  consensusState?: Any;
  /**
   *  client ID associated with the consensus state
   */
  clientId: string;
  /**
   *  merkle proof of existence
   */
  proof: Uint8Array;
  /**
   *  height at which the proof was retrieved
   */
  proofHeight?: Height;
}

/**
 *  QueryPacketCommitmentRequest is the request type for the
 *  Query/PacketCommitment RPC method
 */
export interface QueryPacketCommitmentRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  packet sequence
   */
  sequence: Long;
}

/**
 *  QueryPacketCommitmentResponse defines the client query response for a packet
 *  which also includes a proof and the height from which the proof was
 *  retrieved
 */
export interface QueryPacketCommitmentResponse {
  /**
   *  packet associated with the request fields
   */
  commitment: Uint8Array;
  /**
   *  merkle proof of existence
   */
  proof: Uint8Array;
  /**
   *  height at which the proof was retrieved
   */
  proofHeight?: Height;
}

/**
 *  QueryPacketCommitmentsRequest is the request type for the
 *  Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  pagination request
   */
  pagination?: PageRequest;
}

/**
 *  QueryPacketCommitmentsResponse is the request type for the
 *  Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsResponse {
  commitments: PacketState[];
  /**
   *  pagination response
   */
  pagination?: PageResponse;
  /**
   *  query block height
   */
  height?: Height;
}

/**
 *  QueryPacketReceiptRequest is the request type for the
 *  Query/PacketReceipt RPC method
 */
export interface QueryPacketReceiptRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  packet sequence
   */
  sequence: Long;
}

/**
 *  QueryPacketReceiptResponse defines the client query response for a packet receipt
 *  which also includes a proof, and the height from which the proof was
 *  retrieved
 */
export interface QueryPacketReceiptResponse {
  /**
   *  success flag for if receipt exists
   */
  received: boolean;
  /**
   *  merkle proof of existence
   */
  proof: Uint8Array;
  /**
   *  height at which the proof was retrieved
   */
  proofHeight?: Height;
}

/**
 *  QueryPacketAcknowledgementRequest is the request type for the
 *  Query/PacketAcknowledgement RPC method
 */
export interface QueryPacketAcknowledgementRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  packet sequence
   */
  sequence: Long;
}

/**
 *  QueryPacketAcknowledgementResponse defines the client query response for a
 *  packet which also includes a proof and the height from which the
 *  proof was retrieved
 */
export interface QueryPacketAcknowledgementResponse {
  /**
   *  packet associated with the request fields
   */
  acknowledgement: Uint8Array;
  /**
   *  merkle proof of existence
   */
  proof: Uint8Array;
  /**
   *  height at which the proof was retrieved
   */
  proofHeight?: Height;
}

/**
 *  QueryPacketAcknowledgementsRequest is the request type for the
 *  Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketAcknowledgementsRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  pagination request
   */
  pagination?: PageRequest;
}

/**
 *  QueryPacketAcknowledgemetsResponse is the request type for the
 *  Query/QueryPacketAcknowledgements RPC method
 */
export interface QueryPacketAcknowledgementsResponse {
  acknowledgements: PacketState[];
  /**
   *  pagination response
   */
  pagination?: PageResponse;
  /**
   *  query block height
   */
  height?: Height;
}

/**
 *  QueryUnreceivedPacketsRequest is the request type for the
 *  Query/UnreceivedPackets RPC method
 */
export interface QueryUnreceivedPacketsRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  list of packet sequences
   */
  packetCommitmentSequences: Long[];
}

/**
 *  QueryUnreceivedPacketsResponse is the response type for the
 *  Query/UnreceivedPacketCommitments RPC method
 */
export interface QueryUnreceivedPacketsResponse {
  /**
   *  list of unreceived packet sequences
   */
  sequences: Long[];
  /**
   *  query block height
   */
  height?: Height;
}

/**
 *  QueryUnreceivedAcks is the request type for the
 *  Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
  /**
   *  list of acknowledgement sequences
   */
  packetAckSequences: Long[];
}

/**
 *  QueryUnreceivedAcksResponse is the response type for the
 *  Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksResponse {
  /**
   *  list of unreceived acknowledgement sequences
   */
  sequences: Long[];
  /**
   *  query block height
   */
  height?: Height;
}

/**
 *  QueryNextSequenceReceiveRequest is the request type for the
 *  Query/QueryNextSequenceReceiveRequest RPC method
 */
export interface QueryNextSequenceReceiveRequest {
  /**
   *  port unique identifier
   */
  portId: string;
  /**
   *  channel unique identifier
   */
  channelId: string;
}

/**
 *  QuerySequenceResponse is the request type for the
 *  Query/QueryNextSequenceReceiveResponse RPC method
 */
export interface QueryNextSequenceReceiveResponse {
  /**
   *  next sequence receive number
   */
  nextSequenceReceive: Long;
  /**
   *  merkle proof of existence
   */
  proof: Uint8Array;
  /**
   *  height at which the proof was retrieved
   */
  proofHeight?: Height;
}

const baseQueryChannelRequest: object = {
  portId: "",
  channelId: "",
};

const baseQueryChannelResponse: object = {};

const baseQueryChannelsRequest: object = {};

const baseQueryChannelsResponse: object = {};

const baseQueryConnectionChannelsRequest: object = {
  connection: "",
};

const baseQueryConnectionChannelsResponse: object = {};

const baseQueryChannelClientStateRequest: object = {
  portId: "",
  channelId: "",
};

const baseQueryChannelClientStateResponse: object = {};

const baseQueryChannelConsensusStateRequest: object = {
  portId: "",
  channelId: "",
  revisionNumber: Long.UZERO,
  revisionHeight: Long.UZERO,
};

const baseQueryChannelConsensusStateResponse: object = {
  clientId: "",
};

const baseQueryPacketCommitmentRequest: object = {
  portId: "",
  channelId: "",
  sequence: Long.UZERO,
};

const baseQueryPacketCommitmentResponse: object = {};

const baseQueryPacketCommitmentsRequest: object = {
  portId: "",
  channelId: "",
};

const baseQueryPacketCommitmentsResponse: object = {};

const baseQueryPacketReceiptRequest: object = {
  portId: "",
  channelId: "",
  sequence: Long.UZERO,
};

const baseQueryPacketReceiptResponse: object = {
  received: false,
};

const baseQueryPacketAcknowledgementRequest: object = {
  portId: "",
  channelId: "",
  sequence: Long.UZERO,
};

const baseQueryPacketAcknowledgementResponse: object = {};

const baseQueryPacketAcknowledgementsRequest: object = {
  portId: "",
  channelId: "",
};

const baseQueryPacketAcknowledgementsResponse: object = {};

const baseQueryUnreceivedPacketsRequest: object = {
  portId: "",
  channelId: "",
  packetCommitmentSequences: Long.UZERO,
};

const baseQueryUnreceivedPacketsResponse: object = {
  sequences: Long.UZERO,
};

const baseQueryUnreceivedAcksRequest: object = {
  portId: "",
  channelId: "",
  packetAckSequences: Long.UZERO,
};

const baseQueryUnreceivedAcksResponse: object = {
  sequences: Long.UZERO,
};

const baseQueryNextSequenceReceiveRequest: object = {
  portId: "",
  channelId: "",
};

const baseQueryNextSequenceReceiveResponse: object = {
  nextSequenceReceive: Long.UZERO,
};

/**
 *  Query provides defines the gRPC querier service
 */
export interface Query {
  /**
   *  Channel queries an IBC Channel.
   */
  Channel(request: QueryChannelRequest): Promise<QueryChannelResponse>;

  /**
   *  Channels queries all the IBC channels of a chain.
   */
  Channels(request: QueryChannelsRequest): Promise<QueryChannelsResponse>;

  /**
   *  ConnectionChannels queries all the channels associated with a connection
   *  end.
   */
  ConnectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse>;

  /**
   *  ChannelClientState queries for the client state for the channel associated
   *  with the provided channel identifiers.
   */
  ChannelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse>;

  /**
   *  ChannelConsensusState queries for the consensus state for the channel
   *  associated with the provided channel identifiers.
   */
  ChannelConsensusState(
    request: QueryChannelConsensusStateRequest,
  ): Promise<QueryChannelConsensusStateResponse>;

  /**
   *  PacketCommitment queries a stored packet commitment hash.
   */
  PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;

  /**
   *  PacketCommitments returns all the packet commitments hashes associated
   *  with a channel.
   */
  PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;

  /**
   *  PacketReceipt queries if a given packet sequence has been received on the queried chain
   */
  PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;

  /**
   *  PacketAcknowledgement queries a stored packet acknowledgement hash.
   */
  PacketAcknowledgement(
    request: QueryPacketAcknowledgementRequest,
  ): Promise<QueryPacketAcknowledgementResponse>;

  /**
   *  PacketAcknowledgements returns all the packet acknowledgements associated
   *  with a channel.
   */
  PacketAcknowledgements(
    request: QueryPacketAcknowledgementsRequest,
  ): Promise<QueryPacketAcknowledgementsResponse>;

  /**
   *  UnreceivedPackets returns all the unreceived IBC packets associated with a
   *  channel and sequences.
   */
  UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;

  /**
   *  UnreceivedAcks returns all the unreceived IBC acknowledgements associated with a
   *  channel and sequences.
   */
  UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;

  /**
   *  NextSequenceReceive returns the next receive sequence for a given channel.
   */
  NextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  Channel(request: QueryChannelRequest): Promise<QueryChannelResponse> {
    const data = QueryChannelRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channel", data);
    return promise.then((data) => QueryChannelResponse.decode(new Reader(data)));
  }

  Channels(request: QueryChannelsRequest): Promise<QueryChannelsResponse> {
    const data = QueryChannelsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channels", data);
    return promise.then((data) => QueryChannelsResponse.decode(new Reader(data)));
  }

  ConnectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse> {
    const data = QueryConnectionChannelsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ConnectionChannels", data);
    return promise.then((data) => QueryConnectionChannelsResponse.decode(new Reader(data)));
  }

  ChannelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse> {
    const data = QueryChannelClientStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelClientState", data);
    return promise.then((data) => QueryChannelClientStateResponse.decode(new Reader(data)));
  }

  ChannelConsensusState(
    request: QueryChannelConsensusStateRequest,
  ): Promise<QueryChannelConsensusStateResponse> {
    const data = QueryChannelConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelConsensusState", data);
    return promise.then((data) => QueryChannelConsensusStateResponse.decode(new Reader(data)));
  }

  PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse> {
    const data = QueryPacketCommitmentRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitment", data);
    return promise.then((data) => QueryPacketCommitmentResponse.decode(new Reader(data)));
  }

  PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse> {
    const data = QueryPacketCommitmentsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitments", data);
    return promise.then((data) => QueryPacketCommitmentsResponse.decode(new Reader(data)));
  }

  PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse> {
    const data = QueryPacketReceiptRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketReceipt", data);
    return promise.then((data) => QueryPacketReceiptResponse.decode(new Reader(data)));
  }

  PacketAcknowledgement(
    request: QueryPacketAcknowledgementRequest,
  ): Promise<QueryPacketAcknowledgementResponse> {
    const data = QueryPacketAcknowledgementRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgement", data);
    return promise.then((data) => QueryPacketAcknowledgementResponse.decode(new Reader(data)));
  }

  PacketAcknowledgements(
    request: QueryPacketAcknowledgementsRequest,
  ): Promise<QueryPacketAcknowledgementsResponse> {
    const data = QueryPacketAcknowledgementsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgements", data);
    return promise.then((data) => QueryPacketAcknowledgementsResponse.decode(new Reader(data)));
  }

  UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse> {
    const data = QueryUnreceivedPacketsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedPackets", data);
    return promise.then((data) => QueryUnreceivedPacketsResponse.decode(new Reader(data)));
  }

  UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse> {
    const data = QueryUnreceivedAcksRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedAcks", data);
    return promise.then((data) => QueryUnreceivedAcksResponse.decode(new Reader(data)));
  }

  NextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse> {
    const data = QueryNextSequenceReceiveRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "NextSequenceReceive", data);
    return promise.then((data) => QueryNextSequenceReceiveResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export const protobufPackage = "ibc.core.channel.v1";

export const QueryChannelRequest = {
  encode(message: QueryChannelRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelRequest } as QueryChannelRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelRequest {
    const message = { ...baseQueryChannelRequest } as QueryChannelRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelRequest>): QueryChannelRequest {
    const message = { ...baseQueryChannelRequest } as QueryChannelRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    return message;
  },
  toJSON(message: QueryChannelRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },
};

export const QueryChannelResponse = {
  encode(message: QueryChannelResponse, writer: Writer = Writer.create()): Writer {
    if (message.channel !== undefined && message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).bytes(message.proof);
    if (message.proofHeight !== undefined && message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelResponse } as QueryChannelResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelResponse {
    const message = { ...baseQueryChannelResponse } as QueryChannelResponse;
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = Channel.fromJSON(object.channel);
    } else {
      message.channel = undefined;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromJSON(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelResponse>): QueryChannelResponse {
    const message = { ...baseQueryChannelResponse } as QueryChannelResponse;
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = Channel.fromPartial(object.channel);
    } else {
      message.channel = undefined;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof;
    } else {
      message.proof = new Uint8Array();
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromPartial(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  toJSON(message: QueryChannelResponse): unknown {
    const obj: any = {};
    message.channel !== undefined &&
      (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
    message.proofHeight !== undefined &&
      (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    return obj;
  },
};

export const QueryChannelsRequest = {
  encode(message: QueryChannelsRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelsRequest } as QueryChannelsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelsRequest {
    const message = { ...baseQueryChannelsRequest } as QueryChannelsRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelsRequest>): QueryChannelsRequest {
    const message = { ...baseQueryChannelsRequest } as QueryChannelsRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message: QueryChannelsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
};

export const QueryChannelsResponse = {
  encode(message: QueryChannelsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.channels) {
      IdentifiedChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined && message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelsResponse } as QueryChannelsResponse;
    message.channels = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channels.push(IdentifiedChannel.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelsResponse {
    const message = { ...baseQueryChannelsResponse } as QueryChannelsResponse;
    message.channels = [];
    if (object.channels !== undefined && object.channels !== null) {
      for (const e of object.channels) {
        message.channels.push(IdentifiedChannel.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromJSON(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelsResponse>): QueryChannelsResponse {
    const message = { ...baseQueryChannelsResponse } as QueryChannelsResponse;
    message.channels = [];
    if (object.channels !== undefined && object.channels !== null) {
      for (const e of object.channels) {
        message.channels.push(IdentifiedChannel.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromPartial(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  toJSON(message: QueryChannelsResponse): unknown {
    const obj: any = {};
    if (message.channels) {
      obj.channels = message.channels.map((e) => (e ? IdentifiedChannel.toJSON(e) : undefined));
    } else {
      obj.channels = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    message.height !== undefined && (obj.height = message.height ? Height.toJSON(message.height) : undefined);
    return obj;
  },
};

export const QueryConnectionChannelsRequest = {
  encode(message: QueryConnectionChannelsRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.connection);
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryConnectionChannelsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryConnectionChannelsRequest } as QueryConnectionChannelsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryConnectionChannelsRequest {
    const message = { ...baseQueryConnectionChannelsRequest } as QueryConnectionChannelsRequest;
    if (object.connection !== undefined && object.connection !== null) {
      message.connection = String(object.connection);
    } else {
      message.connection = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryConnectionChannelsRequest>): QueryConnectionChannelsRequest {
    const message = { ...baseQueryConnectionChannelsRequest } as QueryConnectionChannelsRequest;
    if (object.connection !== undefined && object.connection !== null) {
      message.connection = object.connection;
    } else {
      message.connection = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message: QueryConnectionChannelsRequest): unknown {
    const obj: any = {};
    message.connection !== undefined && (obj.connection = message.connection);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
};

export const QueryConnectionChannelsResponse = {
  encode(message: QueryConnectionChannelsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.channels) {
      IdentifiedChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined && message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryConnectionChannelsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryConnectionChannelsResponse } as QueryConnectionChannelsResponse;
    message.channels = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channels.push(IdentifiedChannel.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryConnectionChannelsResponse {
    const message = { ...baseQueryConnectionChannelsResponse } as QueryConnectionChannelsResponse;
    message.channels = [];
    if (object.channels !== undefined && object.channels !== null) {
      for (const e of object.channels) {
        message.channels.push(IdentifiedChannel.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromJSON(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryConnectionChannelsResponse>): QueryConnectionChannelsResponse {
    const message = { ...baseQueryConnectionChannelsResponse } as QueryConnectionChannelsResponse;
    message.channels = [];
    if (object.channels !== undefined && object.channels !== null) {
      for (const e of object.channels) {
        message.channels.push(IdentifiedChannel.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromPartial(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  toJSON(message: QueryConnectionChannelsResponse): unknown {
    const obj: any = {};
    if (message.channels) {
      obj.channels = message.channels.map((e) => (e ? IdentifiedChannel.toJSON(e) : undefined));
    } else {
      obj.channels = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    message.height !== undefined && (obj.height = message.height ? Height.toJSON(message.height) : undefined);
    return obj;
  },
};

export const QueryChannelClientStateRequest = {
  encode(message: QueryChannelClientStateRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelClientStateRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelClientStateRequest } as QueryChannelClientStateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelClientStateRequest {
    const message = { ...baseQueryChannelClientStateRequest } as QueryChannelClientStateRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelClientStateRequest>): QueryChannelClientStateRequest {
    const message = { ...baseQueryChannelClientStateRequest } as QueryChannelClientStateRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    return message;
  },
  toJSON(message: QueryChannelClientStateRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },
};

export const QueryChannelClientStateResponse = {
  encode(message: QueryChannelClientStateResponse, writer: Writer = Writer.create()): Writer {
    if (message.identifiedClientState !== undefined && message.identifiedClientState !== undefined) {
      IdentifiedClientState.encode(message.identifiedClientState, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).bytes(message.proof);
    if (message.proofHeight !== undefined && message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelClientStateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelClientStateResponse } as QueryChannelClientStateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifiedClientState = IdentifiedClientState.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelClientStateResponse {
    const message = { ...baseQueryChannelClientStateResponse } as QueryChannelClientStateResponse;
    if (object.identifiedClientState !== undefined && object.identifiedClientState !== null) {
      message.identifiedClientState = IdentifiedClientState.fromJSON(object.identifiedClientState);
    } else {
      message.identifiedClientState = undefined;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromJSON(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelClientStateResponse>): QueryChannelClientStateResponse {
    const message = { ...baseQueryChannelClientStateResponse } as QueryChannelClientStateResponse;
    if (object.identifiedClientState !== undefined && object.identifiedClientState !== null) {
      message.identifiedClientState = IdentifiedClientState.fromPartial(object.identifiedClientState);
    } else {
      message.identifiedClientState = undefined;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof;
    } else {
      message.proof = new Uint8Array();
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromPartial(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  toJSON(message: QueryChannelClientStateResponse): unknown {
    const obj: any = {};
    message.identifiedClientState !== undefined &&
      (obj.identifiedClientState = message.identifiedClientState
        ? IdentifiedClientState.toJSON(message.identifiedClientState)
        : undefined);
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
    message.proofHeight !== undefined &&
      (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    return obj;
  },
};

export const QueryChannelConsensusStateRequest = {
  encode(message: QueryChannelConsensusStateRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    writer.uint32(24).uint64(message.revisionNumber);
    writer.uint32(32).uint64(message.revisionHeight);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelConsensusStateRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelConsensusStateRequest } as QueryChannelConsensusStateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.revisionNumber = reader.uint64() as Long;
          break;
        case 4:
          message.revisionHeight = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelConsensusStateRequest {
    const message = { ...baseQueryChannelConsensusStateRequest } as QueryChannelConsensusStateRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.revisionNumber !== undefined && object.revisionNumber !== null) {
      message.revisionNumber = Long.fromString(object.revisionNumber);
    } else {
      message.revisionNumber = Long.UZERO;
    }
    if (object.revisionHeight !== undefined && object.revisionHeight !== null) {
      message.revisionHeight = Long.fromString(object.revisionHeight);
    } else {
      message.revisionHeight = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelConsensusStateRequest>): QueryChannelConsensusStateRequest {
    const message = { ...baseQueryChannelConsensusStateRequest } as QueryChannelConsensusStateRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.revisionNumber !== undefined && object.revisionNumber !== null) {
      message.revisionNumber = object.revisionNumber as Long;
    } else {
      message.revisionNumber = Long.UZERO;
    }
    if (object.revisionHeight !== undefined && object.revisionHeight !== null) {
      message.revisionHeight = object.revisionHeight as Long;
    } else {
      message.revisionHeight = Long.UZERO;
    }
    return message;
  },
  toJSON(message: QueryChannelConsensusStateRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.revisionNumber !== undefined &&
      (obj.revisionNumber = (message.revisionNumber || Long.UZERO).toString());
    message.revisionHeight !== undefined &&
      (obj.revisionHeight = (message.revisionHeight || Long.UZERO).toString());
    return obj;
  },
};

export const QueryChannelConsensusStateResponse = {
  encode(message: QueryChannelConsensusStateResponse, writer: Writer = Writer.create()): Writer {
    if (message.consensusState !== undefined && message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.clientId);
    writer.uint32(26).bytes(message.proof);
    if (message.proofHeight !== undefined && message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryChannelConsensusStateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryChannelConsensusStateResponse } as QueryChannelConsensusStateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusState = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.clientId = reader.string();
          break;
        case 3:
          message.proof = reader.bytes();
          break;
        case 4:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryChannelConsensusStateResponse {
    const message = { ...baseQueryChannelConsensusStateResponse } as QueryChannelConsensusStateResponse;
    if (object.consensusState !== undefined && object.consensusState !== null) {
      message.consensusState = Any.fromJSON(object.consensusState);
    } else {
      message.consensusState = undefined;
    }
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId);
    } else {
      message.clientId = "";
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromJSON(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryChannelConsensusStateResponse>): QueryChannelConsensusStateResponse {
    const message = { ...baseQueryChannelConsensusStateResponse } as QueryChannelConsensusStateResponse;
    if (object.consensusState !== undefined && object.consensusState !== null) {
      message.consensusState = Any.fromPartial(object.consensusState);
    } else {
      message.consensusState = undefined;
    }
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId;
    } else {
      message.clientId = "";
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof;
    } else {
      message.proof = new Uint8Array();
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromPartial(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  toJSON(message: QueryChannelConsensusStateResponse): unknown {
    const obj: any = {};
    message.consensusState !== undefined &&
      (obj.consensusState = message.consensusState ? Any.toJSON(message.consensusState) : undefined);
    message.clientId !== undefined && (obj.clientId = message.clientId);
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
    message.proofHeight !== undefined &&
      (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    return obj;
  },
};

export const QueryPacketCommitmentRequest = {
  encode(message: QueryPacketCommitmentRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    writer.uint32(24).uint64(message.sequence);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketCommitmentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketCommitmentRequest } as QueryPacketCommitmentRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketCommitmentRequest {
    const message = { ...baseQueryPacketCommitmentRequest } as QueryPacketCommitmentRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentRequest>): QueryPacketCommitmentRequest {
    const message = { ...baseQueryPacketCommitmentRequest } as QueryPacketCommitmentRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
  toJSON(message: QueryPacketCommitmentRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.UZERO).toString());
    return obj;
  },
};

export const QueryPacketCommitmentResponse = {
  encode(message: QueryPacketCommitmentResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.commitment);
    writer.uint32(18).bytes(message.proof);
    if (message.proofHeight !== undefined && message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketCommitmentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketCommitmentResponse } as QueryPacketCommitmentResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commitment = reader.bytes();
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketCommitmentResponse {
    const message = { ...baseQueryPacketCommitmentResponse } as QueryPacketCommitmentResponse;
    if (object.commitment !== undefined && object.commitment !== null) {
      message.commitment = bytesFromBase64(object.commitment);
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromJSON(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentResponse>): QueryPacketCommitmentResponse {
    const message = { ...baseQueryPacketCommitmentResponse } as QueryPacketCommitmentResponse;
    if (object.commitment !== undefined && object.commitment !== null) {
      message.commitment = object.commitment;
    } else {
      message.commitment = new Uint8Array();
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof;
    } else {
      message.proof = new Uint8Array();
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromPartial(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  toJSON(message: QueryPacketCommitmentResponse): unknown {
    const obj: any = {};
    message.commitment !== undefined &&
      (obj.commitment = base64FromBytes(
        message.commitment !== undefined ? message.commitment : new Uint8Array(),
      ));
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
    message.proofHeight !== undefined &&
      (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    return obj;
  },
};

export const QueryPacketCommitmentsRequest = {
  encode(message: QueryPacketCommitmentsRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketCommitmentsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketCommitmentsRequest } as QueryPacketCommitmentsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketCommitmentsRequest {
    const message = { ...baseQueryPacketCommitmentsRequest } as QueryPacketCommitmentsRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentsRequest>): QueryPacketCommitmentsRequest {
    const message = { ...baseQueryPacketCommitmentsRequest } as QueryPacketCommitmentsRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message: QueryPacketCommitmentsRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
};

export const QueryPacketCommitmentsResponse = {
  encode(message: QueryPacketCommitmentsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.commitments) {
      PacketState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined && message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketCommitmentsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketCommitmentsResponse } as QueryPacketCommitmentsResponse;
    message.commitments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commitments.push(PacketState.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketCommitmentsResponse {
    const message = { ...baseQueryPacketCommitmentsResponse } as QueryPacketCommitmentsResponse;
    message.commitments = [];
    if (object.commitments !== undefined && object.commitments !== null) {
      for (const e of object.commitments) {
        message.commitments.push(PacketState.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromJSON(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentsResponse>): QueryPacketCommitmentsResponse {
    const message = { ...baseQueryPacketCommitmentsResponse } as QueryPacketCommitmentsResponse;
    message.commitments = [];
    if (object.commitments !== undefined && object.commitments !== null) {
      for (const e of object.commitments) {
        message.commitments.push(PacketState.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromPartial(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  toJSON(message: QueryPacketCommitmentsResponse): unknown {
    const obj: any = {};
    if (message.commitments) {
      obj.commitments = message.commitments.map((e) => (e ? PacketState.toJSON(e) : undefined));
    } else {
      obj.commitments = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    message.height !== undefined && (obj.height = message.height ? Height.toJSON(message.height) : undefined);
    return obj;
  },
};

export const QueryPacketReceiptRequest = {
  encode(message: QueryPacketReceiptRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    writer.uint32(24).uint64(message.sequence);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketReceiptRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketReceiptRequest } as QueryPacketReceiptRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketReceiptRequest {
    const message = { ...baseQueryPacketReceiptRequest } as QueryPacketReceiptRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketReceiptRequest>): QueryPacketReceiptRequest {
    const message = { ...baseQueryPacketReceiptRequest } as QueryPacketReceiptRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
  toJSON(message: QueryPacketReceiptRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.UZERO).toString());
    return obj;
  },
};

export const QueryPacketReceiptResponse = {
  encode(message: QueryPacketReceiptResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(16).bool(message.received);
    writer.uint32(26).bytes(message.proof);
    if (message.proofHeight !== undefined && message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketReceiptResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketReceiptResponse } as QueryPacketReceiptResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.received = reader.bool();
          break;
        case 3:
          message.proof = reader.bytes();
          break;
        case 4:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketReceiptResponse {
    const message = { ...baseQueryPacketReceiptResponse } as QueryPacketReceiptResponse;
    if (object.received !== undefined && object.received !== null) {
      message.received = Boolean(object.received);
    } else {
      message.received = false;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromJSON(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketReceiptResponse>): QueryPacketReceiptResponse {
    const message = { ...baseQueryPacketReceiptResponse } as QueryPacketReceiptResponse;
    if (object.received !== undefined && object.received !== null) {
      message.received = object.received;
    } else {
      message.received = false;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof;
    } else {
      message.proof = new Uint8Array();
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromPartial(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  toJSON(message: QueryPacketReceiptResponse): unknown {
    const obj: any = {};
    message.received !== undefined && (obj.received = message.received);
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
    message.proofHeight !== undefined &&
      (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    return obj;
  },
};

export const QueryPacketAcknowledgementRequest = {
  encode(message: QueryPacketAcknowledgementRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    writer.uint32(24).uint64(message.sequence);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketAcknowledgementRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketAcknowledgementRequest } as QueryPacketAcknowledgementRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketAcknowledgementRequest {
    const message = { ...baseQueryPacketAcknowledgementRequest } as QueryPacketAcknowledgementRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementRequest>): QueryPacketAcknowledgementRequest {
    const message = { ...baseQueryPacketAcknowledgementRequest } as QueryPacketAcknowledgementRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
  toJSON(message: QueryPacketAcknowledgementRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.UZERO).toString());
    return obj;
  },
};

export const QueryPacketAcknowledgementResponse = {
  encode(message: QueryPacketAcknowledgementResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.acknowledgement);
    writer.uint32(18).bytes(message.proof);
    if (message.proofHeight !== undefined && message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketAcknowledgementResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketAcknowledgementResponse } as QueryPacketAcknowledgementResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.acknowledgement = reader.bytes();
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketAcknowledgementResponse {
    const message = { ...baseQueryPacketAcknowledgementResponse } as QueryPacketAcknowledgementResponse;
    if (object.acknowledgement !== undefined && object.acknowledgement !== null) {
      message.acknowledgement = bytesFromBase64(object.acknowledgement);
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromJSON(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementResponse>): QueryPacketAcknowledgementResponse {
    const message = { ...baseQueryPacketAcknowledgementResponse } as QueryPacketAcknowledgementResponse;
    if (object.acknowledgement !== undefined && object.acknowledgement !== null) {
      message.acknowledgement = object.acknowledgement;
    } else {
      message.acknowledgement = new Uint8Array();
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof;
    } else {
      message.proof = new Uint8Array();
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromPartial(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  toJSON(message: QueryPacketAcknowledgementResponse): unknown {
    const obj: any = {};
    message.acknowledgement !== undefined &&
      (obj.acknowledgement = base64FromBytes(
        message.acknowledgement !== undefined ? message.acknowledgement : new Uint8Array(),
      ));
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
    message.proofHeight !== undefined &&
      (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    return obj;
  },
};

export const QueryPacketAcknowledgementsRequest = {
  encode(message: QueryPacketAcknowledgementsRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketAcknowledgementsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketAcknowledgementsRequest } as QueryPacketAcknowledgementsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketAcknowledgementsRequest {
    const message = { ...baseQueryPacketAcknowledgementsRequest } as QueryPacketAcknowledgementsRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementsRequest>): QueryPacketAcknowledgementsRequest {
    const message = { ...baseQueryPacketAcknowledgementsRequest } as QueryPacketAcknowledgementsRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message: QueryPacketAcknowledgementsRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
};

export const QueryPacketAcknowledgementsResponse = {
  encode(message: QueryPacketAcknowledgementsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.acknowledgements) {
      PacketState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined && message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryPacketAcknowledgementsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPacketAcknowledgementsResponse } as QueryPacketAcknowledgementsResponse;
    message.acknowledgements = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.acknowledgements.push(PacketState.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPacketAcknowledgementsResponse {
    const message = { ...baseQueryPacketAcknowledgementsResponse } as QueryPacketAcknowledgementsResponse;
    message.acknowledgements = [];
    if (object.acknowledgements !== undefined && object.acknowledgements !== null) {
      for (const e of object.acknowledgements) {
        message.acknowledgements.push(PacketState.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromJSON(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementsResponse>): QueryPacketAcknowledgementsResponse {
    const message = { ...baseQueryPacketAcknowledgementsResponse } as QueryPacketAcknowledgementsResponse;
    message.acknowledgements = [];
    if (object.acknowledgements !== undefined && object.acknowledgements !== null) {
      for (const e of object.acknowledgements) {
        message.acknowledgements.push(PacketState.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromPartial(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  toJSON(message: QueryPacketAcknowledgementsResponse): unknown {
    const obj: any = {};
    if (message.acknowledgements) {
      obj.acknowledgements = message.acknowledgements.map((e) => (e ? PacketState.toJSON(e) : undefined));
    } else {
      obj.acknowledgements = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    message.height !== undefined && (obj.height = message.height ? Height.toJSON(message.height) : undefined);
    return obj;
  },
};

export const QueryUnreceivedPacketsRequest = {
  encode(message: QueryUnreceivedPacketsRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    writer.uint32(26).fork();
    for (const v of message.packetCommitmentSequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryUnreceivedPacketsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryUnreceivedPacketsRequest } as QueryUnreceivedPacketsRequest;
    message.packetCommitmentSequences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.packetCommitmentSequences.push(reader.uint64() as Long);
            }
          } else {
            message.packetCommitmentSequences.push(reader.uint64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryUnreceivedPacketsRequest {
    const message = { ...baseQueryUnreceivedPacketsRequest } as QueryUnreceivedPacketsRequest;
    message.packetCommitmentSequences = [];
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.packetCommitmentSequences !== undefined && object.packetCommitmentSequences !== null) {
      for (const e of object.packetCommitmentSequences) {
        message.packetCommitmentSequences.push(Long.fromString(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryUnreceivedPacketsRequest>): QueryUnreceivedPacketsRequest {
    const message = { ...baseQueryUnreceivedPacketsRequest } as QueryUnreceivedPacketsRequest;
    message.packetCommitmentSequences = [];
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.packetCommitmentSequences !== undefined && object.packetCommitmentSequences !== null) {
      for (const e of object.packetCommitmentSequences) {
        message.packetCommitmentSequences.push(e);
      }
    }
    return message;
  },
  toJSON(message: QueryUnreceivedPacketsRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    if (message.packetCommitmentSequences) {
      obj.packetCommitmentSequences = message.packetCommitmentSequences.map((e) =>
        (e || Long.UZERO).toString(),
      );
    } else {
      obj.packetCommitmentSequences = [];
    }
    return obj;
  },
};

export const QueryUnreceivedPacketsResponse = {
  encode(message: QueryUnreceivedPacketsResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork();
    for (const v of message.sequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.height !== undefined && message.height !== undefined) {
      Height.encode(message.height, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryUnreceivedPacketsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryUnreceivedPacketsResponse } as QueryUnreceivedPacketsResponse;
    message.sequences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sequences.push(reader.uint64() as Long);
            }
          } else {
            message.sequences.push(reader.uint64() as Long);
          }
          break;
        case 2:
          message.height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryUnreceivedPacketsResponse {
    const message = { ...baseQueryUnreceivedPacketsResponse } as QueryUnreceivedPacketsResponse;
    message.sequences = [];
    if (object.sequences !== undefined && object.sequences !== null) {
      for (const e of object.sequences) {
        message.sequences.push(Long.fromString(e));
      }
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromJSON(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryUnreceivedPacketsResponse>): QueryUnreceivedPacketsResponse {
    const message = { ...baseQueryUnreceivedPacketsResponse } as QueryUnreceivedPacketsResponse;
    message.sequences = [];
    if (object.sequences !== undefined && object.sequences !== null) {
      for (const e of object.sequences) {
        message.sequences.push(e);
      }
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromPartial(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  toJSON(message: QueryUnreceivedPacketsResponse): unknown {
    const obj: any = {};
    if (message.sequences) {
      obj.sequences = message.sequences.map((e) => (e || Long.UZERO).toString());
    } else {
      obj.sequences = [];
    }
    message.height !== undefined && (obj.height = message.height ? Height.toJSON(message.height) : undefined);
    return obj;
  },
};

export const QueryUnreceivedAcksRequest = {
  encode(message: QueryUnreceivedAcksRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    writer.uint32(26).fork();
    for (const v of message.packetAckSequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryUnreceivedAcksRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryUnreceivedAcksRequest } as QueryUnreceivedAcksRequest;
    message.packetAckSequences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.packetAckSequences.push(reader.uint64() as Long);
            }
          } else {
            message.packetAckSequences.push(reader.uint64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryUnreceivedAcksRequest {
    const message = { ...baseQueryUnreceivedAcksRequest } as QueryUnreceivedAcksRequest;
    message.packetAckSequences = [];
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.packetAckSequences !== undefined && object.packetAckSequences !== null) {
      for (const e of object.packetAckSequences) {
        message.packetAckSequences.push(Long.fromString(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryUnreceivedAcksRequest>): QueryUnreceivedAcksRequest {
    const message = { ...baseQueryUnreceivedAcksRequest } as QueryUnreceivedAcksRequest;
    message.packetAckSequences = [];
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.packetAckSequences !== undefined && object.packetAckSequences !== null) {
      for (const e of object.packetAckSequences) {
        message.packetAckSequences.push(e);
      }
    }
    return message;
  },
  toJSON(message: QueryUnreceivedAcksRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    if (message.packetAckSequences) {
      obj.packetAckSequences = message.packetAckSequences.map((e) => (e || Long.UZERO).toString());
    } else {
      obj.packetAckSequences = [];
    }
    return obj;
  },
};

export const QueryUnreceivedAcksResponse = {
  encode(message: QueryUnreceivedAcksResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork();
    for (const v of message.sequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.height !== undefined && message.height !== undefined) {
      Height.encode(message.height, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryUnreceivedAcksResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryUnreceivedAcksResponse } as QueryUnreceivedAcksResponse;
    message.sequences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sequences.push(reader.uint64() as Long);
            }
          } else {
            message.sequences.push(reader.uint64() as Long);
          }
          break;
        case 2:
          message.height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryUnreceivedAcksResponse {
    const message = { ...baseQueryUnreceivedAcksResponse } as QueryUnreceivedAcksResponse;
    message.sequences = [];
    if (object.sequences !== undefined && object.sequences !== null) {
      for (const e of object.sequences) {
        message.sequences.push(Long.fromString(e));
      }
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromJSON(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryUnreceivedAcksResponse>): QueryUnreceivedAcksResponse {
    const message = { ...baseQueryUnreceivedAcksResponse } as QueryUnreceivedAcksResponse;
    message.sequences = [];
    if (object.sequences !== undefined && object.sequences !== null) {
      for (const e of object.sequences) {
        message.sequences.push(e);
      }
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromPartial(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },
  toJSON(message: QueryUnreceivedAcksResponse): unknown {
    const obj: any = {};
    if (message.sequences) {
      obj.sequences = message.sequences.map((e) => (e || Long.UZERO).toString());
    } else {
      obj.sequences = [];
    }
    message.height !== undefined && (obj.height = message.height ? Height.toJSON(message.height) : undefined);
    return obj;
  },
};

export const QueryNextSequenceReceiveRequest = {
  encode(message: QueryNextSequenceReceiveRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.portId);
    writer.uint32(18).string(message.channelId);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryNextSequenceReceiveRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryNextSequenceReceiveRequest } as QueryNextSequenceReceiveRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryNextSequenceReceiveRequest {
    const message = { ...baseQueryNextSequenceReceiveRequest } as QueryNextSequenceReceiveRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryNextSequenceReceiveRequest>): QueryNextSequenceReceiveRequest {
    const message = { ...baseQueryNextSequenceReceiveRequest } as QueryNextSequenceReceiveRequest;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    return message;
  },
  toJSON(message: QueryNextSequenceReceiveRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },
};

export const QueryNextSequenceReceiveResponse = {
  encode(message: QueryNextSequenceReceiveResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.nextSequenceReceive);
    writer.uint32(18).bytes(message.proof);
    if (message.proofHeight !== undefined && message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryNextSequenceReceiveResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryNextSequenceReceiveResponse } as QueryNextSequenceReceiveResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextSequenceReceive = reader.uint64() as Long;
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryNextSequenceReceiveResponse {
    const message = { ...baseQueryNextSequenceReceiveResponse } as QueryNextSequenceReceiveResponse;
    if (object.nextSequenceReceive !== undefined && object.nextSequenceReceive !== null) {
      message.nextSequenceReceive = Long.fromString(object.nextSequenceReceive);
    } else {
      message.nextSequenceReceive = Long.UZERO;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromJSON(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryNextSequenceReceiveResponse>): QueryNextSequenceReceiveResponse {
    const message = { ...baseQueryNextSequenceReceiveResponse } as QueryNextSequenceReceiveResponse;
    if (object.nextSequenceReceive !== undefined && object.nextSequenceReceive !== null) {
      message.nextSequenceReceive = object.nextSequenceReceive as Long;
    } else {
      message.nextSequenceReceive = Long.UZERO;
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof;
    } else {
      message.proof = new Uint8Array();
    }
    if (object.proofHeight !== undefined && object.proofHeight !== null) {
      message.proofHeight = Height.fromPartial(object.proofHeight);
    } else {
      message.proofHeight = undefined;
    }
    return message;
  },
  toJSON(message: QueryNextSequenceReceiveResponse): unknown {
    const obj: any = {};
    message.nextSequenceReceive !== undefined &&
      (obj.nextSequenceReceive = (message.nextSequenceReceive || Long.UZERO).toString());
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
    message.proofHeight !== undefined &&
      (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown) as WindowBase64;
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, "base64").toString("binary"));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, "binary").toString("base64"));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

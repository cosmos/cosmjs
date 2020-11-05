import { ibc } from "../codec";
import { QueryClient } from "./queryclient";
export interface IbcExtension {
  readonly ibc: {
    readonly channel: (portId: string, channelId: string) => Promise<ibc.core.channel.v1.IChannel | null>;
    readonly packetCommitment: (portId: string, channelId: string, sequence: number) => Promise<Uint8Array>;
    readonly packetAcknowledgement: (
      portId: string,
      channelId: string,
      sequence: number,
    ) => Promise<Uint8Array>;
    readonly nextSequenceReceive: (portId: string, channelId: string) => Promise<number | null>;
    readonly unverified: {
      readonly channel: (
        portId: string,
        channelId: string,
      ) => Promise<ibc.core.channel.v1.IQueryChannelResponse>;
      readonly channels: (paginationKey?: Uint8Array) => Promise<ibc.core.channel.v1.IQueryChannelsResponse>;
      readonly connectionChannels: (
        connection: string,
        paginationKey?: Uint8Array,
      ) => Promise<ibc.core.channel.v1.IQueryConnectionChannelsResponse>;
      readonly packetCommitment: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<ibc.core.channel.v1.IQueryPacketCommitmentResponse>;
      readonly packetCommitments: (
        portId: string,
        channelId: string,
        paginationKey?: Uint8Array,
      ) => Promise<ibc.core.channel.v1.IQueryPacketCommitmentsResponse>;
      readonly packetAcknowledgement: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<ibc.core.channel.v1.IQueryPacketAcknowledgementResponse>;
      readonly unreceivedPackets: (
        portId: string,
        channelId: string,
        packetCommitmentSequences: readonly number[],
      ) => Promise<ibc.core.channel.v1.IQueryUnreceivedPacketsResponse>;
      readonly unreceivedAcks: (
        portId: string,
        channelId: string,
        packetCommitmentSequences: readonly number[],
      ) => Promise<ibc.core.channel.v1.IQueryUnreceivedAcksResponse>;
      readonly nextSequenceReceive: (
        portId: string,
        channelId: string,
      ) => Promise<ibc.core.channel.v1.IQueryNextSequenceReceiveResponse>;
      readonly connection: (connectionId: string) => Promise<ibc.core.connection.v1.IQueryConnectionResponse>;
      readonly connections: (
        paginationKey?: Uint8Array,
      ) => Promise<ibc.core.connection.v1.IQueryConnectionsResponse>;
      readonly clientConnections: (
        clientId: string,
      ) => Promise<ibc.core.connection.v1.IQueryClientConnectionsResponse>;
    };
  };
}
export declare function setupIbcExtension(base: QueryClient): IbcExtension;

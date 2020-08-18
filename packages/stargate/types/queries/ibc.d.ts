import { ibc } from "../codec";
import { QueryClient } from "./queryclient";
export interface IbcExtension {
  readonly ibc: {
    readonly unverified: {
      readonly channel: (portId: string, channelId: string) => Promise<ibc.channel.IQueryChannelResponse>;
      readonly channels: () => Promise<ibc.channel.IQueryChannelsResponse>;
      readonly connectionChannels: () => Promise<ibc.channel.IQueryConnectionChannelsResponse>;
      readonly packetCommitment: () => Promise<ibc.channel.IQueryPacketCommitmentResponse>;
      readonly packetCommitments: () => Promise<ibc.channel.IQueryPacketCommitmentsResponse>;
      readonly packetAcknowledgement: () => Promise<ibc.channel.IQueryPacketAcknowledgementResponse>;
      readonly unrelayedPackets: () => Promise<ibc.channel.IQueryUnrelayedPacketsResponse>;
      readonly nextSequenceReceive: () => Promise<ibc.channel.IQueryNextSequenceReceiveResponse>;
      readonly connection: (connectionId: string) => Promise<ibc.connection.IQueryConnectionResponse>;
      readonly connections: () => Promise<ibc.connection.IQueryConnectionsResponse>;
      readonly clientConnections: () => Promise<ibc.connection.IQueryClientConnectionsResponse>;
    };
  };
}
export declare function setupIbcExtension(base: QueryClient): IbcExtension;

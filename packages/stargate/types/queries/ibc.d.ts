import { ibc } from "../codec";
import { QueryClient } from "./queryclient";
export interface IbcExtension {
  readonly ibc: {
    readonly unverified: {
      readonly channel: (portId: string, channelId: string) => Promise<ibc.channel.IQueryChannelResponse>;
      readonly channels: () => Promise<ibc.channel.IQueryChannelsResponse>;
      readonly connectionChannels: (
        connection: string,
      ) => Promise<ibc.channel.IQueryConnectionChannelsResponse>;
      readonly packetCommitment: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<ibc.channel.IQueryPacketCommitmentResponse>;
      readonly packetCommitments: (
        portId: string,
        channelId: string,
      ) => Promise<ibc.channel.IQueryPacketCommitmentsResponse>;
      readonly packetAcknowledgement: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<ibc.channel.IQueryPacketAcknowledgementResponse>;
      readonly unrelayedPackets: (
        portId: string,
        channelId: string,
        packetCommitmentSequences: readonly number[],
        acknowledgements: boolean,
      ) => Promise<ibc.channel.IQueryUnrelayedPacketsResponse>;
      readonly nextSequenceReceive: (
        portId: string,
        channelId: string,
      ) => Promise<ibc.channel.IQueryNextSequenceReceiveResponse>;
      readonly connection: (connectionId: string) => Promise<ibc.connection.IQueryConnectionResponse>;
      readonly connections: () => Promise<ibc.connection.IQueryConnectionsResponse>;
      readonly clientConnections: (
        clientId: string,
      ) => Promise<ibc.connection.IQueryClientConnectionsResponse>;
    };
  };
}
export declare function setupIbcExtension(base: QueryClient): IbcExtension;

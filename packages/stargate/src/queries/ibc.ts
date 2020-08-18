import { ibc } from "../codec";
import { QueryClient } from "./queryclient";
import { toObject } from "./utils";

export interface IbcExtension {
  readonly ibc: {
    readonly unverified: {
      // Queries for ibc.channel

      readonly channel: (portId: string, channelId: string) => Promise<ibc.channel.IQueryChannelResponse>;
      readonly channels: () => Promise<ibc.channel.IQueryChannelsResponse>;
      readonly connectionChannels: () => Promise<ibc.channel.IQueryConnectionChannelsResponse>;
      readonly packetCommitment: () => Promise<ibc.channel.IQueryPacketCommitmentResponse>;
      readonly packetCommitments: () => Promise<ibc.channel.IQueryPacketCommitmentsResponse>;
      readonly packetAcknowledgement: () => Promise<ibc.channel.IQueryPacketAcknowledgementResponse>;
      readonly unrelayedPackets: () => Promise<ibc.channel.IQueryUnrelayedPacketsResponse>;
      readonly nextSequenceReceive: () => Promise<ibc.channel.IQueryNextSequenceReceiveResponse>;

      // Queries for ibc.connection

      readonly connection: (connectionId: string) => Promise<ibc.connection.IQueryConnectionResponse>;
      readonly connections: () => Promise<ibc.connection.IQueryConnectionsResponse>;
      readonly clientConnections: () => Promise<ibc.connection.IQueryClientConnectionsResponse>;
    };
  };
}

export function setupIbcExtension(base: QueryClient): IbcExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification

  const channelQuerySerice = ibc.channel.Query.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/ibc.channel.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });

  const connectionQuerySerice = ibc.connection.Query.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/ibc.connection.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });

  return {
    ibc: {
      unverified: {
        // Queries for ibc.channel

        channel: async (portId: string, channelId: string) => {
          const response = await channelQuerySerice.channel({ portId: portId, channelId: channelId });
          return toObject(response);
        },
        channels: async () => {
          const response = await channelQuerySerice.channels({});
          return toObject(response);
        },
        connectionChannels: async () => {
          const response = await channelQuerySerice.connectionChannels({});
          return toObject(response);
        },
        packetCommitment: async () => {
          const response = await channelQuerySerice.packetCommitment({});
          return toObject(response);
        },
        packetCommitments: async () => {
          const response = await channelQuerySerice.packetCommitments({});
          return toObject(response);
        },
        packetAcknowledgement: async () => {
          const response = await channelQuerySerice.packetAcknowledgement({});
          return toObject(response);
        },
        unrelayedPackets: async () => {
          const response = await channelQuerySerice.unrelayedPackets({});
          return toObject(response);
        },
        nextSequenceReceive: async () => {
          const response = await channelQuerySerice.nextSequenceReceive({});
          return toObject(response);
        },

        // Queries for ibc.connection

        connection: async (connectionId: string) => {
          const response = await connectionQuerySerice.connection({ connectionId: connectionId });
          return toObject(response);
        },
        connections: async () => {
          const response = await connectionQuerySerice.connections({});
          return toObject(response);
        },
        clientConnections: async () => {
          const response = await connectionQuerySerice.clientConnections({});
          return toObject(response);
        },
      },
    },
  };
}

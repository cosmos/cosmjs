/* eslint-disable @typescript-eslint/naming-convention */
import { toAscii } from "@cosmjs/encoding";
import { Uint64 } from "@cosmjs/math";
import Long from "long";

import { ibc } from "../codec";
import { QueryClient } from "./queryclient";
import { toObject } from "./utils";

const { Query: ChannelQuery } = ibc.core.channel.v1;
const { Query: ConnectionQuery } = ibc.core.connection.v1;

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
      // Queries for ibc.core.channel.v1
      readonly channel: (
        portId: string,
        channelId: string,
      ) => Promise<ibc.core.channel.v1.IQueryChannelResponse>;
      readonly channels: () => Promise<ibc.core.channel.v1.IQueryChannelsResponse>;
      readonly connectionChannels: (
        connection: string,
      ) => Promise<ibc.core.channel.v1.IQueryConnectionChannelsResponse>;
      readonly packetCommitment: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<ibc.core.channel.v1.IQueryPacketCommitmentResponse>;
      readonly packetCommitments: (
        portId: string,
        channelId: string,
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

      // Queries for ibc.core.connection.v1

      readonly connection: (connectionId: string) => Promise<ibc.core.connection.v1.IQueryConnectionResponse>;
      readonly connections: () => Promise<ibc.core.connection.v1.IQueryConnectionsResponse>;
      readonly clientConnections: (
        clientId: string,
      ) => Promise<ibc.core.connection.v1.IQueryClientConnectionsResponse>;
    };
  };
}

export function setupIbcExtension(base: QueryClient): IbcExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification

  const channelQueryService = ChannelQuery.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/ibc.core.channel.v1.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });

  const connectionQueryService = ConnectionQuery.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/ibc.core.connection.v1.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });

  return {
    ibc: {
      channel: async (portId: string, channelId: string) => {
        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L55-L65
        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L117-L120
        const key = toAscii(`channelEnds/ports/${portId}/channels/${channelId}`);
        const responseData = await base.queryVerified("ibc", key);
        return responseData.length ? toObject(ibc.core.channel.v1.Channel.decode(responseData)) : null;
      },
      packetCommitment: async (portId: string, channelId: string, sequence: number) => {
        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L128-L133
        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L183-L185
        const key = toAscii(`commitments/ports/${portId}/channels/${channelId}/packets/${sequence}`);
        const responseData = await base.queryVerified("ibc", key);
        // keeper code doesn't parse, but returns raw
        return responseData;
      },
      packetAcknowledgement: async (portId: string, channelId: string, sequence: number) => {
        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L159-L166
        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L153-L156
        const key = toAscii(`acks/ports/${portId}/channels/${channelId}/acknowledgements/${sequence}`);
        const responseData = await base.queryVerified("ibc", key);
        // keeper code doesn't parse, but returns raw
        return responseData;
      },
      nextSequenceReceive: async (portId: string, channelId: string) => {
        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L92-L101
        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L133-L136
        const key = toAscii(`seqAcks/ports/${portId}/channels/${channelId}/nextSequenceAck`);
        const responseData = await base.queryVerified("ibc", key);
        return responseData.length ? Uint64.fromBytes(responseData).toNumber() : null;
      },

      unverified: {
        // Queries for ibc.core.channel.v1
        channel: async (portId: string, channelId: string) => {
          const response = await channelQueryService.channel({ portId: portId, channelId: channelId });
          return toObject(response);
        },
        channels: async () => {
          const response = await channelQueryService.channels({});
          return toObject(response);
        },
        connectionChannels: async (connection: string) => {
          const response = await channelQueryService.connectionChannels({ connection: connection });
          return toObject(response);
        },
        packetCommitment: async (portId: string, channelId: string, sequence: number) => {
          const response = await channelQueryService.packetCommitment({
            portId: portId,
            channelId: channelId,
            sequence: Long.fromNumber(sequence),
          });
          return toObject(response);
        },
        packetCommitments: async (portId: string, channelId: string) => {
          const response = await channelQueryService.packetCommitments({
            portId: portId,
            channelId: channelId,
          });
          return toObject(response);
        },
        packetAcknowledgement: async (portId: string, channelId: string, sequence: number) => {
          const response = await channelQueryService.packetAcknowledgement({
            portId: portId,
            channelId: channelId,
            sequence: Long.fromNumber(sequence),
          });
          return toObject(response);
        },
        unreceivedPackets: async (
          portId: string,
          channelId: string,
          packetCommitmentSequences: readonly number[],
        ) => {
          const response = await channelQueryService.unreceivedPackets({
            portId: portId,
            channelId: channelId,
            packetCommitmentSequences: packetCommitmentSequences.map((s) => Long.fromNumber(s)),
          });
          return toObject(response);
        },
        unreceivedAcks: async (portId: string, channelId: string, packetAckSequences: readonly number[]) => {
          const response = await channelQueryService.unreceivedAcks({
            portId: portId,
            channelId: channelId,
            packetAckSequences: packetAckSequences.map((s) => Long.fromNumber(s)),
          });
          return toObject(response);
        },
        nextSequenceReceive: async (portId: string, channelId: string) => {
          const response = await channelQueryService.nextSequenceReceive({
            portId: portId,
            channelId: channelId,
          });
          return toObject(response);
        },

        // Queries for ibc.core.connection.v1

        connection: async (connectionId: string) => {
          const response = await connectionQueryService.connection({ connectionId: connectionId });
          return toObject(response);
        },
        connections: async () => {
          const response = await connectionQueryService.connections({});
          return toObject(response);
        },
        clientConnections: async (clientId: string) => {
          const response = await connectionQueryService.clientConnections({ clientId: clientId });
          return toObject(response);
        },
      },
    },
  };
}

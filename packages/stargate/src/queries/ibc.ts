import { toAscii } from "@cosmjs/encoding";
import { Uint64 } from "@cosmjs/math";
import Long from "long";

import { ibc } from "../codec";
import { QueryClient } from "./queryclient";
import { toObject } from "./utils";

export interface IbcExtension {
  readonly ibc: {
    readonly channel: (portId: string, channelId: string) => Promise<ibc.channel.IChannel | null>;
    readonly packetCommitment: (portId: string, channelId: string, sequence: number) => Promise<Uint8Array>;
    readonly packetAcknowledgement: (
      portId: string,
      channelId: string,
      sequence: number,
    ) => Promise<Uint8Array>;
    readonly nextSequenceReceive: (portId: string, channelId: string) => Promise<number | null>;
    readonly unverified: {
      // Queries for ibc.channel
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

      // Queries for ibc.connection

      readonly connection: (connectionId: string) => Promise<ibc.connection.IQueryConnectionResponse>;
      readonly connections: () => Promise<ibc.connection.IQueryConnectionsResponse>;
      readonly clientConnections: (
        clientId: string,
      ) => Promise<ibc.connection.IQueryClientConnectionsResponse>;
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
      channel: async (portId: string, channelId: string) => {
        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L55-L65
        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L117-L120
        const key = toAscii(`channelEnds/ports/${portId}/channels/${channelId}`);
        const responseData = await base.queryVerified("ibc", key);
        return responseData.length ? toObject(ibc.channel.Channel.decode(responseData)) : null;
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
        // Queries for ibc.channel
        channel: async (portId: string, channelId: string) => {
          const response = await channelQuerySerice.channel({ portId: portId, channelId: channelId });
          return toObject(response);
        },
        channels: async () => {
          const response = await channelQuerySerice.channels({});
          return toObject(response);
        },
        connectionChannels: async (connection: string) => {
          const response = await channelQuerySerice.connectionChannels({ connection: connection });
          return toObject(response);
        },
        packetCommitment: async (portId: string, channelId: string, sequence: number) => {
          const response = await channelQuerySerice.packetCommitment({
            portId: portId,
            channelId: channelId,
            sequence: Long.fromNumber(sequence),
          });
          return toObject(response);
        },
        packetCommitments: async (portId: string, channelId: string) => {
          const response = await channelQuerySerice.packetCommitments({
            portId: portId,
            channelId: channelId,
          });
          return toObject(response);
        },
        packetAcknowledgement: async (portId: string, channelId: string, sequence: number) => {
          const response = await channelQuerySerice.packetAcknowledgement({
            portId: portId,
            channelId: channelId,
            sequence: Long.fromNumber(sequence),
          });
          return toObject(response);
        },
        unrelayedPackets: async (
          portId: string,
          channelId: string,
          packetCommitmentSequences: readonly number[],
          acknowledgements: boolean,
        ) => {
          const response = await channelQuerySerice.unrelayedPackets({
            portId: portId,
            channelId: channelId,
            packetCommitmentSequences: packetCommitmentSequences.map((s) => Long.fromNumber(s)),
            acknowledgements: acknowledgements,
          });
          return toObject(response);
        },
        nextSequenceReceive: async (portId: string, channelId: string) => {
          const response = await channelQuerySerice.nextSequenceReceive({
            portId: portId,
            channelId: channelId,
          });
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
        clientConnections: async (clientId: string) => {
          const response = await connectionQuerySerice.clientConnections({ clientId: clientId });
          return toObject(response);
        },
      },
    },
  };
}

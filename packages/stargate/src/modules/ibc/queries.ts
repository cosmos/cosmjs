/* eslint-disable @typescript-eslint/naming-convention */
import { Any } from "cosmjs-types/google/protobuf/any";
import {
  QueryClientImpl as TransferQuery,
  QueryDenomTraceResponse,
  QueryDenomTracesResponse,
  QueryParamsResponse as QueryTransferParamsResponse,
} from "cosmjs-types/ibc/applications/transfer/v1/query";
import {
  QueryChannelClientStateResponse,
  QueryChannelConsensusStateResponse,
  QueryChannelResponse,
  QueryChannelsResponse,
  QueryClientImpl as ChannelQuery,
  QueryConnectionChannelsResponse,
  QueryNextSequenceReceiveResponse,
  QueryPacketAcknowledgementResponse,
  QueryPacketAcknowledgementsRequest,
  QueryPacketAcknowledgementsResponse,
  QueryPacketCommitmentResponse,
  QueryPacketCommitmentsResponse,
  QueryPacketReceiptResponse,
  QueryUnreceivedAcksResponse,
  QueryUnreceivedPacketsResponse,
} from "cosmjs-types/ibc/core/channel/v1/query";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import {
  QueryClientImpl as ClientQuery,
  QueryClientParamsResponse,
  QueryClientStateResponse,
  QueryClientStatesResponse,
  QueryConsensusStateRequest,
  QueryConsensusStateResponse,
  QueryConsensusStatesResponse,
} from "cosmjs-types/ibc/core/client/v1/query";
import {
  QueryClientConnectionsResponse,
  QueryClientImpl as ConnectionQuery,
  QueryConnectionClientStateResponse,
  QueryConnectionConsensusStateRequest,
  QueryConnectionConsensusStateResponse,
  QueryConnectionResponse,
  QueryConnectionsResponse,
} from "cosmjs-types/ibc/core/connection/v1/query";
import {
  ClientState as TendermintClientState,
  ConsensusState as TendermintConsensusState,
} from "cosmjs-types/ibc/lightclients/tendermint/v1/tendermint";

import { createPagination, createProtobufRpcClient, longify, QueryClient } from "../../queryclient";

function decodeTendermintClientStateAny(clientState: Any | undefined): TendermintClientState {
  if (clientState?.typeUrl !== "/ibc.lightclients.tendermint.v1.ClientState") {
    throw new Error(`Unexpected client state type: ${clientState?.typeUrl}`);
  }
  return TendermintClientState.decode(clientState.value);
}

function decodeTendermintConsensusStateAny(clientState: Any | undefined): TendermintConsensusState {
  if (clientState?.typeUrl !== "/ibc.lightclients.tendermint.v1.ConsensusState") {
    throw new Error(`Unexpected client state type: ${clientState?.typeUrl}`);
  }
  return TendermintConsensusState.decode(clientState.value);
}

export interface IbcExtension {
  readonly ibc: {
    readonly channel: {
      readonly channel: (portId: string, channelId: string) => Promise<QueryChannelResponse>;
      readonly channels: (paginationKey?: Uint8Array) => Promise<QueryChannelsResponse>;
      readonly allChannels: () => Promise<QueryChannelsResponse>;
      readonly connectionChannels: (
        connection: string,
        paginationKey?: Uint8Array,
      ) => Promise<QueryConnectionChannelsResponse>;
      readonly allConnectionChannels: (connection: string) => Promise<QueryConnectionChannelsResponse>;
      readonly clientState: (portId: string, channelId: string) => Promise<QueryChannelClientStateResponse>;
      readonly consensusState: (
        portId: string,
        channelId: string,
        revisionNumber: number,
        revisionHeight: number,
      ) => Promise<QueryChannelConsensusStateResponse>;
      readonly packetCommitment: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<QueryPacketCommitmentResponse>;
      readonly packetCommitments: (
        portId: string,
        channelId: string,
        paginationKey?: Uint8Array,
      ) => Promise<QueryPacketCommitmentsResponse>;
      readonly allPacketCommitments: (
        portId: string,
        channelId: string,
      ) => Promise<QueryPacketCommitmentsResponse>;
      readonly packetReceipt: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<QueryPacketReceiptResponse>;
      readonly packetAcknowledgement: (
        portId: string,
        channelId: string,
        sequence: number,
      ) => Promise<QueryPacketAcknowledgementResponse>;
      readonly packetAcknowledgements: (
        portId: string,
        channelId: string,
        paginationKey?: Uint8Array,
      ) => Promise<QueryPacketAcknowledgementsResponse>;
      readonly allPacketAcknowledgements: (
        portId: string,
        channelId: string,
      ) => Promise<QueryPacketAcknowledgementsResponse>;
      readonly unreceivedPackets: (
        portId: string,
        channelId: string,
        packetCommitmentSequences: readonly number[],
      ) => Promise<QueryUnreceivedPacketsResponse>;
      readonly unreceivedAcks: (
        portId: string,
        channelId: string,
        packetAckSequences: readonly number[],
      ) => Promise<QueryUnreceivedAcksResponse>;
      readonly nextSequenceReceive: (
        portId: string,
        channelId: string,
      ) => Promise<QueryNextSequenceReceiveResponse>;
    };
    readonly client: {
      readonly state: (clientId: string) => Promise<QueryClientStateResponse>;
      readonly states: (paginationKey?: Uint8Array) => Promise<QueryClientStatesResponse>;
      readonly allStates: () => Promise<QueryClientStatesResponse>;
      readonly consensusState: (clientId: string, height?: number) => Promise<QueryConsensusStateResponse>;
      readonly consensusStates: (
        clientId: string,
        paginationKey?: Uint8Array,
      ) => Promise<QueryConsensusStatesResponse>;
      readonly allConsensusStates: (clientId: string) => Promise<QueryConsensusStatesResponse>;
      readonly params: () => Promise<QueryClientParamsResponse>;
      readonly stateTm: (clientId: string) => Promise<TendermintClientState>;
      readonly statesTm: (paginationKey?: Uint8Array) => Promise<TendermintClientState[]>;
      readonly allStatesTm: () => Promise<TendermintClientState[]>;
      readonly consensusStateTm: (clientId: string, height?: Height) => Promise<TendermintConsensusState>;
    };
    readonly connection: {
      readonly connection: (connectionId: string) => Promise<QueryConnectionResponse>;
      readonly connections: (paginationKey?: Uint8Array) => Promise<QueryConnectionsResponse>;
      readonly allConnections: () => Promise<QueryConnectionsResponse>;
      readonly clientConnections: (clientId: string) => Promise<QueryClientConnectionsResponse>;
      readonly clientState: (connectionId: string) => Promise<QueryConnectionClientStateResponse>;
      readonly consensusState: (
        connectionId: string,
        revisionNumber: number,
        revisionHeight: number,
      ) => Promise<QueryConnectionConsensusStateResponse>;
    };
    readonly transfer: {
      readonly denomTrace: (hash: string) => Promise<QueryDenomTraceResponse>;
      readonly denomTraces: (paginationKey?: Uint8Array) => Promise<QueryDenomTracesResponse>;
      readonly allDenomTraces: () => Promise<QueryDenomTracesResponse>;
      readonly params: () => Promise<QueryTransferParamsResponse>;
    };
  };
}

export function setupIbcExtension(base: QueryClient): IbcExtension {
  const rpc = createProtobufRpcClient(base);
  // Use these services to get easy typed access to query methods
  // These cannot be used for proof verification
  const channelQueryService = new ChannelQuery(rpc);
  const clientQueryService = new ClientQuery(rpc);
  const connectionQueryService = new ConnectionQuery(rpc);
  const transferQueryService = new TransferQuery(rpc);

  return {
    ibc: {
      channel: {
        channel: async (portId: string, channelId: string) =>
          channelQueryService.Channel({
            portId: portId,
            channelId: channelId,
          }),
        channels: async (paginationKey?: Uint8Array) =>
          channelQueryService.Channels({
            pagination: createPagination(paginationKey),
          }),
        allChannels: async () => {
          const channels = [];
          let response: QueryChannelsResponse;
          let key: Uint8Array | undefined;
          do {
            response = await channelQueryService.Channels({
              pagination: createPagination(key),
            });
            channels.push(...response.channels);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryChannelsResponse.fromPartial({
            channels: channels,
            height: response.height,
          });
        },
        connectionChannels: async (connection: string, paginationKey?: Uint8Array) =>
          channelQueryService.ConnectionChannels({
            connection: connection,
            pagination: createPagination(paginationKey),
          }),
        allConnectionChannels: async (connection: string) => {
          const channels = [];
          let response: QueryConnectionChannelsResponse;
          let key: Uint8Array | undefined;
          do {
            response = await channelQueryService.ConnectionChannels({
              connection: connection,
              pagination: createPagination(key),
            });
            channels.push(...response.channels);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryConnectionChannelsResponse.fromPartial({
            channels: channels,
            height: response.height,
          });
        },
        clientState: async (portId: string, channelId: string) =>
          channelQueryService.ChannelClientState({
            portId: portId,
            channelId: channelId,
          }),
        consensusState: async (
          portId: string,
          channelId: string,
          revisionNumber: number,
          revisionHeight: number,
        ) =>
          channelQueryService.ChannelConsensusState({
            portId: portId,
            channelId: channelId,
            revisionNumber: BigInt(revisionNumber),
            revisionHeight: BigInt(revisionHeight),
          }),
        packetCommitment: async (portId: string, channelId: string, sequence: number) =>
          channelQueryService.PacketCommitment({
            portId: portId,
            channelId: channelId,
            sequence: longify(sequence),
          }),
        packetCommitments: async (portId: string, channelId: string, paginationKey?: Uint8Array) =>
          channelQueryService.PacketCommitments({
            channelId: channelId,
            portId: portId,
            pagination: createPagination(paginationKey),
          }),
        allPacketCommitments: async (portId: string, channelId: string) => {
          const commitments = [];
          let response: QueryPacketCommitmentsResponse;
          let key: Uint8Array | undefined;
          do {
            response = await channelQueryService.PacketCommitments({
              channelId: channelId,
              portId: portId,
              pagination: createPagination(key),
            });
            commitments.push(...response.commitments);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryPacketCommitmentsResponse.fromPartial({
            commitments: commitments,
            height: response.height,
          });
        },
        packetReceipt: async (portId: string, channelId: string, sequence: number) =>
          channelQueryService.PacketReceipt({
            portId: portId,
            channelId: channelId,
            sequence: longify(sequence),
          }),
        packetAcknowledgement: async (portId: string, channelId: string, sequence: number) =>
          channelQueryService.PacketAcknowledgement({
            portId: portId,
            channelId: channelId,
            sequence: longify(sequence),
          }),
        packetAcknowledgements: async (portId: string, channelId: string, paginationKey?: Uint8Array) => {
          const request = QueryPacketAcknowledgementsRequest.fromPartial({
            portId: portId,
            channelId: channelId,
            pagination: createPagination(paginationKey),
          });
          return channelQueryService.PacketAcknowledgements(request);
        },
        allPacketAcknowledgements: async (portId: string, channelId: string) => {
          const acknowledgements = [];
          let response: QueryPacketAcknowledgementsResponse;
          let key: Uint8Array | undefined;
          do {
            const request = QueryPacketAcknowledgementsRequest.fromPartial({
              channelId: channelId,
              portId: portId,
              pagination: createPagination(key),
            });
            response = await channelQueryService.PacketAcknowledgements(request);
            acknowledgements.push(...response.acknowledgements);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryPacketAcknowledgementsResponse.fromPartial({
            acknowledgements: acknowledgements,
            height: response.height,
          });
        },
        unreceivedPackets: async (
          portId: string,
          channelId: string,
          packetCommitmentSequences: readonly number[],
        ) =>
          channelQueryService.UnreceivedPackets({
            portId: portId,
            channelId: channelId,
            packetCommitmentSequences: packetCommitmentSequences.map((s) => BigInt(s)),
          }),
        unreceivedAcks: async (portId: string, channelId: string, packetAckSequences: readonly number[]) =>
          channelQueryService.UnreceivedAcks({
            portId: portId,
            channelId: channelId,
            packetAckSequences: packetAckSequences.map((s) => BigInt(s)),
          }),
        nextSequenceReceive: async (portId: string, channelId: string) =>
          channelQueryService.NextSequenceReceive({
            portId: portId,
            channelId: channelId,
          }),
      },
      client: {
        state: async (clientId: string) => clientQueryService.ClientState({ clientId }),
        states: async (paginationKey?: Uint8Array) =>
          clientQueryService.ClientStates({
            pagination: createPagination(paginationKey),
          }),
        allStates: async () => {
          const clientStates = [];
          let response: QueryClientStatesResponse;
          let key: Uint8Array | undefined;
          do {
            response = await clientQueryService.ClientStates({
              pagination: createPagination(key),
            });
            clientStates.push(...response.clientStates);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryClientStatesResponse.fromPartial({
            clientStates: clientStates,
          });
        },
        consensusState: async (clientId: string, consensusHeight?: number) =>
          clientQueryService.ConsensusState(
            QueryConsensusStateRequest.fromPartial({
              clientId: clientId,
              revisionHeight: consensusHeight !== undefined ? BigInt(consensusHeight) : undefined,
              latestHeight: consensusHeight === undefined,
            }),
          ),
        consensusStates: async (clientId: string, paginationKey?: Uint8Array) =>
          clientQueryService.ConsensusStates({
            clientId: clientId,
            pagination: createPagination(paginationKey),
          }),
        allConsensusStates: async (clientId: string) => {
          const consensusStates = [];
          let response: QueryConsensusStatesResponse;
          let key: Uint8Array | undefined;
          do {
            response = await clientQueryService.ConsensusStates({
              clientId: clientId,
              pagination: createPagination(key),
            });
            consensusStates.push(...response.consensusStates);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryConsensusStatesResponse.fromPartial({
            consensusStates: consensusStates,
          });
        },
        params: async () => clientQueryService.ClientParams({}),
        stateTm: async (clientId: string) => {
          const response = await clientQueryService.ClientState({ clientId });
          return decodeTendermintClientStateAny(response.clientState);
        },
        statesTm: async (paginationKey?: Uint8Array) => {
          const { clientStates } = await clientQueryService.ClientStates({
            pagination: createPagination(paginationKey),
          });
          return clientStates.map(({ clientState }) => decodeTendermintClientStateAny(clientState));
        },
        allStatesTm: async () => {
          const clientStates = [];
          let response: QueryClientStatesResponse;
          let key: Uint8Array | undefined;
          do {
            response = await clientQueryService.ClientStates({
              pagination: createPagination(key),
            });
            clientStates.push(...response.clientStates);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return clientStates.map(({ clientState }) => decodeTendermintClientStateAny(clientState));
        },
        consensusStateTm: async (clientId: string, consensusHeight?: Height) => {
          const response = await clientQueryService.ConsensusState(
            QueryConsensusStateRequest.fromPartial({
              clientId: clientId,
              revisionHeight: consensusHeight?.revisionHeight,
              revisionNumber: consensusHeight?.revisionNumber,
              latestHeight: consensusHeight === undefined,
            }),
          );
          return decodeTendermintConsensusStateAny(response.consensusState);
        },
      },
      connection: {
        connection: async (connectionId: string) =>
          connectionQueryService.Connection({
            connectionId: connectionId,
          }),
        connections: async (paginationKey?: Uint8Array) =>
          connectionQueryService.Connections({
            pagination: createPagination(paginationKey),
          }),
        allConnections: async () => {
          const connections = [];
          let response: QueryConnectionsResponse;
          let key: Uint8Array | undefined;
          do {
            response = await connectionQueryService.Connections({
              pagination: createPagination(key),
            });
            connections.push(...response.connections);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryConnectionsResponse.fromPartial({
            connections: connections,
            height: response.height,
          });
        },
        clientConnections: async (clientId: string) =>
          connectionQueryService.ClientConnections({
            clientId: clientId,
          }),
        clientState: async (connectionId: string) =>
          connectionQueryService.ConnectionClientState({
            connectionId: connectionId,
          }),
        consensusState: async (connectionId: string, revisionHeight: number) =>
          connectionQueryService.ConnectionConsensusState(
            QueryConnectionConsensusStateRequest.fromPartial({
              connectionId: connectionId,
              revisionHeight: BigInt(revisionHeight),
            }),
          ),
      },
      transfer: {
        denomTrace: async (hash: string) => transferQueryService.DenomTrace({ hash: hash }),
        denomTraces: async (paginationKey?: Uint8Array) =>
          transferQueryService.DenomTraces({
            pagination: createPagination(paginationKey),
          }),
        allDenomTraces: async () => {
          const denomTraces = [];
          let response: QueryDenomTracesResponse;
          let key: Uint8Array | undefined;
          do {
            response = await transferQueryService.DenomTraces({
              pagination: createPagination(key),
            });
            denomTraces.push(...response.denomTraces);
            key = response.pagination?.nextKey;
          } while (key && key.length);
          return QueryDenomTracesResponse.fromPartial({
            denomTraces: denomTraces,
          });
        },
        params: async () => transferQueryService.Params({}),
      },
    },
  };
}

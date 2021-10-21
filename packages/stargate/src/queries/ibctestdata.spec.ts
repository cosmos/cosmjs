import { fromBase64 } from "@cosmjs/encoding";
import {
  Channel,
  Counterparty as ChannelCounterparty,
  IdentifiedChannel,
  Order,
  PacketState,
  State as ChannelState,
} from "cosmjs-types/ibc/core/channel/v1/channel";
import { MerklePrefix } from "cosmjs-types/ibc/core/commitment/v1/commitment";
import {
  ConnectionEnd,
  Counterparty as ConnectionCounterparty,
  IdentifiedConnection,
  State as ConnectionState,
  Version,
} from "cosmjs-types/ibc/core/connection/v1/connection";
import Long from "long";

// From scripts/simapp42/genesis-ibc.json

export const portId = "transfer";
export const channelId = "channel-0";
export const connectionId = "connection-0";
export const clientId = "07-tendermint-0";

export const channel = Channel.fromPartial({
  state: ChannelState.STATE_OPEN,
  ordering: Order.ORDER_UNORDERED,
  counterparty: ChannelCounterparty.fromPartial({
    portId: portId,
    channelId: channelId,
  }),
  connectionHops: [connectionId],
  version: "ics20-1",
});

export const identifiedChannel = IdentifiedChannel.fromPartial({
  state: ChannelState.STATE_OPEN,
  ordering: Order.ORDER_UNORDERED,
  counterparty: ChannelCounterparty.fromPartial({
    portId: portId,
    channelId: "channel-0",
  }),
  connectionHops: [connectionId],
  version: "ics20-1",
  portId: portId,
  channelId: channelId,
});

/**
 * ```
 * jq ".channel_genesis.commitments[0]" scripts/simapp42/genesis-ibc.json
 * ```
 */
export const commitment = {
  sequence: 1,
  data: fromBase64("hYz5Dx6o09DcSEWZR6xlJYwLgYUnLithsXMGtujic4I="),
};

export const packetState = PacketState.fromPartial({
  portId: portId,
  channelId: channelId,
  sequence: Long.fromInt(commitment.sequence, true),
  data: commitment.data,
});

/**
 * Unfortunatly empty right now
 *
 * ```
 * jq ".channel_genesis.acknowledgements" scripts/simapp42/genesis-ibc.json
 * ```
 */
export const packetAcknowledgements: PacketState[] = [];

export const connection = ConnectionEnd.fromPartial({
  clientId: clientId,
  versions: [
    Version.fromPartial({
      identifier: "1",
      features: ["ORDER_ORDERED", "ORDER_UNORDERED"],
    }),
  ],
  state: ConnectionState.STATE_OPEN,
  counterparty: ConnectionCounterparty.fromPartial({
    clientId: "07-tendermint-0",
    connectionId: "connection-0",
    prefix: MerklePrefix.fromPartial({
      keyPrefix: fromBase64("aWJj"),
    }),
  }),
});

export const identifiedConnection = IdentifiedConnection.fromPartial({
  id: connectionId,
  clientId: clientId,
  versions: [
    Version.fromPartial({
      identifier: "1",
      features: ["ORDER_ORDERED", "ORDER_UNORDERED"],
    }),
  ],
  state: ConnectionState.STATE_OPEN,
  counterparty: ConnectionCounterparty.fromPartial({
    clientId: "07-tendermint-0",
    connectionId: "connection-0",
    prefix: MerklePrefix.fromPartial({
      keyPrefix: fromBase64("aWJj"),
    }),
  }),
});

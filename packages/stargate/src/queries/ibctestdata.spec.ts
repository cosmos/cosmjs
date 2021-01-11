import { fromBase64 } from "@cosmjs/encoding";
import Long from "long";

import { ibc } from "../codec";

// From scripts/simapp/genesis-ibc.json

export const portId = "transfer";
export const channelId = "channel-0";
export const connectionId = "connection-0";
export const clientId = "07-tendermint-0";

export const channel = ibc.core.channel.v1.Channel.create({
  state: ibc.core.channel.v1.State.STATE_OPEN,
  ordering: ibc.core.channel.v1.Order.ORDER_UNORDERED,
  counterparty: ibc.core.channel.v1.Counterparty.create({
    portId: portId,
    channelId: channelId,
  }),
  connectionHops: [connectionId],
  version: "ics20-1",
});

export const identifiedChannel = ibc.core.channel.v1.IdentifiedChannel.create({
  state: ibc.core.channel.v1.State.STATE_OPEN,
  ordering: ibc.core.channel.v1.Order.ORDER_UNORDERED,
  counterparty: ibc.core.channel.v1.Counterparty.create({
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
 * jq ".channel_genesis.commitments[0]" scripts/simapp/genesis-ibc.json
 * ```
 */
export const commitment = {
  sequence: 1,
  data: fromBase64("hYz5Dx6o09DcSEWZR6xlJYwLgYUnLithsXMGtujic4I="),
};

export const packetState = ibc.core.channel.v1.PacketState.create({
  portId: portId,
  channelId: channelId,
  sequence: Long.fromInt(commitment.sequence, true),
  data: commitment.data,
});

/**
 * Unfortunatly empty right now
 *
 * ```
 * jq ".channel_genesis.acknowledgements" scripts/simapp/genesis-ibc.json
 * ```
 */
export const packetAcknowledgements: ibc.core.channel.v1.PacketState[] = [];

export const connection = ibc.core.connection.v1.ConnectionEnd.create({
  clientId: clientId,
  versions: [
    ibc.core.connection.v1.Version.create({
      identifier: "1",
      features: ["ORDER_ORDERED", "ORDER_UNORDERED"],
    }),
  ],
  state: ibc.core.connection.v1.State.STATE_OPEN,
  counterparty: ibc.core.connection.v1.Counterparty.create({
    clientId: "07-tendermint-0",
    connectionId: "connection-0",
    prefix: ibc.core.commitment.v1.MerklePrefix.create({
      keyPrefix: fromBase64("aWJj"),
    }),
  }),
});

export const identifiedConnection = ibc.core.connection.v1.IdentifiedConnection.create({
  id: connectionId,
  clientId: clientId,
  versions: [
    ibc.core.connection.v1.Version.create({
      identifier: "1",
      features: ["ORDER_ORDERED", "ORDER_UNORDERED"],
    }),
  ],
  state: ibc.core.connection.v1.State.STATE_OPEN,
  counterparty: ibc.core.connection.v1.Counterparty.create({
    clientId: "07-tendermint-0",
    connectionId: "connection-0",
    prefix: ibc.core.commitment.v1.MerklePrefix.create({
      keyPrefix: fromBase64("aWJj"),
    }),
  }),
});

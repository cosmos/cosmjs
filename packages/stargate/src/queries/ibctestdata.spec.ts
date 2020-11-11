import { fromBase64 } from "@cosmjs/encoding";
import Long from "long";

import { ibc } from "../codec";

// From scripts/simapp/genesis-ibc.json

export const portId = "wasm.cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5";
export const channelId = "testchain0-conn00";
export const connectionId = "testchain0-conn0";
export const clientId = "client0Fortestchain1";

export const channel = ibc.core.channel.v1.Channel.create({
  state: ibc.core.channel.v1.State.STATE_OPEN,
  ordering: ibc.core.channel.v1.Order.ORDER_UNORDERED,
  counterparty: ibc.core.channel.v1.Counterparty.create({
    portId: "wasm.cosmos10pyejy66429refv3g35g2t7am0was7yacjc2l4",
    channelId: "testchain1-conn00",
  }),
  connectionHops: [connectionId],
  version: "pong",
});

export const identifiedChannel = ibc.core.channel.v1.IdentifiedChannel.create({
  state: ibc.core.channel.v1.State.STATE_OPEN,
  ordering: ibc.core.channel.v1.Order.ORDER_UNORDERED,
  counterparty: ibc.core.channel.v1.Counterparty.create({
    portId: "wasm.cosmos10pyejy66429refv3g35g2t7am0was7yacjc2l4",
    channelId: "testchain1-conn00",
  }),
  connectionHops: [connectionId],
  version: "pong",
  portId: portId,
  channelId: channelId,
});

export const commitmentData = fromBase64("DIuspQzH8GooFceqNxkTsiZXBn9qoWWJMUqsAIB1G5c=");

export const packetState = ibc.core.channel.v1.PacketState.create({
  portId: portId,
  channelId: channelId,
  sequence: Long.fromInt(4, true),
  data: commitmentData,
});

export const packetAcknowledgements = [
  ibc.core.channel.v1.PacketState.create({
    portId: portId,
    channelId: channelId,
    sequence: Long.fromInt(1, true),
    data: fromBase64("9RKC5OuTvBsFMtD79dHHvb9qCxw08IKsSJlAwmiw8tI="),
  }),
  ibc.core.channel.v1.PacketState.create({
    portId: portId,
    channelId: channelId,
    sequence: Long.fromInt(2, true),
    data: fromBase64("Nj784gGVOFk2mdt+wAk/LOoPdUOo+5+0JfYs0yAubZU="),
  }),
  ibc.core.channel.v1.PacketState.create({
    portId: portId,
    channelId: channelId,
    sequence: Long.fromInt(3, true),
    data: fromBase64("+lLTGP1dlSD6MBpJgBIvx98Psd3U2xo500K7JyMkya8="),
  }),
];

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
    clientId: "client0Fortestchain0",
    connectionId: "testchain1-conn0",
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
    clientId: "client0Fortestchain0",
    connectionId: "testchain1-conn0",
    prefix: ibc.core.commitment.v1.MerklePrefix.create({
      keyPrefix: fromBase64("aWJj"),
    }),
  }),
});

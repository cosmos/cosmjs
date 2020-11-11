import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import Long from "long";

import { cosmos, ibc } from "../codec";
import { pendingWithoutSimapp, simapp } from "../testutils.spec";
import { IbcExtension, setupIbcExtension } from "./ibc";
import * as ibcTest from "./ibctestdata.spec";
import { QueryClient } from "./queryclient";

async function makeClientWithIbc(rpcUrl: string): Promise<[QueryClient & IbcExtension, TendermintClient]> {
  const tmClient = await TendermintClient.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupIbcExtension), tmClient];
}

describe("IbcExtension", () => {
  describe("unverified", () => {
    describe("channel", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.channel(ibcTest.portId, ibcTest.channelId);
        expect(response.channel).toEqual(ibcTest.channel);
        expect(response.proofHeight).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("channels", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.channels();
        expect(response.channels).toEqual([ibcTest.identifiedChannel]);
        expect(response.pagination).toBeInstanceOf(cosmos.base.query.v1beta1.PageResponse);
        expect(response.height).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("connectionChannels", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.connectionChannels(ibcTest.connectionId);
        expect(response.channels).toEqual([ibcTest.identifiedChannel]);
        expect(response.pagination).toBeInstanceOf(cosmos.base.query.v1beta1.PageResponse);
        expect(response.height).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("packetCommitment", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.packetCommitment(ibcTest.portId, ibcTest.channelId, 4);
        expect(response.commitment).toEqual(ibcTest.commitmentData);
        expect(response.proofHeight).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("packetCommitments", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.packetCommitments(ibcTest.portId, ibcTest.channelId);
        expect(response.commitments).toEqual([ibcTest.packetState]);
        expect(response.pagination).toBeInstanceOf(cosmos.base.query.v1beta1.PageResponse);
        expect(response.height).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("packetAcknowledgement", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.packetAcknowledgement(
          ibcTest.portId,
          ibcTest.channelId,
          1,
        );
        expect(response.acknowledgement).toEqual(ibcTest.packetAcknowledgements[0].data);
        expect(response.proofHeight).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("packetAcknowledgements", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.packetAcknowledgements(
          ibcTest.portId,
          ibcTest.channelId,
        );
        expect(response.acknowledgements).toEqual(ibcTest.packetAcknowledgements);
        expect(response.pagination).toBeInstanceOf(cosmos.base.query.v1beta1.PageResponse);
        expect(response.height).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("unreceivedPackets", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.unreceivedPackets(ibcTest.portId, ibcTest.channelId, [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
        ]);
        expect(response.sequences).toEqual([4, 5, 6, 7].map((n) => Long.fromInt(n, true)));
        expect(response.height).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("unreceivedAcks", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.unreceivedAcks(ibcTest.portId, ibcTest.channelId, [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
        ]);
        expect(response.sequences).toEqual([Long.fromInt(4, true)]);
        expect(response.height).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("nextSequenceReceive", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.nextSequenceReceive(ibcTest.portId, ibcTest.channelId);
        expect(response.nextSequenceReceive).toEqual(Long.fromInt(1, true));
        expect(response.proofHeight).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    // Queries for ibc.connection

    describe("connection", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.connection(ibcTest.connectionId);
        expect(response.connection).toEqual(ibcTest.connection);
        expect(response.proofHeight).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("connections", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.connections();
        expect(response.connections).toEqual([ibcTest.identifiedConnection]);
        expect(response.pagination).toBeInstanceOf(cosmos.base.query.v1beta1.PageResponse);
        expect(response.height).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });

    describe("clientConnections", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.clientConnections(ibcTest.clientId);
        expect(response.connectionPaths).toEqual([ibcTest.connectionId]);
        expect(response.proofHeight).toBeInstanceOf(ibc.core.client.v1.Height);

        tmClient.disconnect();
      });
    });
  });
});

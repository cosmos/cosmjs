import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import Long from "long";

import { pendingWithoutSimapp, simapp } from "../testutils.spec";
import { IbcExtension, setupIbcExtension } from "./ibc";
import * as ibcTest from "./ibctestdata.spec";
import { QueryClient } from "./queryclient";

async function makeClientWithIbc(rpcUrl: string): Promise<[QueryClient & IbcExtension, Tendermint34Client]> {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupIbcExtension), tmClient];
}

describe("IbcExtension", () => {
  describe("unverified", () => {
    describe("channel", () => {
      describe("channel", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.channel(ibcTest.portId, ibcTest.channelId);
          expect(response.channel).toEqual(ibcTest.channel);
          expect(response.proofHeight).toBeDefined();
          expect(response.proofHeight).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("channels", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.channels();
          expect(response.channels).toEqual([ibcTest.identifiedChannel]);
          expect(response.pagination).toBeDefined();
          expect(response.pagination).not.toBeNull();
          expect(response.height).toBeDefined();
          expect(response.height).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("connectionChannels", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.connectionChannels(ibcTest.connectionId);
          expect(response.channels).toEqual([ibcTest.identifiedChannel]);
          expect(response.pagination).toBeDefined();
          expect(response.pagination).not.toBeNull();
          expect(response.height).toBeDefined();
          expect(response.height).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("packetCommitment", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.packetCommitment(
            ibcTest.portId,
            ibcTest.channelId,
            Long.fromInt(ibcTest.commitment.sequence, true),
          );
          expect(response.commitment).toEqual(ibcTest.commitment.data);
          expect(response.proofHeight).toBeDefined();
          expect(response.proofHeight).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("packetCommitments", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.packetCommitments(
            ibcTest.portId,
            ibcTest.channelId,
          );
          expect(response.commitments).toEqual([ibcTest.packetState]);
          expect(response.pagination).toBeDefined();
          expect(response.pagination).not.toBeNull();
          expect(response.height).toBeDefined();
          expect(response.height).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("packetAcknowledgement", () => {
        it("works", async () => {
          pending("We don't have an acknowledgement for testing at the moment");
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.packetAcknowledgement(
            ibcTest.portId,
            ibcTest.channelId,
            ibcTest.commitment.sequence,
          );
          expect(response.acknowledgement).toEqual(ibcTest.packetAcknowledgements[0].data);
          expect(response.proofHeight).toBeDefined();
          expect(response.proofHeight).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("packetAcknowledgements", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.packetAcknowledgements(
            ibcTest.portId,
            ibcTest.channelId,
          );
          expect(response.acknowledgements).toEqual(ibcTest.packetAcknowledgements);
          expect(response.pagination).toBeDefined();
          expect(response.pagination).not.toBeNull();
          expect(response.height).toBeDefined();
          expect(response.height).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("unreceivedPackets", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.unreceivedPackets(
            ibcTest.portId,
            ibcTest.channelId,
            [1, 2, 3],
          );
          expect(response.sequences).toEqual([1, 2, 3].map((n) => Long.fromInt(n, true)));
          expect(response.height).toBeDefined();
          expect(response.height).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("unreceivedAcks", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.unreceivedAcks(
            ibcTest.portId,
            ibcTest.channelId,
            [1, 2, 3, 4, 5, 6, 7],
          );
          expect(response.sequences).toEqual([Long.fromInt(ibcTest.commitment.sequence, true)]);
          expect(response.height).toBeDefined();
          expect(response.height).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("nextSequenceReceive", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.channel.nextSequenceReceive(
            ibcTest.portId,
            ibcTest.channelId,
          );
          expect(response.nextSequenceReceive).toEqual(Long.fromInt(1, true));
          expect(response.proofHeight).toBeDefined();
          expect(response.proofHeight).not.toBeNull();

          tmClient.disconnect();
        });
      });
    });

    describe("connection", () => {
      describe("connection", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.connection.connection(ibcTest.connectionId);
          expect(response.connection).toEqual(ibcTest.connection);
          expect(response.proofHeight).toBeDefined();
          expect(response.proofHeight).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("connections", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.connection.connections();
          expect(response.connections).toEqual([ibcTest.identifiedConnection]);
          expect(response.pagination).toBeDefined();
          expect(response.pagination).not.toBeNull();
          expect(response.height).toBeDefined();
          expect(response.height).not.toBeNull();

          tmClient.disconnect();
        });
      });

      describe("clientConnections", () => {
        it("works", async () => {
          pendingWithoutSimapp();
          const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

          const response = await client.ibc.unverified.connection.clientConnections(ibcTest.clientId);
          expect(response.connectionPaths).toEqual([ibcTest.connectionId]);
          expect(response.proofHeight).toBeDefined();
          expect(response.proofHeight).not.toBeNull();

          tmClient.disconnect();
        });
      });
    });
  });
});

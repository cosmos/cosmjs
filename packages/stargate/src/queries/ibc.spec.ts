import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";

import { pendingWithoutSimapp, simapp } from "../testutils.spec";
import { IbcExtension, setupIbcExtension } from "./ibc";
import { QueryClient } from "./queryclient";

async function makeClientWithIbc(rpcUrl: string): Promise<[QueryClient & IbcExtension, TendermintClient]> {
  const tmClient = await TendermintClient.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupIbcExtension), tmClient];
}

describe("IbcExtension", () => {
  describe("unverified", () => {
    describe("channel", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.channel("foo", "bar");
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("channels", () => {
      it("can be called", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.channels();
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("connectionChannels", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.connectionChannels("foo");
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("packetCommitment", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.packetCommitment("foo", "bar", 0);
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("packetCommitments", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.packetCommitments("foo", "bar");
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("packetAcknowledgement", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.packetAcknowledgement("foo", "bar", 1);
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("unrelayedPackets", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.unrelayedPackets("foo", "bar", [0, 1], true);
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("nextSequenceReceive", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.nextSequenceReceive("foo", "bar");
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    // Queries for ibc.connection

    describe("connection", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.connection("foo");
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("connections", () => {
      it("can be called", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.connections();
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });

    describe("clientConnections", () => {
      it("can be called", async () => {
        pending("Fails with 'Query failed with (1): internal'. Make it work.");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithIbc(simapp.tendermintUrl);

        const response = await client.ibc.unverified.clientConnections("foo");
        expect(response).toBeTruthy(); // TODO: implement checks

        tmClient.disconnect();
      });
    });
  });
});

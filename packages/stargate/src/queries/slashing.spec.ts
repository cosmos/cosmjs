/* eslint-disable @typescript-eslint/naming-convention */
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

import { pendingWithoutSimapp, simapp } from "../testutils.spec";
import { QueryClient } from "./queryclient";
import { setupSlashingExtension, SlashingExtension } from "./slashing";

async function makeClientWithSlashing(
  rpcUrl: string,
): Promise<[QueryClient & SlashingExtension, Tendermint34Client]> {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupSlashingExtension), tmClient];
}

describe("slashing", () => {
  describe("signingInfos", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithSlashing(simapp.tendermintUrl);

      const response = await client.slashing.signingInfos();
      expect(response.info).toBeDefined();
      expect(response.info).not.toBeNull();

      tmClient.disconnect();
    });
  });

  describe("params", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithSlashing(simapp.tendermintUrl);

      const response = await client.slashing.params();
      expect(response.params).toBeDefined();
      expect(response.params).not.toBeNull();

      tmClient.disconnect();
    });
  });
});

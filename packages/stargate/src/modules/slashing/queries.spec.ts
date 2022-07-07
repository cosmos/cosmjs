/* eslint-disable @typescript-eslint/naming-convention */
import { Tendermint35Client } from "@cosmjs/tendermint-rpc";

import { QueryClient } from "../../queryclient";
import { pendingWithoutSimapp, simapp } from "../../testutils.spec";
import { setupSlashingExtension, SlashingExtension } from "./queries";

async function makeClientWithSlashing(
  rpcUrl: string,
): Promise<[QueryClient & SlashingExtension, Tendermint35Client]> {
  const tmClient = await Tendermint35Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupSlashingExtension), tmClient];
}

describe("SlashingExtension", () => {
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

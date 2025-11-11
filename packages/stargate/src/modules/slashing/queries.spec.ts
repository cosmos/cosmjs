import { CometClient, connectComet } from "@cosmjs/tendermint-rpc";

import { QueryClient } from "../../queryclient/index.ts";
import { simapp, simappEnabled } from "../../testutils.ts";
import { setupSlashingExtension, SlashingExtension } from "./queries.ts";

async function makeClientWithSlashing(
  rpcUrl: string,
): Promise<[QueryClient & SlashingExtension, CometClient]> {
  const cometClient = await connectComet(rpcUrl);
  return [QueryClient.withExtensions(cometClient, setupSlashingExtension), cometClient];
}

(simappEnabled ? describe : xdescribe)("SlashingExtension", () => {
  describe("signingInfos", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithSlashing(simapp.tendermintUrlHttp);

      const response = await client.slashing.signingInfos();
      expect(response.info).toBeDefined();
      expect(response.info).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("params", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithSlashing(simapp.tendermintUrlHttp);

      const response = await client.slashing.params();
      expect(response.params).toBeDefined();
      expect(response.params).not.toBeNull();

      cometClient.disconnect();
    });
  });
});

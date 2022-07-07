import { Tendermint35Client } from "@cosmjs/tendermint-rpc";

import { QueryClient } from "../../queryclient";
import { pendingWithoutSimapp, simapp } from "../../testutils.spec";
import { MintExtension, setupMintExtension } from "./queries";

async function makeClientWithMint(
  rpcUrl: string,
): Promise<[QueryClient & MintExtension, Tendermint35Client]> {
  const tmClient = await Tendermint35Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupMintExtension), tmClient];
}

describe("MintExtension", () => {
  describe("params", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithMint(simapp.tendermintUrl);

      const params = await client.mint.params();
      expect(params.blocksPerYear.toNumber()).toBeGreaterThan(100_000);
      expect(params.blocksPerYear.toNumber()).toBeLessThan(100_000_000);
      expect(params.goalBonded.toString()).toEqual("0.67");
      expect(params.inflationMin.toString()).toEqual("0.07");
      expect(params.inflationMax.toString()).toEqual("0.2");
      expect(params.inflationRateChange.toString()).toEqual("0.13");
      expect(params.mintDenom).toEqual(simapp.denomStaking);

      tmClient.disconnect();
    });
  });

  describe("inflation", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithMint(simapp.tendermintUrl);

      const inflation = await client.mint.inflation();
      expect(inflation.toFloatApproximation()).toBeGreaterThan(0.13);
      expect(inflation.toFloatApproximation()).toBeLessThan(0.1301);

      tmClient.disconnect();
    });
  });

  describe("annualProvisions", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithMint(simapp.tendermintUrl);

      const annualProvisions = await client.mint.annualProvisions();
      expect(annualProvisions.toFloatApproximation()).toBeGreaterThan(5_400_000_000);
      expect(annualProvisions.toFloatApproximation()).toBeLessThan(5_500_000_000);

      tmClient.disconnect();
    });
  });
});

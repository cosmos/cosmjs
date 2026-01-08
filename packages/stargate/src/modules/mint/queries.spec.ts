import { CometClient, connectComet } from "@cosmjs/tendermint-rpc";

import { QueryClient } from "../../queryclient";
import { evmd, evmdEnabled, simapp, simappEnabled } from "../../testutils";
import { MintExtension, setupMintExtension } from "./queries";

async function makeClientWithMint(rpcUrl: string): Promise<[QueryClient & MintExtension, CometClient]> {
  const cometClient = await connectComet(rpcUrl);
  return [QueryClient.withExtensions(cometClient, setupMintExtension), cometClient];
}

(simappEnabled ? describe : xdescribe)("MintExtension", () => {
  describe("params", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithMint(simapp.tendermintUrlHttp);

      const params = await client.mint.params();
      expect(Number(params.blocksPerYear)).toBeGreaterThan(100_000);
      expect(Number(params.blocksPerYear)).toBeLessThan(100_000_000);
      expect(params.goalBonded.toString()).toEqual("0.67");
      expect(params.inflationMin.toString()).toEqual("0.07");
      expect(params.inflationMax.toString()).toEqual("0.2");
      expect(params.inflationRateChange.toString()).toEqual("0.13");
      expect(params.mintDenom).toEqual(simapp.denomStaking);

      cometClient.disconnect();
    });
  });

  describe("inflation", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithMint(simapp.tendermintUrlHttp);

      const inflation = await client.mint.inflation();
      expect(inflation.toFloatApproximation()).toBeGreaterThan(0.13);
      expect(inflation.toFloatApproximation()).toBeLessThan(0.1301);

      cometClient.disconnect();
    });
  });

  describe("annualProvisions", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithMint(simapp.tendermintUrlHttp);

      const annualProvisions = await client.mint.annualProvisions();
      expect(annualProvisions.toFloatApproximation()).toBeGreaterThan(5_400_000_000);
      expect(annualProvisions.toFloatApproximation()).toBeLessThan(5_500_000_000);

      cometClient.disconnect();
    });
  });
});

(evmdEnabled ? describe : xdescribe)("MintExtension (evmd)", () => {
  describe("params", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithMint(evmd.tendermintUrlHttp);

      const params = await client.mint.params();
      expect(Number(params.blocksPerYear)).toBeGreaterThan(100_000);
      expect(Number(params.blocksPerYear)).toBeLessThan(100_000_000);
      expect(params.mintDenom).toEqual("atest");

      cometClient.disconnect();
    });
  });

  describe("inflation", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithMint(evmd.tendermintUrlHttp);

      const inflation = await client.mint.inflation();
      expect(inflation.toFloatApproximation()).toBeGreaterThanOrEqual(0);

      cometClient.disconnect();
    });
  });

  describe("annualProvisions", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithMint(evmd.tendermintUrlHttp);

      const annualProvisions = await client.mint.annualProvisions();
      expect(annualProvisions.toFloatApproximation()).toBeGreaterThanOrEqual(0);

      cometClient.disconnect();
    });
  });
});

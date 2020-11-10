/* eslint-disable @typescript-eslint/naming-convention */
import {
  bigDecimalMatcher,
  launchpad,
  nonNegativeIntegerMatcher,
  pendingWithoutLaunchpad,
  smallDecimalMatcher,
} from "../testutils.spec";
import { LcdClient } from "./lcdclient";
import { MintExtension, setupMintExtension } from "./mint";

function makeMintClient(apiUrl: string): LcdClient & MintExtension {
  return LcdClient.withExtensions({ apiUrl }, setupMintExtension);
}

describe("MintExtension", () => {
  describe("parameters", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeMintClient(launchpad.endpoint);
      const response = await client.mint.parameters();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          mint_denom: "ustake",
          inflation_rate_change: "0.130000000000000000",
          inflation_max: "0.200000000000000000",
          inflation_min: "0.070000000000000000",
          goal_bonded: "0.670000000000000000",
          blocks_per_year: "6311520",
        },
      });
    });
  });

  describe("inflation", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeMintClient(launchpad.endpoint);
      const response = await client.mint.inflation();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: jasmine.stringMatching(smallDecimalMatcher),
      });
    });
  });

  describe("annualProvisions", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeMintClient(launchpad.endpoint);
      const response = await client.mint.annualProvisions();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: jasmine.stringMatching(bigDecimalMatcher),
      });
    });
  });
});

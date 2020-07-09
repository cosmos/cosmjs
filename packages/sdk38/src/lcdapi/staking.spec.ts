/* eslint-disable @typescript-eslint/camelcase */
import { nonNegativeIntegerMatcher, pendingWithoutWasmd, wasmd } from "../testutils.spec";
import { LcdClient } from "./lcdclient";
import { setupStakingExtension, StakingExtension } from "./staking";

function makeStakingClient(apiUrl: string): LcdClient & StakingExtension {
  return LcdClient.withExtensions({ apiUrl }, setupStakingExtension);
}

describe("StakingExtension", () => {
  describe("pool", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.pool();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          not_bonded_tokens: "0",
          bonded_tokens: "250000000",
        },
      });
    });
  });

  describe("parameters", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.parameters();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          unbonding_time: "1814400000000000",
          max_validators: 100,
          max_entries: 7,
          historical_entries: 0,
          bond_denom: "ustake",
        },
      });
    });
  });
});

/* eslint-disable @typescript-eslint/camelcase */
import { nonNegativeIntegerMatcher, pendingWithoutWasmd, wasmd } from "../testutils.spec";
import { LcdClient } from "./lcdclient";
import { setupStakingExtension, StakingExtension } from "./staking";

function makeStakingClient(apiUrl: string): LcdClient & StakingExtension {
  return LcdClient.withExtensions({ apiUrl }, setupStakingExtension);
}

describe("StakingExtension", () => {
  describe("validators", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.validators();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            operator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
            consensus_pubkey:
              "cosmosvalconspub1zcjduepqau36ht2r742jh230pxlu4wjmwcmkwpeqava80acphsu87vt5xlpqx6g7qh",
            jailed: false,
            status: 2,
            tokens: "250000000",
            delegator_shares: "250000000.000000000000000000",
            description: {
              moniker: "testing",
              identity: "",
              website: "",
              security_contact: "",
              details: "",
            },
            unbonding_height: "0",
            unbonding_time: "1970-01-01T00:00:00Z",
            commission: {
              commission_rates: {
                rate: "0.100000000000000000",
                max_rate: "0.200000000000000000",
                max_change_rate: "0.010000000000000000",
              },
              update_time: "2020-06-03T06:01:17.4747987Z",
            },
            min_self_delegation: "1",
          },
        ],
      });
    });

    it("can filter by status", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.validators({ status: "unbonded" });
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [],
      });
    });
  });

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

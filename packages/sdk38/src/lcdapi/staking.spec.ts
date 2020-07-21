import { assert, sleep } from "@cosmjs/utils";

import { coin, coins } from "../coins";
import { isPostTxFailure } from "../cosmosclient";
import { makeSignBytes } from "../encoding";
import { MsgDelegate } from "../msgs";
import { SigningCosmosClient } from "../signingcosmosclient";
/* eslint-disable @typescript-eslint/naming-convention */
import {
  bigDecimalMatcher,
  faucet,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  validatorAddress,
  wasmd,
  wasmdEnabled,
} from "../testutils.spec";
import { Secp256k1Wallet } from "../wallet";
import { LcdClient } from "./lcdclient";
import { setupStakingExtension, StakingExtension } from "./staking";

function makeStakingClient(apiUrl: string): LcdClient & StakingExtension {
  return LcdClient.withExtensions({ apiUrl }, setupStakingExtension);
}

describe("StakingExtension", () => {
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };

  beforeAll(async () => {
    if (wasmdEnabled()) {
      const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(wasmd.endpoint, faucet.address, wallet, {});

      const chainId = await client.getChainId();
      const msg: MsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: faucet.address,
          validator_address: validatorAddress,
          amount: coin(25000, "ustake"),
        },
      };
      const memo = "Test delegation for wasmd";
      const { accountNumber, sequence } = await client.getNonce();
      const signBytes = makeSignBytes([msg], defaultFee, chainId, memo, accountNumber, sequence);
      const signature = await wallet.sign(faucet.address, signBytes);
      const tx = {
        msg: [msg],
        fee: defaultFee,
        memo: memo,
        signatures: [signature],
      };

      const receipt = await client.postTx(tx);
      assert(!isPostTxFailure(receipt));

      await sleep(75); // wait until transactions are indexed
    }
  });

  describe("delegatorDelegations", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.delegatorDelegations(faucet.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            validator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
            shares: jasmine.stringMatching(bigDecimalMatcher),
            balance: { denom: "ustake", amount: jasmine.stringMatching(nonNegativeIntegerMatcher) },
          },
        ],
      });
    });
  });

  describe("delegatorUnbondingDelegations", () => {
    it("works", async () => {
      // TODO: Set up a result for this test
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.delegatorUnbondingDelegations(faucet.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [],
      });
    });
  });

  describe("delegatorTransactions", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.delegatorTransactions(faucet.address);
      expect(response.length).toEqual(3);
    });
  });

  describe("delegatorValidators", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.delegatorValidators(faucet.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            operator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
            consensus_pubkey:
              "cosmosvalconspub1zcjduepqau36ht2r742jh230pxlu4wjmwcmkwpeqava80acphsu87vt5xlpqx6g7qh",
            jailed: false,
            status: 2,
            tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
            delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
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
  });

  describe("delegatorValidator", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.delegatorValidator(faucet.address, validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          operator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
          consensus_pubkey:
            "cosmosvalconspub1zcjduepqau36ht2r742jh230pxlu4wjmwcmkwpeqava80acphsu87vt5xlpqx6g7qh",
          jailed: false,
          status: 2,
          tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
          delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
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
      });
    });
  });

  describe("delegation", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.delegation(faucet.address, validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          delegator_address: faucet.address,
          validator_address: validatorAddress,
          shares: jasmine.stringMatching(bigDecimalMatcher),
          balance: { denom: "ustake", amount: jasmine.stringMatching(nonNegativeIntegerMatcher) },
        },
      });
    });
  });

  xdescribe("unbondingDelegation", () => {
    it("works", async () => {
      // TODO: Set up a result for this test
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.unbondingDelegation(faucet.address, validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          delegator_address: faucet.address,
          validator_address: validatorAddress,
          entries: [],
        },
      });
    });
  });

  describe("redelegations", () => {
    it("works", async () => {
      // TODO: Set up a result for this test
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.redelegations();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [],
      });
    });
  });

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
            tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
            delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
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

    it("can filter by status with no results", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.validators({ status: "unbonded" });
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [],
      });
    });

    it("can filter by status with some results", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.validators({ status: "bonded" });
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            operator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
            consensus_pubkey:
              "cosmosvalconspub1zcjduepqau36ht2r742jh230pxlu4wjmwcmkwpeqava80acphsu87vt5xlpqx6g7qh",
            jailed: false,
            status: 2,
            tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
            delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
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
  });

  describe("validator", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.validator(validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          operator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
          consensus_pubkey:
            "cosmosvalconspub1zcjduepqau36ht2r742jh230pxlu4wjmwcmkwpeqava80acphsu87vt5xlpqx6g7qh",
          jailed: false,
          status: 2,
          tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
          delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
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
      });
    });
  });

  describe("validatorDelegations", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.validatorDelegations(validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            validator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
            shares: jasmine.stringMatching(bigDecimalMatcher),
            balance: { denom: "ustake", amount: jasmine.stringMatching(nonNegativeIntegerMatcher) },
          },
          {
            delegator_address: "cosmos1gjvanqxc774u6ed9thj4gpn9gj5zus5u57dxvq",
            validator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
            shares: "250000000.000000000000000000",
            balance: { denom: "ustake", amount: "250000000" },
          },
        ],
      });
    });
  });

  describe("validatorUnbondingDelegations", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.validatorUnbondingDelegations(validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [],
      });
    });
  });

  xdescribe("historicalInfo", () => {
    it("works", async () => {
      // TODO: Find a result for this test
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const response = await client.staking.historicalInfo("100");
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          header: {
            version: {
              block: "",
              app: "",
            },
            height: 10,
            chainId: "",
            time: "",
          },
          validators: [],
        },
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
          bonded_tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
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

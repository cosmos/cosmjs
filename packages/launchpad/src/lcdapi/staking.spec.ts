/* eslint-disable @typescript-eslint/naming-convention */
import { assert, sleep } from "@cosmjs/utils";

import { coin, coins } from "../coins";
import { assertIsBroadcastTxSuccess } from "../cosmosclient";
import { makeSignDoc } from "../encoding";
import { MsgDelegate, MsgUndelegate } from "../msgs";
import { Secp256k1Wallet } from "../secp256k1wallet";
import { SigningCosmosClient } from "../signingcosmosclient";
import {
  bigDecimalMatcher,
  dateTimeStampMatcher,
  faucet,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  wasmd,
  wasmdEnabled,
} from "../testutils.spec";
import { LcdClient } from "./lcdclient";
import { BondStatus, setupStakingExtension, StakingExtension } from "./staking";

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
      const client = new SigningCosmosClient(wasmd.endpoint, faucet.address, wallet);

      const chainId = await client.getChainId();
      {
        const msg: MsgDelegate = {
          type: "cosmos-sdk/MsgDelegate",
          value: {
            delegator_address: faucet.address,
            validator_address: wasmd.validator.address,
            amount: coin(25000, "ustake"),
          },
        };
        const memo = "Test delegation for wasmd";
        const { accountNumber, sequence } = await client.getSequence();
        const signDoc = makeSignDoc([msg], defaultFee, chainId, memo, accountNumber, sequence);
        const { signature } = await wallet.sign(faucet.address, signDoc);
        const tx = {
          msg: [msg],
          fee: defaultFee,
          memo: memo,
          signatures: [signature],
        };

        const result = await client.broadcastTx(tx);
        assertIsBroadcastTxSuccess(result);
      }
      {
        const msg: MsgUndelegate = {
          type: "cosmos-sdk/MsgUndelegate",
          value: {
            delegator_address: faucet.address,
            validator_address: wasmd.validator.address,
            amount: coin(100, "ustake"),
          },
        };
        const memo = "Test undelegation for wasmd";
        const { accountNumber, sequence } = await client.getSequence();
        const signDoc = makeSignDoc([msg], defaultFee, chainId, memo, accountNumber, sequence);
        const { signature } = await wallet.sign(faucet.address, signDoc);
        const tx = {
          msg: [msg],
          fee: defaultFee,
          memo: memo,
          signatures: [signature],
        };

        const result = await client.broadcastTx(tx);
        assertIsBroadcastTxSuccess(result);
      }

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
            delegator_address: faucet.address,
            validator_address: wasmd.validator.address,
            shares: jasmine.stringMatching(bigDecimalMatcher),
            balance: { denom: "ustake", amount: jasmine.stringMatching(nonNegativeIntegerMatcher) },
          },
        ],
      });
    });
  });

  describe("delegatorUnbondingDelegations", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const { height, result } = await client.staking.delegatorUnbondingDelegations(faucet.address);
      expect(height).toMatch(nonNegativeIntegerMatcher);
      assert(result);
      expect(result).toEqual([
        {
          delegator_address: faucet.address,
          validator_address: wasmd.validator.address,
          entries: jasmine.arrayContaining([
            {
              creation_height: jasmine.stringMatching(nonNegativeIntegerMatcher),
              completion_time: jasmine.stringMatching(dateTimeStampMatcher),
              initial_balance: "100",
              balance: "100",
            },
          ]),
        },
      ]);
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
            operator_address: wasmd.validator.address,
            consensus_pubkey: wasmd.validator.pubkey,
            jailed: false,
            status: BondStatus.Bonded,
            tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
            delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
            description: {
              moniker: wasmd.moniker,
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
              update_time: wasmd.commissionUpdateTime,
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
      const response = await client.staking.delegatorValidator(faucet.address, wasmd.validator.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          operator_address: wasmd.validator.address,
          consensus_pubkey: wasmd.validator.pubkey,
          jailed: false,
          status: BondStatus.Bonded,
          tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
          delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
          description: {
            moniker: wasmd.moniker,
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
            update_time: wasmd.commissionUpdateTime,
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
      const response = await client.staking.delegation(faucet.address, wasmd.validator.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          delegator_address: faucet.address,
          validator_address: wasmd.validator.address,
          shares: jasmine.stringMatching(bigDecimalMatcher),
          balance: { denom: "ustake", amount: jasmine.stringMatching(nonNegativeIntegerMatcher) },
        },
      });
    });
  });

  describe("unbondingDelegation", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const { height, result } = await client.staking.unbondingDelegation(
        faucet.address,
        wasmd.validator.address,
      );
      expect(height).toMatch(nonNegativeIntegerMatcher);
      assert(result);
      expect(result).toEqual({
        delegator_address: faucet.address,
        validator_address: wasmd.validator.address,
        entries: jasmine.arrayContaining([
          {
            creation_height: jasmine.stringMatching(nonNegativeIntegerMatcher),
            completion_time: jasmine.stringMatching(dateTimeStampMatcher),
            initial_balance: "100",
            balance: "100",
          },
        ]),
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
            operator_address: wasmd.validator.address,
            consensus_pubkey: wasmd.validator.pubkey,
            jailed: false,
            status: BondStatus.Bonded,
            tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
            delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
            description: {
              moniker: wasmd.moniker,
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
              update_time: wasmd.commissionUpdateTime,
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
            operator_address: wasmd.validator.address,
            consensus_pubkey: wasmd.validator.pubkey,
            jailed: false,
            status: BondStatus.Bonded,
            tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
            delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
            description: {
              moniker: wasmd.moniker,
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
              update_time: wasmd.commissionUpdateTime,
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
      const response = await client.staking.validator(wasmd.validator.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          operator_address: wasmd.validator.address,
          consensus_pubkey: wasmd.validator.pubkey,
          jailed: false,
          status: BondStatus.Bonded,
          tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
          delegator_shares: jasmine.stringMatching(bigDecimalMatcher),
          description: {
            moniker: wasmd.moniker,
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
            update_time: wasmd.commissionUpdateTime,
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
      const response = await client.staking.validatorDelegations(wasmd.validator.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: jasmine.arrayContaining([
          {
            delegator_address: faucet.address,
            validator_address: wasmd.validator.address,
            shares: jasmine.stringMatching(bigDecimalMatcher),
            balance: { denom: "ustake", amount: jasmine.stringMatching(nonNegativeIntegerMatcher) },
          },
          {
            delegator_address: wasmd.validator.delegatorAddress,
            validator_address: wasmd.validator.address,
            shares: "250000000.000000000000000000",
            balance: { denom: "ustake", amount: "250000000" },
          },
        ]),
      });
    });
  });

  describe("validatorUnbondingDelegations", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const { height, result } = await client.staking.validatorUnbondingDelegations(wasmd.validator.address);
      expect(height).toMatch(nonNegativeIntegerMatcher);
      assert(result);
      expect(result).toEqual([
        {
          delegator_address: faucet.address,
          validator_address: wasmd.validator.address,
          entries: jasmine.arrayContaining([
            {
              creation_height: jasmine.stringMatching(nonNegativeIntegerMatcher),
              completion_time: jasmine.stringMatching(dateTimeStampMatcher),
              initial_balance: "100",
              balance: "100",
            },
          ]),
        },
      ]);
    });
  });

  describe("historicalInfo", () => {
    it("doesn't work yet", async () => {
      pendingWithoutWasmd();
      const client = makeStakingClient(wasmd.endpoint);
      const currentHeight = (await client.blocksLatest()).block.header.height;
      return expectAsync(client.staking.historicalInfo(currentHeight)).toBeRejectedWithError(
        /no historical info found \(HTTP 400\)/i,
      );
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
          not_bonded_tokens: jasmine.stringMatching(nonNegativeIntegerMatcher),
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

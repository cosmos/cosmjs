/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32 } from "@cosmjs/encoding";
import { sleep } from "@cosmjs/utils";

import { coin, coins } from "../coins";
import { assertIsPostTxSuccess } from "../cosmosclient";
import { makeSignBytes } from "../encoding";
import { MsgDelegate } from "../msgs";
import { Secp256k1Wallet } from "../secp256k1wallet";
import { SigningCosmosClient } from "../signingcosmosclient";
import {
  bigDecimalMatcher,
  faucet,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  validatorAddress,
  wasmd,
  wasmdEnabled,
} from "../testutils.spec";
import { DistributionExtension, setupDistributionExtension } from "./distribution";
import { LcdClient } from "./lcdclient";

function makeDistributionClient(apiUrl: string): LcdClient & DistributionExtension {
  return LcdClient.withExtensions({ apiUrl }, setupDistributionExtension);
}

describe("DistributionExtension", () => {
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
      const { accountNumber, sequence } = await client.getSequence();
      const signBytes = makeSignBytes([msg], defaultFee, chainId, memo, accountNumber, sequence);
      const signature = await wallet.sign(faucet.address, signBytes);
      const tx = {
        msg: [msg],
        fee: defaultFee,
        memo: memo,
        signatures: [signature],
      };

      const result = await client.postTx(tx);
      assertIsPostTxSuccess(result);

      await sleep(75); // wait until transactions are indexed
    }
  });

  describe("delegatorRewards", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.delegatorRewards(faucet.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          rewards: [
            {
              validator_address: validatorAddress,
              reward: null,
            },
          ],
          total: null,
        },
      });
    });
  });

  describe("delegatorReward", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.delegatorReward(faucet.address, validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [],
      });
    });
  });

  describe("withdrawAddress", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.withdrawAddress(faucet.address);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: faucet.address,
      });
    });
  });

  describe("validator", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.validator(validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          // TODO: This smells like a bug in the backend to me
          operator_address: Bech32.encode("cosmos", Bech32.decode(validatorAddress).data),
          self_bond_rewards: [
            { denom: "ucosm", amount: jasmine.stringMatching(bigDecimalMatcher) },
            { denom: "ustake", amount: jasmine.stringMatching(bigDecimalMatcher) },
          ],
          val_commission: [
            { denom: "ucosm", amount: jasmine.stringMatching(bigDecimalMatcher) },
            { denom: "ustake", amount: jasmine.stringMatching(bigDecimalMatcher) },
          ],
        },
      });
    });
  });

  describe("validatorRewards", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.validatorRewards(validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          { denom: "ucosm", amount: jasmine.stringMatching(bigDecimalMatcher) },
          { denom: "ustake", amount: jasmine.stringMatching(bigDecimalMatcher) },
        ],
      });
    });
  });

  describe("validatorOutstandingRewards", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.validatorOutstandingRewards(validatorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          { denom: "ucosm", amount: jasmine.stringMatching(bigDecimalMatcher) },
          { denom: "ustake", amount: jasmine.stringMatching(bigDecimalMatcher) },
        ],
      });
    });
  });

  describe("parameters", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.parameters();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          community_tax: "0.020000000000000000",
          base_proposer_reward: "0.010000000000000000",
          bonus_proposer_reward: "0.040000000000000000",
          withdraw_addr_enabled: true,
        },
      });
    });
  });

  describe("communityPool", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeDistributionClient(wasmd.endpoint);
      const response = await client.distribution.communityPool();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          { denom: "ucosm", amount: jasmine.stringMatching(bigDecimalMatcher) },
          { denom: "ustake", amount: jasmine.stringMatching(bigDecimalMatcher) },
        ],
      });
    });
  });
});

/* eslint-disable @typescript-eslint/naming-convention */
import { coin, coins } from "@cosmjs/launchpad";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { adaptor34, Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import { assertDefinedAndNotNull, sleep } from "@cosmjs/utils";

import { cosmos } from "../codec";
import { SigningStargateClient } from "../signingstargateclient";
import { assertIsBroadcastTxSuccess } from "../stargateclient";
import {
  faucet,
  nonNegativeIntegerMatcher,
  pendingWithoutSimapp,
  simapp,
  simappEnabled,
  validator,
} from "../testutils.spec";
import { QueryClient } from "./queryclient";
import { setupStakingExtension, StakingExtension } from "./staking";

type IMsgDelegate = cosmos.staking.v1beta1.IMsgDelegate;
type IMsgUndelegate = cosmos.staking.v1beta1.IMsgUndelegate;

async function makeClientWithStaking(
  rpcUrl: string,
): Promise<[QueryClient & StakingExtension, TendermintClient]> {
  const tmClient = await TendermintClient.connect(rpcUrl, adaptor34);
  return [QueryClient.withExtensions(tmClient, setupStakingExtension), tmClient];
}

describe("StakingExtension", () => {
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };

  beforeAll(async () => {
    if (simappEnabled()) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

      {
        const msg: IMsgDelegate = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(25000, "ustake"),
        };
        const msgAny = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const memo = "Test delegation for Stargate";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], defaultFee, memo);
        assertIsBroadcastTxSuccess(result);
      }
      {
        const msg: IMsgUndelegate = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(100, "ustake"),
        };
        const msgAny = {
          typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
          value: msg,
        };
        const memo = "Test undelegation for Stargate";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], defaultFee, memo);
        assertIsBroadcastTxSuccess(result);
      }

      await sleep(75); // wait until transactions are indexed
    }
  });

  describe("unverified", () => {
    describe("delegation", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithStaking(simapp.tendermintUrl);

        const response = await client.staking.unverified.delegation(
          faucet.address0,
          validator.validatorAddress,
        );
        assertDefinedAndNotNull(response.delegationResponse);
        assertDefinedAndNotNull(response.delegationResponse.delegation);
        assertDefinedAndNotNull(response.delegationResponse.balance);
        expect({ ...response.delegationResponse.delegation }).toEqual({
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          shares: jasmine.stringMatching(nonNegativeIntegerMatcher),
        });
        expect({ ...response.delegationResponse.balance }).toEqual({
          denom: "ustake",
          amount: jasmine.stringMatching(nonNegativeIntegerMatcher),
        });

        tmClient.disconnect();
      });
    });
  });
});

import { coin, coins, DirectEthSecp256k1HdWallet, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { CometClient, connectComet } from "@cosmjs/tendermint-rpc";
import { sleep } from "@cosmjs/utils";
import { MsgDelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";

import { QueryClient } from "../../queryclient";
import { SigningStargateClient } from "../../signingstargateclient";
import { assertIsDeliverTxSuccess } from "../../stargateclient";
import {
  defaultSigningClientOptions,
  evmd,
  evmdEnabled,
  evmfaucet,
  evmSigningClientOptions,
  evmvalidator,
  externalCommunityPool,
  faucet,
  simapp,
  simappEnabled,
  validator,
} from "../../testutils";
import { MsgDelegateEncodeObject } from "../";
import { DistributionExtension, setupDistributionExtension } from "./queries";

async function makeClientWithDistribution(
  rpcUrl: string,
): Promise<[QueryClient & DistributionExtension, CometClient]> {
  const cometClient = await connectComet(rpcUrl);
  return [QueryClient.withExtensions(cometClient, setupDistributionExtension), cometClient];
}

(simappEnabled ? describe : xdescribe)("DistributionExtension", () => {
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };

  beforeAll(async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const client = await SigningStargateClient.connectWithSigner(
      simapp.tendermintUrlHttp,
      wallet,
      defaultSigningClientOptions,
    );

    const msg: MsgDelegate = {
      delegatorAddress: faucet.address0,
      validatorAddress: validator.validatorAddress,
      amount: coin(25000, "ustake"),
    };
    const msgAny: MsgDelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: msg,
    };
    const memo = "Test delegation for Stargate";
    const result = await client.signAndBroadcast(faucet.address0, [msgAny], defaultFee, memo);
    assertIsDeliverTxSuccess(result);

    await sleep(75); // wait until transactions are indexed
  });

  describe("communityPool", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      if (externalCommunityPool) {
        await expectAsync(client.distribution.communityPool()).toBeRejectedWithError(
          /external community pool is enabled - use the CommunityPool query exposed by the external community pool/i,
        );
      } else {
        const response = await client.distribution.communityPool();
        expect(response.pool).toBeDefined();
        expect(response.pool).not.toBeNull();
      }

      cometClient.disconnect();
    });
  });

  describe("delegationRewards", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.delegationRewards(
        faucet.address0,
        validator.validatorAddress,
      );
      expect(response.rewards).toBeDefined();
      expect(response.rewards).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("delegationTotalRewards", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.delegationTotalRewards(faucet.address0);
      expect(response.rewards).toBeDefined();
      expect(response.rewards).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("delegatorValidators", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.delegatorValidators(faucet.address0);
      expect(response.validators).toBeDefined();
      expect(response.validators).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("delegatorWithdrawAddress", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.delegatorWithdrawAddress(faucet.address0);
      expect(response.withdrawAddress).toBeDefined();
      expect(response.withdrawAddress).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("params", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.params();
      expect(response.params).toBeDefined();
      expect(response.params).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("validatorCommission", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.validatorCommission(validator.validatorAddress);
      expect(response.commission).toBeDefined();
      expect(response.commission).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("validatorOutstandingRewards", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.validatorOutstandingRewards(validator.validatorAddress);
      expect(response.rewards).toBeDefined();
      expect(response.rewards).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("validatorSlashes", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(simapp.tendermintUrlHttp);

      const response = await client.distribution.validatorSlashes(validator.validatorAddress, 1, 5);
      expect(response.slashes).toBeDefined();
      expect(response.slashes).not.toBeNull();

      cometClient.disconnect();
    });
  });
});

(evmdEnabled ? describe : xdescribe)("DistributionExtension (evmd)", () => {
  const defaultFee = {
    amount: coins(25000, evmd.denomFee),
    gas: "1500000", // 1.5 million
  };

  beforeAll(async () => {
    const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(evmfaucet.mnemonic);
    const client = await SigningStargateClient.connectWithSigner(
      evmd.tendermintUrlHttp,
      wallet,
      evmSigningClientOptions,
    );

    const msg: MsgDelegate = {
      delegatorAddress: evmfaucet.address0,
      validatorAddress: evmvalidator.validatorAddress,
      amount: coin(25000, evmd.denomStaking),
    };
    const msgAny: MsgDelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: msg,
    };
    const memo = "Test delegation for Stargate";
    const result = await client.signAndBroadcast(evmfaucet.address0, [msgAny], defaultFee, memo);
    assertIsDeliverTxSuccess(result);

    await sleep(75); // wait until transactions are indexed
  });

  describe("delegationRewards", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.delegationRewards(
        evmfaucet.address0,
        evmvalidator.validatorAddress,
      );
      expect(response.rewards).toBeDefined();
      expect(response.rewards).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("delegationTotalRewards", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.delegationTotalRewards(evmfaucet.address0);
      expect(response.rewards).toBeDefined();
      expect(response.rewards).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("delegatorValidators", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.delegatorValidators(evmfaucet.address0);
      expect(response.validators).toBeDefined();
      expect(response.validators).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("delegatorWithdrawAddress", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.delegatorWithdrawAddress(evmfaucet.address0);
      expect(response.withdrawAddress).toBeDefined();
      expect(response.withdrawAddress).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("params", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.params();
      expect(response.params).toBeDefined();
      expect(response.params).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("validatorCommission", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.validatorCommission(evmvalidator.validatorAddress);
      expect(response.commission).toBeDefined();
      expect(response.commission).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("validatorOutstandingRewards", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.validatorOutstandingRewards(evmvalidator.validatorAddress);
      expect(response.rewards).toBeDefined();
      expect(response.rewards).not.toBeNull();

      cometClient.disconnect();
    });
  });

  describe("validatorSlashes", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithDistribution(evmd.tendermintUrlHttp);

      const response = await client.distribution.validatorSlashes(evmvalidator.validatorAddress, 1, 5);
      expect(response.slashes).toBeDefined();
      expect(response.slashes).not.toBeNull();

      cometClient.disconnect();
    });
  });
});

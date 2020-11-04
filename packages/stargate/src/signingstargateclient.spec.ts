/* eslint-disable @typescript-eslint/naming-convention */
import { coin, coins, GasPrice, Secp256k1HdWallet } from "@cosmjs/launchpad";
import { Coin, cosmosField, DirectSecp256k1Wallet, registered, Registry } from "@cosmjs/proto-signing";
import { assert } from "@cosmjs/utils";
import { Message } from "protobufjs";

import { cosmos } from "./codec";
import { PrivateSigningStargateClient, SigningStargateClient } from "./signingstargateclient";
import { assertIsBroadcastTxSuccess } from "./stargateclient";
import { faucet, makeRandomAddress, pendingWithoutSimapp, simapp, validator } from "./testutils.spec";

describe("SigningStargateClient", () => {
  describe("constructor", () => {
    it("can be constructed with default fees", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet);
      const openedClient = (client as unknown) as PrivateSigningStargateClient;
      expect(openedClient.fees).toEqual({
        send: {
          amount: [
            {
              amount: "2000",
              denom: "ucosm",
            },
          ],
          gas: "80000",
        },
      });
    });

    it("can be constructed with custom registry", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const registry = new Registry();
      registry.register("/custom.MsgCustom", cosmos.bank.v1beta1.MsgSend);
      const options = { registry: registry };
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);
      const openedClient = (client as unknown) as PrivateSigningStargateClient;
      expect(openedClient.registry.lookupType("/custom.MsgCustom")).toEqual(cosmos.bank.v1beta1.MsgSend);
    });

    it("can be constructed with custom gas price", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const gasPrice = GasPrice.fromString("3.14utest");
      const options = { gasPrice: gasPrice };
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);
      const openedClient = (client as unknown) as PrivateSigningStargateClient;
      expect(openedClient.fees).toEqual({
        send: {
          amount: [
            {
              amount: "251200", // 3.14 * 80_000
              denom: "utest",
            },
          ],
          gas: "80000",
        },
      });
    });

    it("can be constructed with custom gas limits", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const gasLimits = {
        send: 160000,
      };
      const options = { gasLimits: gasLimits };
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);
      const openedClient = (client as unknown) as PrivateSigningStargateClient;
      expect(openedClient.fees).toEqual({
        send: {
          amount: [
            {
              amount: "4000", // 0.025 * 160_000
              denom: "ucosm",
            },
          ],
          gas: "160000",
        },
      });
    });

    it("can be constructed with custom gas price and gas limits", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const gasPrice = GasPrice.fromString("3.14utest");
      const gasLimits = {
        send: 160000,
      };
      const options = { gasPrice: gasPrice, gasLimits: gasLimits };
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);
      const openedClient = (client as unknown) as PrivateSigningStargateClient;
      expect(openedClient.fees).toEqual({
        send: {
          amount: [
            {
              amount: "502400", // 3.14 * 160_000
              denom: "utest",
            },
          ],
          gas: "160000",
        },
      });
    });
  });

  describe("sendTokens", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet);

      const transferAmount = coins(7890, "ucosm");
      const beneficiaryAddress = makeRandomAddress();
      const memo = "for dinner";

      // no tokens here
      const before = await client.getBalance(beneficiaryAddress, "ucosm");
      expect(before).toBeNull();

      // send
      const result = await client.sendTokens(faucet.address0, beneficiaryAddress, transferAmount, memo);
      assertIsBroadcastTxSuccess(result);
      expect(result.rawLog).toBeTruthy();

      // got tokens
      const after = await client.getBalance(beneficiaryAddress, "ucosm");
      assert(after);
      expect(after).toEqual(transferAmount[0]);
    });
  });

  describe("signAndBroadcast", () => {
    it("works with direct mode", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
      const registry = new Registry();
      registry.register(msgDelegateTypeUrl, cosmos.staking.v1beta1.MsgDelegate);
      const options = { registry: registry };
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);

      const msg = cosmos.staking.v1beta1.MsgDelegate.create({
        delegatorAddress: faucet.address0,
        validatorAddress: validator.validatorAddress,
        amount: coin(1234, "ustake"),
      });
      const msgAny = {
        typeUrl: msgDelegateTypeUrl,
        value: msg,
      };
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "180000", // 180k
      };
      const memo = "Use your power wisely";
      const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
      assertIsBroadcastTxSuccess(result);
    });

    it("works with legacy Amino mode", async () => {
      pendingWithoutSimapp();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const coinTypeUrl = "/cosmos.base.v1beta.Coin";
      const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
      const registry = new Registry();
      registry.register(coinTypeUrl, Coin);

      @registered(registry, msgDelegateTypeUrl)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class MsgDelegate extends Message {
        @cosmosField.string(1)
        public readonly delegator_address?: string;
        @cosmosField.string(2)
        public readonly validator_address?: string;
        @cosmosField.message(3, Coin)
        public readonly amount?: Coin;
      }

      const options = { registry: registry };
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);

      const msg = {
        delegator_address: faucet.address0,
        validator_address: validator.validatorAddress,
        amount: coin(1234, "ustake"),
      };
      const msgAny = {
        typeUrl: msgDelegateTypeUrl,
        value: msg,
      };
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "200000",
      };
      const memo = "Use your power wisely";
      const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
      assertIsBroadcastTxSuccess(result);
    });
  });
});

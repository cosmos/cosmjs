/* eslint-disable @typescript-eslint/naming-convention */
import { coin, coins, GasPrice, Secp256k1HdWallet } from "@cosmjs/launchpad";
import { Coin, cosmosField, DirectSecp256k1HdWallet, registered, Registry } from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";
import { Message } from "protobufjs";

import { cosmos } from "./codec";
import { PrivateSigningStargateClient, SigningStargateClient } from "./signingstargateclient";
import { assertIsBroadcastTxSuccess } from "./stargateclient";
import {
  faucet,
  makeRandomAddress,
  ModifyingDirectSecp256k1HdWallet,
  ModifyingSecp256k1HdWallet,
  pendingWithoutSimapp,
  simapp,
  validator,
} from "./testutils.spec";

const { MsgSend } = cosmos.bank.v1beta1;
const { MsgDelegate } = cosmos.staking.v1beta1;
const { Tx } = cosmos.tx.v1beta1;

describe("SigningStargateClient", () => {
  describe("constructor", () => {
    it("can be constructed with default fees", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
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
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const registry = new Registry();
      registry.register("/custom.MsgCustom", MsgSend);
      const options = { registry: registry };
      const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);
      const openedClient = (client as unknown) as PrivateSigningStargateClient;
      expect(openedClient.registry.lookupType("/custom.MsgCustom")).toEqual(MsgSend);
    });

    it("can be constructed with custom gas price", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
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
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
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
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
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
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
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
    describe("direct mode", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
        const registry = new Registry();
        registry.register(msgDelegateTypeUrl, MsgDelegate);
        const options = { registry: registry };
        const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);

        const msg = MsgDelegate.create({
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

      it("works with a modifying signer", async () => {
        pendingWithoutSimapp();
        const wallet = await ModifyingDirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
        const registry = new Registry();
        registry.register(msgDelegateTypeUrl, MsgDelegate);
        const options = { registry: registry };
        const client = await SigningStargateClient.connectWithWallet(simapp.tendermintUrl, wallet, options);

        const msg = MsgDelegate.create({
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

        await sleep(1000);

        const searchResult = await client.getTx(result.transactionHash);
        assert(searchResult, "Must find transaction");
        const tx = Tx.decode(searchResult.tx);
        // From ModifyingDirectSecp256k1HdWallet
        expect(tx.body!.memo).toEqual("This was modified");
        expect({ ...tx.authInfo!.fee!.amount![0] }).toEqual(coin(3000, "ucosm"));
        expect(tx.authInfo!.fee!.gasLimit!.toNumber()).toEqual(333333);
      });
    });

    describe("legacy Amino mode", () => {
      // NOTE: One registry shared between tests
      // See https://github.com/protobufjs/protobuf.js#using-decorators
      // > Decorated types reside in protobuf.roots["decorated"] using a flat structure, so no duplicate names.
      const registry = new Registry();
      const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";

      @registered(registry, msgDelegateTypeUrl)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class CustomMsgDelegate extends Message {
        @cosmosField.string(1)
        public readonly delegator_address?: string;
        @cosmosField.string(2)
        public readonly validator_address?: string;
        @cosmosField.message(3, Coin)
        public readonly amount?: Coin;
      }

      it("works", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
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

      it("works with a modifying signer", async () => {
        pendingWithoutSimapp();
        const wallet = await ModifyingSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
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

        await sleep(1000);

        const searchResult = await client.getTx(result.transactionHash);
        assert(searchResult, "Must find transaction");
        const tx = Tx.decode(searchResult.tx);
        // From ModifyingSecp256k1HdWallet
        expect(tx.body!.memo).toEqual("This was modified");
        expect({ ...tx.authInfo!.fee!.amount![0] }).toEqual(coin(3000, "ucosm"));
        expect(tx.authInfo!.fee!.gasLimit!.toNumber()).toEqual(333333);
      });
    });
  });
});

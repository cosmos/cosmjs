/* eslint-disable @typescript-eslint/naming-convention */
import {
  coin,
  coins,
  GasPrice,
  MsgDelegate as LaunchpadMsgDelegate,
  Secp256k1HdWallet,
} from "@cosmjs/launchpad";
import { Coin, cosmosField, DirectSecp256k1HdWallet, registered, Registry } from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";
import { Message } from "protobufjs";

import { AminoTypes } from "./aminotypes";
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
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);
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
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);
      const openedClient = (client as unknown) as PrivateSigningStargateClient;
      expect(openedClient.registry.lookupType("/custom.MsgCustom")).toEqual(MsgSend);
    });

    it("can be constructed with custom gas price", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const gasPrice = GasPrice.fromString("3.14utest");
      const options = { gasPrice: gasPrice };
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);
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
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);
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
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);
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
    it("works with direct signer", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

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

    it("works with legacy Amino signer", async () => {
      pendingWithoutSimapp();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

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
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

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
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

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
      // NOTE: One custom registry shared between tests
      // See https://github.com/protobufjs/protobuf.js#using-decorators
      // > Decorated types reside in protobuf.roots["decorated"] using a flat structure, so no duplicate names.
      const customRegistry = new Registry();
      const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";

      @registered(customRegistry, msgDelegateTypeUrl)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class CustomMsgDelegate extends Message {
        @cosmosField.string(1)
        public readonly custom_delegator_address?: string;
        @cosmosField.string(2)
        public readonly custom_validator_address?: string;
        @cosmosField.message(3, Coin)
        public readonly custom_amount?: Coin;
      }

      it("works with bank MsgSend", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

        const msgSend = {
          fromAddress: faucet.address0,
          toAddress: makeRandomAddress(),
          amount: coins(1234, "ucosm"),
        };
        const msgAny = {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: msgSend,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "200000",
        };
        const memo = "Use your tokens wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsBroadcastTxSuccess(result);
      });

      it("works with staking MsgDelegate", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

        const msgDelegate = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        };
        const msgAny = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msgDelegate,
        };
        const fee = {
          amount: coins(2000, "ustake"),
          gas: "200000",
        };
        const memo = "Use your tokens wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsBroadcastTxSuccess(result);
      });

      it("works with a custom registry and custom message", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const customAminoTypes = new AminoTypes({
          additions: {
            "/cosmos.staking.v1beta1.MsgDelegate": {
              aminoType: "cosmos-sdk/MsgDelegate",
              toAmino: ({
                custom_delegator_address,
                custom_validator_address,
                custom_amount,
              }: CustomMsgDelegate): LaunchpadMsgDelegate["value"] => {
                assert(custom_delegator_address, "missing custom_delegator_address");
                assert(custom_validator_address, "missing validator_address");
                assert(custom_amount, "missing amount");
                assert(custom_amount.amount, "missing amount.amount");
                assert(custom_amount.denom, "missing amount.denom");
                return {
                  delegator_address: custom_delegator_address,
                  validator_address: custom_validator_address,
                  amount: {
                    amount: custom_amount.amount,
                    denom: custom_amount.denom,
                  },
                };
              },
              fromAmino: ({
                delegator_address,
                validator_address,
                amount,
              }: LaunchpadMsgDelegate["value"]): CustomMsgDelegate =>
                CustomMsgDelegate.create({
                  custom_delegator_address: delegator_address,
                  custom_validator_address: validator_address,
                  custom_amount: Coin.create(amount),
                }),
            },
          },
        });
        const options = { registry: customRegistry, aminoTypes: customAminoTypes };
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);

        const msg = {
          custom_delegator_address: faucet.address0,
          custom_validator_address: validator.validatorAddress,
          custom_amount: coin(1234, "ustake"),
        };
        const msgAny = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
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
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet);

        const msg = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
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

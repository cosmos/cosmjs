/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from "@cosmjs/utils";

import { Coin, coin, coins } from "./coins";
import { assertIsBroadcastTxSuccess, PrivateCosmosClient } from "./cosmosclient";
import { GasPrice } from "./gas";
import { MsgDelegate } from "./msgs";
import { Secp256k1HdWallet } from "./secp256k1hdwallet";
import { PrivateSigningCosmosClient, SigningCosmosClient } from "./signingcosmosclient";
import { launchpad, makeRandomAddress, pendingWithoutLaunchpad } from "./testutils.spec";

const httpUrl = "http://localhost:1317";

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

describe("SigningCosmosClient", () => {
  describe("makeReadOnly", () => {
    it("can be constructed with default fees", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(httpUrl, faucet.address, wallet);
      const openedClient = (client as unknown) as PrivateSigningCosmosClient;
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

    it("can be constructed with custom gas price", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const gasPrice = GasPrice.fromString("3.14utest");
      const client = new SigningCosmosClient(httpUrl, faucet.address, wallet, gasPrice);
      const openedClient = (client as unknown) as PrivateSigningCosmosClient;
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
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const gasLimits = {
        send: 160000,
      };
      const client = new SigningCosmosClient(httpUrl, faucet.address, wallet, undefined, gasLimits);
      const openedClient = (client as unknown) as PrivateSigningCosmosClient;
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
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const gasPrice = GasPrice.fromString("3.14utest");
      const gasLimits = {
        send: 160000,
      };
      const client = new SigningCosmosClient(httpUrl, faucet.address, wallet, gasPrice, gasLimits);
      const openedClient = (client as unknown) as PrivateSigningCosmosClient;
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

  describe("getHeight", () => {
    it("always uses authAccount implementation", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(httpUrl, faucet.address, wallet);

      const openedClient = (client as unknown) as PrivateCosmosClient;
      const blockLatestSpy = spyOn(openedClient.lcdClient, "blocksLatest").and.callThrough();
      const authAccountsSpy = spyOn(openedClient.lcdClient.auth, "account").and.callThrough();

      const height = await client.getHeight();
      expect(height).toBeGreaterThan(0);

      expect(blockLatestSpy).toHaveBeenCalledTimes(0);
      expect(authAccountsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("sendTokens", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(httpUrl, faucet.address, wallet);

      // instantiate
      const transferAmount: readonly Coin[] = [
        {
          amount: "7890",
          denom: "ucosm",
        },
      ];
      const beneficiaryAddress = makeRandomAddress();

      // no tokens here
      const before = await client.getAccount(beneficiaryAddress);
      expect(before).toBeUndefined();

      // send
      const result = await client.sendTokens(beneficiaryAddress, transferAmount, "for dinner");
      assertIsBroadcastTxSuccess(result);
      const [firstLog] = result.logs;
      expect(firstLog).toBeTruthy();

      // got tokens
      const after = await client.getAccount(beneficiaryAddress);
      assert(after);
      expect(after.balance).toEqual(transferAmount);
    });
  });

  describe("signAndBroadcast", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(httpUrl, faucet.address, wallet);

      const msg: MsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: faucet.address,
          validator_address: launchpad.validator.address,
          amount: coin(1234, "ustake"),
        },
      };
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "180000", // 180k
      };
      const result = await client.signAndBroadcast([msg], fee, "Use your power wisely");
      assertIsBroadcastTxSuccess(result);
    });
  });
});

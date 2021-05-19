/* eslint-disable @typescript-eslint/naming-convention */
import { coin, coins, makeCosmoshubPath, Secp256k1HdWallet } from "@cosmjs/amino";
import { assert } from "@cosmjs/utils";

import { assertIsBroadcastTxSuccess, PrivateCosmosClient } from "./cosmosclient";
import { GasPrice } from "./fee";
import { MsgDelegate, MsgSend } from "./msgs";
import { PrivateSigningCosmosClient, SigningCosmosClient } from "./signingcosmosclient";
import {
  base64Matcher,
  faucet,
  launchpad,
  makeRandomAddress,
  pendingWithoutLaunchpad,
} from "./testutils.spec";

describe("SigningCosmosClient", () => {
  describe("makeReadOnly", () => {
    it("can be constructed with default fees", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet);
      const openedClient = client as unknown as PrivateSigningCosmosClient;
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
      const client = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet, gasPrice);
      const openedClient = client as unknown as PrivateSigningCosmosClient;
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
      const client = new SigningCosmosClient(
        launchpad.endpoint,
        faucet.address0,
        wallet,
        undefined,
        gasLimits,
      );
      const openedClient = client as unknown as PrivateSigningCosmosClient;
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
      const client = new SigningCosmosClient(
        launchpad.endpoint,
        faucet.address0,
        wallet,
        gasPrice,
        gasLimits,
      );
      const openedClient = client as unknown as PrivateSigningCosmosClient;
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
      const client = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet);

      const openedClient = client as unknown as PrivateCosmosClient;
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
      const client = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet);

      const amount = coins(7890, "ucosm");
      const beneficiaryAddress = makeRandomAddress();

      // no tokens here
      const before = await client.getAccount(beneficiaryAddress);
      expect(before).toBeUndefined();

      // send
      const result = await client.sendTokens(beneficiaryAddress, amount, "for dinner");
      assertIsBroadcastTxSuccess(result);
      const [firstLog] = result.logs;
      expect(firstLog).toBeTruthy();

      // got tokens
      const after = await client.getAccount(beneficiaryAddress);
      assert(after);
      expect(after.balance).toEqual(amount);
    });
  });

  describe("signAndBroadcast", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet);

      const msg: MsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: faucet.address0,
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

  describe("sign", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet);

      const msg1: MsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: faucet.address0,
          validator_address: launchpad.validator.address,
          amount: coin(1234, "ustake"),
        },
      };
      const msg2: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: faucet.address0,
          to_address: makeRandomAddress(),
          amount: coins(1234567, "ucosm"),
        },
      };
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "180000", // 180k
      };
      const memo = "Use your power wisely";

      const signed = await client.sign([msg1, msg2], fee, memo);
      expect(signed.msg).toEqual([msg1, msg2]);
      expect(signed.fee).toEqual(fee);
      expect(signed.memo).toEqual(memo);
      expect(signed.signatures).toEqual([
        {
          pub_key: faucet.pubkey0,
          signature: jasmine.stringMatching(base64Matcher),
        },
      ]);
      // Ensure signed transaction is valid
      const broadcastResult = await client.broadcastTx(signed);
      assertIsBroadcastTxSuccess(broadcastResult);
    });
  });

  describe("appendSignature", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet0 = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic, {
        hdPaths: [makeCosmoshubPath(0)],
      });
      const wallet1 = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic, {
        hdPaths: [makeCosmoshubPath(1)],
      });
      const client0 = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet0);
      const client1 = new SigningCosmosClient(launchpad.endpoint, faucet.address1, wallet1);

      const msg1: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: faucet.address0,
          to_address: makeRandomAddress(),
          amount: coins(1234567, "ucosm"),
        },
      };
      const msg2: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: faucet.address1,
          to_address: makeRandomAddress(),
          amount: coins(1234567, "ucosm"),
        },
      };
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "160000", // 2*80k
      };
      const memo = "This must be authorized by the two of us";

      const signed = await client0.sign([msg1, msg2], fee, memo);

      const cosigned = await client1.appendSignature(signed);
      expect(cosigned.msg).toEqual([msg1, msg2]);
      expect(cosigned.fee).toEqual(fee);
      expect(cosigned.memo).toEqual(memo);
      expect(cosigned.signatures).toEqual([
        {
          pub_key: faucet.pubkey0,
          signature: jasmine.stringMatching(base64Matcher),
        },
        {
          pub_key: faucet.pubkey1,
          signature: jasmine.stringMatching(base64Matcher),
        },
      ]);
      // Ensure signed transaction is valid
      const broadcastResult = await client0.broadcastTx(cosigned);
      assertIsBroadcastTxSuccess(broadcastResult);
    });
  });
});

import { assert } from "@cosmjs/utils";

import { Coin } from "./coins";
import { isPostTxFailure, PrivateCosmWasmClient } from "./cosmosclient";
import { SigningCosmosClient } from "./signingcosmosclient";
import { makeRandomAddress, pendingWithoutWasmd } from "./testutils.spec";
import { Secp256k1OfflineWallet } from "./wallet";

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
    it("can be constructed", async () => {
      const wallet = await Secp256k1OfflineWallet.fromMnemonic(faucet.mnemonic);
      await wallet.enable();
      const accounts = await wallet.getAccounts();
      const { address } = accounts[0];
      const client = new SigningCosmosClient(httpUrl, faucet.address, async (signBytes) =>
        wallet.sign(address, signBytes),
      );
      expect(client).toBeTruthy();
    });
  });

  describe("getHeight", () => {
    it("always uses authAccount implementation", async () => {
      pendingWithoutWasmd();
      const wallet = await Secp256k1OfflineWallet.fromMnemonic(faucet.mnemonic);
      await wallet.enable();
      const accounts = await wallet.getAccounts();
      const { address } = accounts[0];
      const client = new SigningCosmosClient(httpUrl, faucet.address, async (signBytes) =>
        wallet.sign(address, signBytes),
      );

      const openedClient = (client as unknown) as PrivateCosmWasmClient;
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
      pendingWithoutWasmd();
      const wallet = await Secp256k1OfflineWallet.fromMnemonic(faucet.mnemonic);
      await wallet.enable();
      const accounts = await wallet.getAccounts();
      const { address } = accounts[0];
      const client = new SigningCosmosClient(httpUrl, faucet.address, async (signBytes) =>
        wallet.sign(address, signBytes),
      );

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
      assert(!isPostTxFailure(result));
      const [firstLog] = result.logs;
      expect(firstLog).toBeTruthy();

      // got tokens
      const after = await client.getAccount(beneficiaryAddress);
      assert(after);
      expect(after.balance).toEqual(transferAmount);
    });
  });
});

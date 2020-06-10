import { assert } from "@cosmjs/utils";

import { Coin } from "./coins";
import { isPostTxFailure, PrivateCosmWasmClient } from "./cosmosclient";
import { Secp256k1Pen } from "./pen";
import { SigningCosmosClient } from "./signingcosmosclient";
import { makeRandomAddress, pendingWithoutWasmd } from "./testutils.spec";

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
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));
      expect(client).toBeTruthy();
    });
  });

  describe("getHeight", () => {
    it("always uses authAccount implementation", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));

      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const blockLatestSpy = spyOn(openedClient.restClient, "blocksLatest").and.callThrough();
      const authAccountsSpy = spyOn(openedClient.restClient, "authAccounts").and.callThrough();

      const height = await client.getHeight();
      expect(height).toBeGreaterThan(0);

      expect(blockLatestSpy).toHaveBeenCalledTimes(0);
      expect(authAccountsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("sendTokens", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));

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

import { assert } from "@cosmjs/utils";

import { PrivateStargateClient, StargateClient } from "./stargateclient";
import { nonExistentAddress, pendingWithoutSimapp, simapp, unused, validator } from "./testutils.spec";

describe("StargateClient", () => {
  describe("connect", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      expect(client).toBeTruthy();
      client.disconnect();
    });
  });

  describe("getChainId", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      expect(await client.getChainId()).toEqual(simapp.chainId);
    });

    it("caches chain ID", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const openedClient = (client as unknown) as PrivateStargateClient;
      const getCodeSpy = spyOn(openedClient.tmClient, "status").and.callThrough();

      expect(await client.getChainId()).toEqual(simapp.chainId); // from network
      expect(await client.getChainId()).toEqual(simapp.chainId); // from cache

      expect(getCodeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAccount", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(unused.address);
      assert(account);
      expect(account).toEqual({
        address: unused.address,
        pubkey: null,
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });

      client.disconnect();
    });

    it("works for account with pubkey and non-zero sequence", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(validator.address);
      assert(account);
      expect(account).toEqual({
        address: validator.address,
        pubkey: validator.pubkey,
        accountNumber: validator.accountNumber,
        sequence: validator.sequence,
      });

      client.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(nonExistentAddress);
      expect(account).toBeNull();

      client.disconnect();
    });
  });

  describe("getSequence", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getSequence(unused.address);
      assert(account);
      expect(account).toEqual({
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });

      client.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getSequence(nonExistentAddress);
      expect(account).toBeNull();

      client.disconnect();
    });
  });

  describe("getBalance", () => {
    it("works for different existing balances", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response1 = await client.getBalance(unused.address, simapp.denomFee);
      expect(response1).toEqual({
        amount: unused.balanceFee,
        denom: simapp.denomFee,
      });
      const response2 = await client.getBalance(unused.address, simapp.denomStaking);
      expect(response2).toEqual({
        amount: unused.balanceStaking,
        denom: simapp.denomStaking,
      });

      client.disconnect();
    });

    it("returns null for non-existent balance", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response = await client.getBalance(unused.address, "gintonic");
      expect(response).toBeNull();

      client.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response = await client.getBalance(nonExistentAddress, simapp.denomFee);
      expect(response).toBeNull();

      client.disconnect();
    });
  });

  describe("getAllBalancesUnverified", () => {
    it("returns all balances for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const balances = await client.getAllBalancesUnverified(unused.address);
      expect(balances).toEqual([
        {
          amount: unused.balanceFee,
          denom: simapp.denomFee,
        },
        {
          amount: unused.balanceStaking,
          denom: simapp.denomStaking,
        },
      ]);
    });

    it("returns an empty list for non-existent account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const balances = await client.getAllBalancesUnverified(nonExistentAddress);
      expect(balances).toEqual([]);
    });
  });
});

import { adaptor34, Client as TendermintClient } from "@cosmjs/tendermint-rpc";

import {
  nonExistentAddress,
  nonNegativeIntegerMatcher,
  pendingWithoutSimapp,
  simapp,
  unused,
} from "../testutils.spec";
import { BankExtension, setupBankExtension } from "./bank";
import { QueryClient } from "./queryclient";

async function makeClientWithBank(rpcUrl: string): Promise<[QueryClient & BankExtension, TendermintClient]> {
  const tmClient = await TendermintClient.connect(rpcUrl, adaptor34);
  return [QueryClient.withExtensions(tmClient, setupBankExtension), tmClient];
}

describe("BankExtension", () => {
  describe("balance", () => {
    it("works for different existing balances", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

      const response1 = await client.bank.balance(unused.address, simapp.denomFee);
      expect(response1).toEqual({
        amount: unused.balanceFee,
        denom: simapp.denomFee,
      });
      const response2 = await client.bank.balance(unused.address, simapp.denomStaking);
      expect(response2).toEqual({
        amount: unused.balanceStaking,
        denom: simapp.denomStaking,
      });

      tmClient.disconnect();
    });

    it("returns null for non-existent balance", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

      const response = await client.bank.balance(unused.address, "gintonic");
      expect(response).toBeNull();

      tmClient.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

      const response = await client.bank.balance(nonExistentAddress, simapp.denomFee);
      expect(response).toBeNull();

      tmClient.disconnect();
    });
  });

  describe("unverified", () => {
    describe("balance", () => {
      it("works for different existing balances", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const response1 = await client.bank.unverified.balance(unused.address, simapp.denomFee);
        expect(response1).toEqual({
          amount: unused.balanceFee,
          denom: simapp.denomFee,
        });
        const response2 = await client.bank.unverified.balance(unused.address, simapp.denomStaking);
        expect(response2).toEqual({
          amount: unused.balanceStaking,
          denom: simapp.denomStaking,
        });

        tmClient.disconnect();
      });

      it("returns zero for non-existent balance", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const response = await client.bank.unverified.balance(unused.address, "gintonic");
        expect(response).toEqual({
          amount: "0",
          denom: "gintonic",
        });

        tmClient.disconnect();
      });

      it("returns zero for non-existent address", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const response = await client.bank.unverified.balance(nonExistentAddress, simapp.denomFee);
        expect(response).toEqual({
          amount: "0",
          denom: simapp.denomFee,
        });

        tmClient.disconnect();
      });
    });

    describe("allBalances", () => {
      it("returns all balances for unused account", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const balances = await client.bank.unverified.allBalances(unused.address);
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

        tmClient.disconnect();
      });

      it("returns an empty list for non-existent account", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const balances = await client.bank.unverified.allBalances(nonExistentAddress);
        expect(balances).toEqual([]);

        tmClient.disconnect();
      });
    });

    describe("totalSupply", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const response = await client.bank.unverified.totalSupply();
        expect(response).toEqual([
          {
            amount: "18000000000",
            denom: simapp.denomFee,
          },
          {
            amount: jasmine.stringMatching(nonNegativeIntegerMatcher),
            denom: simapp.denomStaking,
          },
        ]);

        tmClient.disconnect();
      });
    });

    describe("supplyOf", () => {
      it("works for existing denom", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const response = await client.bank.unverified.supplyOf(simapp.denomFee);
        expect(response).toEqual({
          amount: "18000000000",
          denom: simapp.denomFee,
        });

        tmClient.disconnect();
      });

      it("returns zero for non-existent denom", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithBank(simapp.tendermintUrl);

        const response = await client.bank.unverified.supplyOf("gintonic");
        expect(response).toEqual({
          amount: "0",
          denom: "gintonic",
        });

        tmClient.disconnect();
      });
    });
  });
});

import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";

import { QueryClient } from "../queryclient";
import { nonExistentAddress, pendingWithoutSimapp, simapp, unused } from "../testutils.spec";
import { BankExtension, setupBankExtension } from "./bank";

async function makeBankClient(rpcUrl: string): Promise<QueryClient & BankExtension> {
  // TODO: tmClient is not owned by QueryClient but should be disconnected somehow (once we use WebSockets)
  const tmClient = await TendermintClient.connect(rpcUrl);
  return QueryClient.withExtensions(tmClient, setupBankExtension);
}

describe("BankExtension", () => {
  describe("balance", () => {
    it("works for different existing balances", async () => {
      pendingWithoutSimapp();
      const client = await makeBankClient(simapp.tendermintUrl);

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
    });

    it("returns null for non-existent balance", async () => {
      pendingWithoutSimapp();
      const client = await makeBankClient(simapp.tendermintUrl);

      const response = await client.bank.balance(unused.address, "gintonic");
      expect(response).toBeNull();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await makeBankClient(simapp.tendermintUrl);

      const response = await client.bank.balance(nonExistentAddress, simapp.denomFee);
      expect(response).toBeNull();
    });
  });

  describe("allBalances", () => {
    it("returns all balances for unused account", async () => {
      pendingWithoutSimapp();
      const client = await makeBankClient(simapp.tendermintUrl);

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
    });

    it("returns an empty list for non-existent account", async () => {
      pendingWithoutSimapp();
      const client = await makeBankClient(simapp.tendermintUrl);

      const balances = await client.bank.unverified.allBalances(nonExistentAddress);
      expect(balances).toEqual([]);
    });
  });
});

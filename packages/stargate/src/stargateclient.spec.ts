import { StargateClient } from "./stargateclient";
import { nonExistentAddress, pendingWithoutSimapp, simapp, unused } from "./testutils.spec";

describe("StargateClient", () => {
  describe("connect", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      expect(client).toBeTruthy();
      client.disconnect();
    });
  });

  describe("getSequence", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const { accountNumber, sequence } = await client.getSequence(unused.address);
      expect(accountNumber).toEqual(unused.accountNumber);
      expect(sequence).toEqual(unused.sequence);

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

  describe("getUnverifiedAllBalances", () => {
    it("returns all balances for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const balances = await client.getUnverifiedAllBalances(unused.address);
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
      const balances = await client.getUnverifiedAllBalances(nonExistentAddress);
      expect(balances).toEqual([]);
    });
  });
});

import { StargateClient } from "./stargateclient";
import { pendingWithoutSimapp, simapp, unused } from "./testutils.spec";

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

      const response1 = await client.getBalance(unused.address, "ucosm");
      expect(response1).toEqual({
        amount: "1000000000",
        denom: "ucosm",
      });
      const response2 = await client.getBalance(unused.address, "ustake");
      expect(response2).toEqual({
        amount: "1000000000",
        denom: "ustake",
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
  });
});

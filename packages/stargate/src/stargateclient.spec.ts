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
});

import { pendingWithoutWasmd, wasmd } from "../testutils.spec";
import { LcdClient } from "./lcdclient";
import { setupSupplyModule } from "./supply";

describe("supply", () => {
  describe("totalSupplyAll", () => {
    it("works", async () => {
      pendingWithoutWasmd();

      const client = LcdClient.withModules({ apiUrl: wasmd.endpoint }, setupSupplyModule);
      const supply = await client.totalSupplyAll();
      expect(supply).toEqual({
        height: jasmine.stringMatching(/^[0-9]+$/),
        result: [
          {
            amount: jasmine.stringMatching(/^[0-9]+$/),
            denom: "ucosm",
          },
          {
            amount: jasmine.stringMatching(/^[0-9]+$/),
            denom: "ustake",
          },
        ],
      });
    });
  });

  describe("totalSupply", () => {
    it("works", async () => {
      pendingWithoutWasmd();

      const client = LcdClient.withModules({ apiUrl: wasmd.endpoint }, setupSupplyModule);
      const supply = await client.totalSupply("ucosm");
      expect(supply).toEqual({
        height: jasmine.stringMatching(/^[0-9]+$/),
        result: jasmine.stringMatching(/^[0-9]+$/),
      });
    });
  });
});

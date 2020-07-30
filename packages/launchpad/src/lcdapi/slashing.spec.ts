/* eslint-disable @typescript-eslint/naming-convention */
import { nonNegativeIntegerMatcher, pendingWithoutWasmd, wasmd } from "../testutils.spec";
import { LcdClient } from "./lcdclient";
import { setupSlashingExtension, SlashingExtension } from "./slashing";

function makeSlashingClient(apiUrl: string): LcdClient & SlashingExtension {
  return LcdClient.withExtensions({ apiUrl }, setupSlashingExtension);
}

describe("SlashingExtension", () => {
  describe("signingInfos", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeSlashingClient(wasmd.endpoint);
      const response = await client.slashing.signingInfos();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            address: "cosmosvalcons14dsaw6zrrk3zugfgwwhmwap8p5cxsemfesgcaw",
            start_height: "0",
            index_offset: jasmine.stringMatching(nonNegativeIntegerMatcher),
            jailed_until: "1970-01-01T00:00:00Z",
            tombstoned: false,
            missed_blocks_counter: "0",
          },
        ],
      });
    });
  });

  describe("parameters", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeSlashingClient(wasmd.endpoint);
      const response = await client.slashing.parameters();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          signed_blocks_window: "100",
          min_signed_per_window: "0.500000000000000000",
          downtime_jail_duration: "600000000000",
          slash_fraction_double_sign: "0.050000000000000000",
          slash_fraction_downtime: "0.010000000000000000",
        },
      });
    });
  });
});

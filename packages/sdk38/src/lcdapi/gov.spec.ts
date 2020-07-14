/* eslint-disable @typescript-eslint/camelcase */
import { nonNegativeIntegerMatcher, pendingWithoutWasmd, wasmd } from "../testutils.spec";
import { GovExtension, GovParametersType, setupGovExtension } from "./gov";
import { LcdClient } from "./lcdclient";

function makeGovClient(apiUrl: string): LcdClient & GovExtension {
  return LcdClient.withExtensions({ apiUrl }, setupGovExtension);
}

describe("GovExtension", () => {
  describe("parametersByType", () => {
    it("works for deposit", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const paramsType = GovParametersType.Deposit;
      const response = await client.gov.parametersByType(paramsType);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          min_deposit: [{ denom: "ustake", amount: "10000000" }],
          max_deposit_period: "172800000000000",
        },
      });
    });

    it("works for tallying", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const paramsType = GovParametersType.Tallying;
      const response = await client.gov.parametersByType(paramsType);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          quorum: "0.334000000000000000",
          threshold: "0.500000000000000000",
          veto: "0.334000000000000000",
        },
      });
    });

    it("works for voting", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const paramsType = GovParametersType.Voting;
      const response = await client.gov.parametersByType(paramsType);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          voting_period: "172800000000000",
        },
      });
    });
  });
});

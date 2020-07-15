/* eslint-disable @typescript-eslint/camelcase */
import {
  dateTimeStampMatcher,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  wasmd,
} from "../testutils.spec";
import { GovExtension, GovParametersType, setupGovExtension } from "./gov";
import { LcdClient } from "./lcdclient";

const governorAddress = "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada";

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

  describe("proposals", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const response = await client.gov.proposals();
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            content: {
              type: "cosmos-sdk/TextProposal",
              value: {
                title: "Test Proposal",
                description: "This proposal proposes to test whether this proposal passes",
              },
            },
            id: "1",
            proposal_status: "VotingPeriod",
            final_tally_result: Object({ yes: "0", abstain: "0", no: "0", no_with_veto: "0" }),
            submit_time: jasmine.stringMatching(dateTimeStampMatcher),
            deposit_end_time: jasmine.stringMatching(dateTimeStampMatcher),
            total_deposit: [{ denom: "ustake", amount: "25000000" }],
            voting_start_time: jasmine.stringMatching(dateTimeStampMatcher),
            voting_end_time: jasmine.stringMatching(dateTimeStampMatcher),
          },
        ],
      });
    });
  });

  describe("proposal", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const proposalId = "1";
      const response = await client.gov.proposal(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          content: {
            type: "cosmos-sdk/TextProposal",
            value: {
              title: "Test Proposal",
              description: "This proposal proposes to test whether this proposal passes",
            },
          },
          id: proposalId,
          proposal_status: "VotingPeriod",
          final_tally_result: Object({ yes: "0", abstain: "0", no: "0", no_with_veto: "0" }),
          submit_time: jasmine.stringMatching(dateTimeStampMatcher),
          deposit_end_time: jasmine.stringMatching(dateTimeStampMatcher),
          total_deposit: [{ denom: "ustake", amount: "25000000" }],
          voting_start_time: jasmine.stringMatching(dateTimeStampMatcher),
          voting_end_time: jasmine.stringMatching(dateTimeStampMatcher),
        },
      });
    });
  });

  describe("proposer", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const proposalId = "1";
      const response = await client.gov.proposer(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          proposal_id: proposalId,
          proposer: governorAddress,
        },
      });
    });
  });

  describe("deposits", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const proposalId = "1";
      const response = await client.gov.deposits(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            proposal_id: proposalId,
            depositor: governorAddress,
            amount: [{ denom: "ustake", amount: "25000000" }],
          },
        ],
      });
    });
  });

  describe("deposit", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const proposalId = "1";
      const response = await client.gov.deposit(proposalId, governorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          proposal_id: proposalId,
          depositor: governorAddress,
          amount: [{ denom: "ustake", amount: "25000000" }],
        },
      });
    });
  });

  describe("tally", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const proposalId = "1";
      const response = await client.gov.tally(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          yes: "0",
          abstain: "0",
          no: "0",
          no_with_veto: "0",
        },
      });
    });
  });

  describe("votes", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const proposalId = "1";
      const response = await client.gov.votes(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            proposal_id: proposalId,
            voter: governorAddress,
            option: "Yes",
          },
        ],
      });
    });
  });

  describe("vote", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const proposalId = "1";
      const response = await client.gov.vote(proposalId, governorAddress);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          voter: governorAddress,
          proposal_id: proposalId,
          option: "Yes",
        },
      });
    });
  });
});

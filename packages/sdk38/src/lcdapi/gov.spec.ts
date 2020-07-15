/* eslint-disable @typescript-eslint/camelcase */
import { sleep } from "@cosmjs/utils";

import { coins } from "../coins";
import { isPostTxFailure } from "../cosmosclient";
import { makeSignBytes } from "../encoding";
import { SigningCosmosClient } from "../signingcosmosclient";
import {
  dateTimeStampMatcher,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  wasmd,
  wasmdEnabled,
} from "../testutils.spec";
import { Secp256k1Wallet } from "../wallet";
import { GovExtension, GovParametersType, setupGovExtension } from "./gov";
import { LcdClient } from "./lcdclient";

function makeGovClient(apiUrl: string): LcdClient & GovExtension {
  return LcdClient.withExtensions({ apiUrl }, setupGovExtension);
}

describe("GovExtension", () => {
  const httpUrl = "http://localhost:1317";
  const alice = {
    mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
    address0: "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada",
  };
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };
  let proposalId: string;

  beforeAll(async () => {
    if (wasmdEnabled()) {
      const wallet = await Secp256k1Wallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmosClient(httpUrl, alice.address0, wallet, {});

      const chainId = await client.getChainId();
      const proposalMsg = {
        type: "cosmos-sdk/MsgSubmitProposal",
        value: {
          content: {
            type: "cosmos-sdk/TextProposal",
            value: {
              description: "This proposal proposes to test whether this proposal passes",
              title: "Test Proposal",
            },
          },
          proposer: alice.address0,
          initial_deposit: coins(25000000, "ustake"),
        },
      };
      const proposalMemo = "Test proposal for wasmd";
      const { accountNumber: proposalAccountNumber, sequence: proposalSequence } = await client.getNonce();
      const proposalSignBytes = makeSignBytes(
        [proposalMsg],
        defaultFee,
        chainId,
        proposalMemo,
        proposalAccountNumber,
        proposalSequence,
      );
      const proposalSignature = await wallet.sign(alice.address0, proposalSignBytes);
      const proposalTx = {
        msg: [proposalMsg],
        fee: defaultFee,
        memo: proposalMemo,
        signatures: [proposalSignature],
      };

      const proposalReceipt = await client.postTx(proposalTx);
      if (isPostTxFailure(proposalReceipt)) {
        throw new Error("Proposal submission failed");
      }
      proposalId = proposalReceipt.logs[0].events
        .find(({ type }) => type === "submit_proposal")!
        .attributes.find(({ key }) => key === "proposal_id")!.value;

      const voteMsg = {
        type: "cosmos-sdk/MsgVote",
        value: {
          proposal_id: proposalId,
          voter: alice.address0,
          option: "Yes",
        },
      };
      const voteMemo = "Test vote for wasmd";
      const { accountNumber: voteAccountNumber, sequence: voteSequence } = await client.getNonce();
      const voteSignBytes = makeSignBytes(
        [voteMsg],
        defaultFee,
        chainId,
        voteMemo,
        voteAccountNumber,
        voteSequence,
      );
      const voteSignature = await wallet.sign(alice.address0, voteSignBytes);
      const voteTx = {
        msg: [voteMsg],
        fee: defaultFee,
        memo: voteMemo,
        signatures: [voteSignature],
      };
      await client.postTx(voteTx);

      await sleep(75); // wait until transactions are indexed
    }
  });

  describe("parameters", () => {
    it("works for deposit", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const paramsType = GovParametersType.Deposit;
      const response = await client.gov.parameters(paramsType);
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
      const response = await client.gov.parameters(paramsType);
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
      const response = await client.gov.parameters(paramsType);
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
      expect(response.height).toMatch(nonNegativeIntegerMatcher);
      expect(response.result.length).toBeGreaterThanOrEqual(1);
      expect(response.result[response.result.length - 1]).toEqual({
        content: {
          type: "cosmos-sdk/TextProposal",
          value: {
            title: "Test Proposal",
            description: "This proposal proposes to test whether this proposal passes",
          },
        },
        id: proposalId,
        proposal_status: "VotingPeriod",
        final_tally_result: { yes: "0", abstain: "0", no: "0", no_with_veto: "0" },
        submit_time: jasmine.stringMatching(dateTimeStampMatcher),
        deposit_end_time: jasmine.stringMatching(dateTimeStampMatcher),
        total_deposit: [{ denom: "ustake", amount: "25000000" }],
        voting_start_time: jasmine.stringMatching(dateTimeStampMatcher),
        voting_end_time: jasmine.stringMatching(dateTimeStampMatcher),
      });
    });
  });

  describe("proposal", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
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
          final_tally_result: { yes: "0", abstain: "0", no: "0", no_with_veto: "0" },
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
      const response = await client.gov.proposer(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          proposal_id: proposalId,
          proposer: alice.address0,
        },
      });
    });
  });

  describe("deposits", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
      const response = await client.gov.deposits(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            proposal_id: proposalId,
            depositor: alice.address0,
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
      const response = await client.gov.deposit(proposalId, alice.address0);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          proposal_id: proposalId,
          depositor: alice.address0,
          amount: [{ denom: "ustake", amount: "25000000" }],
        },
      });
    });
  });

  describe("tally", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = makeGovClient(wasmd.endpoint);
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
      const response = await client.gov.votes(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            proposal_id: proposalId,
            voter: alice.address0,
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
      const response = await client.gov.vote(proposalId, alice.address0);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          voter: alice.address0,
          proposal_id: proposalId,
          option: "Yes",
        },
      });
    });
  });
});

/* eslint-disable @typescript-eslint/naming-convention */
import { coins, makeSignDoc, Secp256k1HdWallet } from "@cosmjs/amino";
import { sleep } from "@cosmjs/utils";

import { assertIsBroadcastTxSuccess } from "../cosmosclient";
import { SigningCosmosClient } from "../signingcosmosclient";
import {
  dateTimeStampMatcher,
  faucet,
  launchpad,
  launchpadEnabled,
  nonNegativeIntegerMatcher,
  pendingWithoutLaunchpad,
} from "../testutils.spec";
import { GovExtension, GovParametersType, setupGovExtension } from "./gov";
import { LcdClient } from "./lcdclient";

function makeGovClient(apiUrl: string): LcdClient & GovExtension {
  return LcdClient.withExtensions({ apiUrl }, setupGovExtension);
}

describe("GovExtension", () => {
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };
  let proposalId: string;

  beforeAll(async () => {
    if (launchpadEnabled()) {
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(launchpad.endpoint, faucet.address0, wallet);

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
          proposer: faucet.address0,
          initial_deposit: coins(25000000, "ustake"),
        },
      };
      const proposalMemo = "Test proposal for wasmd";
      const { accountNumber: proposalAccountNumber, sequence: proposalSequence } = await client.getSequence();
      const proposalSignDoc = makeSignDoc(
        [proposalMsg],
        defaultFee,
        chainId,
        proposalMemo,
        proposalAccountNumber,
        proposalSequence,
      );
      const { signature: proposalSignature } = await wallet.signAmino(faucet.address0, proposalSignDoc);
      const proposalTx = {
        msg: [proposalMsg],
        fee: defaultFee,
        memo: proposalMemo,
        signatures: [proposalSignature],
      };

      const proposalResult = await client.broadcastTx(proposalTx);
      assertIsBroadcastTxSuccess(proposalResult);
      proposalId = proposalResult.logs[0].events
        .find(({ type }) => type === "submit_proposal")!
        .attributes.find(({ key }) => key === "proposal_id")!.value;

      const voteMsg = {
        type: "cosmos-sdk/MsgVote",
        value: {
          proposal_id: proposalId,
          voter: faucet.address0,
          option: "Yes",
        },
      };
      const voteMemo = "Test vote for wasmd";
      const { accountNumber: voteAccountNumber, sequence: voteSequence } = await client.getSequence();
      const voteSignDoc = makeSignDoc(
        [voteMsg],
        defaultFee,
        chainId,
        voteMemo,
        voteAccountNumber,
        voteSequence,
      );
      const { signature: voteSignature } = await wallet.signAmino(faucet.address0, voteSignDoc);
      const voteTx = {
        msg: [voteMsg],
        fee: defaultFee,
        memo: voteMemo,
        signatures: [voteSignature],
      };
      await client.broadcastTx(voteTx);

      await sleep(75); // wait until transactions are indexed
    }
  });

  describe("parameters", () => {
    it("works for deposit", async () => {
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
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
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
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
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
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
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
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
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
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
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
      const response = await client.gov.proposer(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          proposal_id: proposalId,
          proposer: faucet.address0,
        },
      });
    });
  });

  describe("deposits", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
      const response = await client.gov.deposits(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            proposal_id: proposalId,
            depositor: faucet.address0,
            amount: [{ denom: "ustake", amount: "25000000" }],
          },
        ],
      });
    });
  });

  describe("deposit", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
      const response = await client.gov.deposit(proposalId, faucet.address0);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          proposal_id: proposalId,
          depositor: faucet.address0,
          amount: [{ denom: "ustake", amount: "25000000" }],
        },
      });
    });
  });

  describe("tally", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
      const response = await client.gov.tally(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          yes: jasmine.stringMatching(nonNegativeIntegerMatcher),
          abstain: jasmine.stringMatching(nonNegativeIntegerMatcher),
          no: jasmine.stringMatching(nonNegativeIntegerMatcher),
          no_with_veto: jasmine.stringMatching(nonNegativeIntegerMatcher),
        },
      });
    });
  });

  describe("votes", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
      const response = await client.gov.votes(proposalId);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: [
          {
            proposal_id: proposalId,
            voter: faucet.address0,
            option: "Yes",
          },
        ],
      });
    });
  });

  describe("vote", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const client = makeGovClient(launchpad.endpoint);
      const response = await client.gov.vote(proposalId, faucet.address0);
      expect(response).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        result: {
          voter: faucet.address0,
          proposal_id: proposalId,
          option: "Yes",
        },
      });
    });
  });
});

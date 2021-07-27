import { coins } from "@cosmjs/amino";
import { toAscii } from "@cosmjs/encoding";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert, sleep } from "@cosmjs/utils";
import { ProposalStatus, TextProposal, VoteOption } from "cosmjs-types/cosmos/gov/v1beta1/gov";
import { Any } from "cosmjs-types/google/protobuf/any";
import Long from "long";

import { MsgSubmitProposalEncodeObject, MsgVoteEncodeObject } from "../encodeobjects";
import { SigningStargateClient } from "../signingstargateclient";
import { assertIsBroadcastTxSuccess } from "../stargateclient";
import {
  defaultSigningClientOptions,
  faucet,
  nonNegativeIntegerMatcher,
  pendingWithoutSimapp,
  simapp,
  simappEnabled,
} from "../testutils.spec";
import { GovExtension, setupGovExtension } from "./gov";
import { QueryClient } from "./queryclient";
import { longify } from "./utils";

async function makeClientWithGov(rpcUrl: string): Promise<[QueryClient & GovExtension, Tendermint34Client]> {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupGovExtension), tmClient];
}

describe("GovExtension", () => {
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };
  const textProposal = TextProposal.fromPartial({
    title: "Test Proposal",
    description: "This proposal proposes to test whether this proposal passes",
  });
  const initialDeposit = coins(12300000, "ustake");
  let proposalId: string;

  beforeAll(async () => {
    if (simappEnabled()) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const [firstAccount] = await wallet.getAccounts();
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrl,
        wallet,
        defaultSigningClientOptions,
      );

      const proposalMsg: MsgSubmitProposalEncodeObject = {
        typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
        value: {
          content: Any.fromPartial({
            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
            value: Uint8Array.from(TextProposal.encode(textProposal).finish()),
          }),
          proposer: faucet.address0,
          initialDeposit: initialDeposit,
        },
      };
      const proposalResult = await client.signAndBroadcast(
        firstAccount.address,
        [proposalMsg],
        defaultFee,
        "Test proposal for simd",
      );
      assertIsBroadcastTxSuccess(proposalResult);
      const logs = JSON.parse(proposalResult.rawLog || "");
      proposalId = logs[0].events
        .find(({ type }: any) => type === "submit_proposal")
        .attributes.find(({ key }: any) => key === "proposal_id").value;
      assert(proposalId.match(nonNegativeIntegerMatcher));

      const voteMsg: MsgVoteEncodeObject = {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: {
          proposalId: longify(proposalId),
          voter: faucet.address0,
          option: VoteOption.VOTE_OPTION_YES,
        },
      };
      const voteMemo = "Test vote for simd";
      await client.signAndBroadcast(firstAccount.address, [voteMsg], defaultFee, voteMemo);

      await sleep(75); // wait until transactions are indexed
    }
  });

  describe("params", () => {
    it("works for deposit", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.params("deposit");
      expect(response).toEqual(
        jasmine.objectContaining({
          depositParams: {
            minDeposit: simapp.govMinDeposit,
            maxDepositPeriod: {
              seconds: Long.fromNumber(172800, false),
              nanos: 0,
            },
          },
        }),
      );

      tmClient.disconnect();
    });

    it("works for tallying", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.params("tallying");
      expect(response).toEqual(
        jasmine.objectContaining({
          tallyParams: {
            // Why the f*** are we getting binary values here?
            quorum: toAscii("334000000000000000"), // 0.334
            threshold: toAscii("500000000000000000"), // 0.5
            vetoThreshold: toAscii("334000000000000000"), // 0.334
          },
        }),
      );

      tmClient.disconnect();
    });

    it("works for voting", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.params("voting");
      expect(response).toEqual(
        jasmine.objectContaining({
          votingParams: {
            votingPeriod: {
              seconds: Long.fromNumber(172800, false),
              nanos: 0,
            },
          },
        }),
      );

      tmClient.disconnect();
    });
  });

  describe("proposals", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.proposals(
        ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
        faucet.address0,
        faucet.address0,
      );
      expect(response.proposals.length).toBeGreaterThanOrEqual(1);
      expect(response.proposals[response.proposals.length - 1]).toEqual({
        content: Any.fromPartial({
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: Uint8Array.from(TextProposal.encode(textProposal).finish()),
        }),
        proposalId: longify(proposalId),
        status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
        finalTallyResult: { yes: "0", abstain: "0", no: "0", noWithVeto: "0" },
        submitTime: jasmine.any(Date),
        depositEndTime: jasmine.any(Date),
        totalDeposit: initialDeposit,
        votingStartTime: jasmine.any(Date),
        votingEndTime: jasmine.any(Date),
      });

      tmClient.disconnect();
    });
  });

  describe("proposal", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.proposal(proposalId);
      expect(response.proposal).toEqual({
        content: Any.fromPartial({
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: Uint8Array.from(TextProposal.encode(textProposal).finish()),
        }),
        proposalId: longify(proposalId),
        status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
        finalTallyResult: { yes: "0", abstain: "0", no: "0", noWithVeto: "0" },
        submitTime: jasmine.any(Date),
        depositEndTime: jasmine.any(Date),
        totalDeposit: initialDeposit,
        votingStartTime: jasmine.any(Date),
        votingEndTime: jasmine.any(Date),
      });

      tmClient.disconnect();
    });
  });

  describe("deposits", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.deposits(proposalId);
      expect(response.deposits).toEqual([
        {
          proposalId: longify(proposalId),
          depositor: faucet.address0,
          amount: initialDeposit,
        },
      ]);

      tmClient.disconnect();
    });
  });

  describe("deposit", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.deposit(proposalId, faucet.address0);
      expect(response.deposit).toEqual({
        proposalId: longify(proposalId),
        depositor: faucet.address0,
        amount: initialDeposit,
      });

      tmClient.disconnect();
    });
  });

  describe("tally", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.tally(proposalId);
      expect(response.tally).toEqual({
        yes: "0",
        abstain: "0",
        no: "0",
        noWithVeto: "0",
      });

      tmClient.disconnect();
    });
  });

  describe("votes", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.votes(proposalId);
      expect(response.votes).toEqual([
        {
          proposalId: longify(proposalId),
          voter: faucet.address0,
          option: VoteOption.VOTE_OPTION_YES,
        },
      ]);

      tmClient.disconnect();
    });
  });

  describe("vote", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithGov(simapp.tendermintUrl);

      const response = await client.gov.vote(proposalId, faucet.address0);
      expect(response.vote).toEqual({
        voter: faucet.address0,
        proposalId: longify(proposalId),
        option: VoteOption.VOTE_OPTION_YES,
      });

      tmClient.disconnect();
    });
  });
});

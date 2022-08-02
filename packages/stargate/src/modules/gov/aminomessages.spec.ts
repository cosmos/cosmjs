/* eslint-disable @typescript-eslint/naming-convention */
import { TextProposal, VoteOption } from "cosmjs-types/cosmos/gov/v1beta1/gov";
import { MsgDeposit, MsgSubmitProposal, MsgVote, MsgVoteWeighted } from "cosmjs-types/cosmos/gov/v1beta1/tx";
import Long from "long";

import { AminoTypes } from "../../aminotypes";
import {
  AminoMsgDeposit,
  AminoMsgSubmitProposal,
  AminoMsgVote,
  AminoMsgVoteWeighted,
  createGovAminoConverters,
} from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgDeposit", () => {
      const msg: MsgDeposit = {
        amount: [{ amount: "12300000", denom: "ustake" }],
        depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        proposalId: Long.fromNumber(5),
      };
      const aminoTypes = new AminoTypes(createGovAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
        value: msg,
      });
      const expected: AminoMsgDeposit = {
        type: "cosmos-sdk/MsgDeposit",
        value: {
          amount: [{ amount: "12300000", denom: "ustake" }],
          depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          proposal_id: "5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgSubmitProposal", () => {
      const msg: MsgSubmitProposal = {
        initialDeposit: [{ amount: "12300000", denom: "ustake" }],
        proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        content: {
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode({
            description: "This proposal proposes to test whether this proposal passes",
            title: "Test Proposal",
          }).finish(),
        },
      };
      const aminoTypes = new AminoTypes(createGovAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
        value: msg,
      });
      const expected: AminoMsgSubmitProposal = {
        type: "cosmos-sdk/MsgSubmitProposal",
        value: {
          initial_deposit: [{ amount: "12300000", denom: "ustake" }],
          proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          content: {
            type: "cosmos-sdk/TextProposal",
            value: {
              description: "This proposal proposes to test whether this proposal passes",
              title: "Test Proposal",
            },
          },
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgVote", () => {
      const msg: MsgVote = {
        option: VoteOption.VOTE_OPTION_NO_WITH_VETO,
        proposalId: Long.fromNumber(5),
        voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoTypes = new AminoTypes(createGovAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: msg,
      });
      const expected: AminoMsgVote = {
        type: "cosmos-sdk/MsgVote",
        value: {
          option: 4,
          proposal_id: "5",
          voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgVoteWeighted", () => {
      const msg: MsgVoteWeighted = {
        proposalId: Long.fromNumber(5),
        voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        options: [
          { option: VoteOption.VOTE_OPTION_NO_WITH_VETO, weight: "700000000000000000" /* 0.7 */ },
          { option: VoteOption.VOTE_OPTION_NO, weight: "300000000000000000" /* 0.3 */ },
        ],
      };
      const aminoTypes = new AminoTypes(createGovAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.gov.v1beta1.MsgVoteWeighted",
        value: msg,
      });
      const expected: AminoMsgVoteWeighted = {
        type: "cosmos-sdk/MsgVoteWeighted",
        value: {
          proposal_id: "5",
          voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          options: [
            { option: VoteOption.VOTE_OPTION_NO_WITH_VETO, weight: "0.700000000000000000" },
            { option: VoteOption.VOTE_OPTION_NO, weight: "0.300000000000000000" },
          ],
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgDeposit", () => {
      const aminoMsg: AminoMsgDeposit = {
        type: "cosmos-sdk/MsgDeposit",
        value: {
          amount: [{ amount: "12300000", denom: "ustake" }],
          depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          proposal_id: "5",
        },
      };
      const msg = new AminoTypes(createGovAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgDeposit = {
        amount: [{ amount: "12300000", denom: "ustake" }],
        depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        proposalId: Long.fromNumber(5),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
        value: expectedValue,
      });
    });

    it("works for MsgSubmitProposal", () => {
      const aminoMsg: AminoMsgSubmitProposal = {
        type: "cosmos-sdk/MsgSubmitProposal",
        value: {
          initial_deposit: [{ amount: "12300000", denom: "ustake" }],
          proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          content: {
            type: "cosmos-sdk/TextProposal",
            value: {
              description: "This proposal proposes to test whether this proposal passes",
              title: "Test Proposal",
            },
          },
        },
      };
      const msg = new AminoTypes(createGovAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgSubmitProposal = {
        initialDeposit: [{ amount: "12300000", denom: "ustake" }],
        proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        content: {
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode({
            description: "This proposal proposes to test whether this proposal passes",
            title: "Test Proposal",
          }).finish(),
        },
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
        value: expectedValue,
      });
    });

    it("works for MsgVote", () => {
      const aminoMsg: AminoMsgVote = {
        type: "cosmos-sdk/MsgVote",
        value: {
          option: 4,
          proposal_id: "5",
          voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes(createGovAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgVote = {
        option: VoteOption.VOTE_OPTION_NO_WITH_VETO,
        proposalId: Long.fromNumber(5),
        voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: expectedValue,
      });
    });

    it("works for MsgVoteWeighted", () => {
      const aminoMsg: AminoMsgVoteWeighted = {
        type: "cosmos-sdk/MsgVoteWeighted",
        value: {
          proposal_id: "5",
          voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          options: [
            { option: 4, weight: "0.750000000000000000" },
            { option: 3, weight: "0.250000000000000000" },
          ],
        },
      };
      const msg = new AminoTypes(createGovAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgVoteWeighted = {
        proposalId: Long.fromNumber(5),
        voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        options: [
          { option: VoteOption.VOTE_OPTION_NO_WITH_VETO, weight: "750000000000000000" },
          { option: VoteOption.VOTE_OPTION_NO, weight: "250000000000000000" },
        ],
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.gov.v1beta1.MsgVoteWeighted",
        value: expectedValue,
      });
    });
  });
});

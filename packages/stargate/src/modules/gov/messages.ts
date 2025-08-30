import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import {
  MsgDeposit as V1MsgDeposit,
  MsgSubmitProposal as V1MsgSubmitProposal,
  MsgUpdateParams as V1MsgUpdateParams,
  MsgVote as V1MsgVote,
  MsgVoteWeighted as V1MsgVoteWeighted,
} from "cosmjs-types/cosmos/gov/v1/tx.js";
import {
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from "cosmjs-types/cosmos/gov/v1beta1/tx.js";

export const govTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.gov.v1.MsgDeposit", V1MsgDeposit],
  ["/cosmos.gov.v1.MsgSubmitProposal", V1MsgSubmitProposal],
  ["/cosmos.gov.v1.MsgUpdateParams", V1MsgUpdateParams],
  ["/cosmos.gov.v1.MsgVote", V1MsgVote],
  ["/cosmos.gov.v1.MsgVoteWeighted", V1MsgVoteWeighted],

  ["/cosmos.gov.v1beta1.MsgDeposit", MsgDeposit],
  ["/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal],
  ["/cosmos.gov.v1beta1.MsgVote", MsgVote],
  ["/cosmos.gov.v1beta1.MsgVoteWeighted", MsgVoteWeighted],
];

// There are no EncodeObject implementations for the new v1 message types because
// those things don't scale (https://github.com/cosmos/cosmjs/issues/1440). We need to
// address this more fundamentally. Users can use
// const msg = {
//   typeUrl: "/cosmos.gov.v1.MsgDeposit",
//   value: MsgDeposit.fromPartial({ ... })
// }
// in their app.

export interface MsgDepositEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.gov.v1beta1.MsgDeposit";
  readonly value: Partial<MsgDeposit>;
}

export function isMsgDepositEncodeObject(object: EncodeObject): object is MsgSubmitProposalEncodeObject {
  return (object as MsgDepositEncodeObject).typeUrl === "/cosmos.gov.v1beta1.MsgDeposit";
}

export interface MsgSubmitProposalEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal";
  readonly value: Partial<MsgSubmitProposal>;
}

export function isMsgSubmitProposalEncodeObject(
  object: EncodeObject,
): object is MsgSubmitProposalEncodeObject {
  return (object as MsgSubmitProposalEncodeObject).typeUrl === "/cosmos.gov.v1beta1.MsgSubmitProposal";
}

export interface MsgVoteEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.gov.v1beta1.MsgVote";
  readonly value: Partial<MsgVote>;
}

export function isMsgVoteEncodeObject(object: EncodeObject): object is MsgVoteEncodeObject {
  return (object as MsgVoteEncodeObject).typeUrl === "/cosmos.gov.v1beta1.MsgVote";
}

export interface MsgVoteWeightedEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.gov.v1beta1.MsgVoteWeighted";
  readonly value: Partial<MsgVoteWeighted>;
}

export function isMsgVoteWeightedEncodeObject(object: EncodeObject): object is MsgVoteWeightedEncodeObject {
  return (object as MsgVoteWeightedEncodeObject).typeUrl === "/cosmos.gov.v1beta1.MsgVoteWeighted";
}

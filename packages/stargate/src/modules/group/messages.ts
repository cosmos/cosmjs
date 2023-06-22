import { GeneratedType } from "@cosmjs/proto-signing";
import {
  MsgCreateGroup,
  MsgCreateGroupPolicy,
  MsgCreateGroupWithPolicy,
  MsgExec,
  MsgLeaveGroup,
  MsgSubmitProposal,
  MsgUpdateGroupAdmin,
  MsgUpdateGroupMembers,
  MsgUpdateGroupMetadata,
  MsgUpdateGroupPolicyAdmin,
  MsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyMetadata,
  MsgVote,
  MsgWithdrawProposal,
} from "cosmjs-types/cosmos/group/v1/tx";

export const groupTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.group.v1.MsgCreateGroup", MsgCreateGroup],
  ["/cosmos.group.v1.MsgCreateGroupPolicy", MsgCreateGroupPolicy],
  ["/cosmos.group.v1.MsgCreateGroupWithPolicy", MsgCreateGroupWithPolicy],
  ["/cosmos.group.v1.MsgExec", MsgExec],
  ["/cosmos.group.v1.MsgLeaveGroup", MsgLeaveGroup],
  ["/cosmos.group.v1.MsgSubmitProposal", MsgSubmitProposal],
  ["/cosmos.group.v1.MsgUpdateGroupAdmin", MsgUpdateGroupAdmin],
  ["/cosmos.group.v1.MsgUpdateGroupMembers", MsgUpdateGroupMembers],
  ["/cosmos.group.v1.MsgUpdateGroupMetadata", MsgUpdateGroupMetadata],
  ["/cosmos.group.v1.MsgUpdateGroupPolicyAdmin", MsgUpdateGroupPolicyAdmin],
  ["/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy", MsgUpdateGroupPolicyDecisionPolicy],
  ["/cosmos.group.v1.MsgUpdateGroupPolicyMetadata", MsgUpdateGroupPolicyMetadata],
  ["/cosmos.group.v1.MsgVote", MsgVote],
  ["/cosmos.group.v1.MsgWithdrawProposal", MsgWithdrawProposal],
];

// There are no EncodeObject implementations for the new v1 message types because
// those things don't scale (https://github.com/cosmos/cosmjs/issues/1440). We need to
// address this more fundamentally. Users can use
// const msg = {
//   typeUrl: "/cosmos.group.v1.MsgCreateGroup",
//   value: MsgCreateGroup.fromPartial({ ... })
// }
// in their app.

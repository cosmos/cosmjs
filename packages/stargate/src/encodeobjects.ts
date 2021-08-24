import { EncodeObject } from "@cosmjs/proto-signing";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { MsgDeposit, MsgSubmitProposal, MsgVote } from "cosmjs-types/cosmos/gov/v1beta1/tx";
import { MsgDelegate, MsgUndelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";

export interface MsgSendEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.bank.v1beta1.MsgSend";
  readonly value: Partial<MsgSend>;
}

export function isMsgSendEncodeObject(encodeObject: EncodeObject): encodeObject is MsgSendEncodeObject {
  return (encodeObject as MsgSendEncodeObject).typeUrl === "/cosmos.bank.v1beta1.MsgSend";
}

export interface MsgDelegateEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgDelegate";
  readonly value: Partial<MsgDelegate>;
}

export function isMsgDelegateEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgDelegateEncodeObject {
  return (encodeObject as MsgDelegateEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgDelegate";
}

export interface MsgUndelegateEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate";
  readonly value: Partial<MsgUndelegate>;
}

export function isMsgUndelegateEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgUndelegateEncodeObject {
  return (encodeObject as MsgUndelegateEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgUndelegate";
}

export interface MsgWithdrawDelegatorRewardEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
  readonly value: Partial<MsgWithdrawDelegatorReward>;
}

export function isMsgWithdrawDelegatorRewardEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgWithdrawDelegatorRewardEncodeObject {
  return (
    (encodeObject as MsgWithdrawDelegatorRewardEncodeObject).typeUrl ===
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
  );
}

export interface MsgTransferEncodeObject extends EncodeObject {
  readonly typeUrl: "/ibc.applications.transfer.v1.MsgTransfer";
  readonly value: Partial<MsgTransfer>;
}

export function isMsgTransferEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgTransferEncodeObject {
  return (encodeObject as MsgTransferEncodeObject).typeUrl === "/ibc.applications.transfer.v1.MsgTransfer";
}

export interface MsgDepositEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.gov.v1beta1.MsgDeposit";
  readonly value: Partial<MsgDeposit>;
}

export function isMsgDepositEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgSubmitProposalEncodeObject {
  return (encodeObject as MsgDepositEncodeObject).typeUrl === "/cosmos.gov.v1beta1.MsgDeposit";
}

export interface MsgSubmitProposalEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal";
  readonly value: Partial<MsgSubmitProposal>;
}

export function isMsgSubmitProposalEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgSubmitProposalEncodeObject {
  return (encodeObject as MsgSubmitProposalEncodeObject).typeUrl === "/cosmos.gov.v1beta1.MsgSubmitProposal";
}

export interface MsgVoteEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.gov.v1beta1.MsgVote";
  readonly value: Partial<MsgVote>;
}

export function isMsgVoteEncodeObject(encodeObject: EncodeObject): encodeObject is MsgVoteEncodeObject {
  return (encodeObject as MsgVoteEncodeObject).typeUrl === "/cosmos.gov.v1beta1.MsgVote";
}

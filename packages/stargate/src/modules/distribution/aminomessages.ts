/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "cosmjs-types/cosmos/distribution/v1beta1/tx";

import { AminoConverter } from "../..";

/** Changes the withdraw address for a delegator (or validator self-delegation) */
export interface AminoMsgSetWithdrawAddress extends AminoMsg {
  // NOTE: Type string and names diverge here!
  readonly type: "cosmos-sdk/MsgModifyWithdrawAddress";
  readonly value: {
    /** Bech32 account address */
    readonly delegator_address: string;
    /** Bech32 account address */
    readonly withdraw_address: string;
  };
}

export function isAminoMsgSetWithdrawAddress(msg: AminoMsg): msg is AminoMsgSetWithdrawAddress {
  // NOTE: Type string and names diverge here!
  return msg.type === "cosmos-sdk/MsgModifyWithdrawAddress";
}

/** Message for delegation withdraw from a single validator */
export interface AminoMsgWithdrawDelegatorReward extends AminoMsg {
  // NOTE: Type string and names diverge here!
  readonly type: "cosmos-sdk/MsgWithdrawDelegationReward";
  readonly value: {
    /** Bech32 account address */
    readonly delegator_address: string;
    /** Bech32 account address */
    readonly validator_address: string;
  };
}

export function isAminoMsgWithdrawDelegatorReward(msg: AminoMsg): msg is AminoMsgWithdrawDelegatorReward {
  // NOTE: Type string and names diverge here!
  return msg.type === "cosmos-sdk/MsgWithdrawDelegationReward";
}

/** Message for validator withdraw */
export interface AminoMsgWithdrawValidatorCommission extends AminoMsg {
  readonly type: "cosmos-sdk/MsgWithdrawValidatorCommission";
  readonly value: {
    /** Bech32 account address */
    readonly validator_address: string;
  };
}

export function isAminoMsgWithdrawValidatorCommission(
  msg: AminoMsg,
): msg is AminoMsgWithdrawValidatorCommission {
  return msg.type === "cosmos-sdk/MsgWithdrawValidatorCommission";
}

/** Allows an account to directly fund the community pool. */
export interface AminoMsgFundCommunityPool extends AminoMsg {
  readonly type: "cosmos-sdk/MsgFundCommunityPool";
  readonly value: {
    readonly amount: readonly Coin[];
    /** Bech32 account address */
    readonly depositor: string;
  };
}

export function isAminoMsgFundCommunityPool(msg: AminoMsg): msg is AminoMsgFundCommunityPool {
  return msg.type === "cosmos-sdk/MsgFundCommunityPool";
}

export function createDistributionAminoConverters(): Record<
  string,
  AminoConverter | "not_supported_by_chain"
> {
  return {
    "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
      aminoType: "cosmos-sdk/MsgFundCommunityPool",
      toAmino: ({ amount, depositor }: MsgFundCommunityPool): AminoMsgFundCommunityPool["value"] => ({
        amount: [...amount],
        depositor: depositor,
      }),
      fromAmino: ({ amount, depositor }: AminoMsgFundCommunityPool["value"]): MsgFundCommunityPool => ({
        amount: [...amount],
        depositor: depositor,
      }),
    },
    "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
      aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
      toAmino: ({
        delegatorAddress,
        withdrawAddress,
      }: MsgSetWithdrawAddress): AminoMsgSetWithdrawAddress["value"] => ({
        delegator_address: delegatorAddress,
        withdraw_address: withdrawAddress,
      }),
      fromAmino: ({
        delegator_address,
        withdraw_address,
      }: AminoMsgSetWithdrawAddress["value"]): MsgSetWithdrawAddress => ({
        delegatorAddress: delegator_address,
        withdrawAddress: withdraw_address,
      }),
    },
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
      aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
      toAmino: ({
        delegatorAddress,
        validatorAddress,
      }: MsgWithdrawDelegatorReward): AminoMsgWithdrawDelegatorReward["value"] => ({
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
      }),
      fromAmino: ({
        delegator_address,
        validator_address,
      }: AminoMsgWithdrawDelegatorReward["value"]): MsgWithdrawDelegatorReward => ({
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
      }),
    },
    "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
      aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
      toAmino: ({
        validatorAddress,
      }: MsgWithdrawValidatorCommission): AminoMsgWithdrawValidatorCommission["value"] => ({
        validator_address: validatorAddress,
      }),
      fromAmino: ({
        validator_address,
      }: AminoMsgWithdrawValidatorCommission["value"]): MsgWithdrawValidatorCommission => ({
        validatorAddress: validator_address,
      }),
    },
  };
}

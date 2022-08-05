/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";
import { MsgCreateVestingAccount } from "cosmjs-types/cosmos/vesting/v1beta1/tx";
import Long from "long";

import { AminoConverters } from "../../aminotypes";

export interface AminoMsgCreateVestingAccount extends AminoMsg {
  readonly type: "cosmos-sdk/MsgCreateVestingAccount";
  readonly value: {
    /** Bech32 account address */
    readonly from_address: string;
    /** Bech32 account address */
    readonly to_address: string;
    readonly amount: readonly Coin[];
    readonly end_time: string;
    readonly delayed: boolean;
  };
}

export function isAminoMsgCreateVestingAccount(msg: AminoMsg): msg is AminoMsgCreateVestingAccount {
  return msg.type === "cosmos-sdk/MsgCreateVestingAccount";
}

export function createVestingAminoConverters(): AminoConverters {
  return {
    "/cosmos.vesting.v1beta1.MsgCreateVestingAccount": {
      aminoType: "cosmos-sdk/MsgCreateVestingAccount",
      toAmino: ({
        fromAddress,
        toAddress,
        amount,
        endTime,
        delayed,
      }: MsgCreateVestingAccount): AminoMsgCreateVestingAccount["value"] => ({
        from_address: fromAddress,
        to_address: toAddress,
        amount: [...amount],
        end_time: endTime.toString(),
        delayed: delayed,
      }),
      fromAmino: ({
        from_address,
        to_address,
        amount,
        end_time,
        delayed,
      }: AminoMsgCreateVestingAccount["value"]): MsgCreateVestingAccount => ({
        fromAddress: from_address,
        toAddress: to_address,
        amount: [...amount],
        endTime: Long.fromString(end_time),
        delayed: delayed,
      }),
    },
  };
}

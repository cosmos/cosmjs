/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg } from "@cosmjs/amino";

import { AminoConverters } from "../../aminotypes";

// See https://github.com/cosmos/cosmos-sdk/blob/v0.45.1/proto/cosmos/slashing/v1beta1/tx.proto

/** Unjails a jailed validator */
export interface AminoMsgUnjail extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUnjail";
  readonly value: {
    /** Bech32 account address */
    readonly validator_addr: string;
  };
}

export function isAminoMsgUnjail(msg: AminoMsg): msg is AminoMsgUnjail {
  return msg.type === "cosmos-sdk/MsgUnjail";
}

export function createSlashingAminoConverters(): AminoConverters {
  throw new Error("Not implemented");
}

/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg } from "@cosmjs/amino";

import { AminoConverters } from "../../aminotypes";

// See https://github.com/cosmos/cosmos-sdk/blob/v0.45.1/proto/cosmos/evidence/v1beta1/tx.proto

interface Any {
  readonly type_url: string;
  readonly value: Uint8Array;
}

/** Supports submitting arbitrary evidence */
export interface AminoMsgSubmitEvidence extends AminoMsg {
  readonly type: "cosmos-sdk/MsgSubmitEvidence";
  readonly value: {
    /** Bech32 account address */
    readonly submitter: string;
    readonly evidence: Any;
  };
}

export function isAminoMsgSubmitEvidence(msg: AminoMsg): msg is AminoMsgSubmitEvidence {
  return msg.type === "cosmos-sdk/MsgSubmitEvidence";
}

export function createEvidenceAminoConverters(): AminoConverters {
  throw new Error("Not implemented");
}

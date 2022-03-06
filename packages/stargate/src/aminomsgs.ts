/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg } from "@cosmjs/amino";

// crisis - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/crisis/crisis.proto

/** Verifies a particular invariance */
export interface AminoMsgVerifyInvariant extends AminoMsg {
  readonly type: "cosmos-sdk/MsgVerifyInvariant";
  readonly value: {
    /** Bech32 account address */
    readonly sender: string;
    readonly invariant_module_name: string;
    readonly invariant_route: string;
  };
}

export function isAminoMsgVerifyInvariant(msg: AminoMsg): msg is AminoMsgVerifyInvariant {
  return msg.type === "cosmos-sdk/MsgVerifyInvariant";
}

// distribution - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/distribution/distribution.proto

// evidence - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/evidence/evidence.proto

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

// gov - https://github.com/cosmos/cosmos-sdk/blob/efa73c7edb31a7bd65786501da213b294f89267a/proto/cosmos/gov/gov.proto

// mint (no messages) - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/mint/mint.proto

// params (no messages) - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/params/params.proto

// slashing - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/slashing/slashing.proto

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

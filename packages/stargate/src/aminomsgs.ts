/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";

// auth (no messages) - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/auth/auth.proto

// bank - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/bank/bank.proto

/** A high level transaction of the coin module */
export interface AminoMsgSend extends AminoMsg {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: {
    /** Bech32 account address */
    readonly from_address: string;
    /** Bech32 account address */
    readonly to_address: string;
    readonly amount: readonly Coin[];
  };
}

export function isAminoMsgSend(msg: AminoMsg): msg is AminoMsgSend {
  return (msg as AminoMsgSend).type === "cosmos-sdk/MsgSend";
}

interface Input {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: readonly Coin[];
}

interface Output {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: readonly Coin[];
}

/** A high level transaction of the coin module */
export interface AminoMsgMultiSend extends AminoMsg {
  readonly type: "cosmos-sdk/MsgMultiSend";
  readonly value: {
    readonly inputs: readonly Input[];
    readonly outputs: readonly Output[];
  };
}

export function isAminoMsgMultiSend(msg: AminoMsg): msg is AminoMsgMultiSend {
  return (msg as AminoMsgMultiSend).type === "cosmos-sdk/MsgMultiSend";
}

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
  return (msg as AminoMsgVerifyInvariant).type === "cosmos-sdk/MsgVerifyInvariant";
}

// distribution - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/distribution/distribution.proto

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
  return (msg as AminoMsgSetWithdrawAddress).type === "cosmos-sdk/MsgModifyWithdrawAddress";
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
  return (msg as AminoMsgWithdrawDelegatorReward).type === "cosmos-sdk/MsgWithdrawDelegationReward";
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
  return (msg as AminoMsgWithdrawValidatorCommission).type === "cosmos-sdk/MsgWithdrawValidatorCommission";
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
  return (msg as AminoMsgFundCommunityPool).type === "cosmos-sdk/MsgFundCommunityPool";
}

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
  return (msg as AminoMsgSubmitEvidence).type === "cosmos-sdk/MsgSubmitEvidence";
}

// gov - https://github.com/cosmos/cosmos-sdk/blob/efa73c7edb31a7bd65786501da213b294f89267a/proto/cosmos/gov/gov.proto

/** Supports submitting arbitrary proposal content. */
export interface AminoMsgSubmitProposal extends AminoMsg {
  readonly type: "cosmos-sdk/MsgSubmitProposal";
  readonly value: {
    readonly content: Any;
    readonly initial_deposit: readonly Coin[];
    /** Bech32 account address */
    readonly proposer: string;
  };
}

export function isAminoMsgSubmitProposal(msg: AminoMsg): msg is AminoMsgSubmitProposal {
  return (msg as AminoMsgSubmitProposal).type === "cosmos-sdk/MsgSubmitProposal";
}

enum VoteOption {
  VoteOptionUnspecified,
  VoteOptionYes,
  VoteOptionAbstain,
  VoteOptionNo,
  VoteOptionNoWithVeto,
}

/** Casts a vote */
export interface AminoMsgVote extends AminoMsg {
  readonly type: "cosmos-sdk/MsgVote";
  readonly value: {
    readonly proposal_id: number;
    /** Bech32 account address */
    readonly voter: string;
    readonly option: VoteOption;
  };
}

export function isAminoMsgVote(msg: AminoMsg): msg is AminoMsgVote {
  return (msg as AminoMsgVote).type === "cosmos-sdk/MsgVote";
}

/** Submits a deposit to an existing proposal */
export interface AminoMsgDeposit extends AminoMsg {
  readonly type: "cosmos-sdk/MsgDeposit";
  readonly value: {
    readonly proposal_id: number;
    /** Bech32 account address */
    readonly depositor: string;
    readonly amount: readonly Coin[];
  };
}

export function isAminoMsgDeposit(msg: AminoMsg): msg is AminoMsgDeposit {
  return (msg as AminoMsgDeposit).type === "cosmos-sdk/MsgDeposit";
}

// ibc

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
  return (msg as AminoMsgUnjail).type === "cosmos-sdk/MsgUnjail";
}

// staking - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/staking/staking.proto

/** The initial commission rates to be used for creating a validator */
interface CommissionRates {
  readonly rate: string;
  readonly max_rate: string;
  readonly max_change_rate: string;
}

/** A validator description. */
interface Description {
  readonly moniker: string;
  readonly identity: string;
  readonly website: string;
  readonly security_contact: string;
  readonly details: string;
}

/** Creates a new validator. */
export interface AminoMsgCreateValidator extends AminoMsg {
  readonly type: "cosmos-sdk/MsgCreateValidator";
  readonly value: {
    readonly description: Description;
    readonly commission: CommissionRates;
    readonly min_self_delegation: string;
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    /** Bech32 encoded public key */
    readonly pubkey: string;
    readonly value: Coin;
  };
}

export function isAminoMsgCreateValidator(msg: AminoMsg): msg is AminoMsgCreateValidator {
  return (msg as AminoMsgCreateValidator).type === "cosmos-sdk/MsgCreateValidator";
}

/** Edits an existing validator. */
export interface AminoMsgEditValidator extends AminoMsg {
  readonly type: "cosmos-sdk/MsgEditValidator";
  readonly value: {
    readonly description: Description;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly commission_rate: string;
    readonly min_self_delegation: string;
  };
}

export function isAminoMsgEditValidator(msg: AminoMsg): msg is AminoMsgEditValidator {
  return (msg as AminoMsgEditValidator).type === "cosmos-sdk/MsgEditValidator";
}

/**
 * Performs a delegation from a delegate to a validator.
 *
 * @see https://docs.cosmos.network/master/modules/staking/03_messages.html#msgdelegate
 */
export interface AminoMsgDelegate extends AminoMsg {
  readonly type: "cosmos-sdk/MsgDelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly amount: Coin;
  };
}

export function isAminoMsgDelegate(msg: AminoMsg): msg is AminoMsgDelegate {
  return (msg as AminoMsgDelegate).type === "cosmos-sdk/MsgDelegate";
}

/** Performs a redelegation from a delegate and source validator to a destination validator */
export interface AminoMsgBeginRedelegate extends AminoMsg {
  readonly type: "cosmos-sdk/MsgBeginRedelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded source validator address */
    readonly validator_src_address: string;
    /** Bech32 encoded destination validator address */
    readonly validator_dst_address: string;
    readonly amount: Coin;
  };
}

export function isAminoMsgBeginRedelegate(msg: AminoMsg): msg is AminoMsgBeginRedelegate {
  return (msg as AminoMsgBeginRedelegate).type === "cosmos-sdk/MsgBeginRedelegate";
}

/** Performs an undelegation from a delegate and a validator */
export interface AminoMsgUndelegate extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUndelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly amount: Coin;
  };
}

export function isAminoMsgUndelegate(msg: AminoMsg): msg is AminoMsgUndelegate {
  return (msg as AminoMsgUndelegate).type === "cosmos-sdk/MsgUndelegate";
}

// upgrade (no messages) - see https://github.com/cosmos/cosmos-sdk/blob/efa73c7/proto/cosmos/upgrade/upgrade.proto

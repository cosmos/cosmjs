import { Coin } from "./coins";
export interface Msg {
  readonly type: string;
  readonly value: any;
}
/** A high level transaction of the coin module */
export interface MsgSend extends Msg {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: {
    /** Bech32 account address */
    readonly from_address: string;
    /** Bech32 account address */
    readonly to_address: string;
    readonly amount: readonly Coin[];
  };
}
export declare function isMsgSend(msg: Msg): msg is MsgSend;
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
export interface MsgMultiSend extends Msg {
  readonly type: "cosmos-sdk/MsgMultiSend";
  readonly value: {
    readonly inputs: readonly Input[];
    readonly outputs: readonly Output[];
  };
}
export declare function isMsgMultiSend(msg: Msg): msg is MsgMultiSend;
/** Verifies a particular invariance */
export interface MsgVerifyInvariant extends Msg {
  readonly type: "cosmos-sdk/MsgVerifyInvariant";
  readonly value: {
    /** Bech32 account address */
    readonly sender: string;
    readonly invariant_module_name: string;
    readonly invariant_route: string;
  };
}
export declare function isMsgVerifyInvariant(msg: Msg): msg is MsgVerifyInvariant;
/** Changes the withdraw address for a delegator (or validator self-delegation) */
export interface MsgSetWithdrawAddress extends Msg {
  readonly type: "cosmos-sdk/MsgSetWithdrawAddress";
  readonly value: {
    /** Bech32 account address */
    readonly delegator_address: string;
    /** Bech32 account address */
    readonly withdraw_address: string;
  };
}
export declare function isMsgSetWithdrawAddress(msg: Msg): msg is MsgSetWithdrawAddress;
/** Message for delegation withdraw from a single validator */
export interface MsgWithdrawDelegatorReward extends Msg {
  readonly type: "cosmos-sdk/MsgWithdrawDelegatorReward";
  readonly value: {
    /** Bech32 account address */
    readonly delegator_address: string;
    /** Bech32 account address */
    readonly validator_address: string;
  };
}
export declare function isMsgWithdrawDelegatorReward(msg: Msg): msg is MsgWithdrawDelegatorReward;
/** Message for validator withdraw */
export interface MsgWithdrawValidatorCommission extends Msg {
  readonly type: "cosmos-sdk/MsgWithdrawValidatorCommission";
  readonly value: {
    /** Bech32 account address */
    readonly validator_address: string;
  };
}
export declare function isMsgWithdrawValidatorCommission(msg: Msg): msg is MsgWithdrawValidatorCommission;
/** Allows an account to directly fund the community pool. */
export interface MsgFundCommunityPool extends Msg {
  readonly type: "cosmos-sdk/MsgFundCommunityPool";
  readonly value: {
    readonly amount: readonly Coin[];
    /** Bech32 account address */
    readonly depositor: string;
  };
}
export declare function isMsgFundCommunityPool(msg: Msg): msg is MsgFundCommunityPool;
interface Any {
  readonly type_url: string;
  readonly value: Uint8Array;
}
/** Supports submitting arbitrary evidence */
export interface MsgSubmitEvidence extends Msg {
  readonly type: "cosmos-sdk/MsgSubmitEvidence";
  readonly value: {
    /** Bech32 account address */
    readonly submitter: string;
    readonly evidence: Any;
  };
}
export declare function isMsgSubmitEvidence(msg: Msg): msg is MsgSubmitEvidence;
/** Supports submitting arbitrary proposal content. */
export interface MsgSubmitProposal extends Msg {
  readonly type: "cosmos-sdk/MsgSubmitProposal";
  readonly value: {
    readonly content: Any;
    readonly initial_deposit: readonly Coin[];
    /** Bech32 account address */
    readonly proposer: string;
  };
}
export declare function isMsgSubmitProposal(msg: Msg): msg is MsgSubmitProposal;
declare enum VoteOption {
  VoteOptionUnspecified = 0,
  VoteOptionYes = 1,
  VoteOptionAbstain = 2,
  VoteOptionNo = 3,
  VoteOptionNoWithVeto = 4,
}
/** Casts a vote */
export interface MsgVote extends Msg {
  readonly type: "cosmos-sdk/MsgVote";
  readonly value: {
    readonly proposal_id: number;
    /** Bech32 account address */
    readonly voter: string;
    readonly option: VoteOption;
  };
}
export declare function isMsgVote(msg: Msg): msg is MsgVote;
/** Submits a deposit to an existing proposal */
export interface MsgDeposit extends Msg {
  readonly type: "cosmos-sdk/MsgDeposit";
  readonly value: {
    readonly proposal_id: number;
    /** Bech32 account address */
    readonly depositor: string;
    readonly amount: readonly Coin[];
  };
}
export declare function isMsgDeposit(msg: Msg): msg is MsgDeposit;
/** Unjails a jailed validator */
export interface MsgUnjail extends Msg {
  readonly type: "cosmos-sdk/MsgUnjail";
  readonly value: {
    /** Bech32 account address */
    readonly validator_addr: string;
  };
}
export declare function isMsgUnjail(msg: Msg): msg is MsgUnjail;
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
export interface MsgCreateValidator extends Msg {
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
export declare function isMsgCreateValidator(msg: Msg): msg is MsgCreateValidator;
/** Edits an existing validator. */
export interface MsgEditValidator extends Msg {
  readonly type: "cosmos-sdk/MsgEditValidator";
  readonly value: {
    readonly description: Description;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly commission_rate: string;
    readonly min_self_delegation: string;
  };
}
export declare function isMsgEditValidator(msg: Msg): msg is MsgEditValidator;
/**
 * Performs a delegation from a delegate to a validator.
 *
 * @see https://docs.cosmos.network/master/modules/staking/03_messages.html#msgdelegate
 */
export interface MsgDelegate extends Msg {
  readonly type: "cosmos-sdk/MsgDelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly amount: Coin;
  };
}
export declare function isMsgDelegate(msg: Msg): msg is MsgDelegate;
/** Performs a redelegation from a delegate and source validator to a destination validator */
export interface MsgBeginRedelegate extends Msg {
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
export declare function isMsgBeginRedelegate(msg: Msg): msg is MsgBeginRedelegate;
/** Performs an undelegation from a delegate and a validator */
export interface MsgUndelegate extends Msg {
  readonly type: "cosmos-sdk/MsgUndelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly amount: Coin;
  };
}
export declare function isMsgUndelegate(msg: Msg): msg is MsgUndelegate;
export {};

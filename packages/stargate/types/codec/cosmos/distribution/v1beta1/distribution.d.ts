import Long from "long";
import { DecCoin, Coin } from "../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.distribution.v1beta1";
/** Params defines the set of params for the distribution module. */
export interface Params {
  communityTax: string;
  baseProposerReward: string;
  bonusProposerReward: string;
  withdrawAddrEnabled: boolean;
}
/**
 * ValidatorHistoricalRewards represents historical rewards for a validator.
 * Height is implicit within the store key.
 * Cumulative reward ratio is the sum from the zeroeth period
 * until this period of rewards / tokens, per the spec.
 * The reference count indicates the number of objects
 * which might need to reference this historical entry at any point.
 * ReferenceCount =
 *    number of outstanding delegations which ended the associated period (and
 *    might need to read that record)
 *  + number of slashes which ended the associated period (and might need to
 *  read that record)
 *  + one per validator for the zeroeth period, set on initialization
 */
export interface ValidatorHistoricalRewards {
  cumulativeRewardRatio: DecCoin[];
  referenceCount: number;
}
/**
 * ValidatorCurrentRewards represents current rewards and current
 * period for a validator kept as a running counter and incremented
 * each block as long as the validator's tokens remain constant.
 */
export interface ValidatorCurrentRewards {
  rewards: DecCoin[];
  period: Long;
}
/**
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 */
export interface ValidatorAccumulatedCommission {
  commission: DecCoin[];
}
/**
 * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a validator inexpensive to track, allows simple sanity checks.
 */
export interface ValidatorOutstandingRewards {
  rewards: DecCoin[];
}
/**
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 */
export interface ValidatorSlashEvent {
  validatorPeriod: Long;
  fraction: string;
}
/** ValidatorSlashEvents is a collection of ValidatorSlashEvent messages. */
export interface ValidatorSlashEvents {
  validatorSlashEvents: ValidatorSlashEvent[];
}
/** FeePool is the global fee pool for distribution. */
export interface FeePool {
  communityPool: DecCoin[];
}
/**
 * CommunityPoolSpendProposal details a proposal for use of community funds,
 * together with how many coins are proposed to be spent, and to which
 * recipient account.
 */
export interface CommunityPoolSpendProposal {
  title: string;
  description: string;
  recipient: string;
  amount: Coin[];
}
/**
 * DelegatorStartingInfo represents the starting info for a delegator reward
 * period. It tracks the previous validator period, the delegation's amount of
 * staking token, and the creation height (to check later on if any slashes have
 * occurred). NOTE: Even though validators are slashed to whole staking tokens,
 * the delegators within the validator may be left with less than a full token,
 * thus sdk.Dec is used.
 */
export interface DelegatorStartingInfo {
  previousPeriod: Long;
  stake: string;
  height: Long;
}
/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 */
export interface DelegationDelegatorReward {
  validatorAddress: string;
  reward: DecCoin[];
}
/**
 * CommunityPoolSpendProposalWithDeposit defines a CommunityPoolSpendProposal
 * with a deposit
 */
export interface CommunityPoolSpendProposalWithDeposit {
  title: string;
  description: string;
  recipient: string;
  amount: string;
  deposit: string;
}
export declare const Params: {
  encode(message: Params, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Params;
  fromJSON(object: any): Params;
  fromPartial(object: DeepPartial<Params>): Params;
  toJSON(message: Params): unknown;
};
export declare const ValidatorHistoricalRewards: {
  encode(message: ValidatorHistoricalRewards, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorHistoricalRewards;
  fromJSON(object: any): ValidatorHistoricalRewards;
  fromPartial(object: DeepPartial<ValidatorHistoricalRewards>): ValidatorHistoricalRewards;
  toJSON(message: ValidatorHistoricalRewards): unknown;
};
export declare const ValidatorCurrentRewards: {
  encode(message: ValidatorCurrentRewards, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorCurrentRewards;
  fromJSON(object: any): ValidatorCurrentRewards;
  fromPartial(object: DeepPartial<ValidatorCurrentRewards>): ValidatorCurrentRewards;
  toJSON(message: ValidatorCurrentRewards): unknown;
};
export declare const ValidatorAccumulatedCommission: {
  encode(message: ValidatorAccumulatedCommission, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorAccumulatedCommission;
  fromJSON(object: any): ValidatorAccumulatedCommission;
  fromPartial(object: DeepPartial<ValidatorAccumulatedCommission>): ValidatorAccumulatedCommission;
  toJSON(message: ValidatorAccumulatedCommission): unknown;
};
export declare const ValidatorOutstandingRewards: {
  encode(message: ValidatorOutstandingRewards, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorOutstandingRewards;
  fromJSON(object: any): ValidatorOutstandingRewards;
  fromPartial(object: DeepPartial<ValidatorOutstandingRewards>): ValidatorOutstandingRewards;
  toJSON(message: ValidatorOutstandingRewards): unknown;
};
export declare const ValidatorSlashEvent: {
  encode(message: ValidatorSlashEvent, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorSlashEvent;
  fromJSON(object: any): ValidatorSlashEvent;
  fromPartial(object: DeepPartial<ValidatorSlashEvent>): ValidatorSlashEvent;
  toJSON(message: ValidatorSlashEvent): unknown;
};
export declare const ValidatorSlashEvents: {
  encode(message: ValidatorSlashEvents, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorSlashEvents;
  fromJSON(object: any): ValidatorSlashEvents;
  fromPartial(object: DeepPartial<ValidatorSlashEvents>): ValidatorSlashEvents;
  toJSON(message: ValidatorSlashEvents): unknown;
};
export declare const FeePool: {
  encode(message: FeePool, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FeePool;
  fromJSON(object: any): FeePool;
  fromPartial(object: DeepPartial<FeePool>): FeePool;
  toJSON(message: FeePool): unknown;
};
export declare const CommunityPoolSpendProposal: {
  encode(message: CommunityPoolSpendProposal, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CommunityPoolSpendProposal;
  fromJSON(object: any): CommunityPoolSpendProposal;
  fromPartial(object: DeepPartial<CommunityPoolSpendProposal>): CommunityPoolSpendProposal;
  toJSON(message: CommunityPoolSpendProposal): unknown;
};
export declare const DelegatorStartingInfo: {
  encode(message: DelegatorStartingInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DelegatorStartingInfo;
  fromJSON(object: any): DelegatorStartingInfo;
  fromPartial(object: DeepPartial<DelegatorStartingInfo>): DelegatorStartingInfo;
  toJSON(message: DelegatorStartingInfo): unknown;
};
export declare const DelegationDelegatorReward: {
  encode(message: DelegationDelegatorReward, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DelegationDelegatorReward;
  fromJSON(object: any): DelegationDelegatorReward;
  fromPartial(object: DeepPartial<DelegationDelegatorReward>): DelegationDelegatorReward;
  toJSON(message: DelegationDelegatorReward): unknown;
};
export declare const CommunityPoolSpendProposalWithDeposit: {
  encode(message: CommunityPoolSpendProposalWithDeposit, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CommunityPoolSpendProposalWithDeposit;
  fromJSON(object: any): CommunityPoolSpendProposalWithDeposit;
  fromPartial(
    object: DeepPartial<CommunityPoolSpendProposalWithDeposit>,
  ): CommunityPoolSpendProposalWithDeposit;
  toJSON(message: CommunityPoolSpendProposalWithDeposit): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : Partial<T>;
export {};

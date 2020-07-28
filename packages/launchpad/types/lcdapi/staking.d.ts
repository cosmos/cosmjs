import { Coin } from "../coins";
import { BlockHeader, SearchTxsResponse } from "./base";
import { LcdClient } from "./lcdclient";
/**
 * Numeric bonding status
 *
 * @see https://github.com/cosmos/cosmos-sdk/blob/v0.38.5/types/staking.go#L43-L49
 */
export declare enum BondStatus {
  Unbonded = 0,
  Unbonding = 1,
  Bonded = 2,
}
interface Validator {
  readonly operator_address: string;
  readonly consensus_pubkey: string;
  readonly jailed: boolean;
  readonly status: BondStatus;
  readonly tokens: string;
  readonly delegator_shares: string;
  readonly description: {
    readonly moniker: string;
    readonly identity: string;
    readonly website: string;
    readonly security_contact: string;
    readonly details: string;
  };
  readonly unbonding_height: string;
  readonly unbonding_time: string;
  readonly commission: {
    readonly commission_rates: {
      readonly rate: string;
      readonly max_rate: string;
      readonly max_change_rate: string;
    };
    readonly update_time: string;
  };
  readonly min_self_delegation: string;
}
interface Delegation {
  readonly delegator_address: string;
  readonly validator_address: string;
  readonly shares: string;
  readonly balance: Coin;
}
export interface StakingDelegatorDelegationsResponse {
  readonly height: string;
  readonly result: readonly Delegation[];
}
interface UnbondingDelegationEntry {
  readonly creation_height: string;
  readonly completion_time: string;
  readonly initial_balance: string;
  readonly balance: string;
}
interface UnbondingDelegation {
  readonly delegator_address: string;
  readonly validator_address: string;
  readonly entries: readonly UnbondingDelegationEntry[];
}
export interface StakingDelegatorUnbondingDelegationsResponse {
  readonly height: string;
  readonly result: readonly UnbondingDelegation[];
}
export declare type StakingDelegatorTransactionsResponse = readonly SearchTxsResponse[];
export interface StakingDelegatorValidatorsResponse {
  readonly height: string;
  readonly result: readonly Validator[];
}
export interface StakingDelegatorValidatorResponse {
  readonly height: string;
  readonly result: Validator;
}
export interface StakingDelegationResponse {
  readonly height: string;
  readonly result: Delegation;
}
export interface StakingUnbondingDelegationResponse {
  readonly height: string;
  readonly result: UnbondingDelegation | null;
}
interface RedelegationEntry {
  readonly creation_height: string;
  readonly completion_time: string;
  readonly initial_balance: Coin;
  readonly shares_dst: string;
}
interface Redelegation {
  readonly delegator_address: string;
  readonly validator_src_address: string;
  readonly validator_dst_address: string;
  readonly entries: readonly RedelegationEntry[];
}
export interface StakingRedelegationsResponse {
  readonly height: string;
  readonly result: readonly Redelegation[];
}
export interface StakingValidatorsParams {
  /** @see https://github.com/cosmos/cosmos-sdk/blob/v0.38.5/types/staking.go#L43-L49 */
  readonly status?: "bonded" | "unbonded" | "unbonding";
  readonly page?: number;
  readonly limit?: number;
}
export interface StakingValidatorsResponse {
  readonly height: string;
  readonly result: readonly Validator[];
}
export interface StakingValidatorResponse {
  readonly height: string;
  readonly result: Validator;
}
export interface StakingValidatorDelegationsResponse {
  readonly height: string;
  readonly result: readonly Delegation[];
}
export interface StakingValidatorUnbondingDelegationsResponse {
  readonly height: string;
  readonly result: readonly UnbondingDelegation[];
}
interface HistoricalInfo {
  readonly header: BlockHeader;
  readonly validators: readonly Validator[];
}
export interface StakingHistoricalInfoResponse {
  readonly height: string;
  readonly result: HistoricalInfo;
}
export interface StakingPoolResponse {
  readonly height: string;
  readonly result: {
    readonly not_bonded_tokens: string;
    readonly bonded_tokens: string;
  };
}
export interface StakingParametersResponse {
  readonly height: string;
  readonly result: {
    readonly unbonding_time: string;
    readonly max_validators: number;
    readonly max_entries: number;
    readonly historical_entries: number;
    readonly bond_denom: string;
  };
}
export interface StakingExtension {
  readonly staking: {
    /** Get all delegations from a delegator */
    readonly delegatorDelegations: (delegatorAddress: string) => Promise<StakingDelegatorDelegationsResponse>;
    /** Get all unbonding delegations from a delegator */
    readonly delegatorUnbondingDelegations: (
      delegatorAddress: string,
    ) => Promise<StakingDelegatorUnbondingDelegationsResponse>;
    /** Get all staking txs (i.e msgs) from a delegator */
    readonly delegatorTransactions: (
      delegatorAddress: string,
    ) => Promise<StakingDelegatorTransactionsResponse>;
    /** Query all validators that a delegator is bonded to */
    readonly delegatorValidators: (delegatorAddress: string) => Promise<StakingDelegatorValidatorsResponse>;
    /** Query a validator that a delegator is bonded to */
    readonly delegatorValidator: (
      delegatorAddress: string,
      validatorAddress: string,
    ) => Promise<StakingDelegatorValidatorResponse>;
    /** Query a delegation between a delegator and a validator */
    readonly delegation: (
      delegatorAddress: string,
      validatorAddress: string,
    ) => Promise<StakingDelegationResponse>;
    /** Query all unbonding delegations between a delegator and a validator */
    readonly unbondingDelegation: (
      delegatorAddress: string,
      validatorAddress: string,
    ) => Promise<StakingUnbondingDelegationResponse>;
    /** Query redelegations (filters in query params) */
    readonly redelegations: () => Promise<StakingRedelegationsResponse>;
    /** Get all validators */
    readonly validators: (options?: StakingValidatorsParams) => Promise<StakingValidatorsResponse>;
    /** Get a single validator info */
    readonly validator: (validatorAddress: string) => Promise<StakingValidatorResponse>;
    readonly validatorDelegations: (validatorAddress: string) => Promise<StakingValidatorDelegationsResponse>;
    /** Get all unbonding delegations from a validator */
    readonly validatorUnbondingDelegations: (
      validatorAddress: string,
    ) => Promise<StakingValidatorUnbondingDelegationsResponse>;
    /** Get HistoricalInfo at a given height */
    readonly historicalInfo: (height: string) => Promise<StakingHistoricalInfoResponse>;
    /** Get the current state of the staking pool */
    readonly pool: () => Promise<StakingPoolResponse>;
    /** Get the current staking parameter values */
    readonly parameters: () => Promise<StakingParametersResponse>;
  };
}
export declare function setupStakingExtension(base: LcdClient): StakingExtension;
export {};

import { cosmos } from "../codec";
import { QueryClient } from "./queryclient";
declare type IQueryDelegationResponse = cosmos.staking.v1beta1.IQueryDelegationResponse;
declare type IQueryDelegatorDelegationsResponse = cosmos.staking.v1beta1.IQueryDelegatorDelegationsResponse;
declare type IQueryDelegatorUnbondingDelegationsResponse = cosmos.staking.v1beta1.IQueryDelegatorUnbondingDelegationsResponse;
declare type IQueryDelegatorValidatorResponse = cosmos.staking.v1beta1.IQueryDelegatorValidatorResponse;
declare type IQueryDelegatorValidatorsResponse = cosmos.staking.v1beta1.IQueryDelegatorValidatorsResponse;
declare type IQueryHistoricalInfoResponse = cosmos.staking.v1beta1.IQueryHistoricalInfoResponse;
declare type IQueryParamsResponse = cosmos.staking.v1beta1.IQueryParamsResponse;
declare type IQueryPoolResponse = cosmos.staking.v1beta1.IQueryPoolResponse;
declare type IQueryRedelegationsResponse = cosmos.staking.v1beta1.IQueryRedelegationsResponse;
declare type IQueryUnbondingDelegationResponse = cosmos.staking.v1beta1.IQueryUnbondingDelegationResponse;
declare type IQueryValidatorResponse = cosmos.staking.v1beta1.IQueryValidatorResponse;
declare type IQueryValidatorDelegationsResponse = cosmos.staking.v1beta1.IQueryValidatorDelegationsResponse;
declare type IQueryValidatorsResponse = cosmos.staking.v1beta1.IQueryValidatorsResponse;
declare type IQueryValidatorUnbondingDelegationsResponse = cosmos.staking.v1beta1.IQueryValidatorUnbondingDelegationsResponse;
export interface StakingExtension {
  readonly staking: {
    readonly unverified: {
      delegation: (delegatorAddress: string, validatorAddress: string) => Promise<IQueryDelegationResponse>;
      delegatorDelegations: (
        delegatorAddress: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryDelegatorDelegationsResponse>;
      delegatorUnbondingDelegations: (
        delegatorAddress: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryDelegatorUnbondingDelegationsResponse>;
      delegatorValidator: (
        delegatorAddress: string,
        validatorAddress: string,
      ) => Promise<IQueryDelegatorValidatorResponse>;
      delegatorValidators: (
        delegatorAddress: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryDelegatorValidatorsResponse>;
      historicalInfo: (height: number) => Promise<IQueryHistoricalInfoResponse>;
      params: () => Promise<IQueryParamsResponse>;
      pool: () => Promise<IQueryPoolResponse>;
      redelegations: (
        delegatorAddress: string,
        sourceValidatorAddress: string,
        destinationValidatorAddress: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryRedelegationsResponse>;
      unbondingDelegation: (
        delegatorAddress: string,
        validatorAddress: string,
      ) => Promise<IQueryUnbondingDelegationResponse>;
      validator: (validatorAddress: string) => Promise<IQueryValidatorResponse>;
      validatorDelegations: (
        validatorAddress: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryValidatorDelegationsResponse>;
      validators: (status: string, paginationKey?: Uint8Array) => Promise<IQueryValidatorsResponse>;
      validatorUnbondingDelegations: (
        validatorAddress: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryValidatorUnbondingDelegationsResponse>;
    };
  };
}
export declare function setupStakingExtension(base: QueryClient): StakingExtension;
export {};

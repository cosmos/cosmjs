import { cosmos } from "../codec";
import { QueryClient } from "./queryclient";
declare type IQueryCommunityPoolResponse = cosmos.distribution.v1beta1.IQueryCommunityPoolResponse;
declare type IQueryDelegationRewardsResponse = cosmos.distribution.v1beta1.IQueryDelegationRewardsResponse;
declare type IQueryDelegationTotalRewardsResponse = cosmos.distribution.v1beta1.IQueryDelegationTotalRewardsResponse;
declare type IQueryDelegatorValidatorsResponse = cosmos.distribution.v1beta1.IQueryDelegatorValidatorsResponse;
declare type IQueryDelegatorWithdrawAddressResponse = cosmos.distribution.v1beta1.IQueryDelegatorWithdrawAddressResponse;
declare type IQueryParamsResponse = cosmos.distribution.v1beta1.IQueryParamsResponse;
declare type IQueryValidatorCommissionResponse = cosmos.distribution.v1beta1.IQueryValidatorCommissionResponse;
declare type IQueryValidatorOutstandingRewardsResponse = cosmos.distribution.v1beta1.IQueryValidatorOutstandingRewardsResponse;
declare type IQueryValidatorSlashesResponse = cosmos.distribution.v1beta1.IQueryValidatorSlashesResponse;
export interface DistributionExtension {
  readonly distribution: {
    unverified: {
      communityPool: () => Promise<IQueryCommunityPoolResponse>;
      delegationRewards: (
        delegatorAddress: string,
        validatorAddress: string,
      ) => Promise<IQueryDelegationRewardsResponse>;
      delegationTotalRewards: (delegatorAddress: string) => Promise<IQueryDelegationTotalRewardsResponse>;
      delegatorValidators: (delegatorAddress: string) => Promise<IQueryDelegatorValidatorsResponse>;
      delegatorWithdrawAddress: (delegatorAddress: string) => Promise<IQueryDelegatorWithdrawAddressResponse>;
      params: () => Promise<IQueryParamsResponse>;
      validatorCommission: (validatorAddress: string) => Promise<IQueryValidatorCommissionResponse>;
      validatorOutstandingRewards: (
        validatorAddress: string,
      ) => Promise<IQueryValidatorOutstandingRewardsResponse>;
      validatorSlashes: (
        validatorAddress: string,
        startingHeight: number,
        endingHeight: number,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryValidatorSlashesResponse>;
    };
  };
}
export declare function setupDistributionExtension(base: QueryClient): DistributionExtension;
export {};

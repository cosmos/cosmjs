/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";

import { cosmos } from "../codec";
import { QueryClient } from "./queryclient";
import { toObject } from "./utils";

type IQueryCommunityPoolResponse = cosmos.distribution.v1beta1.IQueryCommunityPoolResponse;
type IQueryDelegationRewardsResponse = cosmos.distribution.v1beta1.IQueryDelegationRewardsResponse;
type IQueryDelegationTotalRewardsResponse = cosmos.distribution.v1beta1.IQueryDelegationTotalRewardsResponse;
type IQueryDelegatorValidatorsResponse = cosmos.distribution.v1beta1.IQueryDelegatorValidatorsResponse;
type IQueryDelegatorWithdrawAddressResponse = cosmos.distribution.v1beta1.IQueryDelegatorWithdrawAddressResponse;
type IQueryParamsResponse = cosmos.distribution.v1beta1.IQueryParamsResponse;
type IQueryValidatorCommissionResponse = cosmos.distribution.v1beta1.IQueryValidatorCommissionResponse;
type IQueryValidatorOutstandingRewardsResponse = cosmos.distribution.v1beta1.IQueryValidatorOutstandingRewardsResponse;
type IQueryValidatorSlashesResponse = cosmos.distribution.v1beta1.IQueryValidatorSlashesResponse;

const { Query } = cosmos.distribution.v1beta1;

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

export function setupDistributionExtension(base: QueryClient): DistributionExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification
  const queryService = Query.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/cosmos.distribution.v1beta1.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });
  return {
    distribution: {
      unverified: {
        communityPool: async () => {
          const response = await queryService.communityPool({});
          return toObject(response);
        },
        delegationRewards: async (delegatorAddress: string, validatorAddress: string) => {
          const response = await queryService.delegationRewards({
            delegatorAddress: delegatorAddress,
            validatorAddress: validatorAddress,
          });
          return toObject(response);
        },
        delegationTotalRewards: async (delegatorAddress: string) => {
          const response = await queryService.delegationTotalRewards({
            delegatorAddress: delegatorAddress,
          });
          return toObject(response);
        },
        delegatorValidators: async (delegatorAddress: string) => {
          const response = await queryService.delegatorValidators({
            delegatorAddress: delegatorAddress,
          });
          return toObject(response);
        },
        delegatorWithdrawAddress: async (delegatorAddress: string) => {
          const response = await queryService.delegatorWithdrawAddress({
            delegatorAddress: delegatorAddress,
          });
          return toObject(response);
        },
        params: async () => {
          const response = await queryService.params({});
          return toObject(response);
        },
        validatorCommission: async (validatorAddress: string) => {
          const response = await queryService.validatorCommission({
            validatorAddress: validatorAddress,
          });
          return toObject(response);
        },
        validatorOutstandingRewards: async (validatorAddress: string) => {
          const response = await queryService.validatorOutstandingRewards({
            validatorAddress: validatorAddress,
          });
          return toObject(response);
        },
        validatorSlashes: async (
          validatorAddress: string,
          startingHeight: number,
          endingHeight: number,
          paginationKey?: Uint8Array,
        ) => {
          const response = await queryService.validatorSlashes({
            validatorAddress: validatorAddress,
            startingHeight: Long.fromNumber(startingHeight),
            endingHeight: Long.fromNumber(endingHeight),
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
      },
    },
  };
}

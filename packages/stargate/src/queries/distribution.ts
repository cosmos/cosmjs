/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";

import {
  QueryClientImpl,
  QueryCommunityPoolResponse,
  QueryDelegationRewardsResponse,
  QueryDelegationTotalRewardsResponse,
  QueryDelegatorValidatorsResponse,
  QueryDelegatorWithdrawAddressResponse,
  QueryParamsResponse,
  QueryValidatorCommissionResponse,
  QueryValidatorOutstandingRewardsResponse,
  QueryValidatorSlashesResponse,
} from "../codec/cosmos/distribution/v1beta1/query";
import { QueryClient } from "./queryclient";
import { createPagination, toObject } from "./utils";

export interface DistributionExtension {
  readonly distribution: {
    unverified: {
      communityPool: () => Promise<QueryCommunityPoolResponse>;
      delegationRewards: (
        delegatorAddress: string,
        validatorAddress: string,
      ) => Promise<QueryDelegationRewardsResponse>;
      delegationTotalRewards: (delegatorAddress: string) => Promise<QueryDelegationTotalRewardsResponse>;
      delegatorValidators: (delegatorAddress: string) => Promise<QueryDelegatorValidatorsResponse>;
      delegatorWithdrawAddress: (delegatorAddress: string) => Promise<QueryDelegatorWithdrawAddressResponse>;
      params: () => Promise<QueryParamsResponse>;
      validatorCommission: (validatorAddress: string) => Promise<QueryValidatorCommissionResponse>;
      validatorOutstandingRewards: (
        validatorAddress: string,
      ) => Promise<QueryValidatorOutstandingRewardsResponse>;
      validatorSlashes: (
        validatorAddress: string,
        startingHeight: number,
        endingHeight: number,
        paginationKey?: Uint8Array,
      ) => Promise<QueryValidatorSlashesResponse>;
    };
  };
}

export function setupDistributionExtension(base: QueryClient): DistributionExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification
  const queryService = new QueryClientImpl({
    request: (service: string, method: string, data: Uint8Array): Promise<Uint8Array> => {
      // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
      const path = `/cosmos.distribution.v1beta1.Query/${method}`;
      return base.queryUnverified(path, data);
    },
  });
  return {
    distribution: {
      unverified: {
        communityPool: async () => {
          const response = await queryService.CommunityPool({});
          return toObject(response);
        },
        delegationRewards: async (delegatorAddress: string, validatorAddress: string) => {
          const response = await queryService.DelegationRewards({
            delegatorAddress: delegatorAddress,
            validatorAddress: validatorAddress,
          });
          return toObject(response);
        },
        delegationTotalRewards: async (delegatorAddress: string) => {
          const response = await queryService.DelegationTotalRewards({
            delegatorAddress: delegatorAddress,
          });
          return toObject(response);
        },
        delegatorValidators: async (delegatorAddress: string) => {
          const response = await queryService.DelegatorValidators({
            delegatorAddress: delegatorAddress,
          });
          return toObject(response);
        },
        delegatorWithdrawAddress: async (delegatorAddress: string) => {
          const response = await queryService.DelegatorWithdrawAddress({
            delegatorAddress: delegatorAddress,
          });
          return toObject(response);
        },
        params: async () => {
          const response = await queryService.Params({});
          return toObject(response);
        },
        validatorCommission: async (validatorAddress: string) => {
          const response = await queryService.ValidatorCommission({
            validatorAddress: validatorAddress,
          });
          return toObject(response);
        },
        validatorOutstandingRewards: async (validatorAddress: string) => {
          const response = await queryService.ValidatorOutstandingRewards({
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
          const response = await queryService.ValidatorSlashes({
            validatorAddress: validatorAddress,
            startingHeight: Long.fromNumber(startingHeight),
            endingHeight: Long.fromNumber(endingHeight),
            pagination: createPagination(paginationKey),
          });
          return toObject(response);
        },
      },
    },
  };
}

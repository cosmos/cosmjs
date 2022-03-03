/* eslint-disable @typescript-eslint/naming-convention */
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
} from "cosmjs-types/cosmos/distribution/v1beta1/query";
import Long from "long";

import { createPagination, createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface DistributionExtension {
  readonly distribution: {
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
}

export function setupDistributionExtension(base: QueryClient): DistributionExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    distribution: {
      communityPool: async () => {
        const response = await queryService.CommunityPool({});
        return response;
      },
      delegationRewards: async (delegatorAddress: string, validatorAddress: string) => {
        const response = await queryService.DelegationRewards({
          delegatorAddress: delegatorAddress,
          validatorAddress: validatorAddress,
        });
        return response;
      },
      delegationTotalRewards: async (delegatorAddress: string) => {
        const response = await queryService.DelegationTotalRewards({
          delegatorAddress: delegatorAddress,
        });
        return response;
      },
      delegatorValidators: async (delegatorAddress: string) => {
        const response = await queryService.DelegatorValidators({
          delegatorAddress: delegatorAddress,
        });
        return response;
      },
      delegatorWithdrawAddress: async (delegatorAddress: string) => {
        const response = await queryService.DelegatorWithdrawAddress({
          delegatorAddress: delegatorAddress,
        });
        return response;
      },
      params: async () => {
        const response = await queryService.Params({});
        return response;
      },
      validatorCommission: async (validatorAddress: string) => {
        const response = await queryService.ValidatorCommission({
          validatorAddress: validatorAddress,
        });
        return response;
      },
      validatorOutstandingRewards: async (validatorAddress: string) => {
        const response = await queryService.ValidatorOutstandingRewards({
          validatorAddress: validatorAddress,
        });
        return response;
      },
      validatorSlashes: async (
        validatorAddress: string,
        startingHeight: number,
        endingHeight: number,
        paginationKey?: Uint8Array,
      ) => {
        const response = await queryService.ValidatorSlashes({
          validatorAddress: validatorAddress,
          startingHeight: Long.fromNumber(startingHeight, true),
          endingHeight: Long.fromNumber(endingHeight, true),
          pagination: createPagination(paginationKey),
        });
        return response;
      },
    },
  };
}

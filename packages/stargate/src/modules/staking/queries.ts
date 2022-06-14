/* eslint-disable @typescript-eslint/naming-convention */
import {
  QueryClientImpl,
  QueryDelegationResponse,
  QueryDelegatorDelegationsResponse,
  QueryDelegatorUnbondingDelegationsResponse,
  QueryDelegatorValidatorResponse,
  QueryDelegatorValidatorsResponse,
  QueryHistoricalInfoResponse,
  QueryParamsResponse,
  QueryPoolResponse,
  QueryRedelegationsResponse,
  QueryUnbondingDelegationResponse,
  QueryValidatorDelegationsResponse,
  QueryValidatorResponse,
  QueryValidatorsResponse,
  QueryValidatorUnbondingDelegationsResponse,
} from "cosmjs-types/cosmos/staking/v1beta1/query";
import { BondStatus } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import Long from "long";

import { createPagination, createProtobufRpcClient, QueryClient } from "../../queryclient";

// It's an enum in Go and a string in the protobuf API. "BOND_STATUS_UNSPECIFIED"
// is excluded and "" is supported instead 🤷.
//
// String values: https://github.com/cosmos/cosmos-sdk/blob/v0.45.5/x/staking/types/staking.pb.go#L57-L62
// Validation: https://github.com/cosmos/cosmos-sdk/blob/v0.45.5/x/staking/keeper/grpc_query.go#L29-L32
export type BondStatusString =
  | keyof Pick<typeof BondStatus, "BOND_STATUS_BONDED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING">
  | "";

export interface StakingExtension {
  readonly staking: {
    delegation: (delegatorAddress: string, validatorAddress: string) => Promise<QueryDelegationResponse>;
    delegatorDelegations: (
      delegatorAddress: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryDelegatorDelegationsResponse>;
    delegatorUnbondingDelegations: (
      delegatorAddress: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryDelegatorUnbondingDelegationsResponse>;
    delegatorValidator: (
      delegatorAddress: string,
      validatorAddress: string,
    ) => Promise<QueryDelegatorValidatorResponse>;
    delegatorValidators: (
      delegatorAddress: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryDelegatorValidatorsResponse>;
    historicalInfo: (height: number) => Promise<QueryHistoricalInfoResponse>;
    params: () => Promise<QueryParamsResponse>;
    pool: () => Promise<QueryPoolResponse>;
    redelegations: (
      delegatorAddress: string,
      sourceValidatorAddress: string,
      destinationValidatorAddress: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryRedelegationsResponse>;
    unbondingDelegation: (
      delegatorAddress: string,
      validatorAddress: string,
    ) => Promise<QueryUnbondingDelegationResponse>;
    validator: (validatorAddress: string) => Promise<QueryValidatorResponse>;
    validatorDelegations: (
      validatorAddress: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryValidatorDelegationsResponse>;
    validators: (status: BondStatusString, paginationKey?: Uint8Array) => Promise<QueryValidatorsResponse>;
    validatorUnbondingDelegations: (
      validatorAddress: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryValidatorUnbondingDelegationsResponse>;
  };
}

export function setupStakingExtension(base: QueryClient): StakingExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    staking: {
      delegation: async (delegatorAddress: string, validatorAddress: string) => {
        const response = await queryService.Delegation({
          delegatorAddr: delegatorAddress,
          validatorAddr: validatorAddress,
        });
        return response;
      },
      delegatorDelegations: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
        const response = await queryService.DelegatorDelegations({
          delegatorAddr: delegatorAddress,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      delegatorUnbondingDelegations: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
        const response = await queryService.DelegatorUnbondingDelegations({
          delegatorAddr: delegatorAddress,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      delegatorValidator: async (delegatorAddress: string, validatorAddress: string) => {
        const response = await queryService.DelegatorValidator({
          delegatorAddr: delegatorAddress,
          validatorAddr: validatorAddress,
        });
        return response;
      },
      delegatorValidators: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
        const response = await queryService.DelegatorValidators({
          delegatorAddr: delegatorAddress,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      historicalInfo: async (height: number) => {
        const response = await queryService.HistoricalInfo({
          height: Long.fromNumber(height, true),
        });
        return response;
      },
      params: async () => {
        const response = await queryService.Params({});
        return response;
      },
      pool: async () => {
        const response = await queryService.Pool({});
        return response;
      },
      redelegations: async (
        delegatorAddress: string,
        sourceValidatorAddress: string,
        destinationValidatorAddress: string,
        paginationKey?: Uint8Array,
      ) => {
        const response = await queryService.Redelegations({
          delegatorAddr: delegatorAddress,
          srcValidatorAddr: sourceValidatorAddress,
          dstValidatorAddr: destinationValidatorAddress,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      unbondingDelegation: async (delegatorAddress: string, validatorAddress: string) => {
        const response = await queryService.UnbondingDelegation({
          delegatorAddr: delegatorAddress,
          validatorAddr: validatorAddress,
        });
        return response;
      },
      validator: async (validatorAddress: string) => {
        const response = await queryService.Validator({ validatorAddr: validatorAddress });
        return response;
      },
      validatorDelegations: async (validatorAddress: string, paginationKey?: Uint8Array) => {
        const response = await queryService.ValidatorDelegations({
          validatorAddr: validatorAddress,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      validators: async (status: BondStatusString, paginationKey?: Uint8Array) => {
        const response = await queryService.Validators({
          status: status,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      validatorUnbondingDelegations: async (validatorAddress: string, paginationKey?: Uint8Array) => {
        const response = await queryService.ValidatorUnbondingDelegations({
          validatorAddr: validatorAddress,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
    },
  };
}

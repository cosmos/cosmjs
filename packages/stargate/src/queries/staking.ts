/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";

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
} from "../codec/cosmos/staking/v1beta1/query";
import { BondStatus } from "../codec/cosmos/staking/v1beta1/staking";
import { QueryClient } from "./queryclient";
import { createPagination, toObject } from "./utils";

export type BondStatusString = Exclude<keyof typeof BondStatus, "BOND_STATUS_UNSPECIFIED">;

export interface StakingExtension {
  readonly staking: {
    readonly unverified: {
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
  };
}

export function setupStakingExtension(base: QueryClient): StakingExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification
  const queryService = new QueryClientImpl({
    request: (service: "string", method: string, data: Uint8Array): Promise<Uint8Array> => {
      // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
      const path = `/cosmos.staking.v1beta1.Query/${method}`;
      return base.queryUnverified(path, data);
    },
  });

  return {
    staking: {
      unverified: {
        delegation: async (delegatorAddress: string, validatorAddress: string) => {
          const response = await queryService.Delegation({
            delegatorAddr: delegatorAddress,
            validatorAddr: validatorAddress,
          });
          return toObject(response);
        },
        delegatorDelegations: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
          const response = await queryService.DelegatorDelegations({
            delegatorAddr: delegatorAddress,
            pagination: createPagination(paginationKey),
          });
          return toObject(response);
        },
        delegatorUnbondingDelegations: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
          const response = await queryService.DelegatorUnbondingDelegations({
            delegatorAddr: delegatorAddress,
            pagination: createPagination(paginationKey),
          });
          return toObject(response);
        },
        delegatorValidator: async (delegatorAddress: string, validatorAddress: string) => {
          const response = await queryService.DelegatorValidator({
            delegatorAddr: delegatorAddress,
            validatorAddr: validatorAddress,
          });
          return toObject(response);
        },
        delegatorValidators: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
          const response = await queryService.DelegatorValidators({
            delegatorAddr: delegatorAddress,
            pagination: createPagination(paginationKey),
          });
          return toObject(response);
        },
        historicalInfo: async (height: number) => {
          const response = await queryService.HistoricalInfo({
            height: Long.fromNumber(height),
          });
          return toObject(response);
        },
        params: async () => {
          const response = await queryService.Params({});
          return toObject(response);
        },
        pool: async () => {
          const response = await queryService.Pool({});
          return toObject(response);
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
          return toObject(response);
        },
        unbondingDelegation: async (delegatorAddress: string, validatorAddress: string) => {
          const response = await queryService.UnbondingDelegation({
            delegatorAddr: delegatorAddress,
            validatorAddr: validatorAddress,
          });
          return toObject(response);
        },
        validator: async (validatorAddress: string) => {
          const response = await queryService.Validator({ validatorAddr: validatorAddress });
          return toObject(response);
        },
        validatorDelegations: async (validatorAddress: string, paginationKey?: Uint8Array) => {
          const response = await queryService.ValidatorDelegations({
            validatorAddr: validatorAddress,
            pagination: createPagination(paginationKey),
          });
          return toObject(response);
        },
        validators: async (status: BondStatusString, paginationKey?: Uint8Array) => {
          const response = await queryService.Validators({
            status: status,
            pagination: createPagination(paginationKey),
          });
          return toObject(response);
        },
        validatorUnbondingDelegations: async (validatorAddress: string, paginationKey?: Uint8Array) => {
          const response = await queryService.ValidatorUnbondingDelegations({
            validatorAddr: validatorAddress,
            pagination: createPagination(paginationKey),
          });
          return toObject(response);
        },
      },
    },
  };
}
/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";

import { cosmos } from "../codec";
import { QueryClient } from "./queryclient";
import { toObject } from "./utils";

type IQueryDelegationResponse = cosmos.staking.v1beta1.IQueryDelegationResponse;
type IQueryDelegatorDelegationsResponse = cosmos.staking.v1beta1.IQueryDelegatorDelegationsResponse;
type IQueryDelegatorUnbondingDelegationsResponse = cosmos.staking.v1beta1.IQueryDelegatorUnbondingDelegationsResponse;
type IQueryDelegatorValidatorResponse = cosmos.staking.v1beta1.IQueryDelegatorValidatorResponse;
type IQueryDelegatorValidatorsResponse = cosmos.staking.v1beta1.IQueryDelegatorValidatorsResponse;
type IQueryHistoricalInfoResponse = cosmos.staking.v1beta1.IQueryHistoricalInfoResponse;
type IQueryParamsResponse = cosmos.staking.v1beta1.IQueryParamsResponse;
type IQueryPoolResponse = cosmos.staking.v1beta1.IQueryPoolResponse;
type IQueryRedelegationsResponse = cosmos.staking.v1beta1.IQueryRedelegationsResponse;
type IQueryUnbondingDelegationResponse = cosmos.staking.v1beta1.IQueryUnbondingDelegationResponse;
type IQueryValidatorResponse = cosmos.staking.v1beta1.IQueryValidatorResponse;
type IQueryValidatorDelegationsResponse = cosmos.staking.v1beta1.IQueryValidatorDelegationsResponse;
type IQueryValidatorsResponse = cosmos.staking.v1beta1.IQueryValidatorsResponse;
type IQueryValidatorUnbondingDelegationsResponse = cosmos.staking.v1beta1.IQueryValidatorUnbondingDelegationsResponse;

const { Query } = cosmos.staking.v1beta1;

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

export function setupStakingExtension(base: QueryClient): StakingExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification
  const queryService = Query.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/cosmos.staking.v1beta1.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });

  return {
    staking: {
      unverified: {
        delegation: async (delegatorAddress: string, validatorAddress: string) => {
          const response = await queryService.delegation({
            delegatorAddr: delegatorAddress,
            validatorAddr: validatorAddress,
          });
          return toObject(response);
        },
        delegatorDelegations: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
          const response = await queryService.delegatorDelegations({
            delegatorAddr: delegatorAddress,
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
        delegatorUnbondingDelegations: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
          const response = await queryService.delegatorUnbondingDelegations({
            delegatorAddr: delegatorAddress,
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
        delegatorValidator: async (delegatorAddress: string, validatorAddress: string) => {
          const response = queryService.delegatorValidator({
            delegatorAddr: delegatorAddress,
            validatorAddr: validatorAddress,
          });
          return toObject(response);
        },
        delegatorValidators: async (delegatorAddress: string, paginationKey?: Uint8Array) => {
          const response = queryService.delegatorValidators({
            delegatorAddr: delegatorAddress,
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
        historicalInfo: async (height: number) => {
          const response = queryService.historicalInfo({
            height: Long.fromNumber(height),
          });
          return toObject(response);
        },
        params: async () => {
          const response = queryService.params({});
          return toObject(response);
        },
        pool: async () => {
          const response = queryService.pool({});
          return toObject(response);
        },
        redelegations: async (
          delegatorAddress: string,
          sourceValidatorAddress: string,
          destinationValidatorAddress: string,
          paginationKey?: Uint8Array,
        ) => {
          const response = queryService.redelegations({
            delegatorAddr: delegatorAddress,
            srcValidatorAddr: sourceValidatorAddress,
            dstValidatorAddr: destinationValidatorAddress,
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
        unbondingDelegation: async (delegatorAddress: string, validatorAddress: string) => {
          const response = queryService.unbondingDelegation({
            delegatorAddr: delegatorAddress,
            validatorAddr: validatorAddress,
          });
          return toObject(response);
        },
        validator: async (validatorAddress: string) => {
          const response = queryService.validator({ validatorAddr: validatorAddress });
          return toObject(response);
        },
        validatorDelegations: async (validatorAddress: string, paginationKey?: Uint8Array) => {
          const response = queryService.validatorDelegations({
            validatorAddr: validatorAddress,
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
        validators: async (status: string, paginationKey?: Uint8Array) => {
          const response = queryService.validators({
            status: status,
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
        validatorUnbondingDelegations: async (validatorAddress: string, paginationKey?: Uint8Array) => {
          const response = queryService.validatorUnbondingDelegations({
            validatorAddr: validatorAddress,
            pagination: paginationKey ? { key: paginationKey } : undefined,
          });
          return toObject(response);
        },
      },
    },
  };
}

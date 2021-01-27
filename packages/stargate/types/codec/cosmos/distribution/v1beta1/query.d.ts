import {
  Params,
  ValidatorOutstandingRewards,
  ValidatorAccumulatedCommission,
  ValidatorSlashEvent,
  DelegationDelegatorReward,
} from "../../../cosmos/distribution/v1beta1/distribution";
import Long from "long";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { DecCoin } from "../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.distribution.v1beta1";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}
/**
 * QueryValidatorOutstandingRewardsRequest is the request type for the
 * Query/ValidatorOutstandingRewards RPC method.
 */
export interface QueryValidatorOutstandingRewardsRequest {
  /** validator_address defines the validator address to query for. */
  validatorAddress: string;
}
/**
 * QueryValidatorOutstandingRewardsResponse is the response type for the
 * Query/ValidatorOutstandingRewards RPC method.
 */
export interface QueryValidatorOutstandingRewardsResponse {
  rewards?: ValidatorOutstandingRewards;
}
/**
 * QueryValidatorCommissionRequest is the request type for the
 * Query/ValidatorCommission RPC method
 */
export interface QueryValidatorCommissionRequest {
  /** validator_address defines the validator address to query for. */
  validatorAddress: string;
}
/**
 * QueryValidatorCommissionResponse is the response type for the
 * Query/ValidatorCommission RPC method
 */
export interface QueryValidatorCommissionResponse {
  /** commission defines the commision the validator received. */
  commission?: ValidatorAccumulatedCommission;
}
/**
 * QueryValidatorSlashesRequest is the request type for the
 * Query/ValidatorSlashes RPC method
 */
export interface QueryValidatorSlashesRequest {
  /** validator_address defines the validator address to query for. */
  validatorAddress: string;
  /** starting_height defines the optional starting height to query the slashes. */
  startingHeight: Long;
  /** starting_height defines the optional ending height to query the slashes. */
  endingHeight: Long;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryValidatorSlashesResponse is the response type for the
 * Query/ValidatorSlashes RPC method.
 */
export interface QueryValidatorSlashesResponse {
  /** slashes defines the slashes the validator received. */
  slashes: ValidatorSlashEvent[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/**
 * QueryDelegationRewardsRequest is the request type for the
 * Query/DelegationRewards RPC method.
 */
export interface QueryDelegationRewardsRequest {
  /** delegator_address defines the delegator address to query for. */
  delegatorAddress: string;
  /** validator_address defines the validator address to query for. */
  validatorAddress: string;
}
/**
 * QueryDelegationRewardsResponse is the response type for the
 * Query/DelegationRewards RPC method.
 */
export interface QueryDelegationRewardsResponse {
  /** rewards defines the rewards accrued by a delegation. */
  rewards: DecCoin[];
}
/**
 * QueryDelegationTotalRewardsRequest is the request type for the
 * Query/DelegationTotalRewards RPC method.
 */
export interface QueryDelegationTotalRewardsRequest {
  /** delegator_address defines the delegator address to query for. */
  delegatorAddress: string;
}
/**
 * QueryDelegationTotalRewardsResponse is the response type for the
 * Query/DelegationTotalRewards RPC method.
 */
export interface QueryDelegationTotalRewardsResponse {
  /** rewards defines all the rewards accrued by a delegator. */
  rewards: DelegationDelegatorReward[];
  /** total defines the sum of all the rewards. */
  total: DecCoin[];
}
/**
 * QueryDelegatorValidatorsRequest is the request type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsRequest {
  /** delegator_address defines the delegator address to query for. */
  delegatorAddress: string;
}
/**
 * QueryDelegatorValidatorsResponse is the response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsResponse {
  /** validators defines the validators a delegator is delegating for. */
  validators: string[];
}
/**
 * QueryDelegatorWithdrawAddressRequest is the request type for the
 * Query/DelegatorWithdrawAddress RPC method.
 */
export interface QueryDelegatorWithdrawAddressRequest {
  /** delegator_address defines the delegator address to query for. */
  delegatorAddress: string;
}
/**
 * QueryDelegatorWithdrawAddressResponse is the response type for the
 * Query/DelegatorWithdrawAddress RPC method.
 */
export interface QueryDelegatorWithdrawAddressResponse {
  /** withdraw_address defines the delegator address to query for. */
  withdrawAddress: string;
}
/**
 * QueryCommunityPoolRequest is the request type for the Query/CommunityPool RPC
 * method.
 */
export interface QueryCommunityPoolRequest {}
/**
 * QueryCommunityPoolResponse is the response type for the Query/CommunityPool
 * RPC method.
 */
export interface QueryCommunityPoolResponse {
  /** pool defines community pool's coins. */
  pool: DecCoin[];
}
export declare const QueryParamsRequest: {
  encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryParamsRequest;
  fromJSON(_: any): QueryParamsRequest;
  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
  toJSON(_: QueryParamsRequest): unknown;
};
export declare const QueryParamsResponse: {
  encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryParamsResponse;
  fromJSON(object: any): QueryParamsResponse;
  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
  toJSON(message: QueryParamsResponse): unknown;
};
export declare const QueryValidatorOutstandingRewardsRequest: {
  encode(message: QueryValidatorOutstandingRewardsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(
    input: _m0.Reader | Uint8Array,
    length?: number | undefined,
  ): QueryValidatorOutstandingRewardsRequest;
  fromJSON(object: any): QueryValidatorOutstandingRewardsRequest;
  fromPartial(
    object: DeepPartial<QueryValidatorOutstandingRewardsRequest>,
  ): QueryValidatorOutstandingRewardsRequest;
  toJSON(message: QueryValidatorOutstandingRewardsRequest): unknown;
};
export declare const QueryValidatorOutstandingRewardsResponse: {
  encode(message: QueryValidatorOutstandingRewardsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(
    input: _m0.Reader | Uint8Array,
    length?: number | undefined,
  ): QueryValidatorOutstandingRewardsResponse;
  fromJSON(object: any): QueryValidatorOutstandingRewardsResponse;
  fromPartial(
    object: DeepPartial<QueryValidatorOutstandingRewardsResponse>,
  ): QueryValidatorOutstandingRewardsResponse;
  toJSON(message: QueryValidatorOutstandingRewardsResponse): unknown;
};
export declare const QueryValidatorCommissionRequest: {
  encode(message: QueryValidatorCommissionRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorCommissionRequest;
  fromJSON(object: any): QueryValidatorCommissionRequest;
  fromPartial(object: DeepPartial<QueryValidatorCommissionRequest>): QueryValidatorCommissionRequest;
  toJSON(message: QueryValidatorCommissionRequest): unknown;
};
export declare const QueryValidatorCommissionResponse: {
  encode(message: QueryValidatorCommissionResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorCommissionResponse;
  fromJSON(object: any): QueryValidatorCommissionResponse;
  fromPartial(object: DeepPartial<QueryValidatorCommissionResponse>): QueryValidatorCommissionResponse;
  toJSON(message: QueryValidatorCommissionResponse): unknown;
};
export declare const QueryValidatorSlashesRequest: {
  encode(message: QueryValidatorSlashesRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorSlashesRequest;
  fromJSON(object: any): QueryValidatorSlashesRequest;
  fromPartial(object: DeepPartial<QueryValidatorSlashesRequest>): QueryValidatorSlashesRequest;
  toJSON(message: QueryValidatorSlashesRequest): unknown;
};
export declare const QueryValidatorSlashesResponse: {
  encode(message: QueryValidatorSlashesResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorSlashesResponse;
  fromJSON(object: any): QueryValidatorSlashesResponse;
  fromPartial(object: DeepPartial<QueryValidatorSlashesResponse>): QueryValidatorSlashesResponse;
  toJSON(message: QueryValidatorSlashesResponse): unknown;
};
export declare const QueryDelegationRewardsRequest: {
  encode(message: QueryDelegationRewardsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegationRewardsRequest;
  fromJSON(object: any): QueryDelegationRewardsRequest;
  fromPartial(object: DeepPartial<QueryDelegationRewardsRequest>): QueryDelegationRewardsRequest;
  toJSON(message: QueryDelegationRewardsRequest): unknown;
};
export declare const QueryDelegationRewardsResponse: {
  encode(message: QueryDelegationRewardsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegationRewardsResponse;
  fromJSON(object: any): QueryDelegationRewardsResponse;
  fromPartial(object: DeepPartial<QueryDelegationRewardsResponse>): QueryDelegationRewardsResponse;
  toJSON(message: QueryDelegationRewardsResponse): unknown;
};
export declare const QueryDelegationTotalRewardsRequest: {
  encode(message: QueryDelegationTotalRewardsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegationTotalRewardsRequest;
  fromJSON(object: any): QueryDelegationTotalRewardsRequest;
  fromPartial(object: DeepPartial<QueryDelegationTotalRewardsRequest>): QueryDelegationTotalRewardsRequest;
  toJSON(message: QueryDelegationTotalRewardsRequest): unknown;
};
export declare const QueryDelegationTotalRewardsResponse: {
  encode(message: QueryDelegationTotalRewardsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegationTotalRewardsResponse;
  fromJSON(object: any): QueryDelegationTotalRewardsResponse;
  fromPartial(object: DeepPartial<QueryDelegationTotalRewardsResponse>): QueryDelegationTotalRewardsResponse;
  toJSON(message: QueryDelegationTotalRewardsResponse): unknown;
};
export declare const QueryDelegatorValidatorsRequest: {
  encode(message: QueryDelegatorValidatorsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorValidatorsRequest;
  fromJSON(object: any): QueryDelegatorValidatorsRequest;
  fromPartial(object: DeepPartial<QueryDelegatorValidatorsRequest>): QueryDelegatorValidatorsRequest;
  toJSON(message: QueryDelegatorValidatorsRequest): unknown;
};
export declare const QueryDelegatorValidatorsResponse: {
  encode(message: QueryDelegatorValidatorsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorValidatorsResponse;
  fromJSON(object: any): QueryDelegatorValidatorsResponse;
  fromPartial(object: DeepPartial<QueryDelegatorValidatorsResponse>): QueryDelegatorValidatorsResponse;
  toJSON(message: QueryDelegatorValidatorsResponse): unknown;
};
export declare const QueryDelegatorWithdrawAddressRequest: {
  encode(message: QueryDelegatorWithdrawAddressRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorWithdrawAddressRequest;
  fromJSON(object: any): QueryDelegatorWithdrawAddressRequest;
  fromPartial(
    object: DeepPartial<QueryDelegatorWithdrawAddressRequest>,
  ): QueryDelegatorWithdrawAddressRequest;
  toJSON(message: QueryDelegatorWithdrawAddressRequest): unknown;
};
export declare const QueryDelegatorWithdrawAddressResponse: {
  encode(message: QueryDelegatorWithdrawAddressResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorWithdrawAddressResponse;
  fromJSON(object: any): QueryDelegatorWithdrawAddressResponse;
  fromPartial(
    object: DeepPartial<QueryDelegatorWithdrawAddressResponse>,
  ): QueryDelegatorWithdrawAddressResponse;
  toJSON(message: QueryDelegatorWithdrawAddressResponse): unknown;
};
export declare const QueryCommunityPoolRequest: {
  encode(_: QueryCommunityPoolRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCommunityPoolRequest;
  fromJSON(_: any): QueryCommunityPoolRequest;
  fromPartial(_: DeepPartial<QueryCommunityPoolRequest>): QueryCommunityPoolRequest;
  toJSON(_: QueryCommunityPoolRequest): unknown;
};
export declare const QueryCommunityPoolResponse: {
  encode(message: QueryCommunityPoolResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCommunityPoolResponse;
  fromJSON(object: any): QueryCommunityPoolResponse;
  fromPartial(object: DeepPartial<QueryCommunityPoolResponse>): QueryCommunityPoolResponse;
  toJSON(message: QueryCommunityPoolResponse): unknown;
};
/** Query defines the gRPC querier service for distribution module. */
export interface Query {
  /** Params queries params of the distribution module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** ValidatorOutstandingRewards queries rewards of a validator address. */
  ValidatorOutstandingRewards(
    request: QueryValidatorOutstandingRewardsRequest,
  ): Promise<QueryValidatorOutstandingRewardsResponse>;
  /** ValidatorCommission queries accumulated commission for a validator. */
  ValidatorCommission(request: QueryValidatorCommissionRequest): Promise<QueryValidatorCommissionResponse>;
  /** ValidatorSlashes queries slash events of a validator. */
  ValidatorSlashes(request: QueryValidatorSlashesRequest): Promise<QueryValidatorSlashesResponse>;
  /** DelegationRewards queries the total rewards accrued by a delegation. */
  DelegationRewards(request: QueryDelegationRewardsRequest): Promise<QueryDelegationRewardsResponse>;
  /**
   * DelegationTotalRewards queries the total rewards accrued by a each
   * validator.
   */
  DelegationTotalRewards(
    request: QueryDelegationTotalRewardsRequest,
  ): Promise<QueryDelegationTotalRewardsResponse>;
  /** DelegatorValidators queries the validators of a delegator. */
  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
  /** DelegatorWithdrawAddress queries withdraw address of a delegator. */
  DelegatorWithdrawAddress(
    request: QueryDelegatorWithdrawAddressRequest,
  ): Promise<QueryDelegatorWithdrawAddressResponse>;
  /** CommunityPool queries the community pool coins. */
  CommunityPool(request: QueryCommunityPoolRequest): Promise<QueryCommunityPoolResponse>;
}
export declare class QueryClientImpl implements Query {
  private readonly rpc;
  constructor(rpc: Rpc);
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  ValidatorOutstandingRewards(
    request: QueryValidatorOutstandingRewardsRequest,
  ): Promise<QueryValidatorOutstandingRewardsResponse>;
  ValidatorCommission(request: QueryValidatorCommissionRequest): Promise<QueryValidatorCommissionResponse>;
  ValidatorSlashes(request: QueryValidatorSlashesRequest): Promise<QueryValidatorSlashesResponse>;
  DelegationRewards(request: QueryDelegationRewardsRequest): Promise<QueryDelegationRewardsResponse>;
  DelegationTotalRewards(
    request: QueryDelegationTotalRewardsRequest,
  ): Promise<QueryDelegationTotalRewardsResponse>;
  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
  DelegatorWithdrawAddress(
    request: QueryDelegatorWithdrawAddressRequest,
  ): Promise<QueryDelegatorWithdrawAddressResponse>;
  CommunityPool(request: QueryCommunityPoolRequest): Promise<QueryCommunityPoolResponse>;
}
interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
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

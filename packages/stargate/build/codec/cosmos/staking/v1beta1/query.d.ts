import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import {
  Validator,
  DelegationResponse,
  UnbondingDelegation,
  HistoricalInfo,
  Pool,
  Params,
  RedelegationResponse,
} from "../../../cosmos/staking/v1beta1/staking";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.staking.v1beta1";
/** QueryValidatorsRequest is request type for Query/Validators RPC method. */
export interface QueryValidatorsRequest {
  /** status enables to query for validators matching a given status. */
  status: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryValidatorsResponse is response type for the Query/Validators RPC method */
export interface QueryValidatorsResponse {
  /** validators contains all the queried validators. */
  validators: Validator[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** QueryValidatorRequest is response type for the Query/Validator RPC method */
export interface QueryValidatorRequest {
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}
/** QueryValidatorResponse is response type for the Query/Validator RPC method */
export interface QueryValidatorResponse {
  /** validator defines the the validator info. */
  validator?: Validator;
}
/**
 * QueryValidatorDelegationsRequest is request type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsRequest {
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryValidatorDelegationsResponse is response type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsResponse {
  delegationResponses: DelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/**
 * QueryValidatorUnbondingDelegationsRequest is required type for the
 * Query/ValidatorUnbondingDelegations RPC method
 */
export interface QueryValidatorUnbondingDelegationsRequest {
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryValidatorUnbondingDelegationsResponse is response type for the
 * Query/ValidatorUnbondingDelegations RPC method.
 */
export interface QueryValidatorUnbondingDelegationsResponse {
  unbondingResponses: UnbondingDelegation[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** QueryDelegationRequest is request type for the Query/Delegation RPC method. */
export interface QueryDelegationRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}
/** QueryDelegationResponse is response type for the Query/Delegation RPC method. */
export interface QueryDelegationResponse {
  /** delegation_responses defines the delegation info of a delegation. */
  delegationResponse?: DelegationResponse;
}
/**
 * QueryUnbondingDelegationRequest is request type for the
 * Query/UnbondingDelegation RPC method.
 */
export interface QueryUnbondingDelegationRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}
/**
 * QueryDelegationResponse is response type for the Query/UnbondingDelegation
 * RPC method.
 */
export interface QueryUnbondingDelegationResponse {
  /** unbond defines the unbonding information of a delegation. */
  unbond?: UnbondingDelegation;
}
/**
 * QueryDelegatorDelegationsRequest is request type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryDelegatorDelegationsResponse is response type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsResponse {
  /** delegation_responses defines all the delegations' info of a delegator. */
  delegationResponses: DelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/**
 * QueryDelegatorUnbondingDelegationsRequest is request type for the
 * Query/DelegatorUnbondingDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryUnbondingDelegatorDelegationsResponse is response type for the
 * Query/UnbondingDelegatorDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsResponse {
  unbondingResponses: UnbondingDelegation[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/**
 * QueryRedelegationsRequest is request type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** src_validator_addr defines the validator address to redelegate from. */
  srcValidatorAddr: string;
  /** dst_validator_addr defines the validator address to redelegate to. */
  dstValidatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryRedelegationsResponse is response type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsResponse {
  redelegationResponses: RedelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/**
 * QueryDelegatorValidatorsRequest is request type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryDelegatorValidatorsResponse is response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsResponse {
  /** validators defines the the validators' info of a delegator. */
  validators: Validator[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/**
 * QueryDelegatorValidatorRequest is request type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}
/**
 * QueryDelegatorValidatorResponse response type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorResponse {
  /** validator defines the the validator info. */
  validator?: Validator;
}
/**
 * QueryHistoricalInfoRequest is request type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoRequest {
  /** height defines at which height to query the historical info. */
  height: Long;
}
/**
 * QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoResponse {
  /** hist defines the historical info at the given height. */
  hist?: HistoricalInfo;
}
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryPoolRequest {}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryPoolResponse {
  /** pool defines the pool info. */
  pool?: Pool;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}
export declare const QueryValidatorsRequest: {
  encode(message: QueryValidatorsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorsRequest;
  fromJSON(object: any): QueryValidatorsRequest;
  fromPartial(object: DeepPartial<QueryValidatorsRequest>): QueryValidatorsRequest;
  toJSON(message: QueryValidatorsRequest): unknown;
};
export declare const QueryValidatorsResponse: {
  encode(message: QueryValidatorsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorsResponse;
  fromJSON(object: any): QueryValidatorsResponse;
  fromPartial(object: DeepPartial<QueryValidatorsResponse>): QueryValidatorsResponse;
  toJSON(message: QueryValidatorsResponse): unknown;
};
export declare const QueryValidatorRequest: {
  encode(message: QueryValidatorRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorRequest;
  fromJSON(object: any): QueryValidatorRequest;
  fromPartial(object: DeepPartial<QueryValidatorRequest>): QueryValidatorRequest;
  toJSON(message: QueryValidatorRequest): unknown;
};
export declare const QueryValidatorResponse: {
  encode(message: QueryValidatorResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorResponse;
  fromJSON(object: any): QueryValidatorResponse;
  fromPartial(object: DeepPartial<QueryValidatorResponse>): QueryValidatorResponse;
  toJSON(message: QueryValidatorResponse): unknown;
};
export declare const QueryValidatorDelegationsRequest: {
  encode(message: QueryValidatorDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorDelegationsRequest;
  fromJSON(object: any): QueryValidatorDelegationsRequest;
  fromPartial(object: DeepPartial<QueryValidatorDelegationsRequest>): QueryValidatorDelegationsRequest;
  toJSON(message: QueryValidatorDelegationsRequest): unknown;
};
export declare const QueryValidatorDelegationsResponse: {
  encode(message: QueryValidatorDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryValidatorDelegationsResponse;
  fromJSON(object: any): QueryValidatorDelegationsResponse;
  fromPartial(object: DeepPartial<QueryValidatorDelegationsResponse>): QueryValidatorDelegationsResponse;
  toJSON(message: QueryValidatorDelegationsResponse): unknown;
};
export declare const QueryValidatorUnbondingDelegationsRequest: {
  encode(message: QueryValidatorUnbondingDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(
    input: _m0.Reader | Uint8Array,
    length?: number | undefined,
  ): QueryValidatorUnbondingDelegationsRequest;
  fromJSON(object: any): QueryValidatorUnbondingDelegationsRequest;
  fromPartial(
    object: DeepPartial<QueryValidatorUnbondingDelegationsRequest>,
  ): QueryValidatorUnbondingDelegationsRequest;
  toJSON(message: QueryValidatorUnbondingDelegationsRequest): unknown;
};
export declare const QueryValidatorUnbondingDelegationsResponse: {
  encode(message: QueryValidatorUnbondingDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(
    input: _m0.Reader | Uint8Array,
    length?: number | undefined,
  ): QueryValidatorUnbondingDelegationsResponse;
  fromJSON(object: any): QueryValidatorUnbondingDelegationsResponse;
  fromPartial(
    object: DeepPartial<QueryValidatorUnbondingDelegationsResponse>,
  ): QueryValidatorUnbondingDelegationsResponse;
  toJSON(message: QueryValidatorUnbondingDelegationsResponse): unknown;
};
export declare const QueryDelegationRequest: {
  encode(message: QueryDelegationRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegationRequest;
  fromJSON(object: any): QueryDelegationRequest;
  fromPartial(object: DeepPartial<QueryDelegationRequest>): QueryDelegationRequest;
  toJSON(message: QueryDelegationRequest): unknown;
};
export declare const QueryDelegationResponse: {
  encode(message: QueryDelegationResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegationResponse;
  fromJSON(object: any): QueryDelegationResponse;
  fromPartial(object: DeepPartial<QueryDelegationResponse>): QueryDelegationResponse;
  toJSON(message: QueryDelegationResponse): unknown;
};
export declare const QueryUnbondingDelegationRequest: {
  encode(message: QueryUnbondingDelegationRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryUnbondingDelegationRequest;
  fromJSON(object: any): QueryUnbondingDelegationRequest;
  fromPartial(object: DeepPartial<QueryUnbondingDelegationRequest>): QueryUnbondingDelegationRequest;
  toJSON(message: QueryUnbondingDelegationRequest): unknown;
};
export declare const QueryUnbondingDelegationResponse: {
  encode(message: QueryUnbondingDelegationResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryUnbondingDelegationResponse;
  fromJSON(object: any): QueryUnbondingDelegationResponse;
  fromPartial(object: DeepPartial<QueryUnbondingDelegationResponse>): QueryUnbondingDelegationResponse;
  toJSON(message: QueryUnbondingDelegationResponse): unknown;
};
export declare const QueryDelegatorDelegationsRequest: {
  encode(message: QueryDelegatorDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorDelegationsRequest;
  fromJSON(object: any): QueryDelegatorDelegationsRequest;
  fromPartial(object: DeepPartial<QueryDelegatorDelegationsRequest>): QueryDelegatorDelegationsRequest;
  toJSON(message: QueryDelegatorDelegationsRequest): unknown;
};
export declare const QueryDelegatorDelegationsResponse: {
  encode(message: QueryDelegatorDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorDelegationsResponse;
  fromJSON(object: any): QueryDelegatorDelegationsResponse;
  fromPartial(object: DeepPartial<QueryDelegatorDelegationsResponse>): QueryDelegatorDelegationsResponse;
  toJSON(message: QueryDelegatorDelegationsResponse): unknown;
};
export declare const QueryDelegatorUnbondingDelegationsRequest: {
  encode(message: QueryDelegatorUnbondingDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(
    input: _m0.Reader | Uint8Array,
    length?: number | undefined,
  ): QueryDelegatorUnbondingDelegationsRequest;
  fromJSON(object: any): QueryDelegatorUnbondingDelegationsRequest;
  fromPartial(
    object: DeepPartial<QueryDelegatorUnbondingDelegationsRequest>,
  ): QueryDelegatorUnbondingDelegationsRequest;
  toJSON(message: QueryDelegatorUnbondingDelegationsRequest): unknown;
};
export declare const QueryDelegatorUnbondingDelegationsResponse: {
  encode(message: QueryDelegatorUnbondingDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(
    input: _m0.Reader | Uint8Array,
    length?: number | undefined,
  ): QueryDelegatorUnbondingDelegationsResponse;
  fromJSON(object: any): QueryDelegatorUnbondingDelegationsResponse;
  fromPartial(
    object: DeepPartial<QueryDelegatorUnbondingDelegationsResponse>,
  ): QueryDelegatorUnbondingDelegationsResponse;
  toJSON(message: QueryDelegatorUnbondingDelegationsResponse): unknown;
};
export declare const QueryRedelegationsRequest: {
  encode(message: QueryRedelegationsRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryRedelegationsRequest;
  fromJSON(object: any): QueryRedelegationsRequest;
  fromPartial(object: DeepPartial<QueryRedelegationsRequest>): QueryRedelegationsRequest;
  toJSON(message: QueryRedelegationsRequest): unknown;
};
export declare const QueryRedelegationsResponse: {
  encode(message: QueryRedelegationsResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryRedelegationsResponse;
  fromJSON(object: any): QueryRedelegationsResponse;
  fromPartial(object: DeepPartial<QueryRedelegationsResponse>): QueryRedelegationsResponse;
  toJSON(message: QueryRedelegationsResponse): unknown;
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
export declare const QueryDelegatorValidatorRequest: {
  encode(message: QueryDelegatorValidatorRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorValidatorRequest;
  fromJSON(object: any): QueryDelegatorValidatorRequest;
  fromPartial(object: DeepPartial<QueryDelegatorValidatorRequest>): QueryDelegatorValidatorRequest;
  toJSON(message: QueryDelegatorValidatorRequest): unknown;
};
export declare const QueryDelegatorValidatorResponse: {
  encode(message: QueryDelegatorValidatorResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryDelegatorValidatorResponse;
  fromJSON(object: any): QueryDelegatorValidatorResponse;
  fromPartial(object: DeepPartial<QueryDelegatorValidatorResponse>): QueryDelegatorValidatorResponse;
  toJSON(message: QueryDelegatorValidatorResponse): unknown;
};
export declare const QueryHistoricalInfoRequest: {
  encode(message: QueryHistoricalInfoRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryHistoricalInfoRequest;
  fromJSON(object: any): QueryHistoricalInfoRequest;
  fromPartial(object: DeepPartial<QueryHistoricalInfoRequest>): QueryHistoricalInfoRequest;
  toJSON(message: QueryHistoricalInfoRequest): unknown;
};
export declare const QueryHistoricalInfoResponse: {
  encode(message: QueryHistoricalInfoResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryHistoricalInfoResponse;
  fromJSON(object: any): QueryHistoricalInfoResponse;
  fromPartial(object: DeepPartial<QueryHistoricalInfoResponse>): QueryHistoricalInfoResponse;
  toJSON(message: QueryHistoricalInfoResponse): unknown;
};
export declare const QueryPoolRequest: {
  encode(_: QueryPoolRequest, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPoolRequest;
  fromJSON(_: any): QueryPoolRequest;
  fromPartial(_: DeepPartial<QueryPoolRequest>): QueryPoolRequest;
  toJSON(_: QueryPoolRequest): unknown;
};
export declare const QueryPoolResponse: {
  encode(message: QueryPoolResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryPoolResponse;
  fromJSON(object: any): QueryPoolResponse;
  fromPartial(object: DeepPartial<QueryPoolResponse>): QueryPoolResponse;
  toJSON(message: QueryPoolResponse): unknown;
};
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
/** Query defines the gRPC querier service. */
export interface Query {
  /** Validators queries all validators that match the given status. */
  Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
  /** Validator queries validator info for given validator address. */
  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse>;
  /** ValidatorDelegations queries delegate info for given validator. */
  ValidatorDelegations(request: QueryValidatorDelegationsRequest): Promise<QueryValidatorDelegationsResponse>;
  /** ValidatorUnbondingDelegations queries unbonding delegations of a validator. */
  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest,
  ): Promise<QueryValidatorUnbondingDelegationsResponse>;
  /** Delegation queries delegate info for given validator delegator pair. */
  Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse>;
  /**
   * UnbondingDelegation queries unbonding info for given validator delegator
   * pair.
   */
  UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse>;
  /** DelegatorDelegations queries all delegations of a given delegator address. */
  DelegatorDelegations(request: QueryDelegatorDelegationsRequest): Promise<QueryDelegatorDelegationsResponse>;
  /**
   * DelegatorUnbondingDelegations queries all unbonding delegations of a given
   * delegator address.
   */
  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest,
  ): Promise<QueryDelegatorUnbondingDelegationsResponse>;
  /** Redelegations queries redelegations of given address. */
  Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse>;
  /**
   * DelegatorValidators queries all validators info for given delegator
   * address.
   */
  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
  /**
   * DelegatorValidator queries validator info for given delegator validator
   * pair.
   */
  DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse>;
  /** HistoricalInfo queries the historical info for given height. */
  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse>;
  /** Pool queries the pool info. */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /** Parameters queries the staking parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export declare class QueryClientImpl implements Query {
  private readonly rpc;
  constructor(rpc: Rpc);
  Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse>;
  ValidatorDelegations(request: QueryValidatorDelegationsRequest): Promise<QueryValidatorDelegationsResponse>;
  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest,
  ): Promise<QueryValidatorUnbondingDelegationsResponse>;
  Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse>;
  UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse>;
  DelegatorDelegations(request: QueryDelegatorDelegationsRequest): Promise<QueryDelegatorDelegationsResponse>;
  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest,
  ): Promise<QueryDelegatorUnbondingDelegationsResponse>;
  Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse>;
  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
  DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse>;
  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse>;
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
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

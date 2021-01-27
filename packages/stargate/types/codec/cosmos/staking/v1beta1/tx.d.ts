import { Description, CommissionRates } from "../../../cosmos/staking/v1beta1/staking";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.staking.v1beta1";
/** MsgCreateValidator defines a SDK message for creating a new validator. */
export interface MsgCreateValidator {
  description?: Description;
  commission?: CommissionRates;
  minSelfDelegation: string;
  delegatorAddress: string;
  validatorAddress: string;
  pubkey?: Any;
  value?: Coin;
}
/** MsgCreateValidatorResponse defines the Msg/CreateValidator response type. */
export interface MsgCreateValidatorResponse {}
/** MsgEditValidator defines a SDK message for editing an existing validator. */
export interface MsgEditValidator {
  description?: Description;
  validatorAddress: string;
  /**
   * We pass a reference to the new commission rate and min self delegation as
   * it's not mandatory to update. If not updated, the deserialized rate will be
   * zero with no way to distinguish if an update was intended.
   * REF: #2373
   */
  commissionRate: string;
  minSelfDelegation: string;
}
/** MsgEditValidatorResponse defines the Msg/EditValidator response type. */
export interface MsgEditValidatorResponse {}
/**
 * MsgDelegate defines a SDK message for performing a delegation of coins
 * from a delegator to a validator.
 */
export interface MsgDelegate {
  delegatorAddress: string;
  validatorAddress: string;
  amount?: Coin;
}
/** MsgDelegateResponse defines the Msg/Delegate response type. */
export interface MsgDelegateResponse {}
/**
 * MsgBeginRedelegate defines a SDK message for performing a redelegation
 * of coins from a delegator and source validator to a destination validator.
 */
export interface MsgBeginRedelegate {
  delegatorAddress: string;
  validatorSrcAddress: string;
  validatorDstAddress: string;
  amount?: Coin;
}
/** MsgBeginRedelegateResponse defines the Msg/BeginRedelegate response type. */
export interface MsgBeginRedelegateResponse {
  completionTime?: Date;
}
/**
 * MsgUndelegate defines a SDK message for performing an undelegation from a
 * delegate and a validator.
 */
export interface MsgUndelegate {
  delegatorAddress: string;
  validatorAddress: string;
  amount?: Coin;
}
/** MsgUndelegateResponse defines the Msg/Undelegate response type. */
export interface MsgUndelegateResponse {
  completionTime?: Date;
}
export declare const MsgCreateValidator: {
  encode(message: MsgCreateValidator, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgCreateValidator;
  fromJSON(object: any): MsgCreateValidator;
  fromPartial(object: DeepPartial<MsgCreateValidator>): MsgCreateValidator;
  toJSON(message: MsgCreateValidator): unknown;
};
export declare const MsgCreateValidatorResponse: {
  encode(_: MsgCreateValidatorResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgCreateValidatorResponse;
  fromJSON(_: any): MsgCreateValidatorResponse;
  fromPartial(_: DeepPartial<MsgCreateValidatorResponse>): MsgCreateValidatorResponse;
  toJSON(_: MsgCreateValidatorResponse): unknown;
};
export declare const MsgEditValidator: {
  encode(message: MsgEditValidator, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgEditValidator;
  fromJSON(object: any): MsgEditValidator;
  fromPartial(object: DeepPartial<MsgEditValidator>): MsgEditValidator;
  toJSON(message: MsgEditValidator): unknown;
};
export declare const MsgEditValidatorResponse: {
  encode(_: MsgEditValidatorResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgEditValidatorResponse;
  fromJSON(_: any): MsgEditValidatorResponse;
  fromPartial(_: DeepPartial<MsgEditValidatorResponse>): MsgEditValidatorResponse;
  toJSON(_: MsgEditValidatorResponse): unknown;
};
export declare const MsgDelegate: {
  encode(message: MsgDelegate, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDelegate;
  fromJSON(object: any): MsgDelegate;
  fromPartial(object: DeepPartial<MsgDelegate>): MsgDelegate;
  toJSON(message: MsgDelegate): unknown;
};
export declare const MsgDelegateResponse: {
  encode(_: MsgDelegateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDelegateResponse;
  fromJSON(_: any): MsgDelegateResponse;
  fromPartial(_: DeepPartial<MsgDelegateResponse>): MsgDelegateResponse;
  toJSON(_: MsgDelegateResponse): unknown;
};
export declare const MsgBeginRedelegate: {
  encode(message: MsgBeginRedelegate, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgBeginRedelegate;
  fromJSON(object: any): MsgBeginRedelegate;
  fromPartial(object: DeepPartial<MsgBeginRedelegate>): MsgBeginRedelegate;
  toJSON(message: MsgBeginRedelegate): unknown;
};
export declare const MsgBeginRedelegateResponse: {
  encode(message: MsgBeginRedelegateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgBeginRedelegateResponse;
  fromJSON(object: any): MsgBeginRedelegateResponse;
  fromPartial(object: DeepPartial<MsgBeginRedelegateResponse>): MsgBeginRedelegateResponse;
  toJSON(message: MsgBeginRedelegateResponse): unknown;
};
export declare const MsgUndelegate: {
  encode(message: MsgUndelegate, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUndelegate;
  fromJSON(object: any): MsgUndelegate;
  fromPartial(object: DeepPartial<MsgUndelegate>): MsgUndelegate;
  toJSON(message: MsgUndelegate): unknown;
};
export declare const MsgUndelegateResponse: {
  encode(message: MsgUndelegateResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUndelegateResponse;
  fromJSON(object: any): MsgUndelegateResponse;
  fromPartial(object: DeepPartial<MsgUndelegateResponse>): MsgUndelegateResponse;
  toJSON(message: MsgUndelegateResponse): unknown;
};
/** Msg defines the staking Msg service. */
export interface Msg {
  /** CreateValidator defines a method for creating a new validator. */
  CreateValidator(request: MsgCreateValidator): Promise<MsgCreateValidatorResponse>;
  /** EditValidator defines a method for editing an existing validator. */
  EditValidator(request: MsgEditValidator): Promise<MsgEditValidatorResponse>;
  /**
   * Delegate defines a method for performing a delegation of coins
   * from a delegator to a validator.
   */
  Delegate(request: MsgDelegate): Promise<MsgDelegateResponse>;
  /**
   * BeginRedelegate defines a method for performing a redelegation
   * of coins from a delegator and source validator to a destination validator.
   */
  BeginRedelegate(request: MsgBeginRedelegate): Promise<MsgBeginRedelegateResponse>;
  /**
   * Undelegate defines a method for performing an undelegation from a
   * delegate and a validator.
   */
  Undelegate(request: MsgUndelegate): Promise<MsgUndelegateResponse>;
}
export declare class MsgClientImpl implements Msg {
  private readonly rpc;
  constructor(rpc: Rpc);
  CreateValidator(request: MsgCreateValidator): Promise<MsgCreateValidatorResponse>;
  EditValidator(request: MsgEditValidator): Promise<MsgEditValidatorResponse>;
  Delegate(request: MsgDelegate): Promise<MsgDelegateResponse>;
  BeginRedelegate(request: MsgBeginRedelegate): Promise<MsgBeginRedelegateResponse>;
  Undelegate(request: MsgUndelegate): Promise<MsgUndelegateResponse>;
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

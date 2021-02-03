import { Coin } from "../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";
import Long from "long";
export declare const protobufPackage = "cosmos.distribution.v1beta1";
/**
 * MsgSetWithdrawAddress sets the withdraw address for
 * a delegator (or validator self-delegation).
 */
export interface MsgSetWithdrawAddress {
  delegatorAddress: string;
  withdrawAddress: string;
}
/** MsgSetWithdrawAddressResponse defines the Msg/SetWithdrawAddress response type. */
export interface MsgSetWithdrawAddressResponse {}
/**
 * MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator
 * from a single validator.
 */
export interface MsgWithdrawDelegatorReward {
  delegatorAddress: string;
  validatorAddress: string;
}
/** MsgWithdrawDelegatorRewardResponse defines the Msg/WithdrawDelegatorReward response type. */
export interface MsgWithdrawDelegatorRewardResponse {}
/**
 * MsgWithdrawValidatorCommission withdraws the full commission to the validator
 * address.
 */
export interface MsgWithdrawValidatorCommission {
  validatorAddress: string;
}
/** MsgWithdrawValidatorCommissionResponse defines the Msg/WithdrawValidatorCommission response type. */
export interface MsgWithdrawValidatorCommissionResponse {}
/**
 * MsgFundCommunityPool allows an account to directly
 * fund the community pool.
 */
export interface MsgFundCommunityPool {
  amount: Coin[];
  depositor: string;
}
/** MsgFundCommunityPoolResponse defines the Msg/FundCommunityPool response type. */
export interface MsgFundCommunityPoolResponse {}
export declare const MsgSetWithdrawAddress: {
  encode(message: MsgSetWithdrawAddress, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgSetWithdrawAddress;
  fromJSON(object: any): MsgSetWithdrawAddress;
  fromPartial(object: DeepPartial<MsgSetWithdrawAddress>): MsgSetWithdrawAddress;
  toJSON(message: MsgSetWithdrawAddress): unknown;
};
export declare const MsgSetWithdrawAddressResponse: {
  encode(_: MsgSetWithdrawAddressResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgSetWithdrawAddressResponse;
  fromJSON(_: any): MsgSetWithdrawAddressResponse;
  fromPartial(_: DeepPartial<MsgSetWithdrawAddressResponse>): MsgSetWithdrawAddressResponse;
  toJSON(_: MsgSetWithdrawAddressResponse): unknown;
};
export declare const MsgWithdrawDelegatorReward: {
  encode(message: MsgWithdrawDelegatorReward, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgWithdrawDelegatorReward;
  fromJSON(object: any): MsgWithdrawDelegatorReward;
  fromPartial(object: DeepPartial<MsgWithdrawDelegatorReward>): MsgWithdrawDelegatorReward;
  toJSON(message: MsgWithdrawDelegatorReward): unknown;
};
export declare const MsgWithdrawDelegatorRewardResponse: {
  encode(_: MsgWithdrawDelegatorRewardResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgWithdrawDelegatorRewardResponse;
  fromJSON(_: any): MsgWithdrawDelegatorRewardResponse;
  fromPartial(_: DeepPartial<MsgWithdrawDelegatorRewardResponse>): MsgWithdrawDelegatorRewardResponse;
  toJSON(_: MsgWithdrawDelegatorRewardResponse): unknown;
};
export declare const MsgWithdrawValidatorCommission: {
  encode(message: MsgWithdrawValidatorCommission, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgWithdrawValidatorCommission;
  fromJSON(object: any): MsgWithdrawValidatorCommission;
  fromPartial(object: DeepPartial<MsgWithdrawValidatorCommission>): MsgWithdrawValidatorCommission;
  toJSON(message: MsgWithdrawValidatorCommission): unknown;
};
export declare const MsgWithdrawValidatorCommissionResponse: {
  encode(_: MsgWithdrawValidatorCommissionResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgWithdrawValidatorCommissionResponse;
  fromJSON(_: any): MsgWithdrawValidatorCommissionResponse;
  fromPartial(_: DeepPartial<MsgWithdrawValidatorCommissionResponse>): MsgWithdrawValidatorCommissionResponse;
  toJSON(_: MsgWithdrawValidatorCommissionResponse): unknown;
};
export declare const MsgFundCommunityPool: {
  encode(message: MsgFundCommunityPool, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgFundCommunityPool;
  fromJSON(object: any): MsgFundCommunityPool;
  fromPartial(object: DeepPartial<MsgFundCommunityPool>): MsgFundCommunityPool;
  toJSON(message: MsgFundCommunityPool): unknown;
};
export declare const MsgFundCommunityPoolResponse: {
  encode(_: MsgFundCommunityPoolResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgFundCommunityPoolResponse;
  fromJSON(_: any): MsgFundCommunityPoolResponse;
  fromPartial(_: DeepPartial<MsgFundCommunityPoolResponse>): MsgFundCommunityPoolResponse;
  toJSON(_: MsgFundCommunityPoolResponse): unknown;
};
/** Msg defines the distribution Msg service. */
export interface Msg {
  /**
   * SetWithdrawAddress defines a method to change the withdraw address
   * for a delegator (or validator self-delegation).
   */
  SetWithdrawAddress(request: MsgSetWithdrawAddress): Promise<MsgSetWithdrawAddressResponse>;
  /**
   * WithdrawDelegatorReward defines a method to withdraw rewards of delegator
   * from a single validator.
   */
  WithdrawDelegatorReward(request: MsgWithdrawDelegatorReward): Promise<MsgWithdrawDelegatorRewardResponse>;
  /**
   * WithdrawValidatorCommission defines a method to withdraw the
   * full commission to the validator address.
   */
  WithdrawValidatorCommission(
    request: MsgWithdrawValidatorCommission,
  ): Promise<MsgWithdrawValidatorCommissionResponse>;
  /**
   * FundCommunityPool defines a method to allow an account to directly
   * fund the community pool.
   */
  FundCommunityPool(request: MsgFundCommunityPool): Promise<MsgFundCommunityPoolResponse>;
}
export declare class MsgClientImpl implements Msg {
  private readonly rpc;
  constructor(rpc: Rpc);
  SetWithdrawAddress(request: MsgSetWithdrawAddress): Promise<MsgSetWithdrawAddressResponse>;
  WithdrawDelegatorReward(request: MsgWithdrawDelegatorReward): Promise<MsgWithdrawDelegatorRewardResponse>;
  WithdrawValidatorCommission(
    request: MsgWithdrawValidatorCommission,
  ): Promise<MsgWithdrawValidatorCommissionResponse>;
  FundCommunityPool(request: MsgFundCommunityPool): Promise<MsgFundCommunityPoolResponse>;
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

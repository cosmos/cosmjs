import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";

export const stakingTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.staking.v1beta1.MsgBeginRedelegate", MsgBeginRedelegate],
  ["/cosmos.staking.v1beta1.MsgCreateValidator", MsgCreateValidator],
  ["/cosmos.staking.v1beta1.MsgDelegate", MsgDelegate],
  ["/cosmos.staking.v1beta1.MsgEditValidator", MsgEditValidator],
  ["/cosmos.staking.v1beta1.MsgUndelegate", MsgUndelegate],
];

export interface MsgBeginRedelegateEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate";
  readonly value: Partial<MsgBeginRedelegate>;
}

export function isMsgBeginRedelegateEncodeObject(o: EncodeObject): o is MsgBeginRedelegateEncodeObject {
  return (o as MsgBeginRedelegateEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgBeginRedelegate";
}

export interface MsgCreateValidatorEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator";
  readonly value: Partial<MsgCreateValidator>;
}

export function isMsgCreateValidatorEncodeObject(o: EncodeObject): o is MsgCreateValidatorEncodeObject {
  return (o as MsgCreateValidatorEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgCreateValidator";
}

export interface MsgDelegateEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgDelegate";
  readonly value: Partial<MsgDelegate>;
}

export function isMsgDelegateEncodeObject(object: EncodeObject): object is MsgDelegateEncodeObject {
  return (object as MsgDelegateEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgDelegate";
}

export interface MsgEditValidatorEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator";
  readonly value: Partial<MsgEditValidator>;
}

export function isMsgEditValidatorEncodeObject(o: EncodeObject): o is MsgEditValidatorEncodeObject {
  return (o as MsgEditValidatorEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgEditValidator";
}

export interface MsgUndelegateEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate";
  readonly value: Partial<MsgUndelegate>;
}

export function isMsgUndelegateEncodeObject(object: EncodeObject): object is MsgUndelegateEncodeObject {
  return (object as MsgUndelegateEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgUndelegate";
}

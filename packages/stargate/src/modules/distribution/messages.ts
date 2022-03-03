import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "cosmjs-types/cosmos/distribution/v1beta1/tx";

export const distributionTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", MsgFundCommunityPool],
  ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", MsgSetWithdrawAddress],
  ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", MsgWithdrawDelegatorReward],
  ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", MsgWithdrawValidatorCommission],
];

export interface MsgWithdrawDelegatorRewardEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
  readonly value: Partial<MsgWithdrawDelegatorReward>;
}

export function isMsgWithdrawDelegatorRewardEncodeObject(
  object: EncodeObject,
): object is MsgWithdrawDelegatorRewardEncodeObject {
  return (
    (object as MsgWithdrawDelegatorRewardEncodeObject).typeUrl ===
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
  );
}

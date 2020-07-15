import { Coin } from "../coins";
import { LcdClient } from "./lcdclient";
export interface RewardContainer {
  readonly validator_address: string;
  readonly reward: readonly Coin[] | null;
}
export interface DistributionDelegatorRewardsResponse {
  readonly height: string;
  readonly result: {
    readonly rewards: readonly RewardContainer[] | null;
    readonly total: readonly Coin[] | null;
  };
}
export interface DistributionDelegatorRewardResponse {
  readonly height: string;
  readonly result: readonly Coin[];
}
export interface DistributionWithdrawAddressResponse {
  readonly height: string;
  readonly result: string;
}
export interface DistributionValidatorResponse {
  readonly height: string;
  readonly result: {
    readonly operator_address: string;
    readonly self_bond_rewards: readonly Coin[];
    readonly val_commission: readonly Coin[];
  };
}
export interface DistributionValidatorRewardsResponse {
  readonly height: string;
  readonly result: readonly Coin[];
}
export interface DistributionValidatorOutstandingRewardsResponse {
  readonly height: string;
  readonly result: readonly Coin[];
}
export interface DistributionParametersResponse {
  readonly height: string;
  readonly result: {
    readonly community_tax: string;
    readonly base_proposer_reward: string;
    readonly bonus_proposer_reward: string;
    readonly withdraw_addr_enabled: boolean;
  };
}
export interface DistributionCommunityPoolResponse {
  readonly height: string;
  readonly result: readonly Coin[];
}
export interface DistributionExtension {
  readonly distribution: {
    readonly delegatorRewards: (delegatorAddress: string) => Promise<DistributionDelegatorRewardsResponse>;
    readonly delegatorReward: (
      delegatorAddress: string,
      validatorAddress: string,
    ) => Promise<DistributionDelegatorRewardResponse>;
    readonly withdrawAddress: (delegatorAddress: string) => Promise<DistributionWithdrawAddressResponse>;
    readonly validator: (validatorAddress: string) => Promise<DistributionValidatorResponse>;
    readonly validatorRewards: (validatorAddress: string) => Promise<DistributionValidatorRewardsResponse>;
    readonly validatorOutstandingRewards: (
      validatorAddress: string,
    ) => Promise<DistributionValidatorOutstandingRewardsResponse>;
    readonly parameters: () => Promise<DistributionParametersResponse>;
    readonly communityPool: () => Promise<DistributionCommunityPoolResponse>;
  };
}
export declare function setupDistributionExtension(base: LcdClient): DistributionExtension;

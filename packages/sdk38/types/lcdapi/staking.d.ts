import { LcdClient } from "./lcdclient";
export interface StakingPoolResponse {
  readonly height: string;
  readonly result: {
    readonly not_bonded_tokens: string;
    readonly bonded_tokens: string;
  };
}
export interface StakingParametersResponse {
  readonly height: string;
  readonly result: {
    readonly unbonding_time: string;
    readonly max_validators: number;
    readonly max_entries: number;
    readonly historical_entries: number;
    readonly bond_denom: string;
  };
}
export interface StakingExtension {
  readonly staking: {
    readonly pool: () => Promise<StakingPoolResponse>;
    readonly parameters: () => Promise<StakingParametersResponse>;
  };
}
export declare function setupStakingExtension(base: LcdClient): StakingExtension;

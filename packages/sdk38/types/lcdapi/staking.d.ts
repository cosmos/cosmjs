import { LcdClient } from "./lcdclient";
export interface StakingValidatorsParams {
  /** @see https://github.com/cosmos/cosmos-sdk/blob/v0.38.5/types/staking.go#L43-L49 */
  readonly status?: "bonded" | "unbonded" | "unbonding";
  readonly page?: number;
  readonly limit?: number;
}
interface Validator {
  readonly operator_address: string;
  readonly consensus_pubkey: string;
  readonly jailed: boolean;
  /**
   * Numeric bonding status
   *
   * @see https://github.com/cosmos/cosmos-sdk/blob/v0.38.5/types/staking.go#L43-L49
   */
  readonly status: number;
  readonly tokens: string;
  readonly delegator_shares: string;
  readonly description: {
    readonly moniker: string;
    readonly identity: string;
    readonly website: string;
    readonly security_contact: string;
    readonly details: string;
  };
  readonly unbonding_height: string;
  readonly unbonding_time: string;
  readonly commission: {
    readonly commission_rates: {
      readonly rate: string;
      readonly max_rate: string;
      readonly max_change_rate: string;
    };
    readonly update_time: string;
  };
  readonly min_self_delegation: string;
}
export interface StakingValidatorsResponse {
  readonly height: string;
  readonly result: readonly Validator[];
}
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
    /** Get all validators */
    readonly validators: (options?: StakingValidatorsParams) => Promise<StakingValidatorsResponse>;
    /** Get the current state of the staking pool */
    readonly pool: () => Promise<StakingPoolResponse>;
    /** Get the current staking parameter values */
    readonly parameters: () => Promise<StakingParametersResponse>;
  };
}
export declare function setupStakingExtension(base: LcdClient): StakingExtension;
export {};

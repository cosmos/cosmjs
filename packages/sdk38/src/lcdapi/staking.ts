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
    // Get all delegations from a delegator
    // /staking/delegators/{delegatorAddr}/delegations

    // Get all unbonding delegations from a delegator
    // /staking/delegators/{delegatorAddr}/unbonding_delegations

    // Get all staking txs (i.e msgs) from a delegator
    // /staking/delegators/{delegatorAddr}/txs

    // Query all validators that a delegator is bonded to
    // /staking/delegators/{delegatorAddr}/validators

    // Query a validator that a delegator is bonded to
    // /staking/delegators/{delegatorAddr}/validators/{validatorAddr}

    // Query a delegation between a delegator and a validator
    // /staking/delegators/{delegatorAddr}/delegations/{validatorAddr}

    // Query all unbonding delegations between a delegator and a validator
    // /staking/delegators/{delegatorAddr}/unbonding_delegations/{validatorAddr}

    // Query redelegations (filters in query params)
    // /staking/redelegations

    // Get all validators
    // /staking/validators

    // Get a single validator info
    // /staking/validators/{validatorAddr}

    // Get all delegations to a validator
    // "/staking/validators/{validatorAddr}/delegations

    // Get all unbonding delegations from a validator
    // /staking/validators/{validatorAddr}/unbonding_delegations

    // Get HistoricalInfo at a given height
    // /staking/historical_info/{height}

    /** Get the current state of the staking pool */
    readonly pool: () => Promise<StakingPoolResponse>;
    /** Get the current staking parameter values */
    readonly parameters: () => Promise<StakingParametersResponse>;
  };
}

export function setupStakingExtension(base: LcdClient): StakingExtension {
  return {
    staking: {
      pool: async () => base.get(`/staking/pool`),
      parameters: async () => base.get(`/staking/parameters`),
    },
  };
}

/* eslint-disable @typescript-eslint/naming-convention */
import { LcdClient } from "./lcdclient";

export interface MintParametersResponse {
  readonly height: string;
  readonly result: {
    readonly mint_denom: string;
    readonly inflation_rate_change: string;
    readonly inflation_max: string;
    readonly inflation_min: string;
    readonly goal_bonded: string;
    readonly blocks_per_year: string;
  };
}

export interface MintInflationResponse {
  readonly height: string;
  readonly result: string;
}

export interface MintAnnualProvisionsResponse {
  readonly height: string;
  readonly result: string;
}

export interface MintExtension {
  readonly mint: {
    readonly parameters: () => Promise<MintParametersResponse>;
    readonly inflation: () => Promise<MintInflationResponse>;
    readonly annualProvisions: () => Promise<MintAnnualProvisionsResponse>;
  };
}

export function setupMintExtension(base: LcdClient): MintExtension {
  return {
    mint: {
      parameters: async () => base.get(`/minting/parameters`),
      inflation: async () => base.get(`/minting/inflation`),
      annualProvisions: async () => base.get(`/minting/annual-provisions`),
    },
  };
}

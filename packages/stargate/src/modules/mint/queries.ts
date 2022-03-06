import { Decimal } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";
import { Params } from "cosmjs-types/cosmos/mint/v1beta1/mint";
import { QueryClientImpl } from "cosmjs-types/cosmos/mint/v1beta1/query";

import { createProtobufRpcClient, decodeCosmosSdkDecFromProto, QueryClient } from "../../queryclient";

/**
 * Like Params from "cosmjs-types/cosmos/mint/v1beta1/mint"
 * but using decimal types.
 */
export interface MintParams extends Pick<Params, "blocksPerYear" | "mintDenom"> {
  readonly goalBonded: Decimal;
  readonly inflationMin: Decimal;
  readonly inflationMax: Decimal;
  readonly inflationRateChange: Decimal;
}

export interface MintExtension {
  readonly mint: {
    readonly params: () => Promise<MintParams>;
    readonly inflation: () => Promise<Decimal>;
    readonly annualProvisions: () => Promise<Decimal>;
  };
}

export function setupMintExtension(base: QueryClient): MintExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    mint: {
      params: async (): Promise<MintParams> => {
        const { params } = await queryService.Params({});
        assert(params);

        return {
          blocksPerYear: params.blocksPerYear,
          goalBonded: decodeCosmosSdkDecFromProto(params.goalBonded),
          inflationMin: decodeCosmosSdkDecFromProto(params.inflationMin),
          inflationMax: decodeCosmosSdkDecFromProto(params.inflationMax),
          inflationRateChange: decodeCosmosSdkDecFromProto(params.inflationRateChange),
          mintDenom: params.mintDenom,
        };
      },
      inflation: async () => {
        const { inflation } = await queryService.Inflation({});
        return decodeCosmosSdkDecFromProto(inflation);
      },
      annualProvisions: async () => {
        const { annualProvisions } = await queryService.AnnualProvisions({});
        return decodeCosmosSdkDecFromProto(annualProvisions);
      },
    },
  };
}

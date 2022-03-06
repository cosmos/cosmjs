/* eslint-disable @typescript-eslint/naming-convention */
import {
  QueryParamsResponse,
  QuerySigningInfoResponse,
  QuerySigningInfosResponse,
} from "cosmjs-types/cosmos/slashing/v1beta1/query";
import { QueryClientImpl } from "cosmjs-types/cosmos/slashing/v1beta1/query";

import { createPagination, createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface SlashingExtension {
  readonly slashing: {
    signingInfo: (consAddress: string) => Promise<QuerySigningInfoResponse>;
    signingInfos: (paginationKey?: Uint8Array) => Promise<QuerySigningInfosResponse>;
    params: () => Promise<QueryParamsResponse>;
  };
}

export function setupSlashingExtension(base: QueryClient): SlashingExtension {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    slashing: {
      signingInfo: async (consAddress: string) => {
        const response = await queryService.SigningInfo({
          consAddress: consAddress,
        });
        return response;
      },
      signingInfos: async (paginationKey?: Uint8Array) => {
        const response = await queryService.SigningInfos({
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      params: async () => {
        const response = await queryService.Params({});
        return response;
      },
    },
  };
}

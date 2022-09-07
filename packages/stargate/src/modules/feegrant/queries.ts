import {
  QueryAllowanceResponse,
  QueryAllowancesResponse,
  QueryClientImpl,
} from "cosmjs-types/cosmos/feegrant/v1beta1/query";

import { createPagination, createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface FeegrantExtension {
  readonly feegrant: {
    readonly allowance: (granter: string, grantee: string) => Promise<QueryAllowanceResponse>;
    readonly allowances: (grantee: string, paginationKey?: Uint8Array) => Promise<QueryAllowancesResponse>;
  };
}

export function setupFeegrantExtension(base: QueryClient): FeegrantExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    feegrant: {
      allowance: async (granter: string, grantee: string) => {
        const response = await queryService.Allowance({
          granter: granter,
          grantee: grantee,
        });
        return response;
      },
      allowances: async (grantee: string, paginationKey?: Uint8Array) => {
        const response = await queryService.Allowances({
          grantee: grantee,
          pagination: createPagination(paginationKey),
        });
        return response;
      },
    },
  };
}

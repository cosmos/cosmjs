import { QueryClientImpl, QueryGrantsResponse } from "cosmjs-types/cosmos/authz/v1beta1/query";

import { createPagination, createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface AuthzExtension {
  readonly authz: {
    readonly grants: (
      granter: string,
      grantee: string,
      msgTypeUrl: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryGrantsResponse>;
  };
}

export function setupAuthzExtension(base: QueryClient): AuthzExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    authz: {
      grants: async (granter: string, grantee: string, msgTypeUrl: string, paginationKey?: Uint8Array) => {
        const response = await queryService.Grants({
          granter: granter,
          grantee: grantee,
          msgTypeUrl: msgTypeUrl,
          pagination: createPagination(paginationKey),
        });

        return response;
      },
    },
  };
}

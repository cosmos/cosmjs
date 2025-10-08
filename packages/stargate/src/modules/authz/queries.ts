import {
  QueryClientImpl,
  QueryGranteeGrantsResponse,
  QueryGranterGrantsResponse,
  QueryGrantsResponse,
} from "cosmjs-types/cosmos/authz/v1beta1/query.js";

import { createPagination, createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface AuthzExtension {
  readonly authz: {
    readonly grants: (
      granter: string,
      grantee: string,
      msgTypeUrl: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryGrantsResponse>;
    readonly granteeGrants: (
      grantee: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryGranteeGrantsResponse>;
    readonly granterGrants: (
      granter: string,
      paginationKey?: Uint8Array,
    ) => Promise<QueryGranterGrantsResponse>;
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
        return await queryService.Grants({
          granter: granter,
          grantee: grantee,
          msgTypeUrl: msgTypeUrl,
          pagination: createPagination(paginationKey),
        });
      },
      granteeGrants: async (grantee: string, paginationKey?: Uint8Array) => {
        return await queryService.GranteeGrants({
          grantee: grantee,
          pagination: createPagination(paginationKey),
        });
      },
      granterGrants: async (granter: string, paginationKey?: Uint8Array) => {
        return await queryService.GranterGrants({
          granter: granter,
          pagination: createPagination(paginationKey),
        });
      },
    },
  };
}

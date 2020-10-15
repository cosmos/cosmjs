/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from "@cosmjs/utils";

import { cosmos, google } from "../codec";
import { QueryClient } from "./queryclient";
import { toAccAddress, toObject } from "./utils";

const { BaseAccount, Query } = cosmos.auth.v1beta1;

export interface AuthExtension {
  readonly auth: {
    readonly account: (address: string) => Promise<cosmos.auth.v1beta1.IBaseAccount | null>;
    readonly unverified: {
      readonly account: (address: string) => Promise<cosmos.auth.v1beta1.IBaseAccount | null>;
    };
  };
}

export function setupAuthExtension(base: QueryClient): AuthExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification
  const queryService = Query.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/cosmos.auth.v1beta1.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });

  return {
    auth: {
      account: async (address: string) => {
        // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L29-L32
        const key = Uint8Array.from([0x01, ...toAccAddress(address)]);
        const responseData = await base.queryVerified("acc", key);
        if (responseData.length === 0) return null;
        const account = google.protobuf.Any.decode(responseData);
        switch (account.type_url) {
          case "/cosmos.auth.v1beta1.BaseAccount": {
            return toObject(BaseAccount.decode(account.value));
          }
          default:
            throw new Error(`Unsupported type: '${account.type_url}'`);
        }
      },
      unverified: {
        account: async (address: string) => {
          const { account } = await queryService.account({ address: address });
          if (!account) return null;
          switch (account.type_url) {
            case "/cosmos.auth.v1beta1.BaseAccount": {
              assert(account.value);
              return toObject(BaseAccount.decode(account.value));
            }
            default:
              throw new Error(`Unsupported type: '${account.type_url}'`);
          }
        },
      },
    },
  };
}

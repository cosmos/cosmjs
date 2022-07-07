/* eslint-disable @typescript-eslint/naming-convention */
import { toAscii } from "@cosmjs/encoding";
import { Tendermint35Client } from "@cosmjs/tendermint-rpc";
import { Metadata } from "cosmjs-types/cosmos/bank/v1beta1/bank";
import { QueryAllBalancesRequest, QueryAllBalancesResponse } from "cosmjs-types/cosmos/bank/v1beta1/query";

import { pendingWithoutSimapp, simapp, unused } from "../testutils.spec";
import { QueryClient } from "./queryclient";

async function makeClient(rpcUrl: string): Promise<[QueryClient, Tendermint35Client]> {
  const tmClient = await Tendermint35Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient), tmClient];
}

/**
 * See
 * - https://github.com/cosmos/cosmos-sdk/blob/v0.42.10/x/bank/types/key.go#L27
 * - https://github.com/cosmos/cosmos-sdk/blob/v0.44.2/x/bank/types/key.go#L28
 */
const denomMetadataPrefix = new Uint8Array([0x01]);

describe("QueryClient", () => {
  describe("queryVerified", () => {
    it("works via WebSockets", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClient(simapp.tendermintUrlWs);

      // "keys before 0.45 had denom two times in the key"
      // https://github.com/cosmos/cosmos-sdk/blob/10ad61a4dd/x/bank/migrations/v045/store_test.go#L91
      const key = Uint8Array.from([
        ...denomMetadataPrefix,
        ...toAscii(simapp.denomFee),
        ...toAscii(simapp.denomFee),
      ]);
      const data = await client.queryVerified("bank", key);

      const response = Metadata.decode(data);
      expect(response.base).toEqual(simapp.denomFee);
      expect(response.description).toEqual("The fee token of this test chain");

      tmClient.disconnect();
    });

    it("works via http", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClient(simapp.tendermintUrlHttp);

      // "keys before 0.45 had denom two times in the key"
      // https://github.com/cosmos/cosmos-sdk/blob/10ad61a4dd/x/bank/migrations/v045/store_test.go#L91
      const key = Uint8Array.from([
        ...denomMetadataPrefix,
        ...toAscii(simapp.denomFee),
        ...toAscii(simapp.denomFee),
      ]);
      const data = await client.queryVerified("bank", key);

      const response = Metadata.decode(data);
      expect(response.base).toEqual(simapp.denomFee);
      expect(response.description).toEqual("The fee token of this test chain");

      tmClient.disconnect();
    });
  });

  describe("queryUnverified", () => {
    it("works via WebSockets", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClient(simapp.tendermintUrlWs);

      const requestData = Uint8Array.from(
        QueryAllBalancesRequest.encode({ address: unused.address }).finish(),
      );
      const data = await client.queryUnverified(`/cosmos.bank.v1beta1.Query/AllBalances`, requestData);
      const response = QueryAllBalancesResponse.decode(data);
      expect(response.balances.length).toEqual(2);

      tmClient.disconnect();
    });

    it("works via http", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClient(simapp.tendermintUrlHttp);

      const requestData = Uint8Array.from(
        QueryAllBalancesRequest.encode({ address: unused.address }).finish(),
      );
      const data = await client.queryUnverified(`/cosmos.bank.v1beta1.Query/AllBalances`, requestData);
      const response = QueryAllBalancesResponse.decode(data);
      expect(response.balances.length).toEqual(2);

      tmClient.disconnect();
    });
  });
});

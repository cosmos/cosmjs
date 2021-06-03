/* eslint-disable @typescript-eslint/naming-convention */
import { toAscii } from "@cosmjs/encoding";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryAllBalancesRequest, QueryAllBalancesResponse } from "cosmjs-types/cosmos/bank/v1beta1/query";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import { nonNegativeIntegerMatcher, pendingWithoutSimapp, simapp, unused } from "../testutils.spec";
import { QueryClient } from "./queryclient";
import { toAccAddress } from "./utils";

async function makeClient(rpcUrl: string): Promise<[QueryClient, Tendermint34Client]> {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient), tmClient];
}

describe("QueryClient", () => {
  describe("queryVerified", () => {
    it("works via WebSockets", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClient(simapp.tendermintUrlWs);

      const key = Uint8Array.from([
        ...toAscii("balances"),
        ...toAccAddress(unused.address),
        ...toAscii(simapp.denomFee),
      ]);
      const data = await client.queryVerified("bank", key);
      const response = Coin.decode(data);
      expect(response.amount).toMatch(nonNegativeIntegerMatcher);
      expect(response.denom).toEqual(simapp.denomFee);

      tmClient.disconnect();
    });

    it("works via http", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClient(simapp.tendermintUrlHttp);

      const key = Uint8Array.from([
        ...toAscii("balances"),
        ...toAccAddress(unused.address),
        ...toAscii(simapp.denomFee),
      ]);
      const data = await client.queryVerified("bank", key);
      const response = Coin.decode(data);
      expect(response.amount).toMatch(nonNegativeIntegerMatcher);
      expect(response.denom).toEqual(simapp.denomFee);

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

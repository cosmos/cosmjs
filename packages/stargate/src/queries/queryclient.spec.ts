import { toAscii } from "@cosmjs/encoding";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";

import { cosmos } from "../codec";
import { nonNegativeIntegerMatcher, pendingWithoutSimapp, simapp, unused } from "../testutils.spec";
import { QueryClient } from "./queryclient";
import { toAccAddress } from "./utils";

async function makeClient(rpcUrl: string): Promise<[QueryClient, TendermintClient]> {
  const tmClient = await TendermintClient.connect(rpcUrl);
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
      const response = cosmos.Coin.decode(data);
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
      const response = cosmos.Coin.decode(data);
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
        cosmos.bank.QueryAllBalancesRequest.encode({ address: toAccAddress(unused.address) }).finish(),
      );
      const data = await client.queryUnverified(`/cosmos.bank.Query/AllBalances`, requestData);
      const response = cosmos.bank.QueryAllBalancesResponse.decode(data);
      expect(response.balances.length).toEqual(2);

      tmClient.disconnect();
    });

    it("works via http", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClient(simapp.tendermintUrlHttp);

      const requestData = Uint8Array.from(
        cosmos.bank.QueryAllBalancesRequest.encode({ address: toAccAddress(unused.address) }).finish(),
      );
      const data = await client.queryUnverified(`/cosmos.bank.Query/AllBalances`, requestData);
      const response = cosmos.bank.QueryAllBalancesResponse.decode(data);
      expect(response.balances.length).toEqual(2);

      tmClient.disconnect();
    });
  });
});

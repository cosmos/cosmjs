/* eslint-disable @typescript-eslint/naming-convention */
import { coin } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { CometClient, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
  QueryBalanceRequest,
  QueryBalanceResponse,
} from "cosmjs-types/cosmos/bank/v1beta1/query";

import { SigningStargateClient } from "../signingstargateclient";
import {
  defaultSigningClientOptions,
  faucet,
  makeRandomAddress,
  pendingWithoutSimapp,
  simapp,
  unused,
} from "../testutils.spec";
import { QueryClient } from "./queryclient";

async function makeClient(rpcUrl: string): Promise<[QueryClient, CometClient]> {
  const cometClient = await Tendermint34Client.connect(rpcUrl);
  return [QueryClient.withExtensions(cometClient), cometClient];
}

describe("QueryClient", () => {
  describe("queryAbci", () => {
    it("works via WebSockets", async () => {
      pendingWithoutSimapp();
      const [client, cometClient] = await makeClient(simapp.tendermintUrlWs);

      const requestData = Uint8Array.from(
        QueryAllBalancesRequest.encode(
          QueryAllBalancesRequest.fromPartial({ address: unused.address }),
        ).finish(),
      );
      const { value } = await client.queryAbci(`/cosmos.bank.v1beta1.Query/AllBalances`, requestData);
      const response = QueryAllBalancesResponse.decode(value);
      expect(response.balances.length).toEqual(2);

      cometClient.disconnect();
    });

    it("works via http", async () => {
      pendingWithoutSimapp();
      const [client, cometClient] = await makeClient(simapp.tendermintUrlHttp);

      const requestData = Uint8Array.from(
        QueryAllBalancesRequest.encode(
          QueryAllBalancesRequest.fromPartial({ address: unused.address }),
        ).finish(),
      );
      const { value } = await client.queryAbci(`/cosmos.bank.v1beta1.Query/AllBalances`, requestData);
      const response = QueryAllBalancesResponse.decode(value);
      expect(response.balances.length).toEqual(2);

      cometClient.disconnect();
    });

    it("works for height", async () => {
      pendingWithoutSimapp();
      const [queryClient, cometClient] = await makeClient(simapp.tendermintUrlHttp);

      const joe = makeRandomAddress();
      const h1 = (await cometClient.status()).syncInfo.latestBlockHeight;

      // Send tokens to `recipient`
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrlHttp,
        wallet,
        defaultSigningClientOptions,
      );
      const amount = coin(332211, simapp.denomFee);
      await client.sendTokens(faucet.address0, joe, [amount], "auto");

      const h2 = (await cometClient.status()).syncInfo.latestBlockHeight;
      assert(h1 < h2);

      // Query with no height
      {
        const requestData = QueryBalanceRequest.encode({ address: joe, denom: simapp.denomFee }).finish();
        const { value, height } = await queryClient.queryAbci(
          `/cosmos.bank.v1beta1.Query/Balance`,
          requestData,
        );
        const response = QueryBalanceResponse.decode(value);
        expect(response.balance).toEqual(amount);
        expect(height).toEqual(h2);
      }

      // Query at h2 (after send)
      {
        const requestData = QueryBalanceRequest.encode({ address: joe, denom: simapp.denomFee }).finish();
        const { value, height } = await queryClient.queryAbci(
          `/cosmos.bank.v1beta1.Query/Balance`,
          requestData,
          h2,
        );
        const response = QueryBalanceResponse.decode(value);
        expect(response.balance).toEqual(amount);
        expect(height).toEqual(h2);
      }

      // Query at h1 (before send)
      {
        const requestData = QueryBalanceRequest.encode({ address: joe, denom: simapp.denomFee }).finish();
        const { value, height } = await queryClient.queryAbci(
          `/cosmos.bank.v1beta1.Query/Balance`,
          requestData,
          h1,
        );
        const response = QueryBalanceResponse.decode(value);
        expect(response.balance).toEqual({ amount: "0", denom: simapp.denomFee });
        expect(height).toEqual(h1);
      }

      cometClient.disconnect();
    });
  });
});

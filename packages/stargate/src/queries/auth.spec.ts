import { encodeAminoPubkey } from "@cosmjs/launchpad";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import Long from "long";

import { nonExistentAddress, pendingWithoutSimapp, simapp, unused, validator } from "../testutils.spec";
import { AuthExtension, setupAuthExtension } from "./auth";
import { QueryClient } from "./queryclient";
import { toAccAddress } from "./utils";

async function makeClientWithAuth(rpcUrl: string): Promise<[QueryClient & AuthExtension, TendermintClient]> {
  const tmClient = await TendermintClient.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupAuthExtension), tmClient];
}

describe("AuthExtension", () => {
  describe("account", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);

      const account = await client.auth.account(unused.address);
      assert(account);

      expect(account).toEqual({
        address: toAccAddress(unused.address),
        // pubKey not set
        accountNumber: Long.fromNumber(unused.accountNumber, true),
        // sequence not set
      });

      tmClient.disconnect();
    });

    it("works for account with pubkey and non-zero sequence", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);

      const account = await client.auth.account(validator.address);
      assert(account);
      expect(account).toEqual({
        address: toAccAddress(validator.address),
        pubKey: encodeAminoPubkey(validator.pubkey),
        // accountNumber not set
        sequence: Long.fromNumber(validator.sequence, true),
      });

      tmClient.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);

      const account = await client.auth.account(nonExistentAddress);
      expect(account).toBeNull();

      tmClient.disconnect();
    });
  });

  describe("unverified", () => {
    describe("account", () => {
      it("works for unused account", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);

        const account = await client.auth.unverified.account(unused.address);
        assert(account);
        expect(account).toEqual({
          address: toAccAddress(unused.address),
          // pubKey not set
          accountNumber: Long.fromNumber(unused.accountNumber, true),
          // sequence not set
        });

        tmClient.disconnect();
      });

      it("works for account with pubkey and non-zero sequence", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);

        const account = await client.auth.unverified.account(validator.address);
        assert(account);
        expect(account).toEqual({
          address: toAccAddress(validator.address),
          pubKey: encodeAminoPubkey(validator.pubkey),
          // accountNumber not set
          sequence: Long.fromNumber(validator.sequence, true),
        });

        tmClient.disconnect();
      });

      it("returns null for non-existent address", async () => {
        pending("This fails with Error: Query failed with (1): internal");
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);

        const account = await client.auth.unverified.account(nonExistentAddress);
        expect(account).toBeNull();

        tmClient.disconnect();
      });
    });
  });
});

/* eslint-disable @typescript-eslint/naming-convention */
import { encodePubkey } from "@cosmjs/proto-signing";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import Long from "long";

import { Any } from "../codec/google/protobuf/any";
import { nonExistentAddress, pendingWithoutSimapp, simapp, unused, validator } from "../testutils.spec";
import { AuthExtension, setupAuthExtension } from "./auth";
import { QueryClient } from "./queryclient";

async function makeClientWithAuth(
  rpcUrl: string,
): Promise<[QueryClient & AuthExtension, Tendermint34Client]> {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
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
        address: unused.address,
        // pubKey not set
        accountNumber: Long.fromNumber(unused.accountNumber, true),
        sequence: Long.fromNumber(0, true),
      });

      tmClient.disconnect();
    });

    it("works for account with pubkey and non-zero sequence", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);
      const account = await client.auth.account(validator.delegatorAddress);
      assert(account);

      const pubkey = encodePubkey(validator.pubkey);
      expect(account).toEqual({
        address: validator.delegatorAddress,
        pubKey: Any.fromPartial(pubkey),
        accountNumber: Long.fromNumber(0, true),
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
          address: unused.address,
          // pubKey not set
          accountNumber: Long.fromNumber(unused.accountNumber, true),
          sequence: Long.fromNumber(0, true),
        });

        tmClient.disconnect();
      });

      it("works for account with pubkey and non-zero sequence", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);
        const account = await client.auth.unverified.account(validator.delegatorAddress);
        assert(account);

        const pubkey = encodePubkey(validator.pubkey);
        expect(account).toEqual({
          address: validator.delegatorAddress,
          pubKey: Any.fromPartial(pubkey),
          accountNumber: Long.fromNumber(0, true),
          sequence: Long.fromNumber(validator.sequence, true),
        });

        tmClient.disconnect();
      });

      it("returns null for non-existent address", async () => {
        pendingWithoutSimapp();
        const [client, tmClient] = await makeClientWithAuth(simapp.tendermintUrl);

        await expectAsync(client.auth.unverified.account(nonExistentAddress)).toBeRejectedWithError(
          /account cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd not found/i,
        );

        tmClient.disconnect();
      });
    });
  });
});

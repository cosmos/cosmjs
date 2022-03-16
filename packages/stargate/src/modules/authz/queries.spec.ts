import { makeCosmoshubPath } from "@cosmjs/amino";
import { coins, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { sleep } from "@cosmjs/utils";
import { GenericAuthorization } from "cosmjs-types/cosmos/authz/v1beta1/authz";

import { QueryClient } from "../../queryclient";
import { SigningStargateClient } from "../../signingstargateclient";
import { assertIsDeliverTxSuccess } from "../../stargateclient";
import {
  defaultSigningClientOptions,
  faucet,
  pendingWithoutSimapp44,
  simapp,
  simapp44Enabled,
} from "../../testutils.spec";
import { AuthzExtension, setupAuthzExtension } from "./queries";

async function makeClientWithAuthz(
  rpcUrl: string,
): Promise<[QueryClient & AuthzExtension, Tendermint34Client]> {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupAuthzExtension), tmClient];
}

describe("AuthzExtension", () => {
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };
  const granter1Address = faucet.address1;
  const grantee1Address = faucet.address2;

  beforeAll(async () => {
    if (simapp44Enabled()) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic, {
        // Use address 1 and 2 instead of 0 to avoid conflicts with other delegation tests
        // This must match `voterAddress` above.
        hdPaths: [makeCosmoshubPath(1), makeCosmoshubPath(2)],
      });
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrl,
        wallet,
        defaultSigningClientOptions,
      );

      const grantMsg = {
        typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
        value: {
          granter: granter1Address,
          grantee: grantee1Address,
          grant: {
            authorization: {
              typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
              value: GenericAuthorization.encode(
                GenericAuthorization.fromPartial({
                  msg: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                }),
              ).finish(),
            },
          },
        },
      };
      const grantResult = await client.signAndBroadcast(
        granter1Address,
        [grantMsg],
        defaultFee,
        "Test grant for simd",
      );
      assertIsDeliverTxSuccess(grantResult);
      await sleep(75); // wait until transactions are indexed

      client.disconnect();
    }
  });

  describe("grants", () => {
    it("works", async () => {
      pendingWithoutSimapp44();
      const [client, tmClient] = await makeClientWithAuthz(simapp.tendermintUrl);

      const response = await client.authz.grants(granter1Address, grantee1Address, "");
      expect(response).not.toBeUndefined();
      expect(response).not.toBeNull();
      tmClient.disconnect();
    });
  });
});

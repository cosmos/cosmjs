import { makeCosmoshubPath } from "@cosmjs/amino";
import { coins, DirectEthSecp256k1HdWallet, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { CometClient, connectComet } from "@cosmjs/tendermint-rpc";
import { assertDefined, sleep } from "@cosmjs/utils";
import { GenericAuthorization } from "cosmjs-types/cosmos/authz/v1beta1/authz";

import { QueryClient } from "../../queryclient";
import { SigningStargateClient } from "../../signingstargateclient";
import { assertIsDeliverTxSuccess } from "../../stargateclient";
import {
  defaultSigningClientOptions,
  evmd,
  evmdEnabled,
  evmfaucet,
  evmSigningClientOptions,
  faucet,
  makeRandomAddress,
  simapp,
  simappEnabled,
} from "../../testutils";
import { AuthzExtension, setupAuthzExtension } from "./queries";

async function makeClientWithAuthz(rpcUrl: string): Promise<[QueryClient & AuthzExtension, CometClient]> {
  const cometClient = await connectComet(rpcUrl);
  return [QueryClient.withExtensions(cometClient, setupAuthzExtension), cometClient];
}

(simappEnabled ? describe : xdescribe)("AuthzExtension", () => {
  const defaultFee = {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  };
  const granter1Address = faucet.address1;
  const grantee1Address = makeRandomAddress();

  const grantedMsg = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";

  beforeAll(async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic, {
      // Use address 1 and 2 instead of 0 to avoid conflicts with other delegation tests
      // This must match `voterAddress` above.
      hdPaths: [makeCosmoshubPath(1), makeCosmoshubPath(2)],
    });
    const client = await SigningStargateClient.connectWithSigner(
      simapp.tendermintUrlHttp,
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
                msg: grantedMsg,
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
  });

  describe("grants", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithAuthz(simapp.tendermintUrlHttp);
      const response = await client.authz.grants(granter1Address, grantee1Address, "");
      expect(response.grants.length).toEqual(1);
      const grant = response.grants[0];

      // Needs to respond with a grant
      assertDefined(grant.authorization);

      // Needs to be GenericAuthorization to decode it below
      expect(grant.authorization.typeUrl).toEqual("/cosmos.authz.v1beta1.GenericAuthorization");

      // Decode the message
      const msgDecoded = GenericAuthorization.decode(grant.authorization.value).msg;

      // Check if it's the same one then we granted
      expect(msgDecoded).toEqual(grantedMsg);

      cometClient.disconnect();
    });
  });

  describe("granter grants", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithAuthz(simapp.tendermintUrlHttp);
      const response = await client.authz.granterGrants(granter1Address);
      expect(response.grants.length).toBeGreaterThanOrEqual(1);
      const grant = response.grants.find(
        (g) => g.granter == granter1Address && g.grantee === grantee1Address,
      );
      assertDefined(grant, "Grant not found");

      // Needs to respond with a grant
      assertDefined(grant.authorization);

      // Needs to have the correct granter and grantee
      expect(grant.granter).toEqual(granter1Address);
      expect(grant.grantee).toEqual(grantee1Address);

      // Needs to be GenericAuthorization to decode it below
      expect(grant.authorization.typeUrl).toEqual("/cosmos.authz.v1beta1.GenericAuthorization");

      // Decode the message
      const msgDecoded = GenericAuthorization.decode(grant.authorization.value).msg;

      // Check if it's the same one then we granted
      expect(msgDecoded).toEqual(grantedMsg);

      cometClient.disconnect();
    });
  });

  describe("grantee grants", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithAuthz(simapp.tendermintUrlHttp);
      const response = await client.authz.granteeGrants(grantee1Address);
      expect(response.grants.length).toEqual(1);
      const grant = response.grants[0];

      // Needs to respond with a grant
      assertDefined(grant.authorization);

      // Needs to have the correct granter and grantee
      expect(grant.granter).toEqual(granter1Address);
      expect(grant.grantee).toEqual(grantee1Address);

      // Needs to be GenericAuthorization to decode it below
      expect(grant.authorization.typeUrl).toEqual("/cosmos.authz.v1beta1.GenericAuthorization");

      // Decode the message
      const msgDecoded = GenericAuthorization.decode(grant.authorization.value).msg;

      // Check if it's the same one then we granted
      expect(msgDecoded).toEqual(grantedMsg);

      cometClient.disconnect();
    });
  });
});

(evmdEnabled ? describe : xdescribe)("AuthzExtension (evmd)", () => {
  const defaultFee = {
    amount: coins(25000, "atest"),
    gas: "1500000", // 1.5 million
  };
  const granter1Address = evmfaucet.address0;
  const grantee1Address = makeRandomAddress();

  const grantedMsg = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";

  beforeAll(async () => {
    const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(evmfaucet.mnemonic);
    const client = await SigningStargateClient.connectWithSigner(
      evmd.tendermintUrlHttp,
      wallet,
      evmSigningClientOptions,
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
                msg: grantedMsg,
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
      "Test grant for evmd",
    );
    assertIsDeliverTxSuccess(grantResult);
    await sleep(75); // wait until transactions are indexed

    client.disconnect();
  });

  describe("grants", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithAuthz(evmd.tendermintUrlHttp);
      const response = await client.authz.grants(granter1Address, grantee1Address, "");
      expect(response.grants.length).toEqual(1);
      const grant = response.grants[0];

      // Needs to respond with a grant
      assertDefined(grant.authorization);

      // Needs to be GenericAuthorization to decode it below
      expect(grant.authorization.typeUrl).toEqual("/cosmos.authz.v1beta1.GenericAuthorization");

      // Decode the message
      const msgDecoded = GenericAuthorization.decode(grant.authorization.value).msg;

      // Check if it's the same one then we granted
      expect(msgDecoded).toEqual(grantedMsg);

      cometClient.disconnect();
    });
  });

  describe("granter grants", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithAuthz(evmd.tendermintUrlHttp);
      const response = await client.authz.granterGrants(granter1Address);
      expect(response.grants.length).toBeGreaterThanOrEqual(1);
      const grant = response.grants.find(
        (g) => g.granter == granter1Address && g.grantee === grantee1Address,
      );
      assertDefined(grant, "Grant not found");

      // Needs to respond with a grant
      assertDefined(grant.authorization);

      // Needs to have the correct granter and grantee
      expect(grant.granter).toEqual(granter1Address);
      expect(grant.grantee).toEqual(grantee1Address);

      // Needs to be GenericAuthorization to decode it below
      expect(grant.authorization.typeUrl).toEqual("/cosmos.authz.v1beta1.GenericAuthorization");

      // Decode the message
      const msgDecoded = GenericAuthorization.decode(grant.authorization.value).msg;

      // Check if it's the same one then we granted
      expect(msgDecoded).toEqual(grantedMsg);

      cometClient.disconnect();
    });
  });

  describe("grantee grants", () => {
    it("works", async () => {
      const [client, cometClient] = await makeClientWithAuthz(evmd.tendermintUrlHttp);
      const response = await client.authz.granteeGrants(grantee1Address);
      expect(response.grants.length).toEqual(1);
      const grant = response.grants[0];

      // Needs to respond with a grant
      assertDefined(grant.authorization);

      // Needs to have the correct granter and grantee
      expect(grant.granter).toEqual(granter1Address);
      expect(grant.grantee).toEqual(grantee1Address);

      // Needs to be GenericAuthorization to decode it below
      expect(grant.authorization.typeUrl).toEqual("/cosmos.authz.v1beta1.GenericAuthorization");

      // Decode the message
      const msgDecoded = GenericAuthorization.decode(grant.authorization.value).msg;

      // Check if it's the same one then we granted
      expect(msgDecoded).toEqual(grantedMsg);

      cometClient.disconnect();
    });
  });
});

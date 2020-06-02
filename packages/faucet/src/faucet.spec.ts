import { CosmosCodec, CosmosConnection, TokenConfiguration } from "@cosmwasm/bcp";
import { Address, ChainId, Identity, TokenTicker } from "@iov/bcp";
import { Random } from "@iov/crypto";
import { Bech32 } from "@iov/encoding";
import { UserProfile } from "@iov/keycontrol";
import { assert } from "@iov/utils";

import { Faucet } from "./faucet";
import { createUserProfile } from "./profile";

function pendingWithoutWasmd(): void {
  if (!process.env.WASMD_ENABLED) {
    return pending("Set WASMD_ENABLED to enable Cosmos node-based tests");
  }
}

const httpUrl = "http://localhost:1317";
const defaultConfig: TokenConfiguration = {
  bankTokens: [
    {
      fractionalDigits: 6,
      name: "Fee Token",
      ticker: "COSM",
      denom: "ucosm",
    },
    {
      fractionalDigits: 6,
      name: "Staking Token",
      ticker: "STAKE",
      denom: "ustake",
    },
  ],
};
const defaultAddressPrefix = "cosmos";
const defaultChainId = "cosmos:testing" as ChainId;
const codec = new CosmosCodec(defaultAddressPrefix, defaultConfig.bankTokens);

function makeRandomAddress(): Address {
  return Bech32.encode(defaultAddressPrefix, Random.getBytes(20)) as Address;
}

const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

async function makeProfile(
  distributors = 0,
): Promise<{ readonly profile: UserProfile; readonly holder: Identity; readonly distributors: Identity[] }> {
  const [profile, identities] = await createUserProfile(faucetMnemonic, defaultChainId, distributors);
  return {
    profile: profile,
    holder: identities[0],
    distributors: identities.slice(1),
  };
}

describe("Faucet", () => {
  describe("constructor", () => {
    it("can be constructed", async () => {
      pendingWithoutWasmd();
      const connection = await CosmosConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const { profile } = await makeProfile();
      const faucet = new Faucet(defaultConfig, connection, codec, profile);
      expect(faucet).toBeTruthy();
      connection.disconnect();
    });
  });

  describe("send", () => {
    it("can send bank token", async () => {
      pendingWithoutWasmd();
      const connection = await CosmosConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const { profile, holder } = await makeProfile();
      const faucet = new Faucet(defaultConfig, connection, codec, profile);
      const recipient = makeRandomAddress();
      await faucet.send({
        amount: {
          quantity: "23456",
          fractionalDigits: 6,
          tokenTicker: "COSM" as TokenTicker,
        },
        sender: holder,
        recipient: recipient,
      });
      const account = await connection.getAccount({ address: recipient });
      assert(account);
      expect(account.balance).toEqual([
        {
          quantity: "23456",
          fractionalDigits: 6,
          tokenTicker: "COSM" as TokenTicker,
        },
      ]);
      connection.disconnect();
    });
  });

  describe("refill", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const connection = await CosmosConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const { profile, distributors } = await makeProfile(1);
      const faucet = new Faucet(defaultConfig, connection, codec, profile);
      await faucet.refill();
      const distributorBalance = (await connection.getAccount({ pubkey: distributors[0].pubkey }))?.balance;
      assert(distributorBalance);
      expect(distributorBalance).toEqual([
        jasmine.objectContaining({
          tokenTicker: "COSM",
          fractionalDigits: 6,
        }),
        jasmine.objectContaining({
          tokenTicker: "STAKE",
          fractionalDigits: 6,
        }),
      ]);
      expect(Number.parseInt(distributorBalance[0].quantity, 10)).toBeGreaterThanOrEqual(80_000000);
      expect(Number.parseInt(distributorBalance[1].quantity, 10)).toBeGreaterThanOrEqual(80_000000);
      connection.disconnect();
    });
  });

  describe("credit", () => {
    it("works for fee token", async () => {
      pendingWithoutWasmd();
      const connection = await CosmosConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const { profile } = await makeProfile(1);
      const faucet = new Faucet(defaultConfig, connection, codec, profile);
      const recipient = makeRandomAddress();
      await faucet.credit(recipient, "COSM" as TokenTicker);
      const account = await connection.getAccount({ address: recipient });
      assert(account);
      expect(account.balance).toEqual([
        {
          quantity: "10000000",
          fractionalDigits: 6,
          tokenTicker: "COSM" as TokenTicker,
        },
      ]);
      connection.disconnect();
    });

    it("works for stake token", async () => {
      pendingWithoutWasmd();
      const connection = await CosmosConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const { profile } = await makeProfile(1);
      const faucet = new Faucet(defaultConfig, connection, codec, profile);
      const recipient = makeRandomAddress();
      await faucet.credit(recipient, "STAKE" as TokenTicker);
      const account = await connection.getAccount({ address: recipient });
      assert(account);
      expect(account.balance).toEqual([
        {
          quantity: "10000000",
          fractionalDigits: 6,
          tokenTicker: "STAKE" as TokenTicker,
        },
      ]);
      connection.disconnect();
    });
  });

  describe("loadTokenTickers", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const connection = await CosmosConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const { profile } = await makeProfile();
      const faucet = new Faucet(defaultConfig, connection, codec, profile);
      const tickers = await faucet.loadTokenTickers();
      expect(tickers).toEqual(["COSM", "STAKE"]);
      connection.disconnect();
    });
  });

  describe("loadAccounts", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const connection = await CosmosConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const { profile, holder } = await makeProfile();
      const faucet = new Faucet(defaultConfig, connection, codec, profile);
      const accounts = await faucet.loadAccounts();
      const expectedHolderAccount = await connection.getAccount({ pubkey: holder.pubkey });
      assert(expectedHolderAccount);
      expect(accounts).toEqual([
        { address: expectedHolderAccount.address, balance: expectedHolderAccount.balance },
      ]);
      connection.disconnect();
    });
  });
});

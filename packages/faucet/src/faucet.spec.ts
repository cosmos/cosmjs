import { CosmWasmCodec, CosmWasmConnection, TokenConfiguration } from "@cosmwasm/bcp";
import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
import { Address, ChainId, Identity, TokenTicker } from "@iov/bcp";
import { Random } from "@iov/crypto";
import { Bech32 } from "@iov/encoding";
import { HdPaths, Secp256k1HdWallet, UserProfile } from "@iov/keycontrol";
import { assert } from "@iov/utils";

import { Faucet } from "./faucet";

function pendingWithoutCosmos(): void {
  if (!process.env.COSMOS_ENABLED) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
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
  erc20Tokens: [
    // {
    //   contractAddress: "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5",
    //   fractionalDigits: 5,
    //   ticker: "ASH",
    //   name: "Ash Token",
    // },
    // {
    //   contractAddress: "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd",
    //   fractionalDigits: 0,
    //   ticker: "BASH",
    //   name: "Bash Token",
    // },
  ],
};
const defaultPrefix = "cosmos" as CosmosAddressBech32Prefix;
const defaultChainId = "cosmos:testing" as ChainId;
const codec = new CosmWasmCodec(defaultPrefix, defaultConfig.bankTokens);

function makeRandomAddress(): Address {
  return Bech32.encode(defaultPrefix, Random.getBytes(20)) as Address;
}

const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
const faucetPath = HdPaths.cosmos(0);

async function makeProfile(): Promise<{ readonly profile: UserProfile; readonly holder: Identity }> {
  const profile = new UserProfile();
  const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucetMnemonic));
  const holder = await profile.createIdentity(wallet.id, defaultChainId, faucetPath);
  return {
    profile: profile,
    holder: holder,
  };
}

describe("Faucet", () => {
  describe("constructor", () => {
    it("can be constructed", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const faucet = new Faucet(defaultConfig, connection, codec);
      expect(faucet).toBeTruthy();
      connection.disconnect();
    });
  });

  describe("send", () => {
    it("can send", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const { profile, holder } = await makeProfile();
      const faucet = new Faucet(defaultConfig, connection, codec);
      const recipient = makeRandomAddress();
      await faucet.send(profile, {
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
});

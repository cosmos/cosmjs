import { Random } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";
import { CosmosClient } from "@cosmjs/launchpad";
import { StargateClient } from "@cosmjs/stargate";
import { assert } from "@cosmjs/utils";

import { Faucet } from "./faucet";
import { TokenConfiguration } from "./tokenmanager";

function pendingWithoutWasmd(): void {
  if (!process.env.WASMD_ENABLED) {
    return pending("Set WASMD_ENABLED to enable Cosmos node-based tests");
  }
}

function pendingWithoutSimapp(): void {
  if (!process.env.SIMAPP_ENABLED) {
    return pending("Set SIMAPP_ENABLED to enabled Stargate node-based tests");
  }
}

const defaultTokenConfig: TokenConfiguration = {
  bankTokens: ["ucosm", "ustake"],
};
const defaultAddressPrefix = "cosmos";

function makeRandomAddress(): string {
  return Bech32.encode(defaultAddressPrefix, Random.getBytes(20));
}

const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

describe("Faucet", () => {
  describe("launchpad", () => {
    const apiUrl = "http://localhost:1317";
    const stargate = false;

    describe("constructor", () => {
      it("can be constructed", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        expect(faucet).toBeTruthy();
      });
    });

    describe("availableTokens", () => {
      it("is empty when no tokens are configured", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          { bankTokens: [] },
          faucetMnemonic,
          3,
          stargate,
        );
        const tickers = await faucet.availableTokens();
        expect(tickers).toEqual([]);
      });

      it("is not empty with default token config", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const tickers = await faucet.availableTokens();
        expect(tickers).toEqual(["ucosm", "ustake"]);
      });
    });

    describe("send", () => {
      it("can send bank token", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const recipient = makeRandomAddress();
        await faucet.send({
          amount: {
            amount: "23456",
            denom: "ucosm",
          },
          sender: faucet.holderAddress,
          recipient: recipient,
        });

        const readOnlyClient = new CosmosClient(apiUrl);
        const account = await readOnlyClient.getAccount(recipient);
        assert(account);
        expect(account.balance).toEqual([
          {
            amount: "23456",
            denom: "ucosm",
          },
        ]);
      });
    });

    describe("refill", () => {
      it("works", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        await faucet.refill();
        const readOnlyClient = new CosmosClient(apiUrl);
        const distributorBalance = (await readOnlyClient.getAccount(faucet.distributorAddresses[0]))?.balance;
        assert(distributorBalance);
        expect(distributorBalance).toEqual([
          jasmine.objectContaining({
            denom: "ucosm",
          }),
          jasmine.objectContaining({
            denom: "ustake",
          }),
        ]);
        expect(Number.parseInt(distributorBalance[0].amount, 10)).toBeGreaterThanOrEqual(80_000000);
        expect(Number.parseInt(distributorBalance[1].amount, 10)).toBeGreaterThanOrEqual(80_000000);
      });
    });

    describe("credit", () => {
      it("works for fee token", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const recipient = makeRandomAddress();
        await faucet.credit(recipient, "ucosm");

        const readOnlyClient = new CosmosClient(apiUrl);
        const account = await readOnlyClient.getAccount(recipient);
        assert(account);
        expect(account.balance).toEqual([
          {
            amount: "10000000",
            denom: "ucosm",
          },
        ]);
      });

      it("works for stake token", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const recipient = makeRandomAddress();
        await faucet.credit(recipient, "ustake");

        const readOnlyClient = new CosmosClient(apiUrl);
        const account = await readOnlyClient.getAccount(recipient);
        assert(account);
        expect(account.balance).toEqual([
          {
            amount: "10000000",
            denom: "ustake",
          },
        ]);
      });
    });

    describe("configuredTokens", () => {
      it("works", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const tickers = faucet.configuredTokens();
        expect(tickers).toEqual(["ucosm", "ustake"]);
      });
    });

    describe("loadAccounts", () => {
      it("works", async () => {
        pendingWithoutWasmd();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          1,
          stargate,
        );
        const accounts = await faucet.loadAccounts();

        const readOnlyClient = new CosmosClient(apiUrl);
        const expectedHolderAccount = await readOnlyClient.getAccount(faucet.holderAddress);
        const expectedDistributorAccount = await readOnlyClient.getAccount(faucet.distributorAddresses[0]);
        assert(expectedHolderAccount);
        assert(expectedDistributorAccount);
        expect(accounts).toEqual([
          jasmine.objectContaining({
            address: expectedHolderAccount.address,
            balance: expectedHolderAccount.balance,
          }),
          jasmine.objectContaining({
            address: expectedDistributorAccount.address,
            balance: expectedDistributorAccount.balance,
          }),
        ]);
      });
    });
  });

  describe("stargate", () => {
    const apiUrl = "localhost:26657";
    const stargate = true;
    let originalEnvVariable: string | undefined;

    beforeAll(() => {
      originalEnvVariable = process.env.FAUCET_CREDIT_AMOUNT_USTAKE;
      process.env.FAUCET_CREDIT_AMOUNT_USTAKE = "100000";
    });

    afterAll(() => {
      process.env.FAUCET_CREDIT_AMOUNT_USTAKE = originalEnvVariable;
    });

    describe("constructor", () => {
      it("can be constructed", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        expect(faucet).toBeTruthy();
      });
    });

    describe("availableTokens", () => {
      it("is empty when no tokens are configured", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          { bankTokens: [] },
          faucetMnemonic,
          3,
          stargate,
        );
        const tickers = await faucet.availableTokens();
        expect(tickers).toEqual([]);
      });

      it("is not empty with default token config", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const tickers = await faucet.availableTokens();
        expect(tickers).toEqual(["ucosm", "ustake"]);
      });
    });

    describe("send", () => {
      it("can send bank token", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const recipient = makeRandomAddress();
        await faucet.send({
          amount: {
            amount: "23456",
            denom: "ucosm",
          },
          sender: faucet.holderAddress,
          recipient: recipient,
        });

        const readOnlyClient = await StargateClient.connect(apiUrl);
        const account = await readOnlyClient.getAllBalancesUnverified(recipient);
        assert(account);
        expect(account).toEqual([
          {
            amount: "23456",
            denom: "ucosm",
          },
        ]);
      });
    });

    describe("refill", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        await faucet.refill();
        const readOnlyClient = await StargateClient.connect(apiUrl);
        const distributorBalance = await readOnlyClient.getAllBalancesUnverified(
          faucet.distributorAddresses[0],
        );
        assert(distributorBalance);
        expect(distributorBalance).toEqual([
          jasmine.objectContaining({
            denom: "ucosm",
          }),
          jasmine.objectContaining({
            denom: "ustake",
          }),
        ]);
        expect(Number.parseInt(distributorBalance[0].amount, 10)).toBeGreaterThanOrEqual(80_000000);
        expect(Number.parseInt(distributorBalance[1].amount, 10)).toBeGreaterThanOrEqual(800000);
      });
    });

    describe("credit", () => {
      it("works for fee token", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const recipient = makeRandomAddress();
        await faucet.credit(recipient, "ucosm");

        const readOnlyClient = await StargateClient.connect(apiUrl);
        const balance = await readOnlyClient.getAllBalancesUnverified(recipient);
        assert(balance);
        expect(balance).toEqual([
          {
            amount: "10000000",
            denom: "ucosm",
          },
        ]);
      });

      it("works for stake token", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const recipient = makeRandomAddress();
        await faucet.credit(recipient, "ustake");

        const readOnlyClient = await StargateClient.connect(apiUrl);
        const balance = await readOnlyClient.getAllBalancesUnverified(recipient);
        assert(balance);
        expect(balance).toEqual([
          {
            amount: "100000",
            denom: "ustake",
          },
        ]);
      });
    });

    describe("configuredTokens", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          3,
          stargate,
        );
        const tickers = faucet.configuredTokens();
        expect(tickers).toEqual(["ucosm", "ustake"]);
      });
    });

    describe("loadAccounts", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          1,
          stargate,
        );
        const accounts = await faucet.loadAccounts();

        const readOnlyClient = await StargateClient.connect(apiUrl);
        const expectedHolderBalance = await readOnlyClient.getAllBalancesUnverified(faucet.holderAddress);
        const expectedDistributorBalance = await readOnlyClient.getAllBalancesUnverified(
          faucet.distributorAddresses[0],
        );
        assert(expectedHolderBalance);
        assert(expectedDistributorBalance);
        expect(accounts).toEqual([
          jasmine.objectContaining({
            address: faucet.holderAddress,
            balance: expectedHolderBalance,
          }),
          jasmine.objectContaining({
            address: faucet.distributorAddresses[0],
            balance: expectedDistributorBalance,
          }),
        ]);
      });
    });
  });
});

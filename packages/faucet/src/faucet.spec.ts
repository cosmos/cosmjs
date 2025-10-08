import { Random } from "@cosmjs/crypto";
import { toBech32 } from "@cosmjs/encoding";
import { makeCosmoshubPath, StargateClient } from "@cosmjs/stargate";
import { assert } from "@cosmjs/utils";

import { Faucet } from "./faucet";
import { simappEnabled } from "./testutils";
import { TokenConfiguration } from "./tokenmanager";

const defaultTokenConfig: TokenConfiguration = {
  bankTokens: ["ucosm", "ustake"],
};
const defaultAddressPrefix = "cosmos";

function makeRandomAddress(): string {
  return toBech32(defaultAddressPrefix, Random.getBytes(20));
}

const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

(simappEnabled ? describe : describe.skip)("Faucet", () => {
  const pathBuilder = makeCosmoshubPath;

  const apiUrl = "http://localhost:26658";
  const logging = true;
  let originalEnvVariable: string | undefined;

  beforeAll(() => {
    originalEnvVariable = process.env.FAUCET_CREDIT_AMOUNT_USTAKE;
    process.env.FAUCET_CREDIT_AMOUNT_USTAKE = "100000";
  });

  afterAll(() => {
    process.env.FAUCET_CREDIT_AMOUNT_USTAKE = originalEnvVariable;
  });

  describe("stargate", () => {
    describe("constructor", () => {
      it("can be constructed", async () => {
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
        );
        expect(faucet).toBeTruthy();
      });
    });

    describe("availableTokens", () => {
      it("is empty when no tokens are configured", async () => {
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          { bankTokens: [] },
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
        );
        const tickers = await faucet.availableTokens();
        expect(tickers).toEqual([]);
      });

      it("is not empty with default token config", async () => {
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
        );
        const tickers = await faucet.availableTokens();
        expect(tickers).toEqual(["ucosm", "ustake"]);
      });
    });

    describe("send", () => {
      it("can send bank token", async () => {
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
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
        const account = await readOnlyClient.getAllBalances(recipient);
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
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
        );
        await faucet.refill();
        const readOnlyClient = await StargateClient.connect(apiUrl);
        const distributorBalance = await readOnlyClient.getAllBalances(faucet.distributorAddresses[0]);
        assert(distributorBalance);
        expect(distributorBalance).toEqual([
          expect.objectContaining({
            denom: "ucosm",
          }),
          expect.objectContaining({
            denom: "ustake",
          }),
        ]);
        expect(Number.parseInt(distributorBalance[0].amount, 10)).toBeGreaterThanOrEqual(80_000000);
        expect(Number.parseInt(distributorBalance[1].amount, 10)).toBeGreaterThanOrEqual(800000);
      });
    });

    describe("credit", () => {
      it("works for fee token", async () => {
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
        );
        const recipient = makeRandomAddress();
        await faucet.credit(recipient, "ucosm");

        const readOnlyClient = await StargateClient.connect(apiUrl);
        const balance = await readOnlyClient.getAllBalances(recipient);
        assert(balance);
        expect(balance).toEqual([
          {
            amount: "10000000",
            denom: "ucosm",
          },
        ]);
      });

      it("works for stake token", async () => {
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
        );
        const recipient = makeRandomAddress();
        await faucet.credit(recipient, "ustake");

        const readOnlyClient = await StargateClient.connect(apiUrl);
        const balance = await readOnlyClient.getAllBalances(recipient);
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
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          3,
          logging,
        );
        const tickers = faucet.configuredTokens();
        expect(tickers).toEqual(["ucosm", "ustake"]);
      });
    });

    describe("loadAccounts", () => {
      it("works", async () => {
        const faucet = await Faucet.make(
          apiUrl,
          defaultAddressPrefix,
          defaultTokenConfig,
          faucetMnemonic,
          pathBuilder,
          1,
          logging,
        );
        const accounts = await faucet.loadAccounts();

        const readOnlyClient = await StargateClient.connect(apiUrl);
        const expectedHolderBalance = await readOnlyClient.getAllBalances(faucet.holderAddress);
        const expectedDistributorBalance = await readOnlyClient.getAllBalances(
          faucet.distributorAddresses[0],
        );
        assert(expectedHolderBalance);
        assert(expectedDistributorBalance);
        expect(accounts).toEqual([
          expect.objectContaining({
            address: faucet.holderAddress,
            balance: expectedHolderBalance,
          }),
          expect.objectContaining({
            address: faucet.distributorAddresses[0],
            balance: expectedDistributorBalance,
          }),
        ]);
      });
    });
  });
});

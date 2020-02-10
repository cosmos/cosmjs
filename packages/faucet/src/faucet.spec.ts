import { CosmWasmCodec, CosmWasmConnection, TokenConfiguration } from "@cosmwasm/bcp";
import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";

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
      ticker: "TOKENZ",
      name: "The tokenz",
      fractionalDigits: 6,
      denom: "utokenz",
    },
    {
      ticker: "TRASH",
      name: "Trash token",
      fractionalDigits: 3,
      denom: "mtrash",
    },
  ],
};
const defaultPrefix = "cosmos" as CosmosAddressBech32Prefix;
const codec = new CosmWasmCodec(defaultPrefix, defaultConfig.bankTokens);

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
});

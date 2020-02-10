import { TokenConfiguration } from "@cosmwasm/bcp";

import { Faucet } from "./faucet";

const dummyConfig: TokenConfiguration = {
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

describe("Faucet", () => {
  describe("constructor", () => {
    it("can be constructed", () => {
      const faucet = new Faucet(dummyConfig);
      expect(faucet).toBeTruthy();
    });
  });
});

import { Address, Algorithm, PubkeyBundle, PubkeyBytes, TokenTicker } from "@iov/bcp";

import { availableTokensFromHolder } from "./multichainhelpers";

describe("multichainhelpers", () => {
  describe("availableTokensFromHolder", () => {
    const defaultPubkey: PubkeyBundle = {
      algo: Algorithm.Ed25519,
      data: new Uint8Array([0, 1, 2, 3]) as PubkeyBytes,
    };

    it("works for an empty account", () => {
      const tickers = availableTokensFromHolder({
        address: "aabbccdd" as Address,
        pubkey: defaultPubkey,
        balance: [],
      });
      expect(tickers).toEqual([]);
    });

    it("works for one token", () => {
      const tickers = availableTokensFromHolder({
        address: "aabbccdd" as Address,
        pubkey: defaultPubkey,
        balance: [
          {
            quantity: "1",
            fractionalDigits: 9,
            tokenTicker: "CASH" as TokenTicker,
          },
        ],
      });
      expect(tickers).toEqual(["CASH"]);
    });

    it("works for two tokens", () => {
      const tickers = availableTokensFromHolder({
        address: "aabbccdd" as Address,
        pubkey: defaultPubkey,
        balance: [
          {
            quantity: "1",
            fractionalDigits: 9,
            tokenTicker: "CASH" as TokenTicker,
          },
          {
            quantity: "1",
            fractionalDigits: 9,
            tokenTicker: "TRASH" as TokenTicker,
          },
        ],
      });
      expect(tickers).toEqual(["CASH", "TRASH"]);
    });
  });
});

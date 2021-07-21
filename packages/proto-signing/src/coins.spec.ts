import { parseCoins } from "./coins";

describe("coins", () => {
  describe("parseCoins", () => {
    it("works for empty", () => {
      expect(parseCoins("")).toEqual([]);
    });

    it("works for one element", () => {
      expect(parseCoins("7643ureef")).toEqual([
        {
          amount: "7643",
          denom: "ureef",
        },
      ]);
    });

    it("works for various denoms", () => {
      // very short (3)
      expect(parseCoins("7643bar")).toEqual([
        {
          amount: "7643",
          denom: "bar",
        },
      ]);

      // very long (128)
      expect(
        parseCoins(
          "7643abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh",
        ),
      ).toEqual([
        {
          amount: "7643",
          denom:
            "abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh",
        },
      ]);

      // IBC denom (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/types/coin_test.go#L512-L519)
      expect(parseCoins("7643ibc/7F1D3FCF4AE79E1554D670D1AD949A9BA4E4A3C76C63093E17E446A46061A7A2")).toEqual([
        {
          amount: "7643",
          denom: "ibc/7F1D3FCF4AE79E1554D670D1AD949A9BA4E4A3C76C63093E17E446A46061A7A2",
        },
      ]);
    });

    it("works for two", () => {
      expect(parseCoins("819966000ucosm,700000000ustake")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
    });

    it("ignores empty elements", () => {
      // start
      expect(parseCoins(",819966000ucosm,700000000ustake")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
      // middle
      expect(parseCoins("819966000ucosm,,700000000ustake")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
      // end
      expect(parseCoins("819966000ucosm,700000000ustake,")).toEqual([
        {
          amount: "819966000",
          denom: "ucosm",
        },
        {
          amount: "700000000",
          denom: "ustake",
        },
      ]);
    });

    it("throws for invalid inputs", () => {
      // denom missing
      expect(() => parseCoins("3456")).toThrowError(/invalid coin string/i);

      // amount missing
      expect(() => parseCoins("ucosm")).toThrowError(/invalid coin string/i);

      // denom starting with slash
      expect(() => parseCoins("3456/ibc")).toThrowError(/invalid coin string/i);

      // denom too short
      expect(() => parseCoins("3456a")).toThrowError(/invalid coin string/i);
      expect(() => parseCoins("3456aa")).toThrowError(/invalid coin string/i);

      // denom too long
      expect(() =>
        parseCoins(
          "3456abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgha",
        ),
      ).toThrowError(/invalid coin string/i);
    });
  });
});

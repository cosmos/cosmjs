import { Decimal } from "@cosmjs/math";

import { GasPrice } from "./fee";

describe("GasPrice", () => {
  it("can be constructed", () => {
    const inputs = ["3.14", "3", "0.14"];
    inputs.forEach((input) => {
      const gasPrice = new GasPrice(Decimal.fromUserInput(input, 18), "utest");
      expect(gasPrice.amount.toString()).toEqual(input);
      expect(gasPrice.denom).toEqual("utest");
    });
  });

  describe("fromString", () => {
    it("works", () => {
      const inputs: Record<string, { amount: string; denom: string }> = {
        // Test amounts
        "3.14utest": { amount: "3.14", denom: "utest" },
        "3utest": { amount: "3", denom: "utest" },
        "0.14utest": { amount: "0.14", denom: "utest" },
        // Test denoms
        "0.14sht": { amount: "0.14", denom: "sht" },
        "0.14testtesttesttest": { amount: "0.14", denom: "testtesttesttest" },
        "0.14ucoin2": { amount: "0.14", denom: "ucoin2" },
      };
      for (const [input, expected] of Object.entries(inputs)) {
        const gasPrice = GasPrice.fromString(input);
        expect(gasPrice.amount.toString()).withContext(`Input: ${input}`).toEqual(expected.amount);
        expect(gasPrice.denom).withContext(`Input: ${input}`).toEqual(expected.denom);
      }
    });

    it("errors for invalid gas price", () => {
      // Checks basic format <amount><denom>
      expect(() => GasPrice.fromString("")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("utkn")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("@utkn")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("234")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("-234tkn")).toThrowError(/Invalid gas price string/i);
      // Checks details of <denom>
      expect(() => GasPrice.fromString("234t")).toThrowError(/denom must be between 3 and 16 characters/i);
      expect(() => GasPrice.fromString("234tt")).toThrowError(/denom must be between 3 and 16 characters/i);
      expect(() => GasPrice.fromString("234ttttttttttttttttt")).toThrowError(
        /denom must be between 3 and 16 characters/i,
      );
      expect(() => GasPrice.fromString("234ATOM")).toThrowError(
        /denom must only contain lower case letters a-z and digits 0-9/i,
      );
      // Checks details of <amount>
      expect(() => GasPrice.fromString("3.utkn")).toThrowError(/Fractional part missing/i);
      expect(() => GasPrice.fromString("..utkn")).toThrowError(/More than one separator found/i);
    });
  });
});

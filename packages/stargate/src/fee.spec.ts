import { Decimal } from "@cosmjs/math";

import { calculateFee, GasPrice } from "./fee";

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
        "0.14testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest":
          {
            amount: "0.14",
            denom:
              "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
          },
        "0.14ucoin2": { amount: "0.14", denom: "ucoin2" },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "0.14FOOBAR": { amount: "0.14", denom: "FOOBAR" },
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
      expect(() => GasPrice.fromString("234t")).toThrowError(/denom must be between 3 and 128 characters/i);
      expect(() => GasPrice.fromString("234tt")).toThrowError(/denom must be between 3 and 128 characters/i);
      expect(() =>
        GasPrice.fromString(
          "234ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
        ),
      ).toThrowError(/denom must be between 3 and 128 characters/i);
      // Checks details of <amount>
      expect(() => GasPrice.fromString("3.utkn")).toThrowError(/Fractional part missing/i);
      expect(() => GasPrice.fromString("..utkn")).toThrowError(/More than one separator found/i);
    });
  });
});

describe("calculateFee", () => {
  it("multiplies the gas price by the gas limit", () => {
    const gasLimit = 80000;
    const gasPrice = GasPrice.fromString("0.025ucosm");
    const fee = calculateFee(gasLimit, gasPrice);
    expect(fee).toEqual({
      amount: [{ amount: "2000", denom: "ucosm" }],
      gas: "80000",
    });
  });

  it("accepts a string gas price", () => {
    const gasLimit = 80000;
    const gasPrice = "0.025ucosm";
    const fee = calculateFee(gasLimit, gasPrice);
    expect(fee).toEqual({
      amount: [{ amount: "2000", denom: "ucosm" }],
      gas: "80000",
    });
  });
});

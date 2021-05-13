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
      const inputs = ["3.14", "3", "0.14"];
      inputs.forEach((input) => {
        const gasPrice = GasPrice.fromString(`${input}utest`);
        expect(gasPrice.amount.toString()).toEqual(input);
        expect(gasPrice.denom).toEqual("utest");
      });
    });

    it("errors for invalid gas price", () => {
      // Checks basic format <amount><denom>
      expect(() => GasPrice.fromString("")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("utkn")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("@utkn")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("234")).toThrowError(/Invalid gas price string/i);
      expect(() => GasPrice.fromString("-234tkn")).toThrowError(/Invalid gas price string/i);
      // Checks details of <denom>
      expect(() => GasPrice.fromString("234t")).toThrowError(
        /denomination must be between 3 and 127 characters/i,
      );
      expect(() => GasPrice.fromString("234tt")).toThrowError(
        /denomination must be between 3 and 127 characters/i,
      );
      expect(() =>
        GasPrice.fromString(
          "234tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
        ),
      ).toThrowError(/denomination must be between 3 and 127 characters/i);
      // Checks details of <amount>
      expect(() => GasPrice.fromString("3.utkn")).toThrowError(/Fractional part missing/i);
      expect(() => GasPrice.fromString("..utkn")).toThrowError(/More than one separator found/i);
    });
  });
});

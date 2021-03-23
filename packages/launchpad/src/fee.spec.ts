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

  it("can be constructed from a config string", () => {
    const inputs = ["3.14", "3", "0.14"];
    inputs.forEach((input) => {
      const gasPrice = GasPrice.fromString(`${input}utest`);
      expect(gasPrice.amount.toString()).toEqual(input);
      expect(gasPrice.denom).toEqual("utest");
    });
  });
});

import { GasPrice } from "./gas";

describe("GasPrice", () => {
  it("can be constructed", () => {
    const gasPrice = new GasPrice(3.14, "utest");
    expect(gasPrice.amount).toEqual(3.14);
    expect(gasPrice.denom).toEqual("utest");
  });
});

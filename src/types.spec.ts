/* eslint-disable @typescript-eslint/camelcase */
import { accountToNonce, nonceToAccountNumber, nonceToSequence } from "./types";

describe("nonceEncoding", () => {
  it("works for input in range", () => {
    const nonce = accountToNonce({
      accountNumber: "1234",
      sequence: "7890",
    });
    expect(nonceToAccountNumber(nonce)).toEqual("1234");
    expect(nonceToSequence(nonce)).toEqual("7890");
  });

  it("errors on input too large", () => {
    expect(() =>
      accountToNonce({
        accountNumber: "1234567890",
        sequence: "7890",
      }),
    ).toThrow();
    expect(() =>
      accountToNonce({
        accountNumber: "178",
        sequence: "97320247923",
      }),
    ).toThrow();
  });
});

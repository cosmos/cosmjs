/* eslint-disable @typescript-eslint/camelcase */
import { accountToNonce, nonceToAccountNumber, nonceToSequence } from "./types";

describe("nonceEncoding", () => {
  it("works for input in range", () => {
    const nonce = accountToNonce(1234, 7890);
    expect(nonceToAccountNumber(nonce)).toEqual(1234);
    expect(nonceToSequence(nonce)).toEqual(7890);
  });

  it("errors on input too large", () => {
    expect(() => accountToNonce(1234567890, 7890)).toThrow();
    expect(() => accountToNonce(178, 97320247923)).toThrow();
  });
});

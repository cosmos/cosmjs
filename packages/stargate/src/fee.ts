import { StdFee } from "@cosmjs/amino";
import { Decimal, Uint53 } from "@cosmjs/math";
import { coins } from "@cosmjs/proto-signing";

/**
 * Denom checker for the Cosmos SDK 0.42 denom pattern
 * (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
 *
 * This is like a regexp but with helpful error messages.
 */
function checkDenom(denom: string): void {
  if (denom.length < 3 || denom.length > 128) {
    throw new Error("Denom must be between 3 and 128 characters");
  }
}

/**
 * A gas price, i.e. the price of a single unit of gas. This is typically a fraction of
 * the smallest fee token unit, such as 0.012utoken.
 */
export class GasPrice {
  public readonly amount: Decimal;
  public readonly denom: string;

  public constructor(amount: Decimal, denom: string) {
    if (!denom) {
      throw new Error("denom must not be empty");
    }

    this.amount = amount;
    this.denom = denom;
  }

  /**
   * Parses a gas price formatted as `<amount><denom>`, e.g. `GasPrice.fromString("0.012utoken")`.
   *
   * The denom must match the Cosmos SDK 0.42 pattern (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
   * See `GasPrice` in @cosmjs/stargate for a more generic matcher.
   *
   * Separators are not yet supported.
   */
  public static fromString(gasPrice: string): GasPrice {
    // Use Decimal.fromUserInput and checkDenom for detailed checks and helpful error messages
    const matchResult = gasPrice.match(/^([0-9.]+)([a-zA-Z][a-zA-Z0-9/:._-]*)$/);
    if (!matchResult) {
      throw new Error("Invalid gas price string");
    }
    const [_, amount, denom] = matchResult;
    checkDenom(denom);
    const fractionalDigits = 18;
    const decimalAmount = Decimal.fromUserInput(amount, fractionalDigits);
    return new GasPrice(decimalAmount, denom);
  }

  /**
   * Returns a string representation of this gas price, e.g. "0.025uatom".
   * This can be used as an input to `GasPrice.fromString`.
   */
  public toString(): string {
    return this.amount.toString() + this.denom;
  }
}

export function calculateFee(gasLimit: number, gasPrice: GasPrice | string): StdFee {
  const processedGasPrice = typeof gasPrice === "string" ? GasPrice.fromString(gasPrice) : gasPrice;
  const { denom, amount: gasPriceAmount } = processedGasPrice;
  // Note: Amount can exceed the safe integer range (https://github.com/cosmos/cosmjs/issues/1134),
  // which we handle by converting from Decimal to string without going through number.
  const amount = gasPriceAmount.multiply(new Uint53(gasLimit)).ceil().toString();
  return {
    amount: coins(amount, denom),
    gas: gasLimit.toString(),
  };
}

import { coins, StdFee } from "@cosmjs/amino";
import { Decimal, Uint53 } from "@cosmjs/math";

export type FeeTable = Record<string, StdFee>;

/**
 * Denom checker for the Cosmos SDK 0.39 denom pattern
 * (https://github.com/cosmos/cosmos-sdk/blob/v0.39.3/types/coin.go#L597-L598).
 *
 * This is like a regexp but with helpful error messages.
 */
function checkDenom(denom: string): void {
  if (denom.length < 3 || denom.length > 16) {
    throw new Error("Denom must be between 3 and 16 characters");
  }
  if (denom.match(/[^a-z0-9]/)) {
    throw new Error("Denom must only contain lower case letters a-z and digits 0-9");
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
    this.amount = amount;
    this.denom = denom;
  }

  /**
   * Parses a gas price formatted as `<amount><denom>`, e.g. `GasPrice.fromString("0.012utoken")`.
   *
   * The denom must match the Cosmos SDK 0.39 pattern (https://github.com/cosmos/cosmos-sdk/blob/v0.39.3/types/coin.go#L597-L598).
   * See `GasPrice` in @cosmjs/stargate for a more generic matcher.
   */
  public static fromString(gasPrice: string): GasPrice {
    // Use Decimal.fromUserInput and checkDenom for detailed checks and helpful error messages
    const matchResult = gasPrice.match(/^([0-9.]+)([a-z][a-z0-9]*)$/i);
    if (!matchResult) {
      throw new Error("Invalid gas price string");
    }
    const [_, amount, denom] = matchResult;
    checkDenom(denom);
    const fractionalDigits = 18;
    const decimalAmount = Decimal.fromUserInput(amount, fractionalDigits);
    return new GasPrice(decimalAmount, denom);
  }
}

export type GasLimits<T extends Record<string, StdFee>> = {
  readonly [key in keyof T]: number;
};

function calculateFee(gasLimit: number, { denom, amount: gasPriceAmount }: GasPrice): StdFee {
  const amount = Math.ceil(gasPriceAmount.multiply(new Uint53(gasLimit)).toFloatApproximation());
  return {
    amount: coins(amount, denom),
    gas: gasLimit.toString(),
  };
}

export function buildFeeTable<T extends Record<string, StdFee>>(
  gasPrice: GasPrice,
  defaultGasLimits: GasLimits<T>,
  gasLimits: Partial<GasLimits<T>>,
): T {
  return Object.entries(defaultGasLimits).reduce(
    (feeTable, [type, defaultGasLimit]) => ({
      ...feeTable,
      [type]: calculateFee(gasLimits[type] || defaultGasLimit, gasPrice),
    }),
    {} as T,
  );
}

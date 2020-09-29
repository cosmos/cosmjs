import { Decimal, Uint53 } from "@cosmjs/math";

import { coins } from "./coins";
import { StdFee } from "./types";

export type FeeTable = Record<string, StdFee>;

export class GasPrice {
  public readonly amount: Decimal;
  public readonly denom: string;

  public constructor(amount: Decimal, denom: string) {
    this.amount = amount;
    this.denom = denom;
  }

  public static fromString(gasPrice: string): GasPrice {
    const matchResult = gasPrice.match(/^(?<amount>.+?)(?<denom>[a-z]+)$/);
    if (!matchResult) {
      throw new Error("Invalid gas price string");
    }
    const { amount, denom } = matchResult.groups as { readonly amount: string; readonly denom: string };
    if (denom.length < 3 || denom.length > 127) {
      throw new Error("Gas price denomination must be between 3 and 127 characters");
    }
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

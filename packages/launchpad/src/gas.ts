import { coins } from "./coins";
import { StdFee } from "./types";

export class GasPrice {
  public readonly amount: number;
  public readonly denom: string;

  constructor(amount: number, denom: string) {
    this.amount = amount;
    this.denom = denom;
  }
}

export type GasLimits<T extends Record<string, StdFee>> = {
  readonly [key in keyof T]: number;
};

function calculateFee(gasLimit: number, { denom, amount: gasPriceAmount }: GasPrice): StdFee {
  const amount = Math.ceil(gasPriceAmount * gasLimit);
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

import { coins } from "./coins";
import { StdFee } from "./types";

/**
 * These fees are used by the higher level methods of SigningCosmosClient
 */
export interface FeeTable {
  readonly send: StdFee;
}

export class GasPrice {
  public readonly amount: number;
  public readonly denom: string;

  constructor(amount: number, denom: string) {
    this.amount = amount;
    this.denom = denom;
  }
}

export type GasLimits = {
  readonly [key in keyof FeeTable]: number;
};

function calculateFee(gasLimit: number, denom: string, price: number): StdFee {
  const amount = Math.ceil(price * gasLimit);
  return {
    amount: coins(amount, denom),
    gas: gasLimit.toString(),
  };
}

export function buildFeeTable({ denom, amount }: GasPrice, gasLimits: GasLimits): FeeTable {
  return Object.entries(gasLimits).reduce((feeTable, [type, gasLimit]) => {
    return gasLimit === undefined
      ? feeTable
      : {
          ...feeTable,
          [type]: calculateFee(gasLimit, denom, amount),
        };
  }, {} as FeeTable);
}

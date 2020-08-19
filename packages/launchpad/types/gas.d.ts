import { Decimal } from "@cosmjs/math";
import { StdFee } from "./types";
export declare type FeeTable = Record<string, StdFee>;
export declare class GasPrice {
  readonly amount: Decimal;
  readonly denom: string;
  constructor(amount: Decimal, denom: string);
  static fromString(gasPrice: string): GasPrice;
}
export declare type GasLimits<T extends Record<string, StdFee>> = {
  readonly [key in keyof T]: number;
};
export declare function buildFeeTable<T extends Record<string, StdFee>>(
  gasPrice: GasPrice,
  defaultGasLimits: GasLimits<T>,
  gasLimits: Partial<GasLimits<T>>,
): T;

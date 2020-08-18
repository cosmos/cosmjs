import { StdFee } from "./types";
export declare class GasPrice {
  readonly amount: number;
  readonly denom: string;
  constructor(amount: number, denom: string);
}
export declare type GasLimits<T extends Record<string, StdFee>> = {
  readonly [key in keyof T]: number;
};
export declare function buildFeeTable<T extends Record<string, StdFee>>(
  gasPrice: GasPrice,
  defaultGasLimits: GasLimits<T>,
  gasLimits: Partial<GasLimits<T>>,
): T;

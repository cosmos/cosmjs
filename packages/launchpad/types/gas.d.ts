import { StdFee } from "./types";
/**
 * These fees are used by the higher level methods of SigningCosmosClient
 */
export interface FeeTable {
  readonly send: StdFee;
}
export declare class GasPrice {
  readonly amount: number;
  readonly denom: string;
  constructor(amount: number, denom: string);
}
export declare type GasLimits = {
  readonly [key in keyof FeeTable]: number;
};
export declare function buildFeeTable({ denom, amount }: GasPrice, gasLimits: GasLimits): FeeTable;

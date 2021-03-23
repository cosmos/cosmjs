/* eslint-disable @typescript-eslint/naming-convention */
import { Coin } from "./coins";

export interface StdFee {
  readonly amount: readonly Coin[];
  readonly gas: string;
}

import { Uint53 } from "@cosmjs/math";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

/** Creates a coin */
export function coin(amount: number, denom: string): Coin {
  return { amount: new Uint53(amount).toString(), denom: denom };
}

/** Creates a list of coins with one element */
export function coins(amount: number, denom: string): Coin[] {
  return [coin(amount, denom)];
}

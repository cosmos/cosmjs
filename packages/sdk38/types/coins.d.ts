export interface Coin {
  readonly denom: string;
  readonly amount: string;
}
/** Creates a coin */
export declare function coin(amount: number, denom: string): Coin;
/** Creates a list of coins with one element */
export declare function coins(amount: number, denom: string): Coin[];

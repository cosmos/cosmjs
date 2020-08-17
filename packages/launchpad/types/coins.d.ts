export interface Coin {
  readonly denom: string;
  readonly amount: string;
}
/** Creates a coin */
export declare function coin(amount: number, denom: string): Coin;
/** Creates a list of coins with one element */
export declare function coins(amount: number, denom: string): Coin[];
/**
 * Takes a coins list like "819966000ucosm,700000000ustake" and parses it
 */
export declare function parseCoins(input: string): Coin[];

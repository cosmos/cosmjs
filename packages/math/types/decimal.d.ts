/**
 * A type for arbitrary precision, non-negative decimals.
 *
 * Instances of this class are immutable.
 */
export declare class Decimal {
  static fromUserInput(input: string, fractionalDigits: number): Decimal;
  static fromAtomics(atomics: string, fractionalDigits: number): Decimal;
  private static verifyFractionalDigits;
  get atomics(): string;
  get fractionalDigits(): number;
  private readonly data;
  private constructor();
  toString(): string;
  /**
   * Returns an approximation as a float type. Only use this if no
   * exact calculation is required.
   */
  toFloatApproximation(): number;
  /**
   * a.plus(b) returns a+b.
   *
   * Both values need to have the same fractional digits.
   */
  plus(b: Decimal): Decimal;
}

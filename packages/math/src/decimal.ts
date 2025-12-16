import { Uint32, Uint53, Uint64 } from "./integers";

// Too large values lead to massive memory usage. Limit to something sensible.
// The largest value we need is 18 (Ether).
const maxFractionalDigits = 100;

/**
 * A type for arbitrary precision, non-negative decimals.
 *
 * Instances of this class are immutable.
 */
export class Decimal {
  public static fromUserInput(input: string, fractionalDigits: number): Decimal {
    Decimal.verifyFractionalDigits(fractionalDigits);

    const badCharacter = input.match(/[^0-9.]/);
    if (badCharacter) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      throw new Error(`Invalid character at position ${badCharacter.index! + 1}`);
    }

    let whole: string;
    let fractional: string;

    if (input === "") {
      whole = "0";
      fractional = "";
    } else if (input.search(/\./) === -1) {
      // integer format, no separator
      whole = input;
      fractional = "";
    } else {
      const parts = input.split(".");
      switch (parts.length) {
        case 0:
        case 1:
          throw new Error("Fewer than two elements in split result. This must not happen here.");
        case 2:
          if (!parts[1]) throw new Error("Fractional part missing");
          whole = parts[0];
          fractional = parts[1].replace(/0+$/, "");
          break;
        default:
          throw new Error("More than one separator found");
      }
    }

    if (fractional.length > fractionalDigits) {
      throw new Error("Got more fractional digits than supported");
    }

    const quantity = BigInt(`${whole}${fractional.padEnd(fractionalDigits, "0")}`);

    // We can remove this restriction, but then need to test and update arithmetic operations.
    // See also https://github.com/cosmos/cosmjs/issues/1897
    if (quantity < 0n) throw new Error("Only non-negative values supported.");

    return new Decimal(quantity, fractionalDigits);
  }

  /**
   * Constructs a decimal given the atomic units and the fractional digits.
   *
   * Atomics units are the smallest unit you operate with.
   * E.g. for EUR this could be Euro cents and for BTC this would be Satishi.
   *
   * To create the decimal value 12.60 (EUR) you would use atomics=1260, fractionalDigits=2.
   * To create the decimal value 3.4 (BTC) you would use atomics=340000000, fractionalDigits=8.
   *
   * In order to perform arithmetic operations on Decimal, all values must have the same `fractionalDigits` value.
   * So this should be fixed once per currency, not different per value.
   */
  public static fromAtomics(atomics: string | bigint, fractionalDigits: number): Decimal {
    if (typeof atomics === "string") {
      if (!atomics.match(/^(\-)?[0-9]+$/)) {
        throw new Error("Invalid string format. Only integers in decimal representation supported.");
      }
      return Decimal.fromAtomics(BigInt(atomics), fractionalDigits);
    }

    // We can remove this restriction, but then need to test and update arithmetic operations.
    // See also https://github.com/cosmos/cosmjs/issues/1897
    if (atomics < 0n) throw new Error("Only non-negative values supported.");

    Decimal.verifyFractionalDigits(fractionalDigits);
    return new Decimal(atomics, fractionalDigits);
  }

  /**
   * Creates a Decimal with value 0.0 and the given number of fractional digits.
   *
   * Fractional digits are not relevant for the value but needed to be able
   * to perform arithmetic operations with other decimals.
   */
  public static zero(fractionalDigits: number): Decimal {
    Decimal.verifyFractionalDigits(fractionalDigits);
    return new Decimal(0n, fractionalDigits);
  }

  /**
   * Creates a Decimal with value 1.0 and the given number of fractional digits.
   *
   * Fractional digits are not relevant for the value but needed to be able
   * to perform arithmetic operations with other decimals.
   */
  public static one(fractionalDigits: number): Decimal {
    Decimal.verifyFractionalDigits(fractionalDigits);
    return new Decimal(10n ** BigInt(fractionalDigits), fractionalDigits);
  }

  private static verifyFractionalDigits(fractionalDigits: number): void {
    if (!Number.isInteger(fractionalDigits)) throw new Error("Fractional digits is not an integer");
    if (fractionalDigits < 0) throw new Error("Fractional digits must not be negative");
    if (fractionalDigits > maxFractionalDigits) {
      throw new Error(`Fractional digits must not exceed ${maxFractionalDigits}`);
    }
  }

  public static compare(a: Decimal, b: Decimal): number {
    if (a.fractionalDigits !== b.fractionalDigits) throw new Error("Fractional digits do not match");
    const difference = a.data.atomics - b.data.atomics;
    if (difference < 0n) return -1;
    if (difference > 0n) return 1;
    return 0;
  }

  public get atomics(): string {
    return this.data.atomics.toString();
  }

  public get fractionalDigits(): number {
    return this.data.fractionalDigits;
  }

  private readonly data: {
    readonly atomics: bigint;
    readonly fractionalDigits: number;
  };

  private constructor(atomics: bigint, fractionalDigits: number) {
    this.data = {
      atomics: atomics,
      fractionalDigits: fractionalDigits,
    };
  }

  /** Creates a new instance with the same value */
  private clone(): Decimal {
    return new Decimal(this.data.atomics, this.data.fractionalDigits);
  }

  /** Returns the greatest decimal <= this which has no fractional part (rounding down) */
  public floor(): Decimal {
    const factor = 10n ** BigInt(this.data.fractionalDigits);
    const whole = this.data.atomics / factor;
    const fractional = this.data.atomics % factor;

    if (fractional === 0n) {
      return this.clone();
    } else {
      return new Decimal(whole * factor, this.fractionalDigits);
    }
  }

  /** Returns the smallest decimal >= this which has no fractional part (rounding up) */
  public ceil(): Decimal {
    const factor = 10n ** BigInt(this.data.fractionalDigits);
    const whole = this.data.atomics / factor;
    const fractional = this.data.atomics % factor;

    if (fractional === 0n) {
      return this.clone();
    } else {
      return new Decimal((whole + 1n) * factor, this.fractionalDigits);
    }
  }

  /**
   * Creates a new Decimal with the same value using the new fractional digits.
   * Roughly speaking this can expand an 3.24 to 3.24000 or shrink a 5.4321 to 5.4.
   *
   * This allows you to perform arithmetic operations given two decimals
   * with different fractional digits by normalizing them.
   *
   * When new fractional digis is smaller than the original value, the amount
   * is truncated (not rounded!).
   */
  public adjustFractionalDigits(newFractionalDigits: number): Decimal {
    Decimal.verifyFractionalDigits(newFractionalDigits);
    const diff = newFractionalDigits - this.fractionalDigits;
    if (diff > 0) {
      // expand
      return new Decimal(this.data.atomics * 10n ** BigInt(diff), newFractionalDigits);
    } else if (diff === 0) {
      return this.clone();
    } else {
      // shrink
      return new Decimal(this.data.atomics / 10n ** BigInt(-diff), newFractionalDigits);
    }
  }

  public toString(): string {
    const factor = 10n ** BigInt(this.data.fractionalDigits);
    const whole = this.data.atomics / factor;
    const fractional = this.data.atomics % factor;

    if (fractional === 0n) {
      return whole.toString();
    } else {
      const fullFractionalPart = fractional.toString().padStart(this.data.fractionalDigits, "0");
      const trimmedFractionalPart = fullFractionalPart.replace(/0+$/, "");
      return `${whole.toString()}.${trimmedFractionalPart}`;
    }
  }

  /**
   * Returns an approximation as a float type. Only use this if no
   * exact calculation is required.
   */
  public toFloatApproximation(): number {
    const out = Number(this.toString());
    if (Number.isNaN(out)) throw new Error("Conversion to number failed");
    return out;
  }

  /**
   * a.plus(b) returns a+b.
   *
   * Both values need to have the same fractional digits.
   */
  public plus(b: Decimal): Decimal {
    if (this.fractionalDigits !== b.fractionalDigits) throw new Error("Fractional digits do not match");
    const sum = this.data.atomics + b.data.atomics;
    return new Decimal(sum, this.fractionalDigits);
  }

  /**
   * a.minus(b) returns a-b.
   *
   * Both values need to have the same fractional digits.
   * The resulting difference needs to be non-negative.
   */
  public minus(b: Decimal): Decimal {
    if (this.fractionalDigits !== b.fractionalDigits) throw new Error("Fractional digits do not match");
    const difference = this.data.atomics - b.data.atomics;
    if (difference < 0n) throw new Error("Difference must not be negative");
    return new Decimal(difference, this.fractionalDigits);
  }

  /**
   * a.multiply(b) returns a*b.
   *
   * We only allow multiplication by unsigned integers to avoid rounding errors.
   */
  public multiply(b: Uint32 | Uint53 | Uint64): Decimal {
    const product = this.data.atomics * b.toBigInt();
    return new Decimal(product, this.fractionalDigits);
  }

  public equals(b: Decimal): boolean {
    return Decimal.compare(this, b) === 0;
  }

  public isLessThan(b: Decimal): boolean {
    return Decimal.compare(this, b) < 0;
  }

  public isLessThanOrEqual(b: Decimal): boolean {
    return Decimal.compare(this, b) <= 0;
  }

  public isGreaterThan(b: Decimal): boolean {
    return Decimal.compare(this, b) > 0;
  }

  public isGreaterThanOrEqual(b: Decimal): boolean {
    return Decimal.compare(this, b) >= 0;
  }
}

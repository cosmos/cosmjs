import { Uint32, Uint53 } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";
import { HDKey } from "@scure/bip32";
import { HDKey as edHDKey } from "micro-key-producer/slip10.js";

export interface Slip10Result {
  readonly chainCode: Uint8Array;
  readonly privkey: Uint8Array;
}

/**
 * Raw values must match the curve string in SLIP-0010 master key generation
 *
 * @see https://github.com/satoshilabs/slips/blob/master/slip-0010.md#master-key-generation
 */
export enum Slip10Curve {
  Secp256k1 = "Bitcoin seed",
  Ed25519 = "ed25519 seed",
}

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/**
 * Reverse mapping of Slip10Curve
 */
export function slip10CurveFromString(curveString: string): Slip10Curve {
  switch (curveString) {
    case Slip10Curve.Ed25519:
      return Slip10Curve.Ed25519;
    case Slip10Curve.Secp256k1:
      return Slip10Curve.Secp256k1;
    default:
      throw new Error(`Unknown curve string: '${curveString}'`);
  }
}

export class Slip10RawIndex extends Uint32 {
  public static hardened(hardenedIndex: number): Slip10RawIndex {
    return new Slip10RawIndex(hardenedIndex + 2 ** 31);
  }

  public static normal(normalIndex: number): Slip10RawIndex {
    return new Slip10RawIndex(normalIndex);
  }

  public isHardened(): boolean {
    return this.data >= 2 ** 31;
  }
}

/**
 * An array of raw SLIP10 indices.
 *
 * This can be constructed via string parsing:
 *
 * ```ts
 * import { stringToPath } from "@cosmjs/crypto";
 *
 * const path = stringToPath("m/0'/1/2'/2/1000000000");
 * ```
 *
 * or manually:
 *
 * ```ts
 * import { HdPath, Slip10RawIndex } from "@cosmjs/crypto";
 *
 * // m/0'/1/2'/2/1000000000
 * const path: HdPath = [
 *   Slip10RawIndex.hardened(0),
 *   Slip10RawIndex.normal(1),
 *   Slip10RawIndex.hardened(2),
 *   Slip10RawIndex.normal(2),
 *   Slip10RawIndex.normal(1000000000),
 * ];
 * ```
 */
export type HdPath = Slip10RawIndex[];

export function pathToString(path: HdPath): string {
  return path.reduce((current, component): string => {
    const componentString = component.isHardened()
      ? `${component.toNumber() - 2 ** 31}'`
      : component.toString();
    return current + "/" + componentString;
  }, "m");
}

export function stringToPath(input: string): HdPath {
  if (!input.startsWith("m")) throw new Error("Path string must start with 'm'");
  let rest = input.slice(1);

  const out = new Array<Slip10RawIndex>();
  while (rest) {
    const match = rest.match(/^\/([0-9]+)('?)/);
    if (!match) throw new Error("Syntax error while reading path component");
    const [fullMatch, numberString, apostrophe] = match;
    const value = Uint53.fromString(numberString).toNumber();
    if (value >= 2 ** 31) throw new Error("Component value too high. Must not exceed 2**31-1.");
    if (apostrophe) out.push(Slip10RawIndex.hardened(value));
    else out.push(Slip10RawIndex.normal(value));
    rest = rest.slice(fullMatch.length);
  }
  return out;
}

// Universal private key derivation according to
// https://github.com/satoshilabs/slips/blob/master/slip-0010.md
export class Slip10 {
  public static derivePath(curve: Slip10Curve, seed: Uint8Array, path: HdPath): Slip10Result {
    if (curve === Slip10Curve.Ed25519 && path.some((i) => !i.isHardened())) {
      throw new Error("Normal keys are not allowed with ed25519");
    }

    const pathStr = pathToString(path);

    if (curve === Slip10Curve.Ed25519) {
      return this.derivePathEd(seed, pathStr);
    }

    const master = HDKey.fromMasterSeed(seed);
    const derived: HDKey = master.derive(pathStr);
    const privkey = derived.privateKey;
    const chainCode = derived.chainCode;
    assert(privkey !== null);
    assert(chainCode !== null);
    return { privkey, chainCode };
  }

  private static derivePathEd(seed: Uint8Array, pathStr: string): Slip10Result {
    const master = edHDKey.fromMasterSeed(seed);
    const derived: edHDKey = master.derive(pathStr);
    const privkey = derived.privateKey;
    const chainCode = derived.chainCode;
    return { privkey, chainCode };
  }
}

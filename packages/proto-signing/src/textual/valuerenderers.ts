import { Decimal } from "@cosmjs/math";
import { DenomUnit } from "cosmjs-types/cosmos/bank/v1beta1/bank";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

export function formatInteger(input: string): string {
  return Decimal.fromAtomics(input, 0).toString(".", "'");
}

export function formatDecimal(input: string): string {
  let out = Decimal.fromUserInput(input, 18).toString(".", "'");
  if (out.indexOf(".") === -1) out += ".0";
  return out;
}

export function formatCoin(input: Coin, unit: Pick<DenomUnit, "denom" | "exponent">): string {
  let out = Decimal.fromAtomics(input.amount, unit.exponent).toString(".", "'");
  if (unit.exponent !== 0 && out.indexOf(".") === -1) out += ".0";
  return out + " " + unit.denom;
}

import { Decimal } from "@cosmjs/math";

export function formatInteger(input: string): string {
  return Decimal.fromAtomics(input, 0).toString(".", "'");
}

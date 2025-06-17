import { fromBech32 } from "@cosmjs/encoding";

export function isValidAddress(input: string, requiredPrefix: string): boolean {
  if (input.length > 2048) {
    return false;
  }
  try {
    const { prefix, data } = fromBech32(input);
    if (prefix !== requiredPrefix) {
      return false;
    }
    return data.length >= 20;
  } catch {
    return false;
  }
}

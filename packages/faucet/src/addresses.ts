import { fromBech32 } from "@cosmjs/encoding";

// Penumbra are up to 150 chars. ibc-go has a limit of 2048.
// See https://github.com/cosmos/cosmjs/pull/1674
const lengthLimit = 512;

export function isValidAddress(input: string, requiredPrefix: string): boolean {
  try {
    const { prefix, data } = fromBech32(input as `${string}1${string}`, lengthLimit);
    if (prefix !== requiredPrefix) {
      return false;
    }
    return data.length >= 20 && data.length <= 128;
  } catch {
    return false;
  }
}

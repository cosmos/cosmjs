import { toAscii } from "@cosmjs/encoding";
import { sleep } from "@cosmjs/utils";

export const chainIdMatcher = /^[-a-zA-Z0-9]{3,30}$/;

export function tendermintEnabled(): boolean {
  return !!process.env.TENDERMINT_ENABLED;
}

export function pendingWithoutTendermint(): void {
  if (!tendermintEnabled()) {
    pending("Set TENDERMINT_ENABLED to enable tendermint-based tests");
  }
}

export async function tendermintSearchIndexUpdated(): Promise<void> {
  // Tendermint needs some time before a committed transaction is found in search
  return sleep(75);
}

export function buildKvTx(k: string, v: string): Uint8Array {
  return toAscii(`${k}=${v}`);
}

export function randomString(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 12 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join("");
}

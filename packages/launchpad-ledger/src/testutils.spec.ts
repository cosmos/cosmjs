export function ledgerEnabled(): boolean {
  return !!process.env.LEDGER_ENABLED;
}

export function pendingWithoutLedger(): void {
  if (!ledgerEnabled()) {
    return pending("Set LEDGER_ENABLED to enable Ledger-based tests");
  }
}

export function launchpadEnabled(): boolean {
  return !!process.env.LAUNCHPAD_ENABLED;
}

export function pendingWithoutLaunchpad(): void {
  if (!launchpadEnabled()) {
    return pending("Set LAUNCHPAD_ENABLED to enable Launchpad-based tests");
  }
}

export const launchpad = {
  endpoint: "http://localhost:1317",
  chainId: "testing",
};

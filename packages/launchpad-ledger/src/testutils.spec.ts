export function ledgerEnabled(): boolean {
  return !!process.env.LEDGER_ENABLED;
}

export function pendingWithoutLedger(): void {
  if (!ledgerEnabled()) {
    return pending("Set LEDGER_ENABLED to enable Wasmd based tests");
  }
}

export function ledgerInteractiveEnabled(): boolean {
  return !!process.env.LEDGER_INTERACTIVE_ENABLED;
}

export function pendingWithoutLedgerInteractive(): void {
  if (!ledgerInteractiveEnabled()) {
    return pending("Set LEDGER_INTERACTIVE_ENABLED to enable Wasmd based tests");
  }
}

export const wasmd = {
  endpoint: "http://localhost:1317",
  chainId: "testing",
};

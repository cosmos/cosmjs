export const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

export function ledgerEnabled(): boolean {
  return !!process.env.LEDGER_ENABLED;
}

export function pendingWithoutLedger(): void {
  if (!ledgerEnabled()) {
    return pending("Set LEDGER_ENABLED to enable Ledger-based tests");
  }
}

export function simappEnabled(): boolean {
  return !!process.env.SIMAPP42_ENABLED || !!process.env.SIMAPP44_ENABLED || !!process.env.SIMAPP46_ENABLED;
}

export function pendingWithoutSimapp(): void {
  if (!simappEnabled()) {
    return pending("Set SIMAPP{42,44,46}_ENABLED to enable Simapp-based tests");
  }
}

export const simapp = {
  endpoint: "ws://localhost:26658",
  chainId: "simd-testing",
};

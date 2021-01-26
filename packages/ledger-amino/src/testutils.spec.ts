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

export function launchpadEnabled(): boolean {
  return !!process.env.LAUNCHPAD_ENABLED;
}

export function pendingWithoutLaunchpad(): void {
  if (!launchpadEnabled()) {
    return pending("Set LAUNCHPAD_ENABLED to enable Launchpad-based tests");
  }
}

export function simappEnabled(): boolean {
  return !!process.env.SIMAPP_ENABLED;
}

export function pendingWithoutSimapp(): void {
  if (!simappEnabled()) {
    return pending("Set SIMAPP_ENABLED to enable Simapp-based tests");
  }
}

export const launchpad = {
  endpoint: "http://localhost:1317",
  chainId: "testing",
};

export const simapp = {
  endpoint: "ws://localhost:26658",
  chainId: "simd-testing",
};

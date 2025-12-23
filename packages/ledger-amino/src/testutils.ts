export const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

export const ledgerEnabled: boolean = !!globalThis.process?.env.LEDGER_ENABLED;

export const simappEnabled: boolean = !!(
  globalThis.process?.env.SIMAPP47_ENABLED ||
  globalThis.process?.env.SIMAPP50_ENABLED ||
  globalThis.process?.env.SIMAPP53_ENABLED
);

export const simapp = {
  endpoint: "ws://localhost:26658",
  chainId: "simd-testing",
};

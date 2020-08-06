export function pendingWithoutSimapp(): void {
  if (!process.env.SIMAPP_ENABLED) {
    return pending("Set SIMAPP_ENABLED to enable Simapp based tests");
  }
}

export const simapp = {
  tendermintUrl: "localhost:26657",
  chainId: "simd-testing",
  denomStaking: "ustake",
  denomFee: "ucosm",
};

/** Unused account */
export const unused = {
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ",
  },
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
  accountNumber: 16,
  sequence: 0,
  balanceStaking: "10000000", // 10 STAKE
  balanceFee: "1000000000", // 1000 COSM
};

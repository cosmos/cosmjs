export function pendingWithoutSimapp(): void {
  if (!process.env.SIMAPP_ENABLED) {
    return pending("Set SIMAPP_ENABLED to enable Simapp based tests");
  }
}

export const simapp = {
  tendermintUrl: "localhost:26657",
  chainId: "simd-testing",
};

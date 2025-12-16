export const simappEnabled = !!(
  globalThis.process?.env.SIMAPP47_ENABLED ||
  globalThis.process?.env.SIMAPP50_ENABLED ||
  globalThis.process?.env.SIMAPP53_ENABLED
);

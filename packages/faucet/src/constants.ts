import { TokenConfiguration } from "./types";

export const binaryName = "cosmwasm-faucet";
export const concurrency: number = Number.parseInt(process.env.FAUCET_CONCURRENCY || "", 10) || 5;
export const port: number = Number.parseInt(process.env.FAUCET_PORT || "", 10) || 8000;
export const mnemonic: string | undefined = process.env.FAUCET_MNEMONIC;
export const addressPrefix = process.env.FAUCET_ADDRESS_PREFIX || "cosmos";

/** For the local development chain */
export const developmentTokenConfig: TokenConfiguration = {
  bankTokens: [
    {
      fractionalDigits: 6,
      tickerSymbol: "COSM",
      denom: "ucosm",
    },
    {
      fractionalDigits: 6,
      tickerSymbol: "STAKE",
      denom: "ustake",
    },
  ],
};

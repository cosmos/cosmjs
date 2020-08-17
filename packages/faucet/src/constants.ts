import { Coin, parseCoins } from "@cosmjs/launchpad";

import { TokenConfiguration } from "./tokenmanager";
import { parseBankTokens } from "./tokens";

export const binaryName = "cosmwasm-faucet";
export const memo: string | undefined = process.env.FAUCET_MEMO;
export const fee: readonly Coin[] = parseCoins(process.env.FAUCET_FEE || "2000ucosm");
export const gas: string = process.env.FAUCET_GAS || "80000";
export const concurrency: number = Number.parseInt(process.env.FAUCET_CONCURRENCY || "", 10) || 5;
export const port: number = Number.parseInt(process.env.FAUCET_PORT || "", 10) || 8000;
export const mnemonic: string | undefined = process.env.FAUCET_MNEMONIC;
export const addressPrefix = process.env.FAUCET_ADDRESS_PREFIX || "cosmos";
export const tokenConfig: TokenConfiguration = {
  bankTokens: parseBankTokens(process.env.FAUCET_TOKENS || "COSM=10^6ucosm, STAKE=10^6ustake"),
};

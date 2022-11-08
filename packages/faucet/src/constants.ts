import { GasPrice } from "@cosmjs/stargate";

import { TokenConfiguration } from "./tokenmanager";
import { parseBankTokens } from "./tokens";

export const binaryName = "Faucet Server";
// export const binaryName = "cosmos-faucet";
export const memo: string | undefined = process.env.FAUCET_MEMO;
export const gasPrice = GasPrice.fromString(process.env.FAUCET_GAS_PRICE || "10000wei");
// export const gasPrice = GasPrice.fromString(process.env.FAUCET_GAS_PRICE || "0.025ucosm");
export const gasLimitSend = process.env.FAUCET_GAS_LIMIT
  ? parseInt(process.env.FAUCET_GAS_LIMIT, 10)
  : 100_000;
export const concurrency: number = Number.parseInt(process.env.FAUCET_CONCURRENCY || "", 10) || 5;
export const port: number = Number.parseInt(process.env.FAUCET_PORT || "", 10) || 8000;
export const mnemonic: string | undefined = process.env.FAUCET_MNEMONIC;
export const addressPrefix = process.env.FAUCET_ADDRESS_PREFIX || "st";
// export const addressPrefix = process.env.FAUCET_ADDRESS_PREFIX || "cosmos";
export const pathPattern = process.env.FAUCET_PATH_PATTERN || "m/44'/606'/0'/0/a";
// export const pathPattern = process.env.FAUCET_PATH_PATTERN || "m/44'/118'/0'/0/a";
export const tokenConfig: TokenConfiguration = {
  bankTokens: parseBankTokens(process.env.FAUCET_TOKENS || "wei, stos"),
  // bankTokens: parseBankTokens(process.env.FAUCET_TOKENS || "ucosm, ustake"),
};
/**
 * Cooldown time in seconds.
 *
 * Defaults to 24 hours if FAUCET_COOLDOWN_TIME unset or an empty string.
 * FAUCET_COOLDOWN_TIME can be set to "0" to deactivate.
 */
export const cooldownTime = process.env.FAUCET_COOLDOWN_TIME
  ? Number.parseInt(process.env.FAUCET_COOLDOWN_TIME, 10)
  : 24 * 3600;

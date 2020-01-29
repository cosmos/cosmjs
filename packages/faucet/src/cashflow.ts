import BN = require("bn.js");

import { Account, Amount, TokenTicker } from "@iov/bcp";
import { Int53 } from "@iov/encoding";

import { Codec } from "./codec";
import * as constants from "./constants";

/** Send `factor` times credit amount on refilling */
const defaultRefillFactor = 20;

/** refill when balance gets below `factor` times credit amount */
const defaultRefillThresholdFactor = 8;

// Load this from connection?
let globalFractionalDigits: number | undefined;

export function setFractionalDigits(input: number): void {
  globalFractionalDigits = input;
}

export function getFractionalDigits(): number {
  if (globalFractionalDigits === undefined) {
    throw new Error("Fractional digits not set");
  }
  return globalFractionalDigits;
}

/** The amount of tokens that will be sent to the user */
export function creditAmount(token: TokenTicker, factor = 1): Amount {
  const amountFromEnv = process.env[`FAUCET_CREDIT_AMOUNT_${token}`];
  const wholeNumber = amountFromEnv ? Int53.fromString(amountFromEnv).toNumber() : 10;
  const total = wholeNumber * factor;
  const fractionalDigits = getFractionalDigits();
  // replace BN with BigInt with TypeScript 3.2 and node 11
  const quantity = new BN(total).imul(new BN(10).pow(new BN(fractionalDigits))).toString();
  return {
    quantity: quantity,
    fractionalDigits: fractionalDigits,
    tokenTicker: token,
  };
}

export function refillAmount(token: TokenTicker): Amount {
  const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_FACTOR || "0", 10) || undefined;
  const factor = factorFromEnv || defaultRefillFactor;
  return creditAmount(token, factor);
}

export function refillThreshold(token: TokenTicker): Amount {
  const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_THRESHOLD || "0", 10) || undefined;
  const factor = factorFromEnv || defaultRefillThresholdFactor;
  return creditAmount(token, factor);
}

/** true iff the distributor account needs a refill */
export function needsRefill(account: Account, token: TokenTicker): boolean {
  const coin = account.balance.find(balance => balance.tokenTicker === token);

  const tokenBalance = coin ? coin.quantity : "0";
  const refillQty = new BN(refillThreshold(token).quantity);
  return new BN(tokenBalance).lt(refillQty);
}

export function gasPrice(codec: Codec): Amount | undefined {
  switch (codec) {
    case Codec.Bns:
    case Codec.Lisk:
    case Codec.CosmWasm:
      return undefined;
    case Codec.Ethereum:
      return {
        quantity: constants.ethereum.gasPrice,
        fractionalDigits: 18,
        tokenTicker: "ETH" as TokenTicker,
      };
    default:
      throw new Error("No gasPrice imlementation found for this codec");
  }
}

export function gasLimit(codec: Codec): Amount | undefined {
  switch (codec) {
    case Codec.Bns:
    case Codec.Lisk:
    case Codec.CosmWasm:
      return undefined;
    case Codec.Ethereum:
      return {
        quantity: constants.ethereum.gasLimit,
        fractionalDigits: 18,
        tokenTicker: "ETH" as TokenTicker,
      };
    default:
      throw new Error("No gasLimit imlementation found for this codec");
  }
}

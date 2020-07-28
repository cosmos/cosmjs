import { Random } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";

import { Msg } from "./msgs";
import { StdFee, StdSignature, StdTx } from "./types";

export function makeRandomAddress(): string {
  return Bech32.encode("cosmos", Random.getBytes(20));
}

export const nonNegativeIntegerMatcher = /^[0-9]+$/;
/** Matches decimals < 1.0 */
export const smallDecimalMatcher = /^0\.[0-9]+$/;
/** Matches decimals >= 1.0 */
export const bigDecimalMatcher = /^[1-9][0-9]*\.[0-9]+$/;
export const tendermintIdMatcher = /^[0-9A-F]{64}$/;
export const tendermintOptionalIdMatcher = /^([0-9A-F]{64}|)$/;
export const tendermintAddressMatcher = /^[0-9A-F]{40}$/;
export const tendermintShortHashMatcher = /^[0-9a-f]{40}$/;
export const dateTimeStampMatcher = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]+)?Z$/;
export const semverMatcher = /^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/;
/** @see https://rgxdb.com/r/1NUN74O6 */
export const base64Matcher = /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/;
export const hexMatcher = /^([0-9a-fA-F][0-9a-fA-F])*$/;

// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
export const bech32AddressMatcher = /^[\x21-\x7e]{1,83}1[02-9ac-hj-np-z]{38}$/;

export const wasmd = {
  endpoint: "http://localhost:1317",
  chainId: "testing",
};

export const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

export const validatorAddress = "cosmosvaloper1fa7hj49pf8uzc4m0lw5swjhhl5th2484gvnlpv";
export const delegatorAddress = "cosmos1fa7hj49pf8uzc4m0lw5swjhhl5th2484dc82dl";

/** Unused account */
export const unused = {
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ",
  },
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
  accountNumber: 19,
  sequence: 0,
};

export function wasmdEnabled(): boolean {
  return !!process.env.WASMD_ENABLED;
}

export function pendingWithoutWasmd(): void {
  if (!wasmdEnabled()) {
    return pending("Set WASMD_ENABLED to enable Wasmd based tests");
  }
}

/** Returns first element. Throws if array has a different length than 1. */
export function fromOneElementArray<T>(elements: ArrayLike<T>): T {
  if (elements.length !== 1) throw new Error(`Expected exactly one element but got ${elements.length}`);
  return elements[0];
}

export function makeSignedTx(firstMsg: Msg, fee: StdFee, memo: string, firstSignature: StdSignature): StdTx {
  return {
    msg: [firstMsg],
    fee: fee,
    memo: memo,
    signatures: [firstSignature],
  };
}

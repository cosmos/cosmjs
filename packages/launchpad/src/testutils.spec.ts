import { Random } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";

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
export const base64Matcher =
  /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/;
export const hexMatcher = /^([0-9a-fA-F][0-9a-fA-F])*$/;

// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
export const bech32AddressMatcher = /^[\x21-\x7e]{1,83}1[02-9ac-hj-np-z]{38}$/;

export const launchpad = {
  endpoint: "http://localhost:1317",
  chainId: "testing",
  moniker: "node001",
  commissionUpdateTime: "2020-10-08T10:18:11.2275025Z",
  validator: {
    pubkey: "cosmosvalconspub1zcjduepqf62c9h86qqn4g9s4khcng86quanw8rn5mm6lf69c99vxff0302ksv2ljyl",
    address: "cosmosvaloper1yfkkk04ve8a0sugj4fe6q6zxuvmvza8r3arurr",
    delegatorAddress: "cosmos1yfkkk04ve8a0sugj4fe6q6zxuvmvza8r5fhf0s",
  },
};

export const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey0: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  pubkey1: {
    type: "tendermint/PubKeySecp256k1",
    value: "AiDosfIbBi54XJ1QjCeApumcy/FjdtF+YhywPf3DKTx7",
  },
  pubkey2: {
    type: "tendermint/PubKeySecp256k1",
    value: "AzQg33JZqH7vSsm09esZY5bZvmzYwE/SY78cA0iLxpD7",
  },
  pubkey3: {
    type: "tendermint/PubKeySecp256k1",
    value: "A3gOAlB6aiRTCPvWMQg2+ZbGYNsLd8qlvV28m8p2UhY2",
  },
  pubkey4: {
    type: "tendermint/PubKeySecp256k1",
    value: "Aum2063ub/ErUnIUB36sK55LktGUStgcbSiaAnL1wadu",
  },
  address0: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
  address1: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
  address2: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
  address3: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx",
  address4: "cosmos1hsm76p4ahyhl5yh3ve9ur49r5kemhp2r0dcjvx",
};

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

export function launchpadEnabled(): boolean {
  return !!process.env.LAUNCHPAD_ENABLED;
}

export function pendingWithoutLaunchpad(): void {
  if (!launchpadEnabled()) {
    return pending("Set LAUNCHPAD_ENABLED to enable Launchpad-based tests");
  }
}

/** Returns first element. Throws if array has a different length than 1. */
export function fromOneElementArray<T>(elements: ArrayLike<T>): T {
  if (elements.length !== 1) throw new Error(`Expected exactly one element but got ${elements.length}`);
  return elements[0];
}

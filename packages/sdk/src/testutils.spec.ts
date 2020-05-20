import { Random } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";

import hackatom from "./testdata/contract.json";

export function getHackatom(): Uint8Array {
  return Encoding.fromBase64(hackatom.data);
}

export function makeRandomAddress(): string {
  return Bech32.encode("cosmos", Random.getBytes(20));
}

export const nonNegativeIntegerMatcher = /^[0-9]+$/;
export const tendermintIdMatcher = /^[0-9A-F]{64}$/;
export const tendermintOptionalIdMatcher = /^([0-9A-F]{64}|)$/;
export const tendermintAddressMatcher = /^[0-9A-F]{40}$/;
export const tendermintShortHashMatcher = /^[0-9a-f]{40}$/;
export const semverMatcher = /^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/;

// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
export const bech32AddressMatcher = /^[\x21-\x7e]{1,83}1[02-9ac-hj-np-z]{38}$/;

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedErc20 = {
  codeId: 1,
  source: "https://not-yet-published.cw-erc20",
  builder: "confio/cosmwasm-opt:0.7.3",
  checksum: "1f6285492e7ea00596ef472ba166cb96ac3f91d694cb8c8e15f7c023ac451947",
  instances: [
    "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5", // HASH
    "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd", // ISA
    "cosmos18r5szma8hm93pvx6lwpjwyxruw27e0k5uw835c", // JADE
  ],
};

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

/** Unused account */
export const unused = {
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ",
  },
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
  accountNumber: 9,
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

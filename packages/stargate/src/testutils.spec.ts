import { Random } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";

export function simappEnabled(): boolean {
  return !!process.env.SIMAPP_ENABLED;
}

export function pendingWithoutSimapp(): void {
  if (!simappEnabled()) {
    return pending("Set SIMAPP_ENABLED to enable Simapp based tests");
  }
}

export function makeRandomAddressBytes(): Uint8Array {
  return Random.getBytes(20);
}

export function makeRandomAddress(): string {
  return Bech32.encode("cosmos", makeRandomAddressBytes());
}

export const simapp = {
  tendermintUrl: "localhost:26657",
  tendermintUrlWs: "ws://localhost:26657",
  tendermintUrlHttp: "http://localhost:26657",
  chainId: "simd-testing",
  denomStaking: "ustake",
  denomFee: "ucosm",
  blockTime: 1_000, // ms
};

export const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey0: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address0: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
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

export const validator = {
  /** From first gentx's auth_info.signer_infos in scripts/simapp/template/.simapp/config/genesis.json */
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A/Ltk7FONB0PJOKrLECIxJe5LcJMy9DcWG6X2WVA2xAi",
  },
  /** delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp/template/.simapp/config/genesis.json */
  address: "cosmos1gyavpqh80z2v7tcgeycfvf0st2nvjrfcp05dad",
  accountNumber: 0,
  sequence: 1,
};

export const nonExistentAddress = "cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd";

export const nonNegativeIntegerMatcher = /^[0-9]+$/;
export const tendermintIdMatcher = /^[0-9A-F]{64}$/;

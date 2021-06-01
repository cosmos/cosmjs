import { Random } from "@cosmjs/crypto";
import { Bech32, fromBase64 } from "@cosmjs/encoding";

import hackatom from "./testdata/contract.json";

/** An internal testing type. SigningCosmWasmClient has a similar but different interface */
export interface ContractUploadInstructions {
  /** The wasm bytecode */
  readonly data: Uint8Array;
  readonly source?: string;
  readonly builder?: string;
}

export function getHackatom(): ContractUploadInstructions {
  return {
    data: fromBase64(hackatom.data),
    source: "https://some.registry.nice/project/raw/0.7/lib/vm/testdata/contract_0.6.wasm.blub.tar.gz",
    builder: "confio/cosmwasm-opt:12.34.56",
  };
}

export function makeRandomAddress(): string {
  return Bech32.encode("cosmos", Random.getBytes(20));
}

export const tendermintIdMatcher = /^[0-9A-F]{64}$/;
/** @see https://rgxdb.com/r/1NUN74O6 */
export const base64Matcher =
  /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/;
// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
export const bech32AddressMatcher = /^[\x21-\x7e]{1,83}1[02-9ac-hj-np-z]{38}$/;

export const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  pubkey0: {
    type: "tendermint/PubKeySecp256k1",
    value: "A9cXhWb8ZpqCzkA8dQCPV29KdeRLV3rUYxrkHudLbQtS",
  },
  address0: "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada",
  address1: "cosmos1hhg2rlu9jscacku2wwckws7932qqqu8x3gfgw0",
  address2: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
  address3: "cosmos17yg9mssjenmc3jkqth6ulcwj9cxujrxxzezwta",
  address4: "cosmos1f7j7ryulwjfe9ljplvhtcaxa6wqgula3etktce",
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

/** Deployed as part of scripts/launchpad/init.sh */
export const deployedHackatom = {
  codeId: 1,
  source: "https://crates.io/api/v1/crates/hackatom/not-yet-released/download",
  builder: "cosmwasm/rust-optimizer:0.9.1",
  checksum: "3defc33a41f58c71d38b176d521c411d8e74d26403fde7660486930c7579a016",
  instances: [
    {
      beneficiary: alice.address0,
      address: "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5",
      label: "From deploy_hackatom.js (0)",
    },
    {
      beneficiary: alice.address1,
      address: "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd",
      label: "From deploy_hackatom.js (1)",
    },
    {
      beneficiary: alice.address2,
      address: "cosmos18r5szma8hm93pvx6lwpjwyxruw27e0k5uw835c",
      label: "From deploy_hackatom.js (2)",
    },
  ],
};

/** Deployed as part of scripts/launchpad/init.sh */
export const deployedErc20 = {
  codeId: 2,
  source: "https://crates.io/api/v1/crates/cw-erc20/0.7.0/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
  checksum: "d04368320ad55089384adb171aaea39e43d710d7608829adba0300ed30aa2988",
  instances: [
    "cosmos1vjecguu37pmd577339wrdp208ddzymkudc46zj", // HASH
    "cosmos1ym5m5dw7pttft5w430nxx6uat8f84ck4algmhg", // ISA
    "cosmos1gv07846a3867ezn3uqkk082c5ftke7hpllcu8q", // JADE
  ],
};

/** Deployed as part of scripts/launchpad/init.sh */
export const deployedCw3 = {
  codeId: 3,
  source: "https://crates.io/api/v1/crates/cw3-fixed-multisig/0.3.1/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
  instances: [
    "cosmos1xqeym28j9xgv0p93pwwt6qcxf9tdvf9zddufdw", // Multisig (1/3)
    "cosmos1jka38ckju8cpjap00jf9xdvdyttz9caujtd6t5", // Multisig (2/3)
    "cosmos12dnl585uxzddjw9hw4ca694f054shgpgr4zg80", // Multisig (uneven weights)
  ],
};

/** Deployed as part of scripts/launchpad/init.sh */
export const deployedCw1 = {
  codeId: 4,
  source: "https://crates.io/api/v1/crates/cw1-subkeys/0.3.1/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
  instances: ["cosmos1vs2vuks65rq7xj78mwtvn7vvnm2gn7ad5me0d2"],
};

export const launchpad = {
  endpoint: "http://localhost:1317",
  chainId: "testing",
  validator: {
    address: "cosmosvaloper1yfkkk04ve8a0sugj4fe6q6zxuvmvza8r3arurr",
  },
};

export function launchpadEnabled(): boolean {
  return !!process.env.LAUNCHPAD_ENABLED;
}

export function pendingWithoutLaunchpad(): void {
  if (!launchpadEnabled()) {
    return pending("Set LAUNCHPAD_ENABLED to enable Launchpad-based tests");
  }
}

export function erc20Enabled(): boolean {
  return !!process.env.ERC20_ENABLED;
}

export function pendingWithoutErc20(): void {
  if (!erc20Enabled()) {
    return pending("Set ERC20_ENABLED to enable ERC20-based tests");
  }
}

export function cw3Enabled(): boolean {
  return !!process.env.CW3_ENABLED;
}

export function pendingWithoutCw3(): void {
  if (!cw3Enabled()) {
    return pending("Set CW3_ENABLED to enable CW3-based tests");
  }
}

export function cw1Enabled(): boolean {
  return !!process.env.CW1_ENABLED;
}

export function pendingWithoutCw1(): void {
  if (!cw1Enabled()) {
    return pending("Set CW1_ENABLED to enable CW1-based tests");
  }
}

/** Returns first element. Throws if array has a different length than 1. */
export function fromOneElementArray<T>(elements: ArrayLike<T>): T {
  if (elements.length !== 1) throw new Error(`Expected exactly one element but got ${elements.length}`);
  return elements[0];
}

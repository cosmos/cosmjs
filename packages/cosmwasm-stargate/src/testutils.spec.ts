/* eslint-disable @typescript-eslint/naming-convention */
import { Bip39, EnglishMnemonic, Random, Secp256k1, Slip10, Slip10Curve } from "@cosmjs/crypto";
import { Bech32, fromBase64 } from "@cosmjs/encoding";
import { coins, makeCosmoshubPath } from "@cosmjs/launchpad";
import { DirectSecp256k1HdWallet, DirectSignResponse, makeAuthInfoBytes } from "@cosmjs/proto-signing";
import {
  AuthExtension,
  BankExtension,
  codec,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
} from "@cosmjs/stargate";
import { adaptor34, Client as TendermintClient } from "@cosmjs/tendermint-rpc";

import { setupWasmExtension, WasmExtension } from "./queries";
import hackatom from "./testdata/contract.json";

type ISignDoc = codec.cosmos.tx.v1beta1.ISignDoc;
const { AuthInfo, TxBody } = codec.cosmos.tx.v1beta1;
const { SignMode } = codec.cosmos.tx.signing.v1beta1;

/** An internal testing type. SigningCosmWasmClient has a similar but different interface */
export interface ContractUploadInstructions {
  /** The wasm bytecode */
  readonly data: Uint8Array;
  readonly source?: string;
  readonly builder?: string;
}

export const wasmd = {
  blockTime: 1_000, // ms
  chainId: "testing",
  endpoint: "http://localhost:26659",
  prefix: "wasm",
  validator: {
    address: "wasmvaloper1m4vhsgne6u74ff78vf0tvkjq3q4hjf9vjfrmy2",
  },
};

export function getHackatom(): ContractUploadInstructions {
  return {
    data: fromBase64(hackatom.data),
    source: "https://crates.io/api/v1/crates/hackatom/not-yet-released/download",
    builder: "cosmwasm/rust-optimizer:0.9.1",
  };
}

export function makeRandomAddress(): string {
  return Bech32.encode("wasm", Random.getBytes(20));
}

export const tendermintIdMatcher = /^[0-9A-F]{64}$/;
/** @see https://rgxdb.com/r/1NUN74O6 */
export const base64Matcher = /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/;
// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
export const bech32AddressMatcher = /^[\x21-\x7e]{1,83}1[02-9ac-hj-np-z]{38}$/;

export const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  pubkey0: {
    type: "tendermint/PubKeySecp256k1",
    value: "A9cXhWb8ZpqCzkA8dQCPV29KdeRLV3rUYxrkHudLbQtS",
  },
  address0: "wasm14qemq0vw6y3gc3u3e0aty2e764u4gs5lndxgyk",
  address1: "wasm1hhg2rlu9jscacku2wwckws7932qqqu8xm5ca8y",
  address2: "wasm1xv9tklw7d82sezh9haa573wufgy59vmwnxhnsl",
  address3: "wasm17yg9mssjenmc3jkqth6ulcwj9cxujrxxg9nmzk",
  address4: "wasm1f7j7ryulwjfe9ljplvhtcaxa6wqgula3nh873j",
};

/** Unused account */
export const unused = {
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ",
  },
  address: "wasm1cjsxept9rkggzxztslae9ndgpdyt240842kpxh",
  accountNumber: 16,
  sequence: 0,
};

export const validator = {
  /** From first gentx's auth_info.signer_infos in scripts/wasmd/template/.wasmd/config/genesis.json */
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "AsYCD9IZsnY3BhSrR3k7mf5iaJD0KkQdwqzLLl9PT+05",
  },
  /** delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/wasmd/template/.wasmd/config/genesis.json */
  delegatorAddress: "wasm1m4vhsgne6u74ff78vf0tvkjq3q4hjf9v84k82s",
  /** validator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/wasmd/template/.wasmd/config/genesis.json */
  validatorAddress: "wasmvaloper1m4vhsgne6u74ff78vf0tvkjq3q4hjf9vjfrmy2",
  accountNumber: 0,
  sequence: 1,
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedHackatom = {
  codeId: 1,
  source: "https://crates.io/api/v1/crates/hackatom/not-yet-released/download",
  builder: "cosmwasm/rust-optimizer:0.9.1",
  checksum: "3defc33a41f58c71d38b176d521c411d8e74d26403fde7660486930c7579a016",
  instances: [
    {
      beneficiary: alice.address0,
      address: "wasm18vd8fpwxzck93qlwghaj6arh4p7c5n89k7fvsl",
      label: "From deploy_hackatom.js (0)",
    },
    {
      beneficiary: alice.address1,
      address: "wasm1hqrdl6wstt8qzshwc6mrumpjk9338k0lffu40x",
      label: "From deploy_hackatom.js (1)",
    },
    {
      beneficiary: alice.address2,
      address: "wasm18r5szma8hm93pvx6lwpjwyxruw27e0k5kjkyan",
      label: "From deploy_hackatom.js (2)",
    },
  ],
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedErc20 = {
  codeId: 2,
  source: "https://crates.io/api/v1/crates/cw-erc20/0.7.0/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
  checksum: "d04368320ad55089384adb171aaea39e43d710d7608829adba0300ed30aa2988",
  instances: [
    "wasm1vjecguu37pmd577339wrdp208ddzymku8yy0te", // HASH
    "wasm1ym5m5dw7pttft5w430nxx6uat8f84ck4hrew7r", // ISA
    "wasm1gv07846a3867ezn3uqkk082c5ftke7hp4rffwt", // JADE
  ],
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedCw3 = {
  codeId: 3,
  source: "https://crates.io/api/v1/crates/cw3-fixed-multisig/0.3.1/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
  instances: [
    "wasm1xqeym28j9xgv0p93pwwt6qcxf9tdvf9z83duy9", // Multisig (1/3)
    "wasm1jka38ckju8cpjap00jf9xdvdyttz9cauchu0zl", // Multisig (2/3)
    "wasm12dnl585uxzddjw9hw4ca694f054shgpgffnawy", // Multisig (uneven weights)
  ],
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedCw1 = {
  codeId: 4,
  source: "https://crates.io/api/v1/crates/cw1-subkeys/0.3.1/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
  instances: ["wasm1vs2vuks65rq7xj78mwtvn7vvnm2gn7ad78g6yp"],
};

export function wasmdEnabled(): boolean {
  return !!process.env.WASMD_ENABLED;
}

export function pendingWithoutWasmd(): void {
  if (!wasmdEnabled()) {
    return pending("Set WASMD_ENABLED to enable Wasmd-based tests");
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

export async function makeWasmClient(
  endpoint: string,
): Promise<QueryClient & AuthExtension & BankExtension & WasmExtension> {
  const tmClient = await TendermintClient.connect(endpoint, adaptor34);
  return QueryClient.withExtensions(tmClient, setupAuthExtension, setupBankExtension, setupWasmExtension);
}

/**
 * A class for testing clients using a direct signer which modifies the transaction it receives before signing
 */
export class ModifyingDirectSecp256k1HdWallet extends DirectSecp256k1HdWallet {
  public static async fromMnemonic(
    mnemonic: string,
    hdPath = makeCosmoshubPath(0),
    prefix = "cosmos",
  ): Promise<DirectSecp256k1HdWallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked);
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath);
    const uncompressed = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return new ModifyingDirectSecp256k1HdWallet(
      mnemonicChecked,
      hdPath,
      privkey,
      Secp256k1.compressPubkey(uncompressed),
      prefix,
    );
  }

  public async signDirect(address: string, signDoc: ISignDoc): Promise<DirectSignResponse> {
    const txBody = TxBody.decode(signDoc.bodyBytes!);
    const modifiedTxBody = TxBody.create({
      ...txBody,
      memo: "This was modified",
    });
    const authInfo = AuthInfo.decode(signDoc.authInfoBytes!);
    const pubkeys = authInfo.signerInfos.map((signerInfo) => signerInfo.publicKey!);
    const sequence = authInfo.signerInfos[0].sequence!.toNumber();
    const modifiedFeeAmount = coins(3000, "ucosm");
    const modifiedGasLimit = 333333;
    const modifiedSignDoc = {
      ...signDoc,
      bodyBytes: Uint8Array.from(TxBody.encode(modifiedTxBody).finish()),
      authInfoBytes: makeAuthInfoBytes(
        pubkeys,
        modifiedFeeAmount,
        modifiedGasLimit,
        sequence,
        SignMode.SIGN_MODE_DIRECT,
      ),
    };
    return super.signDirect(address, modifiedSignDoc);
  }
}

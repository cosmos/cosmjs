/* eslint-disable @typescript-eslint/naming-convention */
import { AminoSignResponse, Secp256k1HdWallet, Secp256k1HdWalletOptions, StdSignDoc } from "@cosmjs/amino";
import { Bip39, EnglishMnemonic, Random } from "@cosmjs/crypto";
import { Bech32, fromBase64 } from "@cosmjs/encoding";
import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1HdWalletOptions,
  DirectSignResponse,
  makeAuthInfoBytes,
} from "@cosmjs/proto-signing";
import {
  AuthExtension,
  BankExtension,
  calculateFee,
  coins,
  GasPrice,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, SignDoc, TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import { setupWasmExtension, WasmExtension } from "./queries";
import { SigningCosmWasmClientOptions } from "./signingcosmwasmclient";
import hackatom from "./testdata/contract.json";

export const defaultGasPrice = GasPrice.fromString("0.025ucosm");
export const defaultSendFee = calculateFee(80_000, defaultGasPrice);
export const defaultUploadFee = calculateFee(1_500_000, defaultGasPrice);
export const defaultInstantiateFee = calculateFee(500_000, defaultGasPrice);
export const defaultExecuteFee = calculateFee(200_000, defaultGasPrice);
export const defaultMigrateFee = calculateFee(200_000, defaultGasPrice);
export const defaultUpdateAdminFee = calculateFee(80_000, defaultGasPrice);
export const defaultClearAdminFee = calculateFee(80_000, defaultGasPrice);

/** An internal testing type. SigningCosmWasmClient has a similar but different interface */
export interface ContractUploadInstructions {
  /** The wasm bytecode */
  readonly data: Uint8Array;
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

/** Setting to speed up testing */
export const defaultSigningClientOptions: SigningCosmWasmClientOptions = {
  broadcastPollIntervalMs: 300,
  broadcastTimeoutMs: 8_000,
};

export function getHackatom(): ContractUploadInstructions {
  return {
    data: fromBase64(hackatom.data),
  };
}

export function makeRandomAddress(): string {
  return Bech32.encode("wasm", Random.getBytes(20));
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
  /**
   * delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/wasmd/template/.wasmd/config/genesis.json
   *
   * `jq ".app_state.genutil.gen_txs[0].body.messages[0].delegator_address" scripts/wasmd/template/.wasmd/config/genesis.json`
   */
  delegatorAddress: "wasm1tjgue6r5kqj5dets24pwaa9u7wuzucpwuva0rv",
  /**
   * validator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/wasmd/template/.wasmd/config/genesis.json
   *
   * `jq ".app_state.genutil.gen_txs[0].body.messages[0].validator_address" scripts/wasmd/template/.wasmd/config/genesis.json`
   */
  validatorAddress: "wasmvaloper1tjgue6r5kqj5dets24pwaa9u7wuzucpwfsgndk",
  accountNumber: 0,
  sequence: 1,
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedHackatom = {
  codeId: 1,
  checksum: "716a97b1c086e0d7769ae7887edaa0e34faba2d7b8cda07f741f9fbf95706e8c",
  instances: [
    {
      beneficiary: alice.address0,
      address: "wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujgqwg3",
      label: "From deploy_hackatom.js (0)",
    },
    {
      beneficiary: alice.address1,
      address: "wasm1suhgf5svhu4usrurvxzlgn54ksxmn8glszahxx",
      label: "From deploy_hackatom.js (1)",
    },
    {
      beneficiary: alice.address2,
      address: "wasm1yyca08xqdgvjz0psg56z67ejh9xms6l49ntww0",
      label: "From deploy_hackatom.js (2)",
    },
  ],
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedIbcReflect = {
  codeId: 2,
  instances: [
    {
      address: "wasm1aakfpghcanxtc45gpqlx8j3rq0zcpyf4duy76f",
      ibcPortId: "wasm.wasm1aakfpghcanxtc45gpqlx8j3rq0zcpyf4duy76f",
    },
  ],
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedCw3 = {
  codeId: 3,
  instances: [
    "wasm1xqeym28j9xgv0p93pwwt6qcxf9tdvf9z83duy9", // Multisig (1/3)
    "wasm1jka38ckju8cpjap00jf9xdvdyttz9cauchu0zl", // Multisig (2/3)
    "wasm12dnl585uxzddjw9hw4ca694f054shgpgffnawy", // Multisig (uneven weights)
  ],
};

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedCw1 = {
  codeId: 4,
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
  const tmClient = await Tendermint34Client.connect(endpoint);
  return QueryClient.withExtensions(tmClient, setupAuthExtension, setupBankExtension, setupWasmExtension);
}

/**
 * A class for testing clients using an Amino signer which modifies the transaction it receives before signing
 */
export class ModifyingSecp256k1HdWallet extends Secp256k1HdWallet {
  public static override async fromMnemonic(
    mnemonic: string,
    options: Partial<Secp256k1HdWalletOptions> = {},
  ): Promise<ModifyingSecp256k1HdWallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
    return new ModifyingSecp256k1HdWallet(mnemonicChecked, { ...options, seed: seed });
  }

  public override async signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
    const modifiedSignDoc = {
      ...signDoc,
      fee: {
        amount: coins(3000, "ucosm"),
        gas: "333333",
      },
      memo: "This was modified",
    };
    return super.signAmino(signerAddress, modifiedSignDoc);
  }
}

/**
 * A class for testing clients using a direct signer which modifies the transaction it receives before signing
 */
export class ModifyingDirectSecp256k1HdWallet extends DirectSecp256k1HdWallet {
  public static override async fromMnemonic(
    mnemonic: string,
    options: Partial<DirectSecp256k1HdWalletOptions> = {},
  ): Promise<DirectSecp256k1HdWallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
    return new ModifyingDirectSecp256k1HdWallet(mnemonicChecked, { ...options, seed: seed });
  }

  public override async signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    const txBody = TxBody.decode(signDoc.bodyBytes);
    const modifiedTxBody = TxBody.fromPartial({
      ...txBody,
      memo: "This was modified",
    });
    const authInfo = AuthInfo.decode(signDoc.authInfoBytes);
    const signers = authInfo.signerInfos.map((signerInfo) => ({
      pubkey: signerInfo.publicKey!,
      sequence: signerInfo.sequence.toNumber(),
    }));
    const modifiedFeeAmount = coins(3000, "ucosm");
    const modifiedGasLimit = 333333;
    const modifiedSignDoc = {
      ...signDoc,
      bodyBytes: Uint8Array.from(TxBody.encode(modifiedTxBody).finish()),
      authInfoBytes: makeAuthInfoBytes(
        signers,
        modifiedFeeAmount,
        modifiedGasLimit,
        SignMode.SIGN_MODE_DIRECT,
      ),
    };
    return super.signDirect(address, modifiedSignDoc);
  }
}

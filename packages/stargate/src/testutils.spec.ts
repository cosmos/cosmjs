/* eslint-disable @typescript-eslint/naming-convention */
import { Bip39, EnglishMnemonic, Random, Secp256k1, Slip10, Slip10Curve } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";
import {
  AminoSignResponse,
  coins,
  makeCosmoshubPath,
  Secp256k1HdWallet,
  StdSignDoc,
} from "@cosmjs/launchpad";
import { DirectSecp256k1HdWallet, DirectSignResponse, makeAuthInfoBytes } from "@cosmjs/proto-signing";

import { SignMode } from "./codec/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, SignDoc, TxBody } from "./codec/cosmos/tx/v1beta1/tx";

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

/** Returns first element. Throws if array has a different length than 1. */
export function fromOneElementArray<T>(elements: ArrayLike<T>): T {
  if (elements.length !== 1) throw new Error(`Expected exactly one element but got ${elements.length}`);
  return elements[0];
}

export const simapp = {
  tendermintUrl: "localhost:26658",
  tendermintUrlWs: "ws://localhost:26658",
  tendermintUrlHttp: "http://localhost:26658",
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
  /**
   * From first gentx's auth_info.signer_infos in scripts/simapp/template/.simapp/config/genesis.json
   *
   * ```
   * jq ".app_state.genutil.gen_txs[0].auth_info.signer_infos[0].public_key" scripts/simapp/template/.simapp/config/genesis.json
   * ```
   */
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "Ap1EN+TjP611NX0PicqFJXknbLmxBbhgoCgGtRF7SLQk",
  },
  /**
   * delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp/template/.simapp/config/genesis.json
   *
   * ```
   * jq ".app_state.genutil.gen_txs[0].body.messages[0].delegator_address" scripts/simapp/template/.simapp/config/genesis.json
   * ```
   */
  delegatorAddress: "cosmos1acf9m2d35rqsk2e7kcgsmkh5ekdjcjh5n86vyq",
  /**
   * validator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp/template/.simapp/config/genesis.json
   *
   * ```
   * jq ".app_state.genutil.gen_txs[0].body.messages[0].validator_address" scripts/simapp/template/.simapp/config/genesis.json
   * ```
   */
  validatorAddress: "cosmosvaloper1acf9m2d35rqsk2e7kcgsmkh5ekdjcjh5knwegn",
  accountNumber: 0,
  sequence: 1,
};

export const nonExistentAddress = "cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd";

export const nonNegativeIntegerMatcher = /^[0-9]+$/;
export const tendermintIdMatcher = /^[0-9A-F]{64}$/;

/**
 * A class for testing clients using an Amino signer which modifies the transaction it receives before signing
 */
export class ModifyingSecp256k1HdWallet extends Secp256k1HdWallet {
  public static async fromMnemonic(
    mnemonic: string,
    hdPath = makeCosmoshubPath(0),
    prefix = "cosmos",
  ): Promise<ModifyingSecp256k1HdWallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked);
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath);
    const uncompressed = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return new ModifyingSecp256k1HdWallet(
      mnemonicChecked,
      hdPath,
      privkey,
      Secp256k1.compressPubkey(uncompressed),
      prefix,
    );
  }

  public async signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
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

  public async signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    const txBody = TxBody.decode(signDoc.bodyBytes);
    const modifiedTxBody = TxBody.fromPartial({
      ...txBody,
      memo: "This was modified",
    });
    const authInfo = AuthInfo.decode(signDoc.authInfoBytes);
    const pubkeys = authInfo.signerInfos.map((signerInfo) => signerInfo.publicKey!);
    const sequence = authInfo.signerInfos[0].sequence.toNumber();
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

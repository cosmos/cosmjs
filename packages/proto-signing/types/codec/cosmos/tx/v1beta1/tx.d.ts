import * as Long from "long";
import { Any } from "../../../google/protobuf/any";
import { SignMode } from "../../../cosmos/tx/signing/v1beta1/signing";
import { CompactBitArray } from "../../../cosmos/crypto/multisig/v1beta1/multisig";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";
/**
 *  Tx is the standard type used for broadcasting transactions.
 */
export interface Tx {
  /**
   *  body is the processable content of the transaction
   */
  body?: TxBody;
  /**
   *  auth_info is the authorization related content of the transaction,
   *  specifically signers, signer modes and fee
   */
  authInfo?: AuthInfo;
  /**
   *  signatures is a list of signatures that matches the length and order of
   *  AuthInfo's signer_infos to allow connecting signature meta information like
   *  public key and signing mode by position.
   */
  signatures: Uint8Array[];
}
/**
 *  TxRaw is a variant of Tx that pins the signer's exact binary representation
 *  of body and auth_info. This is used for signing, broadcasting and
 *  verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 *  the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 *  as the transaction ID.
 */
export interface TxRaw {
  /**
   *  body_bytes is a protobuf serialization of a TxBody that matches the
   *  representation in SignDoc.
   */
  bodyBytes: Uint8Array;
  /**
   *  auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   *  representation in SignDoc.
   */
  authInfoBytes: Uint8Array;
  /**
   *  signatures is a list of signatures that matches the length and order of
   *  AuthInfo's signer_infos to allow connecting signature meta information like
   *  public key and signing mode by position.
   */
  signatures: Uint8Array[];
}
/**
 *  SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT.
 */
export interface SignDoc {
  /**
   *  body_bytes is protobuf serialization of a TxBody that matches the
   *  representation in TxRaw.
   */
  bodyBytes: Uint8Array;
  /**
   *  auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   *  representation in TxRaw.
   */
  authInfoBytes: Uint8Array;
  /**
   *  chain_id is the unique identifier of the chain this transaction targets.
   *  It prevents signed transactions from being used on another chain by an
   *  attacker
   */
  chainId: string;
  /**
   *  account_number is the account number of the account in state
   */
  accountNumber: Long;
}
/**
 *  TxBody is the body of a transaction that all signers sign over.
 */
export interface TxBody {
  /**
   *  messages is a list of messages to be executed. The required signers of
   *  those messages define the number and order of elements in AuthInfo's
   *  signer_infos and Tx's signatures. Each required signer address is added to
   *  the list only the first time it occurs.
   *  By convention, the first required signer (usually from the first message)
   *  is referred to as the primary signer and pays the fee for the whole
   *  transaction.
   */
  messages: Any[];
  /**
   *  memo is any arbitrary memo to be added to the transaction
   */
  memo: string;
  /**
   *  timeout is the block height after which this transaction will not
   *  be processed by the chain
   */
  timeoutHeight: Long;
  /**
   *  extension_options are arbitrary options that can be added by chains
   *  when the default options are not sufficient. If any of these are present
   *  and can't be handled, the transaction will be rejected
   */
  extensionOptions: Any[];
  /**
   *  extension_options are arbitrary options that can be added by chains
   *  when the default options are not sufficient. If any of these are present
   *  and can't be handled, they will be ignored
   */
  nonCriticalExtensionOptions: Any[];
}
/**
 *  AuthInfo describes the fee and signer modes that are used to sign a
 *  transaction.
 */
export interface AuthInfo {
  /**
   *  signer_infos defines the signing modes for the required signers. The number
   *  and order of elements must match the required signers from TxBody's
   *  messages. The first element is the primary signer and the one which pays
   *  the fee.
   */
  signerInfos: SignerInfo[];
  /**
   *  Fee is the fee and gas limit for the transaction. The first signer is the
   *  primary signer and the one which pays the fee. The fee can be calculated
   *  based on the cost of evaluating the body and doing signature verification
   *  of the signers. This can be estimated via simulation.
   */
  fee?: Fee;
}
/**
 *  SignerInfo describes the public key and signing mode of a single top-level
 *  signer.
 */
export interface SignerInfo {
  /**
   *  public_key is the public key of the signer. It is optional for accounts
   *  that already exist in state. If unset, the verifier can use the required \
   *  signer address for this position and lookup the public key.
   */
  publicKey?: Any;
  /**
   *  mode_info describes the signing mode of the signer and is a nested
   *  structure to support nested multisig pubkey's
   */
  modeInfo?: ModeInfo;
  /**
   *  sequence is the sequence of the account, which describes the
   *  number of committed transactions signed by a given address. It is used to
   *  prevent replay attacks.
   */
  sequence: Long;
}
/**
 *  ModeInfo describes the signing mode of a single or nested multisig signer.
 */
export interface ModeInfo {
  /**
   *  single represents a single signer
   */
  single?: ModeInfo_Single | undefined;
  /**
   *  multi represents a nested multisig signer
   */
  multi?: ModeInfo_Multi | undefined;
}
/**
 *  Single is the mode info for a single signer. It is structured as a message
 *  to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 *  future
 */
export interface ModeInfo_Single {
  /**
   *  mode is the signing mode of the single signer
   */
  mode: SignMode;
}
/**
 *  Multi is the mode info for a multisig public key
 */
export interface ModeInfo_Multi {
  /**
   *  bitarray specifies which keys within the multisig are signing
   */
  bitarray?: CompactBitArray;
  /**
   *  mode_infos is the corresponding modes of the signers of the multisig
   *  which could include nested multisig public keys
   */
  modeInfos: ModeInfo[];
}
/**
 *  Fee includes the amount of coins paid in fees and the maximum
 *  gas to be used by the transaction. The ratio yields an effective "gasprice",
 *  which must be above some miminum to be accepted into the mempool.
 */
export interface Fee {
  /**
   *  amount is the amount of coins to be paid as a fee
   */
  amount: Coin[];
  /**
   *  gas_limit is the maximum gas that can be used in transaction processing
   *  before an out of gas error occurs
   */
  gasLimit: Long;
  /**
   *  if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   *  the payer must be a tx signer (and thus have signed this field in AuthInfo).
   *  setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer: string;
  /**
   *  if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   *  to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   *  not support fee grants, this will fail
   */
  granter: string;
}
export declare const protobufPackage = "cosmos.tx.v1beta1";
export declare const Tx: {
  encode(message: Tx, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): Tx;
  fromJSON(object: any): Tx;
  fromPartial(object: DeepPartial<Tx>): Tx;
  toJSON(message: Tx): unknown;
};
export declare const TxRaw: {
  encode(message: TxRaw, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): TxRaw;
  fromJSON(object: any): TxRaw;
  fromPartial(object: DeepPartial<TxRaw>): TxRaw;
  toJSON(message: TxRaw): unknown;
};
export declare const SignDoc: {
  encode(message: SignDoc, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SignDoc;
  fromJSON(object: any): SignDoc;
  fromPartial(object: DeepPartial<SignDoc>): SignDoc;
  toJSON(message: SignDoc): unknown;
};
export declare const TxBody: {
  encode(message: TxBody, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): TxBody;
  fromJSON(object: any): TxBody;
  fromPartial(object: DeepPartial<TxBody>): TxBody;
  toJSON(message: TxBody): unknown;
};
export declare const AuthInfo: {
  encode(message: AuthInfo, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): AuthInfo;
  fromJSON(object: any): AuthInfo;
  fromPartial(object: DeepPartial<AuthInfo>): AuthInfo;
  toJSON(message: AuthInfo): unknown;
};
export declare const SignerInfo: {
  encode(message: SignerInfo, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SignerInfo;
  fromJSON(object: any): SignerInfo;
  fromPartial(object: DeepPartial<SignerInfo>): SignerInfo;
  toJSON(message: SignerInfo): unknown;
};
export declare const ModeInfo: {
  encode(message: ModeInfo, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): ModeInfo;
  fromJSON(object: any): ModeInfo;
  fromPartial(object: DeepPartial<ModeInfo>): ModeInfo;
  toJSON(message: ModeInfo): unknown;
};
export declare const ModeInfo_Single: {
  encode(message: ModeInfo_Single, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): ModeInfo_Single;
  fromJSON(object: any): ModeInfo_Single;
  fromPartial(object: DeepPartial<ModeInfo_Single>): ModeInfo_Single;
  toJSON(message: ModeInfo_Single): unknown;
};
export declare const ModeInfo_Multi: {
  encode(message: ModeInfo_Multi, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): ModeInfo_Multi;
  fromJSON(object: any): ModeInfo_Multi;
  fromPartial(object: DeepPartial<ModeInfo_Multi>): ModeInfo_Multi;
  toJSON(message: ModeInfo_Multi): unknown;
};
export declare const Fee: {
  encode(message: Fee, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): Fee;
  fromJSON(object: any): Fee;
  fromPartial(object: DeepPartial<Fee>): Fee;
  toJSON(message: Fee): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : Partial<T>;
export {};

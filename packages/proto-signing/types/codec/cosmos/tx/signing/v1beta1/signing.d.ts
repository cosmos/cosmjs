import { Any } from "../../../../google/protobuf/any";
import * as Long from "long";
import { CompactBitArray } from "../../../../cosmos/crypto/multisig/v1beta1/multisig";
import { Writer, Reader } from "protobufjs/minimal";
/**
 *  SignatureDescriptors wraps multiple SignatureDescriptor's.
 */
export interface SignatureDescriptors {
  /**
   *  signatures are the signature descriptors
   */
  signatures: SignatureDescriptor[];
}
/**
 *  SignatureDescriptor is a convenience type which represents the full data for
 *  a signature including the public key of the signer, signing modes and the
 *  signature itself. It is primarily used for coordinating signatures between
 *  clients.
 */
export interface SignatureDescriptor {
  /**
   *  public_key is the public key of the signer
   */
  publicKey?: Any;
  data?: SignatureDescriptor_Data;
  /**
   *  sequence is the sequence of the account, which describes the
   *  number of committed transactions signed by a given address. It is used to prevent
   *  replay attacks.
   */
  sequence: Long;
}
/**
 *  Data represents signature data
 */
export interface SignatureDescriptor_Data {
  /**
   *  single represents a single signer
   */
  single?: SignatureDescriptor_Data_Single | undefined;
  /**
   *  multi represents a multisig signer
   */
  multi?: SignatureDescriptor_Data_Multi | undefined;
}
/**
 *  Single is the signature data for a single signer
 */
export interface SignatureDescriptor_Data_Single {
  /**
   *  mode is the signing mode of the single signer
   */
  mode: SignMode;
  /**
   *  signature is the raw signature bytes
   */
  signature: Uint8Array;
}
/**
 *  Multi is the signature data for a multisig public key
 */
export interface SignatureDescriptor_Data_Multi {
  /**
   *  bitarray specifies which keys within the multisig are signing
   */
  bitarray?: CompactBitArray;
  /**
   *  signatures is the signatures of the multi-signature
   */
  signatures: SignatureDescriptor_Data[];
}
export declare const protobufPackage = "cosmos.tx.signing.v1beta1";
/**  SignMode represents a signing mode with its own security guarantees.
 */
export declare enum SignMode {
  /** SIGN_MODE_UNSPECIFIED -  SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
     rejected
     */
  SIGN_MODE_UNSPECIFIED = 0,
  /** SIGN_MODE_DIRECT -  SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
     verified with raw bytes from Tx
     */
  SIGN_MODE_DIRECT = 1,
  /** SIGN_MODE_TEXTUAL -  SIGN_MODE_TEXTUAL is a future signing mode that will verify some
     human-readable textual representation on top of the binary representation
     from SIGN_MODE_DIRECT
     */
  SIGN_MODE_TEXTUAL = 2,
  /** SIGN_MODE_LEGACY_AMINO_JSON -  SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
     Amino JSON and will be removed in the future
     */
  SIGN_MODE_LEGACY_AMINO_JSON = 127,
  UNRECOGNIZED = -1,
}
export declare function signModeFromJSON(object: any): SignMode;
export declare function signModeToJSON(object: SignMode): string;
export declare const SignatureDescriptors: {
  encode(message: SignatureDescriptors, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SignatureDescriptors;
  fromJSON(object: any): SignatureDescriptors;
  fromPartial(object: DeepPartial<SignatureDescriptors>): SignatureDescriptors;
  toJSON(message: SignatureDescriptors): unknown;
};
export declare const SignatureDescriptor: {
  encode(message: SignatureDescriptor, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SignatureDescriptor;
  fromJSON(object: any): SignatureDescriptor;
  fromPartial(object: DeepPartial<SignatureDescriptor>): SignatureDescriptor;
  toJSON(message: SignatureDescriptor): unknown;
};
export declare const SignatureDescriptor_Data: {
  encode(message: SignatureDescriptor_Data, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SignatureDescriptor_Data;
  fromJSON(object: any): SignatureDescriptor_Data;
  fromPartial(object: DeepPartial<SignatureDescriptor_Data>): SignatureDescriptor_Data;
  toJSON(message: SignatureDescriptor_Data): unknown;
};
export declare const SignatureDescriptor_Data_Single: {
  encode(message: SignatureDescriptor_Data_Single, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SignatureDescriptor_Data_Single;
  fromJSON(object: any): SignatureDescriptor_Data_Single;
  fromPartial(object: DeepPartial<SignatureDescriptor_Data_Single>): SignatureDescriptor_Data_Single;
  toJSON(message: SignatureDescriptor_Data_Single): unknown;
};
export declare const SignatureDescriptor_Data_Multi: {
  encode(message: SignatureDescriptor_Data_Multi, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SignatureDescriptor_Data_Multi;
  fromJSON(object: any): SignatureDescriptor_Data_Multi;
  fromPartial(object: DeepPartial<SignatureDescriptor_Data_Multi>): SignatureDescriptor_Data_Multi;
  toJSON(message: SignatureDescriptor_Data_Multi): unknown;
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

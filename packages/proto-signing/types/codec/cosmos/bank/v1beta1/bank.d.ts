import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";
/**
 *  Params defines the parameters for the bank module.
 */
export interface Params {
  sendEnabled: SendEnabled[];
  defaultSendEnabled: boolean;
}
/**
 *  SendEnabled maps coin denom to a send_enabled status (whether a denom is
 *  sendable).
 */
export interface SendEnabled {
  denom: string;
  enabled: boolean;
}
/**
 *  Input models transaction input.
 */
export interface Input {
  address: string;
  coins: Coin[];
}
/**
 *  Output models transaction outputs.
 */
export interface Output {
  address: string;
  coins: Coin[];
}
/**
 *  Supply represents a struct that passively keeps track of the total supply
 *  amounts in the network.
 */
export interface Supply {
  total: Coin[];
}
/**
 *  DenomUnit represents a struct that describes a given
 *  denomination unit of the basic token.
 */
export interface DenomUnit {
  /**
   *  denom represents the string name of the given denom unit (e.g uatom).
   */
  denom: string;
  /**
   *  exponent represents power of 10 exponent that one must
   *  raise the base_denom to in order to equal the given DenomUnit's denom
   *  1 denom = 1^exponent base_denom
   *  (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
   *  exponent = 6, thus: 1 atom = 10^6 uatom).
   */
  exponent: number;
  /**
   *  aliases is a list of string aliases for the given denom
   */
  aliases: string[];
}
/**
 *  Metadata represents a struct that describes
 *  a basic token.
 */
export interface Metadata {
  description: string;
  /**
   *  denom_units represents the list of DenomUnit's for a given coin
   */
  denomUnits: DenomUnit[];
  /**
   *  base represents the base denom (should be the DenomUnit with exponent = 0).
   */
  base: string;
  /**
   *  display indicates the suggested denom that should be
   *  displayed in clients.
   */
  display: string;
}
export declare const protobufPackage = "cosmos.bank.v1beta1";
export declare const Params: {
  encode(message: Params, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): Params;
  fromJSON(object: any): Params;
  fromPartial(object: DeepPartial<Params>): Params;
  toJSON(message: Params): unknown;
};
export declare const SendEnabled: {
  encode(message: SendEnabled, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): SendEnabled;
  fromJSON(object: any): SendEnabled;
  fromPartial(object: DeepPartial<SendEnabled>): SendEnabled;
  toJSON(message: SendEnabled): unknown;
};
export declare const Input: {
  encode(message: Input, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): Input;
  fromJSON(object: any): Input;
  fromPartial(object: DeepPartial<Input>): Input;
  toJSON(message: Input): unknown;
};
export declare const Output: {
  encode(message: Output, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): Output;
  fromJSON(object: any): Output;
  fromPartial(object: DeepPartial<Output>): Output;
  toJSON(message: Output): unknown;
};
export declare const Supply: {
  encode(message: Supply, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): Supply;
  fromJSON(object: any): Supply;
  fromPartial(object: DeepPartial<Supply>): Supply;
  toJSON(message: Supply): unknown;
};
export declare const DenomUnit: {
  encode(message: DenomUnit, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): DenomUnit;
  fromJSON(object: any): DenomUnit;
  fromPartial(object: DeepPartial<DenomUnit>): DenomUnit;
  toJSON(message: DenomUnit): unknown;
};
export declare const Metadata: {
  encode(message: Metadata, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): Metadata;
  fromJSON(object: any): Metadata;
  fromPartial(object: DeepPartial<Metadata>): Metadata;
  toJSON(message: Metadata): unknown;
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

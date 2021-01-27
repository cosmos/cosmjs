import Long from "long";
import { PublicKey } from "../../tendermint/crypto/keys";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.types";
export interface ValidatorSet {
  validators: Validator[];
  proposer?: Validator;
  totalVotingPower: Long;
}
export interface Validator {
  address: Uint8Array;
  pubKey?: PublicKey;
  votingPower: Long;
  proposerPriority: Long;
}
export interface SimpleValidator {
  pubKey?: PublicKey;
  votingPower: Long;
}
export declare const ValidatorSet: {
  encode(message: ValidatorSet, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorSet;
  fromJSON(object: any): ValidatorSet;
  fromPartial(object: DeepPartial<ValidatorSet>): ValidatorSet;
  toJSON(message: ValidatorSet): unknown;
};
export declare const Validator: {
  encode(message: Validator, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Validator;
  fromJSON(object: any): Validator;
  fromPartial(object: DeepPartial<Validator>): Validator;
  toJSON(message: Validator): unknown;
};
export declare const SimpleValidator: {
  encode(message: SimpleValidator, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SimpleValidator;
  fromJSON(object: any): SimpleValidator;
  fromPartial(object: DeepPartial<SimpleValidator>): SimpleValidator;
  toJSON(message: SimpleValidator): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
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

import Long from "long";
import { Duration } from "../../google/protobuf/duration";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.types";
/**
 * ConsensusParams contains consensus critical parameters that determine the
 * validity of blocks.
 */
export interface ConsensusParams {
  block?: BlockParams;
  evidence?: EvidenceParams;
  validator?: ValidatorParams;
  version?: VersionParams;
}
/** BlockParams contains limits on the block size. */
export interface BlockParams {
  /**
   * Max block size, in bytes.
   * Note: must be greater than 0
   */
  maxBytes: Long;
  /**
   * Max gas per block.
   * Note: must be greater or equal to -1
   */
  maxGas: Long;
  /**
   * Minimum time increment between consecutive blocks (in milliseconds) If the
   * block header timestamp is ahead of the system clock, decrease this value.
   *
   * Not exposed to the application.
   */
  timeIotaMs: Long;
}
/** EvidenceParams determine how we handle evidence of malfeasance. */
export interface EvidenceParams {
  /**
   * Max age of evidence, in blocks.
   *
   * The basic formula for calculating this is: MaxAgeDuration / {average block
   * time}.
   */
  maxAgeNumBlocks: Long;
  /**
   * Max age of evidence, in time.
   *
   * It should correspond with an app's "unbonding period" or other similar
   * mechanism for handling [Nothing-At-Stake
   * attacks](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed).
   */
  maxAgeDuration?: Duration;
  /**
   * This sets the maximum size of total evidence in bytes that can be committed in a single block.
   * and should fall comfortably under the max block bytes.
   * Default is 1048576 or 1MB
   */
  maxBytes: Long;
}
/**
 * ValidatorParams restrict the public key types validators can use.
 * NOTE: uses ABCI pubkey naming, not Amino names.
 */
export interface ValidatorParams {
  pubKeyTypes: string[];
}
/** VersionParams contains the ABCI application version. */
export interface VersionParams {
  appVersion: Long;
}
/**
 * HashedParams is a subset of ConsensusParams.
 *
 * It is hashed into the Header.ConsensusHash.
 */
export interface HashedParams {
  blockMaxBytes: Long;
  blockMaxGas: Long;
}
export declare const ConsensusParams: {
  encode(message: ConsensusParams, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ConsensusParams;
  fromJSON(object: any): ConsensusParams;
  fromPartial(object: DeepPartial<ConsensusParams>): ConsensusParams;
  toJSON(message: ConsensusParams): unknown;
};
export declare const BlockParams: {
  encode(message: BlockParams, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BlockParams;
  fromJSON(object: any): BlockParams;
  fromPartial(object: DeepPartial<BlockParams>): BlockParams;
  toJSON(message: BlockParams): unknown;
};
export declare const EvidenceParams: {
  encode(message: EvidenceParams, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EvidenceParams;
  fromJSON(object: any): EvidenceParams;
  fromPartial(object: DeepPartial<EvidenceParams>): EvidenceParams;
  toJSON(message: EvidenceParams): unknown;
};
export declare const ValidatorParams: {
  encode(message: ValidatorParams, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorParams;
  fromJSON(object: any): ValidatorParams;
  fromPartial(object: DeepPartial<ValidatorParams>): ValidatorParams;
  toJSON(message: ValidatorParams): unknown;
};
export declare const VersionParams: {
  encode(message: VersionParams, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): VersionParams;
  fromJSON(object: any): VersionParams;
  fromPartial(object: DeepPartial<VersionParams>): VersionParams;
  toJSON(message: VersionParams): unknown;
};
export declare const HashedParams: {
  encode(message: HashedParams, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): HashedParams;
  fromJSON(object: any): HashedParams;
  fromPartial(object: DeepPartial<HashedParams>): HashedParams;
  toJSON(message: HashedParams): unknown;
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

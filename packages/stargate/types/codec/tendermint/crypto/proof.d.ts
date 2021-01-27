import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.crypto";
export interface Proof {
  total: Long;
  index: Long;
  leafHash: Uint8Array;
  aunts: Uint8Array[];
}
export interface ValueOp {
  /** Encoded in ProofOp.Key. */
  key: Uint8Array;
  /** To encode in ProofOp.Data */
  proof?: Proof;
}
export interface DominoOp {
  key: string;
  input: string;
  output: string;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOp {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOps {
  ops: ProofOp[];
}
export declare const Proof: {
  encode(message: Proof, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Proof;
  fromJSON(object: any): Proof;
  fromPartial(object: DeepPartial<Proof>): Proof;
  toJSON(message: Proof): unknown;
};
export declare const ValueOp: {
  encode(message: ValueOp, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValueOp;
  fromJSON(object: any): ValueOp;
  fromPartial(object: DeepPartial<ValueOp>): ValueOp;
  toJSON(message: ValueOp): unknown;
};
export declare const DominoOp: {
  encode(message: DominoOp, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DominoOp;
  fromJSON(object: any): DominoOp;
  fromPartial(object: DeepPartial<DominoOp>): DominoOp;
  toJSON(message: DominoOp): unknown;
};
export declare const ProofOp: {
  encode(message: ProofOp, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ProofOp;
  fromJSON(object: any): ProofOp;
  fromPartial(object: DeepPartial<ProofOp>): ProofOp;
  toJSON(message: ProofOp): unknown;
};
export declare const ProofOps: {
  encode(message: ProofOps, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ProofOps;
  fromJSON(object: any): ProofOps;
  fromPartial(object: DeepPartial<ProofOps>): ProofOps;
  toJSON(message: ProofOps): unknown;
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

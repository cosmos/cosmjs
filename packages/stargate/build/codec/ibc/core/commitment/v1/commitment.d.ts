import { CommitmentProof } from "../../../../confio/proofs";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.core.commitment.v1";
/**
 * MerkleRoot defines a merkle root hash.
 * In the Cosmos SDK, the AppHash of a block header becomes the root.
 */
export interface MerkleRoot {
  hash: Uint8Array;
}
/**
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
export interface MerklePrefix {
  keyPrefix: Uint8Array;
}
/**
 * MerklePath is the path used to verify commitment proofs, which can be an
 * arbitrary structured object (defined by a commitment type).
 * MerklePath is represented from root-to-leaf
 */
export interface MerklePath {
  keyPath: string[];
}
/**
 * MerkleProof is a wrapper type over a chain of CommitmentProofs.
 * It demonstrates membership or non-membership for an element or set of
 * elements, verifiable in conjunction with a known commitment root. Proofs
 * should be succinct.
 * MerkleProofs are ordered from leaf-to-root
 */
export interface MerkleProof {
  proofs: CommitmentProof[];
}
export declare const MerkleRoot: {
  encode(message: MerkleRoot, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MerkleRoot;
  fromJSON(object: any): MerkleRoot;
  fromPartial(object: DeepPartial<MerkleRoot>): MerkleRoot;
  toJSON(message: MerkleRoot): unknown;
};
export declare const MerklePrefix: {
  encode(message: MerklePrefix, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MerklePrefix;
  fromJSON(object: any): MerklePrefix;
  fromPartial(object: DeepPartial<MerklePrefix>): MerklePrefix;
  toJSON(message: MerklePrefix): unknown;
};
export declare const MerklePath: {
  encode(message: MerklePath, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MerklePath;
  fromJSON(object: any): MerklePath;
  fromPartial(object: DeepPartial<MerklePath>): MerklePath;
  toJSON(message: MerklePath): unknown;
};
export declare const MerkleProof: {
  encode(message: MerkleProof, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MerkleProof;
  fromJSON(object: any): MerkleProof;
  fromPartial(object: DeepPartial<MerkleProof>): MerkleProof;
  toJSON(message: MerkleProof): unknown;
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

import { Proof } from "../../tendermint/crypto/proof";
import { Consensus } from "../../tendermint/version/types";
import Long from "long";
import { ValidatorSet } from "../../tendermint/types/validator";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.types";
/** BlockIdFlag indicates which BlcokID the signature is for */
export declare enum BlockIDFlag {
  BLOCK_ID_FLAG_UNKNOWN = 0,
  BLOCK_ID_FLAG_ABSENT = 1,
  BLOCK_ID_FLAG_COMMIT = 2,
  BLOCK_ID_FLAG_NIL = 3,
  UNRECOGNIZED = -1,
}
export declare function blockIDFlagFromJSON(object: any): BlockIDFlag;
export declare function blockIDFlagToJSON(object: BlockIDFlag): string;
/** SignedMsgType is a type of signed message in the consensus. */
export declare enum SignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = 0,
  /** SIGNED_MSG_TYPE_PREVOTE - Votes */
  SIGNED_MSG_TYPE_PREVOTE = 1,
  SIGNED_MSG_TYPE_PRECOMMIT = 2,
  /** SIGNED_MSG_TYPE_PROPOSAL - Proposals */
  SIGNED_MSG_TYPE_PROPOSAL = 32,
  UNRECOGNIZED = -1,
}
export declare function signedMsgTypeFromJSON(object: any): SignedMsgType;
export declare function signedMsgTypeToJSON(object: SignedMsgType): string;
/** PartsetHeader */
export interface PartSetHeader {
  total: number;
  hash: Uint8Array;
}
export interface Part {
  index: number;
  bytes: Uint8Array;
  proof?: Proof;
}
/** BlockID */
export interface BlockID {
  hash: Uint8Array;
  partSetHeader?: PartSetHeader;
}
/** Header defines the structure of a Tendermint block header. */
export interface Header {
  /** basic block info */
  version?: Consensus;
  chainId: string;
  height: Long;
  time?: Date;
  /** prev block info */
  lastBlockId?: BlockID;
  /** hashes of block data */
  lastCommitHash: Uint8Array;
  /** transactions */
  dataHash: Uint8Array;
  /** hashes from the app output from the prev block */
  validatorsHash: Uint8Array;
  /** validators for the next block */
  nextValidatorsHash: Uint8Array;
  /** consensus params for current block */
  consensusHash: Uint8Array;
  /** state after txs from the previous block */
  appHash: Uint8Array;
  /** root hash of all results from the txs from the previous block */
  lastResultsHash: Uint8Array;
  /** consensus info */
  evidenceHash: Uint8Array;
  /** original proposer of the block */
  proposerAddress: Uint8Array;
}
/** Data contains the set of transactions included in the block */
export interface Data {
  /**
   * Txs that will be applied by state @ block.Height+1.
   * NOTE: not all txs here are valid.  We're just agreeing on the order first.
   * This means that block.AppHash does not include these txs.
   */
  txs: Uint8Array[];
}
/**
 * Vote represents a prevote, precommit, or commit vote from validators for
 * consensus.
 */
export interface Vote {
  type: SignedMsgType;
  height: Long;
  round: number;
  /** zero if vote is nil. */
  blockId?: BlockID;
  timestamp?: Date;
  validatorAddress: Uint8Array;
  validatorIndex: number;
  signature: Uint8Array;
}
/** Commit contains the evidence that a block was committed by a set of validators. */
export interface Commit {
  height: Long;
  round: number;
  blockId?: BlockID;
  signatures: CommitSig[];
}
/** CommitSig is a part of the Vote included in a Commit. */
export interface CommitSig {
  blockIdFlag: BlockIDFlag;
  validatorAddress: Uint8Array;
  timestamp?: Date;
  signature: Uint8Array;
}
export interface Proposal {
  type: SignedMsgType;
  height: Long;
  round: number;
  polRound: number;
  blockId?: BlockID;
  timestamp?: Date;
  signature: Uint8Array;
}
export interface SignedHeader {
  header?: Header;
  commit?: Commit;
}
export interface LightBlock {
  signedHeader?: SignedHeader;
  validatorSet?: ValidatorSet;
}
export interface BlockMeta {
  blockId?: BlockID;
  blockSize: Long;
  header?: Header;
  numTxs: Long;
}
/** TxProof represents a Merkle proof of the presence of a transaction in the Merkle tree. */
export interface TxProof {
  rootHash: Uint8Array;
  data: Uint8Array;
  proof?: Proof;
}
export declare const PartSetHeader: {
  encode(message: PartSetHeader, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartSetHeader;
  fromJSON(object: any): PartSetHeader;
  fromPartial(object: DeepPartial<PartSetHeader>): PartSetHeader;
  toJSON(message: PartSetHeader): unknown;
};
export declare const Part: {
  encode(message: Part, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Part;
  fromJSON(object: any): Part;
  fromPartial(object: DeepPartial<Part>): Part;
  toJSON(message: Part): unknown;
};
export declare const BlockID: {
  encode(message: BlockID, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BlockID;
  fromJSON(object: any): BlockID;
  fromPartial(object: DeepPartial<BlockID>): BlockID;
  toJSON(message: BlockID): unknown;
};
export declare const Header: {
  encode(message: Header, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Header;
  fromJSON(object: any): Header;
  fromPartial(object: DeepPartial<Header>): Header;
  toJSON(message: Header): unknown;
};
export declare const Data: {
  encode(message: Data, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Data;
  fromJSON(object: any): Data;
  fromPartial(object: DeepPartial<Data>): Data;
  toJSON(message: Data): unknown;
};
export declare const Vote: {
  encode(message: Vote, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Vote;
  fromJSON(object: any): Vote;
  fromPartial(object: DeepPartial<Vote>): Vote;
  toJSON(message: Vote): unknown;
};
export declare const Commit: {
  encode(message: Commit, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Commit;
  fromJSON(object: any): Commit;
  fromPartial(object: DeepPartial<Commit>): Commit;
  toJSON(message: Commit): unknown;
};
export declare const CommitSig: {
  encode(message: CommitSig, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CommitSig;
  fromJSON(object: any): CommitSig;
  fromPartial(object: DeepPartial<CommitSig>): CommitSig;
  toJSON(message: CommitSig): unknown;
};
export declare const Proposal: {
  encode(message: Proposal, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Proposal;
  fromJSON(object: any): Proposal;
  fromPartial(object: DeepPartial<Proposal>): Proposal;
  toJSON(message: Proposal): unknown;
};
export declare const SignedHeader: {
  encode(message: SignedHeader, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignedHeader;
  fromJSON(object: any): SignedHeader;
  fromPartial(object: DeepPartial<SignedHeader>): SignedHeader;
  toJSON(message: SignedHeader): unknown;
};
export declare const LightBlock: {
  encode(message: LightBlock, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LightBlock;
  fromJSON(object: any): LightBlock;
  fromPartial(object: DeepPartial<LightBlock>): LightBlock;
  toJSON(message: LightBlock): unknown;
};
export declare const BlockMeta: {
  encode(message: BlockMeta, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BlockMeta;
  fromJSON(object: any): BlockMeta;
  fromPartial(object: DeepPartial<BlockMeta>): BlockMeta;
  toJSON(message: BlockMeta): unknown;
};
export declare const TxProof: {
  encode(message: TxProof, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxProof;
  fromJSON(object: any): TxProof;
  fromPartial(object: DeepPartial<TxProof>): TxProof;
  toJSON(message: TxProof): unknown;
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

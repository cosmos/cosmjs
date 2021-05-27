import { ReadonlyDate } from "readonly-date";

import { ReadonlyDateWithNanoseconds } from "../dates";
import { CommitSignature, ValidatorPubkey } from "../types";

export type Response =
  | AbciInfoResponse
  | AbciQueryResponse
  | BlockResponse
  | BlockResultsResponse
  | BlockchainResponse
  | BroadcastTxAsyncResponse
  | BroadcastTxSyncResponse
  | BroadcastTxCommitResponse
  | CommitResponse
  | GenesisResponse
  | HealthResponse
  | StatusResponse
  | TxResponse
  | TxSearchResponse
  | ValidatorsResponse;

export interface AbciInfoResponse {
  readonly data?: string;
  readonly lastBlockHeight?: number;
  readonly lastBlockAppHash?: Uint8Array;
}

export interface ProofOp {
  readonly type: string;
  readonly key: Uint8Array;
  readonly data: Uint8Array;
}

export interface QueryProof {
  readonly ops: readonly ProofOp[];
}

export interface AbciQueryResponse {
  readonly key: Uint8Array;
  readonly value: Uint8Array;
  readonly proof?: QueryProof;
  readonly height?: number;
  readonly index?: number;
  readonly code?: number; // non-falsy for errors
  readonly log?: string;
}

export interface BlockResponse {
  readonly blockId: BlockId;
  readonly block: Block;
}

export interface BlockResultsResponse {
  readonly height: number;
  readonly results: readonly TxData[];
  readonly validatorUpdates: readonly Validator[];
  readonly consensusUpdates?: ConsensusParams;
  readonly beginBlockEvents: readonly Event[];
  readonly endBlockEvents: readonly Event[];
}

export interface BlockSearchResponse {
  readonly blocks: readonly BlockResponse[];
  readonly totalCount: number;
}

export interface BlockchainResponse {
  readonly lastHeight: number;
  readonly blockMetas: readonly BlockMeta[];
}

/** No data in here because RPC method BroadcastTxAsync "returns right away, with no response" */
export interface BroadcastTxAsyncResponse {}

export interface BroadcastTxSyncResponse extends TxData {
  readonly hash: Uint8Array;
}

/**
 * Returns true iff transaction made it successfully into the transaction pool
 */
export function broadcastTxSyncSuccess(res: BroadcastTxSyncResponse): boolean {
  // code must be 0 on success
  return res.code === 0;
}

export interface BroadcastTxCommitResponse {
  readonly height: number;
  readonly hash: Uint8Array;
  readonly checkTx: TxData;
  readonly deliverTx?: TxData;
}

/**
 * Returns true iff transaction made it successfully into a block
 * (i.e. success in `check_tx` and `deliver_tx` field)
 */
export function broadcastTxCommitSuccess(response: BroadcastTxCommitResponse): boolean {
  // code must be 0 on success
  // deliverTx may be present but empty on failure
  return response.checkTx.code === 0 && !!response.deliverTx && response.deliverTx.code === 0;
}

export interface CommitResponse {
  readonly header: Header;
  readonly commit: Commit;
  readonly canonical: boolean;
}

export interface GenesisResponse {
  readonly genesisTime: ReadonlyDate;
  readonly chainId: string;
  readonly consensusParams: ConsensusParams;
  readonly validators: readonly Validator[];
  readonly appHash: Uint8Array;
  readonly appState: Record<string, unknown> | undefined;
}

export type HealthResponse = null;

export interface StatusResponse {
  readonly nodeInfo: NodeInfo;
  readonly syncInfo: SyncInfo;
  readonly validatorInfo: Validator;
}

/**
 * A transaction from RPC calls like search.
 *
 * Try to keep this compatible to TxEvent
 */
export interface TxResponse {
  readonly tx: Uint8Array;
  readonly hash: Uint8Array;
  readonly height: number;
  readonly index: number;
  readonly result: TxData;
  readonly proof?: TxProof;
}

export interface TxSearchResponse {
  readonly txs: readonly TxResponse[];
  readonly totalCount: number;
}

export interface ValidatorsResponse {
  readonly blockHeight: number;
  readonly validators: readonly Validator[];
  readonly count: number;
  readonly total: number;
}

// Events

export interface NewBlockEvent extends Block {}

export interface NewBlockHeaderEvent extends Header {}

export interface TxEvent {
  readonly tx: Uint8Array;
  readonly hash: Uint8Array;
  readonly height: number;
  /** @deprecated this value is not set in Tendermint 0.34+ */
  readonly index?: number;
  readonly result: TxData;
}

// Helper items used above

/** An event attribute */
export interface Attribute {
  readonly key: Uint8Array;
  readonly value: Uint8Array;
}

export interface Event {
  readonly type: string;
  readonly attributes: readonly Attribute[];
}

export interface TxData {
  readonly code: number;
  readonly codeSpace?: string;
  readonly log?: string;
  readonly data?: Uint8Array;
  readonly events: readonly Event[];
  readonly gasWanted: number;
  readonly gasUsed: number;
}

export interface TxProof {
  readonly data: Uint8Array;
  readonly rootHash: Uint8Array;
  readonly proof: {
    readonly total: number;
    readonly index: number;
    readonly leafHash: Uint8Array;
    readonly aunts: readonly Uint8Array[];
  };
}

export interface BlockMeta {
  readonly blockId: BlockId;
  readonly blockSize: number;
  readonly header: Header;
  readonly numTxs: number;
}

export interface BlockId {
  readonly hash: Uint8Array;
  readonly parts: {
    readonly total: number;
    readonly hash: Uint8Array;
  };
}

export interface Block {
  readonly header: Header;
  /**
   * For the block at height 1, last commit is not set.
   */
  readonly lastCommit: Commit | null;
  readonly txs: readonly Uint8Array[];
  readonly evidence?: readonly Evidence[];
}

export interface Evidence {
  readonly type: string;
  readonly validator: Validator;
  readonly height: number;
  readonly time: number;
  readonly totalVotingPower: number;
}

export interface Commit {
  readonly blockId: BlockId;
  readonly height: number;
  readonly round: number;
  readonly signatures: readonly CommitSignature[];
}

/**
 * raw values from https://github.com/tendermint/tendermint/blob/dfa9a9a30a666132425b29454e90a472aa579a48/types/vote.go#L44
 */
export enum VoteType {
  PreVote = 1,
  PreCommit = 2,
}

export interface Vote {
  readonly type: VoteType;
  readonly validatorAddress: Uint8Array;
  readonly validatorIndex: number;
  readonly height: number;
  readonly round: number;
  readonly timestamp: ReadonlyDate;
  readonly blockId: BlockId;
  readonly signature: Uint8Array;
}

export interface Version {
  readonly block: number;
  readonly app: number;
}

// https://github.com/tendermint/tendermint/blob/v0.31.8/docs/spec/blockchain/blockchain.md
export interface Header {
  // basic block info
  readonly version: Version;
  readonly chainId: string;
  readonly height: number;
  readonly time: ReadonlyDateWithNanoseconds;

  /**
   * Block ID of the previous block. This can be `null` when the currect block is height 1.
   */
  readonly lastBlockId: BlockId | null;

  /**
   * Hashes of block data.
   *
   * This is `sha256("")` for height 1 🤷‍
   */
  readonly lastCommitHash: Uint8Array;
  /**
   * This is `sha256("")` as long as there is no data 🤷‍
   */
  readonly dataHash: Uint8Array;

  // hashes from the app output from the prev block
  readonly validatorsHash: Uint8Array;
  readonly nextValidatorsHash: Uint8Array;
  readonly consensusHash: Uint8Array;
  /**
   * This can be an empty string for height 1 and turn into "0000000000000000" later on 🤷‍
   */
  readonly appHash: Uint8Array;
  /**
   * This is `sha256("")` as long as there is no data 🤷‍
   */
  readonly lastResultsHash: Uint8Array;

  // consensus info
  /**
   * This is `sha256("")` as long as there is no data 🤷‍
   */
  readonly evidenceHash: Uint8Array;
  readonly proposerAddress: Uint8Array;
}

export interface NodeInfo {
  readonly id: Uint8Array;
  /** IP and port */
  readonly listenAddr: string;
  readonly network: string;
  readonly version: string;
  readonly channels: string; // ???
  readonly moniker: string;
  readonly other: Map<string, string>;
  readonly protocolVersion: {
    readonly p2p: number;
    readonly block: number;
    readonly app: number;
  };
}

export interface SyncInfo {
  readonly latestBlockHash: Uint8Array;
  readonly latestAppHash: Uint8Array;
  readonly latestBlockHeight: number;
  readonly latestBlockTime: ReadonlyDate;
  readonly catchingUp: boolean;
}

export interface Validator {
  readonly address: Uint8Array;
  readonly pubkey?: ValidatorPubkey;
  readonly votingPower: number;
  readonly proposerPriority?: number;
}

export interface ConsensusParams {
  readonly block: BlockParams;
  readonly evidence: EvidenceParams;
}

export interface BlockParams {
  readonly maxBytes: number;
  readonly maxGas: number;
}

export interface TxSizeParams {
  readonly maxBytes: number;
  readonly maxGas: number;
}

export interface BlockGossipParams {
  readonly blockPartSizeBytes: number;
}

export interface EvidenceParams {
  readonly maxAgeNumBlocks: number;
  readonly maxAgeDuration: number;
}

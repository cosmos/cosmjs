import Long from "long";
import { Header } from "../../tendermint/types/types";
import { ProofOps } from "../../tendermint/crypto/proof";
import { EvidenceParams, ValidatorParams, VersionParams } from "../../tendermint/types/params";
import { PublicKey } from "../../tendermint/crypto/keys";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.abci";
export declare enum CheckTxType {
  NEW = 0,
  RECHECK = 1,
  UNRECOGNIZED = -1,
}
export declare function checkTxTypeFromJSON(object: any): CheckTxType;
export declare function checkTxTypeToJSON(object: CheckTxType): string;
export declare enum EvidenceType {
  UNKNOWN = 0,
  DUPLICATE_VOTE = 1,
  LIGHT_CLIENT_ATTACK = 2,
  UNRECOGNIZED = -1,
}
export declare function evidenceTypeFromJSON(object: any): EvidenceType;
export declare function evidenceTypeToJSON(object: EvidenceType): string;
export interface Request {
  echo?: RequestEcho | undefined;
  flush?: RequestFlush | undefined;
  info?: RequestInfo | undefined;
  setOption?: RequestSetOption | undefined;
  initChain?: RequestInitChain | undefined;
  query?: RequestQuery | undefined;
  beginBlock?: RequestBeginBlock | undefined;
  checkTx?: RequestCheckTx | undefined;
  deliverTx?: RequestDeliverTx | undefined;
  endBlock?: RequestEndBlock | undefined;
  commit?: RequestCommit | undefined;
  listSnapshots?: RequestListSnapshots | undefined;
  offerSnapshot?: RequestOfferSnapshot | undefined;
  loadSnapshotChunk?: RequestLoadSnapshotChunk | undefined;
  applySnapshotChunk?: RequestApplySnapshotChunk | undefined;
}
export interface RequestEcho {
  message: string;
}
export interface RequestFlush {}
export interface RequestInfo {
  version: string;
  blockVersion: Long;
  p2pVersion: Long;
}
/** nondeterministic */
export interface RequestSetOption {
  key: string;
  value: string;
}
export interface RequestInitChain {
  time?: Date;
  chainId: string;
  consensusParams?: ConsensusParams;
  validators: ValidatorUpdate[];
  appStateBytes: Uint8Array;
  initialHeight: Long;
}
export interface RequestQuery {
  data: Uint8Array;
  path: string;
  height: Long;
  prove: boolean;
}
export interface RequestBeginBlock {
  hash: Uint8Array;
  header?: Header;
  lastCommitInfo?: LastCommitInfo;
  byzantineValidators: Evidence[];
}
export interface RequestCheckTx {
  tx: Uint8Array;
  type: CheckTxType;
}
export interface RequestDeliverTx {
  tx: Uint8Array;
}
export interface RequestEndBlock {
  height: Long;
}
export interface RequestCommit {}
/** lists available snapshots */
export interface RequestListSnapshots {}
/** offers a snapshot to the application */
export interface RequestOfferSnapshot {
  /** snapshot offered by peers */
  snapshot?: Snapshot;
  /** light client-verified app hash for snapshot height */
  appHash: Uint8Array;
}
/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunk {
  height: Long;
  format: number;
  chunk: number;
}
/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunk {
  index: number;
  chunk: Uint8Array;
  sender: string;
}
export interface Response {
  exception?: ResponseException | undefined;
  echo?: ResponseEcho | undefined;
  flush?: ResponseFlush | undefined;
  info?: ResponseInfo | undefined;
  setOption?: ResponseSetOption | undefined;
  initChain?: ResponseInitChain | undefined;
  query?: ResponseQuery | undefined;
  beginBlock?: ResponseBeginBlock | undefined;
  checkTx?: ResponseCheckTx | undefined;
  deliverTx?: ResponseDeliverTx | undefined;
  endBlock?: ResponseEndBlock | undefined;
  commit?: ResponseCommit | undefined;
  listSnapshots?: ResponseListSnapshots | undefined;
  offerSnapshot?: ResponseOfferSnapshot | undefined;
  loadSnapshotChunk?: ResponseLoadSnapshotChunk | undefined;
  applySnapshotChunk?: ResponseApplySnapshotChunk | undefined;
}
/** nondeterministic */
export interface ResponseException {
  error: string;
}
export interface ResponseEcho {
  message: string;
}
export interface ResponseFlush {}
export interface ResponseInfo {
  data: string;
  version: string;
  appVersion: Long;
  lastBlockHeight: Long;
  lastBlockAppHash: Uint8Array;
}
/** nondeterministic */
export interface ResponseSetOption {
  code: number;
  /** bytes data = 2; */
  log: string;
  info: string;
}
export interface ResponseInitChain {
  consensusParams?: ConsensusParams;
  validators: ValidatorUpdate[];
  appHash: Uint8Array;
}
export interface ResponseQuery {
  code: number;
  /** bytes data = 2; // use "value" instead. */
  log: string;
  /** nondeterministic */
  info: string;
  index: Long;
  key: Uint8Array;
  value: Uint8Array;
  proofOps?: ProofOps;
  height: Long;
  codespace: string;
}
export interface ResponseBeginBlock {
  events: Event[];
}
export interface ResponseCheckTx {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gasWanted: Long;
  gasUsed: Long;
  events: Event[];
  codespace: string;
}
export interface ResponseDeliverTx {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gasWanted: Long;
  gasUsed: Long;
  events: Event[];
  codespace: string;
}
export interface ResponseEndBlock {
  validatorUpdates: ValidatorUpdate[];
  consensusParamUpdates?: ConsensusParams;
  events: Event[];
}
export interface ResponseCommit {
  /** reserve 1 */
  data: Uint8Array;
  retainHeight: Long;
}
export interface ResponseListSnapshots {
  snapshots: Snapshot[];
}
export interface ResponseOfferSnapshot {
  result: ResponseOfferSnapshot_Result;
}
export declare enum ResponseOfferSnapshot_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Snapshot accepted, apply chunks */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** REJECT - Reject this specific snapshot, try others */
  REJECT = 3,
  /** REJECT_FORMAT - Reject all snapshots of this format, try others */
  REJECT_FORMAT = 4,
  /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
  REJECT_SENDER = 5,
  UNRECOGNIZED = -1,
}
export declare function responseOfferSnapshot_ResultFromJSON(object: any): ResponseOfferSnapshot_Result;
export declare function responseOfferSnapshot_ResultToJSON(object: ResponseOfferSnapshot_Result): string;
export interface ResponseLoadSnapshotChunk {
  chunk: Uint8Array;
}
export interface ResponseApplySnapshotChunk {
  result: ResponseApplySnapshotChunk_Result;
  /** Chunks to refetch and reapply */
  refetchChunks: number[];
  /** Chunk senders to reject and ban */
  rejectSenders: string[];
}
export declare enum ResponseApplySnapshotChunk_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Chunk successfully accepted */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** RETRY - Retry chunk (combine with refetch and reject) */
  RETRY = 3,
  /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
  RETRY_SNAPSHOT = 4,
  /** REJECT_SNAPSHOT - Reject this snapshot, try others */
  REJECT_SNAPSHOT = 5,
  UNRECOGNIZED = -1,
}
export declare function responseApplySnapshotChunk_ResultFromJSON(
  object: any,
): ResponseApplySnapshotChunk_Result;
export declare function responseApplySnapshotChunk_ResultToJSON(
  object: ResponseApplySnapshotChunk_Result,
): string;
/**
 * ConsensusParams contains all consensus-relevant parameters
 * that can be adjusted by the abci app
 */
export interface ConsensusParams {
  block?: BlockParams;
  evidence?: EvidenceParams;
  validator?: ValidatorParams;
  version?: VersionParams;
}
/** BlockParams contains limits on the block size. */
export interface BlockParams {
  /** Note: must be greater than 0 */
  maxBytes: Long;
  /** Note: must be greater or equal to -1 */
  maxGas: Long;
}
export interface LastCommitInfo {
  round: number;
  votes: VoteInfo[];
}
/**
 * Event allows application developers to attach additional information to
 * ResponseBeginBlock, ResponseEndBlock, ResponseCheckTx and ResponseDeliverTx.
 * Later, transactions may be queried using these events.
 */
export interface Event {
  type: string;
  attributes: EventAttribute[];
}
/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttribute {
  key: Uint8Array;
  value: Uint8Array;
  /** nondeterministic */
  index: boolean;
}
/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResult {
  height: Long;
  index: number;
  tx: Uint8Array;
  result?: ResponseDeliverTx;
}
/** Validator */
export interface Validator {
  /** The first 20 bytes of SHA256(public key) */
  address: Uint8Array;
  /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
  power: Long;
}
/** ValidatorUpdate */
export interface ValidatorUpdate {
  pubKey?: PublicKey;
  power: Long;
}
/** VoteInfo */
export interface VoteInfo {
  validator?: Validator;
  signedLastBlock: boolean;
}
export interface Evidence {
  type: EvidenceType;
  /** The offending validator */
  validator?: Validator;
  /** The height when the offense occurred */
  height: Long;
  /** The corresponding time where the offense occurred */
  time?: Date;
  /**
   * Total voting power of the validator set in case the ABCI application does
   * not store historical validators.
   * https://github.com/tendermint/tendermint/issues/4581
   */
  totalVotingPower: Long;
}
export interface Snapshot {
  /** The height at which the snapshot was taken */
  height: Long;
  /** The application-specific snapshot format */
  format: number;
  /** Number of chunks in the snapshot */
  chunks: number;
  /** Arbitrary snapshot hash, equal only if identical */
  hash: Uint8Array;
  /** Arbitrary application metadata */
  metadata: Uint8Array;
}
export declare const Request: {
  encode(message: Request, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Request;
  fromJSON(object: any): Request;
  fromPartial(object: DeepPartial<Request>): Request;
  toJSON(message: Request): unknown;
};
export declare const RequestEcho: {
  encode(message: RequestEcho, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestEcho;
  fromJSON(object: any): RequestEcho;
  fromPartial(object: DeepPartial<RequestEcho>): RequestEcho;
  toJSON(message: RequestEcho): unknown;
};
export declare const RequestFlush: {
  encode(_: RequestFlush, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestFlush;
  fromJSON(_: any): RequestFlush;
  fromPartial(_: DeepPartial<RequestFlush>): RequestFlush;
  toJSON(_: RequestFlush): unknown;
};
export declare const RequestInfo: {
  encode(message: RequestInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestInfo;
  fromJSON(object: any): RequestInfo;
  fromPartial(object: DeepPartial<RequestInfo>): RequestInfo;
  toJSON(message: RequestInfo): unknown;
};
export declare const RequestSetOption: {
  encode(message: RequestSetOption, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestSetOption;
  fromJSON(object: any): RequestSetOption;
  fromPartial(object: DeepPartial<RequestSetOption>): RequestSetOption;
  toJSON(message: RequestSetOption): unknown;
};
export declare const RequestInitChain: {
  encode(message: RequestInitChain, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestInitChain;
  fromJSON(object: any): RequestInitChain;
  fromPartial(object: DeepPartial<RequestInitChain>): RequestInitChain;
  toJSON(message: RequestInitChain): unknown;
};
export declare const RequestQuery: {
  encode(message: RequestQuery, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestQuery;
  fromJSON(object: any): RequestQuery;
  fromPartial(object: DeepPartial<RequestQuery>): RequestQuery;
  toJSON(message: RequestQuery): unknown;
};
export declare const RequestBeginBlock: {
  encode(message: RequestBeginBlock, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestBeginBlock;
  fromJSON(object: any): RequestBeginBlock;
  fromPartial(object: DeepPartial<RequestBeginBlock>): RequestBeginBlock;
  toJSON(message: RequestBeginBlock): unknown;
};
export declare const RequestCheckTx: {
  encode(message: RequestCheckTx, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestCheckTx;
  fromJSON(object: any): RequestCheckTx;
  fromPartial(object: DeepPartial<RequestCheckTx>): RequestCheckTx;
  toJSON(message: RequestCheckTx): unknown;
};
export declare const RequestDeliverTx: {
  encode(message: RequestDeliverTx, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestDeliverTx;
  fromJSON(object: any): RequestDeliverTx;
  fromPartial(object: DeepPartial<RequestDeliverTx>): RequestDeliverTx;
  toJSON(message: RequestDeliverTx): unknown;
};
export declare const RequestEndBlock: {
  encode(message: RequestEndBlock, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestEndBlock;
  fromJSON(object: any): RequestEndBlock;
  fromPartial(object: DeepPartial<RequestEndBlock>): RequestEndBlock;
  toJSON(message: RequestEndBlock): unknown;
};
export declare const RequestCommit: {
  encode(_: RequestCommit, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestCommit;
  fromJSON(_: any): RequestCommit;
  fromPartial(_: DeepPartial<RequestCommit>): RequestCommit;
  toJSON(_: RequestCommit): unknown;
};
export declare const RequestListSnapshots: {
  encode(_: RequestListSnapshots, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestListSnapshots;
  fromJSON(_: any): RequestListSnapshots;
  fromPartial(_: DeepPartial<RequestListSnapshots>): RequestListSnapshots;
  toJSON(_: RequestListSnapshots): unknown;
};
export declare const RequestOfferSnapshot: {
  encode(message: RequestOfferSnapshot, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestOfferSnapshot;
  fromJSON(object: any): RequestOfferSnapshot;
  fromPartial(object: DeepPartial<RequestOfferSnapshot>): RequestOfferSnapshot;
  toJSON(message: RequestOfferSnapshot): unknown;
};
export declare const RequestLoadSnapshotChunk: {
  encode(message: RequestLoadSnapshotChunk, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestLoadSnapshotChunk;
  fromJSON(object: any): RequestLoadSnapshotChunk;
  fromPartial(object: DeepPartial<RequestLoadSnapshotChunk>): RequestLoadSnapshotChunk;
  toJSON(message: RequestLoadSnapshotChunk): unknown;
};
export declare const RequestApplySnapshotChunk: {
  encode(message: RequestApplySnapshotChunk, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RequestApplySnapshotChunk;
  fromJSON(object: any): RequestApplySnapshotChunk;
  fromPartial(object: DeepPartial<RequestApplySnapshotChunk>): RequestApplySnapshotChunk;
  toJSON(message: RequestApplySnapshotChunk): unknown;
};
export declare const Response: {
  encode(message: Response, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Response;
  fromJSON(object: any): Response;
  fromPartial(object: DeepPartial<Response>): Response;
  toJSON(message: Response): unknown;
};
export declare const ResponseException: {
  encode(message: ResponseException, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseException;
  fromJSON(object: any): ResponseException;
  fromPartial(object: DeepPartial<ResponseException>): ResponseException;
  toJSON(message: ResponseException): unknown;
};
export declare const ResponseEcho: {
  encode(message: ResponseEcho, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseEcho;
  fromJSON(object: any): ResponseEcho;
  fromPartial(object: DeepPartial<ResponseEcho>): ResponseEcho;
  toJSON(message: ResponseEcho): unknown;
};
export declare const ResponseFlush: {
  encode(_: ResponseFlush, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseFlush;
  fromJSON(_: any): ResponseFlush;
  fromPartial(_: DeepPartial<ResponseFlush>): ResponseFlush;
  toJSON(_: ResponseFlush): unknown;
};
export declare const ResponseInfo: {
  encode(message: ResponseInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseInfo;
  fromJSON(object: any): ResponseInfo;
  fromPartial(object: DeepPartial<ResponseInfo>): ResponseInfo;
  toJSON(message: ResponseInfo): unknown;
};
export declare const ResponseSetOption: {
  encode(message: ResponseSetOption, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseSetOption;
  fromJSON(object: any): ResponseSetOption;
  fromPartial(object: DeepPartial<ResponseSetOption>): ResponseSetOption;
  toJSON(message: ResponseSetOption): unknown;
};
export declare const ResponseInitChain: {
  encode(message: ResponseInitChain, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseInitChain;
  fromJSON(object: any): ResponseInitChain;
  fromPartial(object: DeepPartial<ResponseInitChain>): ResponseInitChain;
  toJSON(message: ResponseInitChain): unknown;
};
export declare const ResponseQuery: {
  encode(message: ResponseQuery, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseQuery;
  fromJSON(object: any): ResponseQuery;
  fromPartial(object: DeepPartial<ResponseQuery>): ResponseQuery;
  toJSON(message: ResponseQuery): unknown;
};
export declare const ResponseBeginBlock: {
  encode(message: ResponseBeginBlock, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseBeginBlock;
  fromJSON(object: any): ResponseBeginBlock;
  fromPartial(object: DeepPartial<ResponseBeginBlock>): ResponseBeginBlock;
  toJSON(message: ResponseBeginBlock): unknown;
};
export declare const ResponseCheckTx: {
  encode(message: ResponseCheckTx, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseCheckTx;
  fromJSON(object: any): ResponseCheckTx;
  fromPartial(object: DeepPartial<ResponseCheckTx>): ResponseCheckTx;
  toJSON(message: ResponseCheckTx): unknown;
};
export declare const ResponseDeliverTx: {
  encode(message: ResponseDeliverTx, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseDeliverTx;
  fromJSON(object: any): ResponseDeliverTx;
  fromPartial(object: DeepPartial<ResponseDeliverTx>): ResponseDeliverTx;
  toJSON(message: ResponseDeliverTx): unknown;
};
export declare const ResponseEndBlock: {
  encode(message: ResponseEndBlock, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseEndBlock;
  fromJSON(object: any): ResponseEndBlock;
  fromPartial(object: DeepPartial<ResponseEndBlock>): ResponseEndBlock;
  toJSON(message: ResponseEndBlock): unknown;
};
export declare const ResponseCommit: {
  encode(message: ResponseCommit, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseCommit;
  fromJSON(object: any): ResponseCommit;
  fromPartial(object: DeepPartial<ResponseCommit>): ResponseCommit;
  toJSON(message: ResponseCommit): unknown;
};
export declare const ResponseListSnapshots: {
  encode(message: ResponseListSnapshots, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseListSnapshots;
  fromJSON(object: any): ResponseListSnapshots;
  fromPartial(object: DeepPartial<ResponseListSnapshots>): ResponseListSnapshots;
  toJSON(message: ResponseListSnapshots): unknown;
};
export declare const ResponseOfferSnapshot: {
  encode(message: ResponseOfferSnapshot, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseOfferSnapshot;
  fromJSON(object: any): ResponseOfferSnapshot;
  fromPartial(object: DeepPartial<ResponseOfferSnapshot>): ResponseOfferSnapshot;
  toJSON(message: ResponseOfferSnapshot): unknown;
};
export declare const ResponseLoadSnapshotChunk: {
  encode(message: ResponseLoadSnapshotChunk, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseLoadSnapshotChunk;
  fromJSON(object: any): ResponseLoadSnapshotChunk;
  fromPartial(object: DeepPartial<ResponseLoadSnapshotChunk>): ResponseLoadSnapshotChunk;
  toJSON(message: ResponseLoadSnapshotChunk): unknown;
};
export declare const ResponseApplySnapshotChunk: {
  encode(message: ResponseApplySnapshotChunk, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ResponseApplySnapshotChunk;
  fromJSON(object: any): ResponseApplySnapshotChunk;
  fromPartial(object: DeepPartial<ResponseApplySnapshotChunk>): ResponseApplySnapshotChunk;
  toJSON(message: ResponseApplySnapshotChunk): unknown;
};
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
export declare const LastCommitInfo: {
  encode(message: LastCommitInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LastCommitInfo;
  fromJSON(object: any): LastCommitInfo;
  fromPartial(object: DeepPartial<LastCommitInfo>): LastCommitInfo;
  toJSON(message: LastCommitInfo): unknown;
};
export declare const Event: {
  encode(message: Event, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Event;
  fromJSON(object: any): Event;
  fromPartial(object: DeepPartial<Event>): Event;
  toJSON(message: Event): unknown;
};
export declare const EventAttribute: {
  encode(message: EventAttribute, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EventAttribute;
  fromJSON(object: any): EventAttribute;
  fromPartial(object: DeepPartial<EventAttribute>): EventAttribute;
  toJSON(message: EventAttribute): unknown;
};
export declare const TxResult: {
  encode(message: TxResult, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxResult;
  fromJSON(object: any): TxResult;
  fromPartial(object: DeepPartial<TxResult>): TxResult;
  toJSON(message: TxResult): unknown;
};
export declare const Validator: {
  encode(message: Validator, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Validator;
  fromJSON(object: any): Validator;
  fromPartial(object: DeepPartial<Validator>): Validator;
  toJSON(message: Validator): unknown;
};
export declare const ValidatorUpdate: {
  encode(message: ValidatorUpdate, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatorUpdate;
  fromJSON(object: any): ValidatorUpdate;
  fromPartial(object: DeepPartial<ValidatorUpdate>): ValidatorUpdate;
  toJSON(message: ValidatorUpdate): unknown;
};
export declare const VoteInfo: {
  encode(message: VoteInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): VoteInfo;
  fromJSON(object: any): VoteInfo;
  fromPartial(object: DeepPartial<VoteInfo>): VoteInfo;
  toJSON(message: VoteInfo): unknown;
};
export declare const Evidence: {
  encode(message: Evidence, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Evidence;
  fromJSON(object: any): Evidence;
  fromPartial(object: DeepPartial<Evidence>): Evidence;
  toJSON(message: Evidence): unknown;
};
export declare const Snapshot: {
  encode(message: Snapshot, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Snapshot;
  fromJSON(object: any): Snapshot;
  fromPartial(object: DeepPartial<Snapshot>): Snapshot;
  toJSON(message: Snapshot): unknown;
};
export interface ABCIApplication {
  Echo(request: RequestEcho): Promise<ResponseEcho>;
  Flush(request: RequestFlush): Promise<ResponseFlush>;
  Info(request: RequestInfo): Promise<ResponseInfo>;
  SetOption(request: RequestSetOption): Promise<ResponseSetOption>;
  DeliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx>;
  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
  Query(request: RequestQuery): Promise<ResponseQuery>;
  Commit(request: RequestCommit): Promise<ResponseCommit>;
  InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
  BeginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock>;
  EndBlock(request: RequestEndBlock): Promise<ResponseEndBlock>;
  ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots>;
  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
  LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
  ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
}
export declare class ABCIApplicationClientImpl implements ABCIApplication {
  private readonly rpc;
  constructor(rpc: Rpc);
  Echo(request: RequestEcho): Promise<ResponseEcho>;
  Flush(request: RequestFlush): Promise<ResponseFlush>;
  Info(request: RequestInfo): Promise<ResponseInfo>;
  SetOption(request: RequestSetOption): Promise<ResponseSetOption>;
  DeliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx>;
  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
  Query(request: RequestQuery): Promise<ResponseQuery>;
  Commit(request: RequestCommit): Promise<ResponseCommit>;
  InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
  BeginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock>;
  EndBlock(request: RequestEndBlock): Promise<ResponseEndBlock>;
  ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots>;
  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
  LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
  ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
}
interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
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

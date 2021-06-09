/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, fromHex } from "@cosmjs/encoding";
import { JsonRpcSuccessResponse } from "@cosmjs/json-rpc";
import { assert } from "@cosmjs/utils";

import { fromRfc3339WithNanoseconds } from "../../dates";
import { SubscriptionEvent } from "../../rpcclients";
import { BlockIdFlag, CommitSignature, ValidatorPubkey } from "../../types";
import {
  assertArray,
  assertBoolean,
  assertNotEmpty,
  assertNumber,
  assertObject,
  assertSet,
  assertString,
  dictionaryToStringMap,
  Integer,
  may,
  optional,
} from "../encodings";
import { hashTx } from "../hasher";
import * as responses from "../responses";

interface AbciInfoResult {
  readonly response: RpcAbciInfoResponse;
}

interface RpcAbciInfoResponse {
  readonly data?: string;
  readonly last_block_height?: string;
  /** base64 encoded */
  readonly last_block_app_hash?: string;
}

function decodeAbciInfo(data: RpcAbciInfoResponse): responses.AbciInfoResponse {
  return {
    data: data.data,
    lastBlockHeight: may(Integer.parse, data.last_block_height),
    lastBlockAppHash: may(fromBase64, data.last_block_app_hash),
  };
}

interface AbciQueryResult {
  readonly response: RpcAbciQueryResponse;
}

export interface RpcProofOp {
  readonly type: string;
  /** base64 encoded */
  readonly key: string;
  /** base64 encoded */
  readonly data: string;
}

export interface RpcQueryProof {
  readonly ops: readonly RpcProofOp[];
}

function decodeQueryProof(data: RpcQueryProof): responses.QueryProof {
  return {
    ops: data.ops.map((op) => ({
      type: op.type,
      key: fromBase64(op.key),
      data: fromBase64(op.data),
    })),
  };
}

interface RpcAbciQueryResponse {
  /** base64 encoded */
  readonly key: string;
  /** base64 encoded */
  readonly value?: string;
  readonly proofOps?: RpcQueryProof;
  readonly height?: string;
  readonly index?: string;
  readonly code?: string; // only for errors
  readonly log?: string;
}

function decodeAbciQuery(data: RpcAbciQueryResponse): responses.AbciQueryResponse {
  return {
    key: fromBase64(optional(data.key, "")),
    value: fromBase64(optional(data.value, "")),
    proof: may(decodeQueryProof, data.proofOps),
    height: may(Integer.parse, data.height),
    code: may(Integer.parse, data.code),
    index: may(Integer.parse, data.index),
    log: data.log,
  };
}

interface RpcAttribute {
  /** base64 encoded */
  readonly key: string;
  /** base64 encoded */
  readonly value: string;
}

function decodeAttribute(attribute: RpcAttribute): responses.Attribute {
  return {
    key: fromBase64(assertNotEmpty(attribute.key)),
    value: fromBase64(optional(attribute.value, "")),
  };
}

function decodeAttributes(attributes: readonly RpcAttribute[]): responses.Attribute[] {
  return assertArray(attributes).map(decodeAttribute);
}

interface RpcEvent {
  readonly type: string;
  readonly attributes: readonly RpcAttribute[];
}

function decodeEvent(event: RpcEvent): responses.Event {
  return {
    type: event.type,
    attributes: decodeAttributes(event.attributes),
  };
}

function decodeEvents(events: readonly RpcEvent[]): readonly responses.Event[] {
  return assertArray(events).map(decodeEvent);
}

interface RpcTxData {
  readonly code?: number;
  readonly log?: string;
  /** base64 encoded */
  readonly data?: string;
  readonly events: readonly RpcEvent[];
}

function decodeTxData(data: RpcTxData): responses.TxData {
  return {
    data: may(fromBase64, data.data),
    log: data.log,
    code: Integer.parse(assertNumber(optional<number>(data.code, 0))),
    events: decodeEvents(data.events),
  };
}

// yes, a different format for status and dump consensus state
interface RpcPubkey {
  readonly type: string;
  /** base64 encoded */
  readonly value: string;
}

function decodePubkey(data: RpcPubkey): ValidatorPubkey {
  switch (data.type) {
    // go-amino special code
    case "tendermint/PubKeyEd25519":
      return {
        algorithm: "ed25519",
        data: fromBase64(assertNotEmpty(data.value)),
      };
    case "tendermint/PubKeySecp256k1":
      return {
        algorithm: "secp256k1",
        data: fromBase64(assertNotEmpty(data.value)),
      };
    default:
      throw new Error(`unknown pubkey type: ${data.type}`);
  }
}

// for evidence, block results, etc.
interface RpcValidatorUpdate {
  /** hex encoded */
  readonly address: string;
  readonly pub_key: RpcPubkey;
  readonly voting_power: string;
  readonly proposer_priority: string;
}

function decodeValidatorUpdate(data: RpcValidatorUpdate): responses.Validator {
  return {
    pubkey: decodePubkey(assertObject(data.pub_key)),
    votingPower: Integer.parse(assertNotEmpty(data.voting_power)),
    address: fromHex(assertNotEmpty(data.address)),
    proposerPriority: Integer.parse(data.proposer_priority),
  };
}

interface RpcBlockParams {
  readonly max_bytes: string;
  readonly max_gas: string;
}

/**
 * Note: we do not parse block.time_iota_ms for now because of this CHANGELOG entry
 *
 * > Add time_iota_ms to block's consensus parameters (not exposed to the application)
 * https://github.com/tendermint/tendermint/blob/master/CHANGELOG.md#v0310
 */
function decodeBlockParams(data: RpcBlockParams): responses.BlockParams {
  return {
    maxBytes: Integer.parse(assertNotEmpty(data.max_bytes)),
    maxGas: Integer.parse(assertNotEmpty(data.max_gas)),
  };
}

interface RpcEvidenceParams {
  readonly max_age_num_blocks: string;
  readonly max_age_duration: string;
}

function decodeEvidenceParams(data: RpcEvidenceParams): responses.EvidenceParams {
  return {
    maxAgeNumBlocks: Integer.parse(assertNotEmpty(data.max_age_num_blocks)),
    maxAgeDuration: Integer.parse(assertNotEmpty(data.max_age_duration)),
  };
}

/**
 * Example data:
 * {
 *   "block": {
 *     "max_bytes": "22020096",
 *     "max_gas": "-1",
 *     "time_iota_ms": "1000"
 *   },
 *   "evidence": {
 *     "max_age_num_blocks": "100000",
 *     "max_age_duration": "172800000000000"
 *   },
 *   "validator": {
 *     "pub_key_types": [
 *       "ed25519"
 *     ]
 *   }
 * }
 */
interface RpcConsensusParams {
  readonly block: RpcBlockParams;
  readonly evidence: RpcEvidenceParams;
}

function decodeConsensusParams(data: RpcConsensusParams): responses.ConsensusParams {
  return {
    block: decodeBlockParams(assertObject(data.block)),
    evidence: decodeEvidenceParams(assertObject(data.evidence)),
  };
}

interface RpcBlockResultsResponse {
  readonly height: string;
  readonly txs_results: readonly RpcTxData[] | null;
  readonly begin_block_events: readonly RpcEvent[] | null;
  readonly end_block_events: readonly RpcEvent[] | null;
  readonly validator_updates: readonly RpcValidatorUpdate[] | null;
  readonly consensus_param_updates: RpcConsensusParams | null;
}

function decodeBlockResults(data: RpcBlockResultsResponse): responses.BlockResultsResponse {
  return {
    height: Integer.parse(assertNotEmpty(data.height)),
    results: (data.txs_results || []).map(decodeTxData),
    validatorUpdates: (data.validator_updates || []).map(decodeValidatorUpdate),
    consensusUpdates: may(decodeConsensusParams, data.consensus_param_updates),
    beginBlockEvents: decodeEvents(data.begin_block_events || []),
    endBlockEvents: decodeEvents(data.end_block_events || []),
  };
}

interface RpcBlockId {
  /** hex encoded */
  readonly hash: string;
  readonly parts: {
    readonly total: string;
    /** hex encoded */
    readonly hash: string;
  };
}

function decodeBlockId(data: RpcBlockId): responses.BlockId {
  return {
    hash: fromHex(assertNotEmpty(data.hash)),
    parts: {
      total: Integer.parse(assertNotEmpty(data.parts.total)),
      hash: fromHex(assertNotEmpty(data.parts.hash)),
    },
  };
}

interface RpcBlockVersion {
  readonly block: string;
  readonly app?: string;
}

function decodeBlockVersion(data: RpcBlockVersion): responses.Version {
  return {
    block: Integer.parse(data.block),
    app: Integer.parse(data.app ?? 0),
  };
}

interface RpcHeader {
  readonly version: RpcBlockVersion;
  readonly chain_id: string;
  readonly height: string;
  readonly time: string;
  readonly num_txs: string;
  readonly total_txs: string;

  readonly last_block_id: RpcBlockId;

  /** hex encoded */
  readonly last_commit_hash: string;
  /** hex encoded */
  readonly data_hash: string;

  /** hex encoded */
  readonly validators_hash: string;
  /** hex encoded */
  readonly next_validators_hash: string;
  /** hex encoded */
  readonly consensus_hash: string;
  /** hex encoded */
  readonly app_hash: string;
  /** hex encoded */
  readonly last_results_hash: string;

  /** hex encoded */
  readonly evidence_hash: string;
  /** hex encoded */
  readonly proposer_address: string;
}

function decodeHeader(data: RpcHeader): responses.Header {
  return {
    version: decodeBlockVersion(data.version),
    chainId: assertNotEmpty(data.chain_id),
    height: Integer.parse(assertNotEmpty(data.height)),
    time: fromRfc3339WithNanoseconds(assertNotEmpty(data.time)),

    lastBlockId: decodeBlockId(data.last_block_id),

    lastCommitHash: fromHex(assertNotEmpty(data.last_commit_hash)),
    dataHash: fromHex(assertSet(data.data_hash)),

    validatorsHash: fromHex(assertNotEmpty(data.validators_hash)),
    nextValidatorsHash: fromHex(assertNotEmpty(data.next_validators_hash)),
    consensusHash: fromHex(assertNotEmpty(data.consensus_hash)),
    appHash: fromHex(assertNotEmpty(data.app_hash)),
    lastResultsHash: fromHex(assertSet(data.last_results_hash)),

    evidenceHash: fromHex(assertSet(data.evidence_hash)),
    proposerAddress: fromHex(assertNotEmpty(data.proposer_address)),
  };
}

interface RpcBlockMeta {
  readonly block_id: RpcBlockId;
  readonly header: RpcHeader;
}

function decodeBlockMeta(data: RpcBlockMeta): responses.BlockMeta {
  return {
    blockId: decodeBlockId(data.block_id),
    header: decodeHeader(data.header),
  };
}

interface RpcBlockchainResponse {
  readonly last_height: string;
  readonly block_metas: readonly RpcBlockMeta[];
}

function decodeBlockchain(data: RpcBlockchainResponse): responses.BlockchainResponse {
  return {
    lastHeight: Integer.parse(assertNotEmpty(data.last_height)),
    blockMetas: assertArray(data.block_metas).map(decodeBlockMeta),
  };
}

interface RpcBroadcastTxSyncResponse extends RpcTxData {
  /** hex encoded */
  readonly hash: string;
}

function decodeBroadcastTxSync(data: RpcBroadcastTxSyncResponse): responses.BroadcastTxSyncResponse {
  return {
    ...decodeTxData(data),
    hash: fromHex(assertNotEmpty(data.hash)),
  };
}

interface RpcBroadcastTxCommitResponse {
  readonly height: string;
  /** hex encoded */
  readonly hash: string;
  readonly check_tx: RpcTxData;
  readonly deliver_tx?: RpcTxData;
}

function decodeBroadcastTxCommit(data: RpcBroadcastTxCommitResponse): responses.BroadcastTxCommitResponse {
  return {
    height: Integer.parse(data.height),
    hash: fromHex(assertNotEmpty(data.hash)),
    checkTx: decodeTxData(assertObject(data.check_tx)),
    deliverTx: may(decodeTxData, data.deliver_tx),
  };
}

function decodeBlockIdFlag(blockIdFlag: number): BlockIdFlag {
  assert(blockIdFlag in BlockIdFlag);
  return blockIdFlag;
}

type RpcSignature = {
  readonly block_id_flag: number;
  /** hex encoded */
  readonly validator_address: string;
  readonly timestamp: string;
  /** bae64 encoded */
  readonly signature: string;
};

function decodeCommitSignature(data: RpcSignature): CommitSignature {
  return {
    blockIdFlag: decodeBlockIdFlag(data.block_id_flag),
    validatorAddress: fromHex(data.validator_address),
    timestamp: fromRfc3339WithNanoseconds(assertNotEmpty(data.timestamp)),
    signature: fromBase64(assertNotEmpty(data.signature)),
  };
}

interface RpcCommit {
  readonly block_id: RpcBlockId;
  readonly height: string;
  readonly round: string;
  readonly signatures: readonly RpcSignature[];
}

function decodeCommit(data: RpcCommit): responses.Commit {
  return {
    blockId: decodeBlockId(assertObject(data.block_id)),
    height: Integer.parse(assertNotEmpty(data.height)),
    round: Integer.parse(data.round),
    signatures: assertArray(data.signatures).map(decodeCommitSignature),
  };
}

interface RpcCommitResponse {
  readonly signed_header: {
    readonly header: RpcHeader;
    readonly commit: RpcCommit;
  };
  readonly canonical: boolean;
}

function decodeCommitResponse(data: RpcCommitResponse): responses.CommitResponse {
  return {
    canonical: assertBoolean(data.canonical),
    header: decodeHeader(data.signed_header.header),
    commit: decodeCommit(data.signed_header.commit),
  };
}

interface RpcValidatorGenesis {
  /** hex-encoded */
  readonly address: string;
  readonly pub_key: RpcPubkey;
  readonly power: string;
  readonly name?: string;
}

function decodeValidatorGenesis(data: RpcValidatorGenesis): responses.Validator {
  return {
    address: fromHex(assertNotEmpty(data.address)),
    pubkey: decodePubkey(assertObject(data.pub_key)),
    votingPower: Integer.parse(assertNotEmpty(data.power)),
  };
}

interface RpcGenesisResponse {
  readonly genesis_time: string;
  readonly chain_id: string;
  readonly consensus_params: RpcConsensusParams;
  // The validators key is used to specify a set of validators for testnets or PoA blockchains.
  // PoS blockchains use the app_state.genutil.gentxs field to stake and bond a number of validators in the first block.
  readonly validators?: readonly RpcValidatorGenesis[];
  /** hex encoded */
  readonly app_hash: string;
  readonly app_state: Record<string, unknown> | undefined;
}

interface GenesisResult {
  readonly genesis: RpcGenesisResponse;
}

function decodeGenesis(data: RpcGenesisResponse): responses.GenesisResponse {
  return {
    genesisTime: fromRfc3339WithNanoseconds(assertNotEmpty(data.genesis_time)),
    chainId: assertNotEmpty(data.chain_id),
    consensusParams: decodeConsensusParams(data.consensus_params),
    validators: data.validators ? assertArray(data.validators).map(decodeValidatorGenesis) : [],
    appHash: fromHex(assertSet(data.app_hash)), // empty string in kvstore app
    appState: data.app_state,
  };
}

// this is in status
interface RpcValidatorInfo {
  /** hex encoded */
  readonly address: string;
  readonly pub_key: RpcPubkey;
  readonly voting_power: string;
}

function decodeValidatorInfo(data: RpcValidatorInfo): responses.Validator {
  return {
    pubkey: decodePubkey(assertObject(data.pub_key)),
    votingPower: Integer.parse(assertNotEmpty(data.voting_power)),
    address: fromHex(assertNotEmpty(data.address)),
  };
}

interface RpcNodeInfo {
  /** hex encoded */
  readonly id: string;
  /** IP and port */
  readonly listen_addr: string;
  readonly network: string;
  readonly version: string;
  readonly channels: string; // ???
  readonly moniker: string;
  readonly protocol_version: {
    readonly p2p: string;
    readonly block: string;
    readonly app: string;
  };
  /**
   * Additional information. E.g.
   * {
   *   "tx_index": "on",
   *   "rpc_address":"tcp://0.0.0.0:26657"
   * }
   */
  readonly other: Record<string, unknown>;
}

function decodeNodeInfo(data: RpcNodeInfo): responses.NodeInfo {
  return {
    id: fromHex(assertNotEmpty(data.id)),
    listenAddr: assertNotEmpty(data.listen_addr),
    network: assertNotEmpty(data.network),
    version: assertString(data.version), // Can be empty (https://github.com/cosmos/cosmos-sdk/issues/7963)
    channels: assertNotEmpty(data.channels),
    moniker: assertNotEmpty(data.moniker),
    other: dictionaryToStringMap(data.other),
    protocolVersion: {
      app: Integer.parse(assertNotEmpty(data.protocol_version.app)),
      block: Integer.parse(assertNotEmpty(data.protocol_version.block)),
      p2p: Integer.parse(assertNotEmpty(data.protocol_version.p2p)),
    },
  };
}

interface RpcSyncInfo {
  /** hex encoded */
  readonly latest_block_hash: string;
  /** hex encoded */
  readonly latest_app_hash: string;
  readonly latest_block_height: string;
  readonly latest_block_time: string;
  readonly catching_up: boolean;
}

function decodeSyncInfo(data: RpcSyncInfo): responses.SyncInfo {
  return {
    latestBlockHash: fromHex(assertNotEmpty(data.latest_block_hash)),
    latestAppHash: fromHex(assertNotEmpty(data.latest_app_hash)),
    latestBlockTime: fromRfc3339WithNanoseconds(assertNotEmpty(data.latest_block_time)),
    latestBlockHeight: Integer.parse(assertNotEmpty(data.latest_block_height)),
    catchingUp: assertBoolean(data.catching_up),
  };
}

interface RpcStatusResponse {
  readonly node_info: RpcNodeInfo;
  readonly sync_info: RpcSyncInfo;
  readonly validator_info: RpcValidatorInfo;
}

function decodeStatus(data: RpcStatusResponse): responses.StatusResponse {
  return {
    nodeInfo: decodeNodeInfo(data.node_info),
    syncInfo: decodeSyncInfo(data.sync_info),
    validatorInfo: decodeValidatorInfo(data.validator_info),
  };
}

/**
 * Example data:
 * {
 *   "root_hash": "10A1A17D5F818099B5CAB5B91733A3CC27C0DB6CE2D571AC27FB970C314308BB",
 *   "data": "ZVlERVhDV2lVNEUwPXhTUjc4Tmp2QkNVSg==",
 *   "proof": {
 *     "total": "1",
 *     "index": "0",
 *     "leaf_hash": "EKGhfV+BgJm1yrW5FzOjzCfA22zi1XGsJ/uXDDFDCLs=",
 *     "aunts": []
 *   }
 * }
 */
interface RpcTxProof {
  /** base64 encoded */
  readonly data: string;
  /** hex encoded */
  readonly root_hash: string;
  readonly proof: {
    readonly total: string;
    readonly index: string;
    /** base64 encoded */
    readonly leaf_hash: string;
    /** base64 encoded */
    readonly aunts: readonly string[];
  };
}

function decodeTxProof(data: RpcTxProof): responses.TxProof {
  return {
    data: fromBase64(assertNotEmpty(data.data)),
    rootHash: fromHex(assertNotEmpty(data.root_hash)),
    proof: {
      total: Integer.parse(assertNotEmpty(data.proof.total)),
      index: Integer.parse(assertNotEmpty(data.proof.index)),
      leafHash: fromBase64(assertNotEmpty(data.proof.leaf_hash)),
      aunts: assertArray(data.proof.aunts).map(fromBase64),
    },
  };
}

interface RpcTxResponse {
  /** Raw tx bytes, base64 encoded */
  readonly tx: string;
  readonly tx_result: RpcTxData;
  readonly height: string;
  readonly index: number;
  /** hex encoded */
  readonly hash: string;
  readonly proof?: RpcTxProof;
}

function decodeTxResponse(data: RpcTxResponse): responses.TxResponse {
  return {
    tx: fromBase64(assertNotEmpty(data.tx)),
    result: decodeTxData(assertObject(data.tx_result)),
    height: Integer.parse(assertNotEmpty(data.height)),
    index: Integer.parse(assertNumber(data.index)),
    hash: fromHex(assertNotEmpty(data.hash)),
    proof: may(decodeTxProof, data.proof),
  };
}

interface RpcTxSearchResponse {
  readonly txs: readonly RpcTxResponse[];
  readonly total_count: string;
}

function decodeTxSearch(data: RpcTxSearchResponse): responses.TxSearchResponse {
  return {
    totalCount: Integer.parse(assertNotEmpty(data.total_count)),
    txs: assertArray(data.txs).map(decodeTxResponse),
  };
}

interface RpcTxEvent {
  /** Raw tx bytes, base64 encoded */
  readonly tx: string;
  readonly result: RpcTxData;
  readonly height: string;
  /** Not set since Tendermint 0.34 */
  readonly index?: number;
}

function decodeTxEvent(data: RpcTxEvent): responses.TxEvent {
  const tx = fromBase64(assertNotEmpty(data.tx));
  return {
    tx: tx,
    hash: hashTx(tx),
    result: decodeTxData(data.result),
    height: Integer.parse(assertNotEmpty(data.height)),
    index: may(Integer.parse, data.index),
  };
}

interface RpcValidatorsResponse {
  readonly block_height: string;
  readonly validators: readonly RpcValidatorUpdate[];
  readonly count: string;
  readonly total: string;
}

function decodeValidators(data: RpcValidatorsResponse): responses.ValidatorsResponse {
  return {
    blockHeight: Integer.parse(assertNotEmpty(data.block_height)),
    validators: assertArray(data.validators).map(decodeValidatorUpdate),
    count: Integer.parse(assertNotEmpty(data.count)),
    total: Integer.parse(assertNotEmpty(data.total)),
  };
}

interface RpcEvidence {
  readonly type: string;
  readonly validator: RpcValidatorUpdate;
  readonly height: string;
  readonly time: string;
  readonly totalVotingPower: string;
}

function decodeEvidence(data: RpcEvidence): responses.Evidence {
  return {
    type: assertNotEmpty(data.type),
    height: Integer.parse(assertNotEmpty(data.height)),
    time: Integer.parse(assertNotEmpty(data.time)),
    totalVotingPower: Integer.parse(assertNotEmpty(data.totalVotingPower)),
    validator: decodeValidatorUpdate(data.validator),
  };
}

function decodeEvidences(ev: readonly RpcEvidence[]): readonly responses.Evidence[] {
  return assertArray(ev).map(decodeEvidence);
}

interface RpcBlock {
  readonly header: RpcHeader;
  readonly last_commit: RpcCommit;
  readonly data: {
    /** Raw tx bytes, base64 encoded */
    readonly txs?: readonly string[];
  };
  readonly evidence?: {
    readonly evidence?: readonly RpcEvidence[];
  };
}

function decodeBlock(data: RpcBlock): responses.Block {
  return {
    header: decodeHeader(assertObject(data.header)),
    lastCommit: decodeCommit(assertObject(data.last_commit)),
    txs: data.data.txs ? assertArray(data.data.txs).map(fromBase64) : [],
    evidence: data.evidence && may(decodeEvidences, data.evidence.evidence),
  };
}

interface RpcBlockResponse {
  readonly block_id: RpcBlockId;
  readonly block: RpcBlock;
}

function decodeBlockResponse(data: RpcBlockResponse): responses.BlockResponse {
  return {
    blockId: decodeBlockId(data.block_id),
    block: decodeBlock(data.block),
  };
}

export class Responses {
  public static decodeAbciInfo(response: JsonRpcSuccessResponse): responses.AbciInfoResponse {
    return decodeAbciInfo(assertObject((response.result as AbciInfoResult).response));
  }

  public static decodeAbciQuery(response: JsonRpcSuccessResponse): responses.AbciQueryResponse {
    return decodeAbciQuery(assertObject((response.result as AbciQueryResult).response));
  }

  public static decodeBlock(response: JsonRpcSuccessResponse): responses.BlockResponse {
    return decodeBlockResponse(response.result as RpcBlockResponse);
  }

  public static decodeBlockResults(response: JsonRpcSuccessResponse): responses.BlockResultsResponse {
    return decodeBlockResults(response.result as RpcBlockResultsResponse);
  }

  public static decodeBlockchain(response: JsonRpcSuccessResponse): responses.BlockchainResponse {
    return decodeBlockchain(response.result as RpcBlockchainResponse);
  }

  public static decodeBroadcastTxSync(response: JsonRpcSuccessResponse): responses.BroadcastTxSyncResponse {
    return decodeBroadcastTxSync(response.result as RpcBroadcastTxSyncResponse);
  }

  public static decodeBroadcastTxAsync(response: JsonRpcSuccessResponse): responses.BroadcastTxAsyncResponse {
    return this.decodeBroadcastTxSync(response);
  }

  public static decodeBroadcastTxCommit(
    response: JsonRpcSuccessResponse,
  ): responses.BroadcastTxCommitResponse {
    return decodeBroadcastTxCommit(response.result as RpcBroadcastTxCommitResponse);
  }

  public static decodeCommit(response: JsonRpcSuccessResponse): responses.CommitResponse {
    return decodeCommitResponse(response.result as RpcCommitResponse);
  }

  public static decodeGenesis(response: JsonRpcSuccessResponse): responses.GenesisResponse {
    return decodeGenesis(assertObject((response.result as GenesisResult).genesis));
  }

  public static decodeHealth(): responses.HealthResponse {
    return null;
  }

  public static decodeStatus(response: JsonRpcSuccessResponse): responses.StatusResponse {
    return decodeStatus(response.result as RpcStatusResponse);
  }

  public static decodeNewBlockEvent(event: SubscriptionEvent): responses.NewBlockEvent {
    return decodeBlock(event.data.value.block as RpcBlock);
  }

  public static decodeNewBlockHeaderEvent(event: SubscriptionEvent): responses.NewBlockHeaderEvent {
    return decodeHeader(event.data.value.header as RpcHeader);
  }

  public static decodeTxEvent(event: SubscriptionEvent): responses.TxEvent {
    return decodeTxEvent(event.data.value.TxResult as RpcTxEvent);
  }

  public static decodeTx(response: JsonRpcSuccessResponse): responses.TxResponse {
    return decodeTxResponse(response.result as RpcTxResponse);
  }

  public static decodeTxSearch(response: JsonRpcSuccessResponse): responses.TxSearchResponse {
    return decodeTxSearch(response.result as RpcTxSearchResponse);
  }

  public static decodeValidators(response: JsonRpcSuccessResponse): responses.ValidatorsResponse {
    return decodeValidators(response.result as RpcValidatorsResponse);
  }
}

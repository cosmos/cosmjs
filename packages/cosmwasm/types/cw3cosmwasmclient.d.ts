import { BroadcastMode, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";
import { CosmosMsg } from "./cosmosmsg";
import { Account } from "./cosmwasmclient";
import { Expiration } from "./interfaces";
import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";
/**
 * @see https://github.com/CosmWasm/cosmwasm-plus/blob/v0.3.2/packages/cw3/src/msg.rs#L35
 */
export declare enum Vote {
  Yes = "yes",
  No = "no",
  Abstain = "abstain",
  Veto = "veto",
}
export interface ThresholdResult {
  readonly absolute_count: {
    readonly weight_needed: number;
    readonly total_weight: number;
  };
}
export interface ProposalResult {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly msgs: readonly CosmosMsg[];
  readonly expires: Expiration;
  readonly status: string;
}
export interface ProposalsResult {
  readonly proposals: readonly ProposalResult[];
}
export interface VoteResult {
  readonly vote: Vote;
}
export interface VotesResult {
  readonly votes: ReadonlyArray<{
    readonly vote: Vote;
    readonly voter: string;
    readonly weight: number;
  }>;
}
export interface VoterResult {
  readonly addr: string;
  readonly weight: number;
}
export interface VotersResult {
  readonly voters: readonly VoterResult[];
}
interface StartBeforeNumberPaginationOptions {
  readonly startBefore?: number;
  readonly limit?: number;
}
interface StartAfterNumberPaginationOptions {
  readonly startAfter?: number;
  readonly limit?: number;
}
interface StartAfterStringPaginationOptions {
  readonly startAfter?: string;
  readonly limit?: number;
}
export declare class Cw3CosmWasmClient extends SigningCosmWasmClient {
  readonly cw3ContractAddress: string;
  constructor(
    apiUrl: string,
    signerAddress: string,
    signer: OfflineSigner,
    cw3ContractAddress: string,
    gasPrice?: GasPrice,
    gasLimits?: Partial<GasLimits<CosmWasmFeeTable>>,
    broadcastMode?: BroadcastMode,
  );
  getAccount(address?: string): Promise<Account | undefined>;
  getThreshold(): Promise<ThresholdResult>;
  getProposal(proposalId: number): Promise<ProposalResult>;
  listProposals({ startAfter, limit }?: StartAfterNumberPaginationOptions): Promise<ProposalsResult>;
  reverseProposals({ startBefore, limit }?: StartBeforeNumberPaginationOptions): Promise<ProposalsResult>;
  getVote(proposalId: number, voter: string): Promise<VoteResult>;
  listVotes(
    proposalId: number,
    { startAfter, limit }?: StartAfterStringPaginationOptions,
  ): Promise<VotesResult>;
  getVoter(address: string): Promise<VoterResult>;
  listVoters({ startAfter, limit }?: StartAfterStringPaginationOptions): Promise<VotersResult>;
  createMultisigProposal(
    title: string,
    description: string,
    msgs: readonly CosmosMsg[],
    earliest?: Expiration,
    latest?: Expiration,
    memo?: string,
  ): Promise<ExecuteResult>;
  voteMultisigProposal(proposalId: number, vote: Vote, memo?: string): Promise<ExecuteResult>;
  executeMultisigProposal(proposalId: number, memo?: string): Promise<ExecuteResult>;
  closeMultisigProposal(proposalId: number, memo?: string): Promise<ExecuteResult>;
}
export {};

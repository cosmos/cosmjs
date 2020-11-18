import { BroadcastMode, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";
import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";
export declare type Expiration =
  | {
      readonly at_height: number;
    }
  | {
      readonly at_time: number;
    };
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
  readonly msgs: ReadonlyArray<Record<string, unknown>>;
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
export declare class Cw3CosmWasmClient extends SigningCosmWasmClient {
  private readonly cw3ContractAddress;
  constructor(
    apiUrl: string,
    senderAddress: string,
    signer: OfflineSigner,
    cw3ContractAddress: string,
    gasPrice?: GasPrice,
    gasLimits?: Partial<GasLimits<CosmWasmFeeTable>>,
    broadcastMode?: BroadcastMode,
  );
  getThreshold(): Promise<ThresholdResult>;
  getProposal(proposalId: number): Promise<ProposalResult>;
  listProposals(startAfter?: number, limit?: number): Promise<ProposalsResult>;
  reverseProposals(startBefore?: number, limit?: number): Promise<ProposalsResult>;
  getVote(proposalId: number, voter: string): Promise<VoteResult>;
  listVotes(proposalId: number, startAfter?: string, limit?: number): Promise<VotesResult>;
  getVoter(address: string): Promise<VoterResult>;
  listVoters(startAfter?: string, limit?: number): Promise<VotersResult>;
  createMultisigProposal(
    title: string,
    description: string,
    msgs: ReadonlyArray<Record<string, unknown>>,
    earliest?: Expiration,
    latest?: Expiration,
    memo?: string,
  ): Promise<ExecuteResult>;
  voteMultisigProposal(proposalId: number, vote: Vote, memo?: string): Promise<ExecuteResult>;
  executeMultisigProposal(proposalId: number, memo?: string): Promise<ExecuteResult>;
  closeMultisigProposal(proposalId: number, memo?: string): Promise<ExecuteResult>;
}

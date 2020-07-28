import { Coin } from "../coins";
import { LcdClient } from "./lcdclient";
export declare enum GovParametersType {
  Deposit = "deposit",
  Tallying = "tallying",
  Voting = "voting",
}
export interface GovParametersDepositResponse {
  readonly height: string;
  readonly result: {
    readonly min_deposit: readonly Coin[];
    readonly max_deposit_period: string;
  };
}
export interface GovParametersTallyingResponse {
  readonly height: string;
  readonly result: {
    readonly quorum: string;
    readonly threshold: string;
    readonly veto: string;
  };
}
export interface GovParametersVotingResponse {
  readonly height: string;
  readonly result: {
    readonly voting_period: string;
  };
}
export declare type GovParametersResponse =
  | GovParametersDepositResponse
  | GovParametersTallyingResponse
  | GovParametersVotingResponse;
export interface Tally {
  readonly yes: string;
  readonly abstain: string;
  readonly no: string;
  readonly no_with_veto: string;
}
export interface Proposal {
  readonly id: string;
  readonly proposal_status: string;
  readonly final_tally_result: Tally;
  readonly submit_time: string;
  readonly total_deposit: readonly Coin[];
  readonly deposit_end_time: string;
  readonly voting_start_time: string;
  readonly voting_end_time: string;
  readonly content: {
    readonly type: string;
    readonly value: {
      readonly title: string;
      readonly description: string;
    };
  };
}
export interface GovProposalsResponse {
  readonly height: string;
  readonly result: readonly Proposal[];
}
export interface GovProposalResponse {
  readonly height: string;
  readonly result: Proposal;
}
export interface GovProposerResponse {
  readonly height: string;
  readonly result: {
    readonly proposal_id: string;
    readonly proposer: string;
  };
}
export interface Deposit {
  readonly amount: readonly Coin[];
  readonly proposal_id: string;
  readonly depositor: string;
}
export interface GovDepositsResponse {
  readonly height: string;
  readonly result: readonly Deposit[];
}
export interface GovDepositResponse {
  readonly height: string;
  readonly result: Deposit;
}
export interface GovTallyResponse {
  readonly height: string;
  readonly result: Tally;
}
export interface Vote {
  readonly voter: string;
  readonly proposal_id: string;
  readonly option: string;
}
export interface GovVotesResponse {
  readonly height: string;
  readonly result: readonly Vote[];
}
export interface GovVoteResponse {
  readonly height: string;
  readonly result: Vote;
}
export interface GovExtension {
  readonly gov: {
    readonly parameters: (parametersType: GovParametersType) => Promise<GovParametersResponse>;
    readonly proposals: () => Promise<GovProposalsResponse>;
    readonly proposal: (proposalId: string) => Promise<GovProposalResponse>;
    readonly proposer: (proposalId: string) => Promise<GovProposerResponse>;
    readonly deposits: (proposalId: string) => Promise<GovDepositsResponse>;
    readonly deposit: (proposalId: string, depositorAddress: string) => Promise<GovDepositResponse>;
    readonly tally: (proposalId: string) => Promise<GovTallyResponse>;
    readonly votes: (proposalId: string) => Promise<GovVotesResponse>;
    readonly vote: (proposalId: string, voterAddress: string) => Promise<GovVoteResponse>;
  };
}
export declare function setupGovExtension(base: LcdClient): GovExtension;

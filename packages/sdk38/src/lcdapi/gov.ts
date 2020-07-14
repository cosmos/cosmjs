import { Coin } from "../coins";
import { LcdClient } from "./lcdclient";

export enum GovParametersType {
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

export type GovParametersByTypeResponse =
  | GovParametersDepositResponse
  | GovParametersTallyingResponse
  | GovParametersVotingResponse;

export interface TallyResult {
  readonly yes: string;
  readonly abstain: string;
  readonly no: string;
  readonly no_with_veto: string;
}

export interface TextProposal {
  readonly proposal_id: number;
  readonly title: string;
  readonly description: string;
  readonly proposal_type: string;
  readonly proposal_status: string;
  readonly final_tally_result: TallyResult;
  readonly submit_time: string;
  readonly total_deposit: readonly Coin[];
  readonly voting_start_time: string;
}

export interface GovProposalsResponse {
  readonly height: string;
  readonly result: readonly TextProposal[];
}

export interface GovProposalsByIdResponse {
  readonly height: string;
  readonly result: {};
}

export interface GovProposerResponse {
  readonly height: string;
  readonly result: {};
}

export interface GovDepositsResponse {
  readonly height: string;
  readonly result: {};
}

export interface GovDepositsByDepositorResponse {
  readonly height: string;
  readonly result: {};
}

export interface GovTallyResponse {
  readonly height: string;
  readonly result: {};
}

export interface GovVotesResponse {
  readonly height: string;
  readonly result: {};
}

export interface GovVotesByVoterResponse {
  readonly height: string;
  readonly result: {};
}

export interface GovExtension {
  readonly gov: {
    readonly parametersByType: (parametersType: GovParametersType) => Promise<GovParametersByTypeResponse>;
    readonly proposals: () => Promise<GovProposalsResponse>;
  };
}

export function setupGovExtension(base: LcdClient): GovExtension {
  return {
    gov: {
      parametersByType: async (parametersType: GovParametersType) =>
        base.get(`/gov/parameters/${parametersType}`),
      proposals: async () => base.get("/gov/proposals"),
    },
  };
}

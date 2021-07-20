/* eslint-disable @typescript-eslint/naming-convention */
import { BroadcastMode, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";

import { CosmosMsg } from "./cosmosmsg";
import { Account } from "./cosmwasmclient";
import { Expiration } from "./interfaces";
import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";

/**
 * @see https://github.com/CosmWasm/cosmwasm-plus/blob/v0.3.2/packages/cw3/src/msg.rs#L35
 */
export enum Vote {
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
  readonly votes: ReadonlyArray<{ readonly vote: Vote; readonly voter: string; readonly weight: number }>;
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

export class Cw3CosmWasmClient extends SigningCosmWasmClient {
  public readonly cw3ContractAddress: string;

  public constructor(
    apiUrl: string,
    signerAddress: string,
    signer: OfflineSigner,
    cw3ContractAddress: string,
    gasPrice?: GasPrice,
    gasLimits?: Partial<GasLimits<CosmWasmFeeTable>>,
    broadcastMode?: BroadcastMode,
  ) {
    super(apiUrl, signerAddress, signer, gasPrice, gasLimits, broadcastMode);
    this.cw3ContractAddress = cw3ContractAddress;
  }

  public override getAccount(address?: string): Promise<Account | undefined> {
    return super.getAccount(address || this.cw3ContractAddress);
  }

  public getThreshold(): Promise<ThresholdResult> {
    return this.queryContractSmart(this.cw3ContractAddress, { threshold: {} });
  }

  public getProposal(proposalId: number): Promise<ProposalResult> {
    return this.queryContractSmart(this.cw3ContractAddress, { proposal: { proposal_id: proposalId } });
  }

  public listProposals({
    startAfter,
    limit,
  }: StartAfterNumberPaginationOptions = {}): Promise<ProposalsResult> {
    return this.queryContractSmart(this.cw3ContractAddress, {
      list_proposals: {
        start_after: startAfter,
        limit: limit,
      },
    });
  }

  public reverseProposals({
    startBefore,
    limit,
  }: StartBeforeNumberPaginationOptions = {}): Promise<ProposalsResult> {
    return this.queryContractSmart(this.cw3ContractAddress, {
      reverse_proposals: {
        start_before: startBefore,
        limit: limit,
      },
    });
  }

  public getVote(proposalId: number, voter: string): Promise<VoteResult> {
    return this.queryContractSmart(this.cw3ContractAddress, {
      vote: {
        proposal_id: proposalId,
        voter: voter,
      },
    });
  }

  public listVotes(
    proposalId: number,
    { startAfter, limit }: StartAfterStringPaginationOptions = {},
  ): Promise<VotesResult> {
    return this.queryContractSmart(this.cw3ContractAddress, {
      list_votes: {
        proposal_id: proposalId,
        start_after: startAfter,
        limit: limit,
      },
    });
  }

  public getVoter(address: string): Promise<VoterResult> {
    return this.queryContractSmart(this.cw3ContractAddress, {
      voter: {
        address: address,
      },
    });
  }

  public listVoters({ startAfter, limit }: StartAfterStringPaginationOptions = {}): Promise<VotersResult> {
    return this.queryContractSmart(this.cw3ContractAddress, {
      list_voters: {
        start_after: startAfter,
        limit: limit,
      },
    });
  }

  public createMultisigProposal(
    title: string,
    description: string,
    msgs: readonly CosmosMsg[],
    earliest?: Expiration,
    latest?: Expiration,
    memo = "",
  ): Promise<ExecuteResult> {
    const handleMsg = {
      propose: {
        title: title,
        description: description,
        msgs: msgs,
        earliest: earliest,
        latest: latest,
      },
    };
    return this.execute(this.cw3ContractAddress, handleMsg, memo);
  }

  public voteMultisigProposal(proposalId: number, vote: Vote, memo = ""): Promise<ExecuteResult> {
    const handleMsg = {
      vote: {
        proposal_id: proposalId,
        vote: vote,
      },
    };
    return this.execute(this.cw3ContractAddress, handleMsg, memo);
  }

  public executeMultisigProposal(proposalId: number, memo = ""): Promise<ExecuteResult> {
    const handleMsg = { execute: { proposal_id: proposalId } };
    return this.execute(this.cw3ContractAddress, handleMsg, memo);
  }

  public closeMultisigProposal(proposalId: number, memo = ""): Promise<ExecuteResult> {
    const handleMsg = { close: { proposal_id: proposalId } };
    return this.execute(this.cw3ContractAddress, handleMsg, memo);
  }
}

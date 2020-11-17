/* eslint-disable @typescript-eslint/naming-convention */
import { BroadcastMode, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";

import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";

export type Expiration =
  | {
      readonly at_height: number;
    }
  | {
      readonly at_time: number;
    };

export enum Vote {
  Yes = "yes",
  No = "no",
  Abstain = "abstain",
  Veto = "veto",
}

export class Cw3CosmWasmClient extends SigningCosmWasmClient {
  private readonly cw3ContractAddress: string;

  public constructor(
    apiUrl: string,
    senderAddress: string,
    signer: OfflineSigner,
    cw3ContractAddress: string,
    gasPrice?: GasPrice,
    gasLimits?: Partial<GasLimits<CosmWasmFeeTable>>,
    broadcastMode?: BroadcastMode,
  ) {
    super(apiUrl, senderAddress, signer, gasPrice, gasLimits, broadcastMode);
    this.cw3ContractAddress = cw3ContractAddress;
  }

  public createMultisigProposal(
    title: string,
    description: string,
    msgs: ReadonlyArray<Record<string, unknown>>,
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

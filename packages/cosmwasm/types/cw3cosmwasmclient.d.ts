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

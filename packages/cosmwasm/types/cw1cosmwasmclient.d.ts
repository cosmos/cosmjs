import { Account, BroadcastMode, Coin, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";
import { CosmosMsg } from "./cosmosmsg";
import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";
export interface CanSendResult {
  readonly can_send: boolean;
}
export declare class Cw1CosmWasmClient extends SigningCosmWasmClient {
  readonly cw1ContractAddress: string;
  constructor(
    apiUrl: string,
    signerAddress: string,
    signer: OfflineSigner,
    cw1ContractAddress: string,
    gasPrice?: GasPrice,
    gasLimits?: Partial<GasLimits<CosmWasmFeeTable>>,
    broadcastMode?: BroadcastMode,
  );
  getAccount(address?: string): Promise<Account | undefined>;
  canSend(msg: CosmosMsg, address?: string): Promise<CanSendResult>;
  executeSubkey(
    msgs: readonly CosmosMsg[],
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult>;
}

import { Account, BroadcastMode, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";
import { CosmosMsg } from "./cosmosmsg";
import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";
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
  canSend(msg: CosmosMsg, address?: string): Promise<boolean>;
  executeSubkey(msgs: readonly CosmosMsg[], memo?: string): Promise<ExecuteResult>;
}

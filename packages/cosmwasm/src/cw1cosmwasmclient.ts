/* eslint-disable @typescript-eslint/naming-convention */
import { Account, BroadcastMode, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";

import { CosmosMsg } from "./cosmosmsg";
import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";

export class Cw1CosmWasmClient extends SigningCosmWasmClient {
  public readonly cw1ContractAddress: string;

  public constructor(
    apiUrl: string,
    signerAddress: string,
    signer: OfflineSigner,
    cw1ContractAddress: string,
    gasPrice?: GasPrice,
    gasLimits?: Partial<GasLimits<CosmWasmFeeTable>>,
    broadcastMode?: BroadcastMode,
  ) {
    super(apiUrl, signerAddress, signer, gasPrice, gasLimits, broadcastMode);
    this.cw1ContractAddress = cw1ContractAddress;
  }

  public async getAccount(address?: string): Promise<Account | undefined> {
    return super.getAccount(address || this.cw1ContractAddress);
  }

  public async canSend(msg: CosmosMsg, address = this.senderAddress): Promise<boolean> {
    const result = await this.queryContractSmart(this.cw1ContractAddress, {
      can_send: {
        sender: address,
        msg: msg,
      },
    });
    return result.can_send;
  }

  public async executeCw1(msgs: readonly CosmosMsg[], memo = ""): Promise<ExecuteResult> {
    const handleMsg = {
      execute: {
        msgs: msgs,
      },
    };
    return this.execute(this.cw1ContractAddress, handleMsg, memo);
  }
}

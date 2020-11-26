/* eslint-disable @typescript-eslint/naming-convention */
import { Account, BroadcastMode, Coin, GasLimits, GasPrice, OfflineSigner } from "@cosmjs/launchpad";

import { CosmosMsg } from "./cosmosmsg";
import { CosmWasmFeeTable, ExecuteResult, SigningCosmWasmClient } from "./signingcosmwasmclient";

export interface CanSendResult {
  readonly can_send: boolean;
}

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

  public getAccount(address?: string): Promise<Account | undefined> {
    return super.getAccount(address || this.cw1ContractAddress);
  }

  public canSend(msg: CosmosMsg, address = this.senderAddress): Promise<CanSendResult> {
    return this.queryContractSmart(this.cw1ContractAddress, {
      can_send: {
        sender: address,
        msg: msg,
      },
    });
  }

  public executeSubkey(
    msgs: readonly CosmosMsg[],
    memo = "",
    transferAmount: readonly Coin[] = [],
  ): Promise<ExecuteResult> {
    const handleMsg = {
      execute: {
        msgs: msgs,
      },
    };
    return this.execute(this.cw1ContractAddress, handleMsg, memo, transferAmount);
  }
}

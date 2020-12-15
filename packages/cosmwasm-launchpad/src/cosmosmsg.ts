/* eslint-disable @typescript-eslint/naming-convention */
import { Coin } from "@cosmjs/launchpad";

interface BankSendMsg {
  readonly send: {
    readonly from_address: string;
    readonly to_address: string;
    readonly amount: readonly Coin[];
  };
}

export interface BankMsg {
  readonly bank: BankSendMsg;
}

export interface CustomMsg {
  readonly custom: Record<string, unknown>;
}

interface StakingDelegateMsg {
  readonly delegate: {
    readonly validator: string;
    readonly amount: Coin;
  };
}

interface StakingRedelegateMsg {
  readonly redelgate: {
    readonly src_validator: string;
    readonly dst_validator: string;
    readonly amount: Coin;
  };
}

interface StakingUndelegateMsg {
  readonly undelegate: {
    readonly validator: string;
    readonly amount: Coin;
  };
}

interface StakingWithdrawMsg {
  readonly withdraw: {
    readonly validator: string;
    readonly recipient?: string;
  };
}

export interface StakingMsg {
  readonly staking: StakingDelegateMsg | StakingRedelegateMsg | StakingUndelegateMsg | StakingWithdrawMsg;
}

interface WasmExecuteMsg {
  readonly execute: {
    readonly contract_address: string;
    readonly msg: any;
    readonly send: readonly Coin[];
  };
}

interface WasmInstantiateMsg {
  readonly instantiate: {
    readonly code_id: string;
    readonly msg: any;
    readonly send: readonly Coin[];
    readonly label?: string;
  };
}

export interface WasmMsg {
  readonly wasm: WasmExecuteMsg | WasmInstantiateMsg;
}

/** These definitions are derived from CosmWasm:
 * https://github.com/CosmWasm/cosmwasm/blob/v0.12.0/packages/std/src/results/cosmos_msg.rs#L10-L23
 */
export type CosmosMsg = BankMsg | CustomMsg | StakingMsg | WasmMsg;

import { Coin } from "@cosmjs/launchpad";
import { Cw1CosmWasmClient } from "./cw1cosmwasmclient";
import { Expiration } from "./interfaces";
import { ExecuteResult } from "./signingcosmwasmclient";
/**
 * @see https://github.com/CosmWasm/cosmwasm-plus/blob/v0.3.2/contracts/cw1-subkeys/src/msg.rs#L88
 */
export interface Cw1SubkeyAllowanceInfo {
  readonly balance: readonly Coin[];
  readonly expires: Expiration;
}
/**
 * @see https://github.com/CosmWasm/cosmwasm-plus/blob/v0.3.2/contracts/cw1-subkeys/src/state.rs#L15
 */
export interface Cw1SubkeyPermissions {
  readonly delegate: boolean;
  readonly redelegate: boolean;
  readonly undelegate: boolean;
  readonly withdraw: boolean;
}
/**
 * @see https://github.com/CosmWasm/cosmwasm-plus/blob/v0.3.2/contracts/cw1-subkeys/src/msg.rs#L95
 */
export interface Cw1SubkeyPermissionsInfo {
  /** Spender address */
  readonly spender: string;
  readonly permissions: readonly Cw1SubkeyPermissions[];
}
export declare class Cw1SubkeyCosmWasmClient extends Cw1CosmWasmClient {
  private setAdmins;
  getAdmins(): Promise<readonly string[]>;
  isAdmin(address?: string): Promise<boolean>;
  getAllAllowances(): Promise<readonly Cw1SubkeyAllowanceInfo[]>;
  getAllowance(address?: string): Promise<Cw1SubkeyAllowanceInfo>;
  getAllPermissions(): Promise<readonly Cw1SubkeyPermissionsInfo[]>;
  getPermissions(address?: string): Promise<Cw1SubkeyPermissions>;
  addAdmin(address: string, memo?: string): Promise<ExecuteResult>;
  removeAdmin(address: string, memo?: string): Promise<ExecuteResult>;
  increaseAllowance(
    address: string,
    amount: Coin,
    expires?: Expiration,
    memo?: string,
  ): Promise<ExecuteResult>;
  decreaseAllowance(
    address: string,
    amount: Coin,
    expires?: Expiration,
    memo?: string,
  ): Promise<ExecuteResult>;
  setPermissions(address: string, permissions: Cw1SubkeyPermissions, memo?: string): Promise<ExecuteResult>;
}

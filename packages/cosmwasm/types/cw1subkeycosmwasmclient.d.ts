import { Coin } from "@cosmjs/launchpad";
import { Cw1CosmWasmClient } from "./cw1cosmwasmclient";
import { Expiration } from "./interfaces";
import { ExecuteResult } from "./signingcosmwasmclient";
export interface AllowanceResult {
  readonly balance: readonly Coin[];
  readonly expires: Expiration;
}
export interface Cw1SubkeyPermissions {
  readonly delegate: boolean;
  readonly redelegate: boolean;
  readonly undelegate: boolean;
  readonly withdraw: boolean;
}
export declare class Cw1SubkeyCosmWasmClient extends Cw1CosmWasmClient {
  private setAdmins;
  getAdmins(): Promise<readonly string[]>;
  isAdmin(address?: string): Promise<boolean>;
  getAllAllowances(): Promise<readonly AllowanceResult[]>;
  getAllowance(address?: string): Promise<AllowanceResult>;
  getAllPermissions(): Promise<readonly Cw1SubkeyPermissions[]>;
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

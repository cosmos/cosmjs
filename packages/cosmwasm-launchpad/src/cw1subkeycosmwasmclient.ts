/* eslint-disable @typescript-eslint/naming-convention */
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
 * @see https://github.com/CosmWasm/cosmwasm-plus/blob/v0.3.2/contracts/cw1-subkeys/src/msg.rs#L83
 */
interface AllAllowancesResponse {
  readonly allowances: readonly Cw1SubkeyAllowanceInfo[];
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

/**
 * @see https://github.com/CosmWasm/cosmwasm-plus/blob/v0.3.2/contracts/cw1-subkeys/src/msg.rs#L101
 */
interface AllPermissionsResponse {
  readonly permissions: readonly Cw1SubkeyPermissionsInfo[];
}

export class Cw1SubkeyCosmWasmClient extends Cw1CosmWasmClient {
  private async setAdmins(admins: readonly string[], memo = ""): Promise<ExecuteResult> {
    const handleMsg = {
      update_admins: {
        admins: admins,
      },
    };
    return this.execute(this.cw1ContractAddress, handleMsg, memo);
  }

  public async getAdmins(): Promise<readonly string[]> {
    const { admins } = await this.queryContractSmart(this.cw1ContractAddress, { admin_list: {} });
    return admins;
  }

  public async isAdmin(address = this.signerAddress): Promise<boolean> {
    const admins = await this.getAdmins();
    return admins.includes(address);
  }

  public async getAllAllowances(): Promise<readonly Cw1SubkeyAllowanceInfo[]> {
    const response: AllAllowancesResponse = await this.queryContractSmart(this.cw1ContractAddress, {
      all_allowances: {},
    });
    return response.allowances;
  }

  public async getAllowance(address = this.signerAddress): Promise<Cw1SubkeyAllowanceInfo> {
    return this.queryContractSmart(this.cw1ContractAddress, {
      allowance: { spender: address },
    });
  }

  public async getAllPermissions(): Promise<readonly Cw1SubkeyPermissionsInfo[]> {
    const response: AllPermissionsResponse = await this.queryContractSmart(this.cw1ContractAddress, {
      all_permissions: {},
    });
    return response.permissions;
  }

  public async getPermissions(address = this.signerAddress): Promise<Cw1SubkeyPermissions> {
    return this.queryContractSmart(this.cw1ContractAddress, {
      permissions: { spender: address },
    });
  }

  public async addAdmin(address: string, memo = ""): Promise<ExecuteResult> {
    const admins = await this.getAdmins();
    const newAdmins = admins.includes(address) ? admins : [...admins, address];
    return this.setAdmins(newAdmins, memo);
  }

  public async removeAdmin(address: string, memo = ""): Promise<ExecuteResult> {
    const admins = await this.getAdmins();
    const newAdmins = admins.filter((admin) => admin !== address);
    return this.setAdmins(newAdmins, memo);
  }

  public async increaseAllowance(
    address: string,
    amount: Coin,
    expires?: Expiration,
    memo = "",
  ): Promise<ExecuteResult> {
    const handleMsg = {
      increase_allowance: {
        spender: address,
        amount: amount,
        expires: expires,
      },
    };
    return this.execute(this.cw1ContractAddress, handleMsg, memo);
  }

  public async decreaseAllowance(
    address: string,
    amount: Coin,
    expires?: Expiration,
    memo = "",
  ): Promise<ExecuteResult> {
    const handleMsg = {
      decrease_allowance: {
        spender: address,
        amount: amount,
        expires: expires,
      },
    };
    return this.execute(this.cw1ContractAddress, handleMsg, memo);
  }

  public async setPermissions(
    address: string,
    permissions: Cw1SubkeyPermissions,
    memo = "",
  ): Promise<ExecuteResult> {
    const handleMsg = {
      set_permissions: {
        spender: address,
        permissions: permissions,
      },
    };
    return this.execute(this.cw1ContractAddress, handleMsg, memo);
  }
}

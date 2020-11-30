/* eslint-disable @typescript-eslint/naming-convention */
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

  public async isAdmin(address = this.senderAddress): Promise<boolean> {
    const admins = await this.getAdmins();
    return admins.includes(address);
  }

  public async getAllAllowances(): Promise<readonly AllowanceResult[]> {
    const { allowances } = await this.queryContractSmart(this.cw1ContractAddress, {
      all_allowances: {},
    });
    return allowances;
  }

  public async getAllowance(address = this.senderAddress): Promise<AllowanceResult> {
    return this.queryContractSmart(this.cw1ContractAddress, {
      allowance: { spender: address },
    });
  }

  public async getAllPermissions(): Promise<readonly Cw1SubkeyPermissions[]> {
    const { permissions } = await this.queryContractSmart(this.cw1ContractAddress, {
      all_permissions: {},
    });
    return permissions;
  }

  public async getPermissions(address = this.senderAddress): Promise<Cw1SubkeyPermissions> {
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

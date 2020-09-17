import { HdPath } from "@cosmjs/crypto";
import {
  AccountData,
  encodeSecp256k1Signature,
  makeCosmoshubPath,
  OfflineSigner,
  StdSignature,
} from "@cosmjs/launchpad";

import { LaunchpadLedger, LaunchpadLedgerOptions } from "./launchpadledger";

export class LedgerSigner implements OfflineSigner {
  private readonly ledger: LaunchpadLedger;
  private readonly hdPaths: readonly HdPath[];
  private accounts?: readonly AccountData[];

  constructor(options: LaunchpadLedgerOptions = {}) {
    this.hdPaths = options.hdPaths || [makeCosmoshubPath(0)];
    this.ledger = new LaunchpadLedger(options);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    if (!this.accounts) {
      const pubkeys = await this.ledger.getPubkeys();
      this.accounts = await Promise.all(
        pubkeys.map(async (pubkey) => ({
          algo: "secp256k1" as const,
          address: await this.ledger.getCosmosAddress(pubkey),
          pubkey: pubkey,
        })),
      );
    }

    return this.accounts;
  }

  public async sign(address: string, message: Uint8Array): Promise<StdSignature> {
    const accounts = this.accounts || (await this.getAccounts());
    const accountIndex = accounts.findIndex((account) => account.address === address);

    if (accountIndex === -1) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const accountForAddress = accounts[accountIndex];
    const hdPath = this.hdPaths[accountIndex];
    const signature = await this.ledger.sign(message, hdPath);
    return encodeSecp256k1Signature(accountForAddress.pubkey, signature);
  }
}

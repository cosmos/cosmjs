import {
  AccountData,
  encodeSecp256k1Signature,
  makeCosmoshubPath,
  OfflineSigner,
  StdSignature,
} from "@cosmjs/launchpad";

import { LaunchpadLedger } from "./launchpadledger";

export interface LedgerSignerOptions {
  readonly accountNumbers?: readonly number[];
  readonly prefix?: string;
  readonly testModeAllowed?: boolean;
}

export class LedgerSigner implements OfflineSigner {
  private readonly ledger: LaunchpadLedger;
  private readonly accountNumbers: readonly number[];
  private accounts?: readonly AccountData[];

  constructor({ accountNumbers = [0], ...restOptions }: LedgerSignerOptions = {}) {
    this.accountNumbers = accountNumbers;
    this.ledger = new LaunchpadLedger({
      ...restOptions,
      hdPaths: accountNumbers.map(makeCosmoshubPath),
    });
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
    const accountNumber = this.accountNumbers[accountIndex];
    const hdPath = makeCosmoshubPath(accountNumber);
    const signature = await this.ledger.sign(message, hdPath);
    return encodeSecp256k1Signature(accountForAddress.pubkey, signature);
  }
}

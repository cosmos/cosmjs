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
  private accounts?: readonly AccountData[];

  constructor(options?: LaunchpadLedgerOptions) {
    this.ledger = new LaunchpadLedger(options);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    await this.ledger.connect();

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

  public async sign(
    address: string,
    message: Uint8Array,
    _prehashType?: "sha256" | "sha512" | null,
    accountNumber = 0,
  ): Promise<StdSignature> {
    await this.ledger.connect();

    const accounts = this.accounts || (await this.getAccounts());
    const accountForAddress = accounts.find((account) => account.address === address);

    if (!accountForAddress) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const hdPath = makeCosmoshubPath(accountNumber);
    const signature = await this.ledger.sign(message, hdPath);
    return encodeSecp256k1Signature(accountForAddress.pubkey, signature);
  }
}

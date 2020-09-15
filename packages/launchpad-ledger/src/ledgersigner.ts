import { AccountData, encodeSecp256k1Signature, OfflineSigner, StdSignature } from "@cosmjs/launchpad";

import { LaunchpadLedger, LaunchpadLedgerOptions } from "./launchpadledger";

export class LedgerSigner implements OfflineSigner {
  private readonly ledger: LaunchpadLedger;
  private address: string | undefined;
  private pubkey: Uint8Array | undefined;

  constructor(options?: LaunchpadLedgerOptions) {
    this.ledger = new LaunchpadLedger(options);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    await this.ledger.connect();

    if (!this.pubkey) {
      this.pubkey = await this.ledger.getPubkey();
    }
    if (!this.address) {
      this.address = await this.ledger.getCosmosAddress(this.pubkey);
    }

    return [
      {
        algo: "secp256k1",
        address: this.address,
        pubkey: this.pubkey,
      },
    ];
  }

  public async sign(address: string, message: Uint8Array): Promise<StdSignature> {
    await this.ledger.connect();

    if (!this.pubkey) {
      this.pubkey = await this.ledger.getPubkey();
    }
    if (!this.address) {
      this.address = await this.ledger.getCosmosAddress(this.pubkey);
    }

    if (address !== this.address) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const signature = await this.ledger.sign(message);
    return encodeSecp256k1Signature(this.pubkey, signature);
  }
}

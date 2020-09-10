import { AccountData, encodeSecp256k1Signature, OfflineSigner, StdSignature } from "@cosmjs/launchpad";

import { LaunchpadLedger } from "./launchpadledger";

interface LedgerWalletOptions {
  readonly testModeAllowed: boolean;
}

export class LedgerWallet implements OfflineSigner {
  private readonly ledger: LaunchpadLedger;
  private address: string | undefined;
  private pubkey: Uint8Array | undefined;

  constructor(options?: LedgerWalletOptions) {
    this.ledger = new LaunchpadLedger(options);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    await this.ledger.connect();

    const address = (this.address = this.address || (await this.ledger.getCosmosAddress()));
    const pubkey = (this.pubkey = this.pubkey || (await this.ledger.getPubKey()));

    return [
      {
        algo: "secp256k1",
        address: address,
        pubkey: pubkey,
      },
    ];
  }

  public async sign(address: string, message: Uint8Array): Promise<StdSignature> {
    await this.ledger.connect();

    const thisAddress = (this.address = this.address || (await this.ledger.getCosmosAddress()));
    if (address !== thisAddress) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const signature = await this.ledger.sign(message);
    const pubkey = (this.pubkey = this.pubkey || (await this.ledger.getPubKey()));
    return encodeSecp256k1Signature(pubkey, signature);
  }
}

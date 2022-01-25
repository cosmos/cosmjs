import {
  AccountData,
  AminoSignResponse,
  encodeSecp256k1Pubkey,
  encodeSecp256k1Signature,
  makeCosmoshubPath,
  OfflineAminoSigner,
  Secp256k1Pubkey,
  serializeSignDoc,
  StdSignDoc,
} from "@cosmjs/amino";
import { HdPath } from "@cosmjs/crypto";
import Transport from "@ledgerhq/hw-transport";

import { LaunchpadLedger, LaunchpadLedgerOptions } from "./launchpadledger";

export interface AddressAndPubkey {
  readonly address: string;
  readonly pubkey: Secp256k1Pubkey;
}

export class LedgerSigner implements OfflineAminoSigner {
  private readonly ledger: LaunchpadLedger;
  private readonly hdPaths: readonly HdPath[];
  private accounts?: readonly AccountData[];

  public constructor(transport: Transport, options: LaunchpadLedgerOptions = {}) {
    this.hdPaths = options.hdPaths || [makeCosmoshubPath(0)];
    this.ledger = new LaunchpadLedger(transport, options);
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

  public async showAddress(path: HdPath): Promise<AddressAndPubkey> {
    const response = await this.ledger.verifyAddress(path);

    if (response.error_message) {
      throw new Error(response.error_message);
    }

    return {
      address: response.address,
      pubkey: encodeSecp256k1Pubkey(response.compressed_pk),
    };
  }

  public async signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
    const accounts = this.accounts || (await this.getAccounts());
    const accountIndex = accounts.findIndex((account) => account.address === signerAddress);

    if (accountIndex === -1) {
      throw new Error(`Address ${signerAddress} not found in wallet`);
    }

    const message = serializeSignDoc(signDoc);
    const accountForAddress = accounts[accountIndex];
    const hdPath = this.hdPaths[accountIndex];
    const signature = await this.ledger.sign(message, hdPath);
    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(accountForAddress.pubkey, signature),
    };
  }
}

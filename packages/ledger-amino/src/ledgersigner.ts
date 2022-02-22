import {
  AccountData,
  AminoSignResponse,
  encodeSecp256k1Signature,
  makeCosmoshubPath,
  OfflineAminoSigner,
  serializeSignDoc,
  StdSignDoc,
} from "@cosmjs/amino";
import { HdPath } from "@cosmjs/crypto";
import Transport from "@ledgerhq/hw-transport";

import { AddressAndPubkey, LedgerConnector, LedgerConnectorOptions } from "./ledgerconnector";

export class LedgerSigner implements OfflineAminoSigner {
  private readonly connector: LedgerConnector;
  private readonly hdPaths: readonly HdPath[];
  private accounts?: readonly AccountData[];

  public constructor(transport: Transport, options: LedgerConnectorOptions = {}) {
    this.hdPaths = options.hdPaths || [makeCosmoshubPath(0)];
    this.connector = new LedgerConnector(transport, options);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    if (!this.accounts) {
      const pubkeys = await this.connector.getPubkeys();
      this.accounts = await Promise.all(
        pubkeys.map(async (pubkey) => ({
          algo: "secp256k1" as const,
          address: await this.connector.getCosmosAddress(pubkey),
          pubkey: pubkey,
        })),
      );
    }

    return this.accounts;
  }

  /**
   * Shows the user's address in the device and returns an address/pubkey pair.
   *
   * The address will be shown with the native prefix of the app (e.g. cosmos, persistence, desmos)
   * and does not support the usage of other address prefixes.
   *
   * @param path The HD path to show the address for. If unset, this is the first account.
   */
  public async showAddress(path?: HdPath): Promise<AddressAndPubkey> {
    return this.connector.showAddress(path);
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
    const signature = await this.connector.sign(message, hdPath);
    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(accountForAddress.pubkey, signature),
    };
  }
}

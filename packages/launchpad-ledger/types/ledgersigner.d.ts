/// <reference types="ledgerhq__hw-transport" />
import { AccountData, OfflineSigner, StdSignDoc } from "@cosmjs/launchpad";
import { SignResponse } from "@cosmjs/launchpad";
import LedgerTransport from "@ledgerhq/hw-transport";
import { LaunchpadLedgerOptions } from "./launchpadledger";
export declare class LedgerSigner implements OfflineSigner {
  private readonly ledger;
  private readonly hdPaths;
  private accounts?;
  constructor(transport: LedgerTransport, options?: LaunchpadLedgerOptions);
  getAccounts(): Promise<readonly AccountData[]>;
  sign(signerAddress: string, signDoc: StdSignDoc): Promise<SignResponse>;
  disconnect(): Promise<void>;
}

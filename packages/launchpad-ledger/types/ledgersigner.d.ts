import { AccountData, OfflineSigner, StdSignature, StdSignDoc } from "@cosmjs/launchpad";
import { LaunchpadLedgerOptions } from "./launchpadledger";
export declare class LedgerSigner implements OfflineSigner {
  private readonly ledger;
  private readonly hdPaths;
  private accounts?;
  constructor(options?: LaunchpadLedgerOptions);
  getAccounts(): Promise<readonly AccountData[]>;
  sign(signerAddress: string, signDoc: StdSignDoc): Promise<StdSignature>;
}

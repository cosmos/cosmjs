import { AccountData, OfflineSigner, StdSignature } from "@cosmjs/launchpad";
import { LaunchpadLedgerOptions } from "./launchpadledger";
export declare class LedgerSigner implements OfflineSigner {
  private readonly ledger;
  private accounts?;
  constructor(options?: LaunchpadLedgerOptions);
  getAccounts(): Promise<readonly AccountData[]>;
  sign(
    address: string,
    message: Uint8Array,
    _prehashType?: "sha256" | "sha512" | null,
    accountNumber?: number,
  ): Promise<StdSignature>;
}

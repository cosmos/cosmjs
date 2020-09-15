import { AccountData, OfflineSigner, StdSignature } from "@cosmjs/launchpad";
interface LedgerSignerOptions {
  readonly testModeAllowed: boolean;
}
export declare class LedgerSigner implements OfflineSigner {
  private readonly ledger;
  private address;
  private pubkey;
  constructor(options?: LedgerSignerOptions);
  getAccounts(): Promise<readonly AccountData[]>;
  sign(address: string, message: Uint8Array): Promise<StdSignature>;
}
export {};

import { AccountData, OfflineSigner, StdSignature } from "@cosmjs/launchpad";
export interface LedgerSignerOptions {
  readonly accountNumbers?: readonly number[];
  readonly prefix?: string;
  readonly testModeAllowed?: boolean;
}
export declare class LedgerSigner implements OfflineSigner {
  private readonly ledger;
  private readonly accountNumbers;
  private accounts?;
  constructor({ accountNumbers, ...restOptions }?: LedgerSignerOptions);
  getAccounts(): Promise<readonly AccountData[]>;
  sign(address: string, message: Uint8Array): Promise<StdSignature>;
}

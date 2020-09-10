import { AccountData, OfflineSigner, StdSignature } from "@cosmjs/launchpad";
interface LedgerWalletOptions {
  readonly testModeAllowed: boolean;
}
export declare class LedgerWallet implements OfflineSigner {
  private readonly ledger;
  private address;
  private pubkey;
  constructor(options?: LedgerWalletOptions);
  getAccounts(): Promise<readonly AccountData[]>;
  sign(address: string, message: Uint8Array): Promise<StdSignature>;
}
export {};

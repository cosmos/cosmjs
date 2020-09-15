import { Slip10RawIndex } from "@cosmjs/crypto";
export interface LaunchpadLedgerOptions {
  readonly hdPath?: readonly Slip10RawIndex[];
  readonly prefix?: string;
  readonly testModeAllowed?: boolean;
}
export declare class LaunchpadLedger {
  private readonly testModeAllowed;
  private readonly hdPath;
  private readonly prefix;
  private cosmosApp;
  readonly platform: string;
  readonly userAgent: string;
  constructor(options?: LaunchpadLedgerOptions);
  connect(timeout?: number): Promise<LaunchpadLedger>;
  getCosmosAppVersion(): Promise<string>;
  getPubkey(): Promise<Uint8Array>;
  getCosmosAddress(pubkey?: Uint8Array): Promise<string>;
  sign(message: Uint8Array): Promise<Uint8Array>;
  private verifyAppMode;
  private getOpenAppName;
  private verifyAppVersion;
  private verifyCosmosAppIsOpen;
  private verifyDeviceIsReady;
  private handleLedgerErrors;
}

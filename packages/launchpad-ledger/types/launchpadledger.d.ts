/// <reference types="node" />
export declare class LaunchpadLedger {
  private readonly testModeAllowed;
  private readonly hdPath;
  private readonly prefix;
  private cosmosApp;
  readonly platform: string;
  readonly userAgent: string;
  constructor(
    {
      testModeAllowed,
    }?: {
      testModeAllowed: boolean;
    },
    hdPath?: number[],
    prefix?: string,
  );
  connect(timeout?: number): Promise<LaunchpadLedger>;
  getCosmosAppVersion(): Promise<string>;
  getPubKey(): Promise<Buffer>;
  getCosmosAddress(): Promise<string>;
  sign(message: Uint8Array): Promise<Uint8Array>;
  private verifyAppMode;
  private getOpenAppName;
  private verifyAppVersion;
  private verifyCosmosAppIsOpen;
  private verifyDeviceIsReady;
  private handleLedgerErrors;
}

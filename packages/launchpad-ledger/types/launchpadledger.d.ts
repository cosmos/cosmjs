/// <reference types="node" />
import { Slip10RawIndex } from "@cosmjs/crypto";
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
    hdPath?: readonly Slip10RawIndex[],
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

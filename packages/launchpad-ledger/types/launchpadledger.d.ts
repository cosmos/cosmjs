/// <reference types="ledgerhq__hw-transport" />
import { HdPath } from "@cosmjs/crypto";
import LedgerTransport from "@ledgerhq/hw-transport";
export interface LedgerAppErrorResponse {
  readonly error_message?: string;
  readonly device_locked?: boolean;
}
export interface LaunchpadLedgerOptions {
  readonly hdPaths?: readonly HdPath[];
  readonly prefix?: string;
  readonly testModeAllowed?: boolean;
}
export declare class LaunchpadLedger {
  private readonly testModeAllowed;
  private readonly hdPaths;
  private readonly prefix;
  private readonly app;
  constructor(transport: LedgerTransport, options?: LaunchpadLedgerOptions);
  getCosmosAppVersion(): Promise<string>;
  getPubkey(hdPath?: HdPath): Promise<Uint8Array>;
  getPubkeys(): Promise<readonly Uint8Array[]>;
  getCosmosAddress(pubkey?: Uint8Array): Promise<string>;
  sign(message: Uint8Array, hdPath?: HdPath): Promise<Uint8Array>;
  private verifyAppMode;
  private getOpenAppName;
  private verifyAppVersion;
  private verifyCosmosAppIsOpen;
  private verifyDeviceIsReady;
  private handleLedgerErrors;
}

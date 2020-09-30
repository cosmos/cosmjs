import { HdPath } from "@cosmjs/crypto";
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
  private connectedApp;
  readonly platform: string;
  readonly userAgent: string | null;
  constructor(options?: LaunchpadLedgerOptions);
  getCosmosAppVersion(): Promise<string>;
  getPubkey(hdPath?: HdPath): Promise<Uint8Array>;
  getPubkeys(): Promise<readonly Uint8Array[]>;
  getCosmosAddress(pubkey?: Uint8Array): Promise<string>;
  sign(message: Uint8Array, hdPath?: HdPath): Promise<Uint8Array>;
  disconnect(): Promise<void>;
  private ensureConnected;
  /**
   * @param openTimeout The time to establish a connection in milliseconds. This is
   *                    [passed into as the second argument into Transport.open](https://github.com/LedgerHQ/ledgerjs/blob/v5.25.2/packages/hw-transport/src/Transport.js#L235),
   *                    which is ignored by both [TransportWebUSB.open](https://github.com/LedgerHQ/ledgerjs/blob/v5.25.2/packages/hw-transport-webusb/src/TransportWebUSB.js#L116)
   *                    and [TransportNodeHid.open](https://github.com/LedgerHQ/ledgerjs/blob/v5.25.2/packages/hw-transport-node-hid/src/TransportNodeHid.js#L115).
   */
  private createTransport;
  private verifyAppMode;
  private getOpenAppName;
  private verifyAppVersion;
  private verifyCosmosAppIsOpen;
  private verifyDeviceIsReady;
  private handleLedgerErrors;
}

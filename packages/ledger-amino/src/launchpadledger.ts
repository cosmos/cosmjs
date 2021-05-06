import { makeCosmoshubPath } from "@cosmjs/amino";
import { HdPath, Secp256k1Signature } from "@cosmjs/crypto";
import { fromUtf8 } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";
import Transport from "@ledgerhq/hw-transport";
import CosmosApp, {
  AppInfoResponse,
  PublicKeyResponse,
  SignResponse,
  VersionResponse,
} from "ledger-cosmos-js";
import semver from "semver";

/* eslint-disable @typescript-eslint/naming-convention */
export interface LedgerAppErrorResponse {
  readonly error_message?: string;
  readonly device_locked?: boolean;
}
/* eslint-enable */

function unharden(hdPath: HdPath): number[] {
  return hdPath.map((n) => (n.isHardened() ? n.toNumber() - 2 ** 31 : n.toNumber()));
}

const cosmosHdPath = makeCosmoshubPath(0);
const cosmosBech32Prefix = "cosmos";
const requiredCosmosAppVersion = "1.5.3";

export interface LaunchpadLedgerOptions {
  readonly hdPaths?: readonly HdPath[];
  readonly prefix?: string;
  readonly testModeAllowed?: boolean;
}

export class LaunchpadLedger {
  private readonly testModeAllowed: boolean;
  private readonly hdPaths: readonly HdPath[];
  private readonly prefix: string;
  private readonly app: CosmosApp;

  public constructor(transport: Transport, options: LaunchpadLedgerOptions = {}) {
    const defaultOptions = {
      hdPaths: [cosmosHdPath],
      prefix: cosmosBech32Prefix,
      testModeAllowed: false,
    };

    this.testModeAllowed = options.testModeAllowed ?? defaultOptions.testModeAllowed;
    this.hdPaths = options.hdPaths ?? defaultOptions.hdPaths;
    this.prefix = options.prefix ?? defaultOptions.prefix;
    this.app = new CosmosApp(transport);
  }

  public async getCosmosAppVersion(): Promise<string> {
    await this.verifyCosmosAppIsOpen();
    assert(this.app, "Cosmos Ledger App is not connected");

    const response = await this.app.getVersion();
    this.handleLedgerErrors(response);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { major, minor, patch, test_mode: testMode } = response as VersionResponse;
    this.verifyAppMode(testMode);
    return `${major}.${minor}.${patch}`;
  }

  public async getPubkey(hdPath?: HdPath): Promise<Uint8Array> {
    await this.verifyDeviceIsReady();
    assert(this.app, "Cosmos Ledger App is not connected");

    const hdPathToUse = hdPath || this.hdPaths[0];
    // ledger-cosmos-js hardens the first three indices
    const response = await this.app.publicKey(unharden(hdPathToUse));
    this.handleLedgerErrors(response);
    return Uint8Array.from((response as PublicKeyResponse).compressed_pk);
  }

  public async getPubkeys(): Promise<readonly Uint8Array[]> {
    return this.hdPaths.reduce(
      (promise: Promise<readonly Uint8Array[]>, hdPath) =>
        promise.then(async (pubkeys) => [...pubkeys, await this.getPubkey(hdPath)]),
      Promise.resolve([]),
    );
  }

  public async getCosmosAddress(pubkey?: Uint8Array): Promise<string> {
    const pubkeyToUse = pubkey || (await this.getPubkey());
    return CosmosApp.getBech32FromPK(this.prefix, Buffer.from(pubkeyToUse));
  }

  public async sign(message: Uint8Array, hdPath?: HdPath): Promise<Uint8Array> {
    await this.verifyDeviceIsReady();
    assert(this.app, "Cosmos Ledger App is not connected");

    const hdPathToUse = hdPath || this.hdPaths[0];
    // ledger-cosmos-js hardens the first three indices
    const response = await this.app.sign(unharden(hdPathToUse), fromUtf8(message));
    this.handleLedgerErrors(response, "Transaction signing request was rejected by the user");
    return Secp256k1Signature.fromDer((response as SignResponse).signature).toFixedLength();
  }

  private verifyAppMode(testMode: boolean): void {
    if (testMode && !this.testModeAllowed) {
      throw new Error(`DANGER: The Cosmos Ledger app is in test mode and should not be used on mainnet!`);
    }
  }

  private async getOpenAppName(): Promise<string> {
    assert(this.app, "Cosmos Ledger App is not connected");

    const response = await this.app.appInfo();
    this.handleLedgerErrors(response);
    return (response as AppInfoResponse).appName;
  }

  private async verifyAppVersion(): Promise<void> {
    const version = await this.getCosmosAppVersion();
    if (!semver.gte(version, requiredCosmosAppVersion)) {
      throw new Error("Outdated version: Please update Cosmos Ledger App to the latest version.");
    }
  }

  private async verifyCosmosAppIsOpen(): Promise<void> {
    const appName = await this.getOpenAppName();

    if (appName.toLowerCase() === `dashboard`) {
      throw new Error(`Please open the Cosmos Ledger app on your Ledger device.`);
    }
    if (appName.toLowerCase() !== `cosmos`) {
      throw new Error(`Please close ${appName} and open the Cosmos Ledger app on your Ledger device.`);
    }
  }

  private async verifyDeviceIsReady(): Promise<void> {
    await this.verifyAppVersion();
    await this.verifyCosmosAppIsOpen();
  }

  private handleLedgerErrors(
    /* eslint-disable @typescript-eslint/naming-convention */
    {
      error_message: errorMessage = "No errors",
      device_locked: deviceLocked = false,
    }: LedgerAppErrorResponse,
    /* eslint-enable */
    rejectionMessage = "Request was rejected by the user",
  ): void {
    if (deviceLocked) {
      throw new Error("Ledger’s screensaver mode is on");
    }
    switch (errorMessage) {
      case "U2F: Timeout":
        throw new Error("Connection timed out. Please try again.");
      case "Cosmos app does not seem to be open":
        throw new Error("Cosmos app is not open");
      case "Command not allowed":
        throw new Error("Transaction rejected");
      case "Transaction rejected":
        throw new Error(rejectionMessage);
      case "Unknown Status Code: 26628":
        throw new Error("Ledger’s screensaver mode is on");
      case "Instruction not supported":
        throw new Error(
          `Your Cosmos Ledger App is not up to date. Please update to version ${requiredCosmosAppVersion}.`,
        );
      case "No errors":
        break;
      default:
        throw new Error(`Ledger Native Error: ${errorMessage}`);
    }
  }
}

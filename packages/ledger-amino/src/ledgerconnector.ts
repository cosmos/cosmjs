import { encodeSecp256k1Pubkey, makeCosmoshubPath, pubkeyToAddress, Secp256k1Pubkey } from "@cosmjs/amino";
import { HdPath, Secp256k1Signature } from "@cosmjs/crypto";
import { fromUtf8 } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";
import Transport from "@ledgerhq/hw-transport";
import CosmosApp, {
  AddressAndPublicKeyResponse,
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
const cosmosLedgerAppName = "Cosmos";
const requiredCosmosAppVersion = "1.5.3";

export interface LedgerConnectorOptions {
  readonly hdPaths?: readonly HdPath[];
  readonly prefix?: string;
  readonly testModeAllowed?: boolean;
  /**
   * The name of the app the user must have opened on the Ledger.
   * This allows you to use this connector with forks of the Cosmos Hub Ledger app.
   * Support is provided on an best effort basis and only as long as those forks do not
   * significantly differ from the original app.
   *
   * Defaults to "Cosmos".
   */
  readonly ledgerAppName?: string;
  /**
   * The min version of the app the user must have opened on the Ledger.
   * This allows you to use this connector with forks of the Cosmos Hub Ledger app.
   * Support is provided on an best effort basis and only as long as those forks do not
   * significantly differ from the original app.
   *
   * Defaults to "1.5.3".
   */
  readonly minLedgerAppVersion?: string;
}

export interface AddressAndPubkey {
  readonly address: string;
  readonly pubkey: Secp256k1Pubkey;
}

export class LedgerConnector {
  private readonly testModeAllowed: boolean;
  private readonly hdPaths: readonly HdPath[];
  private readonly prefix: string;
  private readonly ledgerAppName: string;
  private readonly minLedgerAppVersion: string;
  private readonly app: CosmosApp;

  public constructor(transport: Transport, options: LedgerConnectorOptions = {}) {
    const defaultOptions = {
      hdPaths: [cosmosHdPath],
      prefix: cosmosBech32Prefix,
      testModeAllowed: false,
      ledgerAppName: cosmosLedgerAppName,
      requiredLedgerAppVersion: requiredCosmosAppVersion,
    };

    this.testModeAllowed = options.testModeAllowed ?? defaultOptions.testModeAllowed;
    this.hdPaths = options.hdPaths ?? defaultOptions.hdPaths;
    this.prefix = options.prefix ?? defaultOptions.prefix;
    this.ledgerAppName = options.ledgerAppName ?? defaultOptions.ledgerAppName;
    this.minLedgerAppVersion = options.minLedgerAppVersion ?? defaultOptions.requiredLedgerAppVersion;
    this.app = new CosmosApp(transport);
  }

  public async getCosmosAppVersion(): Promise<string> {
    await this.verifyCosmosAppIsOpen();
    assert(this.app, `${this.ledgerAppName} Ledger App is not connected`);

    const response = await this.app.getVersion();
    this.handleLedgerErrors(response);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { major, minor, patch, test_mode: testMode } = response as VersionResponse;
    this.verifyAppMode(testMode);
    return `${major}.${minor}.${patch}`;
  }

  public async getPubkey(hdPath?: HdPath): Promise<Uint8Array> {
    await this.verifyDeviceIsReady();
    assert(this.app, `${this.ledgerAppName} Ledger App is not connected`);

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
    return pubkeyToAddress(encodeSecp256k1Pubkey(pubkeyToUse), this.prefix);
  }

  public async sign(message: Uint8Array, hdPath?: HdPath): Promise<Uint8Array> {
    await this.verifyDeviceIsReady();
    assert(this.app, `${this.ledgerAppName} Ledger App is not connected`);

    const hdPathToUse = hdPath || this.hdPaths[0];
    // ledger-cosmos-js hardens the first three indices
    const response = await this.app.sign(unharden(hdPathToUse), fromUtf8(message));
    this.handleLedgerErrors(response, "Transaction signing request was rejected by the user");
    return Secp256k1Signature.fromDer((response as SignResponse).signature).toFixedLength();
  }

  private verifyAppMode(testMode: boolean): void {
    if (testMode && !this.testModeAllowed) {
      throw new Error(
        `DANGER: The ${this.ledgerAppName} Ledger app is in test mode and should not be used on mainnet!`,
      );
    }
  }

  private async getOpenAppName(): Promise<string> {
    assert(this.app, `${this.ledgerAppName} Ledger App is not connected`);

    const response = await this.app.appInfo();
    this.handleLedgerErrors(response);
    return (response as AppInfoResponse).appName;
  }

  private async verifyAppVersion(): Promise<void> {
    const version = await this.getCosmosAppVersion();
    if (!semver.gte(version, this.minLedgerAppVersion)) {
      throw new Error(
        `Outdated version: Please update ${this.ledgerAppName} Ledger App to the latest version.`,
      );
    }
  }

  private async verifyCosmosAppIsOpen(): Promise<void> {
    const appName = await this.getOpenAppName();

    if (appName.toLowerCase() === `dashboard`) {
      throw new Error(`Please open the ${this.ledgerAppName} Ledger app on your Ledger device.`);
    }
    if (appName.toLowerCase() !== this.ledgerAppName.toLowerCase()) {
      throw new Error(
        `Please close ${appName} and open the ${this.ledgerAppName} Ledger app on your Ledger device.`,
      );
    }
  }

  private async verifyDeviceIsReady(): Promise<void> {
    await this.verifyAppVersion();
    await this.verifyCosmosAppIsOpen();
  }

  /**
   * Shows the user's address in the device and returns an address/pubkey pair.
   *
   * The address will be shown with the native prefix of the app (e.g. cosmos, persistence, desmos)
   * and does not support the usage of other address prefixes.
   *
   * @param path The HD path to show the address for. If unset, this is the first account.
   */
  public async showAddress(hdPath?: HdPath): Promise<AddressAndPubkey> {
    await this.verifyDeviceIsReady();

    const hdPathToUse = hdPath || this.hdPaths[0];
    // ledger-cosmos-js hardens the first three indices
    const response = await this.app.showAddressAndPubKey(unharden(hdPathToUse), this.prefix);
    this.handleLedgerErrors(response);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { address, compressed_pk } = response as AddressAndPublicKeyResponse;
    return {
      address: address,
      pubkey: encodeSecp256k1Pubkey(compressed_pk),
    };
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
        throw new Error(`${this.ledgerAppName} app is not open`);
      case "Command not allowed":
        throw new Error("Transaction rejected");
      case "Transaction rejected":
        throw new Error(rejectionMessage);
      case "Unknown Status Code: 26628":
        throw new Error("Ledger’s screensaver mode is on");
      case "Instruction not supported":
        throw new Error(
          `Your ${this.ledgerAppName} Ledger App is not up to date. Please update to version ${this.minLedgerAppVersion} or newer.`,
        );
      case "No errors":
        break;
      default:
        throw new Error(`Ledger Native Error: ${errorMessage}`);
    }
  }
}

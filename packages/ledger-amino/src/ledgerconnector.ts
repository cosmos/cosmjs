import { encodeSecp256k1Pubkey, makeCosmoshubPath, pubkeyToAddress, Secp256k1Pubkey } from "@cosmjs/amino";
import { HdPath, pathToString, Secp256k1Signature } from "@cosmjs/crypto";
import { fromUtf8 } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";
// eslint-disable-next-line @typescript-eslint/naming-convention
import Transport from "@ledgerhq/hw-transport";
// eslint-disable-next-line @typescript-eslint/naming-convention
import CosmosApp from "@zondax/ledger-cosmos-js";
import semver from "semver";

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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { major, minor, patch, testMode: testMode } = response;
    this.verifyAppMode(!!testMode);
    return `${major}.${minor}.${patch}`;
  }

  public async getPubkey(hdPath?: HdPath): Promise<Uint8Array> {
    await this.verifyDeviceIsReady();
    assert(this.app, `${this.ledgerAppName} Ledger App is not connected`);

    const hdPathToUse = hdPath || this.hdPaths[0];
    const response = await this.app.publicKey(pathToString(hdPathToUse));
    return Uint8Array.from(response.compressed_pk);
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
    const response = await this.app.sign(pathToString(hdPathToUse), Buffer.from(fromUtf8(message)));
    return Secp256k1Signature.fromDer(response.signature).toFixedLength();
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
    return response.appName || "";
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
    const response = await this.app.showAddressAndPubKey(pathToString(hdPathToUse), this.prefix);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { bech32_address, compressed_pk } = response;
    return {
      address: bech32_address,
      pubkey: encodeSecp256k1Pubkey(compressed_pk),
    };
  }
}

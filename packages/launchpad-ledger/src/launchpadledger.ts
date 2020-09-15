import { Secp256k1Signature, Slip10RawIndex } from "@cosmjs/crypto";
import { fromUtf8 } from "@cosmjs/encoding";
import { makeCosmoshubPath } from "@cosmjs/launchpad";
import { assert } from "@cosmjs/utils";
import Transport from "@ledgerhq/hw-transport";
import TransportWebUsb from "@ledgerhq/hw-transport-webusb";
import CosmosApp, {
  AppInfoResponse,
  PublicKeyResponse,
  SignResponse,
  VersionResponse,
} from "ledger-cosmos-js";
import semver from "semver";

const defaultInteractionTimeout = 120; // seconds to wait for user action on Ledger, currently is always limited to 60
const requiredCosmosAppVersion = "1.5.3";

function isWindows(platform: string): boolean {
  return platform.indexOf("Win") > -1;
}

function verifyBrowserIsSupported(platform: string, userAgent: string): void {
  if (isWindows(platform)) {
    throw new Error("Windows is not currently supported.");
  }

  const isChromeOrBrave = /chrome|crios/i.test(userAgent) && !/edge|opr\//i.test(userAgent);
  if (!isChromeOrBrave) {
    throw new Error("Your browser does not support Ledger devices.");
  }
}

async function createTransport(timeout: number): Promise<Transport> {
  try {
    const transport = await TransportWebUsb.create(timeout * 1000);
    return transport;
  } catch (error) {
    const trimmedErrorMessage = error.message.trim();
    if (trimmedErrorMessage.startsWith("No WebUSB interface found for your Ledger device")) {
      throw new Error(
        "Could not connect to a Ledger device. Please use Ledger Live to upgrade the Ledger firmware to version 1.5.5 or later.",
      );
    }
    if (trimmedErrorMessage.startsWith("Unable to claim interface")) {
      throw new Error("Could not access Ledger device. Is it being used in another tab?");
    }
    if (trimmedErrorMessage.startsWith("Not supported")) {
      throw new Error(
        "Your browser does not seem to support WebUSB yet. Try updating it to the latest version.",
      );
    }
    if (trimmedErrorMessage.startsWith("No device selected")) {
      throw new Error(
        "You did not select a Ledger device. If you did not see your Ledger, check if the Ledger is plugged in and unlocked.",
      );
    }

    throw error;
  }
}

function unharden(hdPath: readonly Slip10RawIndex[]): number[] {
  return hdPath.map((n) => (n.isHardened() ? n.toNumber() - 2 ** 31 : n.toNumber()));
}

const cosmosHdPath = makeCosmoshubPath(0);
const cosmosBech32Prefix = "cosmos";

export interface LaunchpadLedgerOptions {
  readonly hdPath?: readonly Slip10RawIndex[];
  readonly prefix?: string;
  readonly testModeAllowed?: boolean;
}

export class LaunchpadLedger {
  private readonly testModeAllowed: boolean;
  private readonly hdPath: readonly Slip10RawIndex[];
  private readonly prefix: string;
  private cosmosApp: CosmosApp | null;
  public readonly platform: string;
  public readonly userAgent: string;

  constructor(options: LaunchpadLedgerOptions = {}) {
    const defaultOptions = {
      hdPath: cosmosHdPath,
      prefix: cosmosBech32Prefix,
      testModeAllowed: false,
    };
    const { hdPath, prefix, testModeAllowed } = {
      ...defaultOptions,
      ...options,
    };
    this.testModeAllowed = testModeAllowed;
    this.hdPath = hdPath;
    this.prefix = prefix;
    this.cosmosApp = null;
    this.platform = navigator.platform;
    this.userAgent = navigator.userAgent;
  }

  // // quickly test connection and compatibility with the LaunchpadLedger device throwing away the connection
  // async testDevice(): Promise<LaunchpadLedger> {
  //   // poll device with low timeout to check if the device is connected
  //   const secondsTimeout = 3; // a lower value always timeouts
  //   await this.connect(secondsTimeout);
  //   this.cosmosApp = null;

  //   return this;
  // }

  async connect(timeout = defaultInteractionTimeout): Promise<LaunchpadLedger> {
    // assume good connection if connected once
    if (this.cosmosApp) {
      return this;
    }

    verifyBrowserIsSupported(this.platform, this.userAgent);

    const transport = await createTransport(timeout * 1000);
    this.cosmosApp = new CosmosApp(transport);

    await this.verifyDeviceIsReady();
    return this;
  }

  async getCosmosAppVersion(): Promise<string> {
    await this.connect();
    assert(this.cosmosApp, "Cosmos Ledger App is not connected");

    const response = await this.cosmosApp.getVersion();
    this.handleLedgerErrors(response);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { major, minor, patch, test_mode: testMode } = response as VersionResponse;
    this.verifyAppMode(testMode);
    return `${major}.${minor}.${patch}`;
  }

  async getPubkey(): Promise<Uint8Array> {
    await this.connect();
    assert(this.cosmosApp, "Cosmos Ledger App is not connected");

    // ledger-cosmos-js hardens the first three indices
    const response = await this.cosmosApp.publicKey(unharden(this.hdPath));
    this.handleLedgerErrors(response);
    return Uint8Array.from((response as PublicKeyResponse).compressed_pk);
  }

  async getCosmosAddress(pubkey?: Uint8Array): Promise<string> {
    const pubkeyToUse = pubkey || (await this.getPubkey());
    return CosmosApp.getBech32FromPK(this.prefix, Buffer.from(pubkeyToUse));
  }

  // async verifyLedgerAddress(): Promise<void> {
  //   await this.connect();
  //   assert(this.cosmosApp, "Cosmos Ledger App is not connected");

  //   const response = await this.cosmosApp.showAddressAndPubKey(this.hdPath, this.bech32Prefix);
  //   this.handleLedgerErrors(response, {
  //     rejectionMessage: "Displayed address was rejected by the user",
  //   });
  // }

  async sign(message: Uint8Array): Promise<Uint8Array> {
    await this.connect();
    assert(this.cosmosApp, "Cosmos Ledger App is not connected");

    // ledger-cosmos-js hardens the first three indices
    const response = await this.cosmosApp.sign(unharden(this.hdPath), fromUtf8(message));
    this.handleLedgerErrors(response, {
      rejectionMessage: "Transaction signing request was rejected by the user",
    });
    return Secp256k1Signature.fromDer((response as SignResponse).signature).toFixedLength();
  }

  private verifyAppMode(testMode: boolean): void {
    if (testMode && !this.testModeAllowed) {
      throw new Error(`DANGER: The Cosmos Ledger app is in test mode and should not be used on mainnet!`);
    }
  }

  private async getOpenAppName(): Promise<string> {
    await this.connect();
    assert(this.cosmosApp, "Cosmos Ledger App is not connected");

    const response = await this.cosmosApp.appInfo();
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

  /* eslint-disable @typescript-eslint/naming-convention */
  private handleLedgerErrors(
    {
      error_message: errorMessage,
      device_locked: deviceLocked = false,
    }: { error_message: string; device_locked?: boolean },
    { rejectionMessage = "Request was rejected by the user" } = {},
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
  /* eslint-enable */
}

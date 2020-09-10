import { Secp256k1Signature } from "@cosmjs/crypto";
import { fromUtf8 } from "@cosmjs/encoding";
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

const cosmosHdPath = [44, 118, 0, 0, 0];
const cosmosBech32Prefix = "cosmos";

export class LaunchpadLedger {
  private readonly testModeAllowed: boolean;
  private readonly hdPath: number[];
  private readonly prefix: string;
  private cosmosApp: CosmosApp | null;
  public readonly platform: string;
  public readonly userAgent: string;

  constructor(
    { testModeAllowed }: { testModeAllowed: boolean } = { testModeAllowed: false },
    hdPath: number[] = cosmosHdPath,
    prefix: string = cosmosBech32Prefix,
  ) {
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

  async getPubKey(): Promise<Buffer> {
    await this.connect();
    assert(this.cosmosApp, "Cosmos Ledger App is not connected");

    const response = await this.cosmosApp.publicKey(this.hdPath);
    this.handleLedgerErrors(response);
    return (response as PublicKeyResponse).compressed_pk;
  }

  async getCosmosAddress(): Promise<string> {
    const pubKey = await this.getPubKey();
    return CosmosApp.getBech32FromPK(this.prefix, pubKey);
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

    const response = await this.cosmosApp.sign(this.hdPath, fromUtf8(message));
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

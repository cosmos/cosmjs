declare module "ledger-cosmos-js" {
  import Transport from "@ledgerhq/hw-transport";

  export interface ErrorResponse {
    readonly return_code: number;
    readonly error_message: string;
  }

  export interface VersionResponse {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
    readonly test_mode: boolean;
    readonly error_message: string;
    readonly device_locked: boolean;
  }

  export interface AppInfoResponse {
    readonly appName: string;
    readonly error_message: string;
  }

  export interface PublicKeyResponse {
    readonly compressed_pk: Buffer;
    readonly error_message: string;
  }

  export interface AddressAndPublicKeyResponse {
    readonly compressed_pk: Buffer;
    readonly address: string;
    readonly error_message: string;
  }

  export interface SignResponse {
    readonly signature: Buffer;
    readonly error_message: string;
  }

  export default class CosmosApp {
    static getBech32FromPK(hrp: string, pk: Buffer): string;

    constructor(transport: Transport, scrambleKey?: string);

    getVersion: () => Promise<VersionResponse | ErrorResponse>;
    appInfo: () => Promise<AppInfoResponse | ErrorResponse>;
    publicKey: (path: Array<number>) => Promise<PublicKeyResponse | ErrorResponse>;
    showAddressAndPubKey: (
      path: Array<number>,
      hrp: string,
    ) => Promise<AddressAndPublicKeyResponse | ErrorResponse>;
    sign: (path: Array<number>, message: string) => Promise<SignResponse | ErrorResponse>;
  }
}

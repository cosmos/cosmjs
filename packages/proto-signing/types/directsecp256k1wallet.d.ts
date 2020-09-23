import { HdPath } from "@cosmjs/crypto";
import { AccountData, StdSignature } from "@cosmjs/launchpad";
/** A wallet for protobuf based signing using SIGN_MODE_DIRECT */
export declare class DirectSecp256k1Wallet {
  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static fromMnemonic(mnemonic: string, hdPath?: HdPath, prefix?: string): Promise<DirectSecp256k1Wallet>;
  /**
   * Generates a new wallet with a BIP39 mnemonic of the given length.
   *
   * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
   * @param hdPath The BIP-32/SLIP-10 derivation path. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static generate(
    length?: 12 | 15 | 18 | 21 | 24,
    hdPath?: HdPath,
    prefix?: string,
  ): Promise<DirectSecp256k1Wallet>;
  /** Base secret */
  private readonly secret;
  /** Derivation instruction */
  private readonly accounts;
  /** Derived data */
  private readonly pubkey;
  private readonly privkey;
  private constructor();
  get mnemonic(): string;
  private get address();
  getAccounts(): Promise<readonly AccountData[]>;
  sign(address: string, message: Uint8Array): Promise<StdSignature>;
}

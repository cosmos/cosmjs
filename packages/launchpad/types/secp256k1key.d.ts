import { StdSignDoc } from "./encoding";
import { AccountData, OfflineSigner, SignResponse } from "./signer";
export declare class Secp256k1Key implements OfflineSigner {
  /**
   * Creates a Secp256k1 key signer from the given private key
   *
   * @param privkey The private key.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  static fromPrivateKey(privkey: Uint8Array, prefix?: string): Promise<Secp256k1Key>;
  private readonly pubkey;
  private readonly privkey;
  private readonly prefix;
  private constructor();
  private get address();
  getAccounts(): Promise<readonly AccountData[]>;
  sign(signerAddress: string, signDoc: StdSignDoc): Promise<SignResponse>;
}

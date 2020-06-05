import { EnglishMnemonic } from "./englishmnemonic";
export declare class Bip39 {
  static encode(entropy: Uint8Array): EnglishMnemonic;
  static decode(mnemonic: EnglishMnemonic): Uint8Array;
  static mnemonicToSeed(mnemonic: EnglishMnemonic, password?: string): Promise<Uint8Array>;
  private static pbkdf2;
}

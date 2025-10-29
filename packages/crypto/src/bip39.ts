import { entropyToMnemonic, mnemonicToEntropy, mnemonicToSeed } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

export class EnglishMnemonic {
  public static readonly wordlist: readonly string[] = wordlist;

  private readonly data: string;

  public constructor(mnemonic: string) {
    // throws an error if mnemonic is invalid
    const _ = mnemonicToEntropy(mnemonic, wordlist);

    this.data = mnemonic;
  }

  public toString(): string {
    return this.data;
  }
}

export class Bip39 {
  /**
   * Encodes raw entropy of length 16, 20, 24, 28 or 32 bytes as an English mnemonic between 12 and 24 words.
   *
   * | Entropy            | Words |
   * |--------------------|-------|
   * | 128 bit (16 bytes) |    12 |
   * | 160 bit (20 bytes) |    15 |
   * | 192 bit (24 bytes) |    18 |
   * | 224 bit (28 bytes) |    21 |
   * | 256 bit (32 bytes) |    24 |
   *
   *
   * @see https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#generating-the-mnemonic
   * @param entropy The entropy to be encoded. This must be cryptographically secure.
   */
  public static encode(entropy: Uint8Array): EnglishMnemonic {
    return new EnglishMnemonic(entropyToMnemonic(entropy, wordlist));
  }

  public static decode(mnemonic: EnglishMnemonic): Uint8Array<ArrayBuffer> {
    return mnemonicToEntropy(mnemonic.toString(), wordlist);
  }

  public static async mnemonicToSeed(mnemonic: EnglishMnemonic, password?: string): Promise<Uint8Array> {
    return await mnemonicToSeed(mnemonic.toString(), password);
  }
}

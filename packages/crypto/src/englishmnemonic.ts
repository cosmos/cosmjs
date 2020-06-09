import * as bip39 from "bip39";

export class EnglishMnemonic {
  public static readonly wordlist: readonly string[] = bip39.wordlists.english;

  // list of space separated lower case words (1 or more)
  private static readonly mnemonicMatcher = /^[a-z]+( [a-z]+)*$/;

  private readonly data: string;

  public constructor(mnemonic: string) {
    if (!EnglishMnemonic.mnemonicMatcher.test(mnemonic)) {
      throw new Error("Invalid mnemonic format");
    }

    const words = mnemonic.split(" ");
    const allowedWordsLengths: readonly number[] = [12, 15, 18, 21, 24];
    if (allowedWordsLengths.indexOf(words.length) === -1) {
      throw new Error(
        `Invalid word count in mnemonic (allowed: ${allowedWordsLengths} got: ${words.length})`,
      );
    }

    for (const word of words) {
      if (EnglishMnemonic.wordlist.indexOf(word) === -1) {
        throw new Error("Mnemonic contains invalid word");
      }
    }

    // Throws with informative error message if mnemonic is not valid
    bip39.mnemonicToEntropy(mnemonic);

    this.data = mnemonic;
  }

  public toString(): string {
    return this.data;
  }
}

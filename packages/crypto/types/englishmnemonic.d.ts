export declare class EnglishMnemonic {
  static readonly wordlist: readonly string[];
  private static readonly mnemonicMatcher;
  private readonly data;
  constructor(mnemonic: string);
  toString(): string;
}

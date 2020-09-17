export interface BankTokenMeta {
  readonly denom: string;
}

const parseBankTokenPattern = /^([a-zA-Z]{2,20})$/;

export function parseBankToken(input: string): BankTokenMeta {
  const match = input.replace(/\s/g, "").match(parseBankTokenPattern);
  if (!match) {
    throw new Error("Token could not be parsed. Format: {DISPLAY}=10^{DIGITS}{base}, e.g. ATOM=10^6uatom");
  }
  return {
    denom: match[1],
  };
}

export function parseBankTokens(input: string): BankTokenMeta[] {
  return input
    .trim()
    .split(",")
    .filter((part) => part.trim() !== "")
    .map((part) => parseBankToken(part));
}

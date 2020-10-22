const parseBankTokenPattern = /^([a-zA-Z]{2,20})$/;

export function parseBankToken(input: string): string {
  const match = input.replace(/\s/g, "").match(parseBankTokenPattern);
  if (!match) {
    throw new Error("Token could not be parsed");
  }
  return match[1];
}

export function parseBankTokens(input: string): string[] {
  return input
    .trim()
    .split(",")
    .filter((part) => part.trim() !== "")
    .map((part) => parseBankToken(part));
}

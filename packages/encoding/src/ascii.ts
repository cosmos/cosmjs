export function toAscii(input: string): Uint8Array {
  const toNums = (str: string): readonly number[] =>
    str.split("").map((x: string) => {
      const charCode = x.charCodeAt(0);
      // 0x00–0x1F control characters
      // 0x20–0x7E printable characters
      // 0x7F delete character
      // 0x80–0xFF out of 7 bit ascii range
      if (charCode < 0x20 || charCode > 0x7e) {
        throw new Error("Cannot encode character that is out of printable ASCII range: " + charCode);
      }
      return charCode;
    });
  return Uint8Array.from(toNums(input));
}

export function fromAscii(data: Uint8Array): string {
  const fromNums = (listOfNumbers: readonly number[]): readonly string[] =>
    listOfNumbers.map((x: number): string => {
      // 0x00–0x1F control characters
      // 0x20–0x7E printable characters
      // 0x7F delete character
      // 0x80–0xFF out of 7 bit ascii range
      if (x < 0x20 || x > 0x7e) {
        throw new Error("Cannot decode character that is out of printable ASCII range: " + x);
      }
      return String.fromCharCode(x);
    });

  return fromNums(Array.from(data)).join("");
}

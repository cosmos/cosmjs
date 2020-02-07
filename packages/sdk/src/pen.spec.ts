import { Secp256k1, Secp256k1Signature, Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { Secp256k1Pen } from "./pen";

const { fromHex } = Encoding;

describe("Sec256k1Pen", () => {
  it("can be constructed", async () => {
    const pen = await Secp256k1Pen.fromMnemonic(
      "zebra slush diet army arrest purpose hawk source west glimpse custom record",
    );
    expect(pen).toBeTruthy();
  });

  describe("pubkey", () => {
    it("returns compressed pubkey", async () => {
      // special sign fit simple patrol salute grocery chicken wheat radar tonight ceiling
      // m/44'/118'/0'/0/0
      // pubkey: 02baa4ef93f2ce84592a49b1d729c074eab640112522a7a89f7d03ebab21ded7b6
      const pen = await Secp256k1Pen.fromMnemonic(
        "special sign fit simple patrol salute grocery chicken wheat radar tonight ceiling",
      );
      expect(pen.pubkey).toEqual(
        fromHex("02baa4ef93f2ce84592a49b1d729c074eab640112522a7a89f7d03ebab21ded7b6"),
      );
    });
  });

  describe("createSignature", () => {
    it("creates correct signatures", async () => {
      const pen = await Secp256k1Pen.fromMnemonic(
        "special sign fit simple patrol salute grocery chicken wheat radar tonight ceiling",
      );
      const data = Encoding.toAscii("foo bar");
      const signature = await pen.createSignature(data);

      const valid = await Secp256k1.verifySignature(
        new Secp256k1Signature(signature.slice(0, 32), signature.slice(32, 64)),
        new Sha256(data).digest(),
        pen.pubkey,
      );
      expect(valid).toEqual(true);
    });
  });
});

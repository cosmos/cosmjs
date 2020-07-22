import { Secp256k1, Secp256k1Signature, Sha256 } from "@cosmjs/crypto";
import { fromBase64, fromHex, toAscii } from "@cosmjs/encoding";

import { base64Matcher } from "./testutils.spec";
import { Secp256k1Wallet } from "./wallet";

describe("Secp256k1Wallet", () => {
  // m/44'/118'/0'/0/0
  // pubkey: 02baa4ef93f2ce84592a49b1d729c074eab640112522a7a89f7d03ebab21ded7b6
  const defaultMnemonic = "special sign fit simple patrol salute grocery chicken wheat radar tonight ceiling";
  const defaultPubkey = fromHex("02baa4ef93f2ce84592a49b1d729c074eab640112522a7a89f7d03ebab21ded7b6");
  const defaultAddress = "cosmos1jhg0e7s6gn44tfc5k37kr04sznyhedtc9rzys5";

  describe("fromMnemonic", () => {
    it("works", async () => {
      const wallet = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);
      expect(wallet).toBeTruthy();
      expect(wallet.mnemonic).toEqual(defaultMnemonic);
    });
  });

  describe("generate", () => {
    it("defaults to 12 words", async () => {
      const wallet = await Secp256k1Wallet.generate();
      expect(wallet.mnemonic.split(" ").length).toEqual(12);
    });

    it("can use different mnemonic lengths", async () => {
      expect((await Secp256k1Wallet.generate(12)).mnemonic.split(" ").length).toEqual(12);
      expect((await Secp256k1Wallet.generate(15)).mnemonic.split(" ").length).toEqual(15);
      expect((await Secp256k1Wallet.generate(18)).mnemonic.split(" ").length).toEqual(18);
      expect((await Secp256k1Wallet.generate(21)).mnemonic.split(" ").length).toEqual(21);
      expect((await Secp256k1Wallet.generate(24)).mnemonic.split(" ").length).toEqual(24);
    });
  });

  describe("getAccounts", () => {
    it("resolves to a list of accounts if enabled", async () => {
      const wallet = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);
      const accounts = await wallet.getAccounts();
      expect(accounts.length).toEqual(1);
      expect(accounts[0]).toEqual({
        address: defaultAddress,
        algo: "secp256k1",
        pubkey: defaultPubkey,
      });
    });

    it("creates the same address as Go implementation", async () => {
      const wallet = await Secp256k1Wallet.fromMnemonic(
        "oyster design unusual machine spread century engine gravity focus cave carry slot",
      );
      const [{ address }] = await wallet.getAccounts();
      expect(address).toEqual("cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u");
    });
  });

  describe("sign", () => {
    it("resolves to valid signature if enabled", async () => {
      const wallet = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);
      const message = toAscii("foo bar");
      const signature = await wallet.sign(defaultAddress, message);
      const valid = await Secp256k1.verifySignature(
        Secp256k1Signature.fromFixedLength(fromBase64(signature.signature)),
        new Sha256(message).digest(),
        defaultPubkey,
      );
      expect(valid).toEqual(true);
    });
  });

  describe("save", () => {
    it("can save with password", async () => {
      const wallet = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);
      const serialized = await wallet.save("123");
      expect(JSON.parse(serialized)).toEqual(
        jasmine.objectContaining({
          type: "v1",
          value: jasmine.stringMatching(base64Matcher),
        }),
      );
    });
  });
});

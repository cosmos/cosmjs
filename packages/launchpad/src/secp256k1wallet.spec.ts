/* eslint-disable @typescript-eslint/naming-convention */
import { Secp256k1, Secp256k1Signature, Sha256 } from "@cosmjs/crypto";
import { fromBase64, fromHex } from "@cosmjs/encoding";

import { serializeSignDoc, StdSignDoc } from "./encoding";
import { extractKdfConfiguration, Secp256k1Wallet } from "./secp256k1wallet";
import { base64Matcher } from "./testutils.spec";
import { executeKdf, KdfConfiguration } from "./wallet";

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

  describe("deserialize", () => {
    it("can restore", async () => {
      const original = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);
      const password = "123";
      const serialized = await original.serialize(password);
      const deserialized = await Secp256k1Wallet.deserialize(serialized, password);
      expect(deserialized.mnemonic).toEqual(defaultMnemonic);
      expect(await deserialized.getAccounts()).toEqual([
        {
          algo: "secp256k1",
          address: defaultAddress,
          pubkey: defaultPubkey,
        },
      ]);
    });
  });

  describe("deserializeWithEncryptionKey", () => {
    it("can restore", async () => {
      const password = "123";
      let serialized: string;
      {
        const original = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);
        const anyKdfParams: KdfConfiguration = {
          algorithm: "argon2id",
          params: {
            outputLength: 32,
            opsLimit: 4,
            memLimitKib: 3 * 1024,
          },
        };
        const encryptionKey = await executeKdf(password, anyKdfParams);
        serialized = await original.serializeWithEncryptionKey(encryptionKey, anyKdfParams);
      }

      {
        const kdfConfiguration = extractKdfConfiguration(serialized);
        const encryptionKey = await executeKdf(password, kdfConfiguration);
        const deserialized = await Secp256k1Wallet.deserializeWithEncryptionKey(serialized, encryptionKey);
        expect(deserialized.mnemonic).toEqual(defaultMnemonic);
        expect(await deserialized.getAccounts()).toEqual([
          {
            algo: "secp256k1",
            address: defaultAddress,
            pubkey: defaultPubkey,
          },
        ]);
      }
    });
  });

  describe("getAccounts", () => {
    it("resolves to a list of accounts", async () => {
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
      const signDoc: StdSignDoc = {
        msgs: [],
        fee: { amount: [], gas: "23" },
        chain_id: "foochain",
        memo: "hello, world",
        account_number: "7",
        sequence: "54",
      };
      const { signature } = await wallet.sign(defaultAddress, signDoc);
      const valid = await Secp256k1.verifySignature(
        Secp256k1Signature.fromFixedLength(fromBase64(signature.signature)),
        new Sha256(serializeSignDoc(signDoc)).digest(),
        defaultPubkey,
      );
      expect(valid).toEqual(true);
    });
  });

  describe("serialize", () => {
    it("can save with password", async () => {
      const wallet = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);
      const serialized = await wallet.serialize("123");
      expect(JSON.parse(serialized)).toEqual({
        type: "secp256k1wallet-v1",
        kdf: {
          algorithm: "argon2id",
          params: {
            outputLength: 32,
            opsLimit: 20,
            memLimitKib: 12 * 1024,
          },
        },
        encryption: {
          algorithm: "xchacha20poly1305-ietf",
        },
        data: jasmine.stringMatching(base64Matcher),
      });
    });
  });

  describe("serializeWithEncryptionKey", () => {
    it("can save with password", async () => {
      const wallet = await Secp256k1Wallet.fromMnemonic(defaultMnemonic);

      const key = fromHex("aabb221100aabb332211aabb33221100aabb221100aabb332211aabb33221100");
      const customKdfConfiguration: KdfConfiguration = {
        algorithm: "argon2id",
        params: {
          outputLength: 32,
          opsLimit: 321,
          memLimitKib: 11 * 1024,
        },
      };
      const serialized = await wallet.serializeWithEncryptionKey(key, customKdfConfiguration);
      expect(JSON.parse(serialized)).toEqual({
        type: "secp256k1wallet-v1",
        kdf: customKdfConfiguration,
        encryption: {
          algorithm: "xchacha20poly1305-ietf",
        },
        data: jasmine.stringMatching(base64Matcher),
      });
    });
  });
});

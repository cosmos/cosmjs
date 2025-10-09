import { coins } from "@cosmjs/amino";
import { keccak256, Secp256k1, Secp256k1Signature, Slip10RawIndex } from "@cosmjs/crypto";
import { fromBase64, fromHex } from "@cosmjs/encoding";

import { DirectEthSecp256k1HdWallet, extractKdfConfiguration } from "./directethsecp256k1hdwallet";
import { makeAuthInfoBytes, makeSignBytes, makeSignDoc } from "./signing";
import { base64Matcher, faucet, testVectors } from "./testutils.spec";
import { executeKdf, KdfConfiguration } from "./wallet";

describe("DirectEthSecp256k1HdWallet", () => {
  // m/44'/60'/0'/0/0
  // pubkey: 0322739f397cee44e48eb02773c2d489eb7395bae9756349f16c1294a5a108351b
  const defaultMnemonic = "special sign fit simple patrol salute grocery chicken wheat radar tonight ceiling";
  const defaultPubkey = fromHex("0322739f397cee44e48eb02773c2d489eb7395bae9756349f16c1294a5a108351b");
  const defaultAddress = "cosmos1f6u96xyamswltlssyyr56fjv5uca9ggya5f28s";

  describe("fromMnemonic", () => {
    it("works", async () => {
      const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic);
      expect(wallet).toBeTruthy();
      expect(wallet.mnemonic).toEqual(defaultMnemonic);
    });

    it("works with options", async () => {
      const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic, {
        bip39Password: "password123",
        hdPaths: [
          [
            Slip10RawIndex.hardened(44),
            Slip10RawIndex.hardened(60),
            Slip10RawIndex.hardened(0),
            Slip10RawIndex.normal(0),
            Slip10RawIndex.normal(123),
          ],
        ],
        prefix: "yolo",
      });
      expect(wallet.mnemonic).toEqual(defaultMnemonic);
      const [{ pubkey, address }] = await wallet.getAccounts();
      expect(pubkey).not.toEqual(defaultPubkey);
      expect(address.slice(0, 4)).toEqual("yolo");
    });

    it("works with explicitly undefined options", async () => {
      const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic, {
        bip39Password: undefined,
        hdPaths: undefined,
        prefix: undefined,
      });
      expect(wallet.mnemonic).toEqual(defaultMnemonic);
      const [{ pubkey, address }] = await wallet.getAccounts();
      expect(pubkey).toEqual(defaultPubkey);
      expect(address).toEqual(defaultAddress);
    });
  });

  describe("generate", () => {
    it("defaults to 12 words", async () => {
      const wallet = await DirectEthSecp256k1HdWallet.generate();
      expect(wallet.mnemonic.split(" ").length).toEqual(12);
    });

    it("can use different mnemonic lengths", async () => {
      expect((await DirectEthSecp256k1HdWallet.generate(12)).mnemonic.split(" ").length).toEqual(12);
      expect((await DirectEthSecp256k1HdWallet.generate(15)).mnemonic.split(" ").length).toEqual(15);
      expect((await DirectEthSecp256k1HdWallet.generate(18)).mnemonic.split(" ").length).toEqual(18);
      expect((await DirectEthSecp256k1HdWallet.generate(21)).mnemonic.split(" ").length).toEqual(21);
      expect((await DirectEthSecp256k1HdWallet.generate(24)).mnemonic.split(" ").length).toEqual(24);
    });
  });

  describe("deserialize", () => {
    it("can restore", async () => {
      const original = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic);
      const password = "123";
      const serialized = await original.serialize(password);
      const deserialized = await DirectEthSecp256k1HdWallet.deserialize(serialized, password);
      const accounts = await deserialized.getAccounts();

      expect(deserialized.mnemonic).toEqual(defaultMnemonic);
      expect(accounts).toEqual([
        {
          algo: "eth_secp256k1",
          address: defaultAddress,
          pubkey: defaultPubkey,
        },
      ]);
    });

    it("can restore multiple accounts", async () => {
      const mnemonic =
        "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
      const prefix = "wasm";
      const accountNumbers = [0, 1, 2, 3, 4];
      const hdPaths = accountNumbers.map((n) => [
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(60),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(n),
      ]);
      const original = await DirectEthSecp256k1HdWallet.fromMnemonic(mnemonic, {
        hdPaths: hdPaths,
        prefix: prefix,
      });
      const password = "123";
      const serialized = await original.serialize(password);
      const deserialized = await DirectEthSecp256k1HdWallet.deserialize(serialized, password);
      const accounts = await deserialized.getAccounts();

      expect(deserialized.mnemonic).toEqual(mnemonic);
      expect(accounts.length).toEqual(5);
      expect(accounts[0].algo).toEqual("eth_secp256k1");
    });
  });

  describe("deserializeWithEncryptionKey", () => {
    it("can restore", async () => {
      const password = "123";
      let serialized: string;
      {
        const original = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic);
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
        const deserialized = await DirectEthSecp256k1HdWallet.deserializeWithEncryptionKey(
          serialized,
          encryptionKey,
        );
        expect(deserialized.mnemonic).toEqual(defaultMnemonic);
        expect(await deserialized.getAccounts()).toEqual([
          {
            algo: "eth_secp256k1",
            address: defaultAddress,
            pubkey: defaultPubkey,
          },
        ]);
      }
    });
  });

  describe("getAccounts", () => {
    it("resolves to a list of accounts", async () => {
      const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic);
      const accounts = await wallet.getAccounts();
      expect(accounts.length).toEqual(1);
      expect(accounts[0]).toEqual({
        address: defaultAddress,
        algo: "eth_secp256k1",
        pubkey: defaultPubkey,
      });
    });
  });

  describe("signDirect", () => {
    it("resolves to valid signature", async () => {
      const { accountNumber, sequence, bodyBytes } = testVectors[1].inputs;
      const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const pubkey = {
        typeUrl: "/cosmos.crypto.eth.ethsecp256k1.PubKey",
        value: fromBase64(faucet.pubkey.value),
      };
      const fee = coins(2000, "ucosm");
      const gasLimit = 200000;
      const feeGranter = undefined;
      const feePayer = undefined;
      const chainId = "simd-testing";
      const signDoc = makeSignDoc(
        fromHex(bodyBytes),
        makeAuthInfoBytes([{ pubkey, sequence }], fee, gasLimit, feeGranter, feePayer),
        chainId,
        accountNumber,
      );
      const signDocBytes = makeSignBytes(signDoc);
      const [account] = await wallet.getAccounts();
      const { signature } = await wallet.signDirect(account.address, signDoc);
      const valid = await Secp256k1.verifySignature(
        Secp256k1Signature.fromFixedLength(fromBase64(signature.signature)),
        keccak256(signDocBytes),
        account.pubkey,
      );
      expect(valid).toEqual(true);
    });
  });

  describe("serialize", () => {
    it("can save with password", async () => {
      const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic);
      const serialized = await wallet.serialize("123");
      expect(JSON.parse(serialized)).toEqual({
        type: "directethsecp256k1hdwallet-v1",
        kdf: {
          algorithm: "argon2id",
          params: {
            outputLength: 32,
            opsLimit: 24,
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
      const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(defaultMnemonic);

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
        type: "directethsecp256k1hdwallet-v1",
        kdf: customKdfConfiguration,
        encryption: {
          algorithm: "xchacha20poly1305-ietf",
        },
        data: jasmine.stringMatching(base64Matcher),
      });
    });
  });
});

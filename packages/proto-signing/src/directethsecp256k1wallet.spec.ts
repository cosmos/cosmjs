import { coins } from "@cosmjs/amino";
import { keccak256, Secp256k1, Secp256k1Signature } from "@cosmjs/crypto";
import { fromBase64, fromHex } from "@cosmjs/encoding";

import { DirectEthSecp256k1Wallet } from "./directethsecp256k1wallet";
import { makeAuthInfoBytes, makeSignBytes, makeSignDoc } from "./signing";
import { testVectors } from "./testutils.spec";

describe("DirectEthSecp256k1Wallet", () => {
  const defaultPrivkey = fromHex("b8c462d2bb0c1a92edf44f735021f16c270f28ee2c3d1cb49943a5e70a3c763e");
  const defaultAddress = "cosmos1p4ukumnzsyf70dpw8cres7amggpvx9aa5dqdaq";
  const defaultPubkey = fromHex("03f146c27639179e5b67b8646108f48e1a78b146c74939e34afaa5414ad5c93f8a");

  describe("fromKey", () => {
    it("works", async () => {
      const signer = await DirectEthSecp256k1Wallet.fromKey(defaultPrivkey);
      expect(signer).toBeTruthy();
    });
  });

  describe("getAccounts", () => {
    it("resolves to a list of accounts", async () => {
      const signer = await DirectEthSecp256k1Wallet.fromKey(defaultPrivkey);
      const accounts = await signer.getAccounts();
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
      const wallet = await DirectEthSecp256k1Wallet.fromKey(defaultPrivkey);
      const accounts = await wallet.getAccounts();
      const pubkey = {
        typeUrl: "/cosmos.crypto.eth.ethsecp256k1.PubKey",
        value: accounts[0].pubkey,
      };
      const fee = coins(2000, "ucosm");
      const gasLimit = 200000;
      const chainId = "simd-testing";
      const feePayer = undefined;
      const feeGranter = undefined;
      const signDoc = makeSignDoc(
        fromHex(bodyBytes),
        makeAuthInfoBytes([{ pubkey, sequence }], fee, gasLimit, feeGranter, feePayer),
        chainId,
        accountNumber,
      );
      const signDocBytes = makeSignBytes(signDoc);
      const { signature } = await wallet.signDirect(accounts[0].address, signDoc);
      const valid = await Secp256k1.verifySignature(
        Secp256k1Signature.fromFixedLength(fromBase64(signature.signature)),
        keccak256(signDocBytes),
        pubkey.value,
      );
      expect(valid).toEqual(true);
    });
  });
});

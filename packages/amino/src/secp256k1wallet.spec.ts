/* eslint-disable @typescript-eslint/naming-convention */
import { Secp256k1, Secp256k1Signature, Sha256 } from "@cosmjs/crypto";
import { fromBase64, fromHex } from "@cosmjs/encoding";

import { Secp256k1Wallet } from "./secp256k1wallet";
import { serializeSignDoc, StdSignDoc } from "./signdoc";

describe("Secp256k1Wallet", () => {
  const defaultPrivkey = fromHex("b8c462d2bb0c1a92edf44f735021f16c270f28ee2c3d1cb49943a5e70a3c763e");
  const defaultAddress = "cosmos1kxt5x5q2l57ma2d434pqpafxdm0mgeg9c8cvtx";
  const defaultPubkey = fromHex("03f146c27639179e5b67b8646108f48e1a78b146c74939e34afaa5414ad5c93f8a");

  describe("fromKey", () => {
    it("works", async () => {
      const signer = await Secp256k1Wallet.fromKey(defaultPrivkey);
      expect(signer).toBeTruthy();
    });
  });

  describe("getAccounts", () => {
    it("resolves to a list of accounts", async () => {
      const signer = await Secp256k1Wallet.fromKey(defaultPrivkey);
      const accounts = await signer.getAccounts();
      expect(accounts.length).toEqual(1);
      expect(accounts[0]).toEqual({
        address: defaultAddress,
        algo: "secp256k1",
        pubkey: defaultPubkey,
      });
    });
  });

  describe("signAmino", () => {
    it("resolves to valid signature", async () => {
      const signer = await Secp256k1Wallet.fromKey(defaultPrivkey);
      const signDoc: StdSignDoc = {
        msgs: [],
        fee: { amount: [], gas: "23" },
        chain_id: "foochain",
        memo: "hello, world",
        account_number: "7",
        sequence: "54",
      };
      const { signed, signature } = await signer.signAmino(defaultAddress, signDoc);
      expect(signed).toEqual(signDoc);
      const valid = await Secp256k1.verifySignature(
        Secp256k1Signature.fromFixedLength(fromBase64(signature.signature)),
        new Sha256(serializeSignDoc(signed)).digest(),
        defaultPubkey,
      );
      expect(valid).toEqual(true);
    });
  });
});

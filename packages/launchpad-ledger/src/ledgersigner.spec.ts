/* eslint-disable @typescript-eslint/naming-convention */
import { Secp256k1, Secp256k1Signature, Sha256 } from "@cosmjs/crypto";
import { fromBase64 } from "@cosmjs/encoding";
import { coins, makeCosmoshubPath, makeSignDoc, Msg, serializeSignDoc, StdFee } from "@cosmjs/launchpad";

import { LedgerSigner } from "./ledgersigner";
import { pendingWithoutLedger, pendingWithoutLedgerInteractive } from "./testutils.spec";

const interactiveTimeout = 120_000;

describe("LedgerSigner", () => {
  const defaultChainId = "testing";
  const defaultFee: StdFee = {
    amount: coins(100, "ucosm"),
    gas: "250",
  };
  const defaultMemo = "Some memo";
  const defaultSequence = "0";
  const defaultAccountNumber = "42";
  const defaultRecipient = "cosmos1p6xs63q4g7np99ttv5nd3yzkt8n4qxa47w8aea";

  describe("getAccount", () => {
    it("works", async () => {
      pendingWithoutLedger();
      const signer = new LedgerSigner({
        testModeAllowed: true,
        hdPaths: [makeCosmoshubPath(0), makeCosmoshubPath(1), makeCosmoshubPath(10)],
      });

      const accounts = await signer.getAccounts();
      expect(accounts.length).toEqual(3);
      expect(accounts).toEqual([
        {
          address: "cosmos1p6xs63q4g7np99ttv5nd3yzkt8n4qxa47w8aea",
          algo: "secp256k1",
          pubkey: fromBase64("A66JoCNaNSXDsyj4qW7JgqXPTz5rOnfE6EKEArf4jJEK"),
        },
        {
          address: "cosmos1meeu3jl268txxytwmmrsljk8rawh6n2majstn2",
          algo: "secp256k1",
          pubkey: fromBase64("AtvmGuZvEN3NwL05BQdxl3XygUf+Vl/930fhFMt1HTyU"),
        },
        {
          address: "cosmos1f3pws3ztnp3s4nn5zxqdrl9vlqv5avkqmlrus4",
          algo: "secp256k1",
          pubkey: fromBase64("A2ZnLEcbpyjS30H5UF1vezq29aBcT9oo5EARATIW9Cpj"),
        },
      ]);
    });
  });

  describe("sign", () => {
    it(
      "works",
      async () => {
        pendingWithoutLedgerInteractive();
        const signer = new LedgerSigner({
          testModeAllowed: true,
          hdPaths: [makeCosmoshubPath(0), makeCosmoshubPath(1), makeCosmoshubPath(10)],
        });

        const [fistAccount] = await signer.getAccounts();

        const msgs: readonly Msg[] = [
          {
            type: "cosmos-sdk/MsgSend",
            value: {
              amount: coins(1234567, "ucosm"),
              from_address: fistAccount.address,
              to_address: defaultRecipient,
            },
          },
        ];
        const signDoc = makeSignDoc(
          msgs,
          defaultFee,
          defaultChainId,
          defaultMemo,
          defaultAccountNumber,
          defaultSequence,
        );
        const { signed, signature } = await signer.sign(fistAccount.address, signDoc);
        expect(signed).toEqual(signDoc);
        const valid = await Secp256k1.verifySignature(
          Secp256k1Signature.fromFixedLength(fromBase64(signature.signature)),
          new Sha256(serializeSignDoc(signed)).digest(),
          fistAccount.pubkey,
        );
        expect(valid).toEqual(true);
      },
      interactiveTimeout,
    );
  });
});

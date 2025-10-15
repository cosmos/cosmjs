import { fromBase64, fromHex } from "@cosmjs/encoding";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx.js";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys.js";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing.js";
import { Any } from "cosmjs-types/google/protobuf/any.js";

import { decodeTxRaw } from "./decode";
import { faucet, testVectors } from "./testutils.spec";

describe("decode", () => {
  describe("decodeTxRaw", () => {
    it("works", () => {
      const pubkeyBytes = fromBase64(faucet.pubkey.value);
      const prefixedPubkeyBytes = Uint8Array.from(PubKey.encode({ key: pubkeyBytes }).finish());
      const testVector = testVectors[0];

      const expectedMsg: Any = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: Uint8Array.from(
          MsgSend.encode({
            fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            toAddress: "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu",
            amount: [
              {
                denom: "ucosm",
                amount: "1234567",
              },
            ],
          }).finish(),
        ),
      };

      const decoded = decodeTxRaw(fromHex(testVector.outputs.signedTxBytes));
      expect(decoded).toEqual({
        authInfo: jasmine.objectContaining({
          signerInfos: [
            {
              publicKey: {
                typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                value: prefixedPubkeyBytes,
              },
              modeInfo: {
                single: {
                  mode: SignMode.SIGN_MODE_DIRECT,
                },
                multi: undefined,
              },
              sequence: BigInt(0),
            },
          ],
          fee: {
            gasLimit: BigInt(200000),
            payer: "",
            granter: "",
            amount: [{ amount: "2000", denom: "ucosm" }],
          },
        }),
        body: {
          memo: "",
          timeoutHeight: BigInt(0),
          messages: [expectedMsg],
          extensionOptions: [],
          nonCriticalExtensionOptions: [],
        },
        signatures: [fromHex(testVector.outputs.signature)],
      });
    });
  });
});

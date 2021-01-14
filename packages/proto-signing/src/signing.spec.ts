/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, fromHex, toHex } from "@cosmjs/encoding";

import { PubKey } from "./codec/cosmos/crypto/secp256k1/keys";
import { SignMode } from "./codec/cosmos/tx/signing/v1beta1/signing";
import { Tx, TxRaw } from "./codec/cosmos/tx/v1beta1/tx";
import { Any } from "./codec/google/protobuf/any";
import { DirectSecp256k1HdWallet } from "./directsecp256k1hdwallet";
import { Registry, TxBodyValue } from "./registry";
import { makeAuthInfoBytes, makeSignBytes, makeSignDoc } from "./signing";
import { faucet, testVectors } from "./testutils.spec";

describe("signing", () => {
  const chainId = "simd-testing";
  const toAddress = "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu";

  const sendAmount = "1234567";
  const sendDenom = "ucosm";
  const feeAmount = [
    {
      amount: "2000",
      denom: "ucosm",
    },
  ];
  const gasLimit = 200000;

  it("correctly parses test vectors", async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
    const prefixedPubkeyBytes = Uint8Array.from([0x0a, pubkeyBytes.length, ...pubkeyBytes]);

    testVectors.forEach(({ signedTxBytes }) => {
      const parsedTestTx = Tx.decode(fromHex(signedTxBytes));
      expect(parsedTestTx.signatures.length).toEqual(1);
      expect(parsedTestTx.authInfo!.signerInfos.length).toEqual(1);
      expect(Uint8Array.from(parsedTestTx.authInfo!.signerInfos[0].publicKey!.value ?? [])).toEqual(
        prefixedPubkeyBytes,
      );
      expect(parsedTestTx.authInfo?.signerInfos![0].modeInfo!.single!.mode).toEqual(
        SignMode.SIGN_MODE_DIRECT,
      );
      expect({ ...parsedTestTx.authInfo!.fee!.amount[0] }).toEqual({ denom: "ucosm", amount: "2000" });
      expect(parsedTestTx.authInfo!.fee!.gasLimit.toString()).toEqual(gasLimit.toString());
      expect(parsedTestTx.body!.extensionOptions).toEqual([]);
      expect(parsedTestTx.body!.nonCriticalExtensionOptions).toEqual([]);
      expect(parsedTestTx.body!.messages.length).toEqual(1);

      const registry = new Registry();
      const parsedTestTxMsg = registry.decode({
        typeUrl: parsedTestTx.body!.messages[0].typeUrl,
        value: parsedTestTx.body!.messages[0].value,
      });
      expect(parsedTestTxMsg.fromAddress).toEqual(address);
      expect(parsedTestTxMsg.toAddress).toEqual(toAddress);
      expect(parsedTestTxMsg.amount.length).toEqual(1);
      expect(parsedTestTxMsg.amount[0].denom).toEqual(sendDenom);
      expect(parsedTestTxMsg.amount[0].amount).toEqual(sendAmount);
    });
  });

  it("correctly generates test vectors", async () => {
    const myRegistry = new Registry();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
    const publicKey = PubKey.fromJSON({
      key: pubkeyBytes,
    });
    const publicKeyBytes = PubKey.encode(publicKey).finish();

    const txBodyFields: TxBodyValue = {
      messages: [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: address,
            toAddress: toAddress,
            amount: [
              {
                denom: sendDenom,
                amount: sendAmount,
              },
            ],
          },
        },
      ],
    };
    const txBodyBytes = myRegistry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: txBodyFields,
    });

    const publicKeyAny = Any.fromJSON({ typeUrl: "/cosmos.crypto.secp256k1.PubKey", value: publicKeyBytes });
    const accountNumber = 1;

    await Promise.all(
      testVectors.map(async ({ sequence, signBytes, signedTxBytes }) => {
        const authInfoBytes = makeAuthInfoBytes([publicKeyAny], feeAmount, gasLimit, sequence);
        const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
        const signDocBytes = makeSignBytes(signDoc);
        expect(toHex(signDocBytes)).toEqual(signBytes);

        const { signature } = await wallet.signDirect(address, signDoc);
        const txRaw = TxRaw.fromPartial({
          bodyBytes: txBodyBytes,
          authInfoBytes: authInfoBytes,
          signatures: [fromBase64(signature.signature)],
        });
        const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
        const txBytesHex = toHex(txRawBytes);
        expect(txBytesHex).toEqual(signedTxBytes);
      }),
    );
  });
});

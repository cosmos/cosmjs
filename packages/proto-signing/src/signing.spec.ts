/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, fromHex, toHex } from "@cosmjs/encoding";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import { decodeTxRaw } from "./decode";
import { DirectSecp256k1HdWallet } from "./directsecp256k1hdwallet";
import { Registry } from "./registry";
import { makeSignBytes, makeSignDoc } from "./signing";
import { faucet, testVectors } from "./testutils.spec";

describe("signing", () => {
  const chainId = "simd-testing";
  const toAddress = "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu";

  const sendAmount = "1234567";
  const sendDenom = "ucosm";
  const gasLimit = 200000;

  it("correctly parses signed transactions from test vectors", async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
    const prefixedPubkeyBytes = Uint8Array.from(PubKey.encode({ key: pubkeyBytes }).finish());

    testVectors.forEach(({ outputs: { signedTxBytes } }) => {
      const parsedTestTx = decodeTxRaw(fromHex(signedTxBytes));
      expect(parsedTestTx.signatures.length).toEqual(1);
      expect(parsedTestTx.authInfo.signerInfos.length).toEqual(1);
      expect(Uint8Array.from(parsedTestTx.authInfo.signerInfos[0].publicKey!.value)).toEqual(
        prefixedPubkeyBytes,
      );
      expect(parsedTestTx.authInfo.signerInfos[0].modeInfo!.single!.mode).toEqual(SignMode.SIGN_MODE_DIRECT);
      expect({ ...parsedTestTx.authInfo.fee!.amount[0] }).toEqual({ denom: "ucosm", amount: "2000" });
      expect(parsedTestTx.authInfo.fee!.gasLimit.toString()).toEqual(gasLimit.toString());
      expect(parsedTestTx.body.extensionOptions).toEqual([]);
      expect(parsedTestTx.body.nonCriticalExtensionOptions).toEqual([]);
      expect(parsedTestTx.body.messages.length).toEqual(1);

      const registry = new Registry();
      const parsedTestTxMsg = registry.decode({
        typeUrl: parsedTestTx.body.messages[0].typeUrl,
        value: parsedTestTx.body.messages[0].value,
      });
      expect(parsedTestTxMsg.fromAddress).toEqual(address);
      expect(parsedTestTxMsg.toAddress).toEqual(toAddress);
      expect(parsedTestTxMsg.amount.length).toEqual(1);
      expect(parsedTestTxMsg.amount[0].denom).toEqual(sendDenom);
      expect(parsedTestTxMsg.amount[0].amount).toEqual(sendAmount);
    });
  });

  it("correctly generates sign docs and signed transactions from test vectors", async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const [{ address }] = await wallet.getAccounts();

    await Promise.all(
      testVectors.map(async ({ inputs, outputs }) => {
        const signDoc = makeSignDoc(
          fromHex(inputs.bodyBytes),
          fromHex(inputs.authInfoBytes),
          chainId,
          inputs.accountNumber,
        );
        const signDocBytes = makeSignBytes(signDoc);
        expect(toHex(signDocBytes)).toEqual(outputs.signBytes);

        const { signature } = await wallet.signDirect(address, signDoc);
        const txRaw = TxRaw.fromPartial({
          bodyBytes: fromHex(inputs.bodyBytes),
          authInfoBytes: fromHex(inputs.authInfoBytes),
          signatures: [fromBase64(signature.signature)],
        });
        const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
        const txBytesHex = toHex(txRawBytes);
        expect(txBytesHex).toEqual(outputs.signedTxBytes);
      }),
    );
  });
});

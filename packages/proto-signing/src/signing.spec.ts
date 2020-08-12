/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32, fromBase64, fromHex, toHex } from "@cosmjs/encoding";
import { Secp256k1Wallet } from "@cosmjs/launchpad";

import { omitDefaults } from "./adr27";
import { cosmos } from "./generated/codecimpl";
import { defaultRegistry } from "./msgs";
import { Registry, TxBodyValue } from "./registry";
import { makeSignBytes } from "./signing";

const { AuthInfo, SignDoc, Tx, TxBody } = cosmos.tx;
const { PublicKey } = cosmos.crypto;

export function pendingWithoutSimapp(): void {
  if (!process.env.SIMAPP_ENABLED) {
    return pending("Set SIMAPP_ENABLED to enable Simapp based tests");
  }
}

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

// Test vectors were generated using this command with Ethan’s custom fork of Cosmos-SDK with printf:
// simd tx bank send --sign-mode direct --chain-id simd-testing testgen cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu 1234567ucosm -b block
const testVectors = [
  {
    sequenceNumber: 0,
    signedTxBytes:
      "0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712330a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801120410c09a0c1a40692d88f681d5d69924a53668e8ecec535ca0ca170d1febfb1dd87de9959b07340427d6bba22526d6c30cc622f27dc5eb1ce04cfc0ff98716154066ec69db62e5",
    signBytes:
      "0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712330a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801120410c09a0c1a0c73696d642d74657374696e672001",
    signature:
      "692d88f681d5d69924a53668e8ecec535ca0ca170d1febfb1dd87de9959b07340427d6bba22526d6c30cc622f27dc5eb1ce04cfc0ff98716154066ec69db62e5",
  },

  {
    sequenceNumber: 1,
    signedTxBytes:
      "0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712330a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801120410c09a0c1a40811c3c7dd85b1478b15e3cc710503045559d805d2bf538e5015dbcd868a440a94c7fc0b12b755a838cc3f9b8245d9f926e0432d07ee97557cff7c50c73f64a58",
    signBytes:
      "0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712330a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801120410c09a0c1a0c73696d642d74657374696e6720012801",
    signature:
      "811c3c7dd85b1478b15e3cc710503045559d805d2bf538e5015dbcd868a440a94c7fc0b12b755a838cc3f9b8245d9f926e0432d07ee97557cff7c50c73f64a58",
  },

  {
    sequenceNumber: 2,
    signedTxBytes:
      "0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712330a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801120410c09a0c1a405e2e11567c181db4f38788ff6d417b1f7d147f3d6bd8274989bf181c35b3fb97218f64172030dd5a84dd38933765609d70771cbba60168d8ded611f14ec4fb12",
    signBytes:
      "0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712330a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801120410c09a0c1a0c73696d642d74657374696e6720012802",
    signature:
      "5e2e11567c181db4f38788ff6d417b1f7d147f3d6bd8274989bf181c35b3fb97218f64172030dd5a84dd38933765609d70771cbba60168d8ded611f14ec4fb12",
  },
];

describe("signing demo", () => {
  const chainId = "simd-testing";
  const toAddress = Uint8Array.from({ length: 20 }, (_, i) => i + 1);

  const sendAmount = "1234567";
  const sendDenom = "ucosm";
  const gasLimit = 200000;

  it("correctly parses test vectors", async () => {
    const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();

    testVectors.forEach(({ signedTxBytes }) => {
      const parsedTestTx = Tx.decode(fromHex(signedTxBytes));
      expect(parsedTestTx.signatures.length).toEqual(1);
      expect(parsedTestTx.authInfo?.signerInfos?.length).toEqual(1);
      expect(parsedTestTx.authInfo?.signerInfos![0].publicKey!.secp256k1).toEqual(pubkeyBytes);
      expect(parsedTestTx.authInfo?.signerInfos![0].modeInfo!.single!.mode).toEqual(
        cosmos.tx.signing.SignMode.SIGN_MODE_DIRECT,
      );
      expect(parsedTestTx.authInfo?.fee!.amount).toEqual([]);
      expect(parsedTestTx.authInfo?.fee!.gasLimit!.toString()).toEqual(gasLimit.toString());
      expect(parsedTestTx.body?.extensionOptions).toEqual([]);
      expect(parsedTestTx.body?.nonCriticalExtensionOptions).toEqual([]);
      expect(parsedTestTx.body!.messages!.length).toEqual(1);

      const parsedTestTxMsg = defaultRegistry.decode({
        typeUrl: parsedTestTx.body!.messages![0].type_url!,
        value: parsedTestTx.body!.messages![0].value!,
      });
      expect(parsedTestTxMsg.from_address).toEqual(Bech32.decode(address).data);
      expect(parsedTestTxMsg.to_address).toEqual(toAddress);
      expect(parsedTestTxMsg.amount.length).toEqual(1);
      expect(parsedTestTxMsg.amount[0].denom).toEqual(sendDenom);
      expect(parsedTestTxMsg.amount[0].amount).toEqual(sendAmount);
    });
  });

  it("correctly generates test vectors", async () => {
    const myRegistry = new Registry();
    const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
    const publicKey = PublicKey.create({
      secp256k1: pubkeyBytes,
    });

    const txBodyFields: TxBodyValue = {
      messages: [
        {
          typeUrl: "/cosmos.bank.MsgSend",
          value: {
            fromAddress: Bech32.decode(address).data,
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
      typeUrl: "/cosmos.tx.TxBody",
      value: txBodyFields,
    });
    const txBody = TxBody.decode(txBodyBytes);

    const authInfo = {
      signerInfos: [
        {
          publicKey: publicKey,
          modeInfo: {
            single: {
              mode: cosmos.tx.signing.SignMode.SIGN_MODE_DIRECT,
            },
          },
        },
      ],
      fee: {
        gasLimit: gasLimit,
      },
    };
    const authInfoBytes = Uint8Array.from(AuthInfo.encode(authInfo).finish());
    const accountNumber = 1;

    await Promise.all(
      testVectors.map(async ({ sequenceNumber, signBytes, signedTxBytes }) => {
        const signDoc = SignDoc.create(
          omitDefaults({
            bodyBytes: txBodyBytes,
            authInfoBytes: authInfoBytes,
            chainId: chainId,
            accountNumber: accountNumber,
            accountSequence: sequenceNumber,
          }),
        );
        const signDocBytes = makeSignBytes(signDoc);
        expect(toHex(signDocBytes)).toEqual(signBytes);

        const signature = await wallet.sign(address, signDocBytes);
        const txRaw = Tx.create({
          body: txBody,
          authInfo: authInfo,
          signatures: [fromBase64(signature.signature)],
        });
        const txRawBytes = Uint8Array.from(Tx.encode(txRaw).finish());
        const txBytesHex = toHex(txRawBytes);
        expect(txBytesHex).toEqual(signedTxBytes);
      }),
    );
  });
});

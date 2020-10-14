/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, fromHex, toHex } from "@cosmjs/encoding";

import { cosmos, google } from "./codec";
import { DirectSecp256k1Wallet } from "./directsecp256k1wallet";
import { defaultRegistry } from "./msgs";
import { Registry, TxBodyValue } from "./registry";
import { makeAuthInfo, makeSignBytes } from "./signing";

const { Tx, TxRaw } = cosmos.tx.v1beta1;
const { PubKey } = cosmos.crypto.secp256k1;
const { Any } = google.protobuf;

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

const testVectors = [
  {
    sequence: 0,
    signedTxBytes:
      "0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712650a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a02080112130a0d0a0575636f736d12043230303010c09a0c1a40c9dd20e07464d3a688ff4b710b1fbc027e495e797cfa0b4804da2ed117959227772de059808f765aa29b8f92edf30f4c2c5a438e30d3fe6897daa7141e3ce6f9",
    signBytes:
      "0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712650a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a02080112130a0d0a0575636f736d12043230303010c09a0c1a0c73696d642d74657374696e672001",
    signature:
      "c9dd20e07464d3a688ff4b710b1fbc027e495e797cfa0b4804da2ed117959227772de059808f765aa29b8f92edf30f4c2c5a438e30d3fe6897daa7141e3ce6f9",
  },
  {
    sequence: 1,
    signedTxBytes:
      "0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712670a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801180112130a0d0a0575636f736d12043230303010c09a0c1a40525adc7e61565a509c60497b798c549fbf217bb5cd31b24cc9b419d098cc95330c99ecc4bc72448f85c365a4e3f91299a3d40412fb3751bab82f1940a83a0a4c",
    signBytes:
      "0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712670a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801180112130a0d0a0575636f736d12043230303010c09a0c1a0c73696d642d74657374696e672001",
    signature:
      "525adc7e61565a509c60497b798c549fbf217bb5cd31b24cc9b419d098cc95330c99ecc4bc72448f85c365a4e3f91299a3d40412fb3751bab82f1940a83a0a4c",
  },
  {
    sequence: 2,
    signedTxBytes:
      "0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712670a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801180212130a0d0a0575636f736d12043230303010c09a0c1a40f3f2ca73806f2abbf6e0fe85f9b8af66f0e9f7f79051fdb8abe5bb8633b17da132e82d577b9d5f7a6dae57a144efc9ccc6eef15167b44b3b22a57240109762af",
    signBytes:
      "0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712670a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a020801180212130a0d0a0575636f736d12043230303010c09a0c1a0c73696d642d74657374696e672001",
    signature:
      "f3f2ca73806f2abbf6e0fe85f9b8af66f0e9f7f79051fdb8abe5bb8633b17da132e82d577b9d5f7a6dae57a144efc9ccc6eef15167b44b3b22a57240109762af",
  },
];

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
    const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
    const prefixedPubkeyBytes = Uint8Array.from([0x0a, pubkeyBytes.length, ...pubkeyBytes]);

    testVectors.forEach(({ signedTxBytes }) => {
      const parsedTestTx = Tx.decode(fromHex(signedTxBytes));
      expect(parsedTestTx.signatures.length).toEqual(1);
      expect(parsedTestTx.authInfo!.signerInfos!.length).toEqual(1);
      expect(Uint8Array.from(parsedTestTx.authInfo!.signerInfos![0].publicKey!.value ?? [])).toEqual(
        prefixedPubkeyBytes,
      );
      expect(parsedTestTx.authInfo?.signerInfos![0].modeInfo!.single!.mode).toEqual(
        cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
      );
      expect({ ...parsedTestTx.authInfo!.fee!.amount![0] }).toEqual({ denom: "ucosm", amount: "2000" });
      expect(parsedTestTx.authInfo!.fee!.gasLimit!.toString()).toEqual(gasLimit.toString());
      expect(parsedTestTx.body!.extensionOptions).toEqual([]);
      expect(parsedTestTx.body!.nonCriticalExtensionOptions).toEqual([]);
      expect(parsedTestTx.body!.messages!.length).toEqual(1);

      const parsedTestTxMsg = defaultRegistry.decode({
        typeUrl: parsedTestTx.body!.messages![0].type_url!,
        value: parsedTestTx.body!.messages![0].value!,
      });
      expect(parsedTestTxMsg.from_address).toEqual(address);
      expect(parsedTestTxMsg.to_address).toEqual(toAddress);
      expect(parsedTestTxMsg.amount.length).toEqual(1);
      expect(parsedTestTxMsg.amount[0].denom).toEqual(sendDenom);
      expect(parsedTestTxMsg.amount[0].amount).toEqual(sendAmount);
    });
  });

  it("correctly generates test vectors", async () => {
    const myRegistry = new Registry();
    const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
    const publicKey = PubKey.create({
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

    const publicKeyAny = Any.create({ type_url: "/cosmos.crypto.secp256k1.PubKey", value: publicKeyBytes });
    const accountNumber = 1;

    await Promise.all(
      testVectors.map(async ({ sequence, signBytes, signedTxBytes }) => {
        const authInfoBytes = makeAuthInfo([publicKeyAny], feeAmount, gasLimit, sequence);
        const signDocBytes = makeSignBytes(txBodyBytes, authInfoBytes, chainId, accountNumber);
        expect(toHex(signDocBytes)).toEqual(signBytes);

        const signature = await wallet.sign(address, signDocBytes);
        const txRaw = TxRaw.create({
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

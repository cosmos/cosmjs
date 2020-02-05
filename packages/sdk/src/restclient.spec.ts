/* eslint-disable @typescript-eslint/camelcase */
import { ChainId, PrehashType, SignableBytes } from "@iov/bcp";
import { Encoding } from "@iov/encoding";
import { HdPaths, Secp256k1HdWallet } from "@iov/keycontrol";

import { encodeSecp256k1Signature, makeSignBytes, marshalTx } from "./encoding";
import { leb128Encode } from "./leb128.spec";
import { Log, parseLogs } from "./logs";
import { RestClient } from "./restclient";
import contract from "./testdata/contract.json";
import cosmoshub from "./testdata/cosmoshub.json";
import {
  Coin,
  Msg,
  MsgInstantiateContract,
  MsgSend,
  MsgStoreCode,
  StdFee,
  StdSignature,
  StdTx,
} from "./types";

const { fromBase64, toBase64 } = Encoding;

const httpUrl = "http://localhost:1317";
const defaultNetworkId = "testing";
const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
const faucetPath = HdPaths.cosmos(0);
const faucetAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";
const emptyAddress = "cosmos1ltkhnmdcqemmd2tkhnx7qx66tq7e0wykw2j85k";

function pendingWithoutCosmos(): void {
  if (!process.env.COSMOS_ENABLED) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
}

function parseSuccess(rawLog?: string): readonly Log[] {
  if (!rawLog) throw new Error("Log missing");
  return parseLogs(JSON.parse(rawLog));
}

function makeSignedTx(firstMsg: Msg, fee: StdFee, memo: string, firstSignature: StdSignature): StdTx {
  return {
    msg: [firstMsg],
    fee: fee,
    memo: memo,
    signatures: [firstSignature],
  };
}

function getRandomizedContract(): Uint8Array {
  const data = fromBase64(contract.data);
  // The return value of the export function cosmwasm_api_0_6 is unused and
  // can be randomized for testing.
  //
  // Find position of mutable bytes as follows:
  // $ wasm-objdump -d contract.wasm | grep -F "cosmwasm_api_0_6" -A 1
  // 00e67c func[149] <cosmwasm_api_0_6>:
  // 00e67d: 41 83 0c                   | i32.const 1539
  //
  // In the last line, the addresses 00e67d-00e67f hold a one byte instruction
  // (https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#constants-described-here)
  // and a two byte value (leb128 encoded 1539)

  // Any unsigned integer from 128 to 16383 is encoded to two leb128 bytes
  const min = 128;
  const max = 16383;
  const random = Math.floor(Math.random() * (max - min)) + min;
  const bytes = leb128Encode(random);

  data[0x00e67d + 1] = bytes[0];
  data[0x00e67d + 2] = bytes[1];

  return data;
}

describe("RestClient", () => {
  it("can be constructed", () => {
    const client = new RestClient(httpUrl);
    expect(client).toBeTruthy();
  });

  describe("nodeInfo", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = new RestClient(httpUrl);
      const info = await client.nodeInfo();
      expect(info.node_info.network).toEqual(defaultNetworkId);
    });
  });

  describe("authAccounts", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = new RestClient(httpUrl);
      const { result } = await client.authAccounts(faucetAddress);
      const account = result.value;
      expect(account.account_number).toEqual(4);
      expect(account.sequence).toBeGreaterThanOrEqual(0);
    });
  });

  describe("encodeTx", () => {
    it("works for cosmoshub example", async () => {
      pendingWithoutCosmos();
      const tx = cosmoshub.tx.value;
      const client = new RestClient(httpUrl);
      expect(await client.encodeTx(tx)).toEqual(fromBase64(cosmoshub.tx_data));
    });
  });

  describe("post", () => {
    it("can send tokens", async () => {
      pendingWithoutCosmos();
      const wallet = Secp256k1HdWallet.fromMnemonic(faucetMnemonic);
      const signer = await wallet.createIdentity("abc" as ChainId, faucetPath);

      const memo = "My first contract on chain";
      const theMsg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: faucetAddress,
          to_address: emptyAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const client = new RestClient(httpUrl);
      const account = (await client.authAccounts(faucetAddress)).result.value;

      const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account) as SignableBytes;
      const rawSignature = await wallet.createTransactionSignature(signer, signBytes, PrehashType.Sha256);
      const signature = encodeSecp256k1Signature(signer.pubkey.data, rawSignature);
      const signedTx = makeSignedTx(theMsg, fee, memo, signature);
      const result = await client.postTx(marshalTx(signedTx));
      // console.log("Raw log:", result.raw_log);
      expect(result.code).toBeFalsy();
    });

    it("can upload and instantiate wasm", async () => {
      pendingWithoutCosmos();
      const wallet = Secp256k1HdWallet.fromMnemonic(faucetMnemonic);
      const signer = await wallet.createIdentity("abc" as ChainId, faucetPath);
      const client = new RestClient(httpUrl);

      let codeId: number;

      // upload
      {
        const memo = "My first contract on chain";
        const theMsg: MsgStoreCode = {
          type: "wasm/store-code",
          value: {
            sender: faucetAddress,
            wasm_byte_code: toBase64(getRandomizedContract()),
            source: "https://github.com/confio/cosmwasm/raw/0.7/lib/vm/testdata/contract_0.6.wasm",
            builder: "cosmwasm-opt:0.6.2",
          },
        };
        const fee: StdFee = {
          amount: [
            {
              amount: "5000000",
              denom: "ucosm",
            },
          ],
          gas: "89000000",
        };

        const account = (await client.authAccounts(faucetAddress)).result.value;
        const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account) as SignableBytes;
        const rawSignature = await wallet.createTransactionSignature(signer, signBytes, PrehashType.Sha256);
        const signature = encodeSecp256k1Signature(signer.pubkey.data, rawSignature);
        const signedTx = makeSignedTx(theMsg, fee, memo, signature);
        const result = await client.postTx(marshalTx(signedTx));
        // console.log("Raw log:", result.raw_log);
        expect(result.code).toBeFalsy();
        const [firstLog] = parseSuccess(result.raw_log);
        const codeIdAttr = firstLog.events
          .find(event => event.type === "message")
          ?.attributes.find(attr => attr.key === "code_id");
        if (!codeIdAttr) throw new Error("Could not find code_id attribute");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);
      }

      let contractAddress: string;

      // instantiate
      {
        const memo = "Create an escrow instance";
        const transferAmount: readonly Coin[] = [
          {
            amount: "1234",
            denom: "ucosm",
          },
          {
            amount: "321",
            denom: "ustake",
          },
        ];
        const theMsg: MsgInstantiateContract = {
          type: "wasm/instantiate",
          value: {
            sender: faucetAddress,
            code_id: codeId.toString(),
            init_msg: {
              verifier: "cosmos1ltkhnmdcqemmd2tkhnx7qx66tq7e0wykw2j85k",
              beneficiary: "cosmos1ltkhnmdcqemmd2tkhnx7qx66tq7e0wykw2j85k",
            },
            init_funds: transferAmount,
          },
        };
        const fee: StdFee = {
          amount: [
            {
              amount: "5000000",
              denom: "ucosm",
            },
          ],
          gas: "89000000",
        };

        const account = (await client.authAccounts(faucetAddress)).result.value;
        const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account) as SignableBytes;
        const rawSignature = await wallet.createTransactionSignature(signer, signBytes, PrehashType.Sha256);
        const signature = encodeSecp256k1Signature(signer.pubkey.data, rawSignature);
        const signedTx = makeSignedTx(theMsg, fee, memo, signature);
        const result = await client.postTx(marshalTx(signedTx));
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.raw_log);
        const [firstLog] = parseSuccess(result.raw_log);

        const amountAttr = firstLog.events
          .find(event => event.type === "transfer")
          ?.attributes.find(attr => attr.key === "amount");
        if (!amountAttr) throw new Error("Could not find amount attribute");
        expect(amountAttr.value).toEqual("1234ucosm,321ustake");

        const contractAddressAttr = firstLog.events
          .find(event => event.type === "message")
          ?.attributes.find(attr => attr.key === "contract_address");
        if (!contractAddressAttr) throw new Error("Could not find contract_address attribute");
        contractAddress = contractAddressAttr.value;

        const balance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(balance).toEqual(transferAmount);
      }
    });
  });
});

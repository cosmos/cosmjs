/* eslint-disable @typescript-eslint/camelcase */
import { ChainId, PrehashType, SignableBytes } from "@iov/bcp";
import { Encoding } from "@iov/encoding";
import { HdPaths, Secp256k1HdWallet } from "@iov/keycontrol";

import { encodeSecp256k1Signature, makeSignBytes, marshalTx } from "./encoding";
import { Log, parseLogs } from "./logs";
import { RestClient } from "./restclient";
import contract from "./testdata/contract.json";
import data from "./testdata/cosmoshub.json";
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

const { fromBase64 } = Encoding;

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
      const tx: StdTx = data.tx.value;
      const client = new RestClient(httpUrl);
      expect(await client.encodeTx(tx)).toEqual(fromBase64(data.tx_data));
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

      // upload
      {
        const memo = "My first contract on chain";
        const theMsg: MsgStoreCode = {
          type: "wasm/store-code",
          value: {
            sender: faucetAddress,
            wasm_byte_code: contract.data,
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
        const codeIdAttr = firstLog.events[0].attributes.find(attr => attr.key === "code_id");
        expect(codeIdAttr).toEqual({ key: "code_id", value: "1" });
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
            code_id: "1",
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
        const contractAddressAttr = firstLog.events[0].attributes.find(
          attr => attr.key === "contract_address",
        );
        if (!contractAddressAttr) throw new Error("Could not find contract_address attribute");
        contractAddress = contractAddressAttr.value || "";

        const balance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(balance).toEqual(transferAmount);
      }
    });
  });
});

/* eslint-disable @typescript-eslint/camelcase */
import { ChainId, Identity, PrehashType, SignableBytes } from "@iov/bcp";
import { Random } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import { HdPaths, Secp256k1HdWallet } from "@iov/keycontrol";

import { encodeSecp256k1Signature, makeSignBytes, marshalTx } from "./encoding";
import { leb128Encode } from "./leb128.spec";
import { Attribute, Log, parseLogs } from "./logs";
import { PostTxsResponse, RestClient } from "./restclient";
import contract from "./testdata/contract.json";
import cosmoshub from "./testdata/cosmoshub.json";
import {
  Coin,
  Msg,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgSend,
  MsgStoreCode,
  StdFee,
  StdSignature,
  StdTx,
} from "./types";

const { fromBase64, fromHex, toAscii, toBase64, toHex } = Encoding;

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

function makeRandomAddress(): string {
  return Bech32.encode("cosmos", Random.getBytes(20));
}

/** Throws if the attribute was not found */
function findAttribute(logs: readonly Log[], eventType: "message" | "transfer", attrKey: string): Attribute {
  const firstLogs = logs.find(() => true);
  const out = firstLogs?.events
    .find(event => event.type === eventType)
    ?.attributes.find(attr => attr.key === attrKey);
  if (!out) {
    throw new Error(
      `Could not find attribute '${attrKey}' in first event of type '${eventType}' in first log.`,
    );
  }
  return out;
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

    async function uploadContract(
      client: RestClient,
      wallet: Secp256k1HdWallet,
      signer: Identity,
    ): Promise<PostTxsResponse> {
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
      return client.postTx(marshalTx(signedTx));
    }

    async function instantiateContract(
      client: RestClient,
      wallet: Secp256k1HdWallet,
      signer: Identity,
      codeId: number,
      beneficiaryAddress: string,
      transferAmount: readonly Coin[],
    ): Promise<PostTxsResponse> {
      const memo = "Create an escrow instance";
      const theMsg: MsgInstantiateContract = {
        type: "wasm/instantiate",
        value: {
          sender: faucetAddress,
          code_id: codeId.toString(),
          init_msg: {
            verifier: faucetAddress,
            beneficiary: beneficiaryAddress,
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
      return client.postTx(marshalTx(signedTx));
    }

    async function executeContract(
      client: RestClient,
      wallet: Secp256k1HdWallet,
      signer: Identity,
      contractAddress: string,
    ): Promise<PostTxsResponse> {
      const memo = "Time for action";
      const theMsg: MsgExecuteContract = {
        type: "wasm/execute",
        value: {
          sender: faucetAddress,
          contract: contractAddress,
          msg: {},
          sent_funds: [],
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
      return client.postTx(marshalTx(signedTx));
    }

    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutCosmos();
      const wallet = Secp256k1HdWallet.fromMnemonic(faucetMnemonic);
      const signer = await wallet.createIdentity("abc" as ChainId, faucetPath);
      const client = new RestClient(httpUrl);

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
      const beneficiaryAddress = makeRandomAddress();

      let codeId: number;

      // upload
      {
        // console.log("Raw log:", result.raw_log);
        const result = await uploadContract(client, wallet, signer);
        expect(result.code).toBeFalsy();
        const logs = parseSuccess(result.raw_log);
        const codeIdAttr = findAttribute(logs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);
      }

      let contractAddress: string;

      // instantiate
      {
        const result = await instantiateContract(
          client,
          wallet,
          signer,
          codeId,
          beneficiaryAddress,
          transferAmount,
        );
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.raw_log);
        const logs = parseSuccess(result.raw_log);
        const contractAddressAttr = findAttribute(logs, "message", "contract_address");
        contractAddress = contractAddressAttr.value;
        const amountAttr = findAttribute(logs, "transfer", "amount");
        expect(amountAttr.value).toEqual("1234ucosm,321ustake");

        const balance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(balance).toEqual(transferAmount);
      }

      // execute
      {
        const result = await executeContract(client, wallet, signer, contractAddress);
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.raw_log);
        const [firstLog] = parseSuccess(result.raw_log);
        expect(firstLog.log).toEqual(`released funds to ${beneficiaryAddress}`);

        // Verify token transfer from contract to beneficiary
        const beneficiaryBalance = (await client.authAccounts(beneficiaryAddress)).result.value.coins;
        expect(beneficiaryBalance).toEqual(transferAmount);
        const contractBalance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(contractBalance).toEqual([]);
      }
    }, 10_000);

    it("can list code and query details", async () => {
      pendingWithoutCosmos();
      const wallet = Secp256k1HdWallet.fromMnemonic(faucetMnemonic);
      const signer = await wallet.createIdentity("abc" as ChainId, faucetPath);
      const client = new RestClient(httpUrl);

      const existingInfos = await client.listCodeInfo();
      existingInfos.forEach((val, idx) => expect(val.id).toEqual(idx + 1));
      const numExisting = existingInfos.length;

      const result = await uploadContract(client, wallet, signer);
      expect(result.code).toBeFalsy();
      const logs = parseSuccess(result.raw_log);
      const codeIdAttr = findAttribute(logs, "message", "code_id");
      const codeId = Number.parseInt(codeIdAttr.value, 10);

      const newInfos = await client.listCodeInfo();
      expect(newInfos.length).toEqual(numExisting + 1);
      const lastInfo = newInfos[newInfos.length - 1];
      expect(lastInfo.id).toEqual(codeId);
      expect(lastInfo.creator).toEqual(faucetAddress);

      // TODO: check code hash matches expectation
      // expect(lastInfo.code_hash).toEqual(faucetAddress);

      // TODO: download code and check against auto-gen
    });

    it("can list contracts and get info", async () => {
      pendingWithoutCosmos();
      const wallet = Secp256k1HdWallet.fromMnemonic(faucetMnemonic);
      const signer = await wallet.createIdentity("abc" as ChainId, faucetPath);
      const client = new RestClient(httpUrl);
      const beneficiaryAddress = makeRandomAddress();
      const transferAmount: readonly Coin[] = [
        {
          amount: "707707",
          denom: "ucosm",
        },
      ];

      // reuse an existing contract, or upload if needed
      let codeId: number;
      const existingInfos = await client.listCodeInfo();
      if (existingInfos.length > 0) {
        codeId = existingInfos[existingInfos.length - 1].id;
      } else {
        const uploaded = await uploadContract(client, wallet, signer);
        expect(uploaded.code).toBeFalsy();
        const uploadLogs = parseSuccess(uploaded.raw_log);
        const codeIdAttr = findAttribute(uploadLogs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
      }

      // create new instance and compare before and after
      const existingContracts = await client.listContractAddresses();

      const result = await instantiateContract(
        client,
        wallet,
        signer,
        codeId,
        beneficiaryAddress,
        transferAmount,
      );
      expect(result.code).toBeFalsy();
      const logs = parseSuccess(result.raw_log);
      const contractAddressAttr = findAttribute(logs, "message", "contract_address");
      const myAddress = contractAddressAttr.value;

      // ensure we were added to the list
      const newContracts = await client.listContractAddresses();
      expect(newContracts.length).toEqual(existingContracts.length + 1);
      // note: we are NOT guaranteed to be added to the end
      const diff = newContracts.filter(x => !existingContracts.includes(x));
      expect(diff.length).toEqual(1);
      const lastContract = diff[0];
      expect(lastContract).toEqual(myAddress);

      // check out info
      const myInfo = await client.getContractInfo(myAddress);
      expect(myInfo.code_id).toEqual(codeId);
      expect(myInfo.creator).toEqual(faucetAddress);
      expect((myInfo.init_msg as any).beneficiary).toEqual(beneficiaryAddress);

      // make sure random addresses don't give useful info
      client
        .getContractInfo(beneficiaryAddress)
        .then(() => fail("this shouldn't succeed"))
        .catch(() => {});
    });

    it("can list query contract state", async () => {
      pendingWithoutCosmos();
      const client = new RestClient(httpUrl);
      const noContract = makeRandomAddress();

      // find an existing contract (created above)
      // we assume all contracts on this chain are the same (created by these tests)
      const contractInfos = await client.listContractAddresses();
      expect(contractInfos.length).toBeGreaterThan(0);
      const contractAddress = contractInfos[0];

      // get contract state
      const expectedKey = toAscii("config");
      const state = await client.getAllContractState(contractAddress);
      expect(state.length).toEqual(1);
      const data = state[0];
      expect(data.key.toLowerCase()).toEqual(toHex(expectedKey));

      // bad address is empty array
      const noContractState = await client.getAllContractState(noContract);
      expect(noContractState).toEqual([]);

      // query by one key
      const model = await client.queryContractRaw(contractAddress, expectedKey);
      expect(model).not.toBeNull();
      expect(model).toEqual(data.val);

      // missing key is null
      const missing = await client.queryContractRaw(contractAddress, fromHex("cafe0dad"));
      expect(missing).toBeNull();

      // bad address is null
      const noContractModel = await client.queryContractRaw(noContract, expectedKey);
      expect(noContractModel).toBeNull();
    });
  });
});

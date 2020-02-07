/* eslint-disable @typescript-eslint/camelcase */
import { Random } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";

import { encodeSecp256k1Signature, makeSignBytes, marshalTx } from "./encoding";
import { leb128Encode } from "./leb128.spec";
import { findAttribute, parseLogs } from "./logs";
import { Pen, Secp256k1Pen } from "./pen";
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
const faucetAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";
const emptyAddress = "cosmos1ltkhnmdcqemmd2tkhnx7qx66tq7e0wykw2j85k";

function pendingWithoutCosmos(): void {
  if (!process.env.COSMOS_ENABLED) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
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

async function uploadContract(client: RestClient, pen: Pen): Promise<PostTxsResponse> {
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
  const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account);
  const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(marshalTx(signedTx));
}

async function instantiateContract(
  client: RestClient,
  pen: Pen,
  codeId: number,
  beneficiaryAddress: string,
  transferAmount?: readonly Coin[],
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
      init_funds: transferAmount || [],
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
  const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account);
  const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(marshalTx(signedTx));
}

async function executeContract(
  client: RestClient,
  pen: Pen,
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
  const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account);
  const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(marshalTx(signedTx));
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
      const pen = await Secp256k1Pen.fromMnemonic(faucetMnemonic);

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

      const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account);
      const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
      const signedTx = makeSignedTx(theMsg, fee, memo, signature);
      const result = await client.postTx(marshalTx(signedTx));
      // console.log("Raw log:", result.raw_log);
      expect(result.code).toBeFalsy();
    });

    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucetMnemonic);
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
        const result = await uploadContract(client, pen);
        expect(result.code).toBeFalsy();
        const logs = parseLogs(result.logs);
        const codeIdAttr = findAttribute(logs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);
      }

      let contractAddress: string;

      // instantiate
      {
        const result = await instantiateContract(client, pen, codeId, beneficiaryAddress, transferAmount);
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.raw_log);
        const logs = parseLogs(result.logs);
        const contractAddressAttr = findAttribute(logs, "message", "contract_address");
        contractAddress = contractAddressAttr.value;
        const amountAttr = findAttribute(logs, "transfer", "amount");
        expect(amountAttr.value).toEqual("1234ucosm,321ustake");

        const balance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(balance).toEqual(transferAmount);
      }

      // execute
      {
        const result = await executeContract(client, pen, contractAddress);
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.raw_log);
        const [firstLog] = parseLogs(result.logs);
        expect(firstLog.log).toEqual(`released funds to ${beneficiaryAddress}`);

        // Verify token transfer from contract to beneficiary
        const beneficiaryBalance = (await client.authAccounts(beneficiaryAddress)).result.value.coins;
        expect(beneficiaryBalance).toEqual(transferAmount);
        const contractBalance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(contractBalance).toEqual([]);
      }
    });
  });

  describe("query", () => {
    it("can list upload code", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucetMnemonic);
      const client = new RestClient(httpUrl);

      // check with contracts were here first to compare
      const existingInfos = await client.listCodeInfo();
      existingInfos.forEach((val, idx) => expect(val.id).toEqual(idx + 1));
      const numExisting = existingInfos.length;

      // upload data
      const result = await uploadContract(client, pen);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
      const codeIdAttr = findAttribute(logs, "message", "code_id");
      const codeId = Number.parseInt(codeIdAttr.value, 10);

      // ensure we were added to the end of the list
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
      const pen = await Secp256k1Pen.fromMnemonic(faucetMnemonic);
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
        const uploadResult = await uploadContract(client, pen);
        expect(uploadResult.code).toBeFalsy();
        const uploadLogs = parseLogs(uploadResult.logs);
        const codeIdAttr = findAttribute(uploadLogs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
      }

      // create new instance and compare before and after
      const existingContracts = await client.listContractAddresses();

      const result = await instantiateContract(client, pen, codeId, beneficiaryAddress, transferAmount);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
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
      await client
        .getContractInfo(beneficiaryAddress)
        .then(() => fail("this shouldn't succeed"))
        .catch(error => expect(error).toMatch(`No contract with address ${beneficiaryAddress}`));
    });

    describe("contract state", () => {
      const client = new RestClient(httpUrl);
      const noContract = makeRandomAddress();
      const expectedKey = toAscii("config");

      /**
       * Finds the most recent contract (created above)
       *
       * We assume the tests above ran, all instantiate the same contract and no other process squeezed in a different contract.
       */
      async function getContractAddress(): Promise<string> {
        const contracts = Array.from(await client.listContractAddresses());
        const last = contracts.reverse().find(() => true);
        if (!last) throw new Error("No contract found");
        return last;
      }

      it("can get all state", async () => {
        pendingWithoutCosmos();
        const contractAddress = await getContractAddress();

        // get contract state
        const state = await client.getAllContractState(contractAddress);
        expect(state.length).toEqual(1);
        const data = state[0];
        expect(data.key.toLowerCase()).toEqual(toHex(expectedKey));
        expect((data.val as any).verifier).toBeDefined();
        expect((data.val as any).beneficiary).toBeDefined();

        // bad address is empty array
        const noContractState = await client.getAllContractState(noContract);
        expect(noContractState).toEqual([]);
      });

      it("can query by key", async () => {
        pendingWithoutCosmos();
        const contractAddress = await getContractAddress();

        // query by one key
        const model = await client.queryContractRaw(contractAddress, expectedKey);
        expect(model).not.toBeNull();
        expect((model as any).verifier).toBeDefined();
        expect((model as any).beneficiary).toBeDefined();

        // missing key is null
        const missing = await client.queryContractRaw(contractAddress, fromHex("cafe0dad"));
        expect(missing).toBeNull();

        // bad address is null
        const noContractModel = await client.queryContractRaw(noContract, expectedKey);
        expect(noContractModel).toBeNull();
      });

      it("can make smart queries", async () => {
        pendingWithoutCosmos();
        const contractAddress = await getContractAddress();

        // we can query the verifier properly
        const verifier = await client.queryContractSmart(contractAddress, { verifier: {} });
        expect(verifier).toEqual(faucetAddress);

        // invalid query syntax throws an error
        await client.queryContractSmart(contractAddress, { nosuchkey: {} }).then(
          () => fail("shouldn't succeed"),
          error => expect(error).toBeTruthy(),
        );
        // TODO: debug rest server. I expect a 'Parse Error', but get
        // Request failed with status code 500 to match 'Parse Error:'

        // invalid address throws an error
        await client.queryContractSmart(noContract, { verifier: {} }).then(
          () => fail("shouldn't succeed"),
          error => expect(error).toBeTruthy(),
        );
        // TODO: debug rest server. I expect a 'not found', but get
        // Request failed with status code 500 to match 'Parse Error:'
      });
    });
  });
});

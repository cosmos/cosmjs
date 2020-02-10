/* eslint-disable @typescript-eslint/camelcase */
import { Random, Sha256 } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import { assert } from "@iov/utils";

import { encodeSecp256k1Signature, makeSignBytes, marshalTx } from "./encoding";
import { leb128Encode } from "./leb128.spec";
import { findAttribute, parseLogs } from "./logs";
import { Pen, Secp256k1Pen } from "./pen";
import { encodeBech32Pubkey } from "./pubkey";
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

const { fromAscii, fromBase64, fromHex, toAscii, toBase64, toHex } = Encoding;

const httpUrl = "http://localhost:1317";
const defaultNetworkId = "testing";
const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};
const emptyAddress = "cosmos1ltkhnmdcqemmd2tkhnx7qx66tq7e0wykw2j85k";
const unusedAccount = {
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
};

function cosmosEnabled(): boolean {
  return !!process.env.COSMOS_ENABLED;
}

function pendingWithoutCosmos(): void {
  if (!cosmosEnabled()) {
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

async function uploadCustomContract(
  client: RestClient,
  pen: Pen,
  wasmCode: Uint8Array,
): Promise<PostTxsResponse> {
  const memo = "My first contract on chain";
  const theMsg: MsgStoreCode = {
    type: "wasm/store-code",
    value: {
      sender: faucet.address,
      wasm_byte_code: toBase64(wasmCode),
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

  const account = (await client.authAccounts(faucet.address)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account);
  const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(marshalTx(signedTx));
}

async function uploadContract(client: RestClient, pen: Pen): Promise<PostTxsResponse> {
  return uploadCustomContract(client, pen, getRandomizedContract());
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
      sender: faucet.address,
      code_id: codeId.toString(),
      init_msg: {
        verifier: faucet.address,
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

  const account = (await client.authAccounts(faucet.address)).result.value;
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
      sender: faucet.address,
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

  const account = (await client.authAccounts(faucet.address)).result.value;
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
    it("works for unused account without pubkey", async () => {
      pendingWithoutCosmos();
      const client = new RestClient(httpUrl);
      const { result } = await client.authAccounts(unusedAccount.address);
      expect(result).toEqual({
        type: "cosmos-sdk/Account",
        value: {
          address: unusedAccount.address,
          public_key: "", // not known to the chain
          coins: [
            {
              amount: "1000000000",
              denom: "ucosm",
            },
            {
              amount: "1000000000",
              denom: "ustake",
            },
          ],
          account_number: 5,
          sequence: 0,
        },
      });
    });

    // This fails in the first test run if you forget to run `./scripts/cosm/init.sh`
    it("has correct pubkey for faucet", async () => {
      pendingWithoutCosmos();
      const client = new RestClient(httpUrl);
      const { result } = await client.authAccounts(faucet.address);
      expect(result.value).toEqual(
        jasmine.objectContaining({
          public_key: encodeBech32Pubkey(faucet.pubkey, "cosmospub"),
        }),
      );
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
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);

      const memo = "My first contract on chain";
      const theMsg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: faucet.address,
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
      const account = (await client.authAccounts(faucet.address)).result.value;

      const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account);
      const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
      const signedTx = makeSignedTx(theMsg, fee, memo, signature);
      const result = await client.postTx(marshalTx(signedTx));
      // console.log("Raw log:", result.raw_log);
      expect(result.code).toBeFalsy();
    });

    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
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
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new RestClient(httpUrl);

      // check with contracts were here first to compare
      const existingInfos = await client.listCodeInfo();
      existingInfos.forEach((val, idx) => expect(val.id).toEqual(idx + 1));
      const numExisting = existingInfos.length;

      // upload data
      const wasmCode = getRandomizedContract();
      const result = await uploadCustomContract(client, pen, wasmCode);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
      const codeIdAttr = findAttribute(logs, "message", "code_id");
      const codeId = Number.parseInt(codeIdAttr.value, 10);

      // ensure we were added to the end of the list
      const newInfos = await client.listCodeInfo();
      expect(newInfos.length).toEqual(numExisting + 1);
      const lastInfo = newInfos[newInfos.length - 1];
      expect(lastInfo.id).toEqual(codeId);
      expect(lastInfo.creator).toEqual(faucet.address);

      // ensure metadata is present
      expect(lastInfo.source).toEqual(
        "https://github.com/confio/cosmwasm/raw/0.7/lib/vm/testdata/contract_0.6.wasm",
      );
      expect(lastInfo.builder).toEqual("cosmwasm-opt:0.6.2");

      // check code hash matches expectation
      const wasmHash = new Sha256(wasmCode).digest();
      expect(lastInfo.code_hash.toLowerCase()).toEqual(toHex(wasmHash));

      // download code and check against auto-gen
      const download = await client.getCode(codeId);
      expect(download).toEqual(wasmCode);
    });

    it("can list contracts and get info", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
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
      const existingContractsByCode = await client.listContractsByCodeId(codeId);
      existingContractsByCode.forEach(ctc => expect(ctc.code_id).toEqual(codeId));

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

      // also by codeID list
      const newContractsByCode = await client.listContractsByCodeId(codeId);
      newContractsByCode.forEach(ctc => expect(ctc.code_id).toEqual(codeId));
      expect(newContractsByCode.length).toEqual(existingContractsByCode.length + 1);

      // check out info
      const myInfo = await client.getContractInfo(myAddress);
      expect(myInfo.code_id).toEqual(codeId);
      expect(myInfo.creator).toEqual(faucet.address);
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
      let contractAddress: string | undefined;

      beforeAll(async () => {
        if (cosmosEnabled()) {
          const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
          const uploadResult = await uploadContract(client, pen);
          assert(!uploadResult.code);
          const uploadLogs = parseLogs(uploadResult.logs);
          const codeId = Number.parseInt(findAttribute(uploadLogs, "message", "code_id").value, 10);
          const instantiateResult = await instantiateContract(client, pen, codeId, makeRandomAddress());
          assert(!instantiateResult.code);
          const instantiateLogs = parseLogs(instantiateResult.logs);
          const contractAddressAttr = findAttribute(instantiateLogs, "message", "contract_address");
          contractAddress = contractAddressAttr.value;
        }
      });

      it("can get all state", async () => {
        pendingWithoutCosmos();

        // get contract state
        const state = await client.getAllContractState(contractAddress!);
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

        // query by one key
        const model = await client.queryContractRaw(contractAddress!, expectedKey);
        expect(model).not.toBeNull();
        expect((model as any).verifier).toBeDefined();
        expect((model as any).beneficiary).toBeDefined();

        // missing key is null
        const missing = await client.queryContractRaw(contractAddress!, fromHex("cafe0dad"));
        expect(missing).toBeNull();

        // bad address is null
        const noContractModel = await client.queryContractRaw(noContract, expectedKey);
        expect(noContractModel).toBeNull();
      });

      it("can make smart queries", async () => {
        pendingWithoutCosmos();

        // we can query the verifier properly
        const verifier = await client.queryContractSmart(contractAddress!, { verifier: {} });
        expect(fromAscii(verifier)).toEqual(faucet.address);

        // invalid query syntax throws an error
        await client.queryContractSmart(contractAddress!, { nosuchkey: {} }).then(
          () => fail("shouldn't succeed"),
          error => expect(error).toMatch("Error parsing QueryMsg"),
        );

        // invalid address throws an error
        await client.queryContractSmart(noContract, { verifier: {} }).then(
          () => fail("shouldn't succeed"),
          error => expect(error).toMatch("not found"),
        );
      });
    });
  });
});

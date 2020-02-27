/* eslint-disable @typescript-eslint/camelcase */
import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";
import { assert, sleep } from "@iov/utils";
import { ReadonlyDate } from "readonly-date";

import { makeSignBytes } from "./encoding";
import { findAttribute, parseLogs } from "./logs";
import { Pen, Secp256k1Pen } from "./pen";
import { encodeBech32Pubkey } from "./pubkey";
import { PostTxsResponse, RestClient, TxsResponse } from "./restclient";
import { SigningCosmWasmClient } from "./signingcosmwasmclient";
import cosmoshub from "./testdata/cosmoshub.json";
import {
  getRandomizedHackatom,
  makeRandomAddress,
  pendingWithoutWasmd,
  tendermintAddressMatcher,
  tendermintIdMatcher,
  tendermintOptionalIdMatcher,
  wasmdEnabled,
} from "./testutils.spec";
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

function makeSignedTx(firstMsg: Msg, fee: StdFee, memo: string, firstSignature: StdSignature): StdTx {
  return {
    msg: [firstMsg],
    fee: fee,
    memo: memo,
    signatures: [firstSignature],
  };
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

  const { account_number, sequence } = (await client.authAccounts(faucet.address)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
}

async function uploadContract(client: RestClient, pen: Pen): Promise<PostTxsResponse> {
  return uploadCustomContract(client, pen, getRandomizedHackatom());
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
      label: "my escrow",
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

  const { account_number, sequence } = (await client.authAccounts(faucet.address)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
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

  const { account_number, sequence } = (await client.authAccounts(faucet.address)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
}

describe("RestClient", () => {
  it("can be constructed", () => {
    const client = new RestClient(httpUrl);
    expect(client).toBeTruthy();
  });

  // The /auth endpoints

  describe("authAccounts", () => {
    it("works for unused account without pubkey", async () => {
      pendingWithoutWasmd();
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

    // This fails in the first test run if you forget to run `./scripts/wasmd/init.sh`
    it("has correct pubkey for faucet", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(httpUrl);
      const { result } = await client.authAccounts(faucet.address);
      expect(result.value).toEqual(
        jasmine.objectContaining({
          public_key: encodeBech32Pubkey(faucet.pubkey, "cosmospub"),
        }),
      );
    });

    // This property is used by CosmWasmClient.getAccount
    it("returns empty address for non-existent account", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(httpUrl);
      const nonExistentAccount = makeRandomAddress();
      const { result } = await client.authAccounts(nonExistentAccount);
      expect(result).toEqual({
        type: "cosmos-sdk/Account",
        value: jasmine.objectContaining({ address: "" }),
      });
    });
  });

  // The /blocks endpoints

  describe("blocksLatest", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(httpUrl);
      const response = await client.blocksLatest();

      // id
      expect(response.block_id.hash).toMatch(tendermintIdMatcher);

      // header
      expect(response.block.header.version).toEqual({ block: "10", app: "0" });
      expect(parseInt(response.block.header.height, 10)).toBeGreaterThanOrEqual(1);
      expect(response.block.header.chain_id).toEqual(defaultNetworkId);
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );
      expect(response.block.header.last_commit_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_block_id.hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.data_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.next_validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.consensus_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.app_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_results_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.evidence_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.proposer_address).toMatch(tendermintAddressMatcher);

      // data
      expect(response.block.data.txs === null || Array.isArray(response.block.data.txs)).toEqual(true);
    });
  });

  describe("blocks", () => {
    it("works for block by height", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(httpUrl);
      const height = parseInt((await client.blocksLatest()).block.header.height, 10);
      const response = await client.blocks(height - 1);

      // id
      expect(response.block_id.hash).toMatch(tendermintIdMatcher);

      // header
      expect(response.block.header.version).toEqual({ block: "10", app: "0" });
      expect(response.block.header.height).toEqual(`${height - 1}`);
      expect(response.block.header.chain_id).toEqual(defaultNetworkId);
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );
      expect(response.block.header.last_commit_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_block_id.hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.data_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.next_validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.consensus_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.app_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_results_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.evidence_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.proposer_address).toMatch(tendermintAddressMatcher);

      // data
      expect(response.block.data.txs === null || Array.isArray(response.block.data.txs)).toEqual(true);
    });
  });

  // The /node_info endpoint

  describe("nodeInfo", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(httpUrl);
      const info = await client.nodeInfo();
      expect(info.node_info.network).toEqual(defaultNetworkId);
    });
  });

  // The /txs endpoints

  describe("txsQuery", () => {
    let posted:
      | {
          readonly sender: string;
          readonly recipient: string;
          readonly hash: string;
          readonly height: number;
          readonly tx: TxsResponse;
        }
      | undefined;

    beforeAll(async () => {
      if (wasmdEnabled()) {
        const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
        const client = new SigningCosmWasmClient(httpUrl, faucet.address, signBytes => pen.sign(signBytes));

        const recipient = makeRandomAddress();
        const transferAmount = [
          {
            denom: "ucosm",
            amount: "1234567",
          },
        ];
        const result = await client.sendTokens(recipient, transferAmount);

        await sleep(50); // wait until tx is indexed
        const txDetails = await new RestClient(httpUrl).txsById(result.transactionHash);
        posted = {
          sender: faucet.address,
          recipient: recipient,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails,
        };
      }
    });

    it("can query transactions by height", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(httpUrl);
      const result = await client.txsQuery(`tx.height=${posted.height}&limit=26`);
      expect(parseInt(result.count, 10)).toEqual(1);
      expect(parseInt(result.limit, 10)).toEqual(26);
      expect(parseInt(result.page_number, 10)).toEqual(1);
      expect(parseInt(result.page_total, 10)).toEqual(1);
      expect(parseInt(result.total_count, 10)).toEqual(1);
      expect(result.txs).toEqual([posted.tx]);
    });

    it("can query transactions by ID", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(httpUrl);
      const result = await client.txsQuery(`tx.hash=${posted.hash}&limit=26`);
      expect(parseInt(result.count, 10)).toEqual(1);
      expect(parseInt(result.limit, 10)).toEqual(26);
      expect(parseInt(result.page_number, 10)).toEqual(1);
      expect(parseInt(result.page_total, 10)).toEqual(1);
      expect(parseInt(result.total_count, 10)).toEqual(1);
      expect(result.txs).toEqual([posted.tx]);
    });

    it("can query transactions by sender", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(httpUrl);
      const result = await client.txsQuery(`message.sender=${posted.sender}&limit=200`);
      expect(parseInt(result.count, 10)).toBeGreaterThanOrEqual(1);
      expect(parseInt(result.limit, 10)).toEqual(200);
      expect(parseInt(result.page_number, 10)).toEqual(1);
      expect(parseInt(result.page_total, 10)).toEqual(1);
      expect(parseInt(result.total_count, 10)).toBeGreaterThanOrEqual(1);
      expect(result.txs.length).toBeGreaterThanOrEqual(1);
      expect(result.txs[result.txs.length - 1]).toEqual(posted.tx);
    });

    it("can query transactions by recipient", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(httpUrl);
      const result = await client.txsQuery(`transfer.recipient=${posted.recipient}&limit=200`);
      expect(parseInt(result.count, 10)).toEqual(1);
      expect(parseInt(result.limit, 10)).toEqual(200);
      expect(parseInt(result.page_number, 10)).toEqual(1);
      expect(parseInt(result.page_total, 10)).toEqual(1);
      expect(parseInt(result.total_count, 10)).toEqual(1);
      expect(result.txs.length).toBeGreaterThanOrEqual(1);
      expect(result.txs[result.txs.length - 1]).toEqual(posted.tx);
    });

    it("can filter by tx.hash and tx.minheight", async () => {
      pending("This combination is broken 🤷‍♂️. Handle client-side at higher level.");
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(httpUrl);
      const hashQuery = `tx.hash=${posted.hash}`;

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=0`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=${posted.height - 1}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=${posted.height}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=${posted.height + 1}`);
        expect(count).toEqual("0");
      }
    });

    it("can filter by recipient and tx.minheight", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(httpUrl);
      const recipientQuery = `transfer.recipient=${posted.recipient}`;

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=0`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=${posted.height - 1}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=${posted.height}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=${posted.height + 1}`);
        expect(count).toEqual("0");
      }
    });

    it("can filter by recipient and tx.maxheight", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(httpUrl);
      const recipientQuery = `transfer.recipient=${posted.recipient}`;

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=9999999999999`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=${posted.height + 1}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=${posted.height}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=${posted.height - 1}`);
        expect(count).toEqual("0");
      }
    });
  });

  describe("encodeTx", () => {
    it("works for cosmoshub example", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(httpUrl);
      expect(await client.encodeTx(cosmoshub.tx)).toEqual(fromBase64(cosmoshub.tx_data));
    });
  });

  describe("postTx", () => {
    it("can send tokens", async () => {
      pendingWithoutWasmd();
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
      const { account_number, sequence } = (await client.authAccounts(faucet.address)).result.value;

      const signBytes = makeSignBytes([theMsg], fee, defaultNetworkId, memo, account_number, sequence);
      const signature = await pen.sign(signBytes);
      const signedTx = makeSignedTx(theMsg, fee, memo, signature);
      const result = await client.postTx(signedTx);
      // console.log("Raw log:", result.raw_log);
      expect(result.code).toBeFalsy();
    });

    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutWasmd();
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

  // The /wasm endpoints

  describe("query", () => {
    it("can list upload code", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new RestClient(httpUrl);

      // check with contracts were here first to compare
      const existingInfos = await client.listCodeInfo();
      existingInfos.forEach((val, idx) => expect(val.id).toEqual(idx + 1));
      const numExisting = existingInfos.length;

      // upload data
      const wasmCode = getRandomizedHackatom();
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
      pendingWithoutWasmd();
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
      const existingContractsByCode = await client.listContractsByCodeId(codeId);
      existingContractsByCode.forEach(ctc => expect(ctc.code_id).toEqual(codeId));

      const result = await instantiateContract(client, pen, codeId, beneficiaryAddress, transferAmount);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
      const contractAddressAttr = findAttribute(logs, "message", "contract_address");
      const myAddress = contractAddressAttr.value;

      const newContractsByCode = await client.listContractsByCodeId(codeId);
      newContractsByCode.forEach(ctc => expect(ctc.code_id).toEqual(codeId));
      expect(newContractsByCode.length).toEqual(existingContractsByCode.length + 1);

      // check out info
      const myInfo = await client.getContractInfo(myAddress);
      expect(myInfo.code_id).toEqual(codeId);
      expect(myInfo.creator).toEqual(faucet.address);
      expect((myInfo.init_msg as any).beneficiary).toEqual(beneficiaryAddress);

      // make sure random addresses don't give useful info
      const nonExistentAddress = makeRandomAddress();
      await client
        .getContractInfo(nonExistentAddress)
        .then(() => fail("this shouldn't succeed"))
        .catch(error => expect(error).toMatch(`No contract found at address "${nonExistentAddress}"`));
    });

    describe("contract state", () => {
      const client = new RestClient(httpUrl);
      const noContract = makeRandomAddress();
      const expectedKey = toAscii("config");
      let contractAddress: string | undefined;

      beforeAll(async () => {
        if (wasmdEnabled()) {
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
        pendingWithoutWasmd();

        // get contract state
        const state = await client.getAllContractState(contractAddress!);
        expect(state.length).toEqual(1);
        const data = state[0];
        expect(data.key).toEqual(expectedKey);
        const value = JSON.parse(fromAscii(data.val));
        expect(value.verifier).toBeDefined();
        expect(value.beneficiary).toBeDefined();

        // bad address is empty array
        const noContractState = await client.getAllContractState(noContract);
        expect(noContractState).toEqual([]);
      });

      it("can query by key", async () => {
        pendingWithoutWasmd();

        // query by one key
        const raw = await client.queryContractRaw(contractAddress!, expectedKey);
        assert(raw, "must get result");
        const model = JSON.parse(fromAscii(raw));
        expect(model.verifier).toBeDefined();
        expect(model.beneficiary).toBeDefined();

        // missing key is null
        const missing = await client.queryContractRaw(contractAddress!, fromHex("cafe0dad"));
        expect(missing).toBeNull();

        // bad address is null
        const noContractModel = await client.queryContractRaw(noContract, expectedKey);
        expect(noContractModel).toBeNull();
      });

      it("can make smart queries", async () => {
        pendingWithoutWasmd();

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

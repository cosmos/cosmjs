/* eslint-disable @typescript-eslint/camelcase */
import { Sha256 } from "@cosmjs/crypto";
import { Bech32, fromAscii, fromBase64, fromHex, toAscii, toBase64, toHex } from "@cosmjs/encoding";
import {
  Coin,
  coin,
  coins,
  makeSignBytes,
  Msg,
  Pen,
  PostTxsResponse,
  Secp256k1Pen,
  StdFee,
  StdSignature,
  StdTx,
} from "@cosmjs/sdk38";
import { assert } from "@cosmjs/utils";

import { findAttribute, parseLogs } from "./logs";
import {
  isMsgInstantiateContract,
  isMsgStoreCode,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
} from "./msgs";
import { RestClient } from "./restclient";
import {
  alice,
  bech32AddressMatcher,
  ContractUploadInstructions,
  deployedErc20,
  fromOneElementArray,
  getHackatom,
  makeRandomAddress,
  pendingWithoutWasmd,
  wasmd,
  wasmdEnabled,
} from "./testutils.spec";

function makeSignedTx(firstMsg: Msg, fee: StdFee, memo: string, firstSignature: StdSignature): StdTx {
  return {
    msg: [firstMsg],
    fee: fee,
    memo: memo,
    signatures: [firstSignature],
  };
}

async function uploadContract(
  client: RestClient,
  pen: Pen,
  contract: ContractUploadInstructions,
): Promise<PostTxsResponse> {
  const memo = "My first contract on chain";
  const theMsg: MsgStoreCode = {
    type: "wasm/store-code",
    value: {
      sender: alice.address0,
      wasm_byte_code: toBase64(contract.data),
      source: contract.source || "",
      builder: contract.builder || "",
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

  const { account_number, sequence } = (await client.authAccounts(alice.address0)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
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
      sender: alice.address0,
      code_id: codeId.toString(),
      label: "my escrow",
      init_msg: {
        verifier: alice.address0,
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

  const { account_number, sequence } = (await client.authAccounts(alice.address0)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
}

async function executeContract(
  client: RestClient,
  pen: Pen,
  contractAddress: string,
  msg: object,
): Promise<PostTxsResponse> {
  const memo = "Time for action";
  const theMsg: MsgExecuteContract = {
    type: "wasm/execute",
    value: {
      sender: alice.address0,
      contract: contractAddress,
      msg: msg,
      sent_funds: [],
    },
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const { account_number, sequence } = (await client.authAccounts(alice.address0)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
}

describe("RestClient", () => {
  it("can be constructed", () => {
    const client = new RestClient(wasmd.endpoint);
    expect(client).toBeTruthy();
  });

  describe("txsQuery", () => {
    it("can query by tags (module + code_id)", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);
      const result = await client.txsQuery(`message.module=wasm&message.code_id=${deployedErc20.codeId}`);
      expect(parseInt(result.count, 10)).toBeGreaterThanOrEqual(4);

      // Check first 4 results
      const [store, hash, isa, jade] = result.txs.map((tx) => fromOneElementArray(tx.tx.value.msg));
      assert(isMsgStoreCode(store));
      assert(isMsgInstantiateContract(hash));
      assert(isMsgInstantiateContract(isa));
      assert(isMsgInstantiateContract(jade));
      expect(store.value).toEqual(
        jasmine.objectContaining({
          sender: alice.address0,
          source: deployedErc20.source,
          builder: deployedErc20.builder,
        }),
      );
      expect(hash.value).toEqual({
        code_id: deployedErc20.codeId.toString(),
        init_funds: [],
        init_msg: jasmine.objectContaining({
          symbol: "HASH",
        }),
        label: "HASH",
        sender: alice.address0,
      });
      expect(isa.value).toEqual({
        code_id: deployedErc20.codeId.toString(),
        init_funds: [],
        init_msg: jasmine.objectContaining({ symbol: "ISA" }),
        label: "ISA",
        sender: alice.address0,
      });
      expect(jade.value).toEqual({
        code_id: deployedErc20.codeId.toString(),
        init_funds: [],
        init_msg: jasmine.objectContaining({ symbol: "JADE" }),
        label: "JADE",
        sender: alice.address0,
        admin: alice.address1,
      });
    });

    // Like previous test but filtered by message.action=store-code and message.action=instantiate
    it("can query by tags (module + code_id + action)", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);

      {
        const uploads = await client.txsQuery(
          `message.module=wasm&message.code_id=${deployedErc20.codeId}&message.action=store-code`,
        );
        expect(parseInt(uploads.count, 10)).toEqual(1);
        const store = fromOneElementArray(uploads.txs[0].tx.value.msg);
        assert(isMsgStoreCode(store));
        expect(store.value).toEqual(
          jasmine.objectContaining({
            sender: alice.address0,
            source: deployedErc20.source,
            builder: deployedErc20.builder,
          }),
        );
      }

      {
        const instantiations = await client.txsQuery(
          `message.module=wasm&message.code_id=${deployedErc20.codeId}&message.action=instantiate`,
        );
        expect(parseInt(instantiations.count, 10)).toBeGreaterThanOrEqual(3);
        const [hash, isa, jade] = instantiations.txs.map((tx) => fromOneElementArray(tx.tx.value.msg));
        assert(isMsgInstantiateContract(hash));
        assert(isMsgInstantiateContract(isa));
        assert(isMsgInstantiateContract(jade));
        expect(hash.value).toEqual({
          code_id: deployedErc20.codeId.toString(),
          init_funds: [],
          init_msg: jasmine.objectContaining({
            symbol: "HASH",
          }),
          label: "HASH",
          sender: alice.address0,
        });
        expect(isa.value).toEqual({
          code_id: deployedErc20.codeId.toString(),
          init_funds: [],
          init_msg: jasmine.objectContaining({ symbol: "ISA" }),
          label: "ISA",
          sender: alice.address0,
        });
        expect(jade.value).toEqual({
          code_id: deployedErc20.codeId.toString(),
          init_funds: [],
          init_msg: jasmine.objectContaining({ symbol: "JADE" }),
          label: "JADE",
          sender: alice.address0,
          admin: alice.address1,
        });
      }
    });
  });

  describe("postTx", () => {
    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
      const client = new RestClient(wasmd.endpoint);

      const transferAmount = [coin(1234, "ucosm"), coin(321, "ustake")];
      const beneficiaryAddress = makeRandomAddress();

      let codeId: number;

      // upload
      {
        // console.log("Raw log:", result.raw_log);
        const result = await uploadContract(client, pen, getHackatom());
        expect(result.code).toBeFalsy();
        const logs = parseLogs(result.logs);
        const codeIdAttr = findAttribute(logs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);
        expect(result.data).toEqual(toHex(toAscii(`${codeId}`)).toUpperCase());
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
        expect(result.data).toEqual(toHex(Bech32.decode(contractAddress).data).toUpperCase());

        const balance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(balance).toEqual(transferAmount);
      }

      // execute
      {
        const result = await executeContract(client, pen, contractAddress, { release: {} });
        expect(result.data).toEqual("F00BAA");
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.logs);
        const logs = parseLogs(result.logs);
        const wasmEvent = logs.find(() => true)?.events.find((e) => e.type === "wasm");
        assert(wasmEvent, "Event of type wasm expected");
        expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
        expect(wasmEvent.attributes).toContain({
          key: "destination",
          value: beneficiaryAddress,
        });

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
      const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
      const client = new RestClient(wasmd.endpoint);

      // check with contracts were here first to compare
      const existingInfos = await client.listCodeInfo();
      existingInfos.forEach((val, idx) => expect(val.id).toEqual(idx + 1));
      const numExisting = existingInfos.length;

      // upload data
      const hackatom = getHackatom();
      const result = await uploadContract(client, pen, hackatom);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
      const codeIdAttr = findAttribute(logs, "message", "code_id");
      const codeId = Number.parseInt(codeIdAttr.value, 10);

      // ensure we were added to the end of the list
      const newInfos = await client.listCodeInfo();
      expect(newInfos.length).toEqual(numExisting + 1);
      const lastInfo = newInfos[newInfos.length - 1];
      expect(lastInfo.id).toEqual(codeId);
      expect(lastInfo.creator).toEqual(alice.address0);

      // ensure metadata is present
      expect(lastInfo.source).toEqual(hackatom.source);
      expect(lastInfo.builder).toEqual(hackatom.builder);

      // check code hash matches expectation
      const wasmHash = new Sha256(hackatom.data).digest();
      expect(lastInfo.data_hash.toLowerCase()).toEqual(toHex(wasmHash));

      // download code and check against auto-gen
      const { data } = await client.getCode(codeId);
      expect(fromBase64(data)).toEqual(hackatom.data);
    });

    it("can list contracts and get info", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
      const client = new RestClient(wasmd.endpoint);
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
        const uploadResult = await uploadContract(client, pen, getHackatom());
        expect(uploadResult.code).toBeFalsy();
        const uploadLogs = parseLogs(uploadResult.logs);
        const codeIdAttr = findAttribute(uploadLogs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
      }

      // create new instance and compare before and after
      const existingContractsByCode = await client.listContractsByCodeId(codeId);
      for (const contract of existingContractsByCode) {
        expect(contract.address).toMatch(bech32AddressMatcher);
        expect(contract.code_id).toEqual(codeId);
        expect(contract.creator).toMatch(bech32AddressMatcher);
        expect(contract.label).toMatch(/^.+$/);
      }

      const result = await instantiateContract(client, pen, codeId, beneficiaryAddress, transferAmount);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
      const contractAddressAttr = findAttribute(logs, "message", "contract_address");
      const myAddress = contractAddressAttr.value;

      const newContractsByCode = await client.listContractsByCodeId(codeId);
      expect(newContractsByCode.length).toEqual(existingContractsByCode.length + 1);
      const newContract = newContractsByCode[newContractsByCode.length - 1];
      expect(newContract).toEqual(
        jasmine.objectContaining({
          code_id: codeId,
          creator: alice.address0,
          label: "my escrow",
        }),
      );

      // check out info
      const myInfo = await client.getContractInfo(myAddress);
      assert(myInfo);
      expect(myInfo).toEqual(
        jasmine.objectContaining({
          code_id: codeId,
          creator: alice.address0,
          init_msg: jasmine.objectContaining({
            beneficiary: beneficiaryAddress,
          }),
        }),
      );
      expect(myInfo.admin).toBeUndefined();

      // make sure random addresses don't give useful info
      const nonExistentAddress = makeRandomAddress();
      expect(await client.getContractInfo(nonExistentAddress)).toBeNull();
    });

    describe("contract state", () => {
      const client = new RestClient(wasmd.endpoint);
      const noContract = makeRandomAddress();
      const expectedKey = toAscii("config");
      let contractAddress: string | undefined;

      beforeAll(async () => {
        if (wasmdEnabled()) {
          const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
          const uploadResult = await uploadContract(client, pen, getHackatom());
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
        const resultDocument = await client.queryContractSmart(contractAddress!, { verifier: {} });
        expect(resultDocument).toEqual({ verifier: alice.address0 });

        // invalid query syntax throws an error
        await client.queryContractSmart(contractAddress!, { nosuchkey: {} }).then(
          () => fail("shouldn't succeed"),
          (error) =>
            expect(error).toMatch(/query wasm contract failed: parsing hackatom::contract::QueryMsg/),
        );

        // invalid address throws an error
        await client.queryContractSmart(noContract, { verifier: {} }).then(
          () => fail("shouldn't succeed"),
          (error) => expect(error).toMatch("not found"),
        );
      });
    });
  });
});

/* eslint-disable @typescript-eslint/naming-convention */
import { Sha256 } from "@cosmjs/crypto";
import { Bech32, fromAscii, fromHex, fromUtf8, toAscii, toBase64, toHex } from "@cosmjs/encoding";
import {
  assertIsBroadcastTxSuccess,
  AuthExtension,
  BroadcastTxResult,
  BroadcastTxsResponse,
  Coin,
  coin,
  coins,
  LcdClient,
  makeSignDoc,
  makeStdTx,
  OfflineSigner,
  Secp256k1HdWallet,
  setupAuthExtension,
  SigningCosmosClient,
  StdFee,
} from "@cosmjs/launchpad";
import { assert } from "@cosmjs/utils";

import { findAttribute, parseLogs } from "../logs";
import {
  isMsgInstantiateContract,
  isMsgStoreCode,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
} from "../msgs";
import {
  alice,
  base64Matcher,
  bech32AddressMatcher,
  ContractUploadInstructions,
  deployedErc20,
  fromOneElementArray,
  getHackatom,
  makeRandomAddress,
  pendingWithoutWasmd,
  wasmd,
  wasmdEnabled,
} from "../testutils.spec";
import { setupWasmExtension, WasmExtension } from "./wasm";

type WasmClient = LcdClient & AuthExtension & WasmExtension;

function makeWasmClient(apiUrl: string): WasmClient {
  return LcdClient.withExtensions({ apiUrl }, setupAuthExtension, setupWasmExtension);
}

async function uploadContract(
  signer: OfflineSigner,
  contract: ContractUploadInstructions,
): Promise<BroadcastTxResult> {
  const memo = "My first contract on chain";
  const theMsg: MsgStoreCode = {
    type: "wasm/MsgStoreCode",
    value: {
      sender: alice.address0,
      wasm_byte_code: toBase64(contract.data),
      source: contract.source || "",
      builder: contract.builder || "",
    },
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const firstAddress = (await signer.getAccounts())[0].address;
  const client = new SigningCosmosClient(wasmd.endpoint, firstAddress, signer);
  return client.signAndBroadcast([theMsg], fee, memo);
}

async function instantiateContract(
  signer: OfflineSigner,
  codeId: number,
  beneficiaryAddress: string,
  transferAmount?: readonly Coin[],
): Promise<BroadcastTxResult> {
  const memo = "Create an escrow instance";
  const theMsg: MsgInstantiateContract = {
    type: "wasm/MsgInstantiateContract",
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
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const firstAddress = (await signer.getAccounts())[0].address;
  const client = new SigningCosmosClient(wasmd.endpoint, firstAddress, signer);
  return client.signAndBroadcast([theMsg], fee, memo);
}

async function executeContract(
  client: WasmClient,
  signer: OfflineSigner,
  contractAddress: string,
  msg: Record<string, unknown>,
): Promise<BroadcastTxsResponse> {
  const memo = "Time for action";
  const theMsg: MsgExecuteContract = {
    type: "wasm/MsgExecuteContract",
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

  const { account_number, sequence } = (await client.auth.account(alice.address0)).result.value;
  const signDoc = makeSignDoc([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
  const { signed, signature } = await signer.sign(alice.address0, signDoc);
  const signedTx = makeStdTx(signed, signature);
  return client.broadcastTx(signedTx);
}

describe("WasmExtension", () => {
  const hackatom = getHackatom();
  const hackatomConfigKey = toAscii("config");
  let hackatomCodeId: number | undefined;
  let hackatomContractAddress: string | undefined;

  beforeAll(async () => {
    if (wasmdEnabled()) {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const result = await uploadContract(wallet, hackatom);
      assertIsBroadcastTxSuccess(result);
      const logs = parseLogs(result.logs);
      const codeIdAttr = findAttribute(logs, "message", "code_id");
      hackatomCodeId = Number.parseInt(codeIdAttr.value, 10);

      const instantiateResult = await instantiateContract(wallet, hackatomCodeId, makeRandomAddress());
      assertIsBroadcastTxSuccess(instantiateResult);
      const instantiateLogs = parseLogs(instantiateResult.logs);
      const contractAddressAttr = findAttribute(instantiateLogs, "message", "contract_address");
      hackatomContractAddress = contractAddressAttr.value;
    }
  });

  describe("listCodeInfo", () => {
    it("has recently uploaded contract as last entry", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = makeWasmClient(wasmd.endpoint);
      const codesList = await client.wasm.listCodeInfo();
      const lastCode = codesList[codesList.length - 1];
      expect(lastCode.id).toEqual(hackatomCodeId);
      expect(lastCode.creator).toEqual(alice.address0);
      expect(lastCode.source).toEqual(hackatom.source);
      expect(lastCode.builder).toEqual(hackatom.builder);
      expect(lastCode.data_hash.toLowerCase()).toEqual(toHex(new Sha256(hackatom.data).digest()));
    });
  });

  describe("getCode", () => {
    it("contains fill code information", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = makeWasmClient(wasmd.endpoint);
      const code = await client.wasm.getCode(hackatomCodeId);
      expect(code.id).toEqual(hackatomCodeId);
      expect(code.creator).toEqual(alice.address0);
      expect(code.source).toEqual(hackatom.source);
      expect(code.builder).toEqual(hackatom.builder);
      expect(code.data_hash.toLowerCase()).toEqual(toHex(new Sha256(hackatom.data).digest()));
      expect(code.data).toEqual(toBase64(hackatom.data));
    });
  });

  // TODO: move listContractsByCodeId tests out of here
  describe("getContractInfo", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = makeWasmClient(wasmd.endpoint);
      const beneficiaryAddress = makeRandomAddress();
      const transferAmount = coins(707707, "ucosm");

      // create new instance and compare before and after
      const existingContractsByCode = await client.wasm.listContractsByCodeId(hackatomCodeId);
      for (const contract of existingContractsByCode) {
        expect(contract.address).toMatch(bech32AddressMatcher);
        expect(contract.code_id).toEqual(hackatomCodeId);
        expect(contract.creator).toMatch(bech32AddressMatcher);
        expect(contract.label).toMatch(/^.+$/);
      }

      const result = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, transferAmount);
      assertIsBroadcastTxSuccess(result);
      const logs = parseLogs(result.logs);
      const contractAddressAttr = findAttribute(logs, "message", "contract_address");
      const myAddress = contractAddressAttr.value;

      const newContractsByCode = await client.wasm.listContractsByCodeId(hackatomCodeId);
      expect(newContractsByCode.length).toEqual(existingContractsByCode.length + 1);
      const newContract = newContractsByCode[newContractsByCode.length - 1];
      expect(newContract).toEqual(
        jasmine.objectContaining({
          code_id: hackatomCodeId,
          creator: alice.address0,
          label: "my escrow",
        }),
      );

      const info = await client.wasm.getContractInfo(myAddress);
      assert(info);
      expect(info).toEqual(
        jasmine.objectContaining({
          code_id: hackatomCodeId,
          creator: alice.address0,
          label: "my escrow",
        }),
      );
      expect(info.admin).toBeUndefined();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const info = await client.wasm.getContractInfo(nonExistentAddress);
      expect(info).toBeNull();
    });
  });

  describe("getContractCodeHistory", () => {
    it("can list contract history", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = makeWasmClient(wasmd.endpoint);
      const beneficiaryAddress = makeRandomAddress();
      const transferAmount = coins(707707, "ucosm");

      // create new instance and compare before and after
      const result = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, transferAmount);
      assertIsBroadcastTxSuccess(result);
      const logs = parseLogs(result.logs);
      const contractAddressAttr = findAttribute(logs, "message", "contract_address");
      const myAddress = contractAddressAttr.value;

      const history = await client.wasm.getContractCodeHistory(myAddress);
      assert(history);
      expect(history).toContain({
        code_id: hackatomCodeId,
        operation: "Init",
        msg: {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
      });
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const history = await client.wasm.getContractCodeHistory(nonExistentAddress);
      expect(history).toBeNull();
    });
  });

  describe("getAllContractState", () => {
    it("can get all state", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = makeWasmClient(wasmd.endpoint);
      const state = await client.wasm.getAllContractState(hackatomContractAddress);
      expect(state.length).toEqual(1);
      const data = state[0];
      expect(data.key).toEqual(hackatomConfigKey);
      const value = JSON.parse(fromUtf8(data.val));
      expect(value.verifier).toMatch(base64Matcher);
      expect(value.beneficiary).toMatch(base64Matcher);
    });

    it("is empty for non-existent address", async () => {
      pendingWithoutWasmd();
      const client = makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const state = await client.wasm.getAllContractState(nonExistentAddress);
      expect(state).toEqual([]);
    });
  });

  describe("queryContractRaw", () => {
    it("can query by key", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = makeWasmClient(wasmd.endpoint);
      const raw = await client.wasm.queryContractRaw(hackatomContractAddress, hackatomConfigKey);
      assert(raw, "must get result");
      const model = JSON.parse(fromAscii(raw));
      expect(model.verifier).toMatch(base64Matcher);
      expect(model.beneficiary).toMatch(base64Matcher);
    });

    it("returns null for missing key", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = makeWasmClient(wasmd.endpoint);
      const info = await client.wasm.queryContractRaw(hackatomContractAddress, fromHex("cafe0dad"));
      expect(info).toBeNull();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutWasmd();
      const client = makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const info = await client.wasm.queryContractRaw(nonExistentAddress, hackatomConfigKey);
      expect(info).toBeNull();
    });
  });

  describe("queryContractSmart", () => {
    it("can make smart queries", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = makeWasmClient(wasmd.endpoint);
      const request = { verifier: {} };
      const response = await client.wasm.queryContractSmart(hackatomContractAddress, request);
      expect(response).toEqual({ verifier: alice.address0 });
    });

    it("throws for invalid query requests", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = makeWasmClient(wasmd.endpoint);
      const request = { nosuchkey: {} };
      await client.wasm.queryContractSmart(hackatomContractAddress, request).then(
        () => fail("shouldn't succeed"),
        (error) => expect(error).toMatch(/query wasm contract failed: parsing hackatom::contract::QueryMsg/),
      );
    });

    it("throws for non-existent address", async () => {
      pendingWithoutWasmd();
      const client = makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const request = { verifier: {} };
      await client.wasm.queryContractSmart(nonExistentAddress, request).then(
        () => fail("shouldn't succeed"),
        (error) => expect(error).toMatch("not found"),
      );
    });
  });

  describe("txsQuery", () => {
    it("can query by tags (module + code_id)", async () => {
      pendingWithoutWasmd();
      const client = makeWasmClient(wasmd.endpoint);
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
      const client = makeWasmClient(wasmd.endpoint);

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

  describe("broadcastTx", () => {
    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutWasmd();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = makeWasmClient(wasmd.endpoint);

      const transferAmount = [coin(1234, "ucosm"), coin(321, "ustake")];
      const beneficiaryAddress = makeRandomAddress();

      let codeId: number;

      // upload
      {
        // console.log("Raw log:", result.raw_log);
        const result = await uploadContract(wallet, getHackatom());
        assertIsBroadcastTxSuccess(result);
        const logs = parseLogs(result.logs);
        const codeIdAttr = findAttribute(logs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);
        expect(result.data).toEqual(toAscii(`${codeId}`));
      }

      let contractAddress: string;

      // instantiate
      {
        const result = await instantiateContract(wallet, codeId, beneficiaryAddress, transferAmount);
        assertIsBroadcastTxSuccess(result);
        // console.log("Raw log:", result.raw_log);
        const logs = parseLogs(result.logs);
        const contractAddressAttr = findAttribute(logs, "message", "contract_address");
        contractAddress = contractAddressAttr.value;
        const amountAttr = findAttribute(logs, "transfer", "amount");
        expect(amountAttr.value).toEqual("1234ucosm,321ustake");
        expect(result.data).toEqual(Bech32.decode(contractAddress).data);

        const balance = (await client.auth.account(contractAddress)).result.value.coins;
        expect(balance).toEqual(transferAmount);
      }

      // execute
      {
        const result = await executeContract(client, wallet, contractAddress, { release: {} });
        assert(!result.code);
        expect(result.data).toEqual("F00BAA");
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
        const beneficiaryBalance = (await client.auth.account(beneficiaryAddress)).result.value.coins;
        expect(beneficiaryBalance).toEqual(transferAmount);
        const contractBalance = (await client.auth.account(contractAddress)).result.value.coins;
        expect(contractBalance).toEqual([]);
      }
    });
  });
});

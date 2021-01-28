/* eslint-disable @typescript-eslint/naming-convention */
import { sha256 } from "@cosmjs/crypto";
import { fromAscii, fromHex, toAscii, toHex } from "@cosmjs/encoding";
import { Coin, coin, coins, logs, StdFee } from "@cosmjs/launchpad";
import { DirectSecp256k1HdWallet, OfflineDirectSigner, Registry } from "@cosmjs/proto-signing";
import {
  assertIsBroadcastTxSuccess,
  BroadcastTxResponse,
  parseRawLog,
  SigningStargateClient,
} from "@cosmjs/stargate";
import { assert, assertDefined } from "@cosmjs/utils";
import Long from "long";

import {
  MsgExecuteContract,
  MsgExecuteContractResponse,
  MsgInstantiateContract,
  MsgInstantiateContractResponse,
  MsgStoreCode,
  MsgStoreCodeResponse,
} from "../codec/x/wasm/internal/types/tx";
import { ContractCodeHistoryOperationType } from "../codec/x/wasm/internal/types/types";
import { SigningCosmWasmClient } from "../signingcosmwasmclient";
import {
  alice,
  base64Matcher,
  bech32AddressMatcher,
  ContractUploadInstructions,
  fromOneElementArray,
  getHackatom,
  makeRandomAddress,
  makeWasmClient,
  pendingWithoutWasmd,
  wasmd,
  wasmdEnabled,
} from "../testutils.spec";

const registry = new Registry([
  ["/cosmwasm.wasm.v1beta1.MsgExecuteContract", MsgExecuteContract],
  ["/cosmwasm.wasm.v1beta1.MsgStoreCode", MsgStoreCode],
  ["/cosmwasm.wasm.v1beta1.MsgInstantiateContract", MsgInstantiateContract],
]);

async function uploadContract(
  signer: OfflineDirectSigner,
  contract: ContractUploadInstructions,
): Promise<BroadcastTxResponse> {
  const memo = "My first contract on chain";
  const theMsg = {
    typeUrl: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
    value: MsgStoreCode.fromPartial({
      sender: alice.address0,
      wasmByteCode: contract.data,
      source: contract.source || "",
      builder: contract.builder || "",
    }),
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };
  const firstAddress = (await signer.getAccounts())[0].address;
  const client = await SigningStargateClient.connectWithSigner(wasmd.endpoint, signer, { registry });
  return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}

async function instantiateContract(
  signer: OfflineDirectSigner,
  codeId: number,
  beneficiaryAddress: string,
  transferAmount?: readonly Coin[],
): Promise<BroadcastTxResponse> {
  const memo = "Create an escrow instance";
  const theMsg = {
    typeUrl: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
    value: MsgInstantiateContract.fromPartial({
      sender: alice.address0,
      codeId: Long.fromNumber(codeId),
      label: "my escrow",
      initMsg: toAscii(
        JSON.stringify({
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        }),
      ),
      initFunds: transferAmount ? [...transferAmount] : [],
    }),
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const firstAddress = (await signer.getAccounts())[0].address;
  const client = await SigningStargateClient.connectWithSigner(wasmd.endpoint, signer, { registry });
  return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}

async function executeContract(
  signer: OfflineDirectSigner,
  contractAddress: string,
  msg: Record<string, unknown>,
): Promise<BroadcastTxResponse> {
  const memo = "Time for action";
  const theMsg = {
    typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
    value: MsgExecuteContract.fromPartial({
      sender: alice.address0,
      contract: contractAddress,
      msg: toAscii(JSON.stringify(msg)),
      sentFunds: [],
    }),
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const firstAddress = (await signer.getAccounts())[0].address;
  const client = await SigningCosmWasmClient.connectWithSigner(wasmd.endpoint, signer, { registry });
  return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}

describe("WasmExtension", () => {
  const hackatom = getHackatom();
  const hackatomConfigKey = toAscii("config");
  let hackatomCodeId: number | undefined;
  let hackatomContractAddress: string | undefined;

  beforeAll(async () => {
    if (wasmdEnabled()) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, "wasm");
      const result = await uploadContract(wallet, hackatom);
      assertIsBroadcastTxSuccess(result);
      hackatomCodeId = Number.parseInt(
        JSON.parse(result.rawLog!)[0].events[0].attributes.find(
          (attribute: any) => attribute.key === "code_id",
        ).value,
        10,
      );

      const instantiateResult = await instantiateContract(wallet, hackatomCodeId, makeRandomAddress());
      assertIsBroadcastTxSuccess(instantiateResult);
      hackatomContractAddress = JSON.parse(instantiateResult.rawLog!)[0]
        .events.find((event: any) => event.type === "message")
        .attributes.find((attribute: any) => attribute.key === "contract_address").value;
    }
  });

  describe("listCodeInfo", () => {
    it("has recently uploaded contract as last entry", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const { codeInfos } = await client.unverified.wasm.listCodeInfo();
      assert(codeInfos);
      const lastCode = codeInfos[codeInfos.length - 1];
      expect(lastCode.codeId.toNumber()).toEqual(hackatomCodeId);
      expect(lastCode.creator).toEqual(alice.address0);
      expect(lastCode.source).toEqual(hackatom.source ?? "");
      expect(lastCode.builder).toEqual(hackatom.builder ?? "");
      expect(toHex(lastCode.dataHash)).toEqual(toHex(sha256(hackatom.data)));
    });
  });

  describe("getCode", () => {
    it("contains fill code information", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const { codeInfo, data } = await client.unverified.wasm.getCode(hackatomCodeId);
      expect(codeInfo!.codeId.toNumber()).toEqual(hackatomCodeId);
      expect(codeInfo!.creator).toEqual(alice.address0);
      expect(codeInfo!.source).toEqual(hackatom.source ?? "");
      expect(codeInfo!.builder).toEqual(hackatom.builder ?? "");
      expect(toHex(codeInfo!.dataHash)).toEqual(toHex(sha256(hackatom.data)));
      expect(data).toEqual(hackatom.data);
    });
  });

  // TODO: move listContractsByCodeId tests out of here
  describe("getContractInfo", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, "wasm");
      const client = await makeWasmClient(wasmd.endpoint);
      const beneficiaryAddress = makeRandomAddress();
      const transferAmount = coins(707707, "ucosm");

      // create new instance and compare before and after
      const { contractInfos: existingContractInfos } = await client.unverified.wasm.listContractsByCodeId(
        hackatomCodeId,
      );
      assert(existingContractInfos);
      for (const { address, contractInfo } of existingContractInfos) {
        expect(address).toMatch(bech32AddressMatcher);
        expect(contractInfo.codeId!.toNumber()).toEqual(hackatomCodeId);
        expect(contractInfo.creator).toMatch(bech32AddressMatcher);
        expect(contractInfo.label).toMatch(/^.+$/);
      }

      const result = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, transferAmount);
      assertIsBroadcastTxSuccess(result);
      const myAddress = JSON.parse(result.rawLog!)[0]
        .events.find((event: any) => event.type === "message")
        .attributes!.find((attribute: any) => attribute.key === "contract_address").value;

      const { contractInfos: newContractInfos } = await client.unverified.wasm.listContractsByCodeId(
        hackatomCodeId,
      );
      assert(newContractInfos);
      expect(newContractInfos.length).toEqual(existingContractInfos.length + 1);
      const newContract = newContractInfos[newContractInfos.length - 1];
      expect({ ...newContract.contractInfo }).toEqual({
        codeId: Long.fromNumber(hackatomCodeId, true),
        creator: alice.address0,
        label: "my escrow",
      });

      const { contractInfo } = await client.unverified.wasm.getContractInfo(myAddress);
      assert(contractInfo);
      expect({ ...contractInfo }).toEqual({
        codeId: Long.fromNumber(hackatomCodeId, true),
        creator: alice.address0,
        label: "my escrow",
      });
      expect(contractInfo.admin).toEqual("");
    });

    it("rejects for non-existent address", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      await expectAsync(client.unverified.wasm.getContractInfo(nonExistentAddress)).toBeRejectedWithError(
        /not found/i,
      );
    });
  });

  describe("getContractCodeHistory", () => {
    it("can list contract history", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, "wasm");
      const client = await makeWasmClient(wasmd.endpoint);
      const beneficiaryAddress = makeRandomAddress();
      const transferAmount = coins(707707, "ucosm");

      // create new instance and compare before and after
      const result = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, transferAmount);
      assertIsBroadcastTxSuccess(result);

      const myAddress = JSON.parse(result.rawLog!)[0]
        .events.find((event: any) => event.type === "message")
        .attributes!.find((attribute: any) => attribute.key === "contract_address").value;

      const history = await client.unverified.wasm.getContractCodeHistory(myAddress);
      assert(history.entries);
      expect(history.entries).toContain(
        jasmine.objectContaining({
          codeId: Long.fromNumber(hackatomCodeId, true),
          operation: ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT,
          msg: toAscii(
            JSON.stringify({
              verifier: alice.address0,
              beneficiary: beneficiaryAddress,
            }),
          ),
        }),
      );
    });

    it("returns empty list for non-existent address", async () => {
      pendingWithoutWasmd();
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const history = await client.unverified.wasm.getContractCodeHistory(nonExistentAddress);
      expect(history.entries).toEqual([]);
    });
  });

  describe("getAllContractState", () => {
    it("can get all state", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const { models } = await client.unverified.wasm.getAllContractState(hackatomContractAddress);
      assert(models);
      expect(models.length).toEqual(1);
      const data = models[0];
      expect(data.key).toEqual(hackatomConfigKey);
      const value = JSON.parse(fromAscii(data.value!));
      expect(value.verifier).toMatch(base64Matcher);
      expect(value.beneficiary).toMatch(base64Matcher);
    });

    it("rejects for non-existent address", async () => {
      pendingWithoutWasmd();
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      await expectAsync(client.unverified.wasm.getAllContractState(nonExistentAddress)).toBeRejectedWithError(
        /not found/i,
      );
    });
  });

  describe("queryContractRaw", () => {
    it("can query by key", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const raw = await client.unverified.wasm.queryContractRaw(hackatomContractAddress, hackatomConfigKey);
      assert(raw.data, "must get result");
      const model = JSON.parse(fromAscii(raw.data));
      expect(model.verifier).toMatch(base64Matcher);
      expect(model.beneficiary).toMatch(base64Matcher);
    });

    it("returns empty object for missing key", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const response = await client.unverified.wasm.queryContractRaw(
        hackatomContractAddress,
        fromHex("cafe0dad"),
      );
      expect({ ...response }).toEqual({ data: new Uint8Array() });
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutWasmd();
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      await expectAsync(
        client.unverified.wasm.queryContractRaw(nonExistentAddress, hackatomConfigKey),
      ).toBeRejectedWithError(/not found/i);
    });
  });

  describe("queryContractSmart", () => {
    it("can make smart queries", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const request = { verifier: {} };
      const result = await client.unverified.wasm.queryContractSmart(hackatomContractAddress, request);
      expect(result).toEqual({ verifier: alice.address0 });
    });

    it("throws for invalid query requests", async () => {
      pendingWithoutWasmd();
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const request = { nosuchkey: {} };
      await expectAsync(
        client.unverified.wasm.queryContractSmart(hackatomContractAddress, request),
      ).toBeRejectedWithError(/Error parsing into type hackatom::contract::QueryMsg: unknown variant/i);
    });

    it("throws for non-existent address", async () => {
      pendingWithoutWasmd();
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const request = { verifier: {} };
      await expectAsync(
        client.unverified.wasm.queryContractSmart(nonExistentAddress, request),
      ).toBeRejectedWithError(/not found/i);
    });
  });

  describe("broadcastTx", () => {
    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await makeWasmClient(wasmd.endpoint);

      const transferAmount = [coin(1234, "ucosm"), coin(321, "ustake")];
      const beneficiaryAddress = makeRandomAddress();

      let codeId: number;

      // upload
      {
        const result = await uploadContract(wallet, getHackatom());
        assertIsBroadcastTxSuccess(result);
        const parsedLogs = logs.parseLogs(parseRawLog(result.rawLog));
        const codeIdAttr = logs.findAttribute(parsedLogs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);

        assertDefined(result.data);
        const msgData = fromOneElementArray(result.data);
        expect(msgData.msgType).toEqual("store-code");
        expect(MsgStoreCodeResponse.decode(msgData.data!)).toEqual(
          MsgStoreCodeResponse.fromPartial({ codeId: Long.fromNumber(codeId, true) }),
        );
      }

      let contractAddress: string;

      // instantiate
      {
        const result = await instantiateContract(wallet, codeId, beneficiaryAddress, transferAmount);
        assertIsBroadcastTxSuccess(result);
        const parsedLogs = logs.parseLogs(parseRawLog(result.rawLog));
        const contractAddressAttr = logs.findAttribute(parsedLogs, "message", "contract_address");
        contractAddress = contractAddressAttr.value;
        const amountAttr = logs.findAttribute(parsedLogs, "transfer", "amount");
        expect(amountAttr.value).toEqual("1234ucosm,321ustake");

        assertDefined(result.data);
        const msgData = fromOneElementArray(result.data);
        expect(msgData.msgType).toEqual("instantiate");
        expect(MsgInstantiateContractResponse.decode(msgData.data!)).toEqual(
          MsgInstantiateContractResponse.fromPartial({ address: contractAddress }),
        );

        const balanceUcosm = await client.bank.balance(contractAddress, "ucosm");
        expect(balanceUcosm).toEqual(transferAmount[0]);
        const balanceUstake = await client.bank.balance(contractAddress, "ustake");
        expect(balanceUstake).toEqual(transferAmount[1]);
      }

      // execute
      {
        const result = await executeContract(wallet, contractAddress, { release: {} });
        assertIsBroadcastTxSuccess(result);
        const parsedLogs = logs.parseLogs(parseRawLog(result.rawLog));
        const wasmEvent = parsedLogs.find(() => true)?.events.find((e) => e.type === "wasm");
        assert(wasmEvent, "Event of type wasm expected");
        expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
        expect(wasmEvent.attributes).toContain({
          key: "destination",
          value: beneficiaryAddress,
        });

        assertDefined(result.data);
        const msgData = fromOneElementArray(result.data);
        expect(msgData.msgType).toEqual("execute");
        expect(MsgExecuteContractResponse.decode(msgData.data!)).toEqual(
          MsgExecuteContractResponse.fromPartial({ data: fromHex("F00BAA") }),
        );

        // Verify token transfer from contract to beneficiary
        const beneficiaryBalanceUcosm = await client.bank.balance(beneficiaryAddress, "ucosm");
        expect(beneficiaryBalanceUcosm).toEqual(transferAmount[0]);
        const beneficiaryBalanceUstake = await client.bank.balance(beneficiaryAddress, "ustake");
        expect(beneficiaryBalanceUstake).toEqual(transferAmount[1]);
      }
    });
  });
});

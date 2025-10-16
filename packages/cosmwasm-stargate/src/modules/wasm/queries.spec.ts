import { sha256 } from "@cosmjs/crypto";
import { fromAscii, fromHex, toAscii, toHex, toUtf8 } from "@cosmjs/encoding";
import { DirectSecp256k1HdWallet, OfflineDirectSigner, Registry } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  Coin,
  coin,
  coins,
  DeliverTxResponse,
  SigningStargateClient,
  StdFee,
} from "@cosmjs/stargate";
import { assert, assertDefined } from "@cosmjs/utils";
import { MsgExecuteContract, MsgInstantiateContract, MsgStoreCode } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { AbsoluteTxPosition, ContractCodeHistoryOperationType } from "cosmjs-types/cosmwasm/wasm/v1/types";

import { findAttribute, SigningCosmWasmClient } from "../../signingcosmwasmclient";
import {
  alice,
  bech32AddressMatcher,
  ContractUploadInstructions,
  defaultSigningClientOptions,
  getHackatom,
  makeRandomAddress,
  makeWasmClient,
  wasmd,
  wasmdEnabled,
} from "../../testutils";
import {
  MsgExecuteContractEncodeObject,
  MsgInstantiateContractEncodeObject,
  MsgStoreCodeEncodeObject,
  wasmTypes,
} from "./messages";
import { JsonObject } from "./queries";

const registry = new Registry(wasmTypes);

async function uploadContract(
  signer: OfflineDirectSigner,
  contract: ContractUploadInstructions,
): Promise<DeliverTxResponse> {
  const memo = "My first contract on chain";
  const theMsg: MsgStoreCodeEncodeObject = {
    typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
    value: MsgStoreCode.fromPartial({
      sender: alice.address0,
      wasmByteCode: contract.data,
    }),
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };
  const firstAddress = (await signer.getAccounts())[0].address;
  const client = await SigningStargateClient.connectWithSigner(wasmd.endpoint, signer, {
    ...defaultSigningClientOptions,
    registry,
  });
  return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}

async function instantiateContract(
  signer: OfflineDirectSigner,
  codeId: number,
  beneficiaryAddress: string,
  funds?: readonly Coin[],
): Promise<DeliverTxResponse> {
  const memo = "Create an escrow instance";
  const theMsg: MsgInstantiateContractEncodeObject = {
    typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
    value: MsgInstantiateContract.fromPartial({
      sender: alice.address0,
      codeId: BigInt(codeId),
      label: "my escrow",
      msg: toUtf8(
        JSON.stringify({
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        }),
      ),
      funds: funds ? [...funds] : [],
    }),
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const firstAddress = (await signer.getAccounts())[0].address;
  const client = await SigningStargateClient.connectWithSigner(wasmd.endpoint, signer, {
    ...defaultSigningClientOptions,
    registry,
  });
  return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}

async function executeContract(
  signer: OfflineDirectSigner,
  contractAddress: string,
  msg: JsonObject,
): Promise<DeliverTxResponse> {
  const memo = "Time for action";
  const theMsg: MsgExecuteContractEncodeObject = {
    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
    value: MsgExecuteContract.fromPartial({
      sender: alice.address0,
      contract: contractAddress,
      msg: toUtf8(JSON.stringify(msg)),
      funds: [],
    }),
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const firstAddress = (await signer.getAccounts())[0].address;
  const client = await SigningCosmWasmClient.connectWithSigner(wasmd.endpoint, signer, {
    ...defaultSigningClientOptions,
    registry,
  });
  return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}

(wasmdEnabled ? describe : xdescribe)("WasmExtension", () => {
  const hackatom = getHackatom();
  const hackatomConfigKey = toAscii("config");
  let hackatomCodeId: number | undefined;
  let hackatomContractAddress: string | undefined;

  beforeAll(async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: wasmd.prefix });
    const result = await uploadContract(wallet, hackatom);
    assertIsDeliverTxSuccess(result);
    const codeIdFromEvents = result.events
      .find((event) => event.type === "store_code")
      ?.attributes.find((attribute) => attribute.key === "code_id")?.value;
    assertDefined(codeIdFromEvents);
    hackatomCodeId = Number.parseInt(codeIdFromEvents, 10);

    const instantiateResult = await instantiateContract(wallet, hackatomCodeId, makeRandomAddress());
    assertIsDeliverTxSuccess(instantiateResult);
    const addr = instantiateResult.events
      .find((event) => event.type === "instantiate")
      ?.attributes.find((attribute) => attribute.key === "_contract_address")?.value;
    assertDefined(addr);
    hackatomContractAddress = addr;
  });

  describe("listCodeInfo", () => {
    it("has recently uploaded contract as last entry", async () => {
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const { codeInfos } = await client.wasm.listCodeInfo();
      assert(codeInfos);
      const lastCode = codeInfos[codeInfos.length - 1];
      expect(Number(lastCode.codeId)).toEqual(hackatomCodeId);
      expect(lastCode.creator).toEqual(alice.address0);
      expect(toHex(lastCode.dataHash)).toEqual(toHex(sha256(hackatom.data)));
    });
  });

  describe("getCode", () => {
    it("contains fill code information", async () => {
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const { codeInfo, data } = await client.wasm.getCode(hackatomCodeId);
      assert(codeInfo);
      expect(Number(codeInfo.codeId)).toEqual(hackatomCodeId);
      expect(codeInfo.creator).toEqual(alice.address0);
      expect(toHex(codeInfo.dataHash)).toEqual(toHex(sha256(hackatom.data)));
      expect(data).toEqual(hackatom.data);
    });
  });

  // TODO: move listContractsByCodeId tests out of here
  describe("getContractInfo", () => {
    it("works", async () => {
      assert(hackatomCodeId);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: wasmd.prefix });
      const client = await makeWasmClient(wasmd.endpoint);

      // create new instance and compare before and after
      const { contracts: existingContracts } = await client.wasm.listContractsByCodeId(hackatomCodeId);
      assert(existingContracts);
      for (const address of existingContracts) {
        expect(address).toMatch(bech32AddressMatcher);
      }

      const beneficiaryAddress = makeRandomAddress();
      const funds = coins(707707, "ucosm");
      const instantiateResult = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, funds);
      assertIsDeliverTxSuccess(instantiateResult);
      const myAddress = instantiateResult.events
        .find((event) => event.type === "instantiate")
        ?.attributes.find((attribute) => attribute.key === "_contract_address")?.value;
      assertDefined(myAddress);

      const { contracts: newContracts } = await client.wasm.listContractsByCodeId(hackatomCodeId);
      assert(newContracts);
      expect(newContracts.length).toEqual(existingContracts.length + 1);
      const newContract = newContracts[newContracts.length - 1];
      expect(newContract).toMatch(bech32AddressMatcher);

      const { contractInfo } = await client.wasm.getContractInfo(myAddress);
      assert(contractInfo);
      expect(contractInfo).toEqual(
        jasmine.objectContaining({
          codeId: BigInt(hackatomCodeId),
          creator: alice.address0,
          label: "my escrow",
          admin: "",
          ibcPortId: "",
          created: AbsoluteTxPosition.fromPartial({
            blockHeight: BigInt(instantiateResult.height),
            txIndex: BigInt(0),
          }),
          extension: undefined,
        }),
      );
      expect(contractInfo.admin).toEqual("");
    });

    it("rejects for non-existent address", async () => {
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      await expectAsync(client.wasm.getContractInfo(nonExistentAddress)).toBeRejectedWithError(
        /no such contract/i,
      );
    });
  });

  describe("getContractCodeHistory", () => {
    it("can list contract history", async () => {
      assert(hackatomCodeId);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: wasmd.prefix });
      const client = await makeWasmClient(wasmd.endpoint);

      // create new instance and compare before and after
      const beneficiaryAddress = makeRandomAddress();
      const funds = coins(707707, "ucosm");
      const result = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, funds);
      assertIsDeliverTxSuccess(result);

      const myAddress = result.events
        .find((event) => event.type === "instantiate")
        ?.attributes.find((attribute) => attribute.key === "_contract_address")?.value;
      assertDefined(myAddress);

      const history = await client.wasm.getContractCodeHistory(myAddress);
      assert(history.entries);
      expect(history.entries).toContain(
        jasmine.objectContaining({
          codeId: BigInt(hackatomCodeId),
          operation: ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT,
          msg: toUtf8(
            JSON.stringify({
              verifier: alice.address0,
              beneficiary: beneficiaryAddress,
            }),
          ),
        }),
      );
    });

    it("returns empty list for non-existent address", async () => {
      assert(hackatomCodeId);
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const history = await client.wasm.getContractCodeHistory(nonExistentAddress);
      expect(history.entries).toEqual([]);
    });
  });

  describe("getAllContractState", () => {
    it("can get all state", async () => {
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const { models } = await client.wasm.getAllContractState(hackatomContractAddress);
      assert(models);
      expect(models.length).toEqual(1);
      const data = models[0];
      expect(data.key).toEqual(hackatomConfigKey);
      const value = JSON.parse(fromAscii(data.value));
      expect(value.verifier).toMatch(bech32AddressMatcher);
      expect(value.beneficiary).toMatch(bech32AddressMatcher);
    });

    it("rejects for non-existent address", async () => {
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      await expectAsync(client.wasm.getAllContractState(nonExistentAddress)).toBeRejectedWithError(
        /no such contract/i,
      );
    });
  });

  describe("queryContractRaw", () => {
    it("can query by key", async () => {
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const raw = await client.wasm.queryContractRaw(hackatomContractAddress, hackatomConfigKey);
      assert(raw.data, "must get result");
      const model = JSON.parse(fromAscii(raw.data));
      expect(model.verifier).toMatch(bech32AddressMatcher);
      expect(model.beneficiary).toMatch(bech32AddressMatcher);
    });

    it("returns empty for missing key", async () => {
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const { data } = await client.wasm.queryContractRaw(hackatomContractAddress, fromHex("cafe0dad"));
      expect(data).toEqual(new Uint8Array());
    });

    it("returns null for non-existent address", async () => {
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      await expectAsync(
        client.wasm.queryContractRaw(nonExistentAddress, hackatomConfigKey),
      ).toBeRejectedWithError(/no such contract/i);
    });
  });

  describe("queryContractSmart", () => {
    it("can make smart queries", async () => {
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const request = { verifier: {} };
      const result = await client.wasm.queryContractSmart(hackatomContractAddress, request);
      expect(result).toEqual({ verifier: alice.address0 });
    });

    it("throws for invalid query requests", async () => {
      assert(hackatomContractAddress);
      const client = await makeWasmClient(wasmd.endpoint);
      const request = { nosuchkey: {} };
      await expectAsync(
        client.wasm.queryContractSmart(hackatomContractAddress, request),
      ).toBeRejectedWithError(/Error parsing into type hackatom::msg::QueryMsg: unknown variant/i);
    });

    it("throws for non-existent address", async () => {
      const client = await makeWasmClient(wasmd.endpoint);
      const nonExistentAddress = makeRandomAddress();
      const request = { verifier: {} };
      await expectAsync(client.wasm.queryContractSmart(nonExistentAddress, request)).toBeRejectedWithError(
        /no such contract/i,
      );
    });
  });

  describe("broadcastTx", () => {
    it("can upload, instantiate and execute wasm", async () => {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: wasmd.prefix });
      const client = await makeWasmClient(wasmd.endpoint);

      const funds = [coin(1234, "ucosm"), coin(321, "ustake")];
      const beneficiaryAddress = makeRandomAddress();

      let codeId: number;

      // upload
      {
        const result = await uploadContract(wallet, getHackatom());
        assertIsDeliverTxSuccess(result);
        const codeIdAttr = findAttribute(result.events, "store_code", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);
        const actionAttr = findAttribute(result.events, "message", "module");
        expect(actionAttr.value).toEqual("wasm");
      }

      let contractAddress: string;

      // instantiate
      {
        const result = await instantiateContract(wallet, codeId, beneficiaryAddress, funds);
        assertIsDeliverTxSuccess(result);
        const contractAddressAttr = findAttribute(result.events, "instantiate", "_contract_address");
        contractAddress = contractAddressAttr.value;
        const amountAttrs = result.events
          .filter((e) => e.type == "transfer")
          .flatMap((e) => e.attributes.filter((a) => a.key == "amount"));
        expect(amountAttrs[0].value).toEqual("5000000ucosm"); // fee
        expect(amountAttrs[1].value).toEqual("1234ucosm,321ustake"); // instantiate funds
        const actionAttr = findAttribute(result.events, "message", "module");
        expect(actionAttr.value).toEqual("wasm");

        const balanceUcosm = await client.bank.balance(contractAddress, "ucosm");
        expect(balanceUcosm).toEqual(funds[0]);
        const balanceUstake = await client.bank.balance(contractAddress, "ustake");
        expect(balanceUstake).toEqual(funds[1]);
      }

      // execute
      {
        const result = await executeContract(wallet, contractAddress, { release: {} });
        assertIsDeliverTxSuccess(result);
        const wasmEvent = result.events.find((e) => e.type === "wasm");
        assert(wasmEvent, "Event of type wasm expected");
        expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
        expect(wasmEvent.attributes).toContain({
          key: "destination",
          value: beneficiaryAddress,
        });

        // Verify token transfer from contract to beneficiary
        const beneficiaryBalanceUcosm = await client.bank.balance(beneficiaryAddress, "ucosm");
        expect(beneficiaryBalanceUcosm).toEqual(funds[0]);
        const beneficiaryBalanceUstake = await client.bank.balance(beneficiaryAddress, "ustake");
        expect(beneficiaryBalanceUstake).toEqual(funds[1]);
      }
    });
  });
});

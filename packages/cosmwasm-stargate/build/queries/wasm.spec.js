"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const utils_1 = require("@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmwasm/wasm/v1/tx");
const types_1 = require("cosmjs-types/cosmwasm/wasm/v1/types");
const long_1 = __importDefault(require("long"));
const signingcosmwasmclient_1 = require("../signingcosmwasmclient");
const testutils_spec_1 = require("../testutils.spec");
const registry = new proto_signing_1.Registry([
    ["/cosmwasm.wasm.v1.MsgExecuteContract", tx_1.MsgExecuteContract],
    ["/cosmwasm.wasm.v1.MsgStoreCode", tx_1.MsgStoreCode],
    ["/cosmwasm.wasm.v1.MsgInstantiateContract", tx_1.MsgInstantiateContract],
]);
async function uploadContract(signer, contract) {
    const memo = "My first contract on chain";
    const theMsg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: tx_1.MsgStoreCode.fromPartial({
            sender: testutils_spec_1.alice.address0,
            wasmByteCode: contract.data,
        }),
    };
    const fee = {
        amount: stargate_1.coins(5000000, "ucosm"),
        gas: "89000000",
    };
    const firstAddress = (await signer.getAccounts())[0].address;
    const client = await stargate_1.SigningStargateClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, signer, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { registry }));
    return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}
async function instantiateContract(signer, codeId, beneficiaryAddress, funds) {
    const memo = "Create an escrow instance";
    const theMsg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
        value: tx_1.MsgInstantiateContract.fromPartial({
            sender: testutils_spec_1.alice.address0,
            codeId: long_1.default.fromNumber(codeId),
            label: "my escrow",
            msg: encoding_1.toAscii(JSON.stringify({
                verifier: testutils_spec_1.alice.address0,
                beneficiary: beneficiaryAddress,
            })),
            funds: funds ? [...funds] : [],
        }),
    };
    const fee = {
        amount: stargate_1.coins(5000000, "ucosm"),
        gas: "89000000",
    };
    const firstAddress = (await signer.getAccounts())[0].address;
    const client = await stargate_1.SigningStargateClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, signer, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { registry }));
    return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}
async function executeContract(signer, contractAddress, msg) {
    const memo = "Time for action";
    const theMsg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: tx_1.MsgExecuteContract.fromPartial({
            sender: testutils_spec_1.alice.address0,
            contract: contractAddress,
            msg: encoding_1.toAscii(JSON.stringify(msg)),
            funds: [],
        }),
    };
    const fee = {
        amount: stargate_1.coins(5000000, "ucosm"),
        gas: "89000000",
    };
    const firstAddress = (await signer.getAccounts())[0].address;
    const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, signer, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { registry }));
    return client.signAndBroadcast(firstAddress, [theMsg], fee, memo);
}
describe("WasmExtension", () => {
    const hackatom = testutils_spec_1.getHackatom();
    const hackatomConfigKey = encoding_1.toAscii("config");
    let hackatomCodeId;
    let hackatomContractAddress;
    beforeAll(async () => {
        if (testutils_spec_1.wasmdEnabled()) {
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const result = await uploadContract(wallet, hackatom);
            stargate_1.assertIsBroadcastTxSuccess(result);
            hackatomCodeId = Number.parseInt(JSON.parse(result.rawLog)[0]
                .events.find((event) => event.type === "store_code")
                .attributes.find((attribute) => attribute.key === "code_id").value, 10);
            const instantiateResult = await instantiateContract(wallet, hackatomCodeId, testutils_spec_1.makeRandomAddress());
            stargate_1.assertIsBroadcastTxSuccess(instantiateResult);
            hackatomContractAddress = JSON.parse(instantiateResult.rawLog)[0]
                .events.find((event) => event.type === "instantiate")
                .attributes.find((attribute) => attribute.key === "_contract_address").value;
        }
    });
    describe("listCodeInfo", () => {
        it("has recently uploaded contract as last entry", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomCodeId);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { codeInfos } = await client.wasm.listCodeInfo();
            utils_1.assert(codeInfos);
            const lastCode = codeInfos[codeInfos.length - 1];
            expect(lastCode.codeId.toNumber()).toEqual(hackatomCodeId);
            expect(lastCode.creator).toEqual(testutils_spec_1.alice.address0);
            expect(encoding_1.toHex(lastCode.dataHash)).toEqual(encoding_1.toHex(crypto_1.sha256(hackatom.data)));
        });
    });
    describe("getCode", () => {
        it("contains fill code information", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomCodeId);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { codeInfo, data } = await client.wasm.getCode(hackatomCodeId);
            utils_1.assert(codeInfo);
            expect(codeInfo.codeId.toNumber()).toEqual(hackatomCodeId);
            expect(codeInfo.creator).toEqual(testutils_spec_1.alice.address0);
            expect(encoding_1.toHex(codeInfo.dataHash)).toEqual(encoding_1.toHex(crypto_1.sha256(hackatom.data)));
            expect(data).toEqual(hackatom.data);
        });
    });
    // TODO: move listContractsByCodeId tests out of here
    describe("getContractInfo", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomCodeId);
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            // create new instance and compare before and after
            const { contracts: existingContracts } = await client.wasm.listContractsByCodeId(hackatomCodeId);
            utils_1.assert(existingContracts);
            for (const address of existingContracts) {
                expect(address).toMatch(testutils_spec_1.bech32AddressMatcher);
            }
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const funds = stargate_1.coins(707707, "ucosm");
            const result = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, funds);
            stargate_1.assertIsBroadcastTxSuccess(result);
            const myAddress = JSON.parse(result.rawLog)[0]
                .events.find((event) => event.type === "instantiate")
                .attributes.find((attribute) => attribute.key === "_contract_address").value;
            const { contracts: newContracts } = await client.wasm.listContractsByCodeId(hackatomCodeId);
            utils_1.assert(newContracts);
            expect(newContracts.length).toEqual(existingContracts.length + 1);
            const newContract = newContracts[newContracts.length - 1];
            expect(newContract).toMatch(testutils_spec_1.bech32AddressMatcher);
            const { contractInfo } = await client.wasm.getContractInfo(myAddress);
            utils_1.assert(contractInfo);
            expect(Object.assign({}, contractInfo)).toEqual({
                codeId: long_1.default.fromNumber(hackatomCodeId, true),
                creator: testutils_spec_1.alice.address0,
                label: "my escrow",
                admin: "",
                ibcPortId: "",
            });
            expect(contractInfo.admin).toEqual("");
        });
        it("rejects for non-existent address", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomCodeId);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const nonExistentAddress = testutils_spec_1.makeRandomAddress();
            await expectAsync(client.wasm.getContractInfo(nonExistentAddress)).toBeRejectedWithError(/not found/i);
        });
    });
    describe("getContractCodeHistory", () => {
        it("can list contract history", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomCodeId);
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            // create new instance and compare before and after
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const funds = stargate_1.coins(707707, "ucosm");
            const result = await instantiateContract(wallet, hackatomCodeId, beneficiaryAddress, funds);
            stargate_1.assertIsBroadcastTxSuccess(result);
            const myAddress = JSON.parse(result.rawLog)[0]
                .events.find((event) => event.type === "instantiate")
                .attributes.find((attribute) => attribute.key === "_contract_address").value;
            const history = await client.wasm.getContractCodeHistory(myAddress);
            utils_1.assert(history.entries);
            expect(history.entries).toContain(jasmine.objectContaining({
                codeId: long_1.default.fromNumber(hackatomCodeId, true),
                operation: types_1.ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT,
                msg: encoding_1.toAscii(JSON.stringify({
                    verifier: testutils_spec_1.alice.address0,
                    beneficiary: beneficiaryAddress,
                })),
            }));
        });
        it("returns empty list for non-existent address", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomCodeId);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const nonExistentAddress = testutils_spec_1.makeRandomAddress();
            const history = await client.wasm.getContractCodeHistory(nonExistentAddress);
            expect(history.entries).toEqual([]);
        });
    });
    describe("getAllContractState", () => {
        it("can get all state", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomContractAddress);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { models } = await client.wasm.getAllContractState(hackatomContractAddress);
            utils_1.assert(models);
            expect(models.length).toEqual(1);
            const data = models[0];
            expect(data.key).toEqual(hackatomConfigKey);
            const value = JSON.parse(encoding_1.fromAscii(data.value));
            expect(value.verifier).toMatch(testutils_spec_1.bech32AddressMatcher);
            expect(value.beneficiary).toMatch(testutils_spec_1.bech32AddressMatcher);
        });
        it("rejects for non-existent address", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const nonExistentAddress = testutils_spec_1.makeRandomAddress();
            await expectAsync(client.wasm.getAllContractState(nonExistentAddress)).toBeRejectedWithError(/not found/i);
        });
    });
    describe("queryContractRaw", () => {
        it("can query by key", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomContractAddress);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const raw = await client.wasm.queryContractRaw(hackatomContractAddress, hackatomConfigKey);
            utils_1.assert(raw.data, "must get result");
            const model = JSON.parse(encoding_1.fromAscii(raw.data));
            expect(model.verifier).toMatch(testutils_spec_1.bech32AddressMatcher);
            expect(model.beneficiary).toMatch(testutils_spec_1.bech32AddressMatcher);
        });
        it("returns empty for missing key", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomContractAddress);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { data } = await client.wasm.queryContractRaw(hackatomContractAddress, encoding_1.fromHex("cafe0dad"));
            expect(data).toEqual(new Uint8Array());
        });
        it("returns null for non-existent address", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const nonExistentAddress = testutils_spec_1.makeRandomAddress();
            await expectAsync(client.wasm.queryContractRaw(nonExistentAddress, hackatomConfigKey)).toBeRejectedWithError(/not found/i);
        });
    });
    describe("queryContractSmart", () => {
        it("can make smart queries", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomContractAddress);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const request = { verifier: {} };
            const result = await client.wasm.queryContractSmart(hackatomContractAddress, request);
            expect(result).toEqual({ verifier: testutils_spec_1.alice.address0 });
        });
        it("throws for invalid query requests", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(hackatomContractAddress);
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const request = { nosuchkey: {} };
            await expectAsync(client.wasm.queryContractSmart(hackatomContractAddress, request)).toBeRejectedWithError(/Error parsing into type hackatom::msg::QueryMsg: unknown variant/i);
        });
        it("throws for non-existent address", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const nonExistentAddress = testutils_spec_1.makeRandomAddress();
            const request = { verifier: {} };
            await expectAsync(client.wasm.queryContractSmart(nonExistentAddress, request)).toBeRejectedWithError(/not found/i);
        });
    });
    describe("broadcastTx", () => {
        it("can upload, instantiate and execute wasm", async () => {
            var _a;
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const client = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const funds = [stargate_1.coin(1234, "ucosm"), stargate_1.coin(321, "ustake")];
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            let codeId;
            // upload
            {
                const result = await uploadContract(wallet, testutils_spec_1.getHackatom());
                stargate_1.assertIsBroadcastTxSuccess(result);
                const parsedLogs = stargate_1.logs.parseLogs(stargate_1.logs.parseRawLog(result.rawLog));
                const codeIdAttr = stargate_1.logs.findAttribute(parsedLogs, "store_code", "code_id");
                codeId = Number.parseInt(codeIdAttr.value, 10);
                expect(codeId).toBeGreaterThanOrEqual(1);
                expect(codeId).toBeLessThanOrEqual(200);
                const actionAttr = stargate_1.logs.findAttribute(parsedLogs, "message", "module");
                expect(actionAttr.value).toEqual("wasm");
            }
            let contractAddress;
            // instantiate
            {
                const result = await instantiateContract(wallet, codeId, beneficiaryAddress, funds);
                stargate_1.assertIsBroadcastTxSuccess(result);
                const parsedLogs = stargate_1.logs.parseLogs(stargate_1.logs.parseRawLog(result.rawLog));
                const contractAddressAttr = stargate_1.logs.findAttribute(parsedLogs, "instantiate", "_contract_address");
                contractAddress = contractAddressAttr.value;
                const amountAttr = stargate_1.logs.findAttribute(parsedLogs, "transfer", "amount");
                expect(amountAttr.value).toEqual("1234ucosm,321ustake");
                const actionAttr = stargate_1.logs.findAttribute(parsedLogs, "message", "module");
                expect(actionAttr.value).toEqual("wasm");
                const balanceUcosm = await client.bank.balance(contractAddress, "ucosm");
                expect(balanceUcosm).toEqual(funds[0]);
                const balanceUstake = await client.bank.balance(contractAddress, "ustake");
                expect(balanceUstake).toEqual(funds[1]);
            }
            // execute
            {
                const result = await executeContract(wallet, contractAddress, { release: {} });
                stargate_1.assertIsBroadcastTxSuccess(result);
                const parsedLogs = stargate_1.logs.parseLogs(stargate_1.logs.parseRawLog(result.rawLog));
                const wasmEvent = (_a = parsedLogs.find(() => true)) === null || _a === void 0 ? void 0 : _a.events.find((e) => e.type === "wasm");
                utils_1.assert(wasmEvent, "Event of type wasm expected");
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
//# sourceMappingURL=wasm.spec.js.map
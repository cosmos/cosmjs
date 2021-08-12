"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const utils_1 = require("@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
const coin_1 = require("cosmjs-types/cosmos/base/v1beta1/coin");
const tx_2 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
const tx_3 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const long_1 = __importDefault(require("long"));
const pako_1 = __importDefault(require("pako"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const signingcosmwasmclient_1 = require("./signingcosmwasmclient");
const testutils_spec_1 = require("./testutils.spec");
describe("SigningCosmWasmClient", () => {
    describe("connectWithSigner", () => {
        it("can be constructed", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
            expect(client).toBeTruthy();
            client.disconnect();
        });
        it("can be constructed with custom registry", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic);
            const registry = new proto_signing_1.Registry();
            registry.register("/custom.MsgCustom", tx_1.MsgSend);
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix, registry: registry });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            expect(client.registry.lookupType("/custom.MsgCustom")).toEqual(tx_1.MsgSend);
            client.disconnect();
        });
    });
    describe("upload", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const wasm = testutils_spec_1.getHackatom().data;
            const { codeId, originalChecksum, originalSize, compressedChecksum, compressedSize } = await client.upload(testutils_spec_1.alice.address0, wasm, testutils_spec_1.defaultUploadFee);
            expect(originalChecksum).toEqual(encoding_1.toHex(crypto_1.sha256(wasm)));
            expect(originalSize).toEqual(wasm.length);
            expect(compressedChecksum).toMatch(/^[0-9a-f]{64}$/);
            expect(compressedSize).toBeLessThan(wasm.length * 0.5);
            expect(codeId).toBeGreaterThanOrEqual(1);
            client.disconnect();
        });
    });
    describe("instantiate", () => {
        it("works with transfer amount", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            const funds = [stargate_1.coin(1234, "ucosm"), stargate_1.coin(321, "ustake")];
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: beneficiaryAddress,
            }, "My cool label", testutils_spec_1.defaultInstantiateFee, {
                memo: "Let's see if the memo is used",
                funds: funds,
            });
            const wasmClient = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const ucosmBalance = await wasmClient.bank.balance(contractAddress, "ucosm");
            expect(ucosmBalance).toEqual(funds[0]);
            const ustakeBalance = await wasmClient.bank.balance(contractAddress, "ustake");
            expect(ustakeBalance).toEqual(funds[1]);
            client.disconnect();
        });
        it("works with admin", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: beneficiaryAddress,
            }, "My cool label", testutils_spec_1.defaultInstantiateFee, { admin: testutils_spec_1.unused.address });
            const wasmClient = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { contractInfo } = await wasmClient.wasm.getContractInfo(contractAddress);
            utils_1.assert(contractInfo);
            expect(contractInfo.admin).toEqual(testutils_spec_1.unused.address);
            client.disconnect();
        });
        it("can instantiate one code multiple times", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            const contractAddress1 = await client.instantiate(testutils_spec_1.alice.address0, codeId, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: testutils_spec_1.makeRandomAddress(),
            }, "contract 1", testutils_spec_1.defaultInstantiateFee);
            const contractAddress2 = await client.instantiate(testutils_spec_1.alice.address0, codeId, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: testutils_spec_1.makeRandomAddress(),
            }, "contract 2", testutils_spec_1.defaultInstantiateFee);
            expect(contractAddress1).not.toEqual(contractAddress2);
            client.disconnect();
        });
    });
    describe("updateAdmin", () => {
        it("can update an admin", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: beneficiaryAddress,
            }, "My cool label", testutils_spec_1.defaultInstantiateFee, {
                admin: testutils_spec_1.alice.address0,
            });
            const wasmClient = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { contractInfo: contractInfo1 } = await wasmClient.wasm.getContractInfo(contractAddress);
            utils_1.assert(contractInfo1);
            expect(contractInfo1.admin).toEqual(testutils_spec_1.alice.address0);
            await client.updateAdmin(testutils_spec_1.alice.address0, contractAddress, testutils_spec_1.unused.address, testutils_spec_1.defaultUpdateAdminFee);
            const { contractInfo: contractInfo2 } = await wasmClient.wasm.getContractInfo(contractAddress);
            utils_1.assert(contractInfo2);
            expect(contractInfo2.admin).toEqual(testutils_spec_1.unused.address);
            client.disconnect();
        });
    });
    describe("clearAdmin", () => {
        it("can clear an admin", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: beneficiaryAddress,
            }, "My cool label", testutils_spec_1.defaultInstantiateFee, {
                admin: testutils_spec_1.alice.address0,
            });
            const wasmClient = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { contractInfo: contractInfo1 } = await wasmClient.wasm.getContractInfo(contractAddress);
            utils_1.assert(contractInfo1);
            expect(contractInfo1.admin).toEqual(testutils_spec_1.alice.address0);
            await client.clearAdmin(testutils_spec_1.alice.address0, contractAddress, testutils_spec_1.defaultClearAdminFee);
            const { contractInfo: contractInfo2 } = await wasmClient.wasm.getContractInfo(contractAddress);
            utils_1.assert(contractInfo2);
            expect(contractInfo2.admin).toEqual("");
            client.disconnect();
        });
    });
    describe("migrate", () => {
        it("can can migrate from one code ID to another", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const { codeId: codeId1 } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            const { codeId: codeId2 } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId1, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: beneficiaryAddress,
            }, "My cool label", testutils_spec_1.defaultInstantiateFee, {
                admin: testutils_spec_1.alice.address0,
            });
            const wasmClient = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const { contractInfo: contractInfo1 } = await wasmClient.wasm.getContractInfo(contractAddress);
            utils_1.assert(contractInfo1);
            expect(contractInfo1.admin).toEqual(testutils_spec_1.alice.address0);
            const newVerifier = testutils_spec_1.makeRandomAddress();
            await client.migrate(testutils_spec_1.alice.address0, contractAddress, codeId2, { verifier: newVerifier }, testutils_spec_1.defaultMigrateFee);
            const { contractInfo: contractInfo2 } = await wasmClient.wasm.getContractInfo(contractAddress);
            utils_1.assert(contractInfo2);
            expect(Object.assign({}, contractInfo2)).toEqual(Object.assign(Object.assign({}, contractInfo1), { codeId: long_1.default.fromNumber(codeId2, true) }));
            client.disconnect();
        });
    });
    describe("execute", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
            // instantiate
            const funds = [stargate_1.coin(233444, "ucosm"), stargate_1.coin(5454, "ustake")];
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId, {
                verifier: testutils_spec_1.alice.address0,
                beneficiary: beneficiaryAddress,
            }, "amazing random contract", testutils_spec_1.defaultInstantiateFee, {
                funds: funds,
            });
            // execute
            const result = await client.execute(testutils_spec_1.alice.address0, contractAddress, { release: {} }, testutils_spec_1.defaultExecuteFee);
            const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
            utils_1.assert(wasmEvent, "Event of type wasm expected");
            expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
            expect(wasmEvent.attributes).toContain({
                key: "destination",
                value: beneficiaryAddress,
            });
            // Verify token transfer from contract to beneficiary
            const wasmClient = await testutils_spec_1.makeWasmClient(testutils_spec_1.wasmd.endpoint);
            const beneficiaryBalanceUcosm = await wasmClient.bank.balance(beneficiaryAddress, "ucosm");
            expect(beneficiaryBalanceUcosm).toEqual(funds[0]);
            const beneficiaryBalanceUstake = await wasmClient.bank.balance(beneficiaryAddress, "ustake");
            expect(beneficiaryBalanceUstake).toEqual(funds[1]);
            const contractBalanceUcosm = await wasmClient.bank.balance(contractAddress, "ucosm");
            expect(contractBalanceUcosm).toEqual(stargate_1.coin(0, "ucosm"));
            const contractBalanceUstake = await wasmClient.bank.balance(contractAddress, "ustake");
            expect(contractBalanceUstake).toEqual(stargate_1.coin(0, "ustake"));
            client.disconnect();
        });
    });
    describe("sendTokens", () => {
        it("works with direct signer", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const amount = stargate_1.coins(7890, "ucosm");
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const memo = "for dinner";
            // no tokens here
            const before = await client.getBalance(beneficiaryAddress, "ucosm");
            expect(before).toEqual({
                denom: "ucosm",
                amount: "0",
            });
            // send
            const result = await client.sendTokens(testutils_spec_1.alice.address0, beneficiaryAddress, amount, testutils_spec_1.defaultSendFee, memo);
            stargate_1.assertIsBroadcastTxSuccess(result);
            expect(result.rawLog).toBeTruthy();
            // got tokens
            const after = await client.getBalance(beneficiaryAddress, "ucosm");
            utils_1.assert(after);
            expect(after).toEqual(amount[0]);
            client.disconnect();
        });
        it("works with legacy Amino signer", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix });
            const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
            const amount = stargate_1.coins(7890, "ucosm");
            const beneficiaryAddress = testutils_spec_1.makeRandomAddress();
            const memo = "for dinner";
            // no tokens here
            const before = await client.getBalance(beneficiaryAddress, "ucosm");
            expect(before).toEqual({
                denom: "ucosm",
                amount: "0",
            });
            // send
            const result = await client.sendTokens(testutils_spec_1.alice.address0, beneficiaryAddress, amount, testutils_spec_1.defaultSendFee, memo);
            stargate_1.assertIsBroadcastTxSuccess(result);
            expect(result.rawLog).toBeTruthy();
            // got tokens
            const after = await client.getBalance(beneficiaryAddress, "ucosm");
            utils_1.assert(after);
            expect(after).toEqual(amount[0]);
            client.disconnect();
        });
    });
    describe("signAndBroadcast", () => {
        describe("direct mode", () => {
            it("works", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: msgDelegateTypeUrl,
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with a modifying signer", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await testutils_spec_1.ModifyingDirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, {
                    prefix: testutils_spec_1.wasmd.prefix,
                });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: msgDelegateTypeUrl,
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                stargate_1.assertIsBroadcastTxSuccess(result);
                await utils_1.sleep(500);
                const searchResult = await client.getTx(result.transactionHash);
                utils_1.assert(searchResult, "Must find transaction");
                const tx = proto_signing_1.decodeTxRaw(searchResult.tx);
                // From ModifyingDirectSecp256k1HdWallet
                expect(tx.body.memo).toEqual("This was modified");
                expect(Object.assign({}, tx.authInfo.fee.amount[0])).toEqual(stargate_1.coin(3000, "ucosm"));
                expect(tx.authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                client.disconnect();
            });
        });
        describe("legacy Amino mode", () => {
            it("works with bank MsgSend", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msgSend = {
                    fromAddress: testutils_spec_1.alice.address0,
                    toAddress: testutils_spec_1.makeRandomAddress(),
                    amount: stargate_1.coins(1234, "ucosm"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: msgSend,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with staking MsgDelegate", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msgDelegate = {
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msgDelegate,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ustake"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with wasm MsgStoreCode", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const { data } = testutils_spec_1.getHackatom();
                const msgStoreCode = {
                    sender: testutils_spec_1.alice.address0,
                    wasmByteCode: pako_1.default.gzip(data),
                    instantiatePermission: undefined,
                };
                const msgAny = {
                    typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
                    value: msgStoreCode,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ustake"),
                    gas: "1500000",
                };
                const memo = "Use your tokens wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with a custom registry and custom message", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const customRegistry = new proto_signing_1.Registry();
                const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                const baseCustomMsgDelegate = {
                    customDelegatorAddress: "",
                    customValidatorAddress: "",
                };
                const CustomMsgDelegate = {
                    // Adapted from autogenerated MsgDelegate implementation
                    encode(message, writer = minimal_1.default.Writer.create()) {
                        var _a, _b;
                        writer.uint32(10).string((_a = message.customDelegatorAddress) !== null && _a !== void 0 ? _a : "");
                        writer.uint32(18).string((_b = message.customValidatorAddress) !== null && _b !== void 0 ? _b : "");
                        if (message.customAmount !== undefined && message.customAmount !== undefined) {
                            coin_1.Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
                        }
                        return writer;
                    },
                    decode() {
                        throw new Error("decode method should not be required");
                    },
                    fromJSON() {
                        throw new Error("fromJSON method should not be required");
                    },
                    fromPartial(object) {
                        const message = Object.assign({}, baseCustomMsgDelegate);
                        if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
                            message.customDelegatorAddress = object.customDelegatorAddress;
                        }
                        else {
                            message.customDelegatorAddress = "";
                        }
                        if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
                            message.customValidatorAddress = object.customValidatorAddress;
                        }
                        else {
                            message.customValidatorAddress = "";
                        }
                        if (object.customAmount !== undefined && object.customAmount !== null) {
                            message.customAmount = coin_1.Coin.fromPartial(object.customAmount);
                        }
                        else {
                            message.customAmount = undefined;
                        }
                        return message;
                    },
                    toJSON() {
                        throw new Error("toJSON method should not be required");
                    },
                };
                customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
                const customAminoTypes = new stargate_1.AminoTypes({
                    additions: {
                        "/cosmos.staking.v1beta1.MsgDelegate": {
                            aminoType: "cosmos-sdk/MsgDelegate",
                            toAmino: ({ customDelegatorAddress, customValidatorAddress, customAmount, }) => {
                                utils_1.assert(customDelegatorAddress, "missing customDelegatorAddress");
                                utils_1.assert(customValidatorAddress, "missing validatorAddress");
                                utils_1.assert(customAmount, "missing amount");
                                utils_1.assert(customAmount.amount, "missing amount.amount");
                                utils_1.assert(customAmount.denom, "missing amount.denom");
                                return {
                                    delegator_address: customDelegatorAddress,
                                    validator_address: customValidatorAddress,
                                    amount: {
                                        amount: customAmount.amount,
                                        denom: customAmount.denom,
                                    },
                                };
                            },
                            fromAmino: ({ delegator_address, validator_address, amount, }) => ({
                                customDelegatorAddress: delegator_address,
                                customValidatorAddress: validator_address,
                                customAmount: coin_1.Coin.fromPartial(amount),
                            }),
                        },
                    },
                });
                const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix, registry: customRegistry, aminoTypes: customAminoTypes });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
                const msg = {
                    customDelegatorAddress: testutils_spec_1.alice.address0,
                    customValidatorAddress: testutils_spec_1.validator.validatorAddress,
                    customAmount: stargate_1.coin(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with a modifying signer", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await testutils_spec_1.ModifyingSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, {
                    prefix: testutils_spec_1.wasmd.prefix,
                });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msg = {
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                stargate_1.assertIsBroadcastTxSuccess(result);
                await utils_1.sleep(500);
                const searchResult = await client.getTx(result.transactionHash);
                utils_1.assert(searchResult, "Must find transaction");
                const tx = proto_signing_1.decodeTxRaw(searchResult.tx);
                // From ModifyingSecp256k1HdWallet
                expect(tx.body.memo).toEqual("This was modified");
                expect(Object.assign({}, tx.authInfo.fee.amount[0])).toEqual(stargate_1.coin(3000, "ucosm"));
                expect(tx.authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                client.disconnect();
            });
        });
    });
    describe("sign", () => {
        describe("direct mode", () => {
            it("works", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with a modifying signer", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await testutils_spec_1.ModifyingDirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, {
                    prefix: testutils_spec_1.wasmd.prefix,
                });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                const body = tx_3.TxBody.decode(signed.bodyBytes);
                const authInfo = tx_3.AuthInfo.decode(signed.authInfoBytes);
                // From ModifyingDirectSecp256k1HdWallet
                expect(body.memo).toEqual("This was modified");
                expect(Object.assign({}, authInfo.fee.amount[0])).toEqual(stargate_1.coin(3000, "ucosm"));
                expect(authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
        });
        describe("legacy Amino mode", () => {
            it("works with bank MsgSend", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msgSend = {
                    fromAddress: testutils_spec_1.alice.address0,
                    toAddress: testutils_spec_1.makeRandomAddress(),
                    amount: stargate_1.coins(1234, "ucosm"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: msgSend,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const signed = await client.sign(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with staking MsgDelegate", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msgDelegate = {
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msgDelegate,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ustake"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const signed = await client.sign(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with a custom registry and custom message", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const customRegistry = new proto_signing_1.Registry();
                const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                const baseCustomMsgDelegate = {
                    customDelegatorAddress: "",
                    customValidatorAddress: "",
                };
                const CustomMsgDelegate = {
                    // Adapted from autogenerated MsgDelegate implementation
                    encode(message, writer = minimal_1.default.Writer.create()) {
                        var _a, _b;
                        writer.uint32(10).string((_a = message.customDelegatorAddress) !== null && _a !== void 0 ? _a : "");
                        writer.uint32(18).string((_b = message.customValidatorAddress) !== null && _b !== void 0 ? _b : "");
                        if (message.customAmount !== undefined && message.customAmount !== undefined) {
                            coin_1.Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
                        }
                        return writer;
                    },
                    decode() {
                        throw new Error("decode method should not be required");
                    },
                    fromJSON() {
                        throw new Error("fromJSON method should not be required");
                    },
                    fromPartial(object) {
                        const message = Object.assign({}, baseCustomMsgDelegate);
                        if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
                            message.customDelegatorAddress = object.customDelegatorAddress;
                        }
                        else {
                            message.customDelegatorAddress = "";
                        }
                        if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
                            message.customValidatorAddress = object.customValidatorAddress;
                        }
                        else {
                            message.customValidatorAddress = "";
                        }
                        if (object.customAmount !== undefined && object.customAmount !== null) {
                            message.customAmount = coin_1.Coin.fromPartial(object.customAmount);
                        }
                        else {
                            message.customAmount = undefined;
                        }
                        return message;
                    },
                    toJSON() {
                        throw new Error("toJSON method should not be required");
                    },
                };
                customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
                const customAminoTypes = new stargate_1.AminoTypes({
                    additions: {
                        "/cosmos.staking.v1beta1.MsgDelegate": {
                            aminoType: "cosmos-sdk/MsgDelegate",
                            toAmino: ({ customDelegatorAddress, customValidatorAddress, customAmount, }) => {
                                utils_1.assert(customDelegatorAddress, "missing customDelegatorAddress");
                                utils_1.assert(customValidatorAddress, "missing validatorAddress");
                                utils_1.assert(customAmount, "missing amount");
                                return {
                                    delegator_address: customDelegatorAddress,
                                    validator_address: customValidatorAddress,
                                    amount: {
                                        amount: customAmount.amount,
                                        denom: customAmount.denom,
                                    },
                                };
                            },
                            fromAmino: ({ delegator_address, validator_address, amount, }) => ({
                                customDelegatorAddress: delegator_address,
                                customValidatorAddress: validator_address,
                                customAmount: coin_1.Coin.fromPartial(amount),
                            }),
                        },
                    },
                });
                const options = Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { registry: customRegistry, aminoTypes: customAminoTypes });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, options);
                const msg = {
                    customDelegatorAddress: testutils_spec_1.alice.address0,
                    customValidatorAddress: testutils_spec_1.validator.validatorAddress,
                    customAmount: stargate_1.coin(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
            it("works with a modifying signer", async () => {
                testutils_spec_1.pendingWithoutWasmd();
                const wallet = await testutils_spec_1.ModifyingSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, {
                    prefix: testutils_spec_1.wasmd.prefix,
                });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet, Object.assign(Object.assign({}, testutils_spec_1.defaultSigningClientOptions), { prefix: testutils_spec_1.wasmd.prefix }));
                const msg = {
                    delegatorAddress: testutils_spec_1.alice.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: stargate_1.coin(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: stargate_1.coins(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.alice.address0, [msgAny], fee, memo);
                const body = tx_3.TxBody.decode(signed.bodyBytes);
                const authInfo = tx_3.AuthInfo.decode(signed.authInfoBytes);
                // From ModifyingSecp256k1HdWallet
                expect(body.memo).toEqual("This was modified");
                expect(Object.assign({}, authInfo.fee.amount[0])).toEqual(stargate_1.coin(3000, "ucosm"));
                expect(authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                stargate_1.assertIsBroadcastTxSuccess(result);
                client.disconnect();
            });
        });
    });
});
//# sourceMappingURL=signingcosmwasmclient.spec.js.map
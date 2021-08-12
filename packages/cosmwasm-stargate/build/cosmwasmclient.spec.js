"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const utils_1 = require("@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const readonly_date_1 = require("readonly-date");
const cosmwasmclient_1 = require("./cosmwasmclient");
const signingcosmwasmclient_1 = require("./signingcosmwasmclient");
const testutils_spec_1 = require("./testutils.spec");
describe("CosmWasmClient", () => {
    describe("connect", () => {
        it("can be constructed", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            expect(client).toBeTruthy();
        });
    });
    describe("getChainId", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            expect(await client.getChainId()).toEqual(testutils_spec_1.wasmd.chainId);
        });
        it("caches chain ID", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const openedClient = client;
            const getCodeSpy = spyOn(openedClient.tmClient, "status").and.callThrough();
            expect(await client.getChainId()).toEqual(testutils_spec_1.wasmd.chainId); // from network
            expect(await client.getChainId()).toEqual(testutils_spec_1.wasmd.chainId); // from cache
            expect(getCodeSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe("getHeight", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const height1 = await client.getHeight();
            expect(height1).toBeGreaterThan(0);
            await utils_1.sleep(testutils_spec_1.wasmd.blockTime * 1.4); // tolerate chain being 40% slower than expected
            const height2 = await client.getHeight();
            expect(height2).toBeGreaterThanOrEqual(height1 + 1);
            expect(height2).toBeLessThanOrEqual(height1 + 2);
        });
    });
    describe("getAccount", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            expect(await client.getAccount(testutils_spec_1.unused.address)).toEqual({
                address: testutils_spec_1.unused.address,
                accountNumber: testutils_spec_1.unused.accountNumber,
                sequence: testutils_spec_1.unused.sequence,
                pubkey: null,
            });
        });
        it("returns null for missing accounts", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const missing = testutils_spec_1.makeRandomAddress();
            expect(await client.getAccount(missing)).toBeNull();
        });
    });
    describe("getSequence", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            expect(await client.getSequence(testutils_spec_1.unused.address)).toEqual({
                accountNumber: testutils_spec_1.unused.accountNumber,
                sequence: testutils_spec_1.unused.sequence,
            });
        });
        it("rejects for missing accounts", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const missing = testutils_spec_1.makeRandomAddress();
            await expectAsync(client.getSequence(missing)).toBeRejectedWithError(/account does not exist on chain/i);
        });
    });
    describe("getBlock", () => {
        it("works for latest block", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const response = await client.getBlock();
            // id
            expect(response.id).toMatch(testutils_spec_1.tendermintIdMatcher);
            // header
            expect(response.header.height).toBeGreaterThanOrEqual(1);
            expect(response.header.chainId).toEqual(await client.getChainId());
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeLessThan(readonly_date_1.ReadonlyDate.now());
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(readonly_date_1.ReadonlyDate.now() - 5000);
            // txs
            expect(Array.isArray(response.txs)).toEqual(true);
        });
        it("works for block by height", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const height = (await client.getBlock()).header.height;
            const response = await client.getBlock(height - 1);
            // id
            expect(response.id).toMatch(testutils_spec_1.tendermintIdMatcher);
            // header
            expect(response.header.height).toEqual(height - 1);
            expect(response.header.chainId).toEqual(await client.getChainId());
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeLessThan(readonly_date_1.ReadonlyDate.now());
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(readonly_date_1.ReadonlyDate.now() - 5000);
            // txs
            expect(Array.isArray(response.txs)).toEqual(true);
        });
    });
    describe("broadcastTx", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const registry = new proto_signing_1.Registry();
            const memo = "My first contract on chain";
            const sendMsg = {
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: {
                    fromAddress: testutils_spec_1.alice.address0,
                    toAddress: testutils_spec_1.makeRandomAddress(),
                    amount: stargate_1.coins(1234567, "ucosm"),
                },
            };
            const fee = {
                amount: stargate_1.coins(5000, "ucosm"),
                gas: "890000",
            };
            const chainId = await client.getChainId();
            const sequenceResponse = await client.getSequence(testutils_spec_1.alice.address0);
            utils_1.assert(sequenceResponse);
            const { accountNumber, sequence } = sequenceResponse;
            const pubkey = proto_signing_1.encodePubkey(testutils_spec_1.alice.pubkey0);
            const txBody = {
                typeUrl: "/cosmos.tx.v1beta1.TxBody",
                value: {
                    messages: [sendMsg],
                    memo: memo,
                },
            };
            const txBodyBytes = registry.encode(txBody);
            const gasLimit = math_1.Int53.fromString(fee.gas).toNumber();
            const authInfoBytes = proto_signing_1.makeAuthInfoBytes([{ pubkey, sequence }], fee.amount, gasLimit);
            const signDoc = proto_signing_1.makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
            const { signed, signature } = await wallet.signDirect(testutils_spec_1.alice.address0, signDoc);
            const txRaw = tx_1.TxRaw.fromPartial({
                bodyBytes: signed.bodyBytes,
                authInfoBytes: signed.authInfoBytes,
                signatures: [encoding_1.fromBase64(signature.signature)],
            });
            const signedTx = Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish());
            const result = await client.broadcastTx(signedTx);
            stargate_1.assertIsBroadcastTxSuccess(result);
            const amountAttr = stargate_1.logs.findAttribute(stargate_1.logs.parseRawLog(result.rawLog), "transfer", "amount");
            expect(amountAttr.value).toEqual("1234567ucosm");
            expect(result.transactionHash).toMatch(/^[0-9A-F]{64}$/);
        });
    });
    describe("getCodes", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const result = await client.getCodes();
            expect(result.length).toBeGreaterThanOrEqual(1);
            const [first] = result;
            expect(first).toEqual({
                id: testutils_spec_1.deployedHackatom.codeId,
                checksum: testutils_spec_1.deployedHackatom.checksum,
                creator: testutils_spec_1.alice.address0,
            });
        });
    });
    describe("getCodeDetails", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const result = await client.getCodeDetails(1);
            const expectedInfo = {
                id: testutils_spec_1.deployedHackatom.codeId,
                checksum: testutils_spec_1.deployedHackatom.checksum,
                creator: testutils_spec_1.alice.address0,
            };
            // check info
            expect(result).toEqual(jasmine.objectContaining(expectedInfo));
            // check data
            expect(crypto_1.sha256(result.data)).toEqual(encoding_1.fromHex(expectedInfo.checksum));
        });
        it("caches downloads", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const openedClient = client;
            const getCodeSpy = spyOn(openedClient.queryClient.wasm, "getCode").and.callThrough();
            const result1 = await client.getCodeDetails(testutils_spec_1.deployedHackatom.codeId); // from network
            const result2 = await client.getCodeDetails(testutils_spec_1.deployedHackatom.codeId); // from cache
            expect(result2).toEqual(result1);
            expect(getCodeSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe("getContracts", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const result = await client.getContracts(1);
            const expectedAddresses = testutils_spec_1.deployedHackatom.instances.map((info) => info.address);
            expect(result).toEqual(expectedAddresses);
        });
    });
    describe("getContract", () => {
        it("works for instance without admin", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const zero = await client.getContract(testutils_spec_1.deployedHackatom.instances[0].address);
            expect(zero).toEqual({
                address: testutils_spec_1.deployedHackatom.instances[0].address,
                codeId: testutils_spec_1.deployedHackatom.codeId,
                creator: testutils_spec_1.alice.address0,
                label: testutils_spec_1.deployedHackatom.instances[0].label,
                admin: undefined,
                ibcPortId: undefined,
            });
        });
        it("works for instance with admin", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const two = await client.getContract(testutils_spec_1.deployedHackatom.instances[2].address);
            expect(two).toEqual({
                address: testutils_spec_1.deployedHackatom.instances[2].address,
                codeId: testutils_spec_1.deployedHackatom.codeId,
                creator: testutils_spec_1.alice.address0,
                label: testutils_spec_1.deployedHackatom.instances[2].label,
                admin: testutils_spec_1.alice.address1,
                ibcPortId: undefined,
            });
        });
        it("works for instance with IBC port ID", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const contract = await client.getContract(testutils_spec_1.deployedIbcReflect.instances[0].address);
            expect(contract).toEqual(jasmine.objectContaining({
                address: testutils_spec_1.deployedIbcReflect.instances[0].address,
                codeId: testutils_spec_1.deployedIbcReflect.codeId,
                ibcPortId: testutils_spec_1.deployedIbcReflect.instances[0].ibcPortId,
            }));
        });
    });
    describe("queryContractRaw", () => {
        const configKey = encoding_1.toAscii("config");
        const otherKey = encoding_1.toAscii("this_does_not_exist");
        let contract;
        beforeAll(async () => {
            if (testutils_spec_1.wasmdEnabled()) {
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet);
                const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
                const instantiateMsg = { verifier: testutils_spec_1.makeRandomAddress(), beneficiary: testutils_spec_1.makeRandomAddress() };
                const label = "random hackatom";
                const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId, instantiateMsg, label, testutils_spec_1.defaultInstantiateFee);
                contract = { instantiateMsg: instantiateMsg, address: contractAddress };
            }
        });
        it("can query existing key", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(contract);
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const raw = await client.queryContractRaw(contract.address, configKey);
            utils_1.assert(raw, "must get result");
            expect(JSON.parse(encoding_1.fromAscii(raw))).toEqual({
                verifier: contract.instantiateMsg.verifier,
                beneficiary: contract.instantiateMsg.beneficiary,
                funder: testutils_spec_1.alice.address0,
            });
        });
        it("can query non-existent key", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(contract);
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const raw = await client.queryContractRaw(contract.address, otherKey);
            expect(raw).toEqual(new Uint8Array());
        });
        it("errors for non-existent contract", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(contract);
            const nonExistentAddress = testutils_spec_1.makeRandomAddress();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            await expectAsync(client.queryContractRaw(nonExistentAddress, configKey)).toBeRejectedWithError(/not found/i);
        });
    });
    describe("queryContractSmart", () => {
        let contract;
        beforeAll(async () => {
            if (testutils_spec_1.wasmdEnabled()) {
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.alice.mnemonic, { prefix: testutils_spec_1.wasmd.prefix });
                const client = await signingcosmwasmclient_1.SigningCosmWasmClient.connectWithSigner(testutils_spec_1.wasmd.endpoint, wallet);
                const { codeId } = await client.upload(testutils_spec_1.alice.address0, testutils_spec_1.getHackatom().data, testutils_spec_1.defaultUploadFee);
                const instantiateMsg = { verifier: testutils_spec_1.makeRandomAddress(), beneficiary: testutils_spec_1.makeRandomAddress() };
                const label = "a different hackatom";
                const { contractAddress } = await client.instantiate(testutils_spec_1.alice.address0, codeId, instantiateMsg, label, testutils_spec_1.defaultInstantiateFee);
                contract = { instantiateMsg: instantiateMsg, address: contractAddress };
            }
        });
        it("works", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(contract);
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            const result = await client.queryContractSmart(contract.address, { verifier: {} });
            expect(result).toEqual({ verifier: contract.instantiateMsg.verifier });
        });
        it("errors for malformed query message", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(contract);
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            await expectAsync(client.queryContractSmart(contract.address, { broken: {} })).toBeRejectedWithError(/Error parsing into type hackatom::msg::QueryMsg: unknown variant/i);
        });
        it("errors for non-existent contract", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const nonExistentAddress = testutils_spec_1.makeRandomAddress();
            const client = await cosmwasmclient_1.CosmWasmClient.connect(testutils_spec_1.wasmd.endpoint);
            await expectAsync(client.queryContractSmart(nonExistentAddress, { verifier: {} })).toBeRejectedWithError(/not found/i);
        });
    });
});
//# sourceMappingURL=cosmwasmclient.spec.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyingDirectSecp256k1HdWallet = exports.ModifyingSecp256k1HdWallet = exports.makeWasmClient = exports.fromOneElementArray = exports.pendingWithoutCw1 = exports.cw1Enabled = exports.pendingWithoutCw3 = exports.cw3Enabled = exports.pendingWithoutWasmd = exports.wasmdEnabled = exports.deployedCw1 = exports.deployedCw3 = exports.deployedIbcReflect = exports.deployedHackatom = exports.validator = exports.unused = exports.alice = exports.bech32AddressMatcher = exports.base64Matcher = exports.tendermintIdMatcher = exports.makeRandomAddress = exports.getHackatom = exports.defaultSigningClientOptions = exports.wasmd = exports.defaultClearAdminFee = exports.defaultUpdateAdminFee = exports.defaultMigrateFee = exports.defaultExecuteFee = exports.defaultInstantiateFee = exports.defaultUploadFee = exports.defaultSendFee = exports.defaultGasPrice = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const queries_1 = require("./queries");
const contract_json_1 = __importDefault(require("./testdata/contract.json"));
exports.defaultGasPrice = stargate_1.GasPrice.fromString("0.025ucosm");
exports.defaultSendFee = stargate_1.calculateFee(80000, exports.defaultGasPrice);
exports.defaultUploadFee = stargate_1.calculateFee(1500000, exports.defaultGasPrice);
exports.defaultInstantiateFee = stargate_1.calculateFee(500000, exports.defaultGasPrice);
exports.defaultExecuteFee = stargate_1.calculateFee(200000, exports.defaultGasPrice);
exports.defaultMigrateFee = stargate_1.calculateFee(200000, exports.defaultGasPrice);
exports.defaultUpdateAdminFee = stargate_1.calculateFee(80000, exports.defaultGasPrice);
exports.defaultClearAdminFee = stargate_1.calculateFee(80000, exports.defaultGasPrice);
exports.wasmd = {
    blockTime: 1000,
    chainId: "testing",
    endpoint: "http://localhost:26659",
    prefix: "wasm",
    validator: {
        address: "wasmvaloper1m4vhsgne6u74ff78vf0tvkjq3q4hjf9vjfrmy2",
    },
};
/** Setting to speed up testing */
exports.defaultSigningClientOptions = {
    broadcastPollIntervalMs: 300,
    broadcastTimeoutMs: 8000,
};
function getHackatom() {
    return {
        data: encoding_1.fromBase64(contract_json_1.default.data),
    };
}
exports.getHackatom = getHackatom;
function makeRandomAddress() {
    return encoding_1.Bech32.encode("wasm", crypto_1.Random.getBytes(20));
}
exports.makeRandomAddress = makeRandomAddress;
exports.tendermintIdMatcher = /^[0-9A-F]{64}$/;
/** @see https://rgxdb.com/r/1NUN74O6 */
exports.base64Matcher = /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/;
// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
exports.bech32AddressMatcher = /^[\x21-\x7e]{1,83}1[02-9ac-hj-np-z]{38}$/;
exports.alice = {
    mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
    pubkey0: {
        type: "tendermint/PubKeySecp256k1",
        value: "A9cXhWb8ZpqCzkA8dQCPV29KdeRLV3rUYxrkHudLbQtS",
    },
    address0: "wasm14qemq0vw6y3gc3u3e0aty2e764u4gs5lndxgyk",
    address1: "wasm1hhg2rlu9jscacku2wwckws7932qqqu8xm5ca8y",
    address2: "wasm1xv9tklw7d82sezh9haa573wufgy59vmwnxhnsl",
    address3: "wasm17yg9mssjenmc3jkqth6ulcwj9cxujrxxg9nmzk",
    address4: "wasm1f7j7ryulwjfe9ljplvhtcaxa6wqgula3nh873j",
};
/** Unused account */
exports.unused = {
    pubkey: {
        type: "tendermint/PubKeySecp256k1",
        value: "ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ",
    },
    address: "wasm1cjsxept9rkggzxztslae9ndgpdyt240842kpxh",
    accountNumber: 16,
    sequence: 0,
};
exports.validator = {
    /**
     * delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/wasmd/template/.wasmd/config/genesis.json
     *
     * `jq ".app_state.genutil.gen_txs[0].body.messages[0].delegator_address" scripts/wasmd/template/.wasmd/config/genesis.json`
     */
    delegatorAddress: "wasm1tjgue6r5kqj5dets24pwaa9u7wuzucpwuva0rv",
    /**
     * validator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/wasmd/template/.wasmd/config/genesis.json
     *
     * `jq ".app_state.genutil.gen_txs[0].body.messages[0].validator_address" scripts/wasmd/template/.wasmd/config/genesis.json`
     */
    validatorAddress: "wasmvaloper1tjgue6r5kqj5dets24pwaa9u7wuzucpwfsgndk",
    accountNumber: 0,
    sequence: 1,
};
/** Deployed as part of scripts/wasmd/init.sh */
exports.deployedHackatom = {
    codeId: 1,
    checksum: "716a97b1c086e0d7769ae7887edaa0e34faba2d7b8cda07f741f9fbf95706e8c",
    instances: [
        {
            beneficiary: exports.alice.address0,
            address: "wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujgqwg3",
            label: "From deploy_hackatom.js (0)",
        },
        {
            beneficiary: exports.alice.address1,
            address: "wasm1suhgf5svhu4usrurvxzlgn54ksxmn8glszahxx",
            label: "From deploy_hackatom.js (1)",
        },
        {
            beneficiary: exports.alice.address2,
            address: "wasm1yyca08xqdgvjz0psg56z67ejh9xms6l49ntww0",
            label: "From deploy_hackatom.js (2)",
        },
    ],
};
/** Deployed as part of scripts/wasmd/init.sh */
exports.deployedIbcReflect = {
    codeId: 2,
    instances: [
        {
            address: "wasm1aakfpghcanxtc45gpqlx8j3rq0zcpyf4duy76f",
            ibcPortId: "wasm.wasm1aakfpghcanxtc45gpqlx8j3rq0zcpyf4duy76f",
        },
    ],
};
/** Deployed as part of scripts/wasmd/init.sh */
exports.deployedCw3 = {
    codeId: 3,
    instances: [
        "wasm1xqeym28j9xgv0p93pwwt6qcxf9tdvf9z83duy9",
        "wasm1jka38ckju8cpjap00jf9xdvdyttz9cauchu0zl",
        "wasm12dnl585uxzddjw9hw4ca694f054shgpgffnawy", // Multisig (uneven weights)
    ],
};
/** Deployed as part of scripts/wasmd/init.sh */
exports.deployedCw1 = {
    codeId: 4,
    instances: ["wasm1vs2vuks65rq7xj78mwtvn7vvnm2gn7ad78g6yp"],
};
function wasmdEnabled() {
    return !!process.env.WASMD_ENABLED;
}
exports.wasmdEnabled = wasmdEnabled;
function pendingWithoutWasmd() {
    if (!wasmdEnabled()) {
        return pending("Set WASMD_ENABLED to enable Wasmd-based tests");
    }
}
exports.pendingWithoutWasmd = pendingWithoutWasmd;
function cw3Enabled() {
    return !!process.env.CW3_ENABLED;
}
exports.cw3Enabled = cw3Enabled;
function pendingWithoutCw3() {
    if (!cw3Enabled()) {
        return pending("Set CW3_ENABLED to enable CW3-based tests");
    }
}
exports.pendingWithoutCw3 = pendingWithoutCw3;
function cw1Enabled() {
    return !!process.env.CW1_ENABLED;
}
exports.cw1Enabled = cw1Enabled;
function pendingWithoutCw1() {
    if (!cw1Enabled()) {
        return pending("Set CW1_ENABLED to enable CW1-based tests");
    }
}
exports.pendingWithoutCw1 = pendingWithoutCw1;
/** Returns first element. Throws if array has a different length than 1. */
function fromOneElementArray(elements) {
    if (elements.length !== 1)
        throw new Error(`Expected exactly one element but got ${elements.length}`);
    return elements[0];
}
exports.fromOneElementArray = fromOneElementArray;
async function makeWasmClient(endpoint) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(endpoint);
    return stargate_1.QueryClient.withExtensions(tmClient, stargate_1.setupAuthExtension, stargate_1.setupBankExtension, queries_1.setupWasmExtension);
}
exports.makeWasmClient = makeWasmClient;
/**
 * A class for testing clients using an Amino signer which modifies the transaction it receives before signing
 */
class ModifyingSecp256k1HdWallet extends amino_1.Secp256k1HdWallet {
    static async fromMnemonic(mnemonic, options = {}) {
        const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
        const seed = await crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
        return new ModifyingSecp256k1HdWallet(mnemonicChecked, Object.assign(Object.assign({}, options), { seed: seed }));
    }
    async signAmino(signerAddress, signDoc) {
        const modifiedSignDoc = Object.assign(Object.assign({}, signDoc), { fee: {
                amount: stargate_1.coins(3000, "ucosm"),
                gas: "333333",
            }, memo: "This was modified" });
        return super.signAmino(signerAddress, modifiedSignDoc);
    }
}
exports.ModifyingSecp256k1HdWallet = ModifyingSecp256k1HdWallet;
/**
 * A class for testing clients using a direct signer which modifies the transaction it receives before signing
 */
class ModifyingDirectSecp256k1HdWallet extends proto_signing_1.DirectSecp256k1HdWallet {
    static async fromMnemonic(mnemonic, options = {}) {
        const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
        const seed = await crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
        return new ModifyingDirectSecp256k1HdWallet(mnemonicChecked, Object.assign(Object.assign({}, options), { seed: seed }));
    }
    async signDirect(address, signDoc) {
        const txBody = tx_1.TxBody.decode(signDoc.bodyBytes);
        const modifiedTxBody = tx_1.TxBody.fromPartial(Object.assign(Object.assign({}, txBody), { memo: "This was modified" }));
        const authInfo = tx_1.AuthInfo.decode(signDoc.authInfoBytes);
        const signers = authInfo.signerInfos.map((signerInfo) => ({
            pubkey: signerInfo.publicKey,
            sequence: signerInfo.sequence.toNumber(),
        }));
        const modifiedFeeAmount = stargate_1.coins(3000, "ucosm");
        const modifiedGasLimit = 333333;
        const modifiedSignDoc = Object.assign(Object.assign({}, signDoc), { bodyBytes: Uint8Array.from(tx_1.TxBody.encode(modifiedTxBody).finish()), authInfoBytes: proto_signing_1.makeAuthInfoBytes(signers, modifiedFeeAmount, modifiedGasLimit, signing_1.SignMode.SIGN_MODE_DIRECT) });
        return super.signDirect(address, modifiedSignDoc);
    }
}
exports.ModifyingDirectSecp256k1HdWallet = ModifyingDirectSecp256k1HdWallet;
//# sourceMappingURL=testutils.spec.js.map
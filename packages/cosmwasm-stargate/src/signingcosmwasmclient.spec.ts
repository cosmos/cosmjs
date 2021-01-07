/* eslint-disable @typescript-eslint/naming-convention */
import { UploadMeta } from "@cosmjs/cosmwasm-launchpad";
import { sha256 } from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";
import { coin, coins, GasPrice } from "@cosmjs/launchpad";
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, codec } from "@cosmjs/stargate";
import { assert, sleep } from "@cosmjs/utils";
import Long from "long";

import { PrivateSigningCosmWasmClient, SigningCosmWasmClient } from "./signingcosmwasmclient";
import {
  alice,
  getHackatom,
  makeRandomAddress,
  makeWasmClient,
  ModifyingDirectSecp256k1HdWallet,
  pendingWithoutWasmd,
  unused,
  validator,
  wasmd,
} from "./testutils.spec";

const { MsgDelegate } = codec.cosmos.staking.v1beta1;
const { Tx } = codec.cosmos.tx.v1beta1;

describe("SigningCosmWasmClient", () => {
  describe("connectWithWallet", () => {
    it("can be constructed", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      expect(client).toBeTruthy();
    });

    it("can be constructed with custom gas price", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const gasPrice = GasPrice.fromString("3.14utest");
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet, { gasPrice });
      const openedClient = (client as unknown) as PrivateSigningCosmWasmClient;
      expect(openedClient.fees).toEqual({
        upload: {
          amount: coins(4710000, "utest"),
          gas: "1500000",
        },
        init: {
          amount: coins(1570000, "utest"),
          gas: "500000",
        },
        migrate: {
          amount: coins(628000, "utest"),
          gas: "200000",
        },
        exec: {
          amount: coins(628000, "utest"),
          gas: "200000",
        },
        send: {
          amount: coins(251200, "utest"),
          gas: "80000",
        },
        changeAdmin: {
          amount: coins(251200, "utest"),
          gas: "80000",
        },
      });
    });

    it("can be constructed with custom gas limits", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const gasLimits = {
        send: 160000,
      };
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet, { gasLimits });
      const openedClient = (client as unknown) as PrivateSigningCosmWasmClient;
      expect(openedClient.fees).toEqual({
        upload: {
          amount: coins(37500, "ucosm"),
          gas: "1500000",
        },
        init: {
          amount: coins(12500, "ucosm"),
          gas: "500000",
        },
        migrate: {
          amount: coins(5000, "ucosm"),
          gas: "200000",
        },
        exec: {
          amount: coins(5000, "ucosm"),
          gas: "200000",
        },
        send: {
          amount: coins(4000, "ucosm"),
          gas: "160000",
        },
        changeAdmin: {
          amount: coins(2000, "ucosm"),
          gas: "80000",
        },
      });
    });

    it("can be constructed with custom gas price and gas limits", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const gasPrice = GasPrice.fromString("3.14utest");
      const gasLimits = {
        send: 160000,
      };
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet, {
        gasPrice,
        gasLimits,
      });
      const openedClient = (client as unknown) as PrivateSigningCosmWasmClient;
      expect(openedClient.fees).toEqual({
        upload: {
          amount: coins(4710000, "utest"),
          gas: "1500000",
        },
        init: {
          amount: coins(1570000, "utest"),
          gas: "500000",
        },
        migrate: {
          amount: coins(628000, "utest"),
          gas: "200000",
        },
        exec: {
          amount: coins(628000, "utest"),
          gas: "200000",
        },
        send: {
          amount: coins(502400, "utest"),
          gas: "160000",
        },
        changeAdmin: {
          amount: coins(251200, "utest"),
          gas: "80000",
        },
      });
    });
  });

  describe("upload", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const wasm = getHackatom().data;
      const {
        codeId,
        originalChecksum,
        originalSize,
        compressedChecksum,
        compressedSize,
      } = await client.upload(alice.address0, wasm);
      expect(originalChecksum).toEqual(toHex(sha256(wasm)));
      expect(originalSize).toEqual(wasm.length);
      expect(compressedChecksum).toMatch(/^[0-9a-f]{64}$/);
      expect(compressedSize).toBeLessThan(wasm.length * 0.5);
      expect(codeId).toBeGreaterThanOrEqual(1);
    });

    it("can set builder and source", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const hackatom = getHackatom();
      const meta: UploadMeta = {
        source: "https://crates.io/api/v1/crates/cw-nameservice/0.1.0/download",
        builder: "confio/cosmwasm-opt:0.6.2",
      };
      const { codeId } = await client.upload(alice.address0, hackatom.data, meta);
      const codeDetails = await client.getCodeDetails(codeId);
      expect(codeDetails.source).toEqual(meta.source);
      expect(codeDetails.builder).toEqual(meta.builder);
    });
  });

  describe("instantiate", () => {
    it("works with transfer amount", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const { codeId } = await client.upload(alice.address0, getHackatom().data);
      const transferAmount = [coin(1234, "ucosm"), coin(321, "ustake")];
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        alice.address0,
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          memo: "Let's see if the memo is used",
          transferAmount,
        },
      );
      const wasmClient = await makeWasmClient(wasmd.endpoint);
      const ucosmBalance = await wasmClient.bank.balance(contractAddress, "ucosm");
      expect(ucosmBalance).toEqual(transferAmount[0]);
      const ustakeBalance = await wasmClient.bank.balance(contractAddress, "ustake");
      expect(ustakeBalance).toEqual(transferAmount[1]);
    });

    it("works with admin", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const { codeId } = await client.upload(alice.address0, getHackatom().data);
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        alice.address0,
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        { admin: unused.address },
      );
      const wasmClient = await makeWasmClient(wasmd.endpoint);
      const { contractInfo } = await wasmClient.unverified.wasm.getContractInfo(contractAddress);
      assert(contractInfo);
      expect(contractInfo.admin).toEqual(unused.address);
    });

    it("can instantiate one code multiple times", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const { codeId } = await client.upload(alice.address0, getHackatom().data);
      const contractAddress1 = await client.instantiate(
        alice.address0,
        codeId,
        {
          verifier: alice.address0,
          beneficiary: makeRandomAddress(),
        },
        "contract 1",
      );
      const contractAddress2 = await client.instantiate(
        alice.address0,
        codeId,
        {
          verifier: alice.address0,
          beneficiary: makeRandomAddress(),
        },
        "contract 2",
      );
      expect(contractAddress1).not.toEqual(contractAddress2);
    });
  });

  describe("updateAdmin", () => {
    it("can update an admin", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const { codeId } = await client.upload(alice.address0, getHackatom().data);
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        alice.address0,
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          admin: alice.address0,
        },
      );
      const wasmClient = await makeWasmClient(wasmd.endpoint);
      const { contractInfo: contractInfo1 } = await wasmClient.unverified.wasm.getContractInfo(
        contractAddress,
      );
      assert(contractInfo1);
      expect(contractInfo1.admin).toEqual(alice.address0);

      await client.updateAdmin(alice.address0, contractAddress, unused.address);
      const { contractInfo: contractInfo2 } = await wasmClient.unverified.wasm.getContractInfo(
        contractAddress,
      );
      assert(contractInfo2);
      expect(contractInfo2.admin).toEqual(unused.address);
    });
  });

  describe("clearAdmin", () => {
    it("can clear an admin", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const { codeId } = await client.upload(alice.address0, getHackatom().data);
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        alice.address0,
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          admin: alice.address0,
        },
      );
      const wasmClient = await makeWasmClient(wasmd.endpoint);
      const { contractInfo: contractInfo1 } = await wasmClient.unverified.wasm.getContractInfo(
        contractAddress,
      );
      assert(contractInfo1);
      expect(contractInfo1.admin).toEqual(alice.address0);

      await client.clearAdmin(alice.address0, contractAddress);
      const { contractInfo: contractInfo2 } = await wasmClient.unverified.wasm.getContractInfo(
        contractAddress,
      );
      assert(contractInfo2);
      expect(contractInfo2.admin).toEqual("");
    });
  });

  describe("migrate", () => {
    it("can can migrate from one code ID to another", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const { codeId: codeId1 } = await client.upload(alice.address0, getHackatom().data);
      const { codeId: codeId2 } = await client.upload(alice.address0, getHackatom().data);
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        alice.address0,
        codeId1,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          admin: alice.address0,
        },
      );
      const wasmClient = await makeWasmClient(wasmd.endpoint);
      const { contractInfo: contractInfo1 } = await wasmClient.unverified.wasm.getContractInfo(
        contractAddress,
      );
      assert(contractInfo1);
      expect(contractInfo1.admin).toEqual(alice.address0);

      const newVerifier = makeRandomAddress();
      await client.migrate(alice.address0, contractAddress, codeId2, { verifier: newVerifier });
      const { contractInfo: contractInfo2 } = await wasmClient.unverified.wasm.getContractInfo(
        contractAddress,
      );
      assert(contractInfo2);
      expect({ ...contractInfo2 }).toEqual({
        ...contractInfo1,
        codeId: Long.fromNumber(codeId2, true),
      });
    });
  });

  describe("execute", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
      const { codeId } = await client.upload(alice.address0, getHackatom().data);
      // instantiate
      const transferAmount = [coin(233444, "ucosm"), coin(5454, "ustake")];
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        alice.address0,
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "amazing random contract",
        {
          transferAmount,
        },
      );
      // execute
      const result = await client.execute(alice.address0, contractAddress, { release: {} }, undefined);
      const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
      assert(wasmEvent, "Event of type wasm expected");
      expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
      expect(wasmEvent.attributes).toContain({
        key: "destination",
        value: beneficiaryAddress,
      });
      // Verify token transfer from contract to beneficiary
      const wasmClient = await makeWasmClient(wasmd.endpoint);
      const beneficiaryBalanceUcosm = await wasmClient.bank.balance(beneficiaryAddress, "ucosm");
      expect(beneficiaryBalanceUcosm).toEqual(transferAmount[0]);
      const beneficiaryBalanceUstake = await wasmClient.bank.balance(beneficiaryAddress, "ustake");
      expect(beneficiaryBalanceUstake).toEqual(transferAmount[1]);
      const contractBalanceUcosm = await wasmClient.bank.balance(contractAddress, "ucosm");
      expect(contractBalanceUcosm).toEqual(coin(0, "ucosm"));
      const contractBalanceUstake = await wasmClient.bank.balance(contractAddress, "ustake");
      expect(contractBalanceUstake).toEqual(coin(0, "ustake"));
    });
  });

  describe("sendTokens", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);

      const transferAmount = coins(7890, "ucosm");
      const beneficiaryAddress = makeRandomAddress();
      const memo = "for dinner";

      // no tokens here
      const before = await client.getBalance(beneficiaryAddress, "ucosm");
      expect(before).toBeNull();

      // send
      const result = await client.sendTokens(alice.address0, beneficiaryAddress, transferAmount, memo);
      assertIsBroadcastTxSuccess(result);
      expect(result.rawLog).toBeTruthy();

      // got tokens
      const after = await client.getBalance(beneficiaryAddress, "ucosm");
      assert(after);
      expect(after).toEqual(transferAmount[0]);
    });
  });

  describe("signAndBroadcast", () => {
    describe("direct mode", () => {
      it("works", async () => {
        pendingWithoutWasmd();
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
        const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
        const registry = new Registry();
        registry.register(msgDelegateTypeUrl, MsgDelegate);
        const options = { registry: registry };
        const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet, options);

        const msg = MsgDelegate.create({
          delegatorAddress: alice.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        });
        const msgAny = {
          typeUrl: msgDelegateTypeUrl,
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "180000", // 180k
        };
        const memo = "Use your power wisely";
        const result = await client.signAndBroadcast(alice.address0, [msgAny], fee, memo);
        assertIsBroadcastTxSuccess(result);
      });

      it("works with a modifying signer", async () => {
        pendingWithoutWasmd();
        const wallet = await ModifyingDirectSecp256k1HdWallet.fromMnemonic(
          alice.mnemonic,
          undefined,
          wasmd.prefix,
        );
        const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
        const registry = new Registry();
        registry.register(msgDelegateTypeUrl, MsgDelegate);
        const options = { registry: registry };
        const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet, options);

        const msg = MsgDelegate.create({
          delegatorAddress: alice.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        });
        const msgAny = {
          typeUrl: msgDelegateTypeUrl,
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "180000", // 180k
        };
        const memo = "Use your power wisely";
        const result = await client.signAndBroadcast(alice.address0, [msgAny], fee, memo);
        assertIsBroadcastTxSuccess(result);

        await sleep(1000);

        const searchResult = await client.getTx(result.transactionHash);
        assert(searchResult, "Must find transaction");
        const tx = Tx.decode(searchResult.tx);
        // From ModifyingDirectSecp256k1HdWallet
        expect(tx.body!.memo).toEqual("This was modified");
        expect({ ...tx.authInfo!.fee!.amount![0] }).toEqual(coin(3000, "ucosm"));
        expect(tx.authInfo!.fee!.gasLimit!.toNumber()).toEqual(333333);
      });
    });
  });
});

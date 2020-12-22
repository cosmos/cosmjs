/* eslint-disable @typescript-eslint/naming-convention */
import { Code } from "@cosmjs/cosmwasm-launchpad";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromAscii, fromBase64, fromHex, toAscii, toBase64 } from "@cosmjs/encoding";
import { coins, logs, StdFee } from "@cosmjs/launchpad";
import { Int53 } from "@cosmjs/math";
import {
  DirectSecp256k1HdWallet,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignDoc,
  Registry,
} from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, codec, parseRawLog } from "@cosmjs/stargate";
import { assert, sleep } from "@cosmjs/utils";
import { ReadonlyDate } from "readonly-date";

import { CosmWasmClient, PrivateCosmWasmClient } from "./cosmwasmclient";
import { SigningCosmWasmClient } from "./signingcosmwasmclient";
import {
  alice,
  deployedHackatom,
  getHackatom,
  makeRandomAddress,
  pendingWithoutWasmd,
  tendermintIdMatcher,
  unused,
  wasmd,
  wasmdEnabled,
} from "./testutils.spec";

const { TxRaw } = codec.cosmos.tx.v1beta1;

interface HackatomInstance {
  readonly initMsg: {
    readonly verifier: string;
    readonly beneficiary: string;
  };
  readonly address: string;
}

describe("CosmWasmClient", () => {
  describe("connect", () => {
    it("can be constructed", async () => {
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      expect(client).toBeTruthy();
    });
  });

  describe("getChainId", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      expect(await client.getChainId()).toEqual(wasmd.chainId);
    });

    it("caches chain ID", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const getCodeSpy = spyOn(openedClient.tmClient, "status").and.callThrough();

      expect(await client.getChainId()).toEqual(wasmd.chainId); // from network
      expect(await client.getChainId()).toEqual(wasmd.chainId); // from cache

      expect(getCodeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getHeight", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);

      const height1 = await client.getHeight();
      expect(height1).toBeGreaterThan(0);

      await sleep(wasmd.blockTime * 1.4); // tolerate chain being 40% slower than expected

      const height2 = await client.getHeight();
      expect(height2).toBeGreaterThanOrEqual(height1 + 1);
      expect(height2).toBeLessThanOrEqual(height1 + 2);
    });
  });

  describe("getSequence", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      expect(await client.getSequence(unused.address)).toEqual({
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });
    });

    it("returns null for missing accounts", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const missing = makeRandomAddress();
      expect(await client.getSequence(missing)).toBeNull();
    });
  });

  describe("getAccount", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      expect(await client.getAccount(unused.address)).toEqual({
        address: unused.address,
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
        pubkey: null,
      });
    });

    it("returns null for missing accounts", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const missing = makeRandomAddress();
      expect(await client.getAccount(missing)).toBeNull();
    });
  });

  describe("getBlock", () => {
    it("works for latest block", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const response = await client.getBlock();

      // id
      expect(response.id).toMatch(tendermintIdMatcher);

      // header
      expect(response.header.height).toBeGreaterThanOrEqual(1);
      expect(response.header.chainId).toEqual(await client.getChainId());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );

      // txs
      expect(Array.isArray(response.txs)).toEqual(true);
    });

    it("works for block by height", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const height = (await client.getBlock()).header.height;
      const response = await client.getBlock(height - 1);

      // id
      expect(response.id).toMatch(tendermintIdMatcher);

      // header
      expect(response.header.height).toEqual(height - 1);
      expect(response.header.chainId).toEqual(await client.getChainId());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );

      // txs
      expect(Array.isArray(response.txs)).toEqual(true);
    });
  });

  describe("broadcastTx", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const registry = new Registry();

      const memo = "My first contract on chain";
      const sendMsg = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
          fromAddress: alice.address0,
          toAddress: makeRandomAddress(),
          amount: coins(1234567, "ucosm"),
        },
      };
      const fee: StdFee = {
        amount: coins(5000, "ucosm"),
        gas: "890000",
      };

      const chainId = await client.getChainId();
      const sequenceResponse = await client.getSequence(alice.address0);
      assert(sequenceResponse);
      const { accountNumber, sequence } = sequenceResponse;
      const pubkeyAny = encodePubkey(alice.pubkey0);
      const txBody = {
        messages: [sendMsg],
        memo: memo,
      };
      const txBodyBytes = registry.encode({
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: txBody,
      });
      const gasLimit = Int53.fromString(fee.gas).toNumber();
      const authInfoBytes = makeAuthInfoBytes([pubkeyAny], fee.amount, gasLimit, sequence);
      const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
      const { signed, signature } = await wallet.signDirect(alice.address0, signDoc);
      const txRaw = TxRaw.create({
        bodyBytes: signed.bodyBytes,
        authInfoBytes: signed.authInfoBytes,
        signatures: [fromBase64(signature.signature)],
      });
      const signedTx = Uint8Array.from(TxRaw.encode(txRaw).finish());
      const result = await client.broadcastTx(signedTx);
      assertIsBroadcastTxSuccess(result);
      const amountAttr = logs.findAttribute(parseRawLog(result.rawLog), "transfer", "amount");
      expect(amountAttr.value).toEqual("1234567ucosm");
      expect(result.transactionHash).toMatch(/^[0-9A-F]{64}$/);
    });
  });

  describe("getCodes", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const result = await client.getCodes();
      expect(result.length).toBeGreaterThanOrEqual(1);
      const [first] = result;
      expect(first).toEqual({
        id: deployedHackatom.codeId,
        source: deployedHackatom.source,
        builder: deployedHackatom.builder,
        checksum: deployedHackatom.checksum,
        creator: alice.address0,
      });
    });
  });

  describe("getCodeDetails", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const result = await client.getCodeDetails(1);

      const expectedInfo: Code = {
        id: deployedHackatom.codeId,
        source: deployedHackatom.source,
        builder: deployedHackatom.builder,
        checksum: deployedHackatom.checksum,
        creator: alice.address0,
      };

      // check info
      expect(result).toEqual(jasmine.objectContaining(expectedInfo));
      // check data
      expect(sha256(result.data)).toEqual(fromHex(expectedInfo.checksum));
    });

    it("caches downloads", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const getCodeSpy = spyOn(openedClient.queryClient.unverified.wasm, "getCode").and.callThrough();

      const result1 = await client.getCodeDetails(deployedHackatom.codeId); // from network
      const result2 = await client.getCodeDetails(deployedHackatom.codeId); // from cache
      expect(result2).toEqual(result1);

      expect(getCodeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getContracts", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const result = await client.getContracts(1);
      expect(result.length).toBeGreaterThanOrEqual(3);
      const [zero, one, two] = result;
      expect(zero).toEqual({
        address: deployedHackatom.instances[0].address,
        codeId: deployedHackatom.codeId,
        creator: alice.address0,
        admin: undefined,
        label: deployedHackatom.instances[0].label,
      });
      expect(one).toEqual({
        address: deployedHackatom.instances[1].address,
        codeId: deployedHackatom.codeId,
        creator: alice.address0,
        admin: undefined,
        label: deployedHackatom.instances[1].label,
      });
      expect(two).toEqual({
        address: deployedHackatom.instances[2].address,
        codeId: deployedHackatom.codeId,
        creator: alice.address0,
        admin: alice.address1,
        label: deployedHackatom.instances[2].label,
      });
    });
  });

  describe("getContract", () => {
    it("works for instance without admin", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const zero = await client.getContract(deployedHackatom.instances[0].address);
      expect(zero).toEqual({
        address: deployedHackatom.instances[0].address,
        codeId: deployedHackatom.codeId,
        creator: alice.address0,
        label: deployedHackatom.instances[0].label,
        admin: undefined,
      });
    });

    it("works for instance with admin", async () => {
      pendingWithoutWasmd();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const two = await client.getContract(deployedHackatom.instances[2].address);
      expect(two).toEqual(
        jasmine.objectContaining({
          address: deployedHackatom.instances[2].address,
          codeId: deployedHackatom.codeId,
          creator: alice.address0,
          label: deployedHackatom.instances[2].label,
          admin: alice.address1,
        }),
      );
    });
  });

  describe("queryContractRaw", () => {
    const configKey = toAscii("config");
    const otherKey = toAscii("this_does_not_exist");
    let contract: HackatomInstance | undefined;

    beforeAll(async () => {
      if (wasmdEnabled()) {
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
        const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
        const { codeId } = await client.upload(alice.address0, getHackatom().data);
        const initMsg = { verifier: makeRandomAddress(), beneficiary: makeRandomAddress() };
        const { contractAddress } = await client.instantiate(
          alice.address0,
          codeId,
          initMsg,
          "random hackatom",
        );
        contract = { initMsg: initMsg, address: contractAddress };
      }
    });

    it("can query existing key", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const raw = await client.queryContractRaw(contract.address, configKey);
      assert(raw, "must get result");
      expect(JSON.parse(fromAscii(raw))).toEqual({
        verifier: toBase64(Bech32.decode(contract.initMsg.verifier).data),
        beneficiary: toBase64(Bech32.decode(contract.initMsg.beneficiary).data),
        funder: toBase64(Bech32.decode(alice.address0).data),
      });
    });

    it("can query non-existent key", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const raw = await client.queryContractRaw(contract.address, otherKey);
      assert(raw, "must get result");
      expect(Uint8Array.from(raw)).toEqual(new Uint8Array());
    });

    it("errors for non-existent contract", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const nonExistentAddress = makeRandomAddress();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      await expectAsync(client.queryContractRaw(nonExistentAddress, configKey)).toBeRejectedWithError(
        /not found/i,
      );
    });
  });

  describe("queryContractSmart", () => {
    let contract: HackatomInstance | undefined;

    beforeAll(async () => {
      if (wasmdEnabled()) {
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, undefined, wasmd.prefix);
        const client = await SigningCosmWasmClient.connectWithWallet(wasmd.endpoint, wallet);
        const { codeId } = await client.upload(alice.address0, getHackatom().data);
        const initMsg = { verifier: makeRandomAddress(), beneficiary: makeRandomAddress() };
        const { contractAddress } = await client.instantiate(
          alice.address0,
          codeId,
          initMsg,
          "a different hackatom",
        );
        contract = { initMsg: initMsg, address: contractAddress };
      }
    });

    it("works", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const client = await CosmWasmClient.connect(wasmd.endpoint);
      const result = await client.queryContractSmart(contract.address, { verifier: {} });
      expect(result).toEqual({ verifier: contract.initMsg.verifier });
    });

    it("errors for malformed query message", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const client = await CosmWasmClient.connect(wasmd.endpoint);
      await expectAsync(client.queryContractSmart(contract.address, { broken: {} })).toBeRejectedWithError(
        /Error parsing into type hackatom::contract::QueryMsg: unknown variant/i,
      );
    });

    it("errors for non-existent contract", async () => {
      pendingWithoutWasmd();

      const nonExistentAddress = makeRandomAddress();
      const client = await CosmWasmClient.connect(wasmd.endpoint);
      await expectAsync(
        client.queryContractSmart(nonExistentAddress, { verifier: {} }),
      ).toBeRejectedWithError(/not found/i);
    });
  });
});

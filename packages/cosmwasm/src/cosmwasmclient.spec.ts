/* eslint-disable @typescript-eslint/naming-convention */
import { Sha256 } from "@cosmjs/crypto";
import { Bech32, fromHex, fromUtf8, toAscii, toBase64 } from "@cosmjs/encoding";
import {
  assertIsBroadcastTxSuccess,
  isWrappedStdTx,
  makeSignDoc,
  makeStdTx,
  MsgSend,
  Secp256k1HdWallet,
  StdFee,
} from "@cosmjs/launchpad";
import { assert, sleep } from "@cosmjs/utils";
import { ReadonlyDate } from "readonly-date";

import { Code, CosmWasmClient, PrivateCosmWasmClient } from "./cosmwasmclient";
import { findAttribute } from "./logs";
import { SigningCosmWasmClient } from "./signingcosmwasmclient";
import cosmoshub from "./testdata/cosmoshub.json";
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

const blockTime = 1_000; // ms

interface HackatomInstance {
  readonly initMsg: {
    readonly verifier: string;
    readonly beneficiary: string;
  };
  readonly address: string;
}

describe("CosmWasmClient", () => {
  describe("makeReadOnly", () => {
    it("can be constructed", () => {
      const client = new CosmWasmClient(wasmd.endpoint);
      expect(client).toBeTruthy();
    });
  });

  describe("getChainId", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      expect(await client.getChainId()).toEqual(wasmd.chainId);
    });

    it("caches chain ID", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const getCodeSpy = spyOn(openedClient.lcdClient, "nodeInfo").and.callThrough();

      expect(await client.getChainId()).toEqual(wasmd.chainId); // from network
      expect(await client.getChainId()).toEqual(wasmd.chainId); // from cache

      expect(getCodeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getHeight", () => {
    it("gets height via last block", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const blockLatestSpy = spyOn(openedClient.lcdClient, "blocksLatest").and.callThrough();

      const height1 = await client.getHeight();
      expect(height1).toBeGreaterThan(0);
      await sleep(blockTime * 1.4); // tolerate chain being 40% slower than expected
      const height2 = await client.getHeight();
      expect(height2).toBeGreaterThanOrEqual(height1 + 1);
      expect(height2).toBeLessThanOrEqual(height1 + 2);

      expect(blockLatestSpy).toHaveBeenCalledTimes(2);
    });

    it("gets height via authAccount once an address is known", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);

      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const blockLatestSpy = spyOn(openedClient.lcdClient, "blocksLatest").and.callThrough();
      const authAccountsSpy = spyOn(openedClient.lcdClient.auth, "account").and.callThrough();

      const height1 = await client.getHeight();
      expect(height1).toBeGreaterThan(0);

      await client.getCodes(); // warm up the client

      const height2 = await client.getHeight();
      expect(height2).toBeGreaterThan(0);
      await sleep(blockTime * 1.3); // tolerate chain being 30% slower than expected
      const height3 = await client.getHeight();
      expect(height3).toBeGreaterThanOrEqual(height2 + 1);
      expect(height3).toBeLessThanOrEqual(height2 + 2);

      expect(blockLatestSpy).toHaveBeenCalledTimes(1);
      expect(authAccountsSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("getSequence", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      expect(await client.getSequence(unused.address)).toEqual({
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });
    });

    it("throws for missing accounts", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      const missing = makeRandomAddress();
      await client.getSequence(missing).then(
        () => fail("this must not succeed"),
        (error) => expect(error).toMatch(/account does not exist on chain/i),
      );
    });
  });

  describe("getAccount", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      expect(await client.getAccount(unused.address)).toEqual({
        address: unused.address,
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
        pubkey: undefined,
        balance: [
          { denom: "ucosm", amount: "1000000000" },
          { denom: "ustake", amount: "1000000000" },
        ],
      });
    });

    it("returns undefined for missing accounts", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      const missing = makeRandomAddress();
      expect(await client.getAccount(missing)).toBeUndefined();
    });
  });

  describe("getBlock", () => {
    it("works for latest block", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
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
      const client = new CosmWasmClient(wasmd.endpoint);
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

  describe("getIdentifier", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      assert(isWrappedStdTx(cosmoshub.tx));
      expect(await client.getIdentifier(cosmoshub.tx)).toEqual(cosmoshub.id);
    });
  });

  describe("broadcastTx", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new CosmWasmClient(wasmd.endpoint);

      const memo = "My first contract on chain";
      const sendMsg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: alice.address0,
          to_address: makeRandomAddress(),
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const chainId = await client.getChainId();
      const { accountNumber, sequence } = await client.getSequence(alice.address0);
      const signDoc = makeSignDoc([sendMsg], fee, chainId, memo, accountNumber, sequence);
      const { signed, signature } = await wallet.sign(alice.address0, signDoc);
      const signedTx = makeStdTx(signed, signature);
      const result = await client.broadcastTx(signedTx);
      assertIsBroadcastTxSuccess(result);
      const { logs, transactionHash } = result;
      const amountAttr = findAttribute(logs, "transfer", "amount");
      expect(amountAttr.value).toEqual("1234567ucosm");
      expect(transactionHash).toMatch(/^[0-9A-F]{64}$/);
    });
  });

  describe("getCodes", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
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
      const client = new CosmWasmClient(wasmd.endpoint);
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
      expect(new Sha256(result.data).digest()).toEqual(fromHex(expectedInfo.checksum));
    });

    it("caches downloads", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const getCodeSpy = spyOn(openedClient.lcdClient.wasm, "getCode").and.callThrough();

      const result1 = await client.getCodeDetails(deployedHackatom.codeId); // from network
      const result2 = await client.getCodeDetails(deployedHackatom.codeId); // from cache
      expect(result2).toEqual(result1);

      expect(getCodeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getContracts", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
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
      const client = new CosmWasmClient(wasmd.endpoint);
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
      const client = new CosmWasmClient(wasmd.endpoint);
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
        pendingWithoutWasmd();
        const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
        const client = new SigningCosmWasmClient(wasmd.endpoint, alice.address0, wallet);
        const { codeId } = await client.upload(getHackatom().data);
        const initMsg = { verifier: makeRandomAddress(), beneficiary: makeRandomAddress() };
        const { contractAddress } = await client.instantiate(codeId, initMsg, "random hackatom");
        contract = { initMsg: initMsg, address: contractAddress };
      }
    });

    it("can query existing key", async () => {
      pendingWithoutWasmd();
      pending("Raw query API is broken in v0.11.0-rc (https://github.com/CosmWasm/wasmd/issues/283)");
      assert(contract);

      const client = new CosmWasmClient(wasmd.endpoint);
      const raw = await client.queryContractRaw(contract.address, configKey);
      assert(raw, "must get result");
      expect(JSON.parse(fromUtf8(raw))).toEqual({
        verifier: toBase64(Bech32.decode(contract.initMsg.verifier).data),
        beneficiary: toBase64(Bech32.decode(contract.initMsg.beneficiary).data),
        funder: toBase64(Bech32.decode(alice.address0).data),
      });
    });

    it("can query non-existent key", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const client = new CosmWasmClient(wasmd.endpoint);
      const raw = await client.queryContractRaw(contract.address, otherKey);
      expect(raw).toBeNull();
    });

    it("errors for non-existent contract", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const nonExistentAddress = makeRandomAddress();
      const client = new CosmWasmClient(wasmd.endpoint);
      await client.queryContractRaw(nonExistentAddress, configKey).then(
        () => fail("must not succeed"),
        (error) => expect(error).toMatch(`No contract found at address "${nonExistentAddress}"`),
      );
    });
  });

  describe("queryContractSmart", () => {
    let contract: HackatomInstance | undefined;

    beforeAll(async () => {
      if (wasmdEnabled()) {
        pendingWithoutWasmd();
        const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
        const client = new SigningCosmWasmClient(wasmd.endpoint, alice.address0, wallet);
        const { codeId } = await client.upload(getHackatom().data);
        const initMsg = { verifier: makeRandomAddress(), beneficiary: makeRandomAddress() };
        const { contractAddress } = await client.instantiate(codeId, initMsg, "a different hackatom");
        contract = { initMsg: initMsg, address: contractAddress };
      }
    });

    it("works", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const client = new CosmWasmClient(wasmd.endpoint);
      const resultDocument = await client.queryContractSmart(contract.address, { verifier: {} });
      expect(resultDocument).toEqual({ verifier: contract.initMsg.verifier });
    });

    it("errors for malformed query message", async () => {
      pendingWithoutWasmd();
      assert(contract);

      const client = new CosmWasmClient(wasmd.endpoint);
      await client.queryContractSmart(contract.address, { broken: {} }).then(
        () => fail("must not succeed"),
        (error) =>
          expect(error).toMatch(
            /query wasm contract failed: Error parsing into type hackatom::contract::QueryMsg: unknown variant/i,
          ),
      );
    });

    it("errors for non-existent contract", async () => {
      pendingWithoutWasmd();

      const nonExistentAddress = makeRandomAddress();
      const client = new CosmWasmClient(wasmd.endpoint);
      await client.queryContractSmart(nonExistentAddress, { verifier: {} }).then(
        () => fail("must not succeed"),
        (error) => expect(error).toMatch(`No contract found at address "${nonExistentAddress}"`),
      );
    });
  });
});

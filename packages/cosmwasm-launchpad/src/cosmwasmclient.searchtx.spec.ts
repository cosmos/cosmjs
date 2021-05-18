/* eslint-disable @typescript-eslint/naming-convention */
import {
  coins,
  isBroadcastTxFailure,
  isMsgSend,
  LcdClient,
  makeSignDoc,
  makeStdTx,
  MsgSend,
  Secp256k1HdWallet,
  WrappedStdTx,
} from "@cosmjs/launchpad";
import { assert, sleep } from "@cosmjs/utils";

import { CosmWasmClient } from "./cosmwasmclient";
import { isMsgExecuteContract, isMsgInstantiateContract } from "./msgs";
import { SigningCosmWasmClient } from "./signingcosmwasmclient";
import {
  alice,
  deployedErc20,
  erc20Enabled,
  fromOneElementArray,
  launchpad,
  launchpadEnabled,
  makeRandomAddress,
  pendingWithoutErc20,
  pendingWithoutLaunchpad,
} from "./testutils.spec";

interface TestTxSend {
  readonly sender: string;
  readonly recipient: string;
  readonly hash: string;
  readonly height: number;
  readonly tx: WrappedStdTx;
}

interface TestTxExecute {
  readonly sender: string;
  readonly contract: string;
  readonly hash: string;
  readonly height: number;
  readonly tx: WrappedStdTx;
}

describe("CosmWasmClient.getTx and .searchTx", () => {
  let sendSuccessful: TestTxSend | undefined;
  let sendSelfSuccessful: TestTxSend | undefined;
  let sendUnsuccessful: TestTxSend | undefined;
  let execute: TestTxExecute | undefined;

  beforeAll(async () => {
    if (launchpadEnabled() && erc20Enabled()) {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);

      {
        const recipient = makeRandomAddress();
        const amount = coins(1234567, "ucosm");
        const result = await client.sendTokens(recipient, amount);
        await sleep(75); // wait until tx is indexed
        const txDetails = await new LcdClient(launchpad.endpoint).txById(result.transactionHash);
        sendSuccessful = {
          sender: alice.address0,
          recipient: recipient,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails.tx,
        };
      }

      {
        const recipient = alice.address0;
        const amount = coins(2345678, "ucosm");
        const result = await client.sendTokens(recipient, amount);
        await sleep(75); // wait until tx is indexed
        const txDetails = await new LcdClient(launchpad.endpoint).txById(result.transactionHash);
        sendSelfSuccessful = {
          sender: alice.address0,
          recipient: recipient,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails.tx,
        };
      }

      {
        const memo = "Sending more than I can afford";
        const recipient = makeRandomAddress();
        const amount = coins(123456700000000, "ucosm");
        const sendMsg: MsgSend = {
          type: "cosmos-sdk/MsgSend",
          value: {
            from_address: alice.address0,
            to_address: recipient,
            amount: amount,
          },
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "80000", // 80k
        };
        const { accountNumber, sequence } = await client.getSequence();
        const chainId = await client.getChainId();
        const signDoc = makeSignDoc([sendMsg], fee, chainId, memo, accountNumber, sequence);
        const { signed, signature } = await wallet.signAmino(alice.address0, signDoc);
        const tx: WrappedStdTx = {
          type: "cosmos-sdk/StdTx",
          value: makeStdTx(signed, signature),
        };
        const transactionId = await client.getIdentifier(tx);
        const result = await client.broadcastTx(tx.value);
        if (isBroadcastTxFailure(result)) {
          sendUnsuccessful = {
            sender: alice.address0,
            recipient: recipient,
            hash: transactionId,
            height: result.height,
            tx: tx,
          };
        }
      }

      {
        const hashInstance = deployedErc20.instances[0];
        const msg = {
          approve: {
            spender: makeRandomAddress(),
            amount: "12",
          },
        };
        const result = await client.execute(hashInstance, msg);
        await sleep(75); // wait until tx is indexed
        const txDetails = await new LcdClient(launchpad.endpoint).txById(result.transactionHash);
        execute = {
          sender: alice.address0,
          contract: hashInstance,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails.tx,
        };
      }
    }
  });

  describe("getTx", () => {
    it("can get successful tx by ID", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const result = await client.getTx(sendSuccessful.hash);
      expect(result).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );
    });

    it("can get unsuccessful tx by ID", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const result = await client.getTx(sendUnsuccessful.hash);
      expect(result).toEqual(
        jasmine.objectContaining({
          height: sendUnsuccessful.height,
          hash: sendUnsuccessful.hash,
          code: 5,
          tx: sendUnsuccessful.tx,
        }),
      );
    });

    it("can get by ID (non existent)", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      const client = new CosmWasmClient(launchpad.endpoint);
      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
      const result = await client.getTx(nonExistentId);
      expect(result).toBeNull();
    });
  });

  describe("with SearchByHeightQuery", () => {
    it("can search successful tx by height", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const result = await client.searchTx({ height: sendSuccessful.height });
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result).toContain(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );
    });

    it("can search unsuccessful tx by height", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const result = await client.searchTx({ height: sendUnsuccessful.height });
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result).toContain(
        jasmine.objectContaining({
          height: sendUnsuccessful.height,
          hash: sendUnsuccessful.hash,
          code: 5,
          tx: sendUnsuccessful.tx,
        }),
      );
    });
  });

  describe("with SearchBySentFromOrToQuery", () => {
    it("can search by sender", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const results = await client.searchTx({ sentFromOrTo: sendSuccessful.sender });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const containsMsgWithSender = !!result.tx.value.msg.find(
          (msg) => isMsgSend(msg) && msg.value.from_address == sendSuccessful!.sender,
        );
        const containsMsgWithRecipient = !!result.tx.value.msg.find(
          (msg) => isMsgSend(msg) && msg.value.to_address === sendSuccessful!.sender,
        );
        expect(containsMsgWithSender || containsMsgWithRecipient).toEqual(true);
      }

      // Check details of most recent result (not sent to self)
      expect(results[results.length - 2]).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          tx: sendSuccessful.tx,
        }),
      );
    });

    it("can search by recipient", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const results = await client.searchTx({ sentFromOrTo: sendSuccessful.recipient });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(isMsgSend(msg), `${result.hash} (height ${result.height}) is not a bank send transaction`);
        expect(
          msg.value.to_address === sendSuccessful.recipient ||
            msg.value.from_address == sendSuccessful.recipient,
        ).toEqual(true);
      }

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          tx: sendSuccessful.tx,
        }),
      );
    });

    it("can search by sender or recipient (sorted and deduplicated)", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSelfSuccessful, "value must be set in beforeAll()");
      const txhash = sendSelfSuccessful.hash;
      const client = new CosmWasmClient(launchpad.endpoint);
      const results = await client.searchTx({ sentFromOrTo: sendSelfSuccessful.recipient });

      expect(Array.from(results).sort((tx1, tx2) => tx1.height - tx2.height)).toEqual(results);
      expect(results.filter((result) => result.hash === txhash).length).toEqual(1);
    });

    it("can search by recipient and filter by minHeight", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSuccessful);
      const client = new CosmWasmClient(launchpad.endpoint);
      const query = { sentFromOrTo: sendSuccessful.recipient };

      {
        const result = await client.searchTx(query, { minHeight: 0 });
        expect(result.length).toEqual(1);
      }

      {
        const result = await client.searchTx(query, { minHeight: sendSuccessful.height - 1 });
        expect(result.length).toEqual(1);
      }

      {
        const result = await client.searchTx(query, { minHeight: sendSuccessful.height });
        expect(result.length).toEqual(1);
      }

      {
        const result = await client.searchTx(query, { minHeight: sendSuccessful.height + 1 });
        expect(result.length).toEqual(0);
      }
    });

    it("can search by recipient and filter by maxHeight", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSuccessful);
      const client = new CosmWasmClient(launchpad.endpoint);
      const query = { sentFromOrTo: sendSuccessful.recipient };

      {
        const result = await client.searchTx(query, { maxHeight: 9999999999999 });
        expect(result.length).toEqual(1);
      }

      {
        const result = await client.searchTx(query, { maxHeight: sendSuccessful.height + 1 });
        expect(result.length).toEqual(1);
      }

      {
        const result = await client.searchTx(query, { maxHeight: sendSuccessful.height });
        expect(result.length).toEqual(1);
      }

      {
        const result = await client.searchTx(query, { maxHeight: sendSuccessful.height - 1 });
        expect(result.length).toEqual(0);
      }
    });
  });

  describe("with SearchByTagsQuery", () => {
    it("can search by transfer.recipient", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const results = await client.searchTx({
        tags: [{ key: "transfer.recipient", value: sendSuccessful.recipient }],
      });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(isMsgSend(msg), `${result.hash} (height ${result.height}) is not a bank send transaction`);
        expect(msg.value.to_address).toEqual(sendSuccessful.recipient);
      }

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          tx: sendSuccessful.tx,
        }),
      );
    });

    it("can search by message.contract_address", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(execute, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const results = await client.searchTx({
        tags: [{ key: "message.contract_address", value: execute.contract }],
      });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(
          isMsgExecuteContract(msg) || isMsgInstantiateContract(msg),
          `${result.hash} (at ${result.height}) not an execute or instantiate msg`,
        );
      }

      // Check that the first result is the instantiation
      const first = fromOneElementArray(results[0].tx.value.msg);
      assert(isMsgInstantiateContract(first), "First contract search result must be an instantiation");
      expect(first).toEqual({
        type: "wasm/MsgInstantiateContract",
        value: {
          sender: alice.address0,
          code_id: deployedErc20.codeId.toString(),
          label: "HASH",
          init_msg: jasmine.objectContaining({ symbol: "HASH" }),
          init_funds: [],
        },
      });

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: execute.height,
          hash: execute.hash,
          tx: execute.tx,
        }),
      );
    });

    it("can search by message.contract_address + message.action", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutErc20();
      assert(execute, "value must be set in beforeAll()");
      const client = new CosmWasmClient(launchpad.endpoint);
      const results = await client.searchTx({
        tags: [
          { key: "message.contract_address", value: execute.contract },
          { key: "message.action", value: "execute" },
        ],
      });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(isMsgExecuteContract(msg), `${result.hash} (at ${result.height}) not an execute msg`);
        expect(msg.value.contract).toEqual(execute.contract);
      }

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: execute.height,
          hash: execute.hash,
          tx: execute.tx,
        }),
      );
    });
  });
});

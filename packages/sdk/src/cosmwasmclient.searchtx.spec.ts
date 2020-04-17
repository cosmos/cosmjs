/* eslint-disable @typescript-eslint/camelcase */
import { assert, sleep } from "@iov/utils";

import { CosmWasmClient } from "./cosmwasmclient";
import { makeSignBytes } from "./encoding";
import { Secp256k1Pen } from "./pen";
import { RestClient } from "./restclient";
import { SigningCosmWasmClient } from "./signingcosmwasmclient";
import {
  deployedErc20,
  faucet,
  fromOneElementArray,
  makeRandomAddress,
  pendingWithoutWasmd,
  wasmd,
  wasmdEnabled,
} from "./testutils.spec";
import {
  Coin,
  CosmosSdkTx,
  isMsgExecuteContract,
  isMsgInstantiateContract,
  isMsgSend,
  MsgSend,
} from "./types";

describe("CosmWasmClient.searchTx", () => {
  let sendSuccessful:
    | {
        readonly sender: string;
        readonly recipient: string;
        readonly hash: string;
        readonly height: number;
        readonly tx: CosmosSdkTx;
      }
    | undefined;
  let sendUnsuccessful:
    | {
        readonly sender: string;
        readonly recipient: string;
        readonly hash: string;
        readonly height: number;
        readonly tx: CosmosSdkTx;
      }
    | undefined;
  let postedExecute:
    | {
        readonly sender: string;
        readonly contract: string;
        readonly hash: string;
        readonly height: number;
        readonly tx: CosmosSdkTx;
      }
    | undefined;

  beforeAll(async () => {
    if (wasmdEnabled()) {
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(wasmd.endpoint, faucet.address, (signBytes) =>
        pen.sign(signBytes),
      );

      {
        const recipient = makeRandomAddress();
        const transferAmount: Coin = {
          denom: "ucosm",
          amount: "1234567",
        };
        const result = await client.sendTokens(recipient, [transferAmount]);
        await sleep(50); // wait until tx is indexed
        const txDetails = await new RestClient(wasmd.endpoint).txById(result.transactionHash);
        sendSuccessful = {
          sender: faucet.address,
          recipient: recipient,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails.tx,
        };
      }

      {
        const memo = "Sending more than I can afford";
        const recipient = makeRandomAddress();
        const transferAmount = [
          {
            denom: "ucosm",
            amount: "123456700000000",
          },
        ];
        const sendMsg: MsgSend = {
          type: "cosmos-sdk/MsgSend",
          value: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            from_address: faucet.address,
            // eslint-disable-next-line @typescript-eslint/camelcase
            to_address: recipient,
            amount: transferAmount,
          },
        };
        const fee = {
          amount: [
            {
              denom: "ucosm",
              amount: "2000",
            },
          ],
          gas: "80000", // 80k
        };
        const { accountNumber, sequence } = await client.getNonce();
        const chainId = await client.getChainId();
        const signBytes = makeSignBytes([sendMsg], fee, chainId, memo, accountNumber, sequence);
        const signature = await pen.sign(signBytes);
        const tx: CosmosSdkTx = {
          type: "cosmos-sdk/StdTx",
          value: {
            msg: [sendMsg],
            fee: fee,
            memo: memo,
            signatures: [signature],
          },
        };
        const transactionId = await client.getIdentifier(tx);
        const heightBeforeThis = await client.getHeight();
        try {
          await client.postTx(tx.value);
        } catch (error) {
          // postTx() throws on execution failures, which is a questionable design. Ignore for now.
          // console.log(error);
        }
        sendUnsuccessful = {
          sender: faucet.address,
          recipient: recipient,
          hash: transactionId,
          height: heightBeforeThis + 1,
          tx: tx,
        };
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
        await sleep(50); // wait until tx is indexed
        const txDetails = await new RestClient(wasmd.endpoint).txById(result.transactionHash);
        postedExecute = {
          sender: faucet.address,
          contract: hashInstance,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails.tx,
        };
      }
    }
  });

  describe("with SearchByIdQuery", () => {
    it("can search successful tx by ID", async () => {
      pendingWithoutWasmd();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
      const result = await client.searchTx({ id: sendSuccessful.hash });
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );
    });

    it("can search unsuccessful tx by ID", async () => {
      pendingWithoutWasmd();
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
      const result = await client.searchTx({ id: sendUnsuccessful.hash });
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          height: sendUnsuccessful.height,
          hash: sendUnsuccessful.hash,
          code: 5,
          tx: sendUnsuccessful.tx,
        }),
      );
    });

    it("can search by ID (non existent)", async () => {
      pendingWithoutWasmd();
      const client = new CosmWasmClient(wasmd.endpoint);
      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
      const result = await client.searchTx({ id: nonExistentId });
      expect(result.length).toEqual(0);
    });

    it("can search by ID and filter by minHeight", async () => {
      pendingWithoutWasmd();
      assert(sendSuccessful);
      const client = new CosmWasmClient(wasmd.endpoint);
      const query = { id: sendSuccessful.hash };

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
  });

  describe("with SearchByHeightQuery", () => {
    it("can search successful tx by height", async () => {
      pendingWithoutWasmd();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
      const result = await client.searchTx({ height: sendSuccessful.height });
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );
    });

    it("can search unsuccessful tx by height", async () => {
      pendingWithoutWasmd();
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
      const result = await client.searchTx({ height: sendUnsuccessful.height });
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(
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
      pendingWithoutWasmd();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
      const results = await client.searchTx({ sentFromOrTo: sendSuccessful.sender });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(isMsgSend(msg), `${result.hash} (height ${result.height}) is not a bank send transaction`);
        expect(
          msg.value.to_address === sendSuccessful.sender || msg.value.from_address == sendSuccessful.sender,
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

    it("can search by recipient", async () => {
      pendingWithoutWasmd();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
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

    it("can search by recipient and filter by minHeight", async () => {
      pendingWithoutWasmd();
      assert(sendSuccessful);
      const client = new CosmWasmClient(wasmd.endpoint);
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
      pendingWithoutWasmd();
      assert(sendSuccessful);
      const client = new CosmWasmClient(wasmd.endpoint);
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
      pendingWithoutWasmd();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
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
      pendingWithoutWasmd();
      assert(postedExecute, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
      const results = await client.searchTx({
        tags: [{ key: "message.contract_address", value: postedExecute.contract }],
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
        type: "wasm/instantiate",
        value: {
          sender: faucet.address,
          code_id: deployedErc20.codeId.toString(),
          label: "HASH",
          init_msg: jasmine.objectContaining({ symbol: "HASH" }),
          init_funds: [],
        },
      });

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: postedExecute.height,
          hash: postedExecute.hash,
          tx: postedExecute.tx,
        }),
      );
    });

    it("can search by message.contract_address + message.action", async () => {
      pendingWithoutWasmd();
      assert(postedExecute, "value must be set in beforeAll()");
      const client = new CosmWasmClient(wasmd.endpoint);
      const results = await client.searchTx({
        tags: [
          { key: "message.contract_address", value: postedExecute.contract },
          { key: "message.action", value: "execute" },
        ],
      });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(isMsgExecuteContract(msg), `${result.hash} (at ${result.height}) not an execute msg`);
        expect(msg.value.contract).toEqual(postedExecute.contract);
      }

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: postedExecute.height,
          hash: postedExecute.hash,
          tx: postedExecute.tx,
        }),
      );
    });
  });
});

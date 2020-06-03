/* eslint-disable @typescript-eslint/camelcase */
import { assert, sleep } from "@iov/utils";

import { Coin } from "./coins";
import { CosmosClient } from "./cosmosclient";
import { makeSignBytes } from "./encoding";
import { Secp256k1Pen } from "./pen";
import { RestClient } from "./restclient";
import { SigningCosmosClient } from "./signingcosmosclient";
import {
  faucet,
  fromOneElementArray,
  makeRandomAddress,
  pendingWithoutWasmd,
  wasmd,
  wasmdEnabled,
} from "./testutils.spec";
import { CosmosSdkTx, isMsgSend, MsgSend } from "./types";

describe("CosmosClient.searchTx", () => {
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

  beforeAll(async () => {
    if (wasmdEnabled()) {
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmosClient(wasmd.endpoint, faucet.address, (signBytes) =>
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
    }
  });

  describe("with SearchByIdQuery", () => {
    it("can search successful tx by ID", async () => {
      pendingWithoutWasmd();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmosClient(wasmd.endpoint);
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
      const client = new CosmosClient(wasmd.endpoint);
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
      const client = new CosmosClient(wasmd.endpoint);
      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
      const result = await client.searchTx({ id: nonExistentId });
      expect(result.length).toEqual(0);
    });

    it("can search by ID and filter by minHeight", async () => {
      pendingWithoutWasmd();
      assert(sendSuccessful);
      const client = new CosmosClient(wasmd.endpoint);
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
      const client = new CosmosClient(wasmd.endpoint);
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
      pendingWithoutWasmd();
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = new CosmosClient(wasmd.endpoint);
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
      pendingWithoutWasmd();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = new CosmosClient(wasmd.endpoint);
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
      const client = new CosmosClient(wasmd.endpoint);
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
      const client = new CosmosClient(wasmd.endpoint);
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
      const client = new CosmosClient(wasmd.endpoint);
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
      const client = new CosmosClient(wasmd.endpoint);
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
  });
});

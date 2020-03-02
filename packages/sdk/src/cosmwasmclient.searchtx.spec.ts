/* eslint-disable @typescript-eslint/camelcase */
import { assert, sleep } from "@iov/utils";

import { CosmWasmClient } from "./cosmwasmclient";
import { Secp256k1Pen } from "./pen";
import { RestClient } from "./restclient";
import { SigningCosmWasmClient } from "./signingcosmwasmclient";
import {
  deployedErc20,
  fromOneElementArray,
  makeRandomAddress,
  pendingWithoutWasmd,
  wasmdEnabled,
} from "./testutils.spec";
import { Coin, CosmosSdkTx, isMsgExecuteContract, isMsgInstantiateContract, isMsgSend } from "./types";

const httpUrl = "http://localhost:1317";

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

fdescribe("CosmWasmClient.searchTx", () => {
  let postedSend:
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
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, signBytes => pen.sign(signBytes));

      {
        const recipient = makeRandomAddress();
        const transferAmount: Coin = {
          denom: "ucosm",
          amount: "1234567",
        };
        const result = await client.sendTokens(recipient, [transferAmount]);
        await sleep(50); // wait until tx is indexed
        const txDetails = await new RestClient(httpUrl).txsById(result.transactionHash);
        postedSend = {
          sender: faucet.address,
          recipient: recipient,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails.tx,
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
        const txDetails = await new RestClient(httpUrl).txsById(result.transactionHash);
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

  it("can search by ID", async () => {
    pendingWithoutWasmd();
    assert(postedSend, "value must be set in beforeAll()");
    const client = new CosmWasmClient(httpUrl);
    const result = await client.searchTx({ id: postedSend.hash });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(
      jasmine.objectContaining({
        height: postedSend.height.toString(),
        txhash: postedSend.hash,
        tx: postedSend.tx,
      }),
    );
  });

  it("can search by ID (non existent)", async () => {
    pendingWithoutWasmd();
    const client = new CosmWasmClient(httpUrl);
    const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
    const result = await client.searchTx({ id: nonExistentId });
    expect(result.length).toEqual(0);
  });

  it("can search by height", async () => {
    pendingWithoutWasmd();
    assert(postedSend, "value must be set in beforeAll()");
    const client = new CosmWasmClient(httpUrl);
    const result = await client.searchTx({ height: postedSend.height });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(
      jasmine.objectContaining({
        height: postedSend.height.toString(),
        txhash: postedSend.hash,
        tx: postedSend.tx,
      }),
    );
  });

  it("can search by sender", async () => {
    pendingWithoutWasmd();
    assert(postedSend, "value must be set in beforeAll()");
    const client = new CosmWasmClient(httpUrl);
    const results = await client.searchTx({ sentFromOrTo: postedSend.sender });
    expect(results.length).toBeGreaterThanOrEqual(1);

    // Check basic structure of all results
    for (const result of results) {
      const msg = fromOneElementArray(result.tx.value.msg);
      assert(isMsgSend(msg), `${result.txhash} (height ${result.height}) is not a bank send transaction`);
      expect(
        msg.value.to_address === postedSend.sender || msg.value.from_address == postedSend.sender,
      ).toEqual(true);
    }

    // Check details of most recent result
    expect(results[results.length - 1]).toEqual(
      jasmine.objectContaining({
        height: postedSend.height.toString(),
        txhash: postedSend.hash,
        tx: postedSend.tx,
      }),
    );
  });

  it("can search by recipient", async () => {
    pendingWithoutWasmd();
    assert(postedSend, "value must be set in beforeAll()");
    const client = new CosmWasmClient(httpUrl);
    const results = await client.searchTx({ sentFromOrTo: postedSend.recipient });
    expect(results.length).toBeGreaterThanOrEqual(1);

    // Check basic structure of all results
    for (const result of results) {
      const msg = fromOneElementArray(result.tx.value.msg);
      assert(isMsgSend(msg), `${result.txhash} (height ${result.height}) is not a bank send transaction`);
      expect(
        msg.value.to_address === postedSend.recipient || msg.value.from_address == postedSend.recipient,
      ).toEqual(true);
    }

    // Check details of most recent result
    expect(results[results.length - 1]).toEqual(
      jasmine.objectContaining({
        height: postedSend.height.toString(),
        txhash: postedSend.hash,
        tx: postedSend.tx,
      }),
    );
  });

  it("can search by ID and filter by minHeight", async () => {
    pendingWithoutWasmd();
    assert(postedSend);
    const client = new CosmWasmClient(httpUrl);
    const query = { id: postedSend.hash };

    {
      const result = await client.searchTx(query, { minHeight: 0 });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { minHeight: postedSend.height - 1 });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { minHeight: postedSend.height });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { minHeight: postedSend.height + 1 });
      expect(result.length).toEqual(0);
    }
  });

  it("can search by recipient and filter by minHeight", async () => {
    pendingWithoutWasmd();
    assert(postedSend);
    const client = new CosmWasmClient(httpUrl);
    const query = { sentFromOrTo: postedSend.recipient };

    {
      const result = await client.searchTx(query, { minHeight: 0 });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { minHeight: postedSend.height - 1 });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { minHeight: postedSend.height });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { minHeight: postedSend.height + 1 });
      expect(result.length).toEqual(0);
    }
  });

  it("can search by recipient and filter by maxHeight", async () => {
    pendingWithoutWasmd();
    assert(postedSend);
    const client = new CosmWasmClient(httpUrl);
    const query = { sentFromOrTo: postedSend.recipient };

    {
      const result = await client.searchTx(query, { maxHeight: 9999999999999 });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { maxHeight: postedSend.height + 1 });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { maxHeight: postedSend.height });
      expect(result.length).toEqual(1);
    }

    {
      const result = await client.searchTx(query, { maxHeight: postedSend.height - 1 });
      expect(result.length).toEqual(0);
    }
  });

  describe("with SearchByTagsQuery", () => {
    it("can search by transfer.recipient", async () => {
      pendingWithoutWasmd();
      assert(postedSend, "value must be set in beforeAll()");
      const client = new CosmWasmClient(httpUrl);
      const results = await client.searchTx({
        tags: [{ key: "transfer.recipient", value: postedSend.recipient }],
      });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(isMsgSend(msg), `${result.txhash} (height ${result.height}) is not a bank send transaction`);
        expect(msg.value.to_address).toEqual(postedSend.recipient);
      }

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: postedSend.height.toString(),
          txhash: postedSend.hash,
          tx: postedSend.tx,
        }),
      );
    });

    it("can search by message.contract_address", async () => {
      pendingWithoutWasmd();
      assert(postedExecute, "value must be set in beforeAll()");
      const client = new CosmWasmClient(httpUrl);
      const results = await client.searchTx({
        tags: [{ key: "message.contract_address", value: postedExecute.contract }],
      });
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const msg = fromOneElementArray(result.tx.value.msg);
        assert(
          isMsgExecuteContract(msg) || isMsgInstantiateContract(msg),
          `${result.txhash} (at ${result.height}) not an execute or instantiate msg`,
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
          height: postedExecute.height.toString(),
          txhash: postedExecute.hash,
          tx: postedExecute.tx,
        }),
      );
    });

    it("can search by message.contract_address + message.action", async () => {
      pendingWithoutWasmd();
      assert(postedExecute, "value must be set in beforeAll()");
      const client = new CosmWasmClient(httpUrl);
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
        assert(isMsgExecuteContract(msg), `${result.txhash} (at ${result.height}) not an execute msg`);
        expect(msg.value.contract).toEqual(postedExecute.contract);
      }

      // Check details of most recent result
      expect(results[results.length - 1]).toEqual(
        jasmine.objectContaining({
          height: postedExecute.height.toString(),
          txhash: postedExecute.hash,
          tx: postedExecute.tx,
        }),
      );
    });
  });
});

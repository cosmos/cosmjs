import { getAminoPubkey } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import {
  coins,
  decodeTxRaw,
  DirectEthSecp256k1HdWallet,
  DirectSecp256k1HdWallet,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignDoc,
  Registry,
  TxBodyEncodeObject,
} from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";
import { MsgSendResponse } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import { isMsgSendEncodeObject } from "./modules";
import { DeliverTxResponse, isDeliverTxFailure, isDeliverTxSuccess, StargateClient } from "./stargateclient";
import {
  defaultSigningClientOptions,
  evmd,
  evmdEnabled,
  evmfaucet,
  faucet,
  fromOneElementArray,
  makeRandomAddress,
  simapp,
  simappEnabled,
} from "./testutils";

interface TestTxSend {
  readonly sender: string;
  readonly recipient: string;
  readonly hash: string;
  readonly height: number;
  readonly tx: Uint8Array;
}

async function sendTokens(
  client: StargateClient,
  registry: Registry,
  wallet: DirectSecp256k1HdWallet | DirectEthSecp256k1HdWallet,
  recipient: string,
  amount: readonly Coin[],
  memo: string,
): Promise<{
  readonly broadcastResponse: DeliverTxResponse;
  readonly tx: Uint8Array;
}> {
  const [accountFromWallet] = await wallet.getAccounts();
  const walletAddress = accountFromWallet.address;
  const pubkey = encodePubkey(getAminoPubkey(accountFromWallet));
  const txBodyFields: TxBodyEncodeObject = {
    typeUrl: "/cosmos.tx.v1beta1.TxBody",
    value: {
      messages: [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: walletAddress,
            toAddress: recipient,
            amount: amount,
          },
        },
      ],
      memo: memo,
    },
  };
  const txBodyBytes = registry.encode(txBodyFields);
  const { accountNumber, sequence } = await client.getSequence(walletAddress);
  // Use the same denom as the amount being sent for the fee
  const feeDenom = amount[0]?.denom ?? "ucosm";
  const feeAmount = [
    {
      amount: "2000",
      denom: feeDenom,
    },
  ];
  const gasLimit = 200000;
  const feeGranter = undefined;
  const feePayer = undefined;
  const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence }], feeAmount, gasLimit, feeGranter, feePayer);

  const chainId = await client.getChainId();
  const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
  const { signature } = await wallet.signDirect(walletAddress, signDoc);
  const txRaw = TxRaw.fromPartial({
    bodyBytes: txBodyBytes,
    authInfoBytes: authInfoBytes,
    signatures: [fromBase64(signature.signature)],
  });
  const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
  const broadcastResponse = await client.broadcastTx(
    txRawBytes,
    defaultSigningClientOptions.broadcastTimeoutMs,
    defaultSigningClientOptions.broadcastPollIntervalMs,
  );
  return {
    broadcastResponse: broadcastResponse,
    tx: txRawBytes,
  };
}

(simappEnabled ? describe : xdescribe)("StargateClient.getTx and .searchTx", () => {
  const registry = new Registry();

  let sendUnsuccessful: TestTxSend | undefined;
  let sendSuccessful: TestTxSend | undefined;

  beforeAll(async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const client = await StargateClient.connect(simapp.tendermintUrlHttp);
    const unsuccessfulRecipient = makeRandomAddress();
    const successfulRecipient = makeRandomAddress();

    const unsuccessfulResult = await sendTokens(
      client,
      registry,
      wallet,
      unsuccessfulRecipient,
      coins(123456700000000, "ucosm"),
      "Sending more than I can afford",
    );
    if (isDeliverTxFailure(unsuccessfulResult.broadcastResponse)) {
      sendUnsuccessful = {
        sender: faucet.address0,
        recipient: unsuccessfulRecipient,
        hash: unsuccessfulResult.broadcastResponse.transactionHash,
        height: unsuccessfulResult.broadcastResponse.height,
        tx: unsuccessfulResult.tx,
      };
    }
    const successfulResult = await sendTokens(
      client,
      registry,
      wallet,
      successfulRecipient,
      coins(1234567, "ucosm"),
      "Something I can afford",
    );
    if (isDeliverTxSuccess(successfulResult.broadcastResponse)) {
      sendSuccessful = {
        sender: faucet.address0,
        recipient: successfulRecipient,
        hash: successfulResult.broadcastResponse.transactionHash,
        height: successfulResult.broadcastResponse.height,
        tx: successfulResult.tx,
      };
    }

    await sleep(75); // wait until transactions are indexed
  });

  describe("getTx", () => {
    it("can get successful tx by ID", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      const result = await client.getTx(sendSuccessful.hash);
      assert(result);
      expect(result).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );

      expect(result.msgResponses.length).toEqual(1);
      expect(result.msgResponses[0].typeUrl).toEqual("/cosmos.bank.v1beta1.MsgSendResponse");
      const _response = MsgSendResponse.decode(result.msgResponses[0].value);
      // MsgSendResponse has no fields to check 🤷‍♂️
    });

    it("can get unsuccessful tx by ID", async () => {
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      const result = await client.getTx(sendUnsuccessful.hash);
      assert(result);
      expect(result).toEqual(
        jasmine.objectContaining({
          height: sendUnsuccessful.height,
          hash: sendUnsuccessful.hash,
          code: 5,
          tx: sendUnsuccessful.tx,
        }),
      );

      // unsuccessful tx should not have responses
      expect(result.msgResponses.length).toEqual(0);
    });

    it("can get by ID (non existent)", async () => {
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
      const result = await client.getTx(nonExistentId);
      expect(result).toBeNull();
    });
  });

  describe("searchTx", () => {
    it("can search successful tx by height", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      const result = await client.searchTx(`tx.height=${sendSuccessful.height}`);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result).toContain(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );

      expect(result[0].msgResponses.length).toEqual(1);
      expect(result[0].msgResponses[0].typeUrl).toEqual("/cosmos.bank.v1beta1.MsgSendResponse");
      const _response = MsgSendResponse.decode(result[0].msgResponses[0].value);
      // MsgSendResponse has no fields to check 🤷‍♂️
    });

    it("can search unsuccessful tx by height", async () => {
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      const result = await client.searchTx(`tx.height=${sendUnsuccessful.height}`);
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

    it("can search by sender", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      // Since Cosmos SDK 0.47 we can only combine attributes of a single event
      const query = `message.action = '/cosmos.bank.v1beta1.MsgSend' AND message.sender = '${sendSuccessful.sender}'`;
      const results = await client.searchTx(query);
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const tx = decodeTxRaw(result.tx);
        const filteredMsgs = tx.body.messages.filter((msg) => {
          if (!isMsgSendEncodeObject(msg)) return false;
          const decoded = registry.decode(msg);
          return decoded.fromAddress === sendSuccessful?.sender;
        });
        expect(filteredMsgs.length).toBeGreaterThanOrEqual(1);
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
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      const results = await client.searchTx(`transfer.recipient='${sendSuccessful.recipient}'`);
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const tx = decodeTxRaw(result.tx);
        const filteredMsgs = tx.body.messages.filter((msg) => {
          if (!isMsgSendEncodeObject(msg)) return false;
          const decoded = registry.decode(msg);
          return decoded.toAddress === sendSuccessful?.recipient;
        });
        expect(filteredMsgs.length).toBeGreaterThanOrEqual(1);
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

    it("works with tags", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrlHttp);
      const results = await client.searchTx([{ key: "transfer.recipient", value: sendSuccessful.recipient }]);
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const tx = decodeTxRaw(result.tx);
        const msg = fromOneElementArray(tx.body.messages);
        expect(msg.typeUrl).toEqual("/cosmos.bank.v1beta1.MsgSend");
        const decoded = registry.decode(msg);
        expect(decoded.toAddress).toEqual(sendSuccessful.recipient);
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

(evmdEnabled ? describe : xdescribe)("StargateClient.getTx and .searchTx (evmd)", () => {
  const registry = new Registry();

  let sendUnsuccessful: TestTxSend | undefined;
  let sendSuccessful: TestTxSend | undefined;

  beforeAll(async () => {
    const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(evmfaucet.mnemonic);
    const client = await StargateClient.connect(evmd.tendermintUrlHttp);
    const unsuccessfulRecipient = makeRandomAddress();
    const successfulRecipient = makeRandomAddress();

    const unsuccessfulResult = await sendTokens(
      client,
      registry,
      wallet,
      unsuccessfulRecipient,
      [{ denom: "atest", amount: "999999999999999999999999999999" }],
      "Sending more than I can afford",
    );
    if (isDeliverTxFailure(unsuccessfulResult.broadcastResponse)) {
      sendUnsuccessful = {
        sender: evmfaucet.address0,
        recipient: unsuccessfulRecipient,
        hash: unsuccessfulResult.broadcastResponse.transactionHash,
        height: unsuccessfulResult.broadcastResponse.height,
        tx: unsuccessfulResult.tx,
      };
    }
    const successfulResult = await sendTokens(
      client,
      registry,
      wallet,
      successfulRecipient,
      coins(1234567, "atest"),
      "Something I can afford",
    );
    if (isDeliverTxSuccess(successfulResult.broadcastResponse)) {
      sendSuccessful = {
        sender: evmfaucet.address0,
        recipient: successfulRecipient,
        hash: successfulResult.broadcastResponse.transactionHash,
        height: successfulResult.broadcastResponse.height,
        tx: successfulResult.tx,
      };
    }

    await sleep(75); // wait until transactions are indexed
  });

  describe("getTx", () => {
    it("can get successful tx by ID", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      const result = await client.getTx(sendSuccessful.hash);
      assert(result);
      expect(result).toEqual(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );

      expect(result.msgResponses.length).toEqual(1);
      expect(result.msgResponses[0].typeUrl).toEqual("/cosmos.bank.v1beta1.MsgSendResponse");
      const _response = MsgSendResponse.decode(result.msgResponses[0].value);
      // MsgSendResponse has no fields to check 🤷‍♂️
    });

    it("can get unsuccessful tx by ID", async () => {
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      const result = await client.getTx(sendUnsuccessful.hash);
      assert(result);
      expect(result).toEqual(
        jasmine.objectContaining({
          height: sendUnsuccessful.height,
          hash: sendUnsuccessful.hash,
          code: 5,
          tx: sendUnsuccessful.tx,
        }),
      );

      // unsuccessful tx should not have responses
      expect(result.msgResponses.length).toEqual(0);
    });

    it("can get by ID (non existent)", async () => {
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
      const result = await client.getTx(nonExistentId);
      expect(result).toBeNull();
    });
  });

  describe("searchTx", () => {
    it("can search successful tx by height", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      const result = await client.searchTx(`tx.height=${sendSuccessful.height}`);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result).toContain(
        jasmine.objectContaining({
          height: sendSuccessful.height,
          hash: sendSuccessful.hash,
          code: 0,
          tx: sendSuccessful.tx,
        }),
      );

      expect(result[0].msgResponses.length).toEqual(1);
      expect(result[0].msgResponses[0].typeUrl).toEqual("/cosmos.bank.v1beta1.MsgSendResponse");
      const _response = MsgSendResponse.decode(result[0].msgResponses[0].value);
      // MsgSendResponse has no fields to check 🤷‍♂️
    });

    it("can search unsuccessful tx by height", async () => {
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      const result = await client.searchTx(`tx.height=${sendUnsuccessful.height}`);
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

    it("can search by sender", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      // Since Cosmos SDK 0.47 we can only combine attributes of a single event
      const query = `message.action = '/cosmos.bank.v1beta1.MsgSend' AND message.sender = '${sendSuccessful.sender}'`;
      const results = await client.searchTx(query);
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const tx = decodeTxRaw(result.tx);
        const filteredMsgs = tx.body.messages.filter((msg) => {
          if (!isMsgSendEncodeObject(msg)) return false;
          const decoded = registry.decode(msg);
          return decoded.fromAddress === sendSuccessful?.sender;
        });
        expect(filteredMsgs.length).toBeGreaterThanOrEqual(1);
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
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      const results = await client.searchTx(`transfer.recipient='${sendSuccessful.recipient}'`);
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const tx = decodeTxRaw(result.tx);
        const filteredMsgs = tx.body.messages.filter((msg) => {
          if (!isMsgSendEncodeObject(msg)) return false;
          const decoded = registry.decode(msg);
          return decoded.toAddress === sendSuccessful?.recipient;
        });
        expect(filteredMsgs.length).toBeGreaterThanOrEqual(1);
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

    it("works with tags", async () => {
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(evmd.tendermintUrlHttp);
      const results = await client.searchTx([{ key: "transfer.recipient", value: sendSuccessful.recipient }]);
      expect(results.length).toBeGreaterThanOrEqual(1);

      // Check basic structure of all results
      for (const result of results) {
        const tx = decodeTxRaw(result.tx);
        const msg = fromOneElementArray(tx.body.messages);
        expect(msg.typeUrl).toEqual("/cosmos.bank.v1beta1.MsgSend");
        const decoded = registry.decode(msg);
        expect(decoded.toAddress).toEqual(sendSuccessful.recipient);
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

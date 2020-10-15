/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import { Coin, coins } from "@cosmjs/launchpad";
import {
  DirectSecp256k1Wallet,
  encodePubkey,
  makeAuthInfo,
  makeSignBytes,
  Registry,
} from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";

import { cosmos } from "./codec";
import {
  BroadcastTxResponse,
  isBroadcastTxFailure,
  isBroadcastTxSuccess,
  StargateClient,
} from "./stargateclient";
import { faucet, makeRandomAddress, pendingWithoutSimapp, simapp, simappEnabled } from "./testutils.spec";

const { TxRaw } = cosmos.tx.v1beta1;

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
  wallet: DirectSecp256k1Wallet,
  recipient: string,
  amount: readonly Coin[],
  memo: string,
): Promise<{
  readonly broadcastResponse: BroadcastTxResponse;
  readonly tx: Uint8Array;
}> {
  const [{ address: walletAddress, pubkey: pubkeyBytes }] = await wallet.getAccounts();
  const pubkey = encodePubkey({
    type: "tendermint/PubKeySecp256k1",
    value: toBase64(pubkeyBytes),
  });
  const txBodyFields = {
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
  const { accountNumber, sequence } = (await client.getSequence(walletAddress))!;
  const feeAmount = [
    {
      amount: "2000",
      denom: "ucosm",
    },
  ];
  const gasLimit = 200000;
  const authInfoBytes = makeAuthInfo([pubkey], feeAmount, gasLimit, sequence);

  const chainId = await client.getChainId();
  const signDocBytes = makeSignBytes(txBodyBytes, authInfoBytes, chainId, accountNumber);
  const signature = await wallet.sign(walletAddress, signDocBytes);
  const txRaw = TxRaw.create({
    bodyBytes: txBodyBytes,
    authInfoBytes: authInfoBytes,
    signatures: [fromBase64(signature.signature)],
  });
  const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
  const broadcastResponse = await client.broadcastTx(txRawBytes);
  return {
    broadcastResponse: broadcastResponse,
    tx: txRawBytes,
  };
}

describe("StargateClient.searchTx", () => {
  const registry = new Registry();

  let sendUnsuccessful: TestTxSend | undefined;
  let sendSuccessful: TestTxSend | undefined;

  beforeAll(async () => {
    if (simappEnabled()) {
      const wallet = await DirectSecp256k1Wallet.fromMnemonic(faucet.mnemonic);
      const client = await StargateClient.connect(simapp.tendermintUrl);
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
      if (isBroadcastTxFailure(unsuccessfulResult.broadcastResponse)) {
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
      if (isBroadcastTxSuccess(successfulResult.broadcastResponse)) {
        sendSuccessful = {
          sender: faucet.address0,
          recipient: successfulRecipient,
          hash: successfulResult.broadcastResponse.transactionHash,
          height: successfulResult.broadcastResponse.height,
          tx: successfulResult.tx,
        };
      }

      await sleep(75); // wait until transactions are indexed
    }
  });

  describe("with SearchByIdQuery", () => {
    it("can search successful tx by ID", async () => {
      pendingWithoutSimapp();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrl);
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
      pendingWithoutSimapp();
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrl);
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
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
      const result = await client.searchTx({ id: nonExistentId });
      expect(result.length).toEqual(0);
    });

    it("can search by ID and filter by minHeight", async () => {
      pendingWithoutSimapp();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrl);
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
      pendingWithoutSimapp();
      assert(sendSuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrl);
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
      pendingWithoutSimapp();
      assert(sendUnsuccessful, "value must be set in beforeAll()");
      const client = await StargateClient.connect(simapp.tendermintUrl);
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
});

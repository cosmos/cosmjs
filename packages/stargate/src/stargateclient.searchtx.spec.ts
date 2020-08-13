/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32, fromBase64 } from "@cosmjs/encoding";
import { Coin, coins, Secp256k1Wallet } from "@cosmjs/launchpad";
import { makeSignBytes, Registry } from "@cosmjs/proto-signing";
import { assert } from "@cosmjs/utils";
import Long from "long";

import { cosmos } from "./codec";
import {
  BroadcastTxResponse,
  isBroadcastTxFailure,
  isBroadcastTxSuccess,
  StargateClient,
} from "./stargateclient";
import { faucet, makeRandomAddress, pendingWithoutSimapp, simapp, simappEnabled } from "./testutils.spec";

const { AuthInfo, Tx, TxBody } = cosmos.tx;
const { PublicKey } = cosmos.crypto;

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
  wallet: Secp256k1Wallet,
  recipient: string,
  amount: readonly Coin[],
  memo: string,
): Promise<{
  readonly broadcastResponse: BroadcastTxResponse;
  readonly tx: Uint8Array;
}> {
  const [{ address: walletAddress, pubkey: pubkeyBytes }] = await wallet.getAccounts();
  const publicKey = PublicKey.create({ secp256k1: pubkeyBytes });
  const txBodyFields = {
    typeUrl: "/cosmos.tx.TxBody",
    value: {
      messages: [
        {
          typeUrl: "/cosmos.bank.MsgSend",
          value: {
            fromAddress: Bech32.decode(walletAddress).data,
            toAddress: Bech32.decode(recipient).data,
            amount: amount,
          },
        },
      ],
      memo: memo,
    },
  };
  const txBodyBytes = registry.encode(txBodyFields);
  const txBody = TxBody.decode(txBodyBytes);

  const authInfo = {
    signerInfos: [
      {
        publicKey: publicKey,
        modeInfo: {
          single: {
            mode: cosmos.tx.signing.SignMode.SIGN_MODE_DIRECT,
          },
        },
      },
    ],
    fee: {
      gasLimit: Long.fromNumber(200000),
    },
  };
  const authInfoBytes = Uint8Array.from(AuthInfo.encode(authInfo).finish());

  const { accountNumber, sequence } = (await client.getSequence(walletAddress))!;
  const chainId = await client.getChainId();
  const signDocBytes = makeSignBytes(txBodyBytes, authInfoBytes, chainId, accountNumber, sequence);
  const signature = await wallet.sign(walletAddress, signDocBytes);
  const txRaw = Tx.create({
    body: txBody,
    authInfo: authInfo,
    signatures: [fromBase64(signature.signature)],
  });
  const txRawBytes = Uint8Array.from(Tx.encode(txRaw).finish());
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
      const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
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

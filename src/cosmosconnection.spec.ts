import {
  Address,
  Algorithm,
  ChainId,
  isBlockInfoPending,
  isFailedTransaction,
  isSendTransaction,
  PubkeyBytes,
  SendTransaction,
  TokenTicker,
  TransactionState,
} from "@iov/bcp";
import { Secp256k1 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";
import { HdPaths, Secp256k1HdWallet, UserProfile } from "@iov/keycontrol";

import { cosmosCodec } from "./cosmoscodec";
import { CosmosConnection } from "./cosmosconnection";

const { fromBase64, toHex } = Encoding;

function pendingWithoutCosmos(): void {
  if (!process.env.COSMOS_ENABLED) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
}

describe("CosmosConnection", () => {
  const atom = "ATOM" as TokenTicker;
  const httpUrl = "http://localhost:1317";
  const defaultChainId = "cosmos:testing" as ChainId;
  const defaultEmptyAddress = "cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r" as Address;
  const defaultAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6" as Address;
  const defaultPubkey = {
    algo: Algorithm.Secp256k1,
    data: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ") as PubkeyBytes,
  };
  const faucetMnemonic =
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
  const faucetPath = HdPaths.cosmos(0);
  const defaultRecipient = "cosmos1t70qnpr0az8tf7py83m4ue5y89w58lkjmx0yq2" as Address;

  describe("establish", () => {
    it("can connect to Cosmos via http", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      expect(connection).toBeTruthy();
      connection.disconnect();
    });
  });

  describe("chainId", () => {
    it("displays the chain ID", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const chainId = connection.chainId();
      expect(chainId).toEqual(defaultChainId);
      connection.disconnect();
    });
  });

  describe("height", () => {
    it("displays the current height", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const height = await connection.height();
      expect(height).toBeGreaterThan(0);
      connection.disconnect();
    });
  });

  describe("getToken", () => {
    it("displays a given token", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const token = await connection.getToken("ATOM" as TokenTicker);
      expect(token).toEqual({
        fractionalDigits: 6,
        tokenName: "Atom",
        tokenTicker: "ATOM" as TokenTicker,
      });
      connection.disconnect();
    });

    it("resolves to undefined if the token is not supported", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const token = await connection.getToken("whatever" as TokenTicker);
      expect(token).toBeUndefined();
      connection.disconnect();
    });
  });

  describe("getAllTokens", () => {
    it("resolves to a list of all supported tokens", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const tokens = await connection.getAllTokens();
      expect(tokens).toEqual([
        {
          fractionalDigits: 6,
          tokenName: "Atom",
          tokenTicker: "ATOM" as TokenTicker,
        },
      ]);
      connection.disconnect();
    });
  });

  describe("getAccount", () => {
    it("gets an empty account by address", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const account = await connection.getAccount({ address: defaultEmptyAddress });
      expect(account).toBeUndefined();
      connection.disconnect();
    });

    it("gets an account by address", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const account = await connection.getAccount({ address: defaultAddress });
      if (account === undefined) {
        throw new Error("Expected account not to be undefined");
      }
      expect(account.address).toEqual(defaultAddress);
      expect(account.pubkey).toEqual(defaultPubkey);
      // Unsupported coins are filtered out
      expect(account.balance.length).toEqual(1);
      connection.disconnect();
    });

    it("gets an account by pubkey", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const account = await connection.getAccount({ pubkey: defaultPubkey });
      if (account === undefined) {
        throw new Error("Expected account not to be undefined");
      }
      expect(account.address).toEqual(defaultAddress);
      expect(account.pubkey).toEqual({
        algo: Algorithm.Secp256k1,
        data: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"),
      });
      // Unsupported coins are filtered out
      expect(account.balance.length).toEqual(1);
      connection.disconnect();
    });
  });

  describe("integration tests", () => {
    it("can post and get a transaction", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucetMnemonic));
      const faucet = await profile.createIdentity(wallet.id, defaultChainId, faucetPath);
      const faucetAddress = cosmosCodec.identityToAddress(faucet);

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: faucetAddress,
        recipient: defaultRecipient,
        memo: "My first payment",
        amount: {
          quantity: "75000",
          fractionalDigits: 6,
          tokenTicker: atom,
        },
      });
      const nonce = await connection.getNonce({ address: faucetAddress });
      const signed = await profile.signTransaction(faucet, unsigned, cosmosCodec, nonce);
      const postableBytes = cosmosCodec.bytesToPost(signed);
      const response = await connection.postTx(postableBytes);
      const { transactionId } = response;
      const blockInfo = await response.blockInfo.waitFor(info => !isBlockInfoPending(info));
      expect(blockInfo.state).toEqual(TransactionState.Succeeded);

      const getResponse = await connection.getTx(transactionId);
      expect(getResponse).toBeTruthy();
      expect(getResponse.transactionId).toEqual(transactionId);
      if (isFailedTransaction(getResponse)) {
        throw new Error("Expected transaction to succeed");
      }
      expect(getResponse.log).toMatch(/success/i);
      const { transaction, signatures } = getResponse;
      if (!isSendTransaction(transaction)) {
        throw new Error("Expected send transaction");
      }
      expect(transaction.kind).toEqual(unsigned.kind);
      expect(transaction.sender).toEqual(unsigned.sender);
      expect(transaction.recipient).toEqual(unsigned.recipient);
      expect(transaction.memo).toEqual(unsigned.memo);
      expect(transaction.amount).toEqual(unsigned.amount);
      expect(transaction.chainId).toEqual(unsigned.chainId);

      expect(signatures.length).toEqual(1);
      expect(signatures[0].nonce).toEqual(signed.signatures[0].nonce);
      expect(signatures[0].pubkey.algo).toEqual(signed.signatures[0].pubkey.algo);
      expect(toHex(signatures[0].pubkey.data)).toEqual(
        toHex(Secp256k1.compressPubkey(signed.signatures[0].pubkey.data)),
      );
      expect(toHex(signatures[0].signature)).toEqual(
        toHex(Secp256k1.trimRecoveryByte(signed.signatures[0].signature)),
      );

      connection.disconnect();
    });

    it("can post and search for a transaction", async () => {
      pendingWithoutCosmos();
      const connection = await CosmosConnection.establish(httpUrl);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucetMnemonic));
      const faucet = await profile.createIdentity(wallet.id, defaultChainId, faucetPath);
      const faucetAddress = cosmosCodec.identityToAddress(faucet);

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: faucetAddress,
        recipient: defaultRecipient,
        memo: "My first payment",
        amount: {
          quantity: "75000",
          fractionalDigits: 6,
          tokenTicker: atom,
        },
      });
      const nonce = await connection.getNonce({ address: faucetAddress });
      const signed = await profile.signTransaction(faucet, unsigned, cosmosCodec, nonce);
      const postableBytes = cosmosCodec.bytesToPost(signed);
      const response = await connection.postTx(postableBytes);
      const { transactionId } = response;
      const blockInfo = await response.blockInfo.waitFor(info => !isBlockInfoPending(info));
      expect(blockInfo.state).toEqual(TransactionState.Succeeded);

      // search by id

      const idSearchResponse = await connection.searchTx({ id: transactionId });
      expect(idSearchResponse).toBeTruthy();
      expect(idSearchResponse.length).toEqual(1);

      const idResult = idSearchResponse[0];
      expect(idResult.transactionId).toEqual(transactionId);
      if (isFailedTransaction(idResult)) {
        throw new Error("Expected transaction to succeed");
      }
      expect(idResult.log).toMatch(/success/i);
      const { transaction: idTransaction } = idResult;
      if (!isSendTransaction(idTransaction)) {
        throw new Error("Expected send transaction");
      }
      expect(idTransaction.kind).toEqual(unsigned.kind);
      expect(idTransaction.sender).toEqual(unsigned.sender);
      expect(idTransaction.recipient).toEqual(unsigned.recipient);
      expect(idTransaction.memo).toEqual(unsigned.memo);
      expect(idTransaction.amount).toEqual(unsigned.amount);

      // search by sender address

      const senderAddressSearchResponse = await connection.searchTx({ sentFromOrTo: faucetAddress });
      expect(senderAddressSearchResponse).toBeTruthy();
      expect(senderAddressSearchResponse.length).toBeGreaterThanOrEqual(1);

      const senderAddressResult = senderAddressSearchResponse[senderAddressSearchResponse.length - 1];
      expect(senderAddressResult.transactionId).toEqual(transactionId);
      if (isFailedTransaction(senderAddressResult)) {
        throw new Error("Expected transaction to succeed");
      }
      expect(senderAddressResult.log).toMatch(/success/i);
      const { transaction: senderAddressTransaction } = senderAddressResult;
      if (!isSendTransaction(senderAddressTransaction)) {
        throw new Error("Expected send transaction");
      }
      expect(senderAddressTransaction.kind).toEqual(unsigned.kind);
      expect(senderAddressTransaction.sender).toEqual(unsigned.sender);
      expect(senderAddressTransaction.recipient).toEqual(unsigned.recipient);
      expect(senderAddressTransaction.memo).toEqual(unsigned.memo);
      expect(senderAddressTransaction.amount).toEqual(unsigned.amount);

      // search by recipient address
      // TODO: Support searching by recipient

      // const recipientAddressSearchResponse = await connection.searchTx({ sentFromOrTo: defaultRecipient });
      // expect(recipientAddressSearchResponse).toBeTruthy();
      // expect(recipientAddressSearchResponse.length).toBeGreaterThanOrEqual(1);

      // const recipientAddressResult =
      //   recipientAddressSearchResponse[recipientAddressSearchResponse.length - 1];
      // expect(recipientAddressResult.transactionId).toEqual(transactionId);
      // if (isFailedTransaction(recipientAddressResult)) {
      //   throw new Error("Expected transaction to succeed");
      // }
      // expect(recipientAddressResult.log).toMatch(/success/i);
      // const { transaction: recipientAddressTransaction } = recipientAddressResult;
      // if (!isSendTransaction(recipientAddressTransaction)) {
      //   throw new Error("Expected send transaction");
      // }
      // expect(recipientAddressTransaction.kind).toEqual(unsigned.kind);
      // expect(recipientAddressTransaction.sender).toEqual(unsigned.sender);
      // expect(recipientAddressTransaction.recipient).toEqual(unsigned.recipient);
      // expect(recipientAddressTransaction.memo).toEqual(unsigned.memo);
      // expect(recipientAddressTransaction.amount).toEqual(unsigned.amount);

      // search by height

      const heightSearchResponse = await connection.searchTx({ height: idResult.height });
      expect(heightSearchResponse).toBeTruthy();
      expect(heightSearchResponse.length).toEqual(1);

      const heightResult = heightSearchResponse[0];
      expect(heightResult.transactionId).toEqual(transactionId);
      if (isFailedTransaction(heightResult)) {
        throw new Error("Expected transaction to succeed");
      }
      expect(heightResult.log).toMatch(/success/i);
      const { transaction: heightTransaction } = heightResult;
      if (!isSendTransaction(heightTransaction)) {
        throw new Error("Expected send transaction");
      }
      expect(heightTransaction.kind).toEqual(unsigned.kind);
      expect(heightTransaction.sender).toEqual(unsigned.sender);
      expect(heightTransaction.recipient).toEqual(unsigned.recipient);
      expect(heightTransaction.memo).toEqual(unsigned.memo);
      expect(heightTransaction.amount).toEqual(unsigned.amount);

      connection.disconnect();
    });
  });
});

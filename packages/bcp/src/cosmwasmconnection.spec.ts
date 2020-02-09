import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
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

import { CosmWasmCodec, cosmWasmCodec } from "./cosmwasmcodec";
import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";
import { signedTxJson, txId } from "./testdata.spec";
import { nonceToSequence } from "./types";

const { fromBase64, toHex } = Encoding;

function pendingWithoutCosmos(): void {
  if (!process.env.COSMOS_ENABLED) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
}

describe("CosmWasmConnection", () => {
  const cosm = "COSM" as TokenTicker;
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

  const defaultPrefix = "cosmos" as CosmosAddressBech32Prefix;

  // this is for wasmd blockchain
  const defaultTokens: TokenConfiguration = {
    bank: [
      {
        fractionalDigits: 6,
        name: "Fee Token",
        ticker: "COSM",
        denom: "ucosm",
      },
      {
        fractionalDigits: 6,
        name: "Staking Token",
        ticker: "STAKE",
        denom: "ustake",
      },
    ],
  };

  describe("establish", () => {
    it("can connect to Cosmos via http", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      expect(connection).toBeTruthy();
      connection.disconnect();
    });
  });

  describe("chainId", () => {
    it("displays the chain ID", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const chainId = connection.chainId();
      expect(chainId).toEqual(defaultChainId);
      connection.disconnect();
    });
  });

  describe("height", () => {
    it("displays the current height", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const height = await connection.height();
      expect(height).toBeGreaterThan(0);
      connection.disconnect();
    });
  });

  describe("getToken", () => {
    it("displays a given token", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const token = await connection.getToken("COSM" as TokenTicker);
      expect(token).toEqual({
        fractionalDigits: 6,
        tokenName: "Fee Token",
        tokenTicker: "COSM" as TokenTicker,
      });
      connection.disconnect();
    });

    it("resolves to undefined if the token is not supported", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const token = await connection.getToken("whatever" as TokenTicker);
      expect(token).toBeUndefined();
      connection.disconnect();
    });
  });

  describe("getAllTokens", () => {
    it("resolves to a list of all supported tokens", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const tokens = await connection.getAllTokens();
      // TODO: make this more flexible
      expect(tokens).toEqual([
        {
          fractionalDigits: 6,
          tokenName: "Fee Token",
          tokenTicker: "COSM" as TokenTicker,
        },
        {
          fractionalDigits: 6,
          tokenName: "Staking Token",
          tokenTicker: "STAKE" as TokenTicker,
        },
      ]);
      connection.disconnect();
    });
  });

  describe("identifier", () => {
    it("calculates tx hash from PostableBytes", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const postable = cosmWasmCodec.bytesToPost(signedTxJson);
      const id = await connection.identifier(postable);
      expect(id).toMatch(/^[0-9A-F]{64}$/);
      expect(id).toEqual(txId);
    });
  });

  describe("getAccount", () => {
    it("gets an empty account by address", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const account = await connection.getAccount({ address: defaultEmptyAddress });
      expect(account).toBeUndefined();
      connection.disconnect();
    });

    it("gets an account by address", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const account = await connection.getAccount({ address: defaultAddress });
      if (account === undefined) {
        throw new Error("Expected account not to be undefined");
      }
      expect(account.address).toEqual(defaultAddress);
      // Undefined until we sign a transaction (on multiple runs against one server this will be set), allow both
      if (account.pubkey !== undefined) {
        expect(account.pubkey).toEqual(defaultPubkey);
      }
      // Starts with two tokens
      expect(account.balance.length).toEqual(2);
      connection.disconnect();
    });

    it("gets an account by pubkey", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const account = await connection.getAccount({ pubkey: defaultPubkey });
      if (account === undefined) {
        throw new Error("Expected account not to be undefined");
      }
      expect(account.address).toEqual(defaultAddress);
      // Undefined until we sign a transaction (on multiple runs against one server this will be set), allow both
      if (account.pubkey !== undefined) {
        expect(account.pubkey).toEqual(defaultPubkey);
      }
      // Starts with two tokens
      expect(account.balance.length).toEqual(2);
      connection.disconnect();
    });
  });

  describe("integration tests", () => {
    it("can post and get a transaction", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucetMnemonic));
      const faucet = await profile.createIdentity(wallet.id, defaultChainId, faucetPath);
      const faucetAddress = cosmWasmCodec.identityToAddress(faucet);

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: faucetAddress,
        recipient: defaultRecipient,
        memo: "My first payment",
        amount: {
          quantity: "75000",
          fractionalDigits: 6,
          tokenTicker: cosm,
        },
      });
      const nonce = await connection.getNonce({ address: faucetAddress });
      // TODO: we need to use custom codecs everywhere
      const codec = new CosmWasmCodec(defaultPrefix, defaultTokens.bank);
      const signed = await profile.signTransaction(faucet, unsigned, codec, nonce);
      const postableBytes = codec.bytesToPost(signed);
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
      // we get a json response in the log for each msg, multiple events is good (transfer succeeded)
      const log = JSON.parse(getResponse.log!)[0];
      expect(log.events.length).toBe(2);
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
      // TODO: the nonce we recover in response doesn't have accountNumber, only sequence
      const signedSequence = nonceToSequence(signed.signatures[0].nonce);
      expect(signatures[0].nonce).toEqual(signedSequence);
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
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultTokens);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucetMnemonic));
      const faucet = await profile.createIdentity(wallet.id, defaultChainId, faucetPath);
      const faucetAddress = cosmWasmCodec.identityToAddress(faucet);

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: faucetAddress,
        recipient: defaultRecipient,
        memo: "My first payment",
        amount: {
          quantity: "75000",
          fractionalDigits: 6,
          tokenTicker: cosm,
        },
      });
      const nonce = await connection.getNonce({ address: faucetAddress });
      // TODO: we need to use custom codecs everywhere
      const codec = new CosmWasmCodec(defaultPrefix, defaultTokens.bank);
      const signed = await profile.signTransaction(faucet, unsigned, codec, nonce);
      const postableBytes = codec.bytesToPost(signed);
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
      const idlog = JSON.parse(idResult.log!)[0];
      expect(idlog.events.length).toBe(2);

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
      const senderLog = JSON.parse(senderAddressResult.log!)[0];
      expect(senderLog.events.length).toBe(2);

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
      const heightLog = JSON.parse(heightResult.log!)[0];
      expect(heightLog.events.length).toBe(2);

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

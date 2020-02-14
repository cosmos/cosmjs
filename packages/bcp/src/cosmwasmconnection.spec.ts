import { CosmosAddressBech32Prefix, decodeSignature } from "@cosmwasm/sdk";
import {
  Address,
  Algorithm,
  ChainId,
  isBlockInfoPending,
  isBlockInfoSucceeded,
  isConfirmedTransaction,
  isSendTransaction,
  PubkeyBytes,
  SendTransaction,
  TokenTicker,
  TransactionId,
  TransactionState,
} from "@iov/bcp";
import { Random, Secp256k1, Secp256k1Signature, Sha256 } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import { HdPaths, Secp256k1HdWallet, UserProfile } from "@iov/keycontrol";
import { assert } from "@iov/utils";

import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";
import { encodeFullSignature } from "./encode";
import * as testdata from "./testdata.spec";

const { fromBase64 } = Encoding;

function pendingWithoutCosmos(): void {
  if (!process.env.COSMOS_ENABLED) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
}

const defaultPrefix = "cosmos" as CosmosAddressBech32Prefix;

function makeRandomAddress(): Address {
  return Bech32.encode(defaultPrefix, Random.getBytes(20)) as Address;
}

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  path: HdPaths.cosmos(0),
  pubkey: {
    algo: Algorithm.Secp256k1,
    data: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ") as PubkeyBytes,
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6" as Address,
};

describe("CosmWasmConnection", () => {
  const cosm = "COSM" as TokenTicker;
  const httpUrl = "http://localhost:1317";
  const defaultChainId = "cosmos:testing" as ChainId;
  const defaultEmptyAddress = "cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r" as Address;
  const defaultRecipient = "cosmos1t70qnpr0az8tf7py83m4ue5y89w58lkjmx0yq2" as Address;

  const unusedAccount = {
    pubkey: {
      algo: Algorithm.Secp256k1,
      data: fromBase64("ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ") as PubkeyBytes,
    },
    address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u" as Address,
  };

  // this is for wasmd blockchain
  const defaultConfig: TokenConfiguration = {
    bankTokens: [
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
    erc20Tokens: [
      {
        contractAddress: "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5",
        fractionalDigits: 5,
        ticker: "ASH",
        name: "Ash Token",
      },
      {
        contractAddress: "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd",
        fractionalDigits: 0,
        ticker: "BASH",
        name: "Bash Token",
      },
      {
        contractAddress: "cosmos18r5szma8hm93pvx6lwpjwyxruw27e0k5uw835c",
        fractionalDigits: 18,
        ticker: "CASH",
        name: "Cash Token",
      },
    ],
  };

  const atomConfig: TokenConfiguration = {
    bankTokens: [
      {
        fractionalDigits: 6,
        name: "Atom",
        ticker: "ATOM",
        denom: "uatom",
      },
    ],
  };

  describe("establish", () => {
    it("can connect to Cosmos via http", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      expect(connection).toBeTruthy();
      connection.disconnect();
    });
  });

  describe("chainId", () => {
    it("displays the chain ID", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      expect(connection.chainId).toEqual(defaultChainId);
      connection.disconnect();
    });
  });

  describe("height", () => {
    it("displays the current height", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const height = await connection.height();
      expect(height).toBeGreaterThan(0);
      connection.disconnect();
    });
  });

  describe("getToken", () => {
    it("displays a given token", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
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
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const token = await connection.getToken("whatever" as TokenTicker);
      expect(token).toBeUndefined();
      connection.disconnect();
    });
  });

  describe("getAllTokens", () => {
    it("resolves to a list of all supported tokens", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const tokens = await connection.getAllTokens();
      expect(tokens).toEqual([
        {
          fractionalDigits: 5,
          tokenName: "Ash Token",
          tokenTicker: "ASH" as TokenTicker,
        },
        {
          fractionalDigits: 0,
          tokenName: "Bash Token",
          tokenTicker: "BASH" as TokenTicker,
        },
        {
          fractionalDigits: 18,
          tokenName: "Cash Token",
          tokenTicker: "CASH" as TokenTicker,
        },
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
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, atomConfig);
      const id = await connection.identifier(testdata.signedTxJson);
      expect(id).toMatch(/^[0-9A-F]{64}$/);
      expect(id).toEqual(testdata.txId);
    });
  });

  describe("getAccount", () => {
    it("gets an empty account by address", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const account = await connection.getAccount({ address: defaultEmptyAddress });
      expect(account).toBeUndefined();
      connection.disconnect();
    });

    it("gets an account by address", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const account = await connection.getAccount({ address: unusedAccount.address });
      assert(account, "Account must be defined");
      expect(account.address).toEqual(unusedAccount.address);
      expect(account.pubkey).toBeUndefined();
      expect(account.balance).toEqual([
        {
          tokenTicker: "ASH" as TokenTicker,
          quantity: "12812345",
          fractionalDigits: 5,
        },
        {
          tokenTicker: "BASH" as TokenTicker,
          quantity: "42",
          fractionalDigits: 0,
        },
        {
          tokenTicker: "COSM" as TokenTicker,
          quantity: "1000000000",
          fractionalDigits: 6,
        },
        {
          tokenTicker: "STAKE" as TokenTicker,
          quantity: "1000000000",
          fractionalDigits: 6,
        },
      ]);
      connection.disconnect();
    });

    it("gets an account by pubkey", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const byAddress = await connection.getAccount({ address: unusedAccount.address });
      const byPubkey = await connection.getAccount({ pubkey: unusedAccount.pubkey });
      expect(byPubkey).toEqual(byAddress); // above we verified that by address works as expected
      connection.disconnect();
    });

    it("has a pubkey when getting account with transactions", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const account = await connection.getAccount({ address: faucet.address });
      expect(account?.pubkey).toEqual(faucet.pubkey);
      connection.disconnect();
    });
  });

  describe("getTx", () => {
    it("can get a recently posted transaction", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucet.mnemonic));
      const senderIdentity = await profile.createIdentity(wallet.id, defaultChainId, faucet.path);
      const senderAddress = connection.codec.identityToAddress(senderIdentity);

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: senderAddress,
        recipient: defaultRecipient,
        memo: "My first payment",
        amount: {
          quantity: "75000",
          fractionalDigits: 6,
          tokenTicker: cosm,
        },
      });
      const nonce = await connection.getNonce({ address: senderAddress });
      const signed = await profile.signTransaction(senderIdentity, unsigned, connection.codec, nonce);
      const postableBytes = connection.codec.bytesToPost(signed);
      const response = await connection.postTx(postableBytes);
      const { transactionId } = response;
      await response.blockInfo.waitFor(info => isBlockInfoSucceeded(info));

      const getResponse = await connection.getTx(transactionId);
      expect(getResponse.transactionId).toEqual(transactionId);
      assert(isConfirmedTransaction(getResponse), "Expected transaction to succeed");
      assert(getResponse.log, "Log must be available");
      // we get a json response in the log for each msg, multiple events is good (transfer succeeded)
      const [firstLog] = JSON.parse(getResponse.log);
      expect(firstLog.events.length).toEqual(2);

      const { transaction, signatures } = getResponse;
      assert(isSendTransaction(transaction), "Expected send transaction");
      expect(transaction).toEqual(unsigned);
      expect(signatures.length).toEqual(1);
      expect(signatures[0]).toEqual({
        nonce: signed.signatures[0].nonce,
        pubkey: {
          algo: signed.signatures[0].pubkey.algo,
          data: Secp256k1.compressPubkey(signed.signatures[0].pubkey.data),
        },
        signature: Secp256k1.trimRecoveryByte(signed.signatures[0].signature),
      });

      connection.disconnect();
    });

    it("can get an old transaction", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);

      const results = await connection.searchTx({ sentFromOrTo: faucet.address });
      const firstSearchResult = results.find(() => true);
      assert(firstSearchResult, "At least one transaction sent by the faucet must be available.");
      assert(isConfirmedTransaction(firstSearchResult), "Transaction must be confirmed.");
      const {
        transaction: searchedTransaction,
        transactionId: searchedTransactionId,
        height: searchedHeight,
      } = firstSearchResult;

      const getResponse = await connection.getTx(searchedTransactionId);
      assert(isConfirmedTransaction(getResponse), "Expected transaction to succeed");
      const { height, transactionId, log, transaction, signatures } = getResponse;

      // Test properties of getTx result: height, transactionId, log, transaction
      expect(height).toEqual(searchedHeight);
      expect(transactionId).toEqual(searchedTransactionId);
      assert(log, "Log must be available");
      const [firstLog] = JSON.parse(log);
      expect(firstLog.events.length).toEqual(2);
      expect(transaction).toEqual(searchedTransaction);

      // Signature test ensures the nonce is correct
      expect(signatures.length).toEqual(1);
      const signBytes = connection.codec.bytesToSign(getResponse.transaction, signatures[0].nonce).bytes;
      const { pubkey, signature } = decodeSignature(encodeFullSignature(signatures[0]));
      const prehashed = new Sha256(signBytes).digest();
      const valid = await Secp256k1.verifySignature(
        new Secp256k1Signature(signature.slice(0, 32), signature.slice(32, 64)),
        prehashed,
        pubkey,
      );
      expect(valid).toEqual(true);

      connection.disconnect();
    });

    it("throws for non-existent transaction", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);

      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000" as TransactionId;
      await connection.getTx(nonExistentId).then(
        () => fail("this must not succeed"),
        error => expect(error).toMatch(/transaction does not exist/i),
      );

      connection.disconnect();
    });
  });

  describe("integration tests", () => {
    it("can post and search for a transaction", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucet.mnemonic));
      const sender = await profile.createIdentity(wallet.id, defaultChainId, faucet.path);
      const senderAddress = connection.codec.identityToAddress(sender);

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: senderAddress,
        recipient: defaultRecipient,
        memo: "My first payment",
        amount: {
          quantity: "75000",
          fractionalDigits: 6,
          tokenTicker: cosm,
        },
      });
      const nonce = await connection.getNonce({ address: senderAddress });
      const signed = await profile.signTransaction(sender, unsigned, connection.codec, nonce);
      const postableBytes = connection.codec.bytesToPost(signed);
      const response = await connection.postTx(postableBytes);
      const { transactionId } = response;
      const blockInfo = await response.blockInfo.waitFor(info => !isBlockInfoPending(info));
      expect(blockInfo.state).toEqual(TransactionState.Succeeded);

      // search by id
      const byIdResults = await connection.searchTx({ id: transactionId });
      expect(byIdResults.length).toEqual(1);
      const byIdResult = byIdResults[0];
      expect(byIdResult.transactionId).toEqual(transactionId);
      assert(isConfirmedTransaction(byIdResult), "Expected transaction to succeed");
      assert(byIdResult.log, "Log must be available");
      const [firstByIdlog] = JSON.parse(byIdResult.log);
      expect(firstByIdlog.events.length).toEqual(2);
      expect(firstByIdlog.events[0].type).toEqual("message");
      expect(firstByIdlog.events[1].type).toEqual("transfer");
      const byIdTransaction = byIdResult.transaction;
      assert(isSendTransaction(byIdTransaction), "Expected send transaction");
      expect(byIdTransaction).toEqual(unsigned);

      // search by sender address
      const bySenderResults = await connection.searchTx({ sentFromOrTo: senderAddress });
      expect(bySenderResults).toBeTruthy();
      expect(bySenderResults.length).toBeGreaterThanOrEqual(1);
      const bySenderResult = bySenderResults[bySenderResults.length - 1];
      expect(bySenderResult.transactionId).toEqual(transactionId);
      assert(isConfirmedTransaction(bySenderResult), "Expected transaction to succeed");
      assert(bySenderResult.log, "Log must be available");
      const [firstBySenderLog] = JSON.parse(bySenderResult.log);
      expect(firstBySenderLog.events.length).toEqual(2);
      expect(firstBySenderLog.events[0].type).toEqual("message");
      expect(firstBySenderLog.events[1].type).toEqual("transfer");
      const bySenderTransaction = bySenderResult.transaction;
      assert(isSendTransaction(bySenderTransaction), "Expected send transaction");
      expect(bySenderTransaction).toEqual(unsigned);

      // search by recipient address
      const byRecipientResults = await connection.searchTx({ sentFromOrTo: defaultRecipient });
      expect(byRecipientResults.length).toBeGreaterThanOrEqual(1);
      const byRecipientResult = byRecipientResults[byRecipientResults.length - 1];
      expect(byRecipientResult.transactionId).toEqual(transactionId);
      assert(isConfirmedTransaction(byRecipientResult), "Expected transaction to succeed");
      assert(byRecipientResult.log, "Log must be available");
      const [firstByRecipientLog] = JSON.parse(bySenderResult.log);
      expect(firstByRecipientLog.events.length).toEqual(2);
      expect(firstByRecipientLog.events[0].type).toEqual("message");
      expect(firstByRecipientLog.events[1].type).toEqual("transfer");
      const byRecipeintTransaction = byRecipientResult.transaction;
      assert(isSendTransaction(byRecipeintTransaction), "Expected send transaction");
      expect(byRecipeintTransaction).toEqual(unsigned);

      // search by height
      const heightResults = await connection.searchTx({ height: byIdResult.height });
      expect(heightResults.length).toEqual(1);
      const heightResult = heightResults[0];
      expect(heightResult.transactionId).toEqual(transactionId);
      assert(isConfirmedTransaction(heightResult), "Expected transaction to succeed");
      assert(heightResult.log, "Log must be available");
      const [firstHeightLog] = JSON.parse(heightResult.log);
      expect(firstHeightLog.events.length).toEqual(2);
      const heightTransaction = heightResult.transaction;
      assert(isSendTransaction(heightTransaction), "Expected send transaction");
      expect(heightTransaction).toEqual(unsigned);

      connection.disconnect();
    });

    it("can send ERC20 tokens", async () => {
      pendingWithoutCosmos();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(faucet.mnemonic));
      const sender = await profile.createIdentity(wallet.id, defaultChainId, faucet.path);
      const senderAddress = connection.codec.identityToAddress(sender);
      const recipient = makeRandomAddress();

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: senderAddress,
        recipient: recipient,
        memo: "My first payment",
        amount: {
          quantity: "75",
          fractionalDigits: 0,
          tokenTicker: "BASH" as TokenTicker,
        },
      });
      const nonce = await connection.getNonce({ address: senderAddress });
      const signed = await profile.signTransaction(sender, unsigned, connection.codec, nonce);
      const postableBytes = connection.codec.bytesToPost(signed);
      const response = await connection.postTx(postableBytes);
      const blockInfo = await response.blockInfo.waitFor(info => !isBlockInfoPending(info));
      expect(blockInfo.state).toEqual(TransactionState.Succeeded);

      const recipientAccount = await connection.getAccount({ address: recipient });
      assert(recipientAccount, "Recipient account must have BASH tokens");
      expect(recipientAccount.balance).toEqual([
        {
          tokenTicker: "BASH" as TokenTicker,
          quantity: "75",
          fractionalDigits: 0,
        },
      ]);

      connection.disconnect();
    });
  });
});

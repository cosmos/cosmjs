import { decodeSignature } from "@cosmwasm/sdk";
import {
  Account,
  Address,
  Algorithm,
  Amount,
  ChainId,
  ConfirmedTransaction,
  isBlockInfoPending,
  isBlockInfoSucceeded,
  isConfirmedTransaction,
  isSendTransaction,
  PubkeyBytes,
  SendTransaction,
  TokenTicker,
  TransactionId,
  TransactionState,
  UnsignedTransaction,
} from "@iov/bcp";
import { Random, Secp256k1, Secp256k1Signature, Sha256 } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import { HdPaths, Secp256k1HdWallet, UserProfile } from "@iov/keycontrol";
import { assert } from "@iov/utils";
import BN from "bn.js";

import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";
import { encodeFullSignature } from "./encode";
import * as testdata from "./testdata.spec";

const { fromBase64 } = Encoding;

function pendingWithoutWasmd(): void {
  if (!process.env.WASMD_ENABLED) {
    return pending("Set WASMD_ENABLED to enable Cosmos node-based tests");
  }
}

const defaultAddressPrefix = "cosmos";

function makeRandomAddress(): Address {
  return Bech32.encode(defaultAddressPrefix, Random.getBytes(20)) as Address;
}

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  path: HdPaths.cosmosHub(0),
  pubkey: {
    algo: Algorithm.Secp256k1,
    data: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ") as PubkeyBytes,
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6" as Address,
};

/**
 * We use a different test account than the faucet, since BCP errors when transactions
 * with multiple messages are found.
 */
const bob = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  path: HdPaths.cosmosHub(4),
  pubkey: {
    algo: Algorithm.Secp256k1,
    data: fromBase64("Aum2063ub/ErUnIUB36sK55LktGUStgcbSiaAnL1wadu") as PubkeyBytes,
  },
  address: "cosmos1hsm76p4ahyhl5yh3ve9ur49r5kemhp2r0dcjvx" as Address,
};

describe("CosmWasmConnection", () => {
  const cosm = "COSM" as TokenTicker;
  const isa = "ISA" as TokenTicker;
  const httpUrl = "http://localhost:1317";
  const defaultChainId = "cosmos:testing" as ChainId;
  const defaultEmptyAddress = "cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r" as Address;
  const defaultRecipient = "cosmos1t70qnpr0az8tf7py83m4ue5y89w58lkjmx0yq2" as Address;
  const defaultAmount: Amount = {
    quantity: "7744887",
    fractionalDigits: 6,
    tokenTicker: cosm,
  };

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
        ticker: "HASH",
        name: "Hash Token",
      },
      {
        contractAddress: "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd",
        fractionalDigits: 0,
        ticker: "ISA",
        name: "Isa Token",
      },
      {
        contractAddress: "cosmos18r5szma8hm93pvx6lwpjwyxruw27e0k5uw835c",
        fractionalDigits: 18,
        ticker: "JADE",
        name: "Jade Token",
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
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      expect(connection).toBeTruthy();
      connection.disconnect();
    });
  });

  describe("chainId", () => {
    it("displays the chain ID", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      expect(connection.chainId).toEqual(defaultChainId);
      connection.disconnect();
    });
  });

  describe("height", () => {
    it("displays the current height", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const height = await connection.height();
      expect(height).toBeGreaterThan(0);
      connection.disconnect();
    });
  });

  describe("getToken", () => {
    it("displays a given token", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const token = await connection.getToken("COSM" as TokenTicker);
      expect(token).toEqual({
        fractionalDigits: 6,
        tokenName: "Fee Token",
        tokenTicker: "COSM" as TokenTicker,
      });
      connection.disconnect();
    });

    it("resolves to undefined if the token is not supported", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const token = await connection.getToken("whatever" as TokenTicker);
      expect(token).toBeUndefined();
      connection.disconnect();
    });
  });

  describe("getAllTokens", () => {
    it("resolves to a list of all supported tokens", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const tokens = await connection.getAllTokens();
      expect(tokens).toEqual([
        {
          fractionalDigits: 6,
          tokenName: "Fee Token",
          tokenTicker: "COSM" as TokenTicker,
        },
        {
          fractionalDigits: 5,
          tokenName: "Hash Token",
          tokenTicker: "HASH" as TokenTicker,
        },
        {
          fractionalDigits: 0,
          tokenName: "Isa Token",
          tokenTicker: "ISA" as TokenTicker,
        },
        {
          fractionalDigits: 18,
          tokenName: "Jade Token",
          tokenTicker: "JADE" as TokenTicker,
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
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, atomConfig);
      const id = await connection.identifier(testdata.signedTxJson);
      expect(id).toMatch(/^[0-9A-F]{64}$/);
      expect(id).toEqual(testdata.txId);
    });
  });

  describe("getAccount", () => {
    it("gets an empty account by address", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const account = await connection.getAccount({ address: defaultEmptyAddress });
      expect(account).toBeUndefined();
      connection.disconnect();
    });

    it("gets an account by address", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const account = await connection.getAccount({ address: unusedAccount.address });
      assert(account, "Account must be defined");
      expect(account.address).toEqual(unusedAccount.address);
      expect(account.pubkey).toBeUndefined();
      expect(account.balance).toEqual([
        {
          tokenTicker: "COSM" as TokenTicker,
          quantity: "1000000000",
          fractionalDigits: 6,
        },
        {
          tokenTicker: "HASH" as TokenTicker,
          quantity: "12812345",
          fractionalDigits: 5,
        },
        {
          tokenTicker: "ISA" as TokenTicker,
          quantity: "42",
          fractionalDigits: 0,
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
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const byAddress = await connection.getAccount({ address: unusedAccount.address });
      const byPubkey = await connection.getAccount({ pubkey: unusedAccount.pubkey });
      expect(byPubkey).toEqual(byAddress); // above we verified that by address works as expected
      connection.disconnect();
    });

    it("has a pubkey when getting account with transactions", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const account = await connection.getAccount({ address: faucet.address });
      expect(account?.pubkey).toEqual(faucet.pubkey);
      connection.disconnect();
    });
  });

  describe("watchAccount", () => {
    it("can watch account by address", (done) => {
      pendingWithoutWasmd();
      const recipient = makeRandomAddress();
      const events = new Array<Account | undefined>();

      (async () => {
        const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
        const subscription = connection.watchAccount({ address: recipient }).subscribe({
          next: (event) => {
            events.push(event);

            if (events.length === 3) {
              const [event1, event2, event3] = events;

              expect(event1).toBeUndefined();

              assert(event2, "Second event must not be undefined");
              expect(event2.address).toEqual(recipient);
              expect(event2.pubkey).toBeUndefined();
              expect(event2.balance.length).toEqual(1);
              expect(event2.balance[0].quantity).toEqual(defaultAmount.quantity);
              expect(event2.balance[0].tokenTicker).toEqual(defaultAmount.tokenTicker);

              assert(event3, "Third event must not be undefined");
              expect(event3.address).toEqual(recipient);
              expect(event3.pubkey).toBeUndefined();
              expect(event3.balance.length).toEqual(1);
              expect(event3.balance[0].quantity).toEqual(new BN(defaultAmount.quantity).imuln(2).toString());
              expect(event3.balance[0].tokenTicker).toEqual(defaultAmount.tokenTicker);

              subscription.unsubscribe();
              connection.disconnect();
              done();
            }
          },
          complete: done.fail,
          error: done.fail,
        });

        const profile = new UserProfile();
        const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
        const sender = await profile.createIdentity(wallet.id, defaultChainId, bob.path);
        const senderAddress = connection.codec.identityToAddress(sender);

        for (const i of [0, 1]) {
          const sendTx = await connection.withDefaultFee<SendTransaction>({
            kind: "bcp/send",
            chainId: defaultChainId,
            senderPubkey: sender.pubkey,
            sender: senderAddress,
            recipient: recipient,
            amount: defaultAmount,
            memo: `Trigger for new event ${i}`,
          });
          const nonce = await connection.getNonce({ address: senderAddress });
          const signedTransaction = await profile.signTransaction(sender, sendTx, connection.codec, nonce);
          const result = await connection.postTx(connection.codec.bytesToPost(signedTransaction));
          await result.blockInfo.waitFor((info) => !isBlockInfoPending(info));
        }
      })().catch(done.fail);
    });
  });

  describe("getTx", () => {
    it("can get a recently posted bank send transaction", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
      const senderIdentity = await profile.createIdentity(wallet.id, defaultChainId, bob.path);
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
      await response.blockInfo.waitFor((info) => isBlockInfoSucceeded(info));

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

    it("can get a recently posted ERC20 send transaction", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
      const senderIdentity = await profile.createIdentity(wallet.id, defaultChainId, bob.path);
      const senderAddress = connection.codec.identityToAddress(senderIdentity);

      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: senderAddress,
        recipient: defaultRecipient,
        memo: "An ERC20 payment",
        amount: {
          quantity: "345",
          fractionalDigits: 0,
          tokenTicker: isa,
        },
      });
      const nonce = await connection.getNonce({ address: senderAddress });
      const signed = await profile.signTransaction(senderIdentity, unsigned, connection.codec, nonce);
      const postableBytes = connection.codec.bytesToPost(signed);
      const response = await connection.postTx(postableBytes);
      const { transactionId } = response;
      await response.blockInfo.waitFor((info) => isBlockInfoSucceeded(info));

      const getResponse = await connection.getTx(transactionId);
      expect(getResponse.transactionId).toEqual(transactionId);
      assert(isConfirmedTransaction(getResponse), "Expected transaction to succeed");
      assert(getResponse.log, "Log must be available");
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
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);

      const results = await connection.searchTx({ sentFromOrTo: bob.address });
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
        Secp256k1Signature.fromFixedLength(signature),
        prehashed,
        pubkey,
      );
      expect(valid).toEqual(true);

      connection.disconnect();
    });

    it("throws for non-existent transaction", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);

      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000" as TransactionId;
      await connection.getTx(nonExistentId).then(
        () => fail("this must not succeed"),
        (error) => expect(error).toMatch(/transaction does not exist/i),
      );

      connection.disconnect();
    });
  });

  describe("searchTx", () => {
    it("can post and search for a transaction", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
      const sender = await profile.createIdentity(wallet.id, defaultChainId, bob.path);
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
      const blockInfo = await response.blockInfo.waitFor((info) => !isBlockInfoPending(info));
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

    it("can post an ERC20 transfer and search for the transaction", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
      const sender = await profile.createIdentity(wallet.id, defaultChainId, bob.path);
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
          tokenTicker: "ISA" as TokenTicker,
        },
      });
      const nonce = await connection.getNonce({ address: senderAddress });
      const signed = await profile.signTransaction(sender, unsigned, connection.codec, nonce);
      const postableBytes = connection.codec.bytesToPost(signed);
      const response = await connection.postTx(postableBytes);
      const { transactionId } = response;
      const blockInfo = await response.blockInfo.waitFor((info) => !isBlockInfoPending(info));
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
      expect(firstByIdlog.events[1].type).toEqual("wasm");
      // wasm event attributes added by contract
      expect(firstByIdlog.events[1].attributes).toContain({ key: "action", value: "transfer" });
      expect(firstByIdlog.events[1].attributes).toContain({ key: "sender", value: senderAddress });
      expect(firstByIdlog.events[1].attributes).toContain({ key: "recipient", value: recipient });
      // wasm event attributes added wasmd
      expect(firstByIdlog.events[1].attributes).toContain({
        key: "contract_address",
        value: defaultConfig.erc20Tokens![1].contractAddress,
      });
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
      expect(firstBySenderLog.events[1].type).toEqual("wasm");
      // wasm event attributes added by contract
      expect(firstBySenderLog.events[1].attributes).toContain({ key: "action", value: "transfer" });
      expect(firstBySenderLog.events[1].attributes).toContain({ key: "sender", value: senderAddress });
      expect(firstBySenderLog.events[1].attributes).toContain({ key: "recipient", value: recipient });
      // wasm event attributes added wasmd
      expect(firstBySenderLog.events[1].attributes).toContain({
        key: "contract_address",
        value: defaultConfig.erc20Tokens![1].contractAddress,
      });
      const bySenderTransaction = bySenderResult.transaction;
      assert(isSendTransaction(bySenderTransaction), "Expected send transaction");
      expect(bySenderTransaction).toEqual(unsigned);

      // search by recipient address
      const byRecipientResults = await connection.searchTx({ sentFromOrTo: recipient });
      expect(byRecipientResults.length).toBeGreaterThanOrEqual(1);
      const byRecipientResult = byRecipientResults[byRecipientResults.length - 1];
      expect(byRecipientResult.transactionId).toEqual(transactionId);
      assert(isConfirmedTransaction(byRecipientResult), "Expected transaction to succeed");
      assert(byRecipientResult.log, "Log must be available");
      const [firstByRecipientLog] = JSON.parse(bySenderResult.log);
      expect(firstByRecipientLog.events.length).toEqual(2);
      expect(firstByRecipientLog.events[0].type).toEqual("message");
      expect(firstByRecipientLog.events[1].type).toEqual("wasm");
      // wasm event attributes added by contract
      expect(firstByRecipientLog.events[1].attributes).toContain({ key: "action", value: "transfer" });
      expect(firstByRecipientLog.events[1].attributes).toContain({ key: "sender", value: senderAddress });
      expect(firstByRecipientLog.events[1].attributes).toContain({ key: "recipient", value: recipient });
      // wasm event attributes added wasmd
      expect(firstByRecipientLog.events[1].attributes).toContain({
        key: "contract_address",
        value: defaultConfig.erc20Tokens![1].contractAddress,
      });
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

    it("can search by minHeight and maxHeight", async () => {
      pendingWithoutWasmd();
      const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);
      const profile = new UserProfile();
      const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
      const sender = await profile.createIdentity(wallet.id, defaultChainId, bob.path);
      const senderAddress = connection.codec.identityToAddress(sender);

      const recipient = makeRandomAddress();
      const unsigned = await connection.withDefaultFee<SendTransaction>({
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: senderAddress,
        recipient: recipient,
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
      const blockInfo = await response.blockInfo.waitFor((info) => !isBlockInfoPending(info));
      assert(isBlockInfoSucceeded(blockInfo));
      const { height } = blockInfo;

      // search by ID
      {
        const results = await connection.searchTx({ id: transactionId });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ id: transactionId, minHeight: height });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ id: transactionId, minHeight: height - 2 });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ id: transactionId, maxHeight: height });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ id: transactionId, maxHeight: height + 2 });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({
          id: transactionId,
          minHeight: height,
          maxHeight: height,
        });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ id: transactionId, minHeight: height + 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({ id: transactionId, maxHeight: height - 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({
          id: transactionId,
          minHeight: height + 1,
          maxHeight: Number.MAX_SAFE_INTEGER,
        });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({ id: transactionId, minHeight: 0, maxHeight: height - 1 });
        expect(results.length).toEqual(0);
      }

      // search by recipient
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, minHeight: height });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, minHeight: height - 2 });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, maxHeight: height });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, maxHeight: height + 2 });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, minHeight: height + 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, maxHeight: height - 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({
          sentFromOrTo: recipient,
          minHeight: height,
          maxHeight: height,
        });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, minHeight: height + 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({ sentFromOrTo: recipient, maxHeight: height - 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({
          sentFromOrTo: recipient,
          minHeight: height + 1,
          maxHeight: Number.MAX_SAFE_INTEGER,
        });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({
          sentFromOrTo: recipient,
          minHeight: 0,
          maxHeight: height - 1,
        });
        expect(results.length).toEqual(0);
      }

      // search by height
      {
        const results = await connection.searchTx({ height: height });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ height: height, minHeight: height });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ height: height, minHeight: height - 2 });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ height: height, maxHeight: height });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ height: height, maxHeight: height + 2 });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ height: height, minHeight: height + 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({ height: height, maxHeight: height - 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({
          height: height,
          minHeight: height,
          maxHeight: height,
        });
        expect(results.length).toEqual(1);
      }
      {
        const results = await connection.searchTx({ height: height, minHeight: height + 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({ height: height, maxHeight: height - 1 });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({
          height: height,
          minHeight: height + 1,
          maxHeight: Number.MAX_SAFE_INTEGER,
        });
        expect(results.length).toEqual(0);
      }
      {
        const results = await connection.searchTx({
          height: height,
          minHeight: 0,
          maxHeight: height - 1,
        });
        expect(results.length).toEqual(0);
      }

      connection.disconnect();
    });
  });

  describe("liveTx", () => {
    it("can listen to transactions by recipient address (transactions in history and updates)", (done) => {
      pendingWithoutWasmd();

      (async () => {
        const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);

        const profile = new UserProfile();
        const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
        const sender = await profile.createIdentity(wallet.id, defaultChainId, bob.path);

        // send transactions

        const recipientAddress = makeRandomAddress();
        const sendA = await connection.withDefaultFee<SendTransaction>({
          kind: "bcp/send",
          chainId: defaultChainId,
          senderPubkey: sender.pubkey,
          sender: connection.codec.identityToAddress(sender),
          recipient: recipientAddress,
          amount: defaultAmount,
          memo: `liveTx() test A ${Math.random()}`,
        });

        const sendB = await connection.withDefaultFee<SendTransaction>({
          kind: "bcp/send",
          chainId: defaultChainId,
          senderPubkey: sender.pubkey,
          sender: connection.codec.identityToAddress(sender),
          recipient: recipientAddress,
          amount: defaultAmount,
          memo: `liveTx() test B ${Math.random()}`,
        });

        const sendC = await connection.withDefaultFee<SendTransaction>({
          kind: "bcp/send",
          chainId: defaultChainId,
          senderPubkey: sender.pubkey,
          sender: connection.codec.identityToAddress(sender),
          recipient: recipientAddress,
          amount: defaultAmount,
          memo: `liveTx() test C ${Math.random()}`,
        });

        const [nonceA, nonceB, nonceC] = await connection.getNonces({ pubkey: sender.pubkey }, 3);
        const signedA = await profile.signTransaction(sender, sendA, connection.codec, nonceA);
        const signedB = await profile.signTransaction(sender, sendB, connection.codec, nonceB);
        const signedC = await profile.signTransaction(sender, sendC, connection.codec, nonceC);
        const bytesToPostA = connection.codec.bytesToPost(signedA);
        const bytesToPostB = connection.codec.bytesToPost(signedB);
        const bytesToPostC = connection.codec.bytesToPost(signedC);

        // Post A and B. Unfortunately the REST server API does not support sending them in parallel because the sequence check fails.
        const postResultA = await connection.postTx(bytesToPostA);
        await postResultA.blockInfo.waitFor((info) => !isBlockInfoPending(info));
        const postResultB = await connection.postTx(bytesToPostB);
        await postResultB.blockInfo.waitFor((info) => !isBlockInfoPending(info));

        // setup listener after A and B are in block
        const events = new Array<ConfirmedTransaction<UnsignedTransaction>>();
        const subscription = connection.liveTx({ sentFromOrTo: recipientAddress }).subscribe({
          next: (event) => {
            assert(isConfirmedTransaction(event), "Confirmed transaction expected");
            events.push(event);

            assert(isSendTransaction(event.transaction), "Unexpected transaction type");
            expect(event.transaction.recipient).toEqual(recipientAddress);

            if (events.length === 3) {
              expect(events[1].height).toEqual(events[0].height + 1);
              expect(events[2].height).toBeGreaterThan(events[1].height);

              subscription.unsubscribe();
              connection.disconnect();
              done();
            }
          },
        });

        // Post C
        await connection.postTx(bytesToPostC);
      })().catch(done.fail);
    });

    it("can listen to transactions by ID (transaction in history)", (done) => {
      pendingWithoutWasmd();

      (async () => {
        const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);

        const profile = new UserProfile();
        const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
        const sender = await profile.createIdentity(wallet.id, defaultChainId, bob.path);

        const recipientAddress = makeRandomAddress();
        const send = await connection.withDefaultFee<SendTransaction>({
          kind: "bcp/send",
          chainId: defaultChainId,
          senderPubkey: sender.pubkey,
          sender: connection.codec.identityToAddress(sender),
          recipient: recipientAddress,
          amount: defaultAmount,
          memo: `liveTx() test ${Math.random()}`,
        });

        const nonce = await connection.getNonce({ pubkey: sender.pubkey });
        const signed = await profile.signTransaction(sender, send, connection.codec, nonce);
        const bytesToPost = connection.codec.bytesToPost(signed);

        const postResult = await connection.postTx(bytesToPost);
        const transactionId = postResult.transactionId;

        // Wait for a block
        await postResult.blockInfo.waitFor((info) => !isBlockInfoPending(info));

        // setup listener after transaction is in block
        const events = new Array<ConfirmedTransaction<UnsignedTransaction>>();
        const subscription = connection.liveTx({ id: transactionId }).subscribe({
          next: (event) => {
            assert(isConfirmedTransaction(event), "Confirmed transaction expected");
            events.push(event);

            assert(isSendTransaction(event.transaction), "Unexpected transaction type");
            expect(event.transaction.recipient).toEqual(recipientAddress);
            expect(event.transactionId).toEqual(transactionId);

            subscription.unsubscribe();
            connection.disconnect();
            done();
          },
        });
      })().catch(done.fail);
    });

    it("can listen to transactions by ID (transaction in updates)", (done) => {
      pendingWithoutWasmd();

      (async () => {
        const connection = await CosmWasmConnection.establish(httpUrl, defaultAddressPrefix, defaultConfig);

        const profile = new UserProfile();
        const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(bob.mnemonic));
        const sender = await profile.createIdentity(wallet.id, defaultChainId, bob.path);

        // send transactions

        const recipientAddress = makeRandomAddress();
        const send = await connection.withDefaultFee<SendTransaction>({
          kind: "bcp/send",
          chainId: defaultChainId,
          senderPubkey: sender.pubkey,
          sender: connection.codec.identityToAddress(sender),
          recipient: recipientAddress,
          amount: defaultAmount,
          memo: `liveTx() test ${Math.random()}`,
        });

        const nonce = await connection.getNonce({ pubkey: sender.pubkey });
        const signed = await profile.signTransaction(sender, send, connection.codec, nonce);
        const bytesToPost = connection.codec.bytesToPost(signed);

        const postResult = await connection.postTx(bytesToPost);
        const transactionId = postResult.transactionId;

        // setup listener before transaction is in block
        const events = new Array<ConfirmedTransaction<UnsignedTransaction>>();
        const subscription = connection.liveTx({ id: transactionId }).subscribe({
          next: (event) => {
            assert(isConfirmedTransaction(event), "Confirmed transaction expected");
            events.push(event);

            assert(isSendTransaction(event.transaction), "Unexpected transaction type");
            expect(event.transaction.recipient).toEqual(recipientAddress);
            expect(event.transactionId).toEqual(transactionId);

            subscription.unsubscribe();
            connection.disconnect();
            done();
          },
        });
      })().catch(done.fail);
    });
  });
});

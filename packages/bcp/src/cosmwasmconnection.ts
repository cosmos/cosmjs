import { CosmWasmClient, findSequenceForSignedTx, IndexedTx, SearchTxFilter, types } from "@cosmwasm/sdk";
import {
  Account,
  AccountQuery,
  AddressQuery,
  Amount,
  BlockchainConnection,
  BlockHeader,
  BlockId,
  BlockInfo,
  ChainId,
  ConfirmedAndSignedTransaction,
  ConfirmedTransaction,
  FailedTransaction,
  Fee,
  isConfirmedTransaction,
  isPubkeyQuery,
  isSendTransaction,
  Nonce,
  PostableBytes,
  PostTxResponse,
  PubkeyQuery,
  SignedTransaction,
  Token,
  TokenTicker,
  TransactionId,
  TransactionQuery,
  TransactionState,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp";
import { Encoding, Uint53 } from "@iov/encoding";
import { concat, DefaultValueProducer, ValueAndUpdates } from "@iov/stream";
import BN from "bn.js";
import equal from "fast-deep-equal";
import { ReadonlyDate } from "readonly-date";
import { Producer, Stream } from "xstream";

import { pubkeyToAddress } from "./address";
import { Caip5 } from "./caip5";
import { CosmWasmCodec } from "./cosmwasmcodec";
import { decodeAmount, decodePubkey, parseTxsResponseSigned, parseTxsResponseUnsigned } from "./decode";
import { buildSignedTx } from "./encode";
import { accountToNonce, BankToken, Erc20Token } from "./types";

// poll every 0.5 seconds (block time 1s)
const defaultPollInterval = 500;

export interface TokenConfiguration {
  /** Supported tokens of the Cosmos SDK bank module */
  readonly bankTokens: ReadonlyArray<BankToken & { readonly name: string }>;
  /** Smart contract based tokens (ERC20 compatible). Unset means empty array. */
  readonly erc20Tokens?: ReadonlyArray<Erc20Token & { readonly name: string }>;
}

function isDefined<X>(value: X | undefined): value is X {
  return value !== undefined;
}

function deduplicate<T>(input: ReadonlyArray<T>, comparator: (a: T, b: T) => number): Array<T> {
  const out = new Array<T>();
  for (const element of input) {
    if (!out.find((o) => comparator(o, element) === 0)) {
      out.push(element);
    }
  }
  return out;
}

/** Compares transaxtion by height. If the height is equal, compare by hash to ensure deterministic order */
function compareByHeightAndHash(a: IndexedTx, b: IndexedTx): number {
  if (a.height === b.height) {
    return a.hash.localeCompare(b.hash);
  } else {
    return a.height - b.height;
  }
}

/** Account and undefined are valid events. The third option means no event fired yet */
type LastWatchAccountEvent = Account | undefined | "no_event_fired_yet";

export class CosmWasmConnection implements BlockchainConnection {
  // we must know prefix and tokens a priori to understand the chain
  public static async establish(
    url: string,
    addressPrefix: string,
    tokens: TokenConfiguration,
  ): Promise<CosmWasmConnection> {
    const cosmWasmClient = new CosmWasmClient(url);
    const chainData = await this.initialize(cosmWasmClient);
    return new CosmWasmConnection(cosmWasmClient, chainData, addressPrefix, tokens);
  }

  private static async initialize(cosmWasmClient: CosmWasmClient): Promise<ChainId> {
    const rawChainId = await cosmWasmClient.getChainId();
    return Caip5.encode(rawChainId);
  }

  public readonly chainId: ChainId;
  public readonly codec: TxCodec;

  private readonly cosmWasmClient: CosmWasmClient;
  private readonly addressPrefix: string;
  private readonly bankTokens: readonly BankToken[];
  private readonly erc20Tokens: readonly Erc20Token[];

  // these are derived from arguments (cached for use in multiple functions)
  private readonly feeToken: BankToken | undefined;
  private readonly supportedTokens: readonly Token[];

  private constructor(
    cosmWasmClient: CosmWasmClient,
    chainId: ChainId,
    addressPrefix: string,
    tokens: TokenConfiguration,
  ) {
    this.cosmWasmClient = cosmWasmClient;
    this.chainId = chainId;
    this.codec = new CosmWasmCodec(addressPrefix, tokens.bankTokens, tokens.erc20Tokens);
    this.addressPrefix = addressPrefix;
    this.bankTokens = tokens.bankTokens;
    this.feeToken = this.bankTokens.find(() => true);
    const erc20Tokens = tokens.erc20Tokens || [];
    this.erc20Tokens = erc20Tokens;
    this.supportedTokens = [...tokens.bankTokens, ...erc20Tokens]
      .map((info) => ({
        tokenTicker: info.ticker as TokenTicker,
        tokenName: info.name,
        fractionalDigits: info.fractionalDigits,
      }))
      .sort((a, b) => a.tokenTicker.localeCompare(b.tokenTicker));
  }

  public disconnect(): void {
    return;
  }

  public async height(): Promise<number> {
    return this.cosmWasmClient.getHeight();
  }

  public async getToken(searchTicker: TokenTicker): Promise<Token | undefined> {
    return (await this.getAllTokens()).find(({ tokenTicker }) => tokenTicker === searchTicker);
  }

  public async getAllTokens(): Promise<readonly Token[]> {
    return this.supportedTokens;
  }

  /**
   * This is a replacement for the unimplemented CosmWasmCodec.identifier. Here we have more
   * context and network available, which we might use to implement the API in an async way.
   */
  public async identifier(signed: SignedTransaction): Promise<TransactionId> {
    const tx = buildSignedTx(signed, this.bankTokens, this.erc20Tokens);
    const id = await this.cosmWasmClient.getIdentifier(tx);
    return id as TransactionId;
  }

  public async getAccount(query: AccountQuery): Promise<Account | undefined> {
    const address = isPubkeyQuery(query) ? pubkeyToAddress(query.pubkey, this.addressPrefix) : query.address;
    const bankAccount = await this.cosmWasmClient.getAccount(address);

    const supportedBankCoins = (bankAccount?.balance || []).filter(({ denom }) =>
      this.bankTokens.find((token) => token.denom === denom),
    );
    const erc20Amounts = await Promise.all(
      this.erc20Tokens.map(
        async (erc20): Promise<Amount> => {
          const queryMsg = { balance: { address: address } };
          const response = await this.cosmWasmClient.queryContractSmart(erc20.contractAddress, queryMsg);
          const normalizedBalance = new BN(response.balance).toString();
          return {
            fractionalDigits: erc20.fractionalDigits,
            quantity: normalizedBalance,
            tokenTicker: erc20.ticker as TokenTicker,
          };
        },
      ),
    );
    const nonZeroErc20Amounts = erc20Amounts.filter((amount) => amount.quantity !== "0");

    if (!bankAccount && nonZeroErc20Amounts.length === 0) {
      return undefined;
    } else {
      const balance = [
        ...supportedBankCoins.map((coin) => decodeAmount(this.bankTokens, coin)),
        ...nonZeroErc20Amounts,
      ].sort((a, b) => a.tokenTicker.localeCompare(b.tokenTicker));
      const pubkey = bankAccount?.pubkey ? decodePubkey(bankAccount.pubkey) : undefined;
      return {
        address: address,
        balance: balance,
        pubkey: pubkey,
      };
    }
  }

  public watchAccount(query: AccountQuery): Stream<Account | undefined> {
    let lastEvent: LastWatchAccountEvent = "no_event_fired_yet";
    let pollInternal: NodeJS.Timeout | undefined;
    const producer: Producer<Account | undefined> = {
      start: async (listener) => {
        const poll = async (): Promise<void> => {
          try {
            const event = await this.getAccount(query);
            if (!equal(event, lastEvent)) {
              listener.next(event);
              lastEvent = event;
            }
          } catch (error) {
            listener.error(error);
          }
        };

        pollInternal = setInterval(poll, defaultPollInterval);
        await poll();
      },
      stop: () => {
        if (pollInternal) {
          clearInterval(pollInternal);
          pollInternal = undefined;
        }
      },
    };
    return Stream.create(producer);
  }

  public async getNonce(query: AddressQuery | PubkeyQuery): Promise<Nonce> {
    const address = isPubkeyQuery(query) ? pubkeyToAddress(query.pubkey, this.addressPrefix) : query.address;
    const { accountNumber, sequence } = await this.cosmWasmClient.getNonce(address);
    return accountToNonce(accountNumber, sequence);
  }

  public async getNonces(query: AddressQuery | PubkeyQuery, count: number): Promise<readonly Nonce[]> {
    const checkedCount = new Uint53(count).toNumber();
    if (checkedCount === 0) {
      return [];
    }
    const firstNonce = await this.getNonce(query);
    // Note: this still works with the encoded format (see types/accountToNonce) as least-significant digits are sequence
    return [...new Array(checkedCount)].map((_, i) => (firstNonce + i) as Nonce);
  }

  public async getBlockHeader(height: number): Promise<BlockHeader> {
    const { id, header, txs } = await this.cosmWasmClient.getBlock(height);
    return {
      id: id as BlockId,
      height: header.height,
      time: new ReadonlyDate(header.time),
      transactionCount: txs.length,
    };
  }

  public watchBlockHeaders(): Stream<BlockHeader> {
    throw new Error("not implemented");
  }

  public async getTx(
    id: TransactionId,
  ): Promise<ConfirmedAndSignedTransaction<UnsignedTransaction> | FailedTransaction> {
    const results = await this.cosmWasmClient.searchTx({ id: id });
    switch (results.length) {
      case 0:
        throw new Error("Transaction does not exist");
      case 1:
        return this.parseAndPopulateTxResponseSigned(results[0]);
      default:
        throw new Error("Got unexpected amount of search results");
    }
  }

  public async postTx(tx: PostableBytes): Promise<PostTxResponse> {
    const txAsJson = JSON.parse(Encoding.fromUtf8(tx));
    if (!types.isStdTx(txAsJson)) throw new Error("Postable bytes must contain a JSON encoded StdTx");
    const { transactionHash, rawLog } = await this.cosmWasmClient.postTx(txAsJson);
    const transactionId = transactionHash as TransactionId;
    const firstEvent: BlockInfo = { state: TransactionState.Pending };
    let blockInfoInterval: NodeJS.Timeout;
    let lastEventSent: BlockInfo;
    const producer = new DefaultValueProducer<BlockInfo>(firstEvent, {
      onStarted: () => {
        blockInfoInterval = setInterval(async () => {
          const searchResult = (await this.searchTx({ id: transactionId })).find(() => true);
          if (searchResult) {
            const event: BlockInfo = isConfirmedTransaction(searchResult)
              ? {
                  state: TransactionState.Succeeded,
                  height: searchResult.height,
                  confirmations: searchResult.confirmations,
                }
              : {
                  state: TransactionState.Failed,
                  height: searchResult.height,
                  code: searchResult.code,
                  message: searchResult.message,
                };
            if (!equal(event, lastEventSent)) {
              producer.update(event);
              lastEventSent = event;
            }
          }
        }, defaultPollInterval);
      },
      onStop: () => clearInterval(blockInfoInterval),
    });
    return {
      blockInfo: new ValueAndUpdates<BlockInfo>(producer),
      transactionId: transactionId,
      log: rawLog,
    };
  }

  public async searchTx({
    height,
    id,
    maxHeight,
    minHeight,
    sentFromOrTo,
    signedBy,
    tags,
  }: TransactionQuery): Promise<readonly (ConfirmedTransaction<UnsignedTransaction> | FailedTransaction)[]> {
    if ([signedBy, tags].some(isDefined)) {
      throw new Error("Transaction query by signedBy or tags not yet supported");
    }

    if ([id, height, sentFromOrTo].filter(isDefined).length !== 1) {
      throw new Error(
        "Transaction query by id, height and sentFromOrTo is mutually exclusive. Exactly one must be set.",
      );
    }

    const filter: SearchTxFilter = { minHeight: minHeight, maxHeight: maxHeight };

    let txs: readonly IndexedTx[];
    if (id) {
      txs = await this.cosmWasmClient.searchTx({ id: id }, filter);
    } else if (height) {
      txs = await this.cosmWasmClient.searchTx({ height: height }, filter);
    } else if (sentFromOrTo) {
      const pendingRequests = new Array<Promise<readonly IndexedTx[]>>();
      pendingRequests.push(this.cosmWasmClient.searchTx({ sentFromOrTo: sentFromOrTo }, filter));
      for (const contract of this.erc20Tokens.map((token) => token.contractAddress)) {
        const searchBySender = [
          {
            key: "wasm.contract_address",
            value: contract,
          },
          {
            key: "wasm.sender",
            value: sentFromOrTo,
          },
        ];
        const searchByRecipient = [
          {
            key: "wasm.contract_address",
            value: contract,
          },
          {
            key: "wasm.recipient",
            value: sentFromOrTo,
          },
        ];
        pendingRequests.push(this.cosmWasmClient.searchTx({ tags: searchBySender }, filter));
        pendingRequests.push(this.cosmWasmClient.searchTx({ tags: searchByRecipient }, filter));
      }
      const responses = await Promise.all(pendingRequests);
      const allResults = responses.reduce((accumulator, results) => accumulator.concat(results), []);
      txs = deduplicate(allResults, (a, b) => a.hash.localeCompare(b.hash)).sort(compareByHeightAndHash);
    } else {
      throw new Error("Unsupported query");
    }

    return txs.map((tx) => this.parseAndPopulateTxResponseUnsigned(tx));
  }

  public listenTx(
    _query: TransactionQuery,
  ): Stream<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction> {
    throw new Error("not implemented");
  }

  public liveTx(
    query: TransactionQuery,
  ): Stream<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction> {
    if ([query.height, query.signedBy, query.tags].some(isDefined)) {
      throw new Error("Transaction query by height, signedBy or tags not yet supported");
    }

    if (query.id) {
      if (query.minHeight || query.maxHeight) {
        throw new Error("Query by minHeight/maxHeight not supported together with ID");
      }

      // concat never() because we want non-completing streams consistently
      return concat(this.waitForTransaction(query.id), Stream.never());
    } else if (query.sentFromOrTo) {
      let pollInternal: NodeJS.Timeout | undefined;
      const producer: Producer<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction> = {
        start: async (listener) => {
          let minHeight = query.minHeight || 0;
          const maxHeight = query.maxHeight || Number.MAX_SAFE_INTEGER;

          const poll = async (): Promise<void> => {
            const result = await this.searchTx({
              sentFromOrTo: query.sentFromOrTo,
              minHeight: minHeight,
              maxHeight: maxHeight,
            });
            for (const item of result) {
              listener.next(item);
              if (item.height >= minHeight) {
                // we assume we got all matching transactions from block `item.height` now
                minHeight = item.height + 1;
              }
            }
          };

          await poll();
          pollInternal = setInterval(poll, defaultPollInterval);
        },
        stop: () => {
          if (pollInternal) {
            clearInterval(pollInternal);
            pollInternal = undefined;
          }
        },
      };
      return Stream.create(producer);
    } else {
      throw new Error("Unsupported query.");
    }
  }

  public async getFeeQuote(tx: UnsignedTransaction): Promise<Fee> {
    if (!isSendTransaction(tx)) {
      throw new Error("Received transaction of unsupported kind.");
    }
    if (!this.feeToken) throw new Error("This connection has no fee token configured.");
    return {
      tokens: {
        fractionalDigits: this.feeToken.fractionalDigits,
        quantity: "5000",
        tokenTicker: this.feeToken.ticker as TokenTicker,
      },
      gasLimit: "200000",
    };
  }

  public async withDefaultFee<T extends UnsignedTransaction>(tx: T): Promise<T> {
    return {
      ...tx,
      fee: await this.getFeeQuote(tx),
    };
  }

  private parseAndPopulateTxResponseUnsigned(
    response: IndexedTx,
  ): ConfirmedTransaction<UnsignedTransaction> | FailedTransaction {
    return parseTxsResponseUnsigned(
      this.chainId,
      response.height,
      response,
      this.bankTokens,
      this.erc20Tokens,
    );
  }

  private async parseAndPopulateTxResponseSigned(
    response: IndexedTx,
  ): Promise<ConfirmedAndSignedTransaction<UnsignedTransaction> | FailedTransaction> {
    const firstMsg = response.tx.value.msg.find(() => true);
    if (!firstMsg) throw new Error("Got transaction without a first message. What is going on here?");

    let senderAddress: string;
    if (types.isMsgSend(firstMsg)) {
      senderAddress = firstMsg.value.from_address;
    } else if (
      types.isMsgStoreCode(firstMsg) ||
      types.isMsgInstantiateContract(firstMsg) ||
      types.isMsgExecuteContract(firstMsg)
    ) {
      senderAddress = firstMsg.value.sender;
    } else {
      throw new Error(`Got unsupported type of message: ${firstMsg.type}`);
    }

    const { accountNumber, sequence: currentSequence } = await this.cosmWasmClient.getNonce(senderAddress);
    const sequenceForTx = await findSequenceForSignedTx(
      response.tx,
      Caip5.decode(this.chainId),
      accountNumber,
      currentSequence,
    );
    if (sequenceForTx === undefined) throw new Error("Cound not find matching sequence for this transaction");

    const nonce = accountToNonce(accountNumber, sequenceForTx);

    return parseTxsResponseSigned(
      this.chainId,
      response.height,
      nonce,
      response,
      this.bankTokens,
      this.erc20Tokens,
    );
  }

  private waitForTransaction(
    id: TransactionId,
  ): Stream<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction> {
    let pollInternal: NodeJS.Timeout | undefined;
    const producer: Producer<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction> = {
      start: (listener) => {
        setInterval(async () => {
          try {
            const results = await this.searchTx({ id: id });
            switch (results.length) {
              case 0:
                // okay, we'll try again
                break;
              case 1:
                listener.next(results[0]);
                listener.complete();
                break;
              default:
                throw new Error(`Got unexpected number of search results: ${results.length}`);
            }
          } catch (error) {
            if (pollInternal) {
              clearTimeout(pollInternal);
              pollInternal = undefined;
            }
            listener.error(error);
          }
        }, defaultPollInterval);
      },
      stop: () => {
        if (pollInternal) {
          clearTimeout(pollInternal);
          pollInternal = undefined;
        }
      },
    };
    return Stream.create(producer);
  }
}

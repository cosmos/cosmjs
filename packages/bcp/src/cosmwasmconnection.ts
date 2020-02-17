/* eslint-disable @typescript-eslint/camelcase */
import {
  CosmosAddressBech32Prefix,
  CosmWasmClient,
  findSequenceForSignedTx,
  RestClient,
  TxsResponse,
  types,
} from "@cosmwasm/sdk";
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
import { DefaultValueProducer, ValueAndUpdates } from "@iov/stream";
import BN from "bn.js";
import equal from "fast-deep-equal";
import { ReadonlyDate } from "readonly-date";
import { Stream } from "xstream";

import { decodeCosmosPubkey, pubkeyToAddress } from "./address";
import { Caip5 } from "./caip5";
import { CosmWasmCodec } from "./cosmwasmcodec";
import { decodeAmount, parseTxsResponseSigned, parseTxsResponseUnsigned } from "./decode";
import { buildSignedTx } from "./encode";
import { accountToNonce, BankToken, Erc20Token } from "./types";

const { fromAscii } = Encoding;

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

export class CosmWasmConnection implements BlockchainConnection {
  // we must know prefix and tokens a priori to understand the chain
  public static async establish(
    url: string,
    addressPrefix: CosmosAddressBech32Prefix,
    tokens: TokenConfiguration,
  ): Promise<CosmWasmConnection> {
    const restClient = new RestClient(url);
    const cosmWasmClient = CosmWasmClient.makeReadOnly(url);
    const chainData = await this.initialize(cosmWasmClient);
    return new CosmWasmConnection(restClient, cosmWasmClient, chainData, addressPrefix, tokens);
  }

  private static async initialize(cosmWasmClient: CosmWasmClient): Promise<ChainId> {
    const rawChainId = await cosmWasmClient.chainId();
    return Caip5.encode(rawChainId);
  }

  public readonly chainId: ChainId;
  public readonly codec: TxCodec;

  /** @deprecated everything we use from RestClient should be available in CosmWasmClient */
  private readonly restClient: RestClient;
  private readonly cosmWasmClient: CosmWasmClient;
  private readonly addressPrefix: CosmosAddressBech32Prefix;
  private readonly bankTokens: readonly BankToken[];
  private readonly erc20Tokens: readonly Erc20Token[];

  // these are derived from arguments (cached for use in multiple functions)
  private readonly feeToken: BankToken | undefined;
  private readonly supportedTokens: readonly Token[];

  private constructor(
    restClient: RestClient,
    cosmWasmClient: CosmWasmClient,
    chainId: ChainId,
    addressPrefix: CosmosAddressBech32Prefix,
    tokens: TokenConfiguration,
  ) {
    // tslint:disable-next-line: deprecation
    this.restClient = restClient;
    this.cosmWasmClient = cosmWasmClient;
    this.chainId = chainId;
    this.codec = new CosmWasmCodec(addressPrefix, tokens.bankTokens, tokens.erc20Tokens);
    this.addressPrefix = addressPrefix;
    this.bankTokens = tokens.bankTokens;
    this.feeToken = this.bankTokens.find(() => true);
    const erc20Tokens = tokens.erc20Tokens || [];
    this.erc20Tokens = erc20Tokens;
    this.supportedTokens = [...tokens.bankTokens, ...erc20Tokens]
      .map(info => ({
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
    const { block } = await this.cosmWasmClient.getBlock();
    return parseInt(block.header.height, 10);
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

    const supportedBankCoins = (bankAccount?.coins || []).filter(({ denom }) =>
      this.bankTokens.find(token => token.denom === denom),
    );
    const erc20Amounts = await Promise.all(
      this.erc20Tokens.map(
        async (erc20): Promise<Amount> => {
          const queryMsg = { balance: { address: address } };
          const smart = await this.cosmWasmClient.queryContractSmart(erc20.contractAddress, queryMsg);
          const response = JSON.parse(fromAscii(smart));
          const normalizedBalance = new BN(response.balance).toString();
          return {
            fractionalDigits: erc20.fractionalDigits,
            quantity: normalizedBalance,
            tokenTicker: erc20.ticker as TokenTicker,
          };
        },
      ),
    );
    const nonZeroErc20Amounts = erc20Amounts.filter(amount => amount.quantity !== "0");

    if (!bankAccount && nonZeroErc20Amounts.length === 0) {
      return undefined;
    } else {
      const balance = [
        ...supportedBankCoins.map(coin => decodeAmount(this.bankTokens, coin)),
        ...nonZeroErc20Amounts,
      ].sort((a, b) => a.tokenTicker.localeCompare(b.tokenTicker));
      const pubkey = bankAccount?.public_key ? decodeCosmosPubkey(bankAccount.public_key) : undefined;
      return {
        address: address,
        balance: balance,
        pubkey: pubkey,
      };
    }
  }

  public watchAccount(_account: AccountQuery): Stream<Account | undefined> {
    throw new Error("not implemented");
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
    const { block_id, block } = await this.cosmWasmClient.getBlock(height);
    return {
      id: block_id.hash as BlockId,
      height: parseInt(block.header.height, 10),
      time: new ReadonlyDate(block.header.time),
      transactionCount: block.data.txs?.length || 0,
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
    const { transactionHash, rawLog } = await this.cosmWasmClient.postTx(tx);
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

    if ([maxHeight, minHeight].some(isDefined)) {
      throw new Error(
        "Transaction query by minHeight/maxHeight not yet supported. This is due to missing flexibility of the Gaia REST API, see https://github.com/cosmos/gaia/issues/75",
      );
    }

    if ([id, height, sentFromOrTo].filter(isDefined).length !== 1) {
      throw new Error(
        "Transaction query by id, height and sentFromOrTo is mutually exclusive. Exactly one must be set.",
      );
    }

    let txs: readonly TxsResponse[];
    if (id) {
      txs = await this.cosmWasmClient.searchTx({ id: id });
    } else if (height) {
      txs = await this.cosmWasmClient.searchTx({ height: height });
    } else if (sentFromOrTo) {
      txs = await this.cosmWasmClient.searchTx({ sentFromOrTo: sentFromOrTo });
    } else {
      throw new Error("Unsupported query");
    }

    return txs.map(tx => this.parseAndPopulateTxResponseUnsigned(tx));
  }

  public listenTx(
    _query: TransactionQuery,
  ): Stream<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction> {
    throw new Error("not implemented");
  }

  public liveTx(
    _query: TransactionQuery,
  ): Stream<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction> {
    throw new Error("not implemented");
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
    response: TxsResponse,
  ): ConfirmedTransaction<UnsignedTransaction> | FailedTransaction {
    return parseTxsResponseUnsigned(this.chainId, parseInt(response.height, 10), response, this.bankTokens);
  }

  private async parseAndPopulateTxResponseSigned(
    response: TxsResponse,
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
    if (!sequenceForTx) throw new Error("Cound not find matching sequence for this transaction");

    const nonce = accountToNonce(accountNumber, sequenceForTx);

    return parseTxsResponseSigned(
      this.chainId,
      parseInt(response.height, 10),
      nonce,
      response,
      this.bankTokens,
    );
  }
}

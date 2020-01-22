/* eslint-disable @typescript-eslint/camelcase */
import {
  Account,
  AccountQuery,
  AddressQuery,
  Algorithm,
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
  PubkeyBytes,
  PubkeyQuery,
  Token,
  TokenTicker,
  TransactionId,
  TransactionQuery,
  TransactionState,
  UnsignedTransaction,
} from "@iov/bcp";
import { Encoding, Uint53 } from "@iov/encoding";
import { DefaultValueProducer, ValueAndUpdates } from "@iov/stream";
import equal from "fast-deep-equal";
import { ReadonlyDate } from "readonly-date";
import { Stream } from "xstream";

import { CosmosBech32Prefix, pubkeyToAddress } from "./address";
import { Caip5 } from "./caip5";
import { decodeAmount, parseTxsResponse } from "./decode";
import { RestClient, TxsResponse } from "./restclient";

const { fromBase64 } = Encoding;

interface ChainData {
  readonly chainId: ChainId;
}

// poll every 0.5 seconds (block time 1s)
const defaultPollInterval = 500;

function buildQueryString({
  height,
  id,
  maxHeight,
  minHeight,
  sentFromOrTo,
  signedBy,
  tags,
}: TransactionQuery): string {
  if ([maxHeight, minHeight, signedBy, tags].some(component => component !== undefined)) {
    throw new Error("Transaction query by maxHeight, minHeight, signedBy or tags not yet supported");
  }
  const heightComponent = height !== undefined ? `tx.height=${height}` : null;
  const hashComponent = id !== undefined ? `tx.hash=${id}` : null;
  const sentFromOrToComponent = sentFromOrTo !== undefined ? `message.sender=${sentFromOrTo}` : null;
  // TODO: Support senders and recipients
  // const sentFromOrToComponent = sentFromOrTo !== undefined ? `transfer.recipient=${sentFromOrTo}` : null;
  const components: readonly (string | null)[] = [heightComponent, hashComponent, sentFromOrToComponent];
  return components.filter(Boolean).join("&");
}

export class CosmosConnection implements BlockchainConnection {
  public static async establish(url: string): Promise<CosmosConnection> {
    const restClient = new RestClient(url);
    const chainData = await this.initialize(restClient);
    return new CosmosConnection(restClient, chainData);
  }

  private static async initialize(restClient: RestClient): Promise<ChainData> {
    const { node_info } = await restClient.nodeInfo();
    return { chainId: Caip5.encode(node_info.network) };
  }

  private readonly restClient: RestClient;
  private readonly chainData: ChainData;
  private readonly primaryToken: Token;
  private readonly supportedTokens: readonly Token[];

  private get prefix(): CosmosBech32Prefix {
    return "cosmos";
  }

  private constructor(restClient: RestClient, chainData: ChainData) {
    this.restClient = restClient;
    this.chainData = chainData;
    // TODO: this is an argument
    this.primaryToken = {
      fractionalDigits: 6,
      tokenName: "Cosm",
      tokenTicker: "cosm" as TokenTicker,
    };
    this.supportedTokens = [
      this.primaryToken,
      {
        fractionalDigits: 6,
        tokenName: "Stake",
        tokenTicker: "stake" as TokenTicker,
      },
    ];
  }

  public disconnect(): void {
    return;
  }

  public chainId(): ChainId {
    return this.chainData.chainId;
  }

  public async height(): Promise<number> {
    const { block_meta } = await this.restClient.blocksLatest();
    return block_meta.header.height;
  }

  public async getToken(searchTicker: TokenTicker): Promise<Token | undefined> {
    return (await this.getAllTokens()).find(({ tokenTicker }) => tokenTicker === searchTicker);
  }

  public async getAllTokens(): Promise<readonly Token[]> {
    return this.supportedTokens;
  }

  public async getAccount(query: AccountQuery): Promise<Account | undefined> {
    const address = isPubkeyQuery(query) ? pubkeyToAddress(query.pubkey, this.prefix) : query.address;
    const { result } = await this.restClient.authAccounts(address);
    const account = result.value;
    const supportedCoins = account.coins.filter(({ denom }) =>
      this.supportedTokens.find(
        // TODO: ugly special case - fix this
        ({ tokenTicker }) => (tokenTicker === "ATOM" && denom === "uatom") || tokenTicker === denom,
      ),
    );
    return account.public_key === null
      ? undefined
      : {
          address: address,
          balance: supportedCoins.map(decodeAmount),
          pubkey: {
            algo: Algorithm.Secp256k1,
            data: fromBase64(account.public_key.value) as PubkeyBytes,
          },
        };
  }

  public watchAccount(_account: AccountQuery): Stream<Account | undefined> {
    throw new Error("not implemented");
  }

  public async getNonce(query: AddressQuery | PubkeyQuery): Promise<Nonce> {
    const address = isPubkeyQuery(query) ? pubkeyToAddress(query.pubkey, this.prefix) : query.address;
    const { result } = await this.restClient.authAccounts(address);
    const account = result.value;
    return parseInt(account.sequence, 10) as Nonce;
  }

  public async getNonces(query: AddressQuery | PubkeyQuery, count: number): Promise<readonly Nonce[]> {
    const checkedCount = new Uint53(count).toNumber();
    if (checkedCount === 0) {
      return [];
    }
    const firstNonce = await this.getNonce(query);
    return [...new Array(checkedCount)].map((_, i) => (firstNonce + i) as Nonce);
  }

  public async getBlockHeader(height: number): Promise<BlockHeader> {
    const { block_meta } = await this.restClient.blocks(height);
    return {
      id: block_meta.block_id.hash as BlockId,
      height: block_meta.header.height,
      time: new ReadonlyDate(block_meta.header.time),
      transactionCount: block_meta.header.num_txs,
    };
  }

  public watchBlockHeaders(): Stream<BlockHeader> {
    throw new Error("not implemented");
  }

  public async getTx(
    id: TransactionId,
  ): Promise<ConfirmedAndSignedTransaction<UnsignedTransaction> | FailedTransaction> {
    try {
      const response = await this.restClient.txsById(id);
      const chainId = await this.chainId();
      return this.parseAndPopulateTxResponse(response, chainId);
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error("Transaction does not exist");
      }
      throw error;
    }
  }

  public async postTx(tx: PostableBytes): Promise<PostTxResponse> {
    const { txhash, raw_log } = await this.restClient.postTx(tx);
    const transactionId = txhash as TransactionId;
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
      log: raw_log,
    };
  }

  public async searchTx(
    query: TransactionQuery,
  ): Promise<readonly (ConfirmedTransaction<UnsignedTransaction> | FailedTransaction)[]> {
    const queryString = buildQueryString(query);
    const chainId = this.chainId();
    const { txs: responses } = await this.restClient.txs(queryString);
    return Promise.all(responses.map(response => this.parseAndPopulateTxResponse(response, chainId)));
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
    return {
      tokens: {
        fractionalDigits: this.primaryToken.fractionalDigits,
        quantity: "5000",
        tokenTicker: this.primaryToken.tokenTicker,
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

  private async parseAndPopulateTxResponse(
    response: TxsResponse,
    chainId: ChainId,
  ): Promise<ConfirmedAndSignedTransaction<UnsignedTransaction> | FailedTransaction> {
    const sender = (response.tx.value as any).msg[0].value.from_address;
    const accountForHeight = await this.restClient.authAccounts(sender, response.height);
    const nonce = (parseInt(accountForHeight.result.value.sequence, 10) - 1) as Nonce;
    return parseTxsResponse(chainId, parseInt(response.height, 10), nonce, response);
  }
}

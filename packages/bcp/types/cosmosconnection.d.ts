import {
  Account,
  AccountQuery,
  AddressQuery,
  BlockchainConnection,
  BlockHeader,
  ChainId,
  ConfirmedAndSignedTransaction,
  ConfirmedTransaction,
  FailedTransaction,
  Fee,
  Nonce,
  PostableBytes,
  PostTxResponse,
  PubkeyQuery,
  SignedTransaction,
  Token,
  TokenTicker,
  TransactionId,
  TransactionQuery,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp";
import { Stream } from "xstream";
import { BankToken } from "./types";
export interface TokenConfiguration {
  /** Supported tokens of the Cosmos SDK bank module */
  readonly bankTokens: ReadonlyArray<
    BankToken & {
      readonly name: string;
    }
  >;
}
export declare class CosmosConnection implements BlockchainConnection {
  static establish(url: string, addressPrefix: string, tokens: TokenConfiguration): Promise<CosmosConnection>;
  private static initialize;
  readonly chainId: ChainId;
  readonly codec: TxCodec;
  private readonly cosmosClient;
  private readonly addressPrefix;
  private readonly bankTokens;
  private readonly feeToken;
  private readonly supportedTokens;
  private constructor();
  disconnect(): void;
  height(): Promise<number>;
  getToken(searchTicker: TokenTicker): Promise<Token | undefined>;
  getAllTokens(): Promise<readonly Token[]>;
  /**
   * This is a replacement for the unimplemented CosmosCodec.identifier. Here we have more
   * context and network available, which we might use to implement the API in an async way.
   */
  identifier(signed: SignedTransaction): Promise<TransactionId>;
  getAccount(query: AccountQuery): Promise<Account | undefined>;
  watchAccount(query: AccountQuery): Stream<Account | undefined>;
  getNonce(query: AddressQuery | PubkeyQuery): Promise<Nonce>;
  getNonces(query: AddressQuery | PubkeyQuery, count: number): Promise<readonly Nonce[]>;
  getBlockHeader(height: number): Promise<BlockHeader>;
  watchBlockHeaders(): Stream<BlockHeader>;
  getTx(id: TransactionId): Promise<ConfirmedAndSignedTransaction<UnsignedTransaction> | FailedTransaction>;
  postTx(tx: PostableBytes): Promise<PostTxResponse>;
  searchTx({
    height,
    id,
    maxHeight,
    minHeight,
    sentFromOrTo,
    signedBy,
    tags,
  }: TransactionQuery): Promise<readonly (ConfirmedTransaction<UnsignedTransaction> | FailedTransaction)[]>;
  listenTx(_query: TransactionQuery): Stream<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction>;
  liveTx(query: TransactionQuery): Stream<ConfirmedTransaction<UnsignedTransaction> | FailedTransaction>;
  getFeeQuote(tx: UnsignedTransaction): Promise<Fee>;
  withDefaultFee<T extends UnsignedTransaction>(tx: T): Promise<T>;
  private parseAndPopulateTxResponseUnsigned;
  private parseAndPopulateTxResponseSigned;
  private waitForTransaction;
}

import {
  Address,
  ChainId,
  Identity,
  Nonce,
  PostableBytes,
  SignedTransaction,
  SigningJob,
  TransactionId,
  TxCodec,
  UnsignedTransaction
} from "@iov/bcp";
export declare class CosmosCodec implements TxCodec {
  bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob;
  bytesToPost(signed: SignedTransaction): PostableBytes;
  identifier(signed: SignedTransaction): TransactionId;
  parseBytes(
    bytes: PostableBytes,
    chainId: ChainId,
    nonce?: Nonce
  ): SignedTransaction;
  identityToAddress(identity: Identity): Address;
  isValidAddress(address: string): boolean;
}
export declare const cosmosCodec: CosmosCodec;

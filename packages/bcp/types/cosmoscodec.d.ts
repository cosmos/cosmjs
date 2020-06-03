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
  UnsignedTransaction,
} from "@iov/bcp";
import { BankToken } from "./types";
export declare class CosmosCodec implements TxCodec {
  private readonly addressPrefix;
  private readonly bankTokens;
  constructor(addressPrefix: string, bankTokens: readonly BankToken[]);
  bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob;
  bytesToPost(signed: SignedTransaction): PostableBytes;
  identifier(_signed: SignedTransaction): TransactionId;
  parseBytes(bytes: PostableBytes, chainId: ChainId, nonce?: Nonce): SignedTransaction;
  identityToAddress(identity: Identity): Address;
  isValidAddress(address: string): boolean;
}

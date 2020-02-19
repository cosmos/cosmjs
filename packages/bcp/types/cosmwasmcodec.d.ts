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
import { BankTokens, Erc20Token } from "./types";
export declare class CosmWasmCodec implements TxCodec {
  private readonly addressPrefix;
  private readonly bankTokens;
  private readonly erc20Tokens;
  constructor(addressPrefix: string, bankTokens: BankTokens, erc20Tokens?: readonly Erc20Token[]);
  bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob;
  bytesToPost(signed: SignedTransaction): PostableBytes;
  identifier(_signed: SignedTransaction): TransactionId;
  parseBytes(bytes: PostableBytes, chainId: ChainId, nonce?: Nonce): SignedTransaction;
  identityToAddress(identity: Identity): Address;
  isValidAddress(address: string): boolean;
}

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
import { CosmosBech32Prefix } from "./address";
import { TokenInfos } from "./types";
export declare class CosmWasmCodec implements TxCodec {
  private readonly prefix;
  private readonly tokens;
  constructor(prefix: CosmosBech32Prefix, tokens: TokenInfos);
  bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob;
  bytesToPost(signed: SignedTransaction): PostableBytes;
  identifier(signed: SignedTransaction): TransactionId;
  parseBytes(bytes: PostableBytes, chainId: ChainId, nonce?: Nonce): SignedTransaction;
  identityToAddress(identity: Identity): Address;
  isValidAddress(address: string): boolean;
}
/** Unconfigured codec is useful for testing only */
export declare const cosmWasmCodec: CosmWasmCodec;

import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
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
import { TokenInfos } from "./types";
export declare class CosmWasmCodec implements TxCodec {
  private readonly addressPrefix;
  private readonly tokens;
  constructor(prefix: CosmosAddressBech32Prefix, tokens: TokenInfos);
  bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob;
  bytesToPost(signed: SignedTransaction): PostableBytes;
  identifier(_signed: SignedTransaction): TransactionId;
  parseBytes(bytes: PostableBytes, chainId: ChainId, nonce?: Nonce): SignedTransaction;
  identityToAddress(identity: Identity): Address;
  isValidAddress(address: string): boolean;
}
/** Unconfigured codec is useful for testing only */
export declare const cosmWasmCodec: CosmWasmCodec;

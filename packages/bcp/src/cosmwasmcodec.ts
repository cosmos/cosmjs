/* eslint-disable @typescript-eslint/camelcase */
import { makeSignBytes, marshalTx, unmarshalTx } from "@cosmwasm/sdk";
import {
  Address,
  ChainId,
  Identity,
  Nonce,
  PostableBytes,
  PrehashType,
  SignableBytes,
  SignedTransaction,
  SigningJob,
  TransactionId,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp";
import { Bech32 } from "@iov/encoding";

import { pubkeyToAddress } from "./address";
import { Caip5 } from "./caip5";
import { parseSignedTx } from "./decode";
import { buildSignedTx, buildUnsignedTx } from "./encode";
import { BankTokens, Erc20Token, nonceToAccountNumber, nonceToSequence } from "./types";

export class CosmWasmCodec implements TxCodec {
  private readonly addressPrefix: string;
  private readonly bankTokens: BankTokens;
  private readonly erc20Tokens: readonly Erc20Token[];

  public constructor(addressPrefix: string, bankTokens: BankTokens, erc20Tokens: readonly Erc20Token[] = []) {
    this.addressPrefix = addressPrefix;
    this.bankTokens = bankTokens;
    this.erc20Tokens = erc20Tokens;
  }

  public bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob {
    const built = buildUnsignedTx(unsigned, this.bankTokens, this.erc20Tokens);

    const signBytes = makeSignBytes(
      built.value.msg,
      built.value.fee,
      Caip5.decode(unsigned.chainId),
      built.value.memo || "",
      nonceToAccountNumber(nonce),
      nonceToSequence(nonce),
    );

    return {
      bytes: signBytes as SignableBytes,
      prehashType: PrehashType.Sha256,
    };
  }

  // PostableBytes are JSON-encoded StdTx
  public bytesToPost(signed: SignedTransaction): PostableBytes {
    // TODO: change this as well (return StdTx, not AminoTx)?
    const built = buildSignedTx(signed, this.bankTokens, this.erc20Tokens);
    return marshalTx(built.value) as PostableBytes;
  }

  // TODO: this needs some marshalling going on...
  // Do we need to support this??
  public identifier(_signed: SignedTransaction): TransactionId {
    throw new Error("Not yet implemented, requires amino encoding- talk to Ethan");
    // const bytes = this.bytesToPost(signed);
    // const hash = new Sha256(bytes).digest();
    // return toHex(hash).toUpperCase() as TransactionId;
  }

  public parseBytes(bytes: PostableBytes, chainId: ChainId, nonce?: Nonce): SignedTransaction {
    if (nonce === undefined) {
      throw new Error("Nonce is required");
    }
    const parsed = unmarshalTx(bytes);
    return parseSignedTx(parsed, chainId, nonce, this.bankTokens, this.erc20Tokens);
  }

  public identityToAddress(identity: Identity): Address {
    return pubkeyToAddress(identity.pubkey, this.addressPrefix);
  }

  public isValidAddress(address: string): boolean {
    try {
      const { prefix, data } = Bech32.decode(address);
      if (prefix !== this.addressPrefix) {
        return false;
      }
      return data.length === 20;
    } catch {
      return false;
    }
  }
}

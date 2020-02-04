/* eslint-disable @typescript-eslint/camelcase */
import { makeSignBytes, marshalTx, types, unmarshalTx } from "@cosmwasm/sdk";
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

import { CosmosBech32Prefix, isValidAddress, pubkeyToAddress } from "./address";
import { Caip5 } from "./caip5";
import { parseTx } from "./decode";
import { buildSignedTx, buildUnsignedTx } from "./encode";
import { nonceToAccountNumber, nonceToSequence, TokenInfos } from "./types";

export class CosmWasmCodec implements TxCodec {
  private readonly prefix: CosmosBech32Prefix;
  private readonly tokens: TokenInfos;

  public constructor(prefix: CosmosBech32Prefix, tokens: TokenInfos) {
    this.prefix = prefix;
    this.tokens = tokens;
  }

  public bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob {
    const built = buildUnsignedTx(unsigned, this.tokens);

    const nonceInfo: types.NonceInfo = {
      account_number: nonceToAccountNumber(nonce),
      sequence: nonceToSequence(nonce),
    };
    const signBytes = makeSignBytes(
      built.value.msg[0],
      built.value.fee,
      Caip5.decode(unsigned.chainId),
      built.value.memo || "",
      nonceInfo,
    );

    return {
      bytes: signBytes as SignableBytes,
      prehashType: PrehashType.Sha256,
    };
  }

  // PostableBytes are JSON-encoded StdTx
  public bytesToPost(signed: SignedTransaction): PostableBytes {
    // TODO: change this as well (return StdTx, not AminoTx)?
    const built = buildSignedTx(signed, this.tokens);
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
    return parseTx(parsed, chainId, nonce, this.tokens);
  }

  public identityToAddress(identity: Identity): Address {
    return pubkeyToAddress(identity.pubkey, this.prefix);
  }

  public isValidAddress(address: string): boolean {
    return isValidAddress(address);
  }
}

const defaultPrefix = "cosmos" as CosmosBech32Prefix;

const defaultTokens: TokenInfos = [
  {
    fractionalDigits: 6,
    ticker: "ATOM",
    denom: "uatom",
  },
];

/** Unconfigured codec is useful for testing only */
export const cosmWasmCodec = new CosmWasmCodec(defaultPrefix, defaultTokens);

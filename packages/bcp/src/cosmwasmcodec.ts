/* eslint-disable @typescript-eslint/camelcase */
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
  TokenTicker,
  TransactionId,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp";
import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";
import { marshalTx, unmarshalTx } from "@tendermint/amino-js";

import { CosmosBech32Prefix, isValidAddress, pubkeyToAddress } from "./address";
import { Caip5 } from "./caip5";
import { parseTx } from "./decode";
import { buildSignedTx, buildUnsignedTx } from "./encode";
import { nonceToAccountNumber, nonceToSequence, TokenInfos } from "./types";

const { toHex, toUtf8 } = Encoding;

function sortJson(json: any): any {
  if (typeof json !== "object" || json === null) {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(sortJson);
  }
  const sortedKeys = Object.keys(json).sort();
  const result = sortedKeys.reduce(
    (accumulator, key) => ({
      ...accumulator,
      [key]: sortJson(json[key]),
    }),
    {},
  );
  return result;
}

export class CosmWasmCodec implements TxCodec {
  private readonly prefix: CosmosBech32Prefix;
  private readonly tokens: TokenInfos;

  public constructor(prefix: CosmosBech32Prefix, tokens: TokenInfos) {
    this.prefix = prefix;
    this.tokens = tokens;
  }

  public bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob {
    const memo = (unsigned as any).memo;
    const built = buildUnsignedTx(unsigned, this.tokens);

    const signMsg = sortJson({
      account_number: nonceToAccountNumber(nonce),
      chain_id: Caip5.decode(unsigned.chainId),
      fee: (built.value as any).fee,
      memo: memo,
      msgs: (built.value as any).msg,
      sequence: nonceToSequence(nonce),
    });
    const signBytes = toUtf8(JSON.stringify(signMsg));

    return {
      bytes: signBytes as SignableBytes,
      prehashType: PrehashType.Sha256,
    };
  }

  public bytesToPost(signed: SignedTransaction): PostableBytes {
    const built = buildSignedTx(signed, this.tokens);
    const bytes = marshalTx(built, true);
    return bytes as PostableBytes;
  }

  public identifier(signed: SignedTransaction): TransactionId {
    const bytes = this.bytesToPost(signed);
    const hash = new Sha256(bytes).digest();
    return toHex(hash).toUpperCase() as TransactionId;
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
    tokenName: "Atom (Cosmos Hub)",
    tokenTicker: "ATOM" as TokenTicker,
    denom: "uatom",
  },
];

/** Unconfigured codec is useful for testing only */
export const cosmWasmCodec = new CosmWasmCodec(defaultPrefix, defaultTokens);

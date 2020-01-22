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
  TransactionId,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp";
import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";
import { marshalTx, unmarshalTx } from "@tendermint/amino-js";

import { isValidAddress, pubkeyToAddress } from "./address";
import { Caip5 } from "./caip5";
import { parseTx } from "./decode";
import { buildSignedTx, buildUnsignedTx } from "./encode";

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

export class CosmosCodec implements TxCodec {
  public bytesToSign(unsigned: UnsignedTransaction, nonce: Nonce): SigningJob {
    const accountNumber = 0;
    const memo = (unsigned as any).memo;
    const built = buildUnsignedTx(unsigned);

    const signMsg = sortJson({
      account_number: accountNumber.toString(),
      chain_id: Caip5.decode(unsigned.chainId),
      fee: (built.value as any).fee,
      memo: memo,
      msgs: (built.value as any).msg,
      sequence: nonce.toString(),
    });
    const signBytes = toUtf8(JSON.stringify(signMsg));

    return {
      bytes: signBytes as SignableBytes,
      prehashType: PrehashType.Sha256,
    };
  }

  public bytesToPost(signed: SignedTransaction): PostableBytes {
    const built = buildSignedTx(signed);
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
    // TODO: this needs access to token list
    return parseTx(parsed, chainId, nonce);
  }

  public identityToAddress(identity: Identity): Address {
    const prefix = "cosmos";
    return pubkeyToAddress(identity.pubkey, prefix);
  }

  public isValidAddress(address: string): boolean {
    return isValidAddress(address);
  }
}

export const cosmosCodec = new CosmosCodec();

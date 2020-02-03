import { PostableBytes, PrehashType } from "@iov/bcp";
import { Encoding } from "@iov/encoding";

import { cosmWasmCodec } from "./cosmwasmcodec";
import { chainId, nonce, sendTxJson, signedTxBin, signedTxJson, txId } from "./testdata.spec";

const { toUtf8 } = Encoding;

describe("cosmWasmCodec", () => {
  it("properly generates bytes to sign", () => {
    const expected = {
      bytes: toUtf8(
        '{"account_number":"0","chain_id":"cosmoshub-3","fee":{"amount":[{"amount":"2500","denom":"uatom"}],"gas":"100000"},"memo":"","msgs":[{"type":"cosmos-sdk/MsgSend","value":{"amount":[{"amount":"35997500","denom":"uatom"}],"from_address":"cosmos1txqfn5jmcts0x0q7krdxj8tgf98tj0965vqlmq","to_address":"cosmos1nynns8ex9fq6sjjfj8k79ymkdz4sqth06xexae"}}],"sequence":"99"}',
      ),
      prehashType: PrehashType.Sha256,
    };
    const bytesToSign = cosmWasmCodec.bytesToSign(sendTxJson, nonce);

    expect(bytesToSign).toEqual(expected);
  });

  xit("properly encodes transactions", () => {
    const encoded = cosmWasmCodec.bytesToPost(signedTxJson);
    expect(encoded).toEqual(signedTxBin);
  });

  it("throws when trying to decode a transaction without a nonce", () => {
    expect(() => cosmWasmCodec.parseBytes(signedTxBin as PostableBytes, chainId)).toThrowError(
      /nonce is required/i,
    );
  });

  xit("properly decodes transactions", () => {
    const decoded = cosmWasmCodec.parseBytes(signedTxBin as PostableBytes, chainId, nonce);
    expect(decoded).toEqual(signedTxJson);
  });

  xit("generates transaction id", () => {
    const id = cosmWasmCodec.identifier(signedTxJson);
    expect(id).toMatch(/^[0-9A-F]{64}$/);
    expect(id).toEqual(txId);
  });

  it("round trip works", () => {
    const encoded = cosmWasmCodec.bytesToPost(signedTxJson);
    const decoded = cosmWasmCodec.parseBytes(encoded, chainId, nonce);
    expect(decoded).toEqual(signedTxJson);
  });
});

import { assert } from "@cosmjs/utils";

import { cosmos_sdk as cosmosSdk, google } from "./generated/codecimpl";

const { Coin } = cosmosSdk.v1;
const { TxBody } = cosmosSdk.tx.v1;
const { MsgSend } = cosmosSdk.x.bank.v1;
const { Any } = google.protobuf;

describe("protobuf demo", () => {
  it("works", () => {
    const coin = Coin.create({
      denom: "ucosm",
      amount: "1234567890",
    });
    const msgSend = MsgSend.create({
      fromAddress: Uint8Array.from(Array.from({ length: 20 }, () => 1)),
      toAddress: Uint8Array.from(Array.from({ length: 20 }, () => 2)),
      amount: [coin],
    });

    // Serialization
    const msgSendBytes = MsgSend.encode(msgSend).finish();
    const msgSendWrapped = Any.create({
      // eslint-disable-next-line @typescript-eslint/camelcase
      type_url: "xxx",
      value: msgSendBytes,
    });
    const txBody = TxBody.create({
      messages: [msgSendWrapped],
      memo: "Some memo",
      timeoutHeight: 9999,
      extensionOptions: [],
    });
    const txBodyBytes = TxBody.encode(txBody).finish();

    // Deserialization
    const txBodyDecoded = TxBody.decode(txBodyBytes);
    assert(txBodyDecoded.messages[0].value);
    const msgSendDecoded = MsgSend.decode(txBodyDecoded.messages[0].value);

    // fromAddress and toAddress are now Buffers
    expect(Uint8Array.from(msgSendDecoded.fromAddress)).toEqual(msgSend.fromAddress);
    expect(Uint8Array.from(msgSendDecoded.toAddress)).toEqual(msgSend.toAddress);
    expect(msgSendDecoded.amount).toEqual(msgSend.amount);
  });
});

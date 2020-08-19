/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from "@cosmjs/utils";
import Long from "long";

import { cosmos, google } from "./codec";
import { MsgDemo as MsgDemoType } from "./demo";
import { Registry } from "./registry";

const { TxBody } = cosmos.tx;
const { Any } = google.protobuf;

describe("registry demo", () => {
  it("works with a default msg", () => {
    const registry = new Registry();
    const Coin = registry.lookupType("/cosmos.Coin")!;
    const MsgSend = registry.lookupType("/cosmos.bank.MsgSend")!;

    const coin = Coin.create({
      denom: "ucosm",
      amount: "1234567890",
    });
    const msgSend = (MsgSend.create({
      fromAddress: Uint8Array.from(Array.from({ length: 20 }, () => 1)),
      toAddress: Uint8Array.from(Array.from({ length: 20 }, () => 2)),
      amount: [coin],
    }) as unknown) as cosmos.bank.MsgSend;
    const msgSendBytes = MsgSend.encode(msgSend).finish();
    const msgSendWrapped = Any.create({
      type_url: "/cosmos.bank.MsgSend",
      value: msgSendBytes,
    });
    const txBody = TxBody.create({
      messages: [msgSendWrapped],
      memo: "Some memo",
      timeoutHeight: Long.fromNumber(9999),
      extensionOptions: [],
    });
    const txBodyBytes = TxBody.encode(txBody).finish();

    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.type_url);
    assert(msg.value);

    const decoder = registry.lookupType(msg.type_url)!;
    const msgSendDecoded = decoder.decode(msg.value);

    // fromAddress and toAddress are now Buffers
    expect(Uint8Array.from(msgSendDecoded.fromAddress)).toEqual(msgSend.fromAddress);
    expect(Uint8Array.from(msgSendDecoded.toAddress)).toEqual(msgSend.toAddress);
    expect(msgSendDecoded.amount).toEqual(msgSend.amount);
  });

  it("works with a custom msg", () => {
    const typeUrl = "/demo.MsgDemo";
    const registry = new Registry([[typeUrl, MsgDemoType]]);
    const MsgDemo = registry.lookupType(typeUrl)!;

    const msgDemo = MsgDemo.create({
      example: "Some example text",
    });
    const msgDemoBytes = MsgDemo.encode(msgDemo).finish();
    const msgDemoWrapped = Any.create({
      type_url: typeUrl,
      value: msgDemoBytes,
    });
    const txBody = TxBody.create({
      messages: [msgDemoWrapped],
      memo: "Some memo",
      timeoutHeight: Long.fromNumber(9999),
      extensionOptions: [],
    });
    const txBodyBytes = TxBody.encode(txBody).finish();

    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.type_url);
    assert(msg.value);

    const decoder = registry.lookupType(msg.type_url)!;
    const msgDemoDecoded = decoder.decode(msg.value);
    expect(msgDemoDecoded.example).toEqual(msgDemo.example);
  });
});

/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from "@cosmjs/utils";
import Long from "long";

import { MsgSend as IMsgSend } from "./codec/cosmos/bank/v1beta1/tx";
import { TxBody } from "./codec/cosmos/tx/v1beta1/tx";
import { Any } from "./codec/google/protobuf/any";
import { Registry } from "./registry";

describe("registry demo", () => {
  it("works with a default msg", () => {
    const registry = new Registry();
    const Coin = registry.lookupType("/cosmos.base.v1beta1.Coin")!;
    const MsgSend = registry.lookupType("/cosmos.bank.v1beta1.MsgSend")!;

    const coin = Coin.fromJSON({
      denom: "ucosm",
      amount: "1234567890",
    });
    const msgSend = (MsgSend.fromJSON({
      fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
      toAddress: "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu",
      amount: [coin],
    }) as unknown) as IMsgSend;
    const msgSendBytes = MsgSend.encode(msgSend).finish();
    const msgSendWrapped = Any.fromJSON({
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: msgSendBytes,
    });
    const txBody = TxBody.fromPartial({
      messages: [msgSendWrapped],
      memo: "Some memo",
      timeoutHeight: Long.fromNumber(9999),
      extensionOptions: [],
    });
    const txBodyBytes = TxBody.encode(txBody).finish();

    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.typeUrl);
    assert(msg.value);

    const decoder = registry.lookupType(msg.typeUrl)!;
    const msgSendDecoded = decoder.decode(msg.value);

    // fromAddress and toAddress are now Buffers
    expect(msgSendDecoded.fromAddress).toEqual(msgSend.fromAddress);
    expect(msgSendDecoded.toAddress).toEqual(msgSend.toAddress);
    expect(msgSendDecoded.amount).toEqual(msgSend.amount);
  });

  // TODO: Can't autogenerate types from TS code using ts-proto
  // it("works with a custom msg", () => {
  //   const typeUrl = "/demo.MsgDemo";
  //   const registry = new Registry([[typeUrl, MsgDemoType]]);
  //   const MsgDemo = registry.lookupType(typeUrl)!;

  //   const msgDemo = MsgDemo.fromJSON({
  //     example: "Some example text",
  //   });
  //   const msgDemoBytes = MsgDemo.encode(msgDemo).finish();
  //   const msgDemoWrapped = Any.create({
  //     type_url: typeUrl,
  //     value: msgDemoBytes,
  //   });
  //   const txBody = TxBody.create({
  //     messages: [msgDemoWrapped],
  //     memo: "Some memo",
  //     timeoutHeight: Long.fromNumber(9999),
  //     extensionOptions: [],
  //   });
  //   const txBodyBytes = TxBody.encode(txBody).finish();

  //   const txBodyDecoded = TxBody.decode(txBodyBytes);
  //   const msg = txBodyDecoded.messages[0];
  //   assert(msg.type_url);
  //   assert(msg.value);

  //   const decoder = registry.lookupType(msg.type_url)!;
  //   const msgDemoDecoded = decoder.decode(msg.value);
  //   expect(msgDemoDecoded.example).toEqual(msgDemo.example);
  // });
});

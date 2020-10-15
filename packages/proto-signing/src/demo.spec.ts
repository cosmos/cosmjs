/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from "@cosmjs/utils";
import Long from "long";
import protobuf from "protobufjs";

import { cosmos, google } from "./codec";
import reflectionRoot from "./demo";
import demoJson from "./demo.json";
import demoProto from "./demo.proto";

type MsgDemo = {
  readonly example: string;
};

const { Coin } = cosmos.base.v1beta1;
const { TxBody } = cosmos.tx.v1beta1;
const { MsgSend } = cosmos.bank.v1beta1;
const { Any } = google.protobuf;

function getTypeName(typeUrl: string): string {
  const parts = typeUrl.split(".");
  return parts[parts.length - 1];
}

describe("protobuf demo", () => {
  it("works with generated static code", () => {
    const coin = Coin.create({
      denom: "ucosm",
      amount: "1234567890",
    });
    const msgSend = MsgSend.create({
      fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
      toAddress: "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu",
      amount: [coin],
    });
    const msgSendBytes = MsgSend.encode(msgSend).finish();
    const msgSendWrapped = Any.create({
      type_url: "/cosmos.bank.v1beta1.MsgSend",
      value: msgSendBytes,
    });
    const txBody = TxBody.create({
      messages: [msgSendWrapped],
      memo: "Some memo",
      timeoutHeight: Long.fromNumber(9999),
      extensionOptions: [],
    });
    const txBodyBytes = TxBody.encode(txBody).finish();

    // Deserialization
    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.value);
    const msgSendDecoded = MsgSend.decode(msg.value);

    // fromAddress and toAddress are now Buffers
    expect(msgSendDecoded.fromAddress).toEqual(msgSend.fromAddress);
    expect(msgSendDecoded.toAddress).toEqual(msgSend.toAddress);
    expect(msgSendDecoded.amount).toEqual(msgSend.amount);
  });

  it("works with dynamically loaded proto files", () => {
    const { root } = protobuf.parse(demoProto);
    const typeUrl = "/demo.MsgDemo";
    const encoder = root.lookupType(getTypeName(typeUrl));
    const msgDemo = (encoder.create({
      example: "Some example text",
    }) as unknown) as MsgDemo;
    const msgDemoBytes = encoder.encode(msgDemo).finish();
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

    // Deserialization
    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.type_url);
    assert(msg.value);

    const decoder = root.lookupType(getTypeName(msg.type_url));
    const msgDemoDecoded = (decoder.decode(msg.value) as unknown) as MsgDemo;
    expect(msgDemoDecoded.example).toEqual(msgDemo.example);
  });

  it("works with dynamically loaded json files", () => {
    const root = protobuf.Root.fromJSON(demoJson);
    const typeUrl = "/demo.MsgDemo";
    const encoder = root.lookupType(getTypeName(typeUrl));
    const msgDemo = (encoder.create({
      example: "Some example text",
    }) as unknown) as MsgDemo;
    const msgDemoBytes = encoder.encode(msgDemo).finish();
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

    // Deserialization
    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.type_url);
    assert(msg.value);

    const decoder = root.lookupType(getTypeName(msg.type_url));
    const msgDemoDecoded = (decoder.decode(msg.value) as unknown) as MsgDemo;
    expect(msgDemoDecoded.example).toEqual(msgDemo.example);
  });

  it("works with reflection", () => {
    const typeUrl = "/demo.MsgDemo";
    const encoder = reflectionRoot.lookupType(getTypeName(typeUrl));
    const msgDemo = (encoder.create({
      example: "Some example text",
    }) as unknown) as MsgDemo;
    const msgDemoBytes = encoder.encode(msgDemo).finish();
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

    // Deserialization
    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.type_url);
    assert(msg.value);

    const decoder = reflectionRoot.lookupType(getTypeName(msg.type_url));
    const msgDemoDecoded = (decoder.decode(msg.value) as unknown) as MsgDemo;
    expect(msgDemoDecoded.example).toEqual(msgDemo.example);
  });
});

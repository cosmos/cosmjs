/* eslint-disable @typescript-eslint/camelcase */
import { assert } from "@cosmjs/utils";

import { myRegistry } from "./decorator";

describe("decorator demo", () => {
  it("works with a custom msg", () => {
    const typeUrl = "/demo.MsgDemo";
    const MsgDemo = myRegistry.lookupType(typeUrl)!;
    const TxBody = myRegistry.lookupType("/cosmos.tx.TxBody")!;
    const Any = myRegistry.lookupType("/google.protobuf.Any")!;

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
      timeoutHeight: 9999,
      extensionOptions: [],
    });
    const txBodyBytes = TxBody.encode(txBody).finish();

    const txBodyDecoded = TxBody.decode(txBodyBytes);
    const msg = txBodyDecoded.messages[0];
    assert(msg.type_url);
    assert(msg.value);

    const decoder = myRegistry.lookupType(msg.type_url)!;
    const msgDemoDecoded = decoder.decode(msg.value);
    expect(msgDemoDecoded.example).toEqual(msgDemo.example);
  });
});

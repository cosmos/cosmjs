/* eslint-disable @typescript-eslint/camelcase */
import { assert } from "@cosmjs/utils";
import { Message } from "protobufjs";

import { CosmosField, CosmosMessage } from "./decorator";
import { Registry } from "./registry";

describe("decorator demo", () => {
  it("works with a custom msg", () => {
    const typeUrl = "/demo.MsgDemo";
    const myRegistry = new Registry();

    @CosmosMessage(myRegistry, typeUrl)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class MsgDemo extends Message<{}> {
      @CosmosField.String(1)
      public readonly example: string = "";
    }

    const MsgDemoT = myRegistry.lookupType(typeUrl)!;
    const TxBody = myRegistry.lookupType("/cosmos.tx.TxBody")!;
    const Any = myRegistry.lookupType("/google.protobuf.Any")!;

    const msgDemo = MsgDemoT.create({
      example: "Some example text",
    });
    const msgDemoBytes = MsgDemoT.encode(msgDemo).finish();
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

    const msgDemoDecoded = MsgDemoT.decode(msg.value);
    expect(msgDemoDecoded.example).toEqual(msgDemo.example);
  });
});

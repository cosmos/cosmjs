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
      @CosmosField.Boolean(1)
      public readonly booleanDemo?: boolean;

      @CosmosField.String(2)
      public readonly stringDemo?: string;

      @CosmosField.Bytes(3)
      public readonly bytesDemo?: Uint8Array;

      @CosmosField.Int64(4)
      public readonly int64Demo?: number;

      @CosmosField.UInt64(5)
      public readonly uint64Demo?: number;

      @CosmosField.Repeated(6)
      public readonly listDemo?: readonly string[];
    }

    const MsgDemoT = myRegistry.lookupType(typeUrl)!;
    const TxBody = myRegistry.lookupType("/cosmos.tx.TxBody")!;
    const Any = myRegistry.lookupType("/google.protobuf.Any")!;

    const msgDemoFields = {
      booleanDemo: true,
      stringDemo: "example text",
      bytesDemo: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8]),
      int64Demo: -123,
      uint64Demo: 123,
      listDemo: ["this", "is", "a", "list"],
    };
    const msgDemo = MsgDemoT.create(msgDemoFields);
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
    expect(msgDemoDecoded.booleanDemo).toEqual(msgDemoFields.booleanDemo);
    expect(msgDemoDecoded.stringDemo).toEqual(msgDemoFields.stringDemo);
    // bytesDemo decodes to a Buffer in Node
    expect(Uint8Array.from(msgDemoDecoded.bytesDemo)).toEqual(msgDemoFields.bytesDemo);
    // int64Demo and uint64Demo decode to Long
    expect(msgDemoDecoded.int64Demo.toNumber()).toEqual(msgDemoFields.int64Demo);
    expect(msgDemoDecoded.uint64Demo.toNumber()).toEqual(msgDemoFields.uint64Demo);

    expect(msgDemoDecoded.listDemo).toEqual(msgDemoFields.listDemo);
  });
});

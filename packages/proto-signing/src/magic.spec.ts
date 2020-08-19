/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";
import { Message } from "protobufjs";

import { cosmosField, registered } from "./decorator";
import { Registry } from "./registry";

describe("registry magic demo", () => {
  it("works with a custom msg", () => {
    const nestedTypeUrl = "/demo.MsgNestedMagic";
    const typeUrl = "/demo.MsgMagic";
    const myRegistry = new Registry();

    @registered(myRegistry, nestedTypeUrl)
    class MsgNestedMagic extends Message {
      @cosmosField.string(1)
      public readonly foo?: string;
    }

    @registered(myRegistry, typeUrl)
    class MsgMagic extends Message {
      @cosmosField.boolean(1)
      public readonly booleanDemo?: boolean;

      @cosmosField.string(2)
      public readonly stringDemo?: string;

      @cosmosField.bytes(3)
      public readonly bytesDemo?: Uint8Array;

      @cosmosField.int64(4)
      public readonly int64Demo?: Long;

      @cosmosField.uint64(5)
      public readonly uint64Demo?: Long;

      @cosmosField.repeatedString(6)
      public readonly listDemo?: readonly string[];

      @cosmosField.message(7, MsgNestedMagic)
      public readonly nestedDemo?: MsgNestedMagic;
    }

    const msgNestedDemoFields = {
      foo: "bar",
    };
    const msgDemoFields = {
      booleanDemo: true,
      stringDemo: "example text",
      bytesDemo: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8]),
      int64Demo: -123,
      uint64Demo: 123,
      listDemo: ["this", "is", "a", "list"],
      nestedDemo: msgNestedDemoFields,
    };
    const txBodyFields = {
      messages: [{ typeUrl: typeUrl, value: msgDemoFields }],
      memo: "Some memo",
      timeoutHeight: 9999,
      extensionOptions: [],
    };
    const txBodyBytes = myRegistry.encode({
      typeUrl: "/cosmos.tx.TxBody",
      value: txBodyFields,
    });

    const txBodyDecoded = myRegistry.decode({
      typeUrl: "/cosmos.tx.TxBody",
      value: txBodyBytes,
    });
    expect(txBodyDecoded.memo).toEqual(txBodyFields.memo);
    // int64Demo and uint64Demo decode to Long
    expect(txBodyDecoded.timeoutHeight).toEqual(Long.fromNumber(txBodyFields.timeoutHeight, true));
    expect(txBodyDecoded.extensionOptions).toEqual(txBodyFields.extensionOptions);

    const msgDemoDecoded = txBodyDecoded.messages[0] as MsgMagic;
    expect(msgDemoDecoded).toBeInstanceOf(MsgMagic);
    expect(msgDemoDecoded.booleanDemo).toEqual(msgDemoFields.booleanDemo);
    expect(msgDemoDecoded.stringDemo).toEqual(msgDemoFields.stringDemo);
    expect(msgDemoDecoded.bytesDemo).toEqual(msgDemoFields.bytesDemo);
    // int64Demo and uint64Demo decode to Long
    expect(msgDemoDecoded.int64Demo).toEqual(Long.fromNumber(msgDemoFields.int64Demo));
    expect(msgDemoDecoded.uint64Demo).toEqual(Long.fromNumber(msgDemoFields.uint64Demo, true));
    expect(msgDemoDecoded.listDemo).toEqual(msgDemoFields.listDemo);

    expect(msgDemoDecoded.nestedDemo).toBeInstanceOf(MsgNestedMagic);
    expect(msgDemoDecoded.nestedDemo!.foo).toEqual(msgDemoFields.nestedDemo.foo);
  });
});

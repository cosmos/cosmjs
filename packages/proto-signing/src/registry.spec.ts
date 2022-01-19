/* eslint-disable @typescript-eslint/naming-convention */
import { fromHex } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";
import { MsgSend as IMsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import Long from "long";
import { Field, Type } from "protobufjs";

import { isPbjsGeneratedType, isTsProtoGeneratedType, Registry } from "./registry";

describe("registry demo", () => {
  it("works with a default msg", () => {
    const registry = new Registry();
    const Coin = registry.lookupType("/cosmos.base.v1beta1.Coin");
    const MsgSend = registry.lookupType("/cosmos.bank.v1beta1.MsgSend");
    assert(Coin);
    assert(MsgSend);
    assert(isTsProtoGeneratedType(Coin));
    assert(isTsProtoGeneratedType(MsgSend));

    const coin = Coin.fromPartial({
      denom: "ucosm",
      amount: "1234567890",
    });
    const msgSend = MsgSend.fromPartial({
      fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
      toAddress: "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu",
      amount: [coin],
    }) as unknown as IMsgSend;
    const msgSendBytes = MsgSend.encode(msgSend).finish();
    const msgSendWrapped = Any.fromPartial({
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

  it("works with a custom msg", () => {
    // From https://gist.github.com/fadeev/a4981eff1cf3a805ef10e25313d5f2b7
    const typeUrl = "/blog.MsgCreatePost";
    const MsgCreatePostOriginal = new Type("MsgCreatePost")
      .add(new Field("creator", 1, "string"))
      .add(new Field("title", 2, "string"))
      .add(new Field("body", 3, "string"))
      .add(new Field("attachment", 4, "bytes"));

    const registry = new Registry();
    registry.register(typeUrl, MsgCreatePostOriginal);
    const MsgCreatePost = registry.lookupType(typeUrl);
    assert(MsgCreatePost);
    assert(isPbjsGeneratedType(MsgCreatePost));

    const msgDemo = MsgCreatePost.create({
      creator: "Me",
      title: "Something with stars",
      body: "la la la",
      attachment: fromHex("AABBAABB66FE"),
    });
    const msgDemoBytes = MsgCreatePost.encode(msgDemo).finish();
    const msgDemoWrapped = Any.fromPartial({
      typeUrl: typeUrl,
      value: msgDemoBytes,
    });
    const txBody = TxBody.fromPartial({
      messages: [msgDemoWrapped],
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
    const msgDemoDecoded = decoder.decode(msg.value);
    expect(msgDemoDecoded).toEqual(
      jasmine.objectContaining({
        creator: "Me",
        title: "Something with stars",
        body: "la la la",
      }),
    );
    expect(Uint8Array.from(msgDemoDecoded.attachment)).toEqual(fromHex("AABBAABB66FE"));
  });
});

/* eslint-disable @typescript-eslint/camelcase */
import { fromHex } from "@cosmjs/encoding";

import { cosmos_sdk as cosmosSdk } from "./generated/codecimpl";
import { Coin, MsgSend } from "./msgs";

describe("msgs", () => {
  it("encodes decorated MsgSend equally to static code", () => {
    const alice = fromHex("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    const bob = fromHex("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    const amount = [
      new Coin({ denom: "utoken", amount: "123" }),
      new Coin({ denom: "ustake", amount: "654" }),
    ];
    const donation = new MsgSend({ from_address: alice, to_address: bob, amount });

    const expected = cosmosSdk.x.bank.v1.MsgSend.encode(
      cosmosSdk.x.bank.v1.MsgSend.create({
        fromAddress: alice,
        toAddress: bob,
        amount: [
          cosmosSdk.v1.Coin.create({
            denom: "utoken",
            amount: "123",
          }),
          cosmosSdk.v1.Coin.create({
            denom: "ustake",
            amount: "654",
          }),
        ],
      }),
    ).finish();

    const encoded = MsgSend.encode(donation).finish();
    expect(encoded).toEqual(expected);
  });
});

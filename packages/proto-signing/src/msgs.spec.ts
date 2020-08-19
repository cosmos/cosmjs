/* eslint-disable @typescript-eslint/naming-convention */
import { fromHex } from "@cosmjs/encoding";

import { cosmos } from "./codec";
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

    const expected = cosmos.bank.MsgSend.encode(
      cosmos.bank.MsgSend.create({
        fromAddress: alice,
        toAddress: bob,
        amount: [
          cosmos.Coin.create({
            denom: "utoken",
            amount: "123",
          }),
          cosmos.Coin.create({
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

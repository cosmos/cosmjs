/* eslint-disable @typescript-eslint/naming-convention */
import { cosmos } from "./codec";
import { Coin, MsgSend } from "./msgs";

describe("msgs", () => {
  it("encodes decorated MsgSend equally to static code", () => {
    const alice = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";
    const bob = "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu";
    const amount = [
      new Coin({ denom: "utoken", amount: "123" }),
      new Coin({ denom: "ustake", amount: "654" }),
    ];
    const donation = new MsgSend({ from_address: alice, to_address: bob, amount });

    const expected = cosmos.bank.v1beta1.MsgSend.encode(
      cosmos.bank.v1beta1.MsgSend.create({
        fromAddress: alice,
        toAddress: bob,
        amount: [
          cosmos.base.v1beta1.Coin.create({
            denom: "utoken",
            amount: "123",
          }),
          cosmos.base.v1beta1.Coin.create({
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

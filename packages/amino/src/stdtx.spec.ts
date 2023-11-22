/* eslint-disable @typescript-eslint/naming-convention */
import { coins } from "./coins";
import { StdSignature } from "./signature";
import { makeSignDoc, StdFee } from "./signdoc";
import { isStdTx, makeStdTx, StdTx } from "./stdtx";

describe("makeStdTx", () => {
  it("can make an StdTx from a SignDoc and one signature", () => {
    const fee: StdFee = { amount: coins(123, "ucosm"), gas: "22" };
    const signDoc = makeSignDoc([], fee, "chain-xy", "hello", 3, 4);
    const signature: StdSignature = {
      pub_key: {
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      },
      signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
    };
    const signedTx = makeStdTx(signDoc, signature);
    expect(signedTx).toEqual({
      msg: [],
      memo: "hello",
      fee: fee,
      signatures: [signature],
    });
  });

  it("can make an StdTx from a SignDoc and multiple signatures", () => {
    const fee: StdFee = { amount: coins(123, "ucosm"), gas: "22" };
    const signDoc = makeSignDoc([], fee, "chain-xy", "hello", 3, 4);
    const signature1: StdSignature = {
      pub_key: {
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      },
      signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
    };
    const signature2: StdSignature = {
      pub_key: {
        type: "tendermint/PubKeySecp256k1",
        value: "A5qFcJBJvEK/fOmEAY0DHNWwSRZ9TEfNZyH8VoVvDtAq",
      },
      signature: "NK1Oy4EUGAsoC03c1wi9GG03JC/39LEdautC5Jk643oIbEPqeXHMwaqbdvO/Jws0X/NAXaN8SAy2KNY5Qml+5Q==",
    };
    const signedTx = makeStdTx(signDoc, [signature1, signature2]);
    expect(signedTx).toEqual({
      msg: [],
      memo: "hello",
      fee: fee,
      signatures: [signature1, signature2],
    });
  });
});

describe("isStdTx", () => {
  const validTx: StdTx = {
    memo: "memoe",
    msg: [{ type: "test", value: "Test Value" }],
    fee: { amount: [{ denom: "ATOM", amount: "10" }], gas: "100000" },
    signatures: [{ signature: "signature", pub_key: { type: "type", value: "value" } }],
  };

  it("should return true for a valid StdTx", () => {
    expect(isStdTx(validTx)).toBeTruthy();
  });

  it("should return false for an invalid StdTx with missing properties", () => {
    const { msg: _msg, ...invalidTx } = validTx;
    expect(isStdTx(invalidTx)).toBeFalsy();
  });

  it("should return false for an invalid StdTx with incorrect types", () => {
    const invalidTx = {
      ...validTx,
      msg: "Invalid Message",
    };
    expect(isStdTx(invalidTx)).toBeFalsy();
  });
});

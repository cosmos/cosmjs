/* eslint-disable @typescript-eslint/naming-convention */
import { coin, coins, makeSignDoc as makeSignDocAmino } from "@cosmjs/launchpad";

import { cosmos } from "./codec";
import { getMsgType, snakifyForAmino } from "./encoding";
import { faucet, validator } from "./testutils.spec";

describe("encoding", () => {
  describe("snakifyForAmino", () => {
    it("works", () => {
      const msg = cosmos.staking.v1beta1.MsgDelegate.create({
        delegatorAddress: faucet.address0,
        validatorAddress: validator.validatorAddress,
        amount: coin(1234, "ustake"),
      });
      const msgAny = {
        type: "cosmos-sdk/MsgDelegate",
        value: msg,
      };
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "200000",
      };
      const chainId = "testing";
      const memo = "testing testing";
      const accountNumber = 1;
      const sequence = 16;
      const signDoc = makeSignDocAmino([msgAny], fee, chainId, memo, accountNumber, sequence);
      expect(snakifyForAmino(signDoc)).toEqual({
        ...signDoc,
        msgs: [
          {
            type: "cosmos-sdk/MsgDelegate",
            value: {
              delegator_address: faucet.address0,
              validator_address: validator.validatorAddress,
              amount: {
                amount: "1234",
                denom: "ustake",
              },
            },
          },
        ],
      });
    });
  });

  describe("getMsgType", () => {
    it("works for known type url", () => {
      const msgType = getMsgType("/cosmos.staking.v1beta1.MsgDelegate");
      expect(msgType).toEqual("cosmos-sdk/MsgDelegate");
    });

    it("throws for unknown type url", () => {
      expect(() => getMsgType("/xxx.Unknown")).toThrowError(/type url not known/i);
    });
  });
});

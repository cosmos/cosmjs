/* eslint-disable @typescript-eslint/naming-convention */
import { coins } from "@cosmjs/amino";
import { MsgCreateVestingAccount } from "cosmjs-types/cosmos/vesting/v1beta1/tx";
import Long from "long";

import { AminoTypes } from "../../aminotypes";
import { AminoMsgCreateVestingAccount, createVestingAminoConverters } from "./aminomessages";

describe("vesting Amino messages", () => {
  describe("toAmino", () => {
    it("works for MsgCreateVestingAccount", () => {
      const msg = MsgCreateVestingAccount.fromPartial({
        fromAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        toAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        amount: coins(1234, "ucosm"),
        endTime: Long.fromString("1838718434"),
        delayed: true,
      });
      const aminoTypes = new AminoTypes(createVestingAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: msg,
      });
      const expected: AminoMsgCreateVestingAccount = {
        type: "cosmos-sdk/MsgCreateVestingAccount",
        value: {
          from_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          to_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          amount: coins(1234, "ucosm"),
          end_time: "1838718434",
          delayed: true,
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgCreateVestingAccount", () => {
      const aminoMsg: AminoMsgCreateVestingAccount = {
        type: "cosmos-sdk/MsgCreateVestingAccount",
        value: {
          from_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          to_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          amount: coins(1234, "ucosm"),
          end_time: "1838718434",
          delayed: true,
        },
      };
      const msg = new AminoTypes(createVestingAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgCreateVestingAccount = {
        fromAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        toAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        amount: coins(1234, "ucosm"),
        endTime: Long.fromString("1838718434"),
        delayed: true,
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: expectedValue,
      });
    });
  });
});

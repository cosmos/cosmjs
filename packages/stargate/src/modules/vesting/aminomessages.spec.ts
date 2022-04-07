/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, coins } from "@cosmjs/amino";
import { MsgCreateVestingAccount } from "cosmjs-types/cosmos/vesting/v1beta1/tx";
import Long from "long";

import { AminoTypes } from "../../aminotypes";
import { AminoMsgCreateVestingAccount, createVestingAminoConverters } from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgCreateVestingAccount", () => {
      const msg: MsgCreateVestingAccount = {
        fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coins(1234, "utest"),
        endTime: Long.fromString("1838718434"),
        delayed: true,
      };
      const aminoTypes = new AminoTypes(createVestingAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: msg,
      });
      const expected: AminoMsgCreateVestingAccount = {
        type: "cosmos-sdk/MsgCreateVestingAccount",
        value: {
          from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coins(1234, "utest"),
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
          from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coins(1234, "utest"),
          end_time: "1838718434",
          delayed: true,
        },
      };
      const msg = new AminoTypes(createVestingAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgCreateVestingAccount = {
        fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coins(1234, "utest"),
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

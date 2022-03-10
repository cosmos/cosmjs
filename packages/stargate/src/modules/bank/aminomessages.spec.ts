/* eslint-disable @typescript-eslint/naming-convention */
import { coins } from "@cosmjs/proto-signing";
import { MsgMultiSend, MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";

import { AminoTypes } from "../../aminotypes";
import { AminoMsgMultiSend, AminoMsgSend, createBankAminoConverters } from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgSend", () => {
      const msg: MsgSend = {
        fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coins(1234, "ucosm"),
      };
      const aminoTypes = new AminoTypes(createBankAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: msg,
      });
      const expected: AminoMsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coins(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgMultiSend", () => {
      const msg: MsgMultiSend = {
        inputs: [
          { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
          { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
        ],
        outputs: [
          { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
          { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
        ],
      };
      const aminoTypes = new AminoTypes(createBankAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: msg,
      });
      const expected: AminoMsgMultiSend = {
        type: "cosmos-sdk/MsgMultiSend",
        value: {
          inputs: [
            { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
            { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
          ],
          outputs: [
            { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
            { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
          ],
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgSend", () => {
      const aminoMsg: AminoMsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coins(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes(createBankAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgSend = {
        fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coins(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: expectedValue,
      });
    });

    it("works for MsgMultiSend", () => {
      const aminoMsg: AminoMsgMultiSend = {
        type: "cosmos-sdk/MsgMultiSend",
        value: {
          inputs: [
            { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
            { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
          ],
          outputs: [
            { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
            { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
          ],
        },
      };
      const msg = new AminoTypes(createBankAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgMultiSend = {
        inputs: [
          { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
          { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
        ],
        outputs: [
          { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
          { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
        ],
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: expectedValue,
      });
    });
  });
});

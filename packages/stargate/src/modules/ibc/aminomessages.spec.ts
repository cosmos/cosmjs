/* eslint-disable @typescript-eslint/naming-convention */
import { coin } from "@cosmjs/proto-signing";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";

import { AminoTypes } from "../../aminotypes";
import { AminoMsgTransfer, createIbcAminoConverters } from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgTransfer", () => {
      const msg: MsgTransfer = {
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: {
          revisionHeight: BigInt("123"),
          revisionNumber: BigInt("456"),
        },
        timeoutTimestamp: BigInt("789"),
        memo: "something something",
      };
      const aminoTypes = new AminoTypes(createIbcAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: msg,
      });
      const expected: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            revision_height: "123",
            revision_number: "456",
          },
          timeout_timestamp: "789",
          memo: "something something",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgTransfer with empty values", () => {
      const msg: MsgTransfer = {
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: {
          revisionHeight: BigInt(0),
          revisionNumber: BigInt(0),
        },
        timeoutTimestamp: BigInt(0),
        memo: "",
      };
      const aminoTypes = new AminoTypes(createIbcAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: msg,
      });
      const expected: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            revision_height: undefined,
            revision_number: undefined,
          },
          timeout_timestamp: undefined,
          memo: undefined,
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgTransfer with no height timeout", () => {
      const msg = MsgTransfer.fromPartial({
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: undefined,
        timeoutTimestamp: BigInt(0),
        memo: "",
      });
      const aminoMsg = new AminoTypes(createIbcAminoConverters()).toAmino({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: msg,
      });
      const expected: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            revision_number: undefined,
            revision_height: undefined,
          },
          timeout_timestamp: undefined,
          memo: undefined,
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgTransfer", () => {
      const aminoMsg: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            revision_height: "123",
            revision_number: "456",
          },
          timeout_timestamp: "789",
        },
      };
      const msg = new AminoTypes(createIbcAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgTransfer = {
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: {
          revisionHeight: BigInt("123"),
          revisionNumber: BigInt("456"),
        },
        timeoutTimestamp: BigInt("789"),
        memo: "",
      };
      expect(msg).toEqual({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: expectedValue,
      });
    });

    it("works for MsgTransfer with memo", () => {
      const aminoMsg: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            revision_height: "123",
            revision_number: "456",
          },
          timeout_timestamp: "789",
          memo: "Hack me",
        },
      };
      const msg = new AminoTypes(createIbcAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgTransfer = {
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: {
          revisionHeight: BigInt("123"),
          revisionNumber: BigInt("456"),
        },
        timeoutTimestamp: BigInt("789"),
        memo: "Hack me",
      };
      expect(msg).toEqual({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: expectedValue,
      });
    });

    it("works for MsgTransfer with default values", () => {
      const aminoMsg: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            // revision_height omitted
            // revision_number omitted
          },
          // timeout_timestamp omitted
          // memo omitted
        },
      };
      const msg = new AminoTypes(createIbcAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgTransfer = {
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: {
          revisionHeight: BigInt(0),
          revisionNumber: BigInt(0),
        },
        timeoutTimestamp: BigInt(0),
        memo: "",
      };
      expect(msg).toEqual({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: expectedValue,
      });
    });
  });
});

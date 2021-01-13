/* eslint-disable @typescript-eslint/naming-convention */
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "@cosmjs/cosmwasm-launchpad";
import { fromBase64, toAscii } from "@cosmjs/encoding";
import { coins } from "@cosmjs/launchpad";
import { AminoTypes } from "@cosmjs/stargate";
import Long from "long";

import { defaultTypes } from "./aminotypes";
import { cosmwasm } from "./codec";

type IMsgStoreCode = cosmwasm.wasm.v1beta1.IMsgStoreCode;
type IMsgInstantiateContract = cosmwasm.wasm.v1beta1.IMsgInstantiateContract;
type IMsgUpdateAdmin = cosmwasm.wasm.v1beta1.IMsgUpdateAdmin;
type IMsgClearAdmin = cosmwasm.wasm.v1beta1.IMsgClearAdmin;
type IMsgExecuteContract = cosmwasm.wasm.v1beta1.IMsgExecuteContract;
type IMsgMigrateContract = cosmwasm.wasm.v1beta1.IMsgMigrateContract;

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgStoreCode", () => {
      const msg: IMsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        source: "Arrabiata",
        builder: "Bob",
      };
      const aminoMsg = new AminoTypes({ additions: defaultTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
        value: msg,
      });
      const expected: MsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
          source: "Arrabiata",
          builder: "Bob",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgInstantiateContract", () => {
      const msg: IMsgInstantiateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        codeId: Long.fromString("12345"),
        label: "sticky",
        initMsg: toAscii(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        initFunds: coins(1234, "ucosm"),
        admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoMsg = new AminoTypes({ additions: defaultTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
        value: msg,
      });
      const expected: MsgInstantiateContract = {
        type: "wasm/MsgInstantiateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          code_id: "12345",
          label: "sticky",
          init_msg: {
            foo: "bar",
          },
          init_funds: coins(1234, "ucosm"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgUpdateAdmin", () => {
      const msg: IMsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes({ additions: defaultTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin",
        value: msg,
      });
      const expected: MsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgClearAdmin", () => {
      const msg: IMsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes({ additions: defaultTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgClearAdmin",
        value: msg,
      });
      const expected: MsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgExecuteContract", () => {
      const msg: IMsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toAscii(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        sentFunds: coins(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes({ additions: defaultTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
        value: msg,
      });
      const expected: MsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: {
            foo: "bar",
          },
          sent_funds: coins(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgMigrateContract", () => {
      const msg: IMsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        migrateMsg: toAscii(
          JSON.stringify({
            foo: "bar",
          }),
        ),
      };
      const aminoMsg = new AminoTypes({ additions: defaultTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgMigrateContract",
        value: msg,
      });
      const expected: MsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          msg: {
            foo: "bar",
          },
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgStoreCode", () => {
      const aminoMsg: MsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
          source: "Arrabiata",
          builder: "Bob",
        },
      };
      const msg = new AminoTypes({ additions: defaultTypes }).fromAmino(aminoMsg);
      const expectedValue: IMsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        source: "Arrabiata",
        builder: "Bob",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
        value: expectedValue,
      });
    });

    it("works for MsgInstantiateContract", () => {
      const aminoMsg: MsgInstantiateContract = {
        type: "wasm/MsgInstantiateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          code_id: "12345",
          label: "sticky",
          init_msg: {
            foo: "bar",
          },
          init_funds: coins(1234, "ucosm"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      const msg = new AminoTypes({ additions: defaultTypes }).fromAmino(aminoMsg);
      const expectedValue: IMsgInstantiateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        codeId: Long.fromString("12345"),
        label: "sticky",
        initMsg: toAscii(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        initFunds: coins(1234, "ucosm"),
        admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
        value: expectedValue,
      });
    });

    it("works for MsgUpdateAdmin", () => {
      const aminoMsg: MsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes({ additions: defaultTypes }).fromAmino(aminoMsg);
      const expectedValue: IMsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgClearAdmin", () => {
      const aminoMsg: MsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes({ additions: defaultTypes }).fromAmino(aminoMsg);
      const expectedValue: IMsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgClearAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgExecuteContract", () => {
      const aminoMsg: MsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: {
            foo: "bar",
          },
          sent_funds: coins(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes({ additions: defaultTypes }).fromAmino(aminoMsg);
      const expectedValue: IMsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toAscii(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        sentFunds: coins(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
        value: expectedValue,
      });
    });

    it("works for MsgMigrateContract", () => {
      const aminoMsg: MsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          msg: {
            foo: "bar",
          },
        },
      };
      const msg = new AminoTypes({ additions: defaultTypes }).fromAmino(aminoMsg);
      const expectedValue: IMsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        migrateMsg: toAscii(
          JSON.stringify({
            foo: "bar",
          }),
        ),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgMigrateContract",
        value: expectedValue,
      });
    });
  });
});

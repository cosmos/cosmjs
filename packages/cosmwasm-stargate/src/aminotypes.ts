/* eslint-disable @typescript-eslint/naming-convention */
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "@cosmjs/cosmwasm-launchpad";
import { fromBase64, fromUtf8, toBase64, toUtf8 } from "@cosmjs/encoding";
import { AminoConverter, coinFromProto } from "@cosmjs/stargate";
import { assertDefinedAndNotNull } from "@cosmjs/utils";
import Long from "long";

import { cosmwasm } from "./codec";

type IMsgStoreCode = cosmwasm.wasm.v1beta1.IMsgStoreCode;
type IMsgInstantiateContract = cosmwasm.wasm.v1beta1.IMsgInstantiateContract;
type IMsgUpdateAdmin = cosmwasm.wasm.v1beta1.IMsgUpdateAdmin;
type IMsgClearAdmin = cosmwasm.wasm.v1beta1.IMsgClearAdmin;
type IMsgExecuteContract = cosmwasm.wasm.v1beta1.IMsgExecuteContract;
type IMsgMigrateContract = cosmwasm.wasm.v1beta1.IMsgMigrateContract;

export const cosmWasmTypes: Record<string, AminoConverter> = {
  "/cosmwasm.wasm.v1beta1.MsgStoreCode": {
    aminoType: "wasm/MsgStoreCode",
    toAmino: ({ sender, wasmByteCode, source, builder }: IMsgStoreCode): MsgStoreCode["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(wasmByteCode, "missing wasmByteCode");
      assertDefinedAndNotNull(source, "missing source");
      assertDefinedAndNotNull(builder, "missing builder");
      return {
        sender: sender,
        wasm_byte_code: toBase64(wasmByteCode),
        source: source,
        builder: builder,
      };
    },
    fromAmino: ({ sender, wasm_byte_code, source, builder }: MsgStoreCode["value"]): IMsgStoreCode => ({
      sender: sender,
      wasmByteCode: fromBase64(wasm_byte_code),
      source: source,
      builder: builder,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgInstantiateContract": {
    aminoType: "wasm/MsgInstantiateContract",
    toAmino: ({
      sender,
      codeId,
      label,
      initMsg,
      initFunds,
      admin,
    }: IMsgInstantiateContract): MsgInstantiateContract["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(codeId, "missing codeId");
      assertDefinedAndNotNull(label, "missing label");
      assertDefinedAndNotNull(initMsg, "missing initMsg");
      assertDefinedAndNotNull(initFunds, "missing initFunds");
      return {
        sender: sender,
        code_id: codeId.toString(),
        label: label,
        init_msg: JSON.parse(fromUtf8(initMsg)),
        init_funds: initFunds.map(coinFromProto),
        admin: admin ?? undefined,
      };
    },
    fromAmino: ({
      sender,
      code_id,
      label,
      init_msg,
      init_funds,
      admin,
    }: MsgInstantiateContract["value"]): IMsgInstantiateContract => ({
      sender: sender,
      codeId: Long.fromString(code_id),
      label: label,
      initMsg: toUtf8(JSON.stringify(init_msg)),
      initFunds: [...init_funds],
      admin: admin,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin": {
    aminoType: "wasm/MsgUpdateAdmin",
    toAmino: ({ sender, newAdmin, contract }: IMsgUpdateAdmin): MsgUpdateAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(newAdmin, "missing newAdmin");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        new_admin: newAdmin,
        contract: contract,
      };
    },
    fromAmino: ({ sender, new_admin, contract }: MsgUpdateAdmin["value"]): IMsgUpdateAdmin => ({
      sender: sender,
      newAdmin: new_admin,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgClearAdmin": {
    aminoType: "wasm/MsgClearAdmin",
    toAmino: ({ sender, contract }: IMsgClearAdmin): MsgClearAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        contract: contract,
      };
    },
    fromAmino: ({ sender, contract }: MsgClearAdmin["value"]): IMsgClearAdmin => ({
      sender: sender,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgExecuteContract": {
    aminoType: "wasm/MsgExecuteContract",
    toAmino: ({ sender, contract, msg, sentFunds }: IMsgExecuteContract): MsgExecuteContract["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      assertDefinedAndNotNull(msg, "missing msg");
      assertDefinedAndNotNull(sentFunds, "missing sentFunds");
      return {
        sender: sender,
        contract: contract,
        msg: JSON.parse(fromUtf8(msg)),
        sent_funds: sentFunds.map(coinFromProto),
      };
    },
    fromAmino: ({ sender, contract, msg, sent_funds }: MsgExecuteContract["value"]): IMsgExecuteContract => ({
      sender: sender,
      contract: contract,
      msg: toUtf8(JSON.stringify(msg)),
      sentFunds: [...sent_funds],
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgMigrateContract": {
    aminoType: "wasm/MsgMigrateContract",
    toAmino: ({ sender, contract, codeId, migrateMsg }: IMsgMigrateContract): MsgMigrateContract["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      assertDefinedAndNotNull(codeId, "missing codeId");
      assertDefinedAndNotNull(migrateMsg, "missing migrateMsg");
      return {
        sender: sender,
        contract: contract,
        code_id: codeId.toString(),
        msg: JSON.parse(fromUtf8(migrateMsg)),
      };
    },
    fromAmino: ({ sender, contract, code_id, msg }: MsgMigrateContract["value"]): IMsgMigrateContract => ({
      sender: sender,
      contract: contract,
      codeId: Long.fromString(code_id),
      migrateMsg: toUtf8(JSON.stringify(msg)),
    }),
  },
};

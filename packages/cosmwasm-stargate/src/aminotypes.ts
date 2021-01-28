/* eslint-disable @typescript-eslint/naming-convention */
import {
  MsgClearAdmin as LaunchpadMsgClearAdmin,
  MsgExecuteContract as LaunchpadMsgExecuteContract,
  MsgInstantiateContract as LaunchpadMsgInstantiateContract,
  MsgMigrateContract as LaunchpadMsgMigrateContract,
  MsgStoreCode as LaunchpadMsgStoreCode,
  MsgUpdateAdmin as LaunchpadMsgUpdateAdmin,
} from "@cosmjs/cosmwasm-launchpad";
import { fromBase64, fromUtf8, toBase64, toUtf8 } from "@cosmjs/encoding";
import { AminoConverter, coinFromProto } from "@cosmjs/stargate";
import { assertDefinedAndNotNull } from "@cosmjs/utils";
import Long from "long";

import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "./codec/x/wasm/internal/types/tx";

export const cosmWasmTypes: Record<string, AminoConverter> = {
  "/cosmwasm.wasm.v1beta1.MsgStoreCode": {
    aminoType: "wasm/MsgStoreCode",
    toAmino: ({ sender, wasmByteCode, source, builder }: MsgStoreCode): LaunchpadMsgStoreCode["value"] => {
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
    fromAmino: ({
      sender,
      wasm_byte_code,
      source,
      builder,
    }: LaunchpadMsgStoreCode["value"]): MsgStoreCode => ({
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
    }: MsgInstantiateContract): LaunchpadMsgInstantiateContract["value"] => {
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
    }: LaunchpadMsgInstantiateContract["value"]): MsgInstantiateContract => ({
      sender: sender,
      codeId: Long.fromString(code_id),
      label: label,
      initMsg: toUtf8(JSON.stringify(init_msg)),
      initFunds: [...init_funds],
      admin: admin ?? "",
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin": {
    aminoType: "wasm/MsgUpdateAdmin",
    toAmino: ({ sender, newAdmin, contract }: MsgUpdateAdmin): LaunchpadMsgUpdateAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(newAdmin, "missing newAdmin");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        new_admin: newAdmin,
        contract: contract,
      };
    },
    fromAmino: ({ sender, new_admin, contract }: LaunchpadMsgUpdateAdmin["value"]): MsgUpdateAdmin => ({
      sender: sender,
      newAdmin: new_admin,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgClearAdmin": {
    aminoType: "wasm/MsgClearAdmin",
    toAmino: ({ sender, contract }: MsgClearAdmin): LaunchpadMsgClearAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        contract: contract,
      };
    },
    fromAmino: ({ sender, contract }: LaunchpadMsgClearAdmin["value"]): MsgClearAdmin => ({
      sender: sender,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgExecuteContract": {
    aminoType: "wasm/MsgExecuteContract",
    toAmino: ({
      sender,
      contract,
      msg,
      sentFunds,
    }: MsgExecuteContract): LaunchpadMsgExecuteContract["value"] => {
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
    fromAmino: ({
      sender,
      contract,
      msg,
      sent_funds,
    }: LaunchpadMsgExecuteContract["value"]): MsgExecuteContract => ({
      sender: sender,
      contract: contract,
      msg: toUtf8(JSON.stringify(msg)),
      sentFunds: [...sent_funds],
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgMigrateContract": {
    aminoType: "wasm/MsgMigrateContract",
    toAmino: ({
      sender,
      contract,
      codeId,
      migrateMsg,
    }: MsgMigrateContract): LaunchpadMsgMigrateContract["value"] => {
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
    fromAmino: ({
      sender,
      contract,
      code_id,
      msg,
    }: LaunchpadMsgMigrateContract["value"]): MsgMigrateContract => ({
      sender: sender,
      contract: contract,
      codeId: Long.fromString(code_id),
      migrateMsg: toUtf8(JSON.stringify(msg)),
    }),
  },
};

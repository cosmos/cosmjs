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
import { Coin } from "@cosmjs/launchpad";
import { AminoConverter, codec } from "@cosmjs/stargate";
import { assert } from "@cosmjs/utils";
import Long from "long";

import { cosmwasm } from "./codec";

type ICoin = codec.cosmos.base.v1beta1.ICoin;
type IMsgStoreCode = cosmwasm.wasm.v1beta1.IMsgStoreCode;
type IMsgInstantiateContract = cosmwasm.wasm.v1beta1.IMsgInstantiateContract;
type IMsgUpdateAdmin = cosmwasm.wasm.v1beta1.IMsgUpdateAdmin;
type IMsgClearAdmin = cosmwasm.wasm.v1beta1.IMsgClearAdmin;
type IMsgExecuteContract = cosmwasm.wasm.v1beta1.IMsgExecuteContract;
type IMsgMigrateContract = cosmwasm.wasm.v1beta1.IMsgMigrateContract;

function checkAmount(amount: readonly ICoin[] | undefined | null): readonly Coin[] {
  assert(amount, "missing amount");
  return amount.map((a) => {
    assert(a.amount, "missing amount");
    assert(a.denom, "missing denom");
    return {
      amount: a.amount,
      denom: a.denom,
    };
  });
}

export const cosmWasmTypes: Record<string, AminoConverter> = {
  "/cosmwasm.wasm.v1beta1.MsgStoreCode": {
    aminoType: "wasm/MsgStoreCode",
    toAmino: ({ sender, wasmByteCode, source, builder }: IMsgStoreCode): MsgStoreCode["value"] => {
      assert(sender, "missing sender");
      assert(wasmByteCode, "missing wasmByteCode");
      assert(typeof source === "string", "missing source");
      assert(typeof builder === "string", "missing builder");
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
      assert(sender, "missing sender");
      assert(codeId, "missing codeId");
      assert(label, "missing label");
      assert(initMsg, "missing initMsg");
      return {
        sender: sender,
        code_id: codeId.toString(),
        label: label,
        init_msg: JSON.parse(fromUtf8(initMsg)),
        init_funds: checkAmount(initFunds),
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
      assert(sender, "missing sender");
      assert(newAdmin, "missing newAdmin");
      assert(contract, "missing contract");
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
      assert(sender, "missing sender");
      assert(contract, "missing contract");
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
      assert(sender, "missing sender");
      assert(contract, "missing contract");
      assert(msg, "missing msg");
      return {
        sender: sender,
        contract: contract,
        msg: JSON.parse(fromUtf8(msg)),
        sent_funds: checkAmount(sentFunds),
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
      assert(sender, "missing sender");
      assert(contract, "missing contract");
      assert(codeId, "missing codeId");
      assert(migrateMsg, "missing migrateMsg");
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

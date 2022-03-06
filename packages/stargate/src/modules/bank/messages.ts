import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgMultiSend, MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";

export const bankTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.bank.v1beta1.MsgMultiSend", MsgMultiSend],
  ["/cosmos.bank.v1beta1.MsgSend", MsgSend],
];

export interface MsgSendEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.bank.v1beta1.MsgSend";
  readonly value: Partial<MsgSend>;
}

export function isMsgSendEncodeObject(encodeObject: EncodeObject): encodeObject is MsgSendEncodeObject {
  return (encodeObject as MsgSendEncodeObject).typeUrl === "/cosmos.bank.v1beta1.MsgSend";
}

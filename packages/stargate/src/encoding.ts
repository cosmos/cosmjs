import { Msg, StdSignDoc } from "@cosmjs/launchpad";

function snakifyMsgValue(obj: Msg): Msg {
  return {
    ...obj,
    value: Object.entries(obj.value).reduce(
      (snakified, [key, value]) => ({
        ...snakified,
        [key
          .split(/(?=[A-Z])/)
          .join("_")
          .toLowerCase()]: value,
      }),
      {},
    ),
  };
}

export function snakifyForAmino(signDoc: StdSignDoc): StdSignDoc {
  return {
    ...signDoc,
    msgs: signDoc.msgs.map(snakifyMsgValue),
  };
}

export function getMsgType(typeUrl: string): string {
  const typeRegister: Record<string, string> = {
    "/cosmos.staking.v1beta1.MsgDelegate": "cosmos-sdk/MsgDelegate",
  };
  const type = typeRegister[typeUrl];
  if (!type) {
    throw new Error("Type URL not known");
  }
  return type;
}

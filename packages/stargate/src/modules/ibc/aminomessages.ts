/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import Long from "long";

import { AminoConverters } from "../../aminotypes";

// https://github.com/cosmos/ibc-go/blob/07b6a97b67d17fd214a83764cbdb2c2c3daef445/modules/core/02-client/types/client.pb.go#L297-L312
interface AminoHeight {
  /** 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/core/02-client/types/client.pb.go#L252). */
  readonly revision_number?: string;
  /** 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/core/02-client/types/client.pb.go#L254). */
  readonly revision_height?: string;
}

// https://github.com/cosmos/ibc-go/blob/07b6a97b67d17fd214a83764cbdb2c2c3daef445/modules/apps/transfer/types/tx.pb.go#L33-L53
/** Transfers fungible tokens (i.e Coins) between ICS20 enabled chains */
export interface AminoMsgTransfer extends AminoMsg {
  readonly type: "cosmos-sdk/MsgTransfer";
  readonly value: {
    readonly source_port: string;
    readonly source_channel: string;
    readonly token?: Coin;
    /** Bech32 account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly receiver: string;
    /**
     * The timeout as a (revision_number, revision_height) pair.
     *
     * This fied is is non-optional (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/applications/transfer/types/tx.pb.go#L49).
     * In order to not set the timeout height, set it to {}.
     */
    readonly timeout_height: AminoHeight;
    /**
     * Timeout timestamp in nanoseconds since Unix epoch. The timeout is disabled when set to 0.
     *
     * 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/applications/transfer/types/tx.pb.go#L52).
     */
    readonly timeout_timestamp?: string;
  };
}

export function isAminoMsgTransfer(msg: AminoMsg): msg is AminoMsgTransfer {
  return msg.type === "cosmos-sdk/MsgTransfer";
}

function omitDefault<T extends string | number | Long>(input: T): T | undefined {
  if (typeof input === "string") {
    return input === "" ? undefined : input;
  }

  if (typeof input === "number") {
    return input === 0 ? undefined : input;
  }

  if (Long.isLong(input)) {
    return input.isZero() ? undefined : input;
  }

  throw new Error(`Got unsupported type '${typeof input}'`);
}

export function createIbcAminoConverters(): AminoConverters {
  return {
    "/ibc.applications.transfer.v1.MsgTransfer": {
      aminoType: "cosmos-sdk/MsgTransfer",
      toAmino: ({
        sourcePort,
        sourceChannel,
        token,
        sender,
        receiver,
        timeoutHeight,
        timeoutTimestamp,
      }: MsgTransfer): AminoMsgTransfer["value"] => ({
        source_port: sourcePort,
        source_channel: sourceChannel,
        token: token,
        sender: sender,
        receiver: receiver,
        timeout_height: timeoutHeight
          ? {
              revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
              revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString(),
            }
          : {},
        timeout_timestamp: omitDefault(timeoutTimestamp)?.toString(),
      }),
      fromAmino: ({
        source_port,
        source_channel,
        token,
        sender,
        receiver,
        timeout_height,
        timeout_timestamp,
      }: AminoMsgTransfer["value"]): MsgTransfer =>
        MsgTransfer.fromPartial({
          sourcePort: source_port,
          sourceChannel: source_channel,
          token: token,
          sender: sender,
          receiver: receiver,
          timeoutHeight: timeout_height
            ? {
                revisionHeight: Long.fromString(timeout_height.revision_height || "0", true),
                revisionNumber: Long.fromString(timeout_height.revision_number || "0", true),
              }
            : undefined,
          timeoutTimestamp: Long.fromString(timeout_timestamp || "0", true),
        }),
    },
  };
}

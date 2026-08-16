/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg } from "@cosmjs/amino";
import { assert, assertDefinedAndNotNull } from "@cosmjs/utils";
import { GenericAuthorization, Grant } from "cosmjs-types/cosmos/authz/v1beta1/authz";
import { MsgGrant, MsgRevoke } from "cosmjs-types/cosmos/authz/v1beta1/tx";
import { SendAuthorization } from "cosmjs-types/cosmos/bank/v1beta1/authz";
import { Any } from "cosmjs-types/google/protobuf/any";
import { Timestamp } from "cosmjs-types/google/protobuf/timestamp";

import { AminoConverters } from "../../aminotypes";

/** An authorization rendered as an Amino `{ type, value }` envelope. */
interface AminoAuthorization {
  readonly type: string;
  readonly value: Record<string, any>;
}

export interface AminoMsgGrant extends AminoMsg {
  readonly type: "cosmos-sdk/MsgGrant";
  readonly value: {
    readonly granter: string;
    readonly grantee: string;
    readonly grant: {
      readonly authorization: AminoAuthorization;
      /** RFC3339 timestamp. Omitted when the grant does not expire. */
      readonly expiration?: string;
    };
  };
}

export interface AminoMsgRevoke extends AminoMsg {
  readonly type: "cosmos-sdk/MsgRevoke";
  readonly value: {
    readonly granter: string;
    readonly grantee: string;
    readonly msg_type_url: string;
  };
}

// Grant.expiration is a protobuf Timestamp which the SDK renders as an RFC3339
// string in Amino JSON. These helpers preserve nanosecond precision (they do
// not round-trip through Date, which is millisecond-only).
function expirationToAmino(timestamp: Timestamp): string {
  const secondsPart = new Date(Number(timestamp.seconds) * 1000).toISOString().replace(/\.\d+Z$/, "Z");
  if (timestamp.nanos === 0) return secondsPart;
  const fraction = timestamp.nanos.toString().padStart(9, "0").replace(/0+$/, "");
  return secondsPart.replace(/Z$/, `.${fraction}Z`);
}

function expirationFromAmino(rfc3339: string): Timestamp {
  const fractionMatch = rfc3339.match(/\.(\d+)Z$/);
  const nanos = fractionMatch ? Number(fractionMatch[1].padEnd(9, "0")) : 0;
  const seconds = Math.floor(new Date(rfc3339).getTime() / 1000);
  return { seconds: BigInt(seconds), nanos: nanos };
}

// The authorization inside a Grant is a protobuf `Any`. Following the same
// fail-closed pattern as the gov module's proposal content, only a bounded set
// of well-known authorizations is supported; anything else throws rather than
// producing sign bytes that silently disagree with the chain.
function authorizationToAmino(authorization: Any): AminoAuthorization {
  switch (authorization.typeUrl) {
    case "/cosmos.authz.v1beta1.GenericAuthorization": {
      const auth = GenericAuthorization.decode(authorization.value);
      return {
        type: "cosmos-sdk/GenericAuthorization",
        value: { msg: auth.msg },
      };
    }
    case "/cosmos.bank.v1beta1.SendAuthorization": {
      const auth = SendAuthorization.decode(authorization.value);
      return {
        type: "cosmos-sdk/SendAuthorization",
        value: {
          spend_limit: auth.spendLimit,
          ...(auth.allowList.length > 0 ? { allow_list: auth.allowList } : {}),
        },
      };
    }
    default:
      throw new Error(`Unsupported authorization type: '${authorization.typeUrl}'`);
  }
}

function authorizationFromAmino(authorization: AminoAuthorization): Any {
  switch (authorization.type) {
    case "cosmos-sdk/GenericAuthorization": {
      const { msg } = authorization.value;
      assert(typeof msg === "string");
      return Any.fromPartial({
        typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
        value: GenericAuthorization.encode(GenericAuthorization.fromPartial({ msg: msg })).finish(),
      });
    }
    case "cosmos-sdk/SendAuthorization": {
      const { spend_limit, allow_list } = authorization.value;
      return Any.fromPartial({
        typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
        value: SendAuthorization.encode(
          SendAuthorization.fromPartial({
            spendLimit: spend_limit,
            allowList: allow_list ?? [],
          }),
        ).finish(),
      });
    }
    default:
      throw new Error(`Unsupported authorization type: '${authorization.type}'`);
  }
}

export function createAuthzAminoConverters(): AminoConverters {
  // For Cosmos SDK < 0.46 the Amino JSON codec was broken on chain and thus
  // inaccessible (see https://github.com/cosmos/cosmjs/issues/1092). This is
  // implemented for 0.46+ chains.
  //
  // MsgExec is intentionally left out: its `msgs` are arbitrary nested `Any`
  // messages that would require recursively re-encoding through the full amino
  // registry, and a partial implementation would silently produce wrong sign
  // bytes. MsgGrant supports GenericAuthorization and SendAuthorization and
  // throws on anything else (fail-closed).
  return {
    "/cosmos.authz.v1beta1.MsgGrant": {
      aminoType: "cosmos-sdk/MsgGrant",
      toAmino: ({ granter, grantee, grant }: MsgGrant): AminoMsgGrant["value"] => {
        assertDefinedAndNotNull(grant);
        const authorization = grant.authorization;
        assertDefinedAndNotNull(authorization);
        return {
          granter: granter,
          grantee: grantee,
          grant: {
            authorization: authorizationToAmino(authorization),
            ...(grant.expiration ? { expiration: expirationToAmino(grant.expiration) } : {}),
          },
        };
      },
      fromAmino: ({ granter, grantee, grant }: AminoMsgGrant["value"]): MsgGrant => {
        return {
          granter: granter,
          grantee: grantee,
          grant: Grant.fromPartial({
            authorization: authorizationFromAmino(grant.authorization),
            expiration: grant.expiration ? expirationFromAmino(grant.expiration) : undefined,
          }),
        };
      },
    },
    "/cosmos.authz.v1beta1.MsgRevoke": {
      aminoType: "cosmos-sdk/MsgRevoke",
      toAmino: ({ granter, grantee, msgTypeUrl }: MsgRevoke): AminoMsgRevoke["value"] => ({
        granter: granter,
        grantee: grantee,
        msg_type_url: msgTypeUrl,
      }),
      fromAmino: ({ granter, grantee, msg_type_url }: AminoMsgRevoke["value"]): MsgRevoke => ({
        granter: granter,
        grantee: grantee,
        msgTypeUrl: msg_type_url,
      }),
    },
  };
}

import { GenericAuthorization } from "cosmjs-types/cosmos/authz/v1beta1/authz";
import { MsgGrant, MsgRevoke } from "cosmjs-types/cosmos/authz/v1beta1/tx";
import { SendAuthorization } from "cosmjs-types/cosmos/bank/v1beta1/authz";
import { Any } from "cosmjs-types/google/protobuf/any";

import { AminoTypes } from "../../aminotypes";
import { AminoMsgGrant, AminoMsgRevoke, createAuthzAminoConverters } from "./aminomessages";

describe("authz amino converters", () => {
  const aminoTypes = new AminoTypes(createAuthzAminoConverters());
  const granter = "cosmos1p7v0km9ydt0y9nszlesjy8elzqc4n2v0w4xh2p";
  const grantee = "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5";

  describe("MsgGrant", () => {
    it("works with a GenericAuthorization and no expiration", () => {
      const msg: MsgGrant = {
        granter: granter,
        grantee: grantee,
        grant: {
          authorization: {
            typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
            value: GenericAuthorization.encode(
              GenericAuthorization.fromPartial({ msg: "/cosmos.bank.v1beta1.MsgSend" }),
            ).finish(),
          },
          expiration: undefined,
        },
      };
      const aminoMsg = aminoTypes.toAmino({ typeUrl: "/cosmos.authz.v1beta1.MsgGrant", value: msg });
      const expected: AminoMsgGrant = {
        type: "cosmos-sdk/MsgGrant",
        value: {
          granter: granter,
          grantee: grantee,
          grant: {
            authorization: {
              type: "cosmos-sdk/GenericAuthorization",
              value: { msg: "/cosmos.bank.v1beta1.MsgSend" },
            },
          },
        },
      };
      expect(aminoMsg).toEqual(expected);
      // round trip
      const back = aminoTypes.fromAmino(aminoMsg);
      expect(back).toEqual({
        typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
        value: MsgGrant.fromPartial(msg),
      });
    });

    it("works with a SendAuthorization and an expiration", () => {
      const msg: MsgGrant = {
        granter: granter,
        grantee: grantee,
        grant: {
          authorization: {
            typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
            value: SendAuthorization.encode(
              SendAuthorization.fromPartial({
                spendLimit: [{ denom: "ustake", amount: "1000000" }],
                allowList: ["cosmos147auavf4tvghskslq2w65de0nh5dqdmljxc7kh"],
              }),
            ).finish(),
          },
          expiration: { seconds: BigInt(1596300), nanos: 0 },
        },
      };
      const aminoMsg = aminoTypes.toAmino({ typeUrl: "/cosmos.authz.v1beta1.MsgGrant", value: msg });
      const expected: AminoMsgGrant = {
        type: "cosmos-sdk/MsgGrant",
        value: {
          granter: granter,
          grantee: grantee,
          grant: {
            authorization: {
              type: "cosmos-sdk/SendAuthorization",
              value: {
                spend_limit: [{ denom: "ustake", amount: "1000000" }],
                allow_list: ["cosmos147auavf4tvghskslq2w65de0nh5dqdmljxc7kh"],
              },
            },
            expiration: "1970-01-19T11:25:00Z",
          },
        },
      };
      expect(aminoMsg).toEqual(expected);
      const back = aminoTypes.fromAmino(aminoMsg);
      expect(back).toEqual({
        typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
        value: MsgGrant.fromPartial(msg),
      });
    });

    it("throws for an unsupported authorization type", () => {
      const msg: MsgGrant = {
        granter: granter,
        grantee: grantee,
        grant: {
          authorization: Any.fromPartial({
            typeUrl: "/cosmos.staking.v1beta1.StakeAuthorization",
            value: new Uint8Array([1, 2, 3]),
          }),
          expiration: undefined,
        },
      };
      expect(() =>
        aminoTypes.toAmino({ typeUrl: "/cosmos.authz.v1beta1.MsgGrant", value: msg }),
      ).toThrowError(/Unsupported authorization type/i);
    });
  });

  describe("MsgRevoke", () => {
    it("works", () => {
      const msg: MsgRevoke = {
        granter: granter,
        grantee: grantee,
        msgTypeUrl: "/cosmos.bank.v1beta1.MsgSend",
      };
      const aminoMsg = aminoTypes.toAmino({ typeUrl: "/cosmos.authz.v1beta1.MsgRevoke", value: msg });
      const expected: AminoMsgRevoke = {
        type: "cosmos-sdk/MsgRevoke",
        value: {
          granter: granter,
          grantee: grantee,
          msg_type_url: "/cosmos.bank.v1beta1.MsgSend",
        },
      };
      expect(aminoMsg).toEqual(expected);
      const back = aminoTypes.fromAmino(aminoMsg);
      expect(back).toEqual({ typeUrl: "/cosmos.authz.v1beta1.MsgRevoke", value: msg });
    });
  });
});

import { AminoConverters } from "../../aminotypes";
import { AminoMsg, Coin } from "@cosmjs/amino";
import { MsgGrant, MsgExec, MsgRevoke } from "cosmjs-types/cosmos/authz/v1beta1/tx";
import { Any } from "../../../google/protobuf/any";
import { GenericAuthorization, AuthorizationType } from 'cosmjs-types/cosmos/authz/v1beta1/authz';
import { SendAuthorization } from 'cosmjs-types/cosmos/bank/v1beta1/authz';
import { StakeAuthorization } from 'cosmjs-types/cosmos/staking/v1beta1/authz';

interface Grant {
  authorization?: any;
  expiration?: Timestamp;
}

export interface AminoMsgGrant extends AminoMsg {
  readonly type: "cosmos-sdk/MsgGrant";
  readonly value: {
    /** Bech32 account address */
    readonly granter: string;
    /** Bech32 account address */
    readonly grantee: string;
    readonly grant: Grant;
  };
}

export interface AminoMsgExec extends AminoMsg {
  readonly type: "cosmos-sdk/MsgExec";
  readonly value: {
    /** Bech32 account address */
    readonly grantee: string;

    readonly msgs: readonly Any[];
  };
}


export interface AminoMsgRevoke extends AminoMsg {
  readonly type: "cosmos-sdk/MsgRevoke";
  readonly value: {
    /** Bech32 account address */
    readonly granter: string;
    /** Bech32 account address */
    readonly grantee: string;
    readonly msg_type_url: string;
  };
}


export function createAuthzAminoConverters(): AminoConverters {
  return {
    // For Cosmos SDK < 0.46 the Amino JSON codec was broken on chain and thus inaccessible.
    // Now this can be implemented for 0.46+ chains, see
    // https://github.com/cosmos/cosmjs/issues/1092
    //
    "/cosmos.authz.v1beta1.MsgGrant": {
      aminoType: "cosmos-sdk/MsgGrant",
      toAmino: ({ granter, grantee, grant }: MsgGrant) => {
        if (!grant || !grant.authorization || grant.authorization.typeUrl === "") {
          throw new Error(
            `Unsupported grant type: '${grant?.authorization?.typeUrl}'`,
          );
        }
        let authorizationValue;
        switch (grant.authorization.typeUrl) {
          case '/cosmos.authz.v1beta1.GenericAuthorization': {
            const generic = GenericAuthorization.decode(
              grant.authorization.value,
            );
            authorizationValue = {
              type: 'cosmos-sdk/GenericAuthorization',
              value: {
                msg: generic.msg,
              },
            };
            break;
          }
          case '/cosmos.bank.v1beta1.SendAuthorization': {
            const spend = SendAuthorization.decode(grant.authorization.value);
            authorizationValue = {
              type: 'cosmos-sdk/SendAuthorization',
              value: {
                spend_limit: spend.spendLimit,
              },
            };
            break;
          }
          case '/cosmos.staking.v1beta1.StakeAuthorization': {
            const stakeAuthorization = StakeAuthorization.decode(grant.authorization.value);
            if (stakeAuthorization?.allowList?.address.length === 0 && stakeAuthorization?.denyList?.address.length === 0) {
              throw new Error(
                'Allow list and deny list can`t be both empty'
              );
            }

            if (stakeAuthorization?.allowList?.address.length > 0 && stakeAuthorization?.denyList?.address.length > 0) {
              throw new Error(
                'Can only set allow list or deny list at a time'
              );
            }

            authorizationValue = {
              type: 'cosmos-sdk/StakeAuthorization',
              value: {
                max_tokens: stakeAuthorization.maxTokens,
                allow_list: stakeAuthorization.allowList,
                deny_list: stakeAuthorization.denyList,
                authorization_type: stakeAuthorization.authorizationType
              },
            };
            break;
          }
          default:
            throw new Error(
              `Unsupported grant type: '${grant.authorization.typeUrl}'`,
            );
        }
        const expiration = grant.expiration?.seconds;
        return {
          granter,
          grantee,
          grant: {
            authorization: authorizationValue,
            expiration: expiration
              ? new Date(expiration.toNumber() * 1000).toISOString().replace(/\.000Z$/, 'Z')
              : undefined,
          },
        };
      },
      fromAmino: ({ granter, grantee, grant }: {
        granter: string; grantee: string; grant: any;
      }): MsgGrant => {
        const authorizationType = grant?.authorization?.type;
        let authorizationValue;
        switch (authorizationType) {
          case 'cosmos-sdk/GenericAuthorization': {
            authorizationValue = {
              typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
              value: GenericAuthorization
                .encode({ msg: grant.authorization.value.msg })
                .finish(),
            };
            break;
          }
          case 'cosmos-sdk/SendAuthorization': {
            authorizationValue = {
              typeUrl: '/cosmos.bank.v1beta1.SendAuthorization',
              value: SendAuthorization
                .encode(SendAuthorization
                  .fromPartial({ spendLimit: grant.authorization.value.spend_limit }))
                .finish(),
            };
            break;
          }
          case 'cosmos-sdk/StakeAuthorization': {
            authorizationValue = {
              typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
              value: SendAuthorization
                .encode(StakeAuthorization
                  .fromPartial({
                    maxTokens: grant.authorization.value.max_token,
                    allowList: grant.authorization.value.allow_list,
                    denyList: grant.authorization.value.deny_list,
                    authorizationType: grant.authorization.value.authorization_type,
                  }))
                .finish(),
            };
            break;
          }
          default:
            throw new Error(
              `Unsupported grant type: '${grant?.authorization?.type}'`,
            );
        }
        const expiration = grant.expiration
          ? Date.parse(grant.expiration)
          : undefined;
        return MsgGrant.fromPartial({
          granter,
          grantee,
          grant: {
            authorization: authorizationValue,
            expiration: expiration
              ? Timestamp.fromPartial({
                seconds: expiration / 1000,
                nanos: (expiration % 1000) * 1e6,
              })
              : undefined,
          },
        });
      },
    },
    "/cosmos.authz.v1beta1.MsgExec": {
      aminoType: 'cosmos-sdk/MsgExec',
      toAmino: ({ grantee, msgs }: MsgExec) => {
        if (msgs.length === 0) {
          throw new Error(
            'Messages list must not be empty',
          );
        }
        return MsgExec.fromPartial({
          grantee,
          msgs,
        })
      },
      /* eslint-disable camelcase */
      fromAmino: ({ grantee, msgs }: {
        grantee: string, msgs: Any[]
      }): MsgExec => {
        if (msgs.length === 0) {
          throw new Error(
            'Messages list must not be empty',
          );
        }
        return MsgExec.fromPartial(
          grantee,
          msgs,
        )
      },
      /* eslint-enable camelcase */
    },
    "/cosmos.authz.v1beta1.MsgRevoke": {
      aminoType: 'cosmos-sdk/MsgRevoke',
      toAmino: ({ granter, grantee, msgTypeUrl }: MsgRevoke) => ({
        granter,
        grantee,
        msg_type_url: msgTypeUrl,
      }),
      /* eslint-disable camelcase */
      fromAmino: ({ granter, grantee, msg_type_url }: {
        granter: string, grantee: string, msg_type_url: string
      }): MsgRevoke => MsgRevoke.fromPartial({
        granter,
        grantee,
        msgTypeUrl: msg_type_url,
      }),
      /* eslint-enable camelcase */
    },
  };
}

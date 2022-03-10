import { AminoConverters } from "../../aminotypes";

export function createAuthzAminoConverters(): AminoConverters {
  return {
    "/cosmos.authz.v1beta1.MsgGrant": "not_supported_by_chain",
    "/cosmos.authz.v1beta1.MsgExec": "not_supported_by_chain",
    "/cosmos.authz.v1beta1.MsgRevoke": "not_supported_by_chain",
  };
}

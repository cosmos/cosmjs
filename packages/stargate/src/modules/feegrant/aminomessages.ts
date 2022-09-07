import { AminoConverters } from "../../aminotypes";

export function createFeegrantAminoConverters(): AminoConverters {
  return {
    "/cosmos.feegrant.v1beta1.MsgGrantAllowance": "not_supported_by_chain",
    "/cosmos.feegrant.v1beta1.MsgRevokeAllowance": "not_supported_by_chain",
  };
}

import { AminoConverters } from "../../aminotypes";

export function createAuthzAminoConverters(): AminoConverters {
  return {
    // For Cosmos SDK < 0.46 the Amino JSON codec was broken on chain and thus inaccessible.
    // Now this can be implemented for 0.46+ chains, see
    // https://github.com/cosmos/cosmjs/issues/1092
    //
    // "/cosmos.authz.v1beta1.MsgGrant": IMPLEMENT ME,
    // "/cosmos.authz.v1beta1.MsgExec": IMPLEMENT ME,
    // "/cosmos.authz.v1beta1.MsgRevoke": IMPLEMENT ME,
  };
}

const defaultTypes: Record<string, string> = {
  "/cosmos.bank.v1beta1.MsgSend": "cosmos-sdk/MsgSend",
  "/cosmos.bank.v1beta1.MsgMultiSend": "cosmos-sdk/MsgMultiSend",
  "/cosmos.crisis.v1beta1.MsgVerifyInvariant": "cosmos-sdk/MsgVerifyInvariant",
  "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": "cosmos-sdk/MsgSetWithdrawAddress",
  "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": "cosmos-sdk/MsgWithdrawDelegatorReward",
  "/cosmos.distribution.v1beta1.MsgWithdrawValidatorComission": "cosmos-sdk/MsgWithdrawValidatorComission",
  "/cosmos.distribution.v1beta1.MsgFundCommunityPool": "cosmos-sdk/MsgFundCommunityPool",
  "/cosmos.evidence.v1beta1.MsgSubmitEvidence": "cosmos-sdk/MsgSubmitEvidence",
  "/cosmos.gov.v1beta1.MsgSubmitProposal": "cosmos-sdk/MsgSubmitProposal",
  "/cosmos.gov.v1beta1.MsgVote": "cosmos-sdk/MsgVote",
  "/cosmos.gov.v1beta1.MsgDeposit": "cosmos-sdk/MsgDeposit",
  "/cosmos.slashing.v1beta1.MsgUnjail": "cosmos-sdk/MsgUnjail",
  "/cosmos.staking.v1beta1.MsgCreateValidator": "cosmos-sdk/MsgCreateValidator",
  "/cosmos.staking.v1beta1.MsgEditValidator": "cosmos-sdk/MsgEditValidator",
  "/cosmos.staking.v1beta1.MsgDelegate": "cosmos-sdk/MsgDelegate",
  "/cosmos.staking.v1beta1.MsgBeginRedelegate": "cosmos-sdk/MsgBeginRedelegate",
  "/cosmos.staking.v1beta1.MsgUndelegate": "cosmos-sdk/MsgUndelegate",
  "/cosmos.vesting.v1beta1.MsgCreateVestingAccount": "cosmos-sdk/MsgCreateVestingAccount",
};

/**
 * A map from Stargate message types as used in the messages's `Any` type
 * to Amino types.
 */
export class AminoTypes {
  private readonly register: Record<string, string>;

  public constructor(additions: Record<string, string> = {}) {
    this.register = { ...defaultTypes, ...additions };
  }

  public toAmino(typeUrl: string): string {
    const type = defaultTypes[typeUrl];
    if (!type) {
      throw new Error(
        "Type URL does not exist in the Amino message type register. " +
          "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
          "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.",
      );
    }
    return type;
  }

  public fromAmino(type: string): string {
    const [typeUrl] = Object.entries(defaultTypes).find(([_typeUrl, value]) => value === type) ?? [];
    if (!typeUrl) {
      throw new Error(
        "Type does not exist in the Amino message type register. " +
          "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
          "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.",
      );
    }
    return typeUrl;
  }
}

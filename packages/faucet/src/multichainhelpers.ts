import { Account, Identity, TokenTicker } from "@iov/bcp";
import { UserProfile } from "@iov/keycontrol";

export function identitiesOfFirstWallet(profile: UserProfile): ReadonlyArray<Identity> {
  const wallet = profile.wallets.value[0];
  return profile.getIdentities(wallet.id);
}

export function availableTokensFromHolder(holderAccount: Account): ReadonlyArray<TokenTicker> {
  return holderAccount.balance.map((coin) => coin.tokenTicker);
}

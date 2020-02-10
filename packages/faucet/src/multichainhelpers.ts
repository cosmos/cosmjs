import { Account, BlockchainConnection, Identity, TokenTicker } from "@iov/bcp";
import { UserProfile } from "@iov/keycontrol";

import { identityToAddress } from "./addresses";

export function identitiesOfFirstWallet(profile: UserProfile): ReadonlyArray<Identity> {
  const wallet = profile.wallets.value[0];
  return profile.getIdentities(wallet.id);
}

export async function loadAccounts(
  profile: UserProfile,
  connection: BlockchainConnection,
): Promise<ReadonlyArray<Account>> {
  const addresses = identitiesOfFirstWallet(profile).map(identity => identityToAddress(identity));

  const out: Account[] = [];
  for (const address of addresses) {
    const response = await connection.getAccount({ address: address });
    if (response) {
      out.push({
        address: response.address,
        balance: response.balance,
      });
    } else {
      out.push({
        address: address,
        balance: [],
      });
    }
  }

  return out;
}

export function availableTokensFromHolder(holderAccount: Account): ReadonlyArray<TokenTicker> {
  return holderAccount.balance.map(coin => coin.tokenTicker);
}

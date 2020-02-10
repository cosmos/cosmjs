import {
  Account,
  BlockchainConnection,
  Identity,
  isBlockInfoFailed,
  isBlockInfoPending,
  SendTransaction,
  TokenTicker,
  TxCodec,
} from "@iov/bcp";
import { UserProfile } from "@iov/keycontrol";

import { identityToAddress } from "./addresses";
import { SendJob } from "./types";

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

export async function loadTokenTickers(
  connection: BlockchainConnection,
): Promise<ReadonlyArray<TokenTicker>> {
  return (await connection.getAllTokens()).map(token => token.tokenTicker);
}

/**
 * Creates and posts a send transaction. Then waits until the transaction is in a block.
 */
export async function send(
  profile: UserProfile,
  connection: BlockchainConnection,
  codec: TxCodec,
  job: SendJob,
): Promise<void> {
  const sendWithFee = await connection.withDefaultFee<SendTransaction>({
    kind: "bcp/send",
    chainId: connection.chainId(),
    sender: codec.identityToAddress(job.sender),
    senderPubkey: job.sender.pubkey,
    recipient: job.recipient,
    memo: "We ❤️ developers – iov.one",
    amount: job.amount,
  });

  const nonce = await connection.getNonce({ pubkey: job.sender.pubkey });
  const signed = await profile.signTransaction(job.sender, sendWithFee, codec, nonce);

  const post = await connection.postTx(codec.bytesToPost(signed));
  const blockInfo = await post.blockInfo.waitFor(info => !isBlockInfoPending(info));
  if (isBlockInfoFailed(blockInfo)) {
    throw new Error(`Sending tokens failed. Code: ${blockInfo.code}, message: ${blockInfo.message}`);
  }
}

export function availableTokensFromHolder(holderAccount: Account): ReadonlyArray<TokenTicker> {
  return holderAccount.balance.map(coin => coin.tokenTicker);
}

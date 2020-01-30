import {
  Account,
  BlockchainConnection,
  Identity,
  isBlockInfoFailed,
  isBlockInfoPending,
  SendTransaction,
  TokenTicker,
} from "@iov/bcp";
import { UserProfile } from "@iov/keycontrol";
import { MultiChainSigner } from "@iov/multichain";

import { needsRefill, refillAmount } from "./cashflow";
import { codecImplementation } from "./codec";
import { debugAccount, logAccountsState, logSendJob } from "./debugging";
import { SendJob } from "./types";

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function identitiesOfFirstWallet(profile: UserProfile): ReadonlyArray<Identity> {
  const wallet = profile.wallets.value[0];
  return profile.getIdentities(wallet.id);
}

export async function accountsOfFirstChain(
  profile: UserProfile,
  signer: MultiChainSigner,
): Promise<ReadonlyArray<Account>> {
  const addresses = identitiesOfFirstWallet(profile).map(identity => signer.identityToAddress(identity));
  const chainId = signer.chainIds()[0];

  // tslint:disable-next-line: readonly-array
  const out: Account[] = [];
  for (const address of addresses) {
    const response = await signer.connection(chainId).getAccount({ address: address });
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

export async function tokenTickersOfFirstChain(
  signer: MultiChainSigner,
): Promise<ReadonlyArray<TokenTicker>> {
  const chainId = signer.chainIds()[0];
  return (await signer.connection(chainId).getAllTokens()).map(token => token.tokenTicker);
}

/**
 * Creates and posts a send transaction. Then waits until the transaction is in a block.
 */
export async function sendOnFirstChain(
  profile: UserProfile,
  connection: BlockchainConnection,
  job: SendJob,
): Promise<void> {
  const codec = codecImplementation();

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

export async function refillFirstChain(profile: UserProfile, signer: MultiChainSigner): Promise<void> {
  const chainId = signer.chainIds()[0];
  const connection = signer.connection(chainId);

  console.info(`Connected to network: ${chainId}`);
  console.info(`Tokens on network: ${(await tokenTickersOfFirstChain(signer)).join(", ")}`);

  const holderIdentity = identitiesOfFirstWallet(profile)[0];

  const accounts = await accountsOfFirstChain(profile, signer);
  logAccountsState(accounts);
  const holderAccount = accounts[0];
  const distributorAccounts = accounts.slice(1);

  const availableTokens = availableTokensFromHolder(holderAccount);
  console.info("Available tokens:", availableTokens);

  // tslint:disable-next-line: readonly-array
  const jobs: SendJob[] = [];

  for (const token of availableTokens) {
    const refillDistibutors = distributorAccounts.filter(account => needsRefill(account, token));
    console.info(`Refilling ${token} of:`);
    console.info(
      refillDistibutors.length ? refillDistibutors.map(r => `  ${debugAccount(r)}`).join("\n") : "  none",
    );
    for (const refillDistibutor of refillDistibutors) {
      jobs.push({
        sender: holderIdentity,
        recipient: refillDistibutor.address,
        tokenTicker: token,
        amount: refillAmount(token),
      });
    }
  }
  if (jobs.length > 0) {
    for (const job of jobs) {
      logSendJob(job);
      await sendOnFirstChain(profile, connection, job);
      await sleep(50);
    }

    console.info("Done refilling accounts.");
    logAccountsState(await accountsOfFirstChain(profile, signer));
  } else {
    console.info("Nothing to be done. Anyways, thanks for checking.");
  }
}

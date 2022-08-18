import { binaryName } from "../constants";

export function help(): void {
  const out = `
Usage: ${binaryName} action [arguments...]

Positional arguments per action are listed below. Arguments in parentheses are optional.

help      Shows a help text and exits

version   Prints the version and exits

generate  Generates a random mnemonic, shows derived faucet addresses and exits

start     Starts the faucet
           1  Node base URL, e.g. http://localhost:1317

Environment variables

FAUCET_CONCURRENCY        Number of distributor accounts. Defaults to 5.
FAUCET_PORT               Port of the webserver. Defaults to 8000.
FAUCET_MEMO               Memo for send transactions. Defaults to unset.
FAUCET_GAS_PRICE          Gas price for transactions as a comma separated list.
                          Defaults to "0.025ucosm".
FAUCET_GAS_LIMIT          Gas limit for send transactions. Defaults to 100000.
FAUCET_MNEMONIC           Secret mnemonic that serves as the base secret for the
                          faucet HD accounts
FAUCET_PATH_PATTERN       The pattern of BIP32 paths for the faucet accounts.
                          Must contain one "a" placeholder that is replaced with
                          the account index.
                          Defaults to the Cosmos Hub path "m/44'/118'/0'/0/a".
FAUCET_ADDRESS_PREFIX     The bech32 address prefix. Defaults to "cosmos".
FAUCET_TOKENS             A comma separated list of token denoms, e.g.
                          "uatom" or "ucosm, mstake".
FAUCET_CREDIT_AMOUNT_TKN  Send this amount of TKN to a user requesting TKN. TKN is
                          a placeholder for the token's denom. Defaults to 10000000.
FAUCET_REFILL_FACTOR      Send factor times credit amount on refilling. Defauls to 8.
FAUCET_REFILL_THRESHOLD   Refill when balance gets below factor times credit amount.
                          Defaults to 20.
FAUCET_COOLDOWN_TIME      Time (in seconds) after which an address can request
                          more tokens. Can be set to "0". Defaults to 24 hours
                          if unset or an empty string.
`.trim();

  process.stdout.write(`${out}\n`);
}

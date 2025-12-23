/**
 * Utility functions for working with signer accounts and algorithm detection.
 */

import { encodeEthSecp256k1Pubkey, encodeSecp256k1Pubkey } from "./encoding";
import { EthSecp256k1Pubkey, Secp256k1Pubkey } from "./pubkeys";
import type { AccountData } from "./signer";

/**
 * Checks if an account uses Ethereum secp256k1 keys by examining the algorithm name.
 *
 * Handle Ethereum secp256k1 keys with dual naming convention support:
 * Different wallets and chains report Ethereum key algorithms inconsistently:
 * - "eth_secp256k1" (with underscore) - de facto standard used by Keplr wallet, CosmJS, some Cosmos SDK chains
 * - "ethsecp256k1" (without underscore) - used by Evmos, Cronos, and other EVM-compatible chains
 * Both represent the same Ethereum-compatible secp256k1 keys that require keccak256 address derivation
 *
 * @param account The account data from a signer
 * @returns true if the account uses Ethereum secp256k1 keys, false otherwise
 */
export function isEthereumSecp256k1Account(account: AccountData): boolean {
  return account.algo === "eth_secp256k1" || account.algo === "ethsecp256k1";
}

/**
 * Gets the correctly encoded amino pubkey for an account based on its algorithm.
 *
 * This utility automatically selects the appropriate encoding function based on whether
 * the account uses Ethereum secp256k1 keys or standard secp256k1 keys.
 *
 * @param account The account data from a signer
 * @returns The amino-encoded pubkey (EthSecp256k1Pubkey or Secp256k1Pubkey)
 */
export function getAminoPubkey(account: AccountData): EthSecp256k1Pubkey | Secp256k1Pubkey {
  if (isEthereumSecp256k1Account(account)) {
    return encodeEthSecp256k1Pubkey(account.pubkey);
  } else {
    return encodeSecp256k1Pubkey(account.pubkey);
  }
}

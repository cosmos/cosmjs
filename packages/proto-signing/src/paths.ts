import { HdPath, Slip10RawIndex } from "@cosmjs/crypto";

/**
 * The Cosmos Hub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 *
 * This is the same as makeCosmoshubPath from @cosmjs/launchpad but those might diverge in the future.
 */
export function makeCosmoshubPath(a: number): HdPath {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(118),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(a),
  ];
}

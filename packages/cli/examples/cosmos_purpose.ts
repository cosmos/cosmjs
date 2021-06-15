import { toHex } from "@cosmjs/encoding";
import { Slip10RawIndex, HdPath, pathToString } from "@cosmjs/crypto";

/**
 * Creates a Cosmos path under the Cosmos purpose 7564153
 * in the form `m/7564153'/chain_index'/*`.
 */
 export function makeCosmosPath(
  chainIndex: number,
  ...components: Slip10RawIndex[]
): HdPath {
  const cosmosPurpose = 7564153;
  return [
    Slip10RawIndex.hardened(cosmosPurpose),
    Slip10RawIndex.hardened(chainIndex),
    ...components,
  ];
}

/**
 * Creates a Cosmos simple HD path in the form `m/7564153'/chain_index'/1'/a`
 * with a 0-based account index `a`.
 */
export function makeSimpleHdPath(chainIndex: number, a: number): HdPath {
  return makeCosmosPath(chainIndex, Slip10RawIndex.hardened(1), Slip10RawIndex.normal(a));
}

function printPath(path: HdPath) {
  console.log(pathToString(path) + ": " + path.map(component => toHex(component.toBytesBigEndian())).join(","));
}

console.log("Simple HD path for account 0, 1, 75_000_000 on the testing chain:");
for (let a of [0, 1, 75_000_000]) {
  printPath(makeSimpleHdPath(0, a));
}

console.log("Simple HD path for account 0 on the chains 0, 1, 42, 42_000_000:");
for (let chainIndex of [0, 1, 42, 42_000_000]) {
  printPath(makeSimpleHdPath(chainIndex, 0));
}

console.log("Cosmos path with all unhardened sub-trees of length 0, 1, 3 on the testing chain:");
printPath(makeCosmosPath(0));
printPath(makeCosmosPath(0, Slip10RawIndex.normal(7)));
printPath(makeCosmosPath(0, Slip10RawIndex.normal(7), Slip10RawIndex.normal(7), Slip10RawIndex.normal(7)));

console.log("Cosmos path with all hardened sub-trees of length 0, 1, 3 on the testing chain:");
printPath(makeCosmosPath(0));
printPath(makeCosmosPath(0, Slip10RawIndex.hardened(7)));
printPath(makeCosmosPath(0, Slip10RawIndex.hardened(7), Slip10RawIndex.hardened(7), Slip10RawIndex.hardened(7)));

console.log("Cosmos path with hardened/unhardened sub-tree on the testing chain:");
printPath(makeCosmosPath(0, Slip10RawIndex.hardened(2), Slip10RawIndex.normal(3), Slip10RawIndex.hardened(4)))

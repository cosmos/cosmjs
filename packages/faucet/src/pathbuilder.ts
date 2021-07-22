import { HdPath, stringToPath } from "@cosmjs/crypto";

export type PathBuilder = (account_index: number) => HdPath;

/**
 * Insert a BIP32 path that contains a valiable `a` for the numeric account index.
 * This variable will be replaces when the path builder is used.
 *
 * @param pattern, e.g. m/44'/148'/a' for Stellar paths
 */
export function makePathBuilder(pattern: string): PathBuilder {
  if (pattern.indexOf("a") === -1) throw new Error("Missing account index variable `a` in pattern.");
  if (pattern.indexOf("a") !== pattern.lastIndexOf("a")) {
    throw new Error("More than one account index variable `a` in pattern.");
  }

  const builder: PathBuilder = function (a: number): HdPath {
    const path = pattern.replace("a", a.toString());
    return stringToPath(path);
  };

  // test builder
  const _path = builder(0);

  return builder;
}

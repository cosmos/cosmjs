import { toAscii } from "@cosmjs/encoding";
import { sleep } from "@cosmjs/utils";

export const nonNegativeIntegerMatcher = /^[0-9]+$/;
export const anyMatcher = /^.*$/; // Any string, including empty. Does not do more than a type check.

export interface ExpectedValues {
  /** The Tendermint version as reported by Tendermint itself */
  readonly version: RegExp;
  readonly chainId: RegExp;
  readonly appCreator: string;
  readonly p2pVersion: number;
  readonly blockVersion: number;
  readonly appVersion: number;
  /** Affected by https://github.com/cometbft/cometbft/issues/5219 */
  readonly bug5219: boolean;
}

export interface TendermintInstance {
  /** URL without protocol. Protocol will be added in tests. */
  readonly url: string;
  readonly version: string;
  /** rough block time in ms */
  readonly blockTime: number;
  /** Values we expect in the backend */
  readonly expected: ExpectedValues;
}

/**
 * Tendermint instances to be tested.
 *
 * Testing different versions: as a convention, the minor version number is encoded
 * in the port 111<version>, e.g. Tendermint 0.21.0 runs on port 11121. To start
 * a specific version use:
 *   TENDERMINT_VERSION=0.29.2 TENDERMINT_PORT=11129 ./scripts/tendermint/start.sh
 *
 * When more than 1 instances of tendermint are running, stop them manually:
 *   docker container ls | grep tendermint/tendermint
 *   docker container kill <container id from 1st column>
 */
export const tendermintInstances: Record<number, TendermintInstance> = {
  34: {
    url: "localhost:11134",
    version: "0.34.x",
    blockTime: 500,
    expected: {
      chainId: /^[-a-zA-Z0-9]{3,30}$/,
      version: /^$/, // Unfortunately we don't get info here
      appCreator: "Cosmoshi Netowoko",
      p2pVersion: 8,
      blockVersion: 11,
      appVersion: 1,
      bug5219: false,
    },
  },
  37: {
    url: "localhost:11137",
    version: "0.37.x",
    blockTime: 500,
    expected: {
      chainId: /^dockerchain$/,
      version: /^0\.37\.0-alpha\.3$/,
      appCreator: "Cosmoshi Netowoko",
      p2pVersion: 8,
      blockVersion: 11,
      appVersion: 1,
      bug5219: false,
    },
  },
  38: {
    url: "localhost:11138",
    version: "0.38.x",
    blockTime: 500,
    expected: {
      chainId: /^dockerchain$/,
      version: /^0\.38\.0$/,
      appCreator: "Cosmoshi Netowoko",
      p2pVersion: 8,
      blockVersion: 11,
      appVersion: 1,
      bug5219: false,
    },
  },
  1: {
    url: "localhost:11101",
    version: "1.x.y",
    blockTime: 500,
    expected: {
      chainId: /^dockerchain$/,
      version: /^1\.\d+\.\d+$/,
      appCreator: "Cosmoshi Netowoko",
      p2pVersion: 9,
      blockVersion: 11,
      appVersion: 1,
      bug5219: true,
    },
  },
};

export const defaultInstance: TendermintInstance = tendermintInstances[34];

export const tendermintEnabled: boolean = !!globalThis.process?.env.TENDERMINT_ENABLED;

export async function tendermintSearchIndexUpdated(): Promise<void> {
  // Tendermint needs some time before a committed transaction is found in search
  return sleep(75);
}

export function buildKvTx(k: string, v: string): Uint8Array {
  return toAscii(`${k}=${v}`);
}

export function randomString(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 12 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join("");
}

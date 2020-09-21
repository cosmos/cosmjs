export interface ExpectedValues {
  readonly appCreator: string;
  readonly p2pVersion: number;
  readonly blockVersion: number;
  readonly appVersion: number;
}

export interface TendermintInstance {
  readonly url: string;
  readonly version: string;
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
export const tendermintInstances: readonly TendermintInstance[] = [
  {
    url: "localhost:11133",
    version: "0.33.x",
    expected: {
      appCreator: "Cosmoshi Netowoko",
      p2pVersion: 7,
      blockVersion: 10,
      appVersion: 1,
    },
  },
  {
    url: "localhost:11134",
    version: "0.34.x",
    expected: {
      appCreator: "Cosmoshi Netowoko",
      p2pVersion: 8,
      blockVersion: 11,
      appVersion: 1,
    },
  },
];

export const defaultInstance: TendermintInstance = tendermintInstances[0];

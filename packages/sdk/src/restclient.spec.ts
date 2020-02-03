/* eslint-disable @typescript-eslint/camelcase */
import { Encoding } from "@iov/encoding";

import { RestClient } from "./restclient";
import data from "./testdata/cosmoshub.json";
import { StdTx } from "./types";

const { fromBase64 } = Encoding;

const httpUrl = "http://localhost:1317";
const defaultNetworkId = "testing";
function pendingWithoutCosmos(): void {
  if (!process.env.COSMOS_ENABLED) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
}

describe("RestClient", () => {
  it("can be constructed", () => {
    const client = new RestClient(httpUrl);
    expect(client).toBeTruthy();
  });

  describe("nodeInfo", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = new RestClient(httpUrl);
      const info = await client.nodeInfo();
      expect(info.node_info.network).toEqual(defaultNetworkId);
    });
  });

  describe("encodeTx", () => {
    it("works for cosmoshub example", async () => {
      pendingWithoutCosmos();
      const tx: StdTx = data.tx.value;
      const client = new RestClient(httpUrl);
      expect(await client.encodeTx(tx)).toEqual(fromBase64(data.tx_data));
    });
  });
});

import {
  connectComet,
  isComet1Client,
  isComet38Client,
  isTendermint34Client,
  isTendermint37Client,
} from "./tendermintclient";
import { tendermintEnabled, tendermintInstances } from "./testutil.spec";

(tendermintEnabled ? describe : xdescribe)("connectComet", () => {
  it("works for Tendermint 0.34", async () => {
    const client = await connectComet("http://" + tendermintInstances[34].url);
    expect(isTendermint34Client(client)).toEqual(true);
    client.disconnect();
  });

  it("works for Tendermint 0.37", async () => {
    const client = await connectComet("http://" + tendermintInstances[37].url);
    expect(isTendermint37Client(client)).toEqual(true);
    client.disconnect();
  });

  it("works for CometBFT 0.38", async () => {
    const client = await connectComet("http://" + tendermintInstances[38].url);
    expect(isComet38Client(client)).toEqual(true);
    client.disconnect();
  });

  it("works for CometBFT 1.x", async () => {
    const client = await connectComet("http://" + tendermintInstances[1].url);
    expect(isComet1Client(client)).toEqual(true);
    client.disconnect();
  });
});

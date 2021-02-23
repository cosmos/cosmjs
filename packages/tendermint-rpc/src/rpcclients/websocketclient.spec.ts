import { Uint53 } from "@cosmjs/math";
import { toListPromise } from "@cosmjs/stream";
import { Stream } from "xstream";

import { createJsonRpcRequest } from "../jsonrpc";
import { defaultInstance } from "../testutil.spec";
import { SubscriptionEvent } from "./rpcclient";
import { WebsocketClient } from "./websocketclient";

function pendingWithoutTendermint(): void {
  if (!process.env.TENDERMINT_ENABLED) {
    pending("Set TENDERMINT_ENABLED to enable tendermint rpc tests");
  }
}

describe("WebsocketClient", () => {
  const { blockTime, url: tendermintUrl } = defaultInstance;

  it("can make a simple call", async () => {
    pendingWithoutTendermint();

    const client = new WebsocketClient(tendermintUrl);

    const healthResponse = await client.execute(createJsonRpcRequest("health"));
    expect(healthResponse.result).toEqual({});

    const statusResponse = await client.execute(createJsonRpcRequest("status"));
    expect(statusResponse.result).toBeTruthy();
    expect(statusResponse.result.node_info).toBeTruthy();

    await client
      .execute(createJsonRpcRequest("no-such-method"))
      .then(() => fail("must not resolve"))
      .catch((error) => expect(error).toBeTruthy());

    client.disconnect();
  });

  it("can listen to events", (done) => {
    pendingWithoutTendermint();

    const client = new WebsocketClient(tendermintUrl);

    const query = "tm.event='NewBlockHeader'";
    const req = createJsonRpcRequest("subscribe", { query: query });
    const headers = client.listen(req);

    const events: SubscriptionEvent[] = [];

    const subscription = headers.subscribe({
      error: done.fail,
      complete: () => done.fail("subscription should not complete"),
      next: (event: SubscriptionEvent) => {
        events.push(event);
        expect(event.query).toEqual(query);

        if (events.length === 2) {
          // make sure they are consecutive heights
          const eventHeight = (index: number): number =>
            Uint53.fromString(events[index].data.value.header.height).toNumber();
          expect(eventHeight(1)).toEqual(eventHeight(0) + 1);

          subscription.unsubscribe();

          // wait 1.5 * blockTime and check we did not get more events
          setTimeout(() => {
            expect(events.length).toEqual(2);

            client.disconnect();
            done();
          }, 1.5 * blockTime);
        }
      },
    });
  });

  it("can listen to the same query twice", async () => {
    pendingWithoutTendermint();

    const client = new WebsocketClient(tendermintUrl);

    const newBlockHeaderQuery = "tm.event='NewBlockHeader'";

    // we need two requests with unique IDs
    const request1 = createJsonRpcRequest("subscribe", { query: newBlockHeaderQuery });
    const request2 = createJsonRpcRequest("subscribe", { query: newBlockHeaderQuery });
    const stream1 = client.listen(request1);
    const stream2 = client.listen(request2);

    const eventHeights = await toListPromise(
      Stream.merge(stream1, stream2).map((event) => {
        // height is string or number, depending on Tendermint version. But we don't care in this case
        return event.data.value.header.height;
      }),
      4,
    );
    expect(new Set(eventHeights).size).toEqual(2);

    client.disconnect();
  });

  it("can execute commands while listening to events", (done) => {
    pendingWithoutTendermint();

    const client = new WebsocketClient(tendermintUrl);

    const query = "tm.event='NewBlockHeader'";
    const req = createJsonRpcRequest("subscribe", { query: query });
    const headers = client.listen(req);

    const events: SubscriptionEvent[] = [];

    const subscription = headers.subscribe({
      error: done.fail,
      complete: () => done.fail("subscription should not complete"),
      next: (event: SubscriptionEvent) => {
        events.push(event);
        expect(event.query).toEqual(query);

        if (events.length === 2) {
          subscription.unsubscribe();

          // wait 1.5 * blockTime and check we did not get more events
          setTimeout(() => {
            expect(events.length).toEqual(2);

            client.disconnect();
            done();
          }, 1.5 * blockTime);
        }
      },
    });

    client
      .execute(createJsonRpcRequest("status"))
      .then((startusResponse) => expect(startusResponse).toBeTruthy())
      .catch(done.fail);
  });

  it("can end event listening by disconnecting", (done) => {
    pendingWithoutTendermint();

    const client = new WebsocketClient(tendermintUrl);

    const query = "tm.event='NewBlockHeader'";
    const req = createJsonRpcRequest("subscribe", { query: query });
    const headers = client.listen(req);

    const receivedEvents: SubscriptionEvent[] = [];

    setTimeout(() => client.disconnect(), blockTime);

    headers.subscribe({
      error: done.fail,
      next: (event: SubscriptionEvent) => receivedEvents.push(event),
      complete: () => {
        expect(receivedEvents.length).toEqual(1);
        done();
      },
    });
  });

  it("fails when executing on a disconnected client", async () => {
    pendingWithoutTendermint();

    const client = new WebsocketClient(tendermintUrl);
    // dummy command to ensure client is connected
    await client.execute(createJsonRpcRequest("health"));

    client.disconnect();

    await client
      .execute(createJsonRpcRequest("health"))
      .then(() => fail("must not resolve"))
      .catch((error) => expect(error).toMatch(/socket has disconnected/i));
  });

  it("fails when listening to a disconnected client", (done) => {
    pendingWithoutTendermint();

    // async and done does not work together with pending() in Jasmine 2.8
    (async () => {
      const client = new WebsocketClient(tendermintUrl);
      // dummy command to ensure client is connected
      await client.execute(createJsonRpcRequest("health"));

      client.disconnect();

      const query = "tm.event='NewBlockHeader'";
      const req = createJsonRpcRequest("subscribe", { query: query });
      expect(() => client.listen(req).subscribe({})).toThrowError(/socket has disconnected/i);
      done();
    })().catch(done.fail);
  });

  it("cannot listen to simple requests", async () => {
    pendingWithoutTendermint();

    const client = new WebsocketClient(tendermintUrl);

    const req = createJsonRpcRequest("health");
    expect(() => client.listen(req)).toThrowError(/request method must be "subscribe"/i);

    await client.connected();
    client.disconnect();
  });
});

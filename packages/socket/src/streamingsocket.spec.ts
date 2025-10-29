import { toListPromise } from "@cosmjs/stream";

import { StreamingSocket } from "./streamingsocket";

const enabled = !!globalThis.process?.env.SOCKETSERVER_ENABLED;

(enabled ? describe : describe.skip)("StreamingSocket", () => {
  const socketServerUrl = "ws://localhost:4444/websocket";
  const socketServerUrlSlow = "ws://localhost:4445/websocket";

  it("can be constructed", () => {
    const socket = new StreamingSocket(socketServerUrl);
    expect(socket).toBeTruthy();
  });

  it("can connect", async () => {
    const socket = new StreamingSocket(socketServerUrl);
    expect(socket).toBeTruthy();
    socket.connect();
    await socket.connected;
    socket.disconnect();
  });

  it("can connect to slow server", async () => {
    const socket = new StreamingSocket(socketServerUrlSlow);
    expect(socket).toBeTruthy();
    socket.connect();
    await socket.connected;
    socket.disconnect();
  }, 8000);

  it("times out when establishing connection takes too long", async () => {
    const socket = new StreamingSocket(socketServerUrlSlow, 2_000);
    socket.connect();

    await expect(socket.connected).rejects.toThrowError(/connection attempt timed out/i);
  });

  it("can send events when connected", async () => {
    const socket = new StreamingSocket(socketServerUrl);

    const responsePromise = toListPromise(socket.events, 3);

    socket.connect();
    await socket.connected;

    await socket.send("aabbccdd");
    await socket.send("whatever");
    await socket.send("lalala");

    const response = await responsePromise;
    expect(response.length).toEqual(3);

    socket.disconnect();
  });

  it("completes stream when disconnected", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    const socket = new StreamingSocket(socketServerUrl);
    expect(socket).toBeTruthy();
    const subscription = socket.events.subscribe({
      complete: () => {
        subscription.unsubscribe();
        done();
      },
    });

    (async () => {
      socket.connect();
      await socket.connected;
      await socket.send("aabbccdd");
      await socket.send("whatever");
      await socket.send("lalala");
      socket.disconnect();
    })().catch(done.fail);

    return ret;
  });
});

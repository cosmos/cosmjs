import { SocketWrapper } from "./socketwrapper";

const enabled = !!globalThis.process?.env.SOCKETSERVER_ENABLED;

(enabled ? describe : describe.skip)("SocketWrapper", () => {
  const socketServerUrlNonExisting = "ws://localhost:4443/websocket";
  const socketServerUrl = "ws://localhost:4444/websocket";
  const socketServerUrlSlow = "ws://localhost:4445/websocket";

  it("can be constructed", () => {
    const socket = new SocketWrapper(
      socketServerUrl,
      () => {},
      () => {},
    );
    expect(socket).toBeTruthy();
  });

  it("can connect", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    const socket = new SocketWrapper(
      socketServerUrl,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      () => {
        socket.disconnect();
        done();
      },
    );
    expect(socket).toBeTruthy();
    socket.connect();

    return ret;
  });

  it("fails to connect to non-existing server", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    const socket = new SocketWrapper(
      socketServerUrlNonExisting,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        if (error.message) {
          // error message only available in nodejs
          expect(error.message).toMatch(/ECONNREFUSED/i);
        }
        done();
      },
      () => {
        done.fail("Got unexpected open event");
      },
    );
    expect(socket).toBeTruthy();
    socket.connect();

    return ret;
  });

  it("fails to connect to non-existing server but timeout is not triggered", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const timeout = 1200; // ms

    const socket = new SocketWrapper(
      socketServerUrlNonExisting,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        expect(error).toBeTruthy();

        // All done. Delay test end to ensure the timeout is not triggered
        setTimeout(done, timeout * 1.3);
      },
      () => {
        done.fail("Got unexpected open event");
      },
      () => 0,
      timeout,
    );
    expect(socket).toBeTruthy();
    socket.connect();

    return ret;
  });

  it("can connect to slow server", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    const socket = new SocketWrapper(
      socketServerUrlSlow,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      () => {
        socket.disconnect();
        done();
      },
    );
    expect(socket).toBeTruthy();
    socket.connect();

    return ret;
  }, 6000);

  it("times out when establishing connection takes too long", async () => {
    const socket = new SocketWrapper(
      socketServerUrlSlow,
      () => {
        throw new Error("Got unexpected message event");
      },
      (error) => {
        throw new Error(error.message || "Unknown socket error");
      },
      () => {
        throw new Error("Got unexpected opened event");
      },
      () => {
        throw new Error("Got unexpected closed event");
      },
      2_000,
    );
    socket.connect();

    await expect(socket.connected).rejects.toThrowError(/connection attempt timed out/i);
  });

  it("can connect and disconnect", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    let opened = 0;

    const socket = new SocketWrapper(
      socketServerUrl,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      () => {
        opened += 1;
        socket.disconnect();
      },
      (closeEvent) => {
        expect(closeEvent.wasClean).toEqual(true);
        expect(closeEvent.code).toEqual(1000 /* Normal Closure */);

        expect(opened).toEqual(1);
        done();
      },
    );
    socket.connect();

    return ret;
  });

  it("can disconnect before waiting for open", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    const socket = new SocketWrapper(
      socketServerUrl,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      () => {
        done.fail("Got unexpected open event");
      },
      (closeEvent) => {
        expect(closeEvent.wasClean).toEqual(false);
        expect(closeEvent.code).toEqual(4001);
        done();
      },
    );
    socket.connect();
    socket.disconnect();

    return ret;
  });

  it("can disconnect before waiting for open and timeout will not be triggered", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const timeout = 500; // ms

    const socket = new SocketWrapper(
      socketServerUrl,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      () => {
        done.fail("Got unexpected open event");
      },
      (closeEvent) => {
        expect(closeEvent.wasClean).toEqual(false);
        expect(closeEvent.code).toEqual(4001);

        // All done. Delay test end to ensure the timeout is not triggered
        setTimeout(done, timeout * 1.3);
      },
      timeout,
    );
    socket.connect();
    socket.disconnect();

    return ret;
  });

  it("can send events when connected", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    const responseMessages = new Array<string>();

    const socket = new SocketWrapper(
      socketServerUrl,
      (response) => {
        expect(response.type).toEqual("message");
        responseMessages.push(response.data);

        if (responseMessages.length === 3) {
          socket.disconnect();
        }
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      async () => {
        await socket.send("aabbccdd");
        await socket.send("whatever");
        await socket.send("lalala");
      },
      () => {
        expect(responseMessages.length).toEqual(3);
        done();
      },
    );
    socket.connect();

    return ret;
  });

  it("can send events after timeout period", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    // The "timeout period" is the period in which a timeout could potentially be triggered

    const timeoutPeriodLength = 1_500;

    const socket = new SocketWrapper(
      socketServerUrl,
      (response) => {
        expect(response.type).toEqual("message");
        expect(response.data).toEqual("Hello world");
        socket.disconnect();
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      undefined,
      () => {
        done();
      },
      timeoutPeriodLength,
    );
    socket.connect();

    setTimeout(() => socket.send("Hello world"), 2 * timeoutPeriodLength);

    return ret;
  });

  it("cannot send on a disconnect socket (it will never come back)", async () => {
    let done!: ((p?: void | PromiseLike<void>) => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });

    const socket = new SocketWrapper(
      socketServerUrl,
      () => {
        done.fail("Got unexpected message event");
      },
      (error) => {
        done.fail(error.message || "Unknown socket error");
      },
      () => {
        socket.disconnect();
      },
      () => {
        done(expect(socket.send("la li lu")).rejects.toThrowError(/socket was closed/i));
      },
    );
    socket.connect();

    return ret;
  });
});

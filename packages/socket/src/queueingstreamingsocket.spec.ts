import { ConnectionStatus, QueueingStreamingSocket } from "./queueingstreamingsocket";

const enabled = !!globalThis.process?.env.SOCKETSERVER_ENABLED;

describe("QueueingStreamingSocket", () => {
  const socketServerUrl = "ws://localhost:4444/websocket";

  it("can be constructed", () => {
    const socket = new QueueingStreamingSocket(socketServerUrl);
    expect(socket).toBeTruthy();
  });

  (enabled ? describe : describe.skip)("queueRequest", () => {
    it("can queue and process requests with a connection", async () => {
      let done!: (() => void) & { fail: (e?: any) => void };
      const ret = new Promise<void>((resolve, reject) => {
        done = resolve as typeof done;
        done.fail = reject;
      });
      const socket = new QueueingStreamingSocket(socketServerUrl);
      const requests = ["request 1", "request 2", "request 3"] as const;
      let eventsSeen = 0;
      socket.events.subscribe({
        next: (event) => {
          expect(event.data).toEqual(requests[eventsSeen++]);
          if (eventsSeen === requests.length) {
            expect(socket.getQueueLength()).toEqual(0);
            socket.disconnect();
            done();
          }
        },
      });

      socket.connect();
      requests.forEach((request) => {
        socket.queueRequest(request);
      });

      return ret;
    });

    it("can queue requests without a connection and process them later", async () => {
      let done!: (() => void) & { fail: (e?: any) => void };
      const ret = new Promise<void>((resolve, reject) => {
        done = resolve as typeof done;
        done.fail = reject;
      });
      const socket = new QueueingStreamingSocket(socketServerUrl);
      const requests = ["request 1", "request 2", "request 3"] as const;
      let eventsSeen = 0;
      socket.events.subscribe({
        next: (event) => {
          expect(event.data).toEqual(requests[eventsSeen++]);
          if (eventsSeen === requests.length) {
            expect(socket.getQueueLength()).toEqual(0);
            socket.disconnect();
            done();
          }
        },
      });

      requests.forEach((request) => {
        socket.queueRequest(request);
      });
      setTimeout(() => {
        expect(socket.getQueueLength()).toEqual(3);
        socket.connect();
      }, 3_000);

      return ret;
    });
  });

  (enabled ? describe : describe.skip)("reconnect", () => {
    it("does not emit a completed event when disconnected", async () => {
      let done!: (() => void) & { fail: (e?: any) => void };
      const ret = new Promise<void>((resolve, reject) => {
        done = resolve as typeof done;
        done.fail = reject;
      });
      const request = "request";
      const socket = new QueueingStreamingSocket(socketServerUrl);
      socket.events.subscribe({
        next: ({ data }) => {
          if (data === request) {
            socket.disconnect();
            done();
          }
        },
        complete: () => {
          done.fail("Stream completed");
        },
      });

      socket.connect();
      socket.disconnect();
      socket.reconnect();
      socket.queueRequest(request);

      return ret;
    });

    it("can reconnect and process remaining queue", async () => {
      let done!: (() => void) & { fail: (e?: any) => void };
      const ret = new Promise<void>((resolve, reject) => {
        done = resolve as typeof done;
        done.fail = reject;
      });
      const socket = new QueueingStreamingSocket(socketServerUrl);
      const requests = ["request 1", "request 2", "request 3"] as const;
      let eventsSeen = 0;

      socket.connect();
      socket.disconnect();

      requests.forEach((request) => {
        socket.queueRequest(request);
      });

      socket.events.subscribe({
        next: (event) => {
          expect(event.data).toEqual(requests[eventsSeen++]);
          if (eventsSeen === requests.length) {
            expect(socket.getQueueLength()).toEqual(0);
            socket.disconnect();
            done();
          }
        },
      });
      socket.reconnect();

      return ret;
    });

    it("notifies on reconnection via a callback", async () => {
      let done!: (() => void) & { fail: (e?: any) => void };
      const ret = new Promise<void>((resolve, reject) => {
        done = resolve as typeof done;
        done.fail = reject;
      });
      const socket = new QueueingStreamingSocket(socketServerUrl, undefined, done);

      socket.reconnect();

      return ret;
    });
  });

  (enabled ? describe : describe.skip)("connectionStatus", () => {
    it("exposes connection status", async () => {
      let done!: (() => void) & { fail: (e?: any) => void };
      const ret = new Promise<void>((resolve, reject) => {
        done = resolve as typeof done;
        done.fail = reject;
      });
      const socket = new QueueingStreamingSocket(socketServerUrl);
      let statusChangesSeen = 0;
      socket.connectionStatus.updates.subscribe({
        next: (status) => {
          switch (statusChangesSeen++) {
            case 0:
              expect(status).toEqual(ConnectionStatus.Unconnected);
              break;
            case 1:
            case 4:
              expect(status).toEqual(ConnectionStatus.Connecting);
              break;
            case 2:
            case 5:
              expect(status).toEqual(ConnectionStatus.Connected);
              break;
            case 3:
            case 6:
              expect(status).toEqual(ConnectionStatus.Disconnected);
              break;
            default:
              done.fail("Got too many status changes");
          }
          if (statusChangesSeen === 7) {
            done();
          }
        },
      });

      socket.connect();
      setTimeout(() => {
        socket.disconnect();
        socket.reconnect();
        setTimeout(() => {
          socket.disconnect();
        }, 1000);
      }, 1000);

      return ret;
    });
  });
});

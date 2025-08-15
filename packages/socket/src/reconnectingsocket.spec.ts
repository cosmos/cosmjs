import { ReconnectingSocket } from "./reconnectingsocket";

/** @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback */
type Exec = (command: string, callback: (error: null | (Error & { readonly code?: number })) => void) => void;

const getExec = async (): Promise<Exec | undefined> => (await import("child_process")).exec;

function pendingWithoutSocketServer(): void {
  if (!process.env.SOCKETSERVER_ENABLED) {
    pending("Set SOCKETSERVER_ENABLED to enable socket tests");
  }
}

describe("ReconnectingSocket", () => {
  const socketServerUrl = "ws://localhost:4444/websocket";

  it("can be constructed", () => {
    const socket = new ReconnectingSocket(socketServerUrl);
    expect(socket).toBeTruthy();
  });

  describe("connect", () => {
    it("cannot connect after being connected", (done) => {
      pendingWithoutSocketServer();
      const socket = new ReconnectingSocket(socketServerUrl);
      // Necessary otherwise the producer doesn’t start
      socket.events.subscribe({});

      socket.connect();

      setTimeout(() => {
        expect(() => {
          socket.connect();
        }).toThrowError(/cannot connect/i);
        done();
      }, 1000);
    });
  });

  describe("disconnect", () => {
    it("ends the events stream", (done) => {
      pendingWithoutSocketServer();
      const socket = new ReconnectingSocket(socketServerUrl);
      socket.events.subscribe({
        complete: done,
      });

      socket.connect();

      setTimeout(() => {
        socket.disconnect();
      }, 1000);
    });

    it("cannot connect after being disconnected", (done) => {
      pendingWithoutSocketServer();
      const socket = new ReconnectingSocket(socketServerUrl);
      // Necessary otherwise the producer doesn’t start
      socket.events.subscribe({});

      socket.connect();

      setTimeout(() => {
        socket.disconnect();
        expect(() => {
          socket.connect();
        }).toThrowError(/cannot connect/i);
        done();
      }, 1000);
    });

    it("can disconnect without waiting for open", () => {
      pendingWithoutSocketServer();
      const socket = new ReconnectingSocket(socketServerUrl);
      expect(() => {
        socket.connect();
        socket.disconnect();
      }).not.toThrow();
    });
  });

  describe("reconnection", () => {
    const dirPath = "../../scripts/socketserver";
    const codePkillNoProcessesMatched = 1;
    const startServerCmd = `${dirPath}/start.sh`;
    const stopServerCmd = `${dirPath}/stop.sh`;

    it("automatically reconnects if no connection can be established at init", async () => {
      let pass!: () => void, fail!: (reason?: any) => void;
      const ret = new Promise<void>((resolve, reject) => {
        pass = resolve;
        fail = reject;
      });

      const exec = await getExec();
      if (exec === undefined) {
        pending("Run test in an environment which supports child processes to enable socket tests");
        return;
      }

      pendingWithoutSocketServer();

      exec(stopServerCmd, (stopError) => {
        if (stopError && stopError.code !== codePkillNoProcessesMatched) {
          fail(stopError);
        }

        const socket = new ReconnectingSocket(socketServerUrl);
        const requests = ["request 1", "request 2", "request 3"] as const;
        let eventsSeen = 0;
        socket.events.subscribe({
          next: ({ data }) => {
            expect(data).toEqual(requests[eventsSeen++]);
            if (eventsSeen === requests.length) {
              socket.disconnect();
            }
          },
          complete: () => {
            // Make sure we don't get a completion unexpectedly
            expect(eventsSeen).toEqual(requests.length);
            pass();
          },
        });

        socket.connect();
        requests.forEach((request) => {
          socket.queueRequest(request);
        });

        setTimeout(() => {
          exec(startServerCmd, (startError) => {
            if (startError) {
              fail(startError);
            }
          });
        }, 2000);
      });

      return ret;
    });

    it("automatically reconnects if the connection is broken off", async () => {
      let pass!: () => void, fail!: (reason?: any) => void;
      const ret = new Promise<void>((resolve, reject) => {
        pass = resolve;
        fail = reject;
      });

      const exec = await getExec();
      if (exec === undefined) {
        pending("Run test in an environment which supports child processes to enable socket tests");
        return;
      }

      pendingWithoutSocketServer();

      const socket = new ReconnectingSocket(socketServerUrl);
      const requests = ["request 1", "request 2", "request 3"] as const;
      let eventsSeen = 0;
      socket.events.subscribe({
        next: ({ data }) => {
          expect(data).toEqual(requests[eventsSeen++]);
          if (eventsSeen === requests.length) {
            socket.disconnect();
          }
        },
        complete: () => {
          // Make sure we don't get a completion unexpectedly
          expect(eventsSeen).toEqual(requests.length);
          pass();
        },
      });

      socket.connect();
      socket.queueRequest(requests[0]);

      setTimeout(() => {
        exec(stopServerCmd, (stopError) => {
          if (stopError && stopError.code !== codePkillNoProcessesMatched) {
            fail(stopError);
          }

          // TODO: This timeout is here to avoid an edge case where if a request
          // is sent just as a disconnection occurs, then the websocket’s `send`
          // method may not error even though the request is never sent.
          // Ideally we would have a way to cover this edge case and the timeout
          // would not be necessary for this test to pass.
          setTimeout(() => {
            requests.slice(1).forEach((request) => {
              socket.queueRequest(request);
            });

            setTimeout(() => {
              exec(startServerCmd, (startError) => {
                if (startError) {
                  fail(startError);
                }
              });
            }, 2000);
          }, 2000);
        });
      }, 1000);

      return ret;
    });
  });
});

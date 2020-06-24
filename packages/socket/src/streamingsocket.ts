import { Listener, Producer, Stream } from "xstream";

import { SocketWrapper, SocketWrapperMessageEvent } from "./socketwrapper";

/**
 * A WebSocket wrapper that exposes all events as a stream.
 *
 * This underlying socket will not be closed when the stream has no listeners
 */
export class StreamingSocket {
  public readonly connected: Promise<void>;
  public readonly events: Stream<SocketWrapperMessageEvent>;
  private eventProducerListener: Listener<SocketWrapperMessageEvent> | undefined;
  private readonly socket: SocketWrapper;

  public constructor(url: string, timeout = 10_000) {
    this.socket = new SocketWrapper(
      url,
      (event) => {
        if (this.eventProducerListener) {
          this.eventProducerListener.next(event);
        }
      },
      (errorEvent) => {
        if (this.eventProducerListener) {
          this.eventProducerListener.error(errorEvent);
        }
      },
      () => {
        // socket opened
      },
      (closeEvent) => {
        if (this.eventProducerListener) {
          if (closeEvent.wasClean) {
            this.eventProducerListener.complete();
          } else {
            this.eventProducerListener.error("Socket was closed unclean");
          }
        }
      },
      timeout,
    );
    this.connected = this.socket.connected;

    const eventProducer: Producer<any> = {
      start: (listener) => (this.eventProducerListener = listener),
      stop: () => (this.eventProducerListener = undefined),
    };
    this.events = Stream.create(eventProducer);
  }

  public connect(): void {
    this.socket.connect();
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public async send(data: string): Promise<void> {
    return this.socket.send(data);
  }
}

import { ValueAndUpdates } from "@cosmjs/stream";
import { Listener, Producer, Stream } from "xstream";

import { ConnectionStatus, QueueingStreamingSocket } from "./queueingstreamingsocket";
import { SocketWrapperMessageEvent } from "./socketwrapper";

/**
 * A wrapper around QueueingStreamingSocket that reconnects automatically.
 */
export class ReconnectingSocket {
  /** Starts with a 0.1 second timeout, then doubles every attempt with a maximum timeout of 5 seconds. */
  private static calculateTimeout(index: number): number {
    return Math.min(2 ** index * 100, 5_000);
  }

  public readonly connectionStatus: ValueAndUpdates<ConnectionStatus>;
  public readonly events: Stream<SocketWrapperMessageEvent>;

  private readonly socket: QueueingStreamingSocket;
  private eventProducerListener: Listener<SocketWrapperMessageEvent> | undefined;
  private unconnected = true;
  private disconnected = false;
  private timeoutIndex = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  public constructor(url: string, timeout = 10_000, reconnectedHandler?: () => void) {
    const eventProducer: Producer<any> = {
      start: (listener) => (this.eventProducerListener = listener),
      stop: () => (this.eventProducerListener = undefined),
    };
    this.events = Stream.create(eventProducer);

    this.socket = new QueueingStreamingSocket(url, timeout, reconnectedHandler);
    this.socket.events.subscribe({
      next: (event) => {
        if (this.eventProducerListener) {
          this.eventProducerListener.next(event);
        }
      },
      error: (error) => {
        if (this.eventProducerListener) {
          this.eventProducerListener.error(error);
        }
      },
    });

    this.connectionStatus = this.socket.connectionStatus;
    this.connectionStatus.updates.subscribe({
      next: (status) => {
        if (status === ConnectionStatus.Connected) {
          this.timeoutIndex = 0;
        }
        if (status === ConnectionStatus.Disconnected) {
          if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
          }
          this.reconnectTimeout = setTimeout(
            () => this.socket.reconnect(),
            ReconnectingSocket.calculateTimeout(this.timeoutIndex++),
          );
        }
      },
    });
  }

  public connect(): void {
    if (!this.unconnected) {
      throw new Error("Cannot connect: socket has already connected");
    }
    this.socket.connect();
    this.unconnected = false;
  }

  public disconnect(): void {
    if (this.unconnected) {
      throw new Error("Cannot disconnect: socket has not yet connected");
    }
    this.socket.disconnect();
    if (this.eventProducerListener) {
      this.eventProducerListener.complete();
    }
    this.disconnected = true;
  }

  public queueRequest(request: string): void {
    if (this.disconnected) {
      throw new Error("Cannot queue request: socket has disconnected");
    }
    this.socket.queueRequest(request);
  }
}

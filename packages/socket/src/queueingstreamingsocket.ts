import { DefaultValueProducer, ValueAndUpdates } from "@cosmjs/stream";
import { Listener, Producer, Stream } from "xstream";

import { SocketWrapperMessageEvent } from "./socketwrapper";
import { StreamingSocket } from "./streamingsocket";

export enum ConnectionStatus {
  Unconnected,
  Connecting,
  Connected,
  Disconnected,
}

/**
 * A wrapper around StreamingSocket that can queue requests.
 */
export class QueueingStreamingSocket {
  public readonly connectionStatus: ValueAndUpdates<ConnectionStatus>;
  public readonly events: Stream<SocketWrapperMessageEvent>;

  private readonly url: string;
  private readonly timeout: number;
  private readonly queue: string[] = [];
  private socket: StreamingSocket;
  private isProcessingQueue = false;
  private eventProducerListener: Listener<SocketWrapperMessageEvent> | undefined;
  private readonly connectionStatusProducer: DefaultValueProducer<ConnectionStatus>;
  private readonly reconnectedHandler?: () => void;

  public constructor(url: string, timeout = 10_000, reconnectedHandler?: () => void) {
    this.url = url;
    this.timeout = timeout;
    this.reconnectedHandler = reconnectedHandler;

    const eventProducer: Producer<any> = {
      start: (listener) => (this.eventProducerListener = listener),
      stop: () => (this.eventProducerListener = undefined),
    };
    this.events = Stream.create(eventProducer);
    this.connectionStatusProducer = new DefaultValueProducer<ConnectionStatus>(ConnectionStatus.Unconnected);
    this.connectionStatus = new ValueAndUpdates(this.connectionStatusProducer);

    this.socket = new StreamingSocket(this.url, this.timeout);
    this.socket.events.subscribe({
      next: (event) => {
        if (!this.eventProducerListener) throw new Error("No event producer listener set");
        this.eventProducerListener.next(event);
      },
      error: () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
    });
  }

  public connect(): void {
    this.connectionStatusProducer.update(ConnectionStatus.Connecting);
    this.socket.connected.then(
      async () => {
        this.connectionStatusProducer.update(ConnectionStatus.Connected);
        return this.processQueue();
      },
      () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
    );
    this.socket.connect();
  }

  public disconnect(): void {
    this.connectionStatusProducer.update(ConnectionStatus.Disconnected);
    this.socket.disconnect();
  }

  public reconnect(): void {
    this.socket = new StreamingSocket(this.url, this.timeout);
    this.socket.events.subscribe({
      next: (event) => {
        if (!this.eventProducerListener) throw new Error("No event producer listener set");
        this.eventProducerListener.next(event);
      },
      error: () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.socket.connected.then(() => {
      if (this.reconnectedHandler) {
        this.reconnectedHandler();
      }
    });
    this.connect();
  }

  public getQueueLength(): number {
    return this.queue.length;
  }

  public queueRequest(request: string): void {
    this.queue.push(request);
    // We don’t need to wait for the queue to be processed.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.connectionStatus.value !== ConnectionStatus.Connected) {
      return;
    }
    this.isProcessingQueue = true;

    let request: string | undefined;
    while ((request = this.queue.shift())) {
      try {
        await this.socket.send(request);
        this.isProcessingQueue = false;
      } catch (error) {
        // Probably the connection is down; will try again automatically when reconnected.
        this.queue.unshift(request);
        this.isProcessingQueue = false;
        return;
      }
    }
  }
}

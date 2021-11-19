import {
  isJsonRpcErrorResponse,
  JsonRpcId,
  JsonRpcRequest,
  JsonRpcResponse,
  JsonRpcSuccessResponse,
  parseJsonRpcResponse,
} from "@cosmjs/json-rpc";
import { ConnectionStatus, ReconnectingSocket, SocketWrapperMessageEvent } from "@cosmjs/socket";
import { firstEvent } from "@cosmjs/stream";
import { Listener, Producer, Stream, Subscription } from "xstream";

import { hasProtocol, RpcStreamingClient, SubscriptionEvent } from "./rpcclient";

function defaultErrorHandler(error: any): never {
  throw error;
}

function toJsonRpcResponse(message: SocketWrapperMessageEvent): JsonRpcResponse {
  // this should never happen, but I want an alert if it does
  if (message.type !== "message") {
    throw new Error(`Unexcepted message type on websocket: ${message.type}`);
  }

  const jsonRpcEvent = parseJsonRpcResponse(JSON.parse(message.data));
  return jsonRpcEvent;
}

class RpcEventProducer implements Producer<SubscriptionEvent> {
  private readonly request: JsonRpcRequest;
  private readonly socket: ReconnectingSocket;

  private running = false;
  private subscriptions: Subscription[] = [];

  public constructor(request: JsonRpcRequest, socket: ReconnectingSocket) {
    this.request = request;
    this.socket = socket;
  }

  /**
   * Implementation of Producer.start
   */
  public start(listener: Listener<SubscriptionEvent>): void {
    if (this.running) {
      throw Error("Already started. Please stop first before restarting.");
    }
    this.running = true;

    this.connectToClient(listener);

    this.socket.queueRequest(JSON.stringify(this.request));
  }

  /**
   * Implementation of Producer.stop
   *
   * Called by the stream when the stream's last listener stopped listening
   * or when the producer completed.
   */
  public stop(): void {
    this.running = false;
    // Tell the server we are done in order to save resources. We cannot wait for the result.
    // This may fail when socket connection is not open, thus ignore errors in queueRequest
    const endRequest: JsonRpcRequest = { ...this.request, method: "unsubscribe" };
    try {
      this.socket.queueRequest(JSON.stringify(endRequest));
    } catch (error) {
      if (error instanceof Error && error.message.match(/socket has disconnected/i)) {
        // ignore
      } else {
        throw error;
      }
    }
  }

  protected connectToClient(listener: Listener<SubscriptionEvent>): void {
    const responseStream = this.socket.events.map(toJsonRpcResponse);

    // this should unsubscribe itself, so doesn't need to be removed explicitly
    const idSubscription = responseStream
      .filter((response) => response.id === this.request.id)
      .subscribe({
        next: (response) => {
          if (isJsonRpcErrorResponse(response)) {
            this.closeSubscriptions();
            listener.error(JSON.stringify(response.error));
          }
          idSubscription.unsubscribe();
        },
      });

    // this will fire on a response (success or error)
    // Tendermint adds an "#event" suffix for events that follow a previous subscription
    // https://github.com/tendermint/tendermint/blob/v0.23.0/rpc/core/events.go#L107
    const idEventSubscription = responseStream
      .filter((response) => response.id === this.request.id)
      .subscribe({
        next: (response) => {
          if (isJsonRpcErrorResponse(response)) {
            this.closeSubscriptions();
            listener.error(JSON.stringify(response.error));
          } else {
            listener.next(response.result as SubscriptionEvent);
          }
        },
      });

    // this will fire in case the websocket disconnects cleanly
    const nonResponseSubscription = responseStream.subscribe({
      error: (error) => {
        this.closeSubscriptions();
        listener.error(error);
      },
      complete: () => {
        this.closeSubscriptions();
        listener.complete();
      },
    });

    this.subscriptions.push(idSubscription, idEventSubscription, nonResponseSubscription);
  }

  protected closeSubscriptions(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    // clear unused subscriptions
    this.subscriptions = [];
  }
}

export class WebsocketClient implements RpcStreamingClient {
  private readonly url: string;
  private readonly socket: ReconnectingSocket;
  /** Same events as in socket.events but in the format we need */
  private readonly jsonRpcResponseStream: Stream<JsonRpcResponse>;

  // Lazily create streams and use the same stream when listening to the same query twice.
  //
  // Creating streams is cheap since producer is not started as long as nobody listens to events. Thus this
  // map is never cleared and there is no need to do so. But unsubscribe all the subscriptions!
  private readonly subscriptionStreams = new Map<string, Stream<SubscriptionEvent>>();

  public constructor(baseUrl: string, onError: (err: any) => void = defaultErrorHandler) {
    // accept host.name:port and assume ws protocol
    // make sure we don't end up with ...//websocket
    const path = baseUrl.endsWith("/") ? "websocket" : "/websocket";
    const cleanBaseUrl = hasProtocol(baseUrl) ? baseUrl : "ws://" + baseUrl;
    this.url = cleanBaseUrl + path;

    this.socket = new ReconnectingSocket(this.url);

    const errorSubscription = this.socket.events.subscribe({
      error: (error) => {
        onError(error);
        errorSubscription.unsubscribe();
      },
    });

    this.jsonRpcResponseStream = this.socket.events.map(toJsonRpcResponse);

    this.socket.connect();
  }

  public async execute(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse> {
    const pendingResponse = this.responseForRequestId(request.id);
    this.socket.queueRequest(JSON.stringify(request));

    const response = await pendingResponse;
    if (isJsonRpcErrorResponse(response)) {
      throw new Error(JSON.stringify(response.error));
    }
    return response;
  }

  public listen(request: JsonRpcRequest): Stream<SubscriptionEvent> {
    if (request.method !== "subscribe") {
      throw new Error(`Request method must be "subscribe" to start event listening`);
    }

    const query = (request.params as any).query;
    if (typeof query !== "string") {
      throw new Error("request.params.query must be a string");
    }

    if (!this.subscriptionStreams.has(query)) {
      const producer = new RpcEventProducer(request, this.socket);
      const stream = Stream.create(producer);
      this.subscriptionStreams.set(query, stream);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.subscriptionStreams.get(query)!.filter((response) => response.query !== undefined);
  }

  /**
   * Resolves as soon as websocket is connected. execute() queues requests automatically,
   * so this should be required for testing purposes only.
   */
  public async connected(): Promise<void> {
    await this.socket.connectionStatus.waitFor(ConnectionStatus.Connected);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  protected async responseForRequestId(id: JsonRpcId): Promise<JsonRpcResponse> {
    return firstEvent(this.jsonRpcResponseStream.filter((r) => r.id === id));
  }
}

import {
  isJsonRpcErrorResponse,
  JsonRpcRequest,
  JsonRpcSuccessResponse,
  parseJsonRpcResponse,
} from "@cosmjs/json-rpc";

import { http } from "./http";
import { HttpEndpoint } from "./httpclient";
import { hasProtocol, RpcClient } from "./rpcclient";

export interface HttpBatchClientOptions {
  /** Interval for dispatching batches (in milliseconds) */
  dispatchInterval: number;
  /** Max number of items sent in one request */
  batchSizeLimit: number;
}

// Those values are private and can change any time.
// Does a user need to know them? I don't think so. You either set
// a custom value or leave the option field unset.
const defaultHttpBatchClientOptions: HttpBatchClientOptions = {
  dispatchInterval: 20,
  batchSizeLimit: 20,
};

export class HttpBatchClient implements RpcClient {
  protected readonly url: string;
  protected readonly headers: Record<string, string> | undefined;
  protected readonly options: HttpBatchClientOptions;
  private timer?: NodeJS.Timeout;

  private readonly queue: Array<{
    request: JsonRpcRequest;
    resolve: (a: JsonRpcSuccessResponse) => void;
    reject: (a: Error) => void;
  }> = [];

  public constructor(endpoint: string | HttpEndpoint, options: Partial<HttpBatchClientOptions> = {}) {
    this.options = {
      batchSizeLimit: options.batchSizeLimit ?? defaultHttpBatchClientOptions.batchSizeLimit,
      dispatchInterval: options.dispatchInterval ?? defaultHttpBatchClientOptions.dispatchInterval,
    };
    if (typeof endpoint === "string") {
      if (!hasProtocol(endpoint)) {
        throw new Error("Endpoint URL is missing a protocol. Expected 'https://' or 'http://'.");
      }
      this.url = endpoint;
    } else {
      this.url = endpoint.url;
      this.headers = endpoint.headers;
    }
    this.timer = setInterval(() => this.tick(), options.dispatchInterval);
    this.validate();
  }

  public disconnect(): void {
    this.timer && clearInterval(this.timer);
    this.timer = undefined;
  }

  public async execute(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse> {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });

      if (this.queue.length >= this.options.batchSizeLimit) {
        // this train is full, let's go
        this.tick();
      }
    });
  }

  private validate(): void {
    if (
      !this.options.batchSizeLimit ||
      !Number.isSafeInteger(this.options.batchSizeLimit) ||
      this.options.batchSizeLimit < 1
    ) {
      throw new Error("batchSizeLimit must be a safe integer >= 1");
    }
  }

  /**
   * This is called in an interval where promise rejections cannot be handled.
   * So this is not async and HTTP errors need to be handled by the queued promises.
   */
  private tick(): void {
    // Avoid race conditions
    const batch = this.queue.splice(0, this.options.batchSizeLimit);

    if (!batch.length) return;

    const requests = batch.map((s) => s.request);
    const requestIds = requests.map((request) => request.id);

    http("POST", this.url, this.headers, requests).then(
      (raw) => {
        // Requests with a single entry return as an object
        const arr = Array.isArray(raw) ? raw : [raw];

        arr.forEach((el) => {
          const req = batch.find((s) => s.request.id === el.id);
          if (!req) return;
          const { reject, resolve } = req;
          const response = parseJsonRpcResponse(el);
          if (isJsonRpcErrorResponse(response)) {
            reject(new Error(JSON.stringify(response.error)));
          } else {
            resolve(response);
          }
        });
      },
      (error) => {
        for (const requestId of requestIds) {
          const req = batch.find((s) => s.request.id === requestId);
          if (!req) return;
          req.reject(error);
        }
      },
    );
  }
}

import {
  isJsonRpcErrorResponse,
  JsonRpcRequest,
  JsonRpcSuccessResponse,
  parseJsonRpcResponse,
} from "@cosmjs/json-rpc";

import { http, HttpEndpoint } from "./httpclient";
import { hasProtocol, RpcClient } from "./rpcclient";

export interface HttpBatchClientOptions {
  dispatchInterval: number;
  batchSizeLimit: number;
}

export const defaultHttpBatchClientOptions: HttpBatchClientOptions = {
  dispatchInterval: 20,
  batchSizeLimit: 20,
};

export class HttpBatchClient implements RpcClient {
  protected readonly url: string;
  protected readonly headers: Record<string, string> | undefined;
  protected readonly options: HttpBatchClientOptions;
  private timer?: NodeJS.Timer;

  private readonly queue: Array<{
    request: JsonRpcRequest;
    resolve: (a: JsonRpcSuccessResponse) => void;
    reject: (a: Error) => void;
  }> = [];

  public constructor(
    endpoint: string | HttpEndpoint,
    options: HttpBatchClientOptions = defaultHttpBatchClientOptions,
  ) {
    this.options = options;
    if (typeof endpoint === "string") {
      // accept host.name:port and assume http protocol
      this.url = hasProtocol(endpoint) ? endpoint : "http://" + endpoint;
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
    });
  }

  private validate(): void {
    if (!this.options.batchSizeLimit || this.options.batchSizeLimit < 1)
      throw new Error("batchSizeLimit < 1");
  }

  private async tick(): Promise<void> {
    // Avoid race conditions
    const queue = this.queue.splice(0, this.options.batchSizeLimit);

    if (!queue.length) return;

    const request = queue.map((s) => s.request);
    const raw = await http("POST", this.url, this.headers, request);
    // Requests with a single entry return as an object
    const arr = Array.isArray(raw) ? raw : [raw];

    arr.forEach((el) => {
      const req = queue.find((s) => s.request.id === el.id);
      if (!req) return;
      const { reject, resolve } = req;
      const response = parseJsonRpcResponse(el);
      if (isJsonRpcErrorResponse(response)) {
        reject(new Error(JSON.stringify(response.error)));
      } else {
        resolve(response);
      }
    });
  }
}

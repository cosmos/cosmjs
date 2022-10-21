import {
  isJsonRpcErrorResponse,
  JsonRpcRequest,
  JsonRpcSuccessResponse,
  parseJsonRpcResponse,
} from "@cosmjs/json-rpc";
import { http, HttpEndpoint } from "./httpclient";

import { hasProtocol, RpcClient } from "./rpcclient";

export interface HttpClientOptions {
  dispatchInterval: number;
  batchSizeLimit: number;
}

export const defaultHttpClientOptions: HttpClientOptions = { dispatchInterval: 20, batchSizeLimit: 20 };

export class HttpBatchClient implements RpcClient {
  protected readonly url: string;
  protected readonly headers: Record<string, string> | undefined;
  protected readonly options: HttpClientOptions;

  private queue: Array<{
    request: JsonRpcRequest;
    resolve: (a: JsonRpcSuccessResponse) => void;
    reject: (a: Error) => void;
  }> = [];

  public constructor(endpoint: string | HttpEndpoint, options: HttpClientOptions = defaultHttpClientOptions) {
    this.options = options;
    if (typeof endpoint === "string") {
      // accept host.name:port and assume http protocol
      this.url = hasProtocol(endpoint) ? endpoint : "http://" + endpoint;
    } else {
      this.url = endpoint.url;
      this.headers = endpoint.headers;
    }
    setInterval(() => this.tick(), options.dispatchInterval);
  }

  public disconnect(): void {
    // nothing to be done
  }

  public async execute(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse> {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
    });
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

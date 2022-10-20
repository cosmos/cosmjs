import {
  isJsonRpcErrorResponse,
  JsonRpcRequest,
  JsonRpcSuccessResponse,
  parseJsonRpcResponse,
} from "@cosmjs/json-rpc";
import axios from "axios";

import { hasProtocol, RpcClient } from "./rpcclient";

// Global symbols in some environments
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
declare const fetch: any | undefined;

function filterBadStatus(res: any): any {
  if (res.status >= 400) {
    throw new Error(`Bad status on response: ${res.status}`);
  }
  return res;
}

/**
 * Helper to work around missing CORS support in Tendermint (https://github.com/tendermint/tendermint/pull/2800)
 *
 * For some reason, fetch does not complain about missing server-side CORS support.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function http(
  method: "POST",
  url: string,
  headers: Record<string, string> | undefined,
  request?: any,
): Promise<any> {
  if (typeof fetch !== "undefined") {
    const settings = {
      method: method,
      body: request ? JSON.stringify(request) : undefined,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-Type": "application/json",
        ...headers,
      },
    };
    return fetch(url, settings)
      .then(filterBadStatus)
      .then((res: any) => res.json());
  } else {
    return axios
      .request({ url: url, method: method, data: request, headers: headers })
      .then((res) => res.data);
  }
}

export interface HttpEndpoint {
  /**
   * The URL of the HTTP endpoint.
   *
   * For POST APIs like Tendermint RPC in CosmJS,
   * this is without the method specific paths (e.g. https://cosmoshub-4--rpc--full.datahub.figment.io/)
   */
  readonly url: string;
  /**
   * HTTP headers that are sent with every request, such as authorization information.
   */
  readonly headers: Record<string, string>;
}

export interface HttpClientOptions {
  dispatchInterval: number;
}

export const defaultHttpClientOptions: HttpClientOptions = { dispatchInterval: 0 };

export class HttpClient implements RpcClient {
  protected readonly url: string;
  protected readonly headers: Record<string, string> | undefined;
  protected readonly options: HttpClientOptions;

  private stack: Array<{
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
      this.stack.push({ request, resolve, reject });
    });
  }

  private async tick(): Promise<void> {
    // Avoid race conditions
    const stack = this.stack;
    this.stack = [];

    if (!stack.length) return;

    const request = stack.map((s) => s.request);
    const raw = await http("POST", this.url, this.headers, request);
    // Requests with a single entry return as an object
    const arr = Array.isArray(raw) ? raw : [raw];

    arr.forEach((el, idx) => {
      const { reject, resolve } = stack[idx];
      const response = parseJsonRpcResponse(el);
      if (isJsonRpcErrorResponse(response)) {
        reject(new Error(JSON.stringify(response.error)));
      } else {
        resolve(response);
      }
    });
  }
}

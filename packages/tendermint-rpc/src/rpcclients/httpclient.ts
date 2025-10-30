import {
  isJsonRpcErrorResponse,
  JsonRpcRequest,
  JsonRpcSuccessResponse,
  parseJsonRpcResponse,
} from "@cosmjs/json-rpc";

import { http } from "./http.js";
import { hasProtocol, RpcClient } from "./rpcclient.js";

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

export class HttpClient implements RpcClient {
  protected readonly url: string;
  protected readonly headers: Record<string, string> | undefined;
  protected readonly timeout: number | undefined;

  public constructor(endpoint: string | HttpEndpoint, timeout?: number) {
    if (typeof endpoint === "string") {
      if (!hasProtocol(endpoint)) {
        throw new Error("Endpoint URL is missing a protocol. Expected 'https://' or 'http://'.");
      }
      this.url = endpoint;
    } else {
      this.url = endpoint.url;
      this.headers = endpoint.headers;
    }
    this.timeout = timeout;
  }

  public disconnect(): void {
    // nothing to be done
  }

  public async execute(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse> {
    const response = parseJsonRpcResponse(await http("POST", this.url, this.headers, request, this.timeout));
    if (isJsonRpcErrorResponse(response)) {
      throw new Error(JSON.stringify(response.error));
    }
    return response;
  }
}

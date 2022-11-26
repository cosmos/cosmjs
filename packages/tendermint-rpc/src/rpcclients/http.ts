import axios from "axios";

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

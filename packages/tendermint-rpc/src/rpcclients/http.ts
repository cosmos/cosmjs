function filterBadStatus(res: Response): Response {
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
  timeout?: number,
): Promise<any> {
  const settings: RequestInit = {
    method: method,
    body: request ? JSON.stringify(request) : undefined,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/json",
      ...headers,
    },
    signal: timeout ? AbortSignal.timeout(timeout) : undefined,
  };
  return fetch(url, settings)
    .then(filterBadStatus)
    .then((res) => res.json());
}

import fetch from "cross-fetch";

/**
 * Strip trailing `/`s
 */
function stripTrailingSlash(baseUrl: string): string {
  // Limit the amount of / stripped to avoid potential regex DoS
  return baseUrl.replace(/(\/{0,20})$/, "");
}

export class FaucetClient {
  private readonly baseUrl: string;

  public constructor(baseUrl: string) {
    if (!baseUrl.match(/^https?:\/\//)) {
      throw new Error("Expected base url to start with http:// or https://");
    }
    this.baseUrl = stripTrailingSlash(baseUrl);
  }

  public async credit(address: string, denom: string): Promise<void> {
    const body = {
      address: address,
      denom: denom,
    };

    try {
      await fetch(this.baseUrl + "/credit", { method: "POST", body: JSON.stringify(body) });
    } catch (error: any) {
      if (error.response) {
        // append response body to error message
        throw new Error(`${error}; response body: ${JSON.stringify(error.response.data)}`);
      } else {
        throw error;
      }
    }
  }
}

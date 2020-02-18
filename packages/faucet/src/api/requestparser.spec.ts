import { RequestParser } from "./requestparser";

describe("RequestParser", () => {
  it("can process valid credit request", () => {
    const body = { address: "abc", ticker: "TKN" };
    expect(RequestParser.parseCreditBody(body)).toEqual({ address: "abc", ticker: "TKN" });
  });

  it("throws for invalid credit requests", () => {
    // address unset
    {
      const body = { ticker: "TKN" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'address' must be a string/i);
    }

    // address wrong type
    {
      const body = { address: true, ticker: "TKN" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'address' must be a string/i);
    }

    // address empty
    {
      const body = { address: "", ticker: "TKN" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'address' must not be empty/i);
    }

    // ticker unset
    {
      const body = { address: "abc" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'ticker' must be a string/i);
    }

    // ticker wrong type
    {
      const body = { address: "abc", ticker: true };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'ticker' must be a string/i);
    }

    // ticker empty
    {
      const body = { address: "abc", ticker: "" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'ticker' must not be empty/i);
    }
  });
});

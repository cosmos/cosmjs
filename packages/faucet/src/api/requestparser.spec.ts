import { RequestParser } from "./requestparser";

describe("RequestParser", () => {
  it("can process valid credit request with denom", () => {
    const body = { address: "abc", denom: "utkn" };
    expect(RequestParser.parseCreditBody(body)).toEqual({ address: "abc", denom: "utkn" });
  });

  it("can process valid credit request with ticker", () => {
    const body = { address: "abc", ticker: "TKN" };
    expect(RequestParser.parseCreditBody(body)).toEqual({ address: "abc", ticker: "TKN" });
  });

  it("throws for invalid credit requests", () => {
    // body not a dictionary
    {
      expect(() => RequestParser.parseCreditBody("foo")).toThrowError(/Request body must be a dictionary./i);
      expect(() => RequestParser.parseCreditBody(null)).toThrowError(/Request body must be a dictionary./i);
      expect(() => RequestParser.parseCreditBody(42)).toThrowError(/Request body must be a dictionary./i);
      expect(() => RequestParser.parseCreditBody([])).toThrowError(/Request body must be a dictionary./i);
      expect(() => RequestParser.parseCreditBody(true)).toThrowError(/Request body must be a dictionary./i);
      expect(() => RequestParser.parseCreditBody(undefined)).toThrowError(
        /Request body must be a dictionary./i,
      );
    }

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

    // denom and ticker unset
    {
      const body = { address: "abc" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(
        /Exactly one of properties 'denom' or 'ticker' must be a string/i,
      );
    }

    // denom and ticker both set
    {
      const body = { address: "abc", denom: "ustake", ticker: "COSM" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(
        /Exactly one of properties 'denom' or 'ticker' must be a string/i,
      );
    }

    // denom wrong type
    {
      const body = { address: "abc", denom: true };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(
        /Exactly one of properties 'denom' or 'ticker' must be a string/i,
      );
    }

    // denom empty
    {
      const body = { address: "abc", denom: "" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'denom' must not be empty/i);
    }

    // ticker wrong type
    {
      const body = { address: "abc", ticker: true };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(
        /Exactly one of properties 'denom' or 'ticker' must be a string/i,
      );
    }

    // ticker empty
    {
      const body = { address: "abc", ticker: "" };
      expect(() => RequestParser.parseCreditBody(body)).toThrowError(/Property 'ticker' must not be empty/i);
    }
  });
});

import { expect } from "chai";

import { RequestParser } from "./requestparser";

describe("RequestParser", () => {
  it("can process valid credit request", () => {
    const body = { address: "abc", ticker: "CASH" };
    expect(RequestParser.parseCreditBody(body)).to.eql({ address: "abc", ticker: "CASH" });
  });

  it("throws for invalid credit requests", () => {
    // address unset
    {
      const body = { ticker: "CASH" };
      expect(() => RequestParser.parseCreditBody(body)).to.throw(/Property 'address' must be a string/i);
    }

    // address wrong type
    {
      const body = { address: true, ticker: "CASH" };
      expect(() => RequestParser.parseCreditBody(body)).to.throw(/Property 'address' must be a string/i);
    }

    // address empty
    {
      const body = { address: "", ticker: "CASH" };
      expect(() => RequestParser.parseCreditBody(body)).to.throw(/Property 'address' must not be empty/i);
    }

    // ticker unset
    {
      const body = { address: "abc" };
      expect(() => RequestParser.parseCreditBody(body)).to.throw(/Property 'ticker' must be a string/i);
    }

    // ticker wrong type
    {
      const body = { address: "abc", ticker: true };
      expect(() => RequestParser.parseCreditBody(body)).to.throw(/Property 'ticker' must be a string/i);
    }

    // ticker empty
    {
      const body = { address: "abc", ticker: "" };
      expect(() => RequestParser.parseCreditBody(body)).to.throw(/Property 'ticker' must not be empty/i);
    }
  });
});

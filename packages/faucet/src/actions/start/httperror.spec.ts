import { expect } from "chai";

import { HttpError } from "./httperror";

describe("HttpError", () => {
  it("can be constructed", () => {
    {
      const error = new HttpError(400, "Invalid name field");
      expect(error.message).to.eql("Invalid name field");
      expect(error.status).to.eql(400);
      expect(error.expose).to.eql(true);
    }
    {
      const error = new HttpError(500, "Out of memory", false);
      expect(error.message).to.eql("Out of memory");
      expect(error.status).to.eql(500);
      expect(error.expose).to.eql(false);
    }
  });
});

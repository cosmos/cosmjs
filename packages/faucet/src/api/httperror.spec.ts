import { HttpError } from "./httperror.js";

describe("HttpError", () => {
  it("can be constructed", () => {
    {
      const error = new HttpError(400, "Invalid name field");
      expect(error.message).toEqual("Invalid name field");
      expect(error.status).toEqual(400);
      expect(error.expose).toEqual(true);
      expect(`${error}`).toEqual("HttpError: Invalid name field");
    }
    {
      const error = new HttpError(500, "Out of memory", false);
      expect(error.message).toEqual("Out of memory");
      expect(error.status).toEqual(500);
      expect(error.expose).toEqual(false);
      expect(`${error}`).toEqual("HttpError: Out of memory");
    }
  });
});

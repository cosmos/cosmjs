import { HttpError } from "./httperror";

describe("HttpError", () => {
  it("can be constructed", () => {
    {
      const error = new HttpError(400, "Invalid name field");
      expect(error.message).toEqual("Invalid name field");
      expect(error.status).toEqual(400);
      expect(error.expose).toEqual(true);
    }
    {
      const error = new HttpError(500, "Out of memory", false);
      expect(error.message).toEqual("Out of memory");
      expect(error.status).toEqual(500);
      expect(error.expose).toEqual(false);
    }
  });
});

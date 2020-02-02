import { RestClient } from "./restclient";

const httpUrl = "http://localhost:1317";

describe("RestClient", () => {
  it("can be constructed", () => {
    const client = new RestClient(httpUrl);
    expect(client).toBeTruthy();
  });
});

import { isValidAddress } from "./addresses";

describe("isValidAddress", () => {
  it("accepts account address", () => {
    expect(isValidAddress("cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r", "cosmos")).toBe(true);
  });

  it("accepts an ics-27 address", () => {
    expect(isValidAddress("osmo1d6em9ea5y3dye6em0awqyss7ssp0a7sgjk792x8cx647cfs7a4msk0fr45", "osmo")).toBe(
      true,
    );
  });

  it("accepts a Penumbra compat address", () => {
    expect(
      isValidAddress(
        "penumbracompat11ld2kghffzgwq4597ejpgmnwxa7ju0cndytuxtsjh8qhjyfuwq0rwd5flnw4a3fgclw7m5puh50nskn2c88flhne2hzchnpxru609d5wgmqqvhdf0sy2tktqfcm2p2tmxeuc86n",
        "penumbracompat1",
      ),
    ).toBe(true);
  });

  it("rejects an invalid address", () => {
    expect(isValidAddress("cosmos1fail", "cosmos")).toBe(false);
  });

  it("rejects a zero-length address", () => {
    expect(isValidAddress("cosmos1550dq7", "cosmos")).toBe(false);
  });

  it("requires a prefix argument", () => {
    // @ts-expect-error intentionally omitting an argument
    expect(isValidAddress("cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r")).toBe(false);
  });
});

import { Stream } from "xstream";

import { asArray, countStream, lastValue } from "./reducer";

describe("Test stream helpers", () => {
  it("readIntoArray returns input", async () => {
    const input = [1, 6, 92, 2, 9];
    const stream = Stream.fromArray(input);
    const result = asArray<number>(stream);
    await result.finished();
    expect(result.value()).toEqual(input);

    // also handle empty properly
    const result2 = asArray<number>(Stream.empty());
    await result2.finished();
    expect(result2.value()).toEqual([]);
  });

  it("countStream returns number of items", async () => {
    const input = ["abc", "123", "def", "superstar!", "is"];
    const stream = Stream.fromArray(input);
    const result = countStream(stream);
    await result.finished();
    expect(result.value()).toEqual(input.length);

    // also handle empty properly
    const result2 = countStream(Stream.empty());
    await result2.finished();
    expect(result2.value()).toEqual(0);
  });

  it("lastValue returns input", async () => {
    const input = ["Some", "people", "say", "there", "is", "something"];
    const stream = Stream.fromArray(input);
    const result = lastValue<string>(stream);
    await result.finished();
    expect(result.value()).toEqual("something");

    // also handle empty properly (undefined)
    const result2 = lastValue<number>(Stream.empty());
    await result2.finished();
    expect(result2.value()).toBeUndefined();
  });

  it("Reducer.finished throws error on stream error", async () => {
    const stream = Stream.throw("error");
    try {
      const result = asArray<number>(stream);
      await result.finished();
      fail("This should have thrown an error");
    } catch (err) {
      expect(err).toEqual("error");
    }
  });
});
